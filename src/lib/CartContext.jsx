import React, { createContext, useContext, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const addToCart = useCallback(async (variantId, quantity = 1) => {
    try {
      const cartId = localStorage.getItem('shopify_cart_id');
      let res;
      
      if (cartId) {
        try {
          res = await base44.functions.invoke('shopifyStorefront', { action: 'addToCart', cartId, variantId, quantity });
        } catch {
          // Cart expired — create a fresh one
          localStorage.removeItem('shopify_cart_id');
          res = await base44.functions.invoke('shopifyStorefront', { action: 'createCart', variantId, quantity });
        }
      } else {
        res = await base44.functions.invoke('shopifyStorefront', { action: 'createCart', variantId, quantity });
      }
      
      const newCart = res.data.cart;
      localStorage.setItem('shopify_cart_id', newCart.id);
      
      // Redirect immediately to Shopify cart
      if (newCart.checkoutUrl) {
        let checkoutUrl = newCart.checkoutUrl;
        // Replace torchrepublic.com hostname with libertees-for-all.myshopify.com while preserving path
        if (checkoutUrl.includes('torchrepublic.com')) {
          checkoutUrl = checkoutUrl.replace('https://www.torchrepublic.com', 'https://libertees-for-all.myshopify.com');
          checkoutUrl = checkoutUrl.replace('https://torchrepublic.com', 'https://libertees-for-all.myshopify.com');
        }
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  }, []);

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}