import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

// localStorage key
const CART_STORAGE_KEY = 'torch-republic-cart';

export function CartProvider({ children }) {
  // Initialize from localStorage
  const [items, setItems] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null;
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Persist to localStorage whenever items change
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      // localStorage unavailable
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      // Use shopifyHandle as primary key if available, fallback to id
      const key = product.shopifyHandle || product.id;
      const existing = prev.find(i => (i.shopifyHandle || i.id) === key);
      if (existing) {
        return prev.map(i => (i.shopifyHandle || i.id) === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
    setToast(product.name);
    setDrawerOpen(true);
    // Auto-dismiss toast after 4 seconds
    setTimeout(() => setToast(null), 4000);
  }, []);

  const clearToast = useCallback(() => {
    setToast(null);
  }, []);

  // Optimistic update: apply immediately to local state (already persisted via useEffect)
  const updateQty = useCallback((id, delta) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }, []);

  const removeItem = useCallback((id) => {
    // Optimistic remove: update state immediately, no async wait
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const setQty = useCallback((id, qty) => {
    if (qty < 1) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, setQty, removeItem, clearCart,
      totalItems, subtotal, drawerOpen, setDrawerOpen, toast, clearToast
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