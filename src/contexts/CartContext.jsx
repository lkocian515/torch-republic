import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { ALL_PRODUCTS } from '@/lib/coreProducts';
import { toast as showToast } from '@/components/ui/use-toast';
import { COMMERCE_ENABLED } from '@/lib/commerceConfig';
import { createShopifyCart, SHOPIFY_VARIANT_IDS } from '@/lib/shopifyCheckout';

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
      return Array.isArray(parsed) ? parsed.filter((i) => i && ACTIVE_CART_IDS.has(i.id) && Number.isInteger(i.qty) && i.qty > 0 && i.qty <= 999) : [];
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
      return parsed.some((i) => !i || !ACTIVE_CART_IDS.has(i.id) || !Number.isInteger(i.qty) || i.qty < 1 || i.qty > 999);
    } catch {
      return false;
    }
  });
  const dismissRefreshed = useCallback(() => setRefreshed(false), []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  // Local additions are synchronous; only checkout waits for Shopify.
  const isAdding = false;

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
  const isSyncing = false;

  // ── Mutation lock: prevents concurrent mutations on the same cart ──
  // Also prevents duplicate lines from repeated clicks.
  const mutationInFlight = useRef(false);

  // Tracks the last error toast so it can be dismissed immediately when the
  // add ultimately succeeds (never leave a stale failure message visible).
  // Checkout errors are shown at the point of validation.

  // Ref mirror of shopifyCartId to avoid stale closures in async callbacks
  // The remote cart ID is retained for compatibility, never used to restore local quantities.

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

  // Local selections are authoritative; stale remote carts must never overwrite them.
  const checkoutAttemptRef = useRef(0);
  const cartRevisionRef = useRef(0);

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

  const getLineKey = useCallback((product) => {
    const key = product.shopifyHandle || product.id;
    return product.isSubscription ? key + '__sub__' + (product.sellingPlanId || 'default') : key + '__onetime';
  }, []);

  const commitItems = useCallback((next) => {
    cartRevisionRef.current += 1;
    itemsRef.current = next;
    setItems(next);
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const addItem = useCallback((product, qty = 1) => {
    const amount = Number(qty);
    if (!ACTIVE_CART_IDS.has(product.id) || !Number.isInteger(amount) || amount < 1 || amount > 999) return;
    if (product.isSubscription && !product.sellingPlanId) {
      showToast({ title: 'Choose a delivery plan', description: 'Select an available subscription plan on the product page.' });
      return;
    }
    const normalized = { ...product, image: getProductImage(product), imageAlt: getProductAltText(product) };
    const key = getLineKey(normalized);
    const existing = itemsRef.current.find(i => getLineKey(i) === key);
    if ((existing?.qty || 0) + amount > 999) {
      showToast({ title: 'Quantity limit reached', description: 'You can order up to 999 of each item.' });
      return;
    }
    commitItems(existing
      ? itemsRef.current.map(i => getLineKey(i) === key ? { ...i, qty: i.qty + amount } : i)
      : [...itemsRef.current, { ...normalized, qty: amount }]);
    setConfirmation({ ...normalized, qty: amount,
      shopifyPrice: existing?.shopifyPrice || normalized.shopifyPrice || null,
      sellingPlanName: normalized.isSubscription ? normalized.sellingPlanName : null });
  }, [commitItems, getLineKey]);

  const clearConfirmation = useCallback(() => setConfirmation(null), []);
  const resolveLineKey = useCallback((key) => {
    if (itemsRef.current.some(i => getLineKey(i) === key)) return key;
    const matches = itemsRef.current.filter(i => i.id === key);
    return matches.length === 1 ? getLineKey(matches[0]) : null;
  }, [getLineKey]);

  const setQty = useCallback((key, quantity) => {
    const qty = Number(quantity);
    if (!Number.isInteger(qty) || qty < 0 || qty > 999) return;
    const lineKey = resolveLineKey(key);
    if (!lineKey) return;
    commitItems(qty === 0
      ? itemsRef.current.filter(i => getLineKey(i) !== lineKey)
      : itemsRef.current.map(i => getLineKey(i) === lineKey ? { ...i, qty } : i));
  }, [commitItems, getLineKey, resolveLineKey]);

  const updateQty = useCallback((key, delta) => {
    const lineKey = resolveLineKey(key);
    const item = itemsRef.current.find(i => getLineKey(i) === lineKey);
    if (item) setQty(lineKey, Math.max(0, item.qty + delta));
  }, [getLineKey, resolveLineKey, setQty]);
  const removeItem = useCallback((key) => setQty(key, 0), [setQty]);

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
    if (items.length === 0 || mutationInFlight.current) return;
    mutationInFlight.current = true;
    const attempt = ++checkoutAttemptRef.current;
    const revision = cartRevisionRef.current;

    setIsCheckingOut(true);

    // Safety timeout — prevents indefinite loading state if Shopify is slow
    // or unresponsive. After 20s, show an actionable error and re-enable
    // the checkout button so the customer can retry.
    const timeoutId = setTimeout(() => {
      checkoutAttemptRef.current += 1;
      mutationInFlight.current = false;
      setIsCheckingOut(false);
      showToast({ title: 'Checkout is taking longer than expected', description: 'Your cart is saved. Please try again.' });
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
        // All items lack a Shopify variant ID — they are not yet published
        // on Shopify. Show a product-specific message instead of the generic
        // "commerce unavailable" dialog.
        clearTimeout(timeoutId);
        setIsCheckingOut(false);
        const unavailableNames = items.map(i => i.name);
        window.dispatchEvent(new CustomEvent('tr:checkout-items-unavailable', {
          detail: { productNames: unavailableNames }
        }));
        return;
      }

      if (validItems.length < items.length) {
        showToast({ title: 'Please review unavailable items', description: 'Remove unavailable items before checkout so your order matches your cart.', duration: 6000 });
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

      if (attempt !== checkoutAttemptRef.current) return;
      if (revision !== cartRevisionRef.current) {
        showToast({ title: 'Your cart changed', description: 'Review your updated cart, then continue to checkout.' });
        return;
      }

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

      // Verify the returned variant and quantity before sending a customer to payment.
      const hasWrongVariant = validItems.some((item) => {
        const expectedId = SHOPIFY_VARIANT_IDS[item.shopifyHandle || item.id] || SHOPIFY_VARIANT_IDS[item.id];
        const matches = (cart.lines || []).filter((line) =>
          line.variantId === expectedId &&
          Boolean(line.isSubscription) === Boolean(item.isSubscription) &&
          (!item.isSubscription || !item.sellingPlanId || line.sellingPlanId === item.sellingPlanId)
        );
        return matches.reduce((sum, line) => sum + line.quantity, 0) !== item.qty;
      });
      if (hasWrongVariant) {
        clearTimeout(timeoutId);
        setIsCheckingOut(false);
        showToast({ title: 'Please review your cart', description: 'The product options returned by checkout did not match your selection. Please try again or contact support.', duration: 6000 });
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
            sl.isSubscription === true && (!subItem.sellingPlanId || sl.sellingPlanId === subItem.sellingPlanId)
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

      let priceChanged = false;
      const pricedItems = validItems.map(item => {
        const variant = SHOPIFY_VARIANT_IDS[item.shopifyHandle || item.id] || SHOPIFY_VARIANT_IDS[item.id];
        const line = cart.lines.find(line => line.variantId === variant &&
          Boolean(line.isSubscription) === Boolean(item.isSubscription) &&
          (!item.isSubscription || line.sellingPlanId === item.sellingPlanId));
        const price = Number(item.isSubscription ? (line?.subscriptionPrice ?? line?.unitPrice) : line?.unitPrice);
        const displayed = Number(item.shopifyPrice ?? item.price);
        if (!Number.isFinite(price) || price < 0) throw new Error('Invalid checkout price');
        if (Math.abs(price - displayed) > 0.005) priceChanged = true;
        return { ...item, shopifyPrice: price, sellingPlanName: line.sellingPlanName || item.sellingPlanName };
      });
      if (priceChanged) {
        commitItems(pricedItems);
        showToast({ title: 'Prices updated', description: 'Your cart shows current Shopify prices. Please review it and continue to checkout.', duration: 7000 });
        return;
      }
      if (new URL(cart.checkoutUrl).protocol !== 'https:') throw new Error('Invalid checkout URL');

      // ── Redirect to Shopify Checkout ──
      // The cart was just created fresh from local state, so it's already
      // authoritative. No line-count or subtotal comparison needed.
      clearTimeout(timeoutId);
      window.location.href = cart.checkoutUrl;
    } catch {
      if (attempt !== checkoutAttemptRef.current) return;
      clearTimeout(timeoutId);
      window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
    } finally {
      clearTimeout(timeoutId);
      if (attempt === checkoutAttemptRef.current) {
        mutationInFlight.current = false;
        setIsCheckingOut(false);
      }
    }
  }, [items, persistShopifyCartId, subtotal, selectedGift, commitItems]);

  const clearCart = useCallback(() => {
    commitItems([]);
    persistShopifyCartId(null);
    setSelectedGift(null);
  }, [persistShopifyCartId, commitItems]);

  return (
    <CartContext.Provider value={{
      items, getLineKey, addItem, updateQty, setQty, removeItem, clearCart,
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