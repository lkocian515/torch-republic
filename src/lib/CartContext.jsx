import React, { createContext, useContext, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const addToCart = useCallback(async (variantId, quantity = 1) => {
    const cartId = localStorage.getItem('shopify_cart_id');
    let res;
    
    try {
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
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add item to cart. Please try again.');
      return;
    }
    
    const newCart = res.data.cart;
    localStorage.setItem('shopify_cart_id', newCart.id);
    
    // Redirect immediately to Shopify cart
    if (newCart.checkoutUrl) {
      let checkoutUrl = newCart.checkoutUrl;
      console.log('Checkout URL from Shopify:', checkoutUrl);
      // Replace torchrepublic.com hostname with libertees-for-all.myshopify.com while preserving path
      if (checkoutUrl.includes('torchrepublic.com')) {
        checkoutUrl = checkoutUrl.replace('https://www.torchrepublic.com', 'https://libertees-for-all.myshopify.com');
        checkoutUrl = checkoutUrl.replace('https://torchrepublic.com', 'https://libertees-for-all.myshopify.com');
      }
      console.log('Redirecting to:', checkoutUrl);
      // Use setTimeout to ensure state updates finish before redirect
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 100);
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