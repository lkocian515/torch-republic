import React, { createContext, useContext, useCallback } from 'react';

const CartContext = createContext(null);

const SHOP = 'https://torchrepublic.com';

// Shopify Storefront API returns GIDs like "gid://shopify/ProductVariant/12345678"
// Shopify's native cart/add endpoint needs just the numeric ID
function extractNumericId(gid) {
  if (!gid) return null;
  const parts = gid.split('/');
  return parts[parts.length - 1];
}

export function CartProvider({ children }) {
  // Add item to Shopify native cart, then return to app
  const addToCart = useCallback((variantId, quantity = 1) => {
    const id = extractNumericId(variantId);
    if (!id) { console.error('Invalid variantId:', variantId); return; }
    window.location.href = `${SHOP}/cart/add?id=${id}&quantity=${quantity}&return_to=${window.location.origin}`;
  }, []);

  // Add item and go straight to checkout
  const buyNow = useCallback((variantId, quantity = 1) => {
    const id = extractNumericId(variantId);
    if (!id) { console.error('Invalid variantId:', variantId); return; }
    window.location.href = `${SHOP}/cart/add?id=${id}&quantity=${quantity}&return_to=${window.location.origin}`;
  }, []);

  const goToCart = useCallback(() => {
    // No-op: cart is now a drawer, don't redirect
  }, []);

  return (
    <CartContext.Provider value={{
      // Cart state — not available cross-origin, always null
      cart: null,
      isOpen: false,
      setIsOpen: () => {},
      isLoading: false,
      // Actions
      addToCart,
      buyNow,
      goToCart,
      removeFromCart: () => {},
      updateQuantity: () => {},
      getCheckoutUrl: (u) => u,
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