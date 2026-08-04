import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { SHOPIFY_CART_URL, getShopifyBundleUrl, SHOPIFY_VARIANT_IDS } from '@/lib/shopifyCheckout';
import { Minus, Plus, X, ShoppingBag, Lock, ArrowLeft, Flame } from 'lucide-react';
import useNoIndex from '@/hooks/useNoIndex';
import { useSEO } from '@/hooks/useSEO';
import CartFreeShippingBar from '@/components/cart/CartFreeShippingBar';
import CartRecommendations from '@/components/cart/CartRecommendations';
import CartBundleUpsell from '@/components/cart/CartBundleUpsell';
import CartTrustBlock from '@/components/cart/CartTrustBlock';
import CartDeliveryEstimate from '@/components/cart/CartDeliveryEstimate';
import CartFirstTimeOffer from '@/components/cart/CartFirstTimeOffer';
import CartSubscriptionPromo from '@/components/cart/CartSubscriptionPromo';
import CartStickyCheckout from '@/components/cart/CartStickyCheckout';
import CartBundleIncentive from '@/components/cart/CartBundleIncentive';
import CartReassurance from '@/components/cart/CartReassurance';
import CartReviewSnippets from '@/components/cart/CartReviewSnippets';
import { trackFreeShippingThresholdReached, trackCheckoutStarted } from '@/lib/analytics';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/siteConfig';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { useMutation } from '@tanstack/react-query';

const RG = '#E6B7AD';

