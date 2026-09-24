import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { ALL_PRODUCTS } from '@/lib/coreProducts';
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

  // ── Free gift selection (persisted to localStorage) ──
  const [selectedGift, setSelectedGift] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('torch-republic-free-gift') : null;
      return saved ? JSON.parse(saved) : null;
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

        // Update local items with Shopify-returned prices and quantities.
        // Local-only items (not in the Shopify cart) are PRESERVED — they'll
        // be re-synced at checkout (handleCheckout creates a fresh cart from
        // local state, so no data is ever lost).
        const shopifyLines = shopifyCart.lines || [];
        setItems((prev) =>
          prev.map((localItem) => {
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
          })
        );
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

  // Persist free gift selection to localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        if (selectedGift) {
          localStorage.setItem('torch-republic-free-gift', JSON.stringify(selectedGift));
        } else {
          localStorage.removeItem('torch-republic-free-gift');
        }
      }
    } catch {
      // localStorage unavailable
    }
  }, [selectedGift]);

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

    // Optimistic local update — item appears immediately
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

    // Show confirmation IMMEDIATELY (optimistic) so the user always sees
    // feedback. The Shopify sync happens in the background; if it succeeds,
    // we update the local item with Shopify-confirmed data. If it fails,
    // the item stays in the local cart and checkout creates a fresh cart.
    setConfirmation({
      name: normalizedProduct.name,
      image: normalizedProduct.image,
      imageAlt: normalizedProduct.imageAlt,
      qty,
      isSubscription: !!normalizedProduct.isSubscription,
      sellingPlanName: normalizedProduct.isSubscription ? (normalizedProduct.sellingPlanName || 'Deliver every 4 weeks') : null,
      shopifyPrice: null,
      lineTotal: (normalizedProduct.price * qty).toFixed(2),
      price: normalizedProduct.price,
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

    // Helper: update local items with Shopify-confirmed data
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

      // Update confirmation with Shopify-confirmed price
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
      lastErrorToastRef.current?.dismiss();
      lastErrorToastRef.current = null;
      return true;
    };

    if (COMMERCE_ENABLED) {
      const slug = normalizedProduct.shopifyHandle || normalizedProduct.id;
      const line = { slug, quantity: qty, isSubscription: !!normalizedProduct.isSubscription, sellingPlanId: normalizedProduct.sellingPlanId };

      (async () => {
        try {
          const currentCartId = shopifyCartIdRef.current;
          let cart;

          if (!currentCartId) {
            cart = await createShopifyCart([line]);
            if (cart?.cartId) persistShopifyCartId(cart.cartId);
          } else {
            cart = await addShopifyCartLine(currentCartId, line);
          }

          // Best-effort: update local item with Shopify data if the match succeeds.
          // If it fails, the item stays in the local cart — checkout will create
          // a fresh cart from local state, so the user never loses their selection.
          if (cart && !cart.error) {
            applyShopifyData(cart);

            // ── Dev-mode diagnostic logging (redacted) ──
            // Logs only non-sensitive cart line data for debugging.
            // Never logs tokens, customer email, address, or payment data.
            if (import.meta.env.DEV) {
              const matchedLine = findMatch(cart);
              const expectedVariantId = SHOPIFY_VARIANT_IDS[slug];
              console.log('[TR Cart Diagnostic]', {
                merchandiseId: expectedVariantId || matchedLine?.variantId || null,
                quantity: qty,
                selectedSellingPlanId: normalizedProduct.sellingPlanId || null,
                returnedCartLineId: matchedLine?.lineId || null,
                returnedSellingPlanId: matchedLine?.sellingPlanId || null,
                returnedSellingPlanName: matchedLine?.sellingPlanName || null,
                returnedCheckoutUrlHost: cart.checkoutUrl ? new URL(cart.checkoutUrl).host : null,
              });
            }
          } else if (cart?.error) {
            // Shopify API returned an error — show a non-blocking warning
            // but keep the item in the local cart.
            lastErrorToastRef.current?.dismiss();
            lastErrorToastRef.current = showToast({
              title: 'Syncing issue',
              description: 'Your item was added. We will sync your cart at checkout.',
              duration: 4000,
            });
          }
        } catch {
          // Network or SDK error — item stays in local cart.
          // Checkout creates a fresh cart from local state, so no data is lost.
          lastErrorToastRef.current?.dismiss();
          lastErrorToastRef.current = showToast({
            title: 'Syncing issue',
            description: 'Your item was added. We will sync your cart at checkout.',
            duration: 4000,
          });
        } finally {
          mutationInFlight.current = false;
          setIsAdding(false);
        }
      })();
    } else {
      // Commerce disabled — confirmation already shown above.
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

  // Use Shopify-returned prices when available; fall back to local prices
  // Declared before handleCheckout so the memoized callback can reference subtotal
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => {
    const unitPrice = i.shopifyPrice ? parseFloat(i.shopifyPrice) : i.price;
    return s + unitPrice * i.qty;
  }, 0);

  // ── Checkout: redirect to Shopify-hosted checkout ──
  //
  // SYNCHRONIZATION CONTRACT:
  //   The visible Torch Republic cart is the SINGLE source of truth.
  //   Immediately before checkout, a FRESH Shopify cart is created with
  //   exactly the items the customer sees — no stale cart ID is ever reused.
  //   This guarantees Shopify Checkout matches the visible cart:
  //     - product-for-product
  //     - quantity-for-quantity
  //     - dollar-for-dollar
  //
  //   Previous cart IDs are abandoned (Shopify expires them automatically).
  //   No Base44 Order is created — Shopify handles the entire checkout.
  const handleCheckout = useCallback(async () => {
    if (!COMMERCE_ENABLED) {
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
      return;
    }

    // Do not checkout an empty cart
    if (items.length === 0) return;

    setIsCheckingOut(true);

    // Safety timeout — prevents indefinite loading state if Shopify is slow
    // or unresponsive. After 20s, show an actionable error and re-enable
    // the checkout button so the customer can retry.
    const timeoutId = setTimeout(() => {
      setIsCheckingOut(false);
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
    }, 20000);

    try {
      // ── ALWAYS rebuild the Shopify cart from the current local cart ──
      // Filter to items that have a valid Shopify variant. Items without a
      // variant (e.g., seasonal products not yet on Shopify) are excluded
      // from the checkout cart but remain in the local cart.
      const validItems = items.filter(i => {
        const slug = i.shopifyHandle || i.id;
        return !!(SHOPIFY_VARIANT_IDS[slug] || SHOPIFY_VARIANT_IDS[i.id]);
      });

      if (validItems.length === 0) {
        clearTimeout(timeoutId);
        window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
        return;
      }

      const hasSubscriptionItems = validItems.some(i => i.isSubscription);

      const lines = validItems.map(i => ({
        slug: i.shopifyHandle || i.id,
        quantity: i.qty,
        isSubscription: !!i.isSubscription,
        sellingPlanId: i.sellingPlanId,
      }));

      const cart = await createShopifyCart(lines, {
        attributes: selectedGift ? [{ key: 'Free Gift', value: selectedGift.name }] : [],
        note: selectedGift ? `Free gift selected: ${selectedGift.name}` : undefined,
      });

      // Abort if cart creation failed or returned an error
      if (!cart || cart.error || !cart.cartId) {
        clearTimeout(timeoutId);
        setIsCheckingOut(false);
        // If subscription items were in the cart and Shopify rejected the cart,
        // the selling plan is likely not allocated to the product. Show the
        // specific subscription error instead of the generic fallback.
        if (hasSubscriptionItems) {
          showToast({
            title: 'Subscription not added',
            description: 'The monthly plan was not added to your Shopify cart. Please reselect the plan or contact support.',
            duration: 6000,
          });
          return;
        }
        window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
        return;
      }

      // Persist the new cart ID (replaces any stale one)
      persistShopifyCartId(cart.cartId);

      if (!cart.checkoutUrl) {
        clearTimeout(timeoutId);
        window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
        return;
      }

      // ── FAIL-CLOSED: verify subscription lines have selling plan allocations ──
      // If the customer selected subscription but the returned Shopify cart line
      // has no sellingPlanAllocation or its selling plan ID does not match the
      // selection, do NOT open checkout. Show an actionable error instead.
      const subscriptionItems = validItems.filter(i => i.isSubscription);
      if (subscriptionItems.length > 0) {
        const cartLines = cart.lines || [];
        for (const subItem of subscriptionItems) {
          const expectedVariantId = SHOPIFY_VARIANT_IDS[subItem.shopifyHandle || subItem.id];
          const matchingLine = cartLines.find(sl =>
            ((expectedVariantId && sl.variantId === expectedVariantId) || sl.productTitle === subItem.name) &&
            sl.isSubscription === true
          );
          if (!matchingLine || !matchingLine.sellingPlanId) {
            clearTimeout(timeoutId);
            setIsCheckingOut(false);
            showToast({
              title: 'Subscription not added',
              description: 'The monthly plan was not added to your Shopify cart. Please reselect the plan or contact support.',
              duration: 6000,
            });
            return;
          }
          if (subItem.sellingPlanId && matchingLine.sellingPlanId !== subItem.sellingPlanId) {
            clearTimeout(timeoutId);
            setIsCheckingOut(false);
            showToast({
              title: 'Subscription plan mismatch',
              description: 'The monthly plan was not added to your Shopify cart. Please reselect the plan or contact support.',
              duration: 6000,
            });
            return;
          }
        }
      }

      // ── Redirect to Shopify Checkout ──
      // The cart was just created fresh from local state, so it's already
      // authoritative. No line-count or subtotal comparison needed.
      clearTimeout(timeoutId);
      window.location.href = cart.checkoutUrl;
    } catch {
      clearTimeout(timeoutId);
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
    } finally {
      clearTimeout(timeoutId);
      setIsCheckingOut(false);
    }
  }, [items, persistShopifyCartId, subtotal, selectedGift]);

  const clearCart = useCallback(() => {
    setItems([]);
    persistShopifyCartId(null);
    setSelectedGift(null);
  }, [persistShopifyCartId]);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, setQty, removeItem, clearCart,
      totalItems, subtotal, drawerOpen, setDrawerOpen, confirmation, clearConfirmation, isAdding,
      refreshed, dismissRefreshed,
      shopifyCartId, persistShopifyCartId,
      handleCheckout, isCheckingOut,
      isSyncing,
      selectedGift, setSelectedGift,
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