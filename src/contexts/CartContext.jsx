import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';
import { toast as showToast } from '@/components/ui/use-toast';

// Only the current products are valid cart items. Persisted carts
// containing retired products are filtered against this set on load so
// stale entries never render in the cart.
const ACTIVE_CART_IDS = new Set(ALL_PRODUCTS.map((p) => p.id));

const CartContext = createContext(null);

// localStorage key
const CART_STORAGE_KEY = 'torch-republic-cart';

export function CartProvider({ children }) {
  // Initialize from localStorage, dropping any retired products that no
  // longer exist in the active three-product catalog.
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
    const normalizedProduct = {
      ...product,
      image: getProductImage(product),
      imageAlt: getProductAltText(product),
    };
    setItems(prev => {
      // Use shopifyHandle as primary key if available, fallback to id
      const key = normalizedProduct.shopifyHandle || normalizedProduct.id;
      const existing = prev.find(i => (i.shopifyHandle || i.id) === key);
      if (existing) {
        return prev.map(i => (i.shopifyHandle || i.id) === key ? { ...i, qty: i.qty + qty, image: normalizedProduct.image, imageAlt: normalizedProduct.imageAlt } : i);
      }
      return [...prev, { ...normalizedProduct, qty }];
    });
    showToast({ title: 'Added to your cart', description: normalizedProduct.name });
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
      totalItems, subtotal, drawerOpen, setDrawerOpen, toast, clearToast,
      refreshed, dismissRefreshed
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