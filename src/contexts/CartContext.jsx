import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';
import { toast as showToast } from '@/components/ui/use-toast';
import { COMMERCE_ENABLED } from '@/lib/commerceConfig';
import { getShopifyCart, createShopifyCart, addShopifyCartLine, getShopifyCheckoutUrl, SHOPIFY_VARIANT_IDS } from '@/lib/shopifyCheckout';

// Only the current products are valid cart items. Persisted carts
// containing retired products are filtered against this set on load so
// stale entries never render in the cart.
const ACTIVE_CART_IDS = new Set(ALL_PRODUCTS.map((p) => p.id));

const CartContext = createContext(null);

// localStorage keys
const CART_STORAGE_KEY = 'torch-republic-cart';
const SHOPIFY_CART_ID_KEY = 'torch-republic-shopify-cart-id';

export function CartProvider({ children }) {
  // ── Local cart items (persisted to localStorage) ──
  const [items, setItems] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null;
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter((i) => ACTIVE_CART_IDS.has(i.id)) : [];
    } catch {
      return [];
    }
  });

  // True when the persisted cart held retired products that were removed.
  const [refreshed, setRefreshed] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null;
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return false;
      return parsed.some((i) => !ACTIVE_CART_IDS.has(i.id));
    } catch {
      return false;
    }
  });
  const dismissRefreshed = useCallback(() => setRefreshed(false), []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // ── Shopify cart ID (NOT a secret — identifies the buyer's Shopify cart) ──
  const [shopifyCartId, setShopifyCartId] = useState(() => {
    try {
      return typeof window !== 'undefined' ? localStorage.getItem(SHOPIFY_CART_ID_KEY) : null;
    } catch {
      return null;
    }
  });

  // ── Loading state for Shopify operations ──
  const [isSyncing, setIsSyncing] = useState(false);

  // ── Mutation lock: prevents concurrent mutations on the same cart ──
  // Also prevents duplicate lines from repeated clicks.
  const mutationInFlight = useRef(false);

  // Tracks the last error toast so it can be dismissed immediately when the
  // add ultimately succeeds (never leave a stale failure message visible).
  const lastErrorToastRef = useRef(null);

  // Ref mirror of shopifyCartId to avoid stale closures in async callbacks
  const shopifyCartIdRef = useRef(shopifyCartId);
  useEffect(() => { shopifyCartIdRef.current = shopifyCartId; }, [shopifyCartId]);

  // Ref mirror of items for rollback in addItem without adding items to deps
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  // Checkout loading state
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const persistShopifyCartId = useCallback((cartId) => {
    setShopifyCartId(cartId);
    try {
      if (typeof window !== 'undefined') {
        if (cartId) {
          localStorage.setItem(SHOPIFY_CART_ID_KEY, cartId);
        } else {
          localStorage.removeItem(SHOPIFY_CART_ID_KEY);
        }
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // ── Page-refresh reconciliation ──
  // When commerce is enabled and we have a Shopify cart ID, retrieve the
  // Shopify cart and reconcile it with the local display:
  //   1. Replace locally calculated prices with Shopify-returned costs
  //   2. Remove local items that Shopify rejects (not in Shopify cart)
  //   3. Preserve valid quantities and selling-plan selections
  //   4. Handle expired carts by clearing the stale ID
  useEffect(() => {
    if (!COMMERCE_ENABLED || !shopifyCartId) return;
    let cancelled = false;
    setIsSyncing(true);
    (async () => {
      try {
        const shopifyCart = await getShopifyCart(shopifyCartId);
        if (cancelled) return;

        if (!shopifyCart) {
          // Cart expired — clear stale ID so a new cart is created next time
          persistShopifyCartId(null);
          setIsSyncing(false);
          return;
        }

        // Reconcile local items with Shopify-returned cart lines
        const shopifyLines = shopifyCart.lines || [];
        setItems((prev) => {
          // Remove local items that don't exist in the Shopify cart
          const reconciled = prev.filter((localItem) => {
            const expectedVariantId = SHOPIFY_VARIANT_IDS[localItem.id];
            const matchingLine = shopifyLines.find((sl) =>
              ((expectedVariantId && sl.variantId === expectedVariantId) || sl.productTitle === localItem.name) &&
              sl.isSubscription === !!localItem.isSubscription
            );
            return !!matchingLine;
          });

          // Replace locally calculated prices with Shopify-returned costs
          // Preserve valid quantities and selling-plan selections
          return reconciled.map((localItem) => {
            const expectedVariantId = SHOPIFY_VARIANT_IDS[localItem.id];
            const matchingLine = shopifyLines.find((sl) =>
              ((expectedVariantId && sl.variantId === expectedVariantId) || sl.productTitle === localItem.name) &&
              sl.isSubscription === !!localItem.isSubscription
            );
            if (matchingLine) {
              return {
                ...localItem,
                qty: matchingLine.quantity,
                shopifyPrice: matchingLine.unitPrice,
                shopifyLineTotal: matchingLine.lineSubtotal,
                isSubscription: matchingLine.isSubscription,
                sellingPlanName: matchingLine.sellingPlanName,
                shopifyLineId: matchingLine.lineId,
              };
            }
            return localItem;
          });
        });
      } catch {
        // Silently fail — local cart remains the fallback
      } finally {
        if (!cancelled) setIsSyncing(false);
      }
    })();
    return () => { cancelled = true; };
  }, [shopifyCartId, persistShopifyCartId]);

  // Persist local cart to localStorage whenever items change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      // localStorage unavailable
    }
  }, [items]);

  // ── Cart line key: separates one-time and subscription versions ──
  // A one-time and subscription version of the same product must remain
  // separate cart lines because their selling-plan allocations differ.
  const getLineKey = useCallback((product) => {
    const baseKey = product.shopifyHandle || product.id;
    return product.isSubscription ? `${baseKey}__sub` : `${baseKey}__onetime`;
  }, []);

  const addItem = useCallback((product, qty = 1) => {
    // Prevent duplicate lines from repeated clicks
    if (mutationInFlight.current) return;
    mutationInFlight.current = true;
    setIsAdding(true);

    const normalizedProduct = {
      ...product,
      image: getProductImage(product),
      imageAlt: getProductAltText(product),
    };

    // Save previous state for rollback if Shopify rejects
    const previousItems = itemsRef.current;

    // Optimistic local update
    setItems(prev => {
      const key = getLineKey(normalizedProduct);
      const existing = prev.find(i => getLineKey(i) === key);
      if (existing) {
        return prev.map(i => getLineKey(i) === key
          ? { ...i, qty: i.qty + qty, image: normalizedProduct.image, imageAlt: normalizedProduct.imageAlt }
          : i);
      }
      return [...prev, { ...normalizedProduct, qty }];
    });

    // Helper: find the matching Shopify line from the cart response.
    // Primary match by verified Shopify variant GID (robust against product
    // title differences between the local catalog and Shopify); falls back to
    // exact product-title matching. isSubscription disambiguates one-time vs
    // subscription lines that share the same variant.
    const findMatch = (cart) => cart?.lines?.find(sl => {
      const expectedVariantId = SHOPIFY_VARIANT_IDS[normalizedProduct.id];
      const variantMatches = !!(expectedVariantId && sl.variantId === expectedVariantId);
      const titleMatches = sl.productTitle === normalizedProduct.name;
      return (variantMatches || titleMatches) &&
             sl.isSubscription === !!normalizedProduct.isSubscription;
    });

    // Helper: update local items with Shopify-confirmed data + show confirmation
    const applyShopifyData = (cart) => {
      const matchedLine = findMatch(cart);
      if (!matchedLine) return false;

      setItems(prev => prev.map(localItem => {
        if (localItem.name !== normalizedProduct.name ||
            !!localItem.isSubscription !== !!normalizedProduct.isSubscription) return localItem;
        return {
          ...localItem,
          qty: matchedLine.quantity,
          shopifyLineId: matchedLine.lineId,
          shopifyPrice: matchedLine.unitPrice,
          shopifyLineTotal: matchedLine.lineSubtotal,
          sellingPlanName: matchedLine.sellingPlanName,
        };
      }));

      // Show confirmation ONLY after Shopify confirms the mutation.
      // lineTotal is ALWAYS computed as unitPrice × qty (one authoritative
      // price source) so it can never disagree with the cart subtotal.
      const confirmedUnitPrice = matchedLine.unitPrice ? parseFloat(matchedLine.unitPrice) : normalizedProduct.price;
      setConfirmation({
        name: normalizedProduct.name,
        image: normalizedProduct.image,
        imageAlt: normalizedProduct.imageAlt,
        qty: matchedLine.quantity,
        isSubscription: !!normalizedProduct.isSubscription,
        sellingPlanName: matchedLine.sellingPlanName,
        shopifyPrice: matchedLine.unitPrice,
        lineTotal: (confirmedUnitPrice * matchedLine.quantity).toFixed(2),
        price: normalizedProduct.price,
      });
      // Clear any stale error toast now that the add succeeded
      lastErrorToastRef.current?.dismiss();
      lastErrorToastRef.current = null;
      return true;
    };

    if (COMMERCE_ENABLED) {
      const slug = normalizedProduct.shopifyHandle || normalizedProduct.id;
      const line = { slug, quantity: qty, isSubscription: !!normalizedProduct.isSubscription };

      (async () => {
        try {
          const currentCartId = shopifyCartIdRef.current;
          let cart;

          if (!currentCartId) {
            // Create a new Shopify cart with this line
            cart = await createShopifyCart([line]);
            if (cart?.cartId) persistShopifyCartId(cart.cartId);
          } else {
            // Add to existing Shopify cart
            cart = await addShopifyCartLine(currentCartId, line);
          }

          const applied = applyShopifyData(cart);
          if (!applied) {
            // Shopify returned a cart but no matching line — rollback
            setItems(previousItems);
            lastErrorToastRef.current?.dismiss();
            lastErrorToastRef.current = showToast({ title: 'Could not add to cart', description: 'Please try again.', variant: 'destructive', duration: 4000 });
          }
        } catch {
          // Rollback optimistic update on Shopify failure
          setItems(previousItems);
          lastErrorToastRef.current?.dismiss();
          lastErrorToastRef.current = showToast({ title: 'Could not add to cart', description: 'Please try again.', variant: 'destructive', duration: 4000 });
        } finally {
          mutationInFlight.current = false;
          setIsAdding(false);
        }
      })();
    } else {
      // Commerce disabled — show confirmation with local data
      setConfirmation({
        name: normalizedProduct.name,
        image: normalizedProduct.image,
        imageAlt: normalizedProduct.imageAlt,
        qty,
        isSubscription: !!normalizedProduct.isSubscription,
        sellingPlanName: normalizedProduct.isSubscription ? 'Deliver every 4 weeks' : null,
        shopifyPrice: null,
        lineTotal: (normalizedProduct.price * qty).toFixed(2),
        price: normalizedProduct.price,
      });
      setTimeout(() => { mutationInFlight.current = false; setIsAdding(false); }, 300);
    }
  }, [getLineKey, persistShopifyCartId]);

  const clearConfirmation = useCallback(() => {
    setConfirmation(null);
  }, []);

  // Optimistic update with rollback support
  // Saves previous state so it can be restored if Shopify rejects the mutation.
  const updateQty = useCallback((id, delta) => {
    if (mutationInFlight.current) return;
    mutationInFlight.current = true;

    // Save previous state for rollback
    const previousItems = items;

    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );

    // When commerce is enabled, sync to Shopify and roll back on failure
    if (COMMERCE_ENABLED && shopifyCartId) {
      const updatedItem = items.find(i => i.id === id);
      if (updatedItem?.shopifyLineId) {
        import('@/lib/shopifyCheckout').then(({ updateShopifyCartLine }) => {
          updateShopifyCartLine(shopifyCartId, updatedItem.shopifyLineId, Math.max(1, updatedItem.qty + delta))
            .then(() => { mutationInFlight.current = false; })
            .catch(() => {
              // Roll back optimistic update
              setItems(previousItems);
              mutationInFlight.current = false;
            });
        });
      } else {
        mutationInFlight.current = false;
      }
    } else {
      mutationInFlight.current = false;
    }
  }, [items, shopifyCartId]);

  const removeItem = useCallback((id) => {
    if (mutationInFlight.current) return;
    mutationInFlight.current = true;

    const previousItems = items;

    // Optimistic remove
    setItems(prev => prev.filter(i => i.id !== id));

    // When commerce is enabled, sync to Shopify and roll back on failure
    if (COMMERCE_ENABLED && shopifyCartId) {
      const removedItem = items.find(i => i.id === id);
      if (removedItem?.shopifyLineId) {
        import('@/lib/shopifyCheckout').then(({ removeShopifyCartLine }) => {
          removeShopifyCartLine(shopifyCartId, removedItem.shopifyLineId)
            .then(() => { mutationInFlight.current = false; })
            .catch(() => {
              // Roll back optimistic remove
              setItems(previousItems);
              mutationInFlight.current = false;
            });
        });
      } else {
        mutationInFlight.current = false;
      }
    } else {
      mutationInFlight.current = false;
    }
  }, [items, shopifyCartId]);

  const setQty = useCallback((id, qty) => {
    if (mutationInFlight.current) return;
    mutationInFlight.current = true;

    const previousItems = items;

    if (qty < 1) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }

    // When commerce is enabled, sync to Shopify and roll back on failure
    if (COMMERCE_ENABLED && shopifyCartId) {
      const updatedItem = items.find(i => i.id === id);
      if (updatedItem?.shopifyLineId) {
        import('@/lib/shopifyCheckout').then(({ updateShopifyCartLine }) => {
          updateShopifyCartLine(shopifyCartId, updatedItem.shopifyLineId, qty)
            .then(() => { mutationInFlight.current = false; })
            .catch(() => {
              setItems(previousItems);
              mutationInFlight.current = false;
            });
        });
      } else {
        mutationInFlight.current = false;
      }
    } else {
      mutationInFlight.current = false;
    }
  }, [items, shopifyCartId]);

  // ── Checkout: redirect to Shopify-hosted checkout ──
  // If no Shopify cart exists, creates one with all current items.
  // Then retrieves the checkout URL and redirects.
  // Does NOT create a Base44 Order — Shopify handles the entire checkout.
  const handleCheckout = useCallback(async () => {
    if (!COMMERCE_ENABLED) {
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
      return;
    }

    setIsCheckingOut(true);

    // Safety timeout — prevents indefinite loading state if Shopify is slow
    // or unresponsive. After 20s, show an actionable error and re-enable
    // the checkout button so the customer can retry.
    const timeoutId = setTimeout(() => {
      setIsCheckingOut(false);
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
    }, 20000);

    try {
      let currentCartId = shopifyCartIdRef.current;

      // If no Shopify cart exists yet, create one with all current items
      if (!currentCartId) {
        const lines = items.map(i => ({
          slug: i.shopifyHandle || i.id,
          quantity: i.qty,
          isSubscription: !!i.isSubscription,
        }));
        const cart = await createShopifyCart(lines);
        if (cart?.cartId) {
          persistShopifyCartId(cart.cartId);
          currentCartId = cart.cartId;
        }
      }

      if (!currentCartId) {
        clearTimeout(timeoutId);
        window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
        return;
      }

      const checkoutUrl = await getShopifyCheckoutUrl(currentCartId);
      clearTimeout(timeoutId);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
      }
    } catch {
      clearTimeout(timeoutId);
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
    } finally {
      clearTimeout(timeoutId);
      setIsCheckingOut(false);
    }
  }, [items, persistShopifyCartId]);

  const clearCart = useCallback(() => {
    setItems([]);
    persistShopifyCartId(null);
  }, [persistShopifyCartId]);

  // Use Shopify-returned prices when available; fall back to local prices
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => {
    const unitPrice = i.shopifyPrice ? parseFloat(i.shopifyPrice) : i.price;
    return s + unitPrice * i.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, setQty, removeItem, clearCart,
      totalItems, subtotal, drawerOpen, setDrawerOpen, confirmation, clearConfirmation, isAdding,
      refreshed, dismissRefreshed,
      shopifyCartId, persistShopifyCartId,
      handleCheckout, isCheckingOut,
      isSyncing,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}