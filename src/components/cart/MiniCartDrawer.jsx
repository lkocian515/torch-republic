import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

export default function MiniCartDrawer() {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[160] flex flex-col"
            style={{ width: 'min(420px, 100vw)', background: '#0C0B0A', borderLeft: '1px solid rgba(230,183,173,0.12)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" style={{ color: '#E6B7AD' }} />
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: '#E6B7AD' }}>
                  Your Cart · {totalItems}
                </p>
              </div>
              <button onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center w-8 h-8 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-center py-16">
                  <ShoppingBag className="w-10 h-10" style={{ color: 'rgba(230,183,173,0.2)' }} />
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(230,183,173,0.4)' }}>
                    Your cart is empty
                  </p>
                  <Link to="/shop" onClick={() => setDrawerOpen(false)}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase px-6 py-3 transition-all hover:opacity-80"
                    style={{ background: '#E6B7AD', color: '#080808', fontWeight: 700 }}>
                    Shop the Blends
                  </Link>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-start gap-4 pb-4"
                    style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
                    {item.image && (
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden"
                        style={{ background: '#111', border: `1px solid ${item.accent}20` }}>
                        <img src={item.image} alt={item.name}
                          className="w-full h-full object-contain p-1" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-serif text-white font-semibold text-sm leading-tight">{item.name}</p>
                          <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5"
                            style={{ color: 'rgba(230,183,173,0.5)' }}>{item.roast}</p>
                          <p className="font-mono text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                            27 servings per tube
                          </p>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 hover:text-white transition-colors mt-0.5"
                          style={{ color: 'rgba(255,255,255,0.25)' }}>
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQty(item.id, -1)}
                            className="flex items-center justify-center transition-colors hover:border-rose-gold"
                            style={{ width: 24, height: 24, border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(255,255,255,0.5)' }}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-sm w-8 text-center"
                            style={{ color: 'rgba(255,255,255,0.8)' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}
                            className="flex items-center justify-center transition-colors hover:border-rose-gold"
                            style={{ width: 24, height: 24, border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(255,255,255,0.5)' }}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-mono font-bold text-sm" style={{ color: '#E6B7AD' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 flex flex-col gap-3"
                style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
                  <span className="font-mono font-bold" style={{ color: '#F7F1E8', fontSize: '1.1rem' }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-mono text-[8px] text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Shipping calculated at checkout
                </p>
                <Link to="/Cart" onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4"
                  style={{ background: '#E6B7AD', color: '#080808' }}>
                  Checkout Securely
                </Link>
                <button onClick={() => setDrawerOpen(false)}
                  className="font-mono text-[9px] tracking-[0.25em] uppercase text-center transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(230,183,173,0.4)' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}