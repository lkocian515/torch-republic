import React, { createContext, useContext, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = useCallback(async (variantId, quantity = 1) => {
    setIsLoading(true);
    try {
      const cartId = cart?.id;
      let res;
      
      if (cartId) {
        res = await base44.functions.invoke('shopifyStorefront', {
          action: 'addToCart',
          cartId,
          variantId,
          quantity,
        });
      } else {
        res = await base44.functions.invoke('shopifyStorefront', {
          action: 'createCart',
          variantId,
          quantity,
        });
      }
      
      setCart(res.data.cart);
      setIsOpen(true);
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineId) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const res = await base44.functions.invoke('shopifyStorefront', {
        action: 'removeFromCart',
        cartId: cart.id,
        lineId,
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error('Remove from cart error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId, quantity) => {
    if (!cart?.id) return;
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setIsLoading(true);
    try {
      const res = await base44.functions.invoke('shopifyStorefront', {
        action: 'updateCart',
        cartId: cart.id,
        lineId,
        quantity,
      });
      setCart(res.data.cart);
    } catch (error) {
      console.error('Update cart error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart, removeFromCart]);

  return (
    <CartContext.Provider value={{
      cart,
      isOpen,
      setIsOpen,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
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