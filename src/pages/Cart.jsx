import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import useNoIndex from '@/hooks/useNoIndex';
import { useSEO } from '@/hooks/useSEO';
import CartFreeShippingBar from '@/components/cart/CartFreeShippingBar';
import CartRecommendations from '@/components/cart/CartRecommendations';
import CartDeliveryEstimate from '@/components/cart/CartDeliveryEstimate';
import CartFirstTimeOffer from '@/components/cart/CartFirstTimeOffer';
import CartStickyCheckout from '@/components/cart/CartStickyCheckout';
import FreeGiftSelection from '@/components/cart/FreeGiftSelection';
import { trackFreeShippingThresholdReached } from '@/lib/analytics';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/siteConfig';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { useMutation } from '@tanstack/react-query';

// Light Torch Republic cart theme
const PAGE_BG = '#FBF8F2';
const CARD = '#FFFFFF';
const INK = '#2D2824';
const INK_SOFT = '#5C544C';
const MUTED = '#6A5A4A';
const MUTED_MED = '#6A5A4A';
const BORDER = '#E4D8C9';
const ACCENT = '#B86543';
const ACCENT_PANEL = 'rgba(184,101,67,0.06)';
const BTN_TEXT = '#FBF8F1';

export default function Cart() {
  useNoIndex();
  useSEO({
    title: 'Your Cart',
    description: 'Review your Torch Republic cart and proceed to checkout.',
    url: '/cart',
    noindex: true,
  });
  const { items, updateQty, removeItem, subtotal, totalItems, refreshed, dismissRefreshed, handleCheckout, isCheckingOut } = useCart();
  const subscriptionItems = items.filter(i => i.isSubscription && i.sellingPlanName);
  const qtyMutation = useMutation({
    mutationFn: async () => true,
    onMutate: ({ id, delta }) => updateQty(id, delta),
  });
  const removeMutation = useMutation({
    mutationFn: async () => true,
    onMutate: (id) => removeItem(id),
  });

  // Track when free shipping threshold is reached
  useEffect(() => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      trackFreeShippingThresholdReached(subtotal);
    }
  }, [subtotal]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: PAGE_BG, color: INK }}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: ACCENT_PANEL, border: `1px solid ${BORDER}` }}>
            <ShoppingBag className="w-7 h-7" style={{ color: ACCENT }} />
          </div>
          <h1 className="font-serif font-bold text-3xl mb-4" style={{ color: INK }}>
            Your Ritual Starts Here
          </h1>
          <p className="font-heading mb-10 leading-relaxed" style={{ color: MUTED_MED, fontWeight: 300, fontSize: '0.95rem' }}>
            Discover premium instant coffee and mushroom coffee crafted for modern rituals.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/shop"
              className="font-mono text-xs tracking-[0.12em] uppercase font-bold px-12 py-4 transition-all hover:opacity-90"
              style={{ background: ACCENT, color: BTN_TEXT }}>
              Shop Best Sellers →
            </Link>

          </div>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase mt-8" style={{ color: MUTED }}>
            Have a discount code? Enter it at checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: PAGE_BG, color: INK }}>
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 py-10">

        {/* Header — stacks on narrow screens so nothing is clipped */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="font-serif font-bold text-xl sm:text-2xl min-w-0" style={{ color: INK }}>
            Your Ritual Is Ready <span className="font-mono text-base font-normal" style={{ color: MUTED }}>({totalItems})</span>
          </h1>
          <Link to="/shop" className="flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase transition-all hover:opacity-70 self-start sm:self-auto whitespace-nowrap" style={{ color: ACCENT }}>
            <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
            Continue Shopping
          </Link>
        </div>

        {/* Cart was refreshed to drop retired products */}
        {refreshed && (
          <div className="mb-4 flex items-center justify-between gap-3 p-3" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.25)' }}>
            <p className="font-mono text-xs tracking-[0.12em]" style={{ color: '#0f766e' }}>
              Your cart was refreshed to match the current collection.
            </p>
            <button onClick={dismissRefreshed} aria-label="Dismiss notice" className="shrink-0" style={{ color: '#0f766e' }}>
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
          {/* Items + shipping progress */}
          <div className="min-w-0 space-y-4">
            {/* Free shipping progress — compact, above items */}
            <CartFreeShippingBar subtotal={subtotal} />
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex items-center gap-4 p-4"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
              >
                <img src={getProductImage(item)} alt={item.imageAlt || getProductAltText(item)} className="w-16 h-16 object-contain flex-shrink-0" style={{ background: '#F8F5EF', padding: '4px' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-base mb-1 leading-snug" style={{ color: INK }}>{item.name}</p>
                  <p className="font-mono text-xs tracking-[0.1em] uppercase mb-2" style={{ color: MUTED }}>
                    {item.category === 'classic-coffee' ? 'Classic Coffee' : item.category === 'pumpkin-spice' ? 'Whole Bean' : item.category === 'bundle' ? 'Coffee Duo' : 'Mushroom Coffee'}
                    {item.format === 'Whole Bean' || item.category === 'pumpkin-spice' ? ` · ${item.weight || '12 oz'}` : ` · ${item.servings || 27} servings`}
                  </p>
                  {item.isSubscription && item.sellingPlanName && (
                    <p className="font-mono text-xs tracking-[0.08em] uppercase mb-2" style={{ color: '#0f766e' }}>
                      {item.sellingPlanName}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2" style={{ border: `1px solid ${BORDER}` }}>
                      <button
                        onClick={() => item.qty <= 1 ? removeMutation.mutate(item.id) : qtyMutation.mutate({ id: item.id, delta: -1 })}
                        className="w-11 h-11 flex items-center justify-center transition-all hover:opacity-70"
                        style={{ color: INK_SOFT }}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs w-5 text-center" style={{ color: INK }}>{item.qty}</span>
                      <button
                        onClick={() => qtyMutation.mutate({ id: item.id, delta: 1 })}
                        className="w-11 h-11 flex items-center justify-center transition-all hover:opacity-70"
                        style={{ color: INK_SOFT }}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono font-bold text-sm" style={{ color: ACCENT }}>${((item.shopifyPrice ? parseFloat(item.shopifyPrice) : item.price) * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeMutation.mutate(item.id)}
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0 transition-all hover:opacity-70"
                  style={{ color: MUTED }}
                  aria-label="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            {/* Free gift selection — after items */}
            <FreeGiftSelection />

            {/* Smart product recommendations */}
            <CartRecommendations cartItems={items} />
          </div>

          {/* Summary */}
          <div className="min-w-0">
            <div className="sticky top-24 p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <CartFirstTimeOffer />
              <p className="font-mono text-xs tracking-[0.12em] uppercase mb-6" style={{ color: ACCENT }}>Order Summary</p>

              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs tracking-[0.08em]" style={{ color: MUTED_MED }}>Subtotal</span>
                <span className="font-mono font-bold" style={{ color: INK }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-[0.08em]" style={{ color: MUTED_MED }}>Shipping</span>
                <span className="font-mono text-xs" style={{ color: '#0f766e' }}>Calculated at checkout</span>
              </div>

              {/* Delivery estimate */}
              <CartDeliveryEstimate />

              {/* Recurring billing summary — shown when subscription items are in the cart */}
              {subscriptionItems.length > 0 && (
                <div className="mb-4 p-3" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.22)' }}>
                  <p className="font-mono text-[11px] tracking-[0.1em] uppercase mb-2" style={{ color: '#0f766e' }}>
                    Recurring Billing
                  </p>
                  <div className="space-y-1.5 mb-2">
                    {subscriptionItems.map(item => (
                      <div key={item.id} className="flex items-start justify-between gap-2">
                        <p className="font-heading text-xs leading-snug" style={{ color: INK_SOFT }}>
                          {item.name} <span style={{ color: MUTED }}>({item.sellingPlanName})</span>
                        </p>
                        <p className="font-mono text-xs font-bold whitespace-nowrap" style={{ color: INK }}>
                          ${(item.price * item.qty).toFixed(2)}/delivery
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="font-heading text-[11px] leading-relaxed" style={{ color: MUTED_MED }}>
                    These items renew automatically at the price and interval shown until cancelled. Cancel anytime through your customer account.
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase font-bold transition-all hover:opacity-90 py-4 mb-3"
                style={{ background: ACCENT, color: BTN_TEXT, minHeight: '52px', border: 'none', cursor: isCheckingOut ? 'wait' : 'pointer', opacity: isCheckingOut ? 0.7 : 1 }}
              >
                {isCheckingOut ? 'Preparing Checkout...' : 'Continue to Checkout'}
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-4">
                <span className="font-mono text-xs tracking-[0.08em]" style={{ color: MUTED }}>Secure Checkout</span>
                <span style={{ color: BORDER }}>•</span>
                <span className="font-mono text-xs tracking-[0.08em]" style={{ color: MUTED }}>Ships from the U.S.</span>
                <span style={{ color: BORDER }}>•</span>
                <Link to="/shipping-policy" className="font-mono text-xs tracking-[0.08em] transition-opacity hover:opacity-70" style={{ color: MUTED }}>Shipping &amp; Returns</Link>
              </div>

              <Link to="/shop"
                className="w-full block text-center font-mono text-xs tracking-[0.1em] uppercase py-3 transition-all hover:opacity-70"
                style={{ border: `1px solid ${BORDER}`, color: ACCENT }}>
                ← Continue Shopping
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <CartStickyCheckout subtotal={subtotal} totalItems={totalItems} onCheckout={handleCheckout} isCheckingOut={isCheckingOut} />

      {/* Bottom spacing so content clears the fixed mobile checkout bar and
          the fixed bottom navigation on every viewport. */}
      <div aria-hidden className="lg:hidden" style={{ height: 'calc(env(safe-area-inset-bottom) + 96px)' }} />
      <div aria-hidden className="md:hidden" style={{ height: 'var(--bottom-nav-height)' }} />
    </div>
  );
}