export default function Cart() {
  useNoIndex();
  useSEO({
    title: 'Your Cart',
    description: 'Review your Torch Republic cart and proceed to checkout.',
    url: '/cart',
    noindex: true,
  });
  const { items, updateQty, removeItem, subtotal, totalItems } = useCart();
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

  // Build the Shopify checkout URL with all current cart items
  const checkoutUrl = useMemo(() => {
    if (items.length === 0) {
      console.error('[Cart] Empty cart - no checkout URL');
      return null;
    }
    const mapped = items
      .filter(i => {
        const handle = i.shopifyHandle || i.id;
        const hasVariant = !!SHOPIFY_VARIANT_IDS[handle];
        if (!hasVariant) {
          console.error('[Cart] Missing variant ID for:', i.name, '| handle:', handle);
        }
        return hasVariant;
      })
      .map(i => ({ slug: i.shopifyHandle || i.id, qty: i.qty }));
    if (mapped.length === 0) {
      console.error('[Cart] No valid Shopify variants mapped');
      return null;
    }
    const baseUrl = getShopifyBundleUrl(mapped);
    if (!baseUrl) {
      console.error('[Cart] Failed to build Shopify bundle URL');
      return null;
    }
    console.log('[Cart] Checkout URL:', baseUrl);
    return baseUrl;
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#080808', color: '#F0EBE1' }}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.15)' }}>
            <ShoppingBag className="w-7 h-7" style={{ color: 'rgba(230,183,173,0.4)' }} />
          </div>
          <h1 className="font-serif font-bold text-3xl mb-4" style={{ color: '#F5EFE6' }}>
            Your Ritual Starts Here
          </h1>
          <p className="font-heading mb-10 leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, fontSize: '0.95rem' }}>
            Discover premium instant coffee, mushroom blends, and ceremonial matcha crafted for modern rituals.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/shop"
              className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold px-12 py-4 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Shop Best Sellers →
            </Link>
            <Link to="/build-your-ritual"
              className="font-mono text-[9px] tracking-[0.25em] uppercase py-3 px-10 transition-all hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Build Your Ritual
            </Link>
          </div>
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-8" style={{ color: 'rgba(230,183,173,0.35)' }}>
            Have a discount code? Enter it at checkout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#F0EBE1' }}>
      <div className="max-w-[900px] mx-auto px-6 md:px-10 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-serif font-bold text-2xl" style={{ color: '#F5EFE6' }}>
            Your Ritual Is Ready <span className="font-mono text-base font-normal" style={{ color: 'rgba(230,183,173,0.5)' }}>({totalItems})</span>
          </h1>
          <Link to="/shop" className="flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-70" style={{ color: 'rgba(230,183,173,0.6)' }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </Link>
        </div>

        {/* First-time customer welcome + Free shipping progress */}
        <CartFirstTimeOffer />
        <CartFreeShippingBar subtotal={subtotal} />
        <CartBundleIncentive itemCount={totalItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex items-center gap-4 p-4"
                style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.1)' }}
              >
                <img src={getProductImage(item)} alt={item.imageAlt || getProductAltText(item)} className="w-16 h-16 object-contain flex-shrink-0" style={{ background: '#F8F5EF', padding: '4px' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-sm mb-0.5 truncate" style={{ color: '#F5EFE6' }}>{item.name}</p>
                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    {item.category === 'matcha' ? 'Ceremonial Matcha' : item.category === 'classic-coffee' ? 'Classic Coffee' : 'Mushroom Coffee'}
                    {' · '}{item.servings || (item.category === 'matcha' ? 25 : 27)} servings
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2" style={{ border: '1px solid rgba(230,183,173,0.15)' }}>
                      <button
                        onClick={() => item.qty <= 1 ? removeMutation.mutate(item.id) : qtyMutation.mutate({ id: item.id, delta: -1 })}
                        className="w-8 h-8 flex items-center justify-center transition-all hover:opacity-70"
                        style={{ color: 'rgba(230,183,173,0.6)' }}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs w-5 text-center" style={{ color: '#F5EFE6' }}>{item.qty}</span>
                      <button
                        onClick={() => qtyMutation.mutate({ id: item.id, delta: 1 })}
                        className="w-8 h-8 flex items-center justify-center transition-all hover:opacity-70"
                        style={{ color: 'rgba(230,183,173,0.6)' }}
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-mono font-bold text-sm" style={{ color: RG }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeMutation.mutate(item.id)}
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all hover:opacity-70"
                  style={{ color: 'rgba(230,183,173,0.35)' }}
                  aria-label="Remove item"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            {/* Smart product recommendations */}
            <CartRecommendations cartItems={items} />
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6" style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.15)' }}>
              <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.5)' }}>Order Summary</p>

              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>Subtotal</span>
                <span className="font-mono font-bold" style={{ color: '#F5EFE6' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>Shipping</span>
                <span className="font-mono text-[10px]" style={{ color: '#10B981' }}>Calculated at checkout</span>
              </div>

              {/* Delivery estimate */}
              <CartDeliveryEstimate />

              {/* Rotating review snippets — social proof */}
              <CartReviewSnippets />

              {/* Bundle upsell */}
              <CartBundleUpsell cartItems={items} subtotal={subtotal} />

              {/* Subscription promotion */}
              <CartSubscriptionPromo subtotal={subtotal} />

              {/* Torchbearers Rewards nudge */}
              <div className="mb-4 p-3" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.12)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-3 h-3" style={{ color: RG }} />
                  <p className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
                    Torchbearers Rewards
                  </p>
                </div>
                <p className="font-mono text-[7.5px] tracking-[0.12em] text-center" style={{ color: 'rgba(245,239,230,0.6)', lineHeight: 1.6 }}>
                  Earn points on this order! Join Torchbearers Rewards at checkout.
                </p>
              </div>

              {!checkoutUrl ? (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase font-bold py-4 mb-3 opacity-50 cursor-not-allowed"
                  style={{ background: 'rgba(230,183,173,0.3)', color: 'rgba(255,255,255,0.3)' }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  Your cart is empty
                </button>
              ) : (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCheckoutStarted(subtotal, totalItems)}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-4 mb-3"
                  style={{ background: RG, color: '#080808', textDecoration: 'none', display: 'flex' }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  Secure Checkout →
                </a>
              )}

              <p className="font-mono text-[7px] tracking-[0.15em] text-center mb-4" style={{ color: 'rgba(230,183,173,0.45)', lineHeight: 1.8 }}>
                Secure checkout powered by Shopify
              </p>

              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Secure Checkout</span>
                <span style={{ color: 'rgba(230,183,173,0.2)' }}>•</span>
                <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Ships from the U.S.</span>
                <span style={{ color: 'rgba(230,183,173,0.2)' }}>•</span>
                <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>Easy Returns</span>
              </div>

              <Link to="/shop"
                className="w-full block text-center font-mono text-[9px] tracking-[0.25em] uppercase py-3 transition-all hover:opacity-70"
                style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.55)' }}>
                ← Continue Shopping
              </Link>

              {/* Trust confidence block */}
              <CartTrustBlock />
            </div>

            {/* Checkout reassurance — full width below summary */}
            <CartReassurance />
          </div>
        </div>
      </div>

      {/* Mobile sticky checkout bar */}
      <CartStickyCheckout subtotal={subtotal} checkoutUrl={checkoutUrl} totalItems={totalItems} />

      {/* Mobile bottom spacing for sticky bar */}
      <div className="lg:hidden h-20" />
    </div>
  );
}