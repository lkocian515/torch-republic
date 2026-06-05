import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, Plus, Minus, X, Gift } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

const TRUST = [
  { icon: Lock, label: 'SSL Encrypted' },
  { icon: ShieldCheck, label: '30-Day Guarantee' },
  { icon: Truck, label: 'Free Ship $75+' },
  { icon: ShieldCheck, label: 'Secure Checkout' },
];

function QtyBtn({ onClick, children }) {
  return (
    <button onClick={onClick}
      className="flex items-center justify-center transition-colors hover:text-white"
      style={{ width: 30, height: 30, border: '1px solid rgba(230,183,173,0.15)', color: 'rgba(255,255,255,0.45)', background: 'transparent' }}>
      {children}
    </button>
  );
}

export default function Cart() {
  const { items, updateQty, removeItem, addItem, subtotal, totalItems } = useCart();
  const shipping = subtotal >= 75 ? 0 : 7.99;
  const total = subtotal + shipping;
  const freeShippingRemaining = Math.max(0, 75 - subtotal);

  // Suggest bundle if < 6 items
  const showBundleUpsell = totalItems < 6;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050505', color: '#F7F1E8' }}>

      {/* Header */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-16 pb-4">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Torch Republic Coffee Company
        </p>
        <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F7F1E8', letterSpacing: '-0.01em' }}>
          Your Ritual Cart
        </h1>
        <p className="font-heading mt-2" style={{ fontSize: '0.9rem', color: 'rgba(247,241,232,0.4)', fontWeight: 300 }}>
          Review your instant mushroom coffee selections before checkout.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-8">
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 gap-7 text-center">
            <div style={{ width: 64, height: 64, border: '1px solid rgba(230,183,173,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck className="w-7 h-7" style={{ color: 'rgba(230,183,173,0.3)' }} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
                Your ritual cart is empty.
              </h2>
              <p className="font-heading" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300 }}>
                Start with one blend or try the full six-tube collection.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/blends"
                className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold px-8 py-4 transition-all hover:opacity-90"
                style={{ background: '#E6B7AD', color: '#080808' }}>
                Shop the Blends
              </Link>
              <Link to="/bundle"
                className="font-mono text-[10px] tracking-[0.35em] uppercase px-8 py-4 transition-all hover:border-white/25"
                style={{ border: '1px solid rgba(230,183,173,0.25)', color: 'rgba(230,183,173,0.7)' }}>
                Shop the Bundle
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">

            {/* LEFT: Items */}
            <div className="flex flex-col gap-6">

              {/* Free shipping bar */}
              {freeShippingRemaining > 0 && (
                <div className="p-4" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.1)' }}>
                  <p className="font-mono text-[9px] uppercase tracking-wider mb-2" style={{ color: 'rgba(230,183,173,0.6)' }}>
                    Add ${freeShippingRemaining.toFixed(2)} more for free shipping
                  </p>
                  <div className="w-full h-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-1 transition-all duration-500"
                      style={{ width: `${Math.min(100, (subtotal / 75) * 100)}%`, background: '#E6B7AD' }} />
                  </div>
                </div>
              )}

              {/* Cart items */}
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-4 p-5"
                    style={{ background: '#11100F', border: '1px solid rgba(230,183,173,0.08)' }}
                  >
                    {/* Image */}
                    {item.image && (
                      <div className="flex-shrink-0 overflow-hidden"
                        style={{ width: 80, height: 80, background: '#0C0B0A', border: `1px solid ${item.accent}20` }}>
                        <img src={item.image} alt={item.name}
                          className="w-full h-full object-contain p-2" />
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.4)' }}>
                            Instant Mushroom Coffee
                          </p>
                          <p className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>{item.name}</p>
                          <p className="font-mono text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.roast} · 27 servings</p>
                          <p className="font-mono text-[8px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>1.9 oz / 54g · Lion's Mane + Chaga</p>
                        </div>
                        <button onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.2)', padding: '4px' }}>
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-0" style={{ border: '1px solid rgba(230,183,173,0.15)' }}>
                          <QtyBtn onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></QtyBtn>
                          <span className="font-mono text-sm w-10 text-center"
                            style={{ color: 'rgba(255,255,255,0.8)', borderLeft: '1px solid rgba(230,183,173,0.1)', borderRight: '1px solid rgba(230,183,173,0.1)' }}>
                            {item.qty}
                          </span>
                          <QtyBtn onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></QtyBtn>
                        </div>
                        <span className="font-mono font-bold" style={{ color: '#E6B7AD', fontSize: '1rem' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Bundle upsell */}
              {showBundleUpsell && (
                <div className="flex items-center gap-4 p-4"
                  style={{ background: 'rgba(230,183,173,0.03)', border: '1px dashed rgba(230,183,173,0.15)' }}>
                  <Gift className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.5)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-0.5"
                      style={{ color: 'rgba(230,183,173,0.5)' }}>Complete Your Ritual</p>
                    <p className="text-white font-serif font-semibold text-sm">
                      Try all six blends — The Full Ritual Set
                    </p>
                  </div>
                  <Link to="/bundle"
                    className="flex-shrink-0 font-mono text-[9px] uppercase tracking-wider px-4 py-2 transition-all hover:opacity-80"
                    style={{ border: '1px solid rgba(230,183,173,0.3)', color: '#E6B7AD', whiteSpace: 'nowrap' }}>
                    Explore Bundle →
                  </Link>
                </div>
              )}

              {/* Continue shopping */}
              <Link to="/shop"
                className="font-mono text-[9px] tracking-[0.3em] uppercase transition-colors hover:text-white"
                style={{ color: 'rgba(230,183,173,0.4)' }}>
                ← Continue Shopping
              </Link>
            </div>

            {/* RIGHT: Order summary */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              <div className="p-6 flex flex-col gap-5"
                style={{ background: '#11100F', border: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  Order Summary
                </p>

                {/* Line items */}
                <div className="flex flex-col gap-3">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="flex-shrink-0 overflow-hidden"
                        style={{ width: 34, height: 34, background: '#0C0B0A', border: `1px solid ${item.accent}20` }}>
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain p-0.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-white font-semibold truncate" style={{ fontSize: '0.82rem' }}>{item.name}</p>
                        <p className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.3)' }}>×{item.qty}</p>
                      </div>
                      <span className="font-mono text-sm flex-shrink-0" style={{ color: 'rgba(247,241,232,0.6)' }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px" style={{ background: 'rgba(230,183,173,0.07)' }} />

                {/* Totals */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Subtotal</span>
                    <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Shipping</span>
                    <span className="font-mono text-[11px]" style={{ color: shipping === 0 ? '#E6B7AD' : 'rgba(255,255,255,0.6)' }}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      Free shipping at $75+
                    </p>
                  )}
                  <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
                    <span className="font-serif font-bold text-white" style={{ fontSize: '0.95rem' }}>Estimated Total</span>
                    <span className="font-mono font-black" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust micro */}
                <div className="text-center py-2">
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>
                    27 Servings · Lion's Mane + Chaga · Instant Coffee
                  </p>
                </div>

                {/* Checkout CTA — goes to Shopify */}
                <a
                  href={SHOPIFY_CART_URL}
                  className="flex items-center justify-center gap-2 w-full font-mono uppercase tracking-[0.3em] transition-all hover:opacity-90"
                  style={{ background: '#E6B7AD', color: '#050505', fontWeight: 900, fontSize: '11px', padding: '16px 24px' }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  Checkout Securely
                </a>

                <p className="font-mono text-[8px] text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Secure checkout via Shopify · Encrypted payment
                </p>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2">
                {TRUST.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-3"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.06)' }}>
                    <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />
                    <span className="font-mono text-[8px] uppercase tracking-wide" style={{ color: 'rgba(247,241,232,0.28)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}