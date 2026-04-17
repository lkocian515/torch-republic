import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Flame, ChevronRight, Plus, Minus, X, Lock, Gift } from 'lucide-react';

// Sample cart state — in a real integration this would come from Shopify cart API
const INITIAL_ITEMS = [
  {
    id: 'tr-001',
    code: 'TR-001',
    name: 'Washington Blend',
    roast: 'Dark Roast · 12 oz',
    price: 18.99,
    qty: 1,
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757',
    series: "Founders Series",
  },
];

const UPSELL = {
  name: 'Jefferson Blend',
  roast: 'Medium Roast · 12 oz',
  price: 18.99,
  route: '/JeffersonBlend',
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841',
};

const TRUST = [
  { icon: Lock, label: '256-Bit SSL Encrypted' },
  { icon: ShieldCheck, label: 'Flame Guarantee' },
  { icon: RotateCcw, label: '30-Day Returns' },
  { icon: Truck, label: 'Free Shipping $150+' },
];

const STEPS = ['Cart', 'Shipping', 'Payment'];

function QtyBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center transition-colors hover:text-white"
      style={{ width: 28, height: 28, border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(255,255,255,0.4)', background: 'transparent', flexShrink: 0 }}
    >
      {children}
    </button>
  );
}

export default function Cart() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [torchBox, setTorchBox] = useState(false);
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [email, setEmail] = useState('');

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0) + (upsellAdded ? UPSELL.price : 0);
  const torchBoxDiscount = torchBox ? subtotal * 0.15 : 0;
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const total = subtotal - torchBoxDiscount + shipping;
  const freeShippingRemaining = Math.max(0, 150 - subtotal);

  const allItems = [
    ...items,
    ...(upsellAdded ? [{ ...UPSELL, id: 'upsell', qty: 1, code: 'TR-002', series: 'Founders Series' }] : []),
  ];

  const buildShopifyCartUrl = () => {
    // Build Shopify cart URL — in production map handles to variant IDs
    return 'https://torch-republic.myshopify.com/cart';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060608', color: '#F0EBE1' }}>

      {/* Progress bar */}
      <div className="w-full" style={{ borderBottom: '1px solid rgba(196,163,90,0.08)', background: '#040406' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-4">
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((step, i) => (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center justify-center font-mono text-[10px] font-black"
                    style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: i === 0 ? '#C9A24A' : 'transparent',
                      border: i === 0 ? 'none' : '1px solid rgba(196,163,90,0.2)',
                      color: i === 0 ? '#000' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: i === 0 ? 'rgba(201,162,74,0.8)' : 'rgba(255,255,255,0.22)' }}
                  >
                    {step}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mx-4 h-px w-10 md:w-20" style={{ background: 'rgba(196,163,90,0.12)' }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

          {/* LEFT: Cart items + email + torch box */}
          <div className="flex flex-col gap-8">

            {/* Headline */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.6)' }} />
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
                  Secure Checkout · Torch Republic
                </p>
              </div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.01em' }}>
                Your Cart
              </h1>
            </div>

            {/* Free shipping progress */}
            {freeShippingRemaining > 0 && (
              <div className="p-4" style={{ background: 'rgba(201,162,74,0.06)', border: '1px solid rgba(201,162,74,0.12)' }}>
                <p className="font-mono text-[10px] uppercase tracking-wider mb-2.5" style={{ color: 'rgba(201,162,74,0.6)' }}>
                  Add ${freeShippingRemaining.toFixed(2)} more for free shipping
                </p>
                <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-1 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%`, background: '#C9A24A' }} />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {allItems.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-5 p-5"
                    style={{ background: '#0E0E12', border: '1px solid rgba(196,163,90,0.08)' }}
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 overflow-hidden" style={{ width: 80, height: 100 }}>
                      <img src={item.image} alt={item.name}
                        className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(201,162,74,0.45)' }}>
                            {item.code} · {item.series}
                          </p>
                          <p className="font-serif font-bold text-white" style={{ fontSize: '1.1rem' }}>{item.name}</p>
                          <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{item.roast}</p>
                        </div>
                        {item.id !== 'upsell' && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex-shrink-0 transition-colors hover:text-white"
                            style={{ color: 'rgba(255,255,255,0.2)', padding: '4px' }}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {item.id !== 'upsell' ? (
                          <div className="flex items-center gap-2">
                            <QtyBtn onClick={() => updateQty(item.id, -1)}><Minus className="w-3 h-3" /></QtyBtn>
                            <span className="font-mono text-sm w-6 text-center" style={{ color: 'rgba(255,255,255,0.7)' }}>{item.qty}</span>
                            <QtyBtn onClick={() => updateQty(item.id, 1)}><Plus className="w-3 h-3" /></QtyBtn>
                          </div>
                        ) : (
                          <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: 'rgba(201,162,74,0.5)' }}>
                            Complete the Pair
                          </span>
                        )}
                        <span className="font-mono font-black" style={{ color: '#C9A24A', fontSize: '1rem' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Upsell suggestion */}
              {!upsellAdded && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-4"
                  style={{ background: 'rgba(201,162,74,0.04)', border: '1px dashed rgba(196,163,90,0.18)' }}
                >
                  <Gift className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.5)' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-wider mb-0.5" style={{ color: 'rgba(201,162,74,0.5)' }}>
                      Complete Your Legacy
                    </p>
                    <p className="text-white font-serif font-semibold" style={{ fontSize: '0.95rem' }}>{UPSELL.name} — ${UPSELL.price}</p>
                    <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>{UPSELL.roast}</p>
                  </div>
                  <button
                    onClick={() => setUpsellAdded(true)}
                    className="font-mono text-[10px] uppercase tracking-wider px-4 py-2 flex-shrink-0 transition-all hover:opacity-80"
                    style={{ border: '1px solid rgba(201,162,74,0.3)', color: '#C9A24A' }}
                  >
                    + Add
                  </button>
                </motion.div>
              )}
            </div>

            {/* Torch Box toggle */}
            <div className="p-6" style={{ background: 'linear-gradient(135deg, #0F0C02 0%, #0E0E12 100%)', border: '1px solid rgba(201,162,74,0.3)', boxShadow: '0 0 24px rgba(201,162,74,0.06)' }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="w-3.5 h-3.5" style={{ color: '#C9A24A' }} />
                    <p className="font-mono text-[9px] tracking-[0.4em] uppercase font-black" style={{ color: '#C9A24A' }}>
                      Turn this into a subscription and save
                    </p>
                  </div>
                  <p className="font-serif text-white font-bold mb-1" style={{ fontSize: '1.1rem' }}>
                    Upgrade to Torch Box — Save 15%
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontWeight: 300 }}>
                    Want this delivered monthly? Subscribe & save on every order. Cancel anytime. First Torch Box ships free.
                  </p>
                </div>
                <button
                  onClick={() => setTorchBox(v => !v)}
                  className="flex-shrink-0 transition-all"
                  style={{
                    width: 44, height: 24, borderRadius: 12,
                    background: torchBox ? '#C9A24A' : 'rgba(255,255,255,0.08)',
                    border: torchBox ? 'none' : '1px solid rgba(196,163,90,0.2)',
                    position: 'relative',
                  }}
                  aria-label="Toggle Torch Box subscription"
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute', top: '3px',
                    left: torchBox ? '23px' : '3px',
                    transition: 'left 0.2s ease',
                  }} />
                </button>
              </div>
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Upgrade to Torch Box and never run out.
              </p>
              {torchBox && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="font-mono text-[10px] uppercase tracking-wider mt-2 pt-3"
                  style={{ borderTop: '1px solid rgba(201,162,74,0.1)', color: 'rgba(201,162,74,0.7)' }}
                >
                  ✓ Subscription discount applied — saving ${(subtotal * 0.15).toFixed(2)}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Continue as Guest
              </p>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full outline-none transition-colors"
                style={{
                  background: '#0E0E12',
                  border: '1px solid rgba(196,163,90,0.15)',
                  padding: '14px 16px',
                  color: '#F0EBE1',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-heading)',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(196,163,90,0.45)'}
                onBlur={e => e.target.style.borderColor = 'rgba(196,163,90,0.15)'}
              />
              <p className="font-mono text-[9px] mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
                We'll send your order confirmation here.
              </p>
            </div>
          </div>

          {/* RIGHT: Order summary — sticky */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-5">
            <div className="p-7 flex flex-col gap-5" style={{ background: '#0E0E12', border: '1px solid rgba(196,163,90,0.1)' }}>
              <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
                Order Summary
              </p>

              {/* Line items summary */}
              <div className="flex flex-col gap-3">
                {allItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-shrink-0 overflow-hidden" style={{ width: 36, height: 44, background: '#111' }}>
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif text-white font-semibold truncate" style={{ fontSize: '0.85rem' }}>{item.name}</p>
                        <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>×{item.qty}</p>
                      </div>
                    </div>
                    <span className="font-mono text-sm flex-shrink-0" style={{ color: 'rgba(240,235,225,0.6)' }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px" style={{ background: 'rgba(196,163,90,0.08)' }} />

              {/* Totals */}
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between">
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Subtotal</span>
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.6)' }}>${subtotal.toFixed(2)}</span>
                </div>
                {torchBox && (
                  <div className="flex justify-between">
                    <span className="font-mono text-[11px]" style={{ color: 'rgba(201,162,74,0.6)' }}>Torch Box (−15%)</span>
                    <span className="font-mono text-[11px]" style={{ color: '#C9A24A' }}>−${torchBoxDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(255,255,255,0.38)' }}>Shipping</span>
                  <span className="font-mono text-[11px]" style={{ color: shipping === 0 ? '#C9A24A' : 'rgba(255,255,255,0.6)' }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3" style={{ borderTop: '1px solid rgba(196,163,90,0.08)' }}>
                  <span className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>Total</span>
                  <span className="font-serif font-black" style={{ fontSize: '1.3rem', color: '#C9A24A' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Cart upsell nudge */}
              <div className="p-3.5 text-center" style={{ background: 'rgba(201,162,74,0.04)', border: '1px solid rgba(201,162,74,0.1)' }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
                  Secure checkout · Fast shipping · No-risk purchase
                </p>
                <p className="font-mono text-[8px] mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Backed by our satisfaction guarantee
                </p>
              </div>

              {/* CTA */}
              <a
                href={buildShopifyCartUrl()}
                target="_self"
                className="flex items-center justify-center gap-3 w-full font-mono uppercase tracking-[0.3em] transition-all btn-glow"
                style={{
                  background: '#C9A24A', color: '#000', fontWeight: 900,
                  fontSize: '11px', padding: '18px 24px',
                }}
              >
                <Lock className="w-3.5 h-3.5" />
                Complete Purchase · Carry the Flame
              </a>

              {/* Express pay */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-center mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  or express checkout
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['Apple Pay', 'Google Pay', 'PayPal'].map(pay => (
                    <button key={pay}
                      className="py-2.5 font-mono text-[9px] uppercase tracking-wider transition-colors hover:border-white/30"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
                      {pay}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment icons */}
              <p className="font-mono text-[9px] text-center" style={{ color: 'rgba(255,255,255,0.18)' }}>
                Visa · Mastercard · Amex · Discover
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-3"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(196,163,90,0.07)' }}>
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.45)' }} />
                  <span className="font-mono text-[8px] uppercase tracking-wide leading-tight" style={{ color: 'rgba(240,235,225,0.3)' }}>{label}</span>
                </div>
              ))}
            </div>

            <p className="font-mono text-[9px] text-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
              🔒 Your cart is saved · Complete in 2 min for free shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}