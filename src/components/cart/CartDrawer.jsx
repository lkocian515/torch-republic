import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ExternalLink } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, isLoading, removeFromCart, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-heading font-black uppercase tracking-widest text-sm">
                  Your Cart
                </h2>
                {cart?.totalQuantity > 0 && (
                  <span className="font-mono text-xs text-muted-foreground">
                    ({cart.totalQuantity} {cart.totalQuantity === 1 ? 'item' : 'items'})
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {!cart || cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
                  <p className="font-mono text-sm text-muted-foreground">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs text-primary tracking-widest uppercase hover:underline"
                  >
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                cart.lines.map((line) => (
                  <div key={line.id} className="flex gap-4 py-4 border-b border-border/50">
                    {/* Image */}
                    {line.imageUrl && (
                      <div className="w-20 h-20 bg-card flex-shrink-0 overflow-hidden">
                        <img src={line.imageUrl} alt={line.productTitle} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-sm leading-tight truncate">
                        {line.productTitle}
                      </p>
                      {line.selectedOptions?.filter(o => o.value !== 'Default Title').map(opt => (
                        <p key={opt.name} className="font-mono text-xs text-muted-foreground mt-0.5">
                          {opt.name}: {opt.value}
                        </p>
                      ))}
                      <p className="font-mono text-xs text-primary mt-1">
                        ${line.price.toFixed(2)}
                      </p>

                      {/* Quantity + Remove */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 font-mono text-xs">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(line.id)}
                          disabled={isLoading}
                          className="font-mono text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-sm font-bold">
                        ${line.lineTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="border-t border-border px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Subtotal</span>
                  <span className="font-mono text-lg font-bold">${cart.total.toFixed(2)}</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  Shipping & taxes calculated at checkout
                </p>
                <a
                  href={cart.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground font-mono text-sm tracking-widest uppercase hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Checkout — ${cart.total.toFixed(2)}
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}