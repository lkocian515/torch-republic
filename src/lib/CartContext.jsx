import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem('shopify_cart_id');
    if (cartId) {
      base44.functions.invoke('shopifyStorefront', { action: 'getCart', cartId })
        .then(res => {
          if (res.data?.cart) {
            setCart(res.data.cart);
          } else {
            // Cart expired on Shopify side
            localStorage.removeItem('shopify_cart_id');
          }
        })
        .catch(() => {
          localStorage.removeItem('shopify_cart_id');
          setCart(null);
        });
    }
  }, []);

  const addToCart = useCallback(async (variantId, quantity = 1) => {
    setIsLoading(true);
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
      setCart(newCart);
      localStorage.setItem('shopify_cart_id', newCart.id);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (lineId) => {
    setIsLoading(true);
    try {
      const res = await base44.functions.invoke('shopifyStorefront', {
        action: 'removeFromCart',
        cartId: cart.id,
        lineId,
      });
      setCart(res.data.cart);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId, quantity) => {
    if (quantity < 1) return;
    setIsLoading(true);
    try {
      const res = await base44.functions.invoke('shopifyStorefront', {
        action: 'updateCart',
        cartId: cart.id,
        lineId,
        quantity,
      });
      setCart(res.data.cart);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      isLoading,
      setIsOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      itemCount: cart?.totalQuantity || 0,
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