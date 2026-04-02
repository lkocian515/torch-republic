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
  // Add item to Shopify native cart, then redirect to /cart
  const addToCart = useCallback((variantId, quantity = 1) => {
    const id = extractNumericId(variantId);
    if (!id) { console.error('Invalid variantId:', variantId); return; }
    window.location.href = `${SHOP}/cart/add?id=${id}&quantity=${quantity}&return_to=/cart`;
  }, []);

  // Add item and go straight to checkout
  const buyNow = useCallback((variantId, quantity = 1) => {
    const id = extractNumericId(variantId);
    if (!id) { console.error('Invalid variantId:', variantId); return; }
    window.location.href = `${SHOP}/cart/add?id=${id}&quantity=${quantity}&return_to=/checkout`;
  }, []);

  const goToCart = useCallback(() => {
    window.location.href = `${SHOP}/cart`;
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