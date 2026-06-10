import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import { getShopifyBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

export default function BuildYourRitual() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useSEO({
    title: 'Build Your Ritual Bundle | Torch Republic Coffee Company',
    description: 'Create your Torch Republic ritual with curated coffee, mushroom coffee, and matcha bundles designed for morning energy, focus, calm clarity, and daily intention.',
    url: '/build-your-ritual',
  });

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, productId) => {
      const product = ALL_PRODUCTS.find(p => p.id === productId);
      return sum + (product?.price || 0);
    }, 0);
  }, [selectedProducts]);

  const bundlePrice = 74.97;
  const savings = totalPrice - bundlePrice;

  const toggleProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), productId]; // Replace oldest with new
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = () => {
    if (selectedProducts.length === 3) {
      const items = selectedProducts.map(id => {
        const product = ALL_PRODUCTS.find(p => p.id === id);
        const handle = product?.shopifyHandle;
        console.log('[Bundle] Selected:', product?.name, '| shopifyHandle:', handle);
        return handle ? { slug: handle, qty: 1 } : null;
      }).filter(Boolean);

      const baseUrl = getShopifyBundleUrl(items);
      if (!baseUrl) {
        console.error('[Bundle] Failed to build Shopify bundle URL');
        alert('Could not build cart URL. Please contact support.');
        return;
      }
      const url = `${baseUrl}?discount=welcome15`;
      
      // Safety check: ensure URL uses correct Shopify domain
      if (!url.includes('libertees-for-all.myshopify.com')) {
        console.error('[Bundle] Invalid Shopify domain in URL:', url);
        alert('Checkout configuration error. Please contact support.');
        return;
      }
      
      console.log('[Bundle] Cart URL:', url);
      window.location.href = url;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#F0EBE1' }}>

      {/* Best Starter Bundle — featured at top */}
      <section className="px-6 md:px-10 pt-16 pb-0">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(230,183,173,0.07) 0%, rgba(230,183,173,0.02) 100%)', border: `1px solid ${RG}35` }}
          >
            <div className="px-6 py-2" style={{ background: RG }}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold text-center" style={{ color: '#080808' }}>
                ✦ Best Starter Bundle — Most Popular First Order
              </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
                    The Starter Ritual Bundle
                  </h2>
                  <p className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(210,195,175,0.75)', fontWeight: 400, lineHeight: 1.8 }}>
                    The easiest way to experience Torch Republic — one blend for clarity, one for daily energy, and one for calm ritual.
                  </p>
                  <div className="space-y-1 mb-5">
                    {['GlowMind Clarity — Focus & Deep Work', 'Torchbearer — Bold Classic Energy', 'The Monk Matcha — Calm Presence'].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span style={{ color: RG }}>✦</span>
                        <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: 'rgba(230,183,173,0.8)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-serif font-bold" style={{ fontSize: '1.5rem', color: RG }}>$74.97</span>
                    <span className="font-mono text-[10px] line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>$74.97 separately</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>Bundle & Save</span>
                  </div>
                  <a
                    href="https://libertees-for-all.myshopify.com/cart/49171204276476:1,49148263596284:1,49170574115068:1?discount=welcome15"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'https://libertees-for-all.myshopify.com/cart/49171204276476:1,49148263596284:1,49170574115068:1?discount=welcome15';
                    }}
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                    style={{ background: RG, color: '#080808' }}
                  >
                    Start My Ritual →
                  </a>
                </div>
                <div className="hidden md:flex flex-col gap-3">
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>3 Blends · ~79 Servings Total</p>
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>~$0.95 per serving</p>
                  </div>
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>No Machine Needed</p>
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>Instant powder — stir, sip, begin.</p>
                  </div>
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>30-Day Guarantee</p>
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>If it's not right, we make it right.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-center mt-5 mb-2" style={{ color: 'rgba(230,183,173,0.35)' }}>
            — or customize your own below —
          </p>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '350px' }}>
        <div className="absolute inset-0" style={{ background: '#0B0B0B' }} />
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7f4efdbaa_LIVEFREESTAYREADY15x5in.png"
          alt="Torch Republic bundles"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, #080808 100%)' }} />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: `${RG}60` }}>
              Build Your Ritual Bundle
            </p>
            <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Mix &amp; Match Any 3 Blends
            </h1>
            <p className="font-heading max-w-2xl mx-auto mb-6" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85 }}>
              Choose your three favorite blends and save when you bundle. From mushroom coffee to ceremonial matcha — create your perfect ritual.
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: RG }}>3</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Blends</p>
              </div>
              <div className="w-px h-10" style={{ background: `${RG}30` }} />
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: RG }}>${bundlePrice}</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Bundle Price</p>
              </div>
              <div className="w-px h-10" style={{ background: `${RG}30` }} />
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: EMERALD }}>Save ${Math.max(0, (24.99 * 3 - bundlePrice).toFixed(2))}</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Max Savings</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Builder Section */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Selection */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}50` }}>
                  Step 1 of 2
                </p>
                <h2 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
                  Choose Your Blends
                </h2>
                <p className="font-heading" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
                  Select any three products from our collection. Mix mushroom coffee, matcha, or classic blends.
                </p>
              </motion.div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['All', 'Mushroom Coffee', 'Matcha', 'Classic Coffee'].map((cat, i) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase transition-all ${i === 0 ? 'scale-105' : 'hover:scale-105'}`}
                    style={{
                      background: i === 0 ? `${RG}15` : 'transparent',
                      border: `1px solid ${i === 0 ? RG : `${RG}20`}`,
                      color: i === 0 ? RG : `${RG}50`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALL_PRODUCTS.map((product, i) => {
                  const isSelected = selectedProducts.includes(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => toggleProduct(product.id)}
                      className={`cursor-pointer rounded-sm overflow-hidden transition-all ${isSelected ? 'ring-2 ring-rose-gold' : 'hover:ring-1 hover:ring-rose-gold/30'}`}
                      style={{
                        background: isSelected ? 'rgba(230,183,173,0.08)' : '#0F0E0E',
                        border: `1px solid ${isSelected ? RG : `${product.accent}20`}`,
                      }}
                    >
                      <div className="flex items-start gap-4 p-4">
                        <div className="w-20 h-20 flex-shrink-0" style={{ background: '#0C0C0C' }}>
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif font-bold text-white text-sm mb-1 truncate">{product.name}</h3>
                          <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: product.accent }}>
                            {product.category === 'matcha' ? 'Ceremonial Matcha' : product.category === 'classic-coffee' ? 'Classic Coffee' : 'Mushroom Coffee'}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold" style={{ fontSize: '1.1rem', color: product.accent }}>
                              ${product.price}
                            </span>
                            {isSelected ? (
                              <div className="flex items-center gap-1" style={{ color: RG }}>
                                <Check size={14} />
                                <span className="font-mono text-[7px] tracking-[0.2em] uppercase">Selected</span>
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: `${RG}30` }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bundle Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-24"
                style={{
                  background: '#0F0E0E',
                  border: `1px solid ${RG}20`,
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${RG}70` }}>
                  Your Bundle
                </p>

                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag size={48} style={{ color: `${RG}20`, margin: '0 auto 16px' }} />
                    <p className="font-heading mb-2" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
                      Select 3 blends to build your bundle
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      <AnimatePresence>
                        {selectedProducts.map((productId, i) => {
                          const product = ALL_PRODUCTS.find(p => p.id === productId);
                          if (!product) return null;
                          return (
                            <motion.div
                              key={productId}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12" style={{ background: '#0C0C0C', border: `1px solid ${product.accent}20` }}>
                                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                                </div>
                                <div>
                                  <p className="font-serif font-bold text-white text-xs">{product.name}</p>
                                  <p className="font-mono text-[7px] tracking-[0.2em]" style={{ color: product.accent }}>
                                    ${product.price}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => toggleProduct(productId)}
                                className="p-1 transition-colors hover:opacity-70"
                                style={{ color: `${RG}50` }}
                              >
                                <X size={14} />
                              </button>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {selectedProducts.length < 3 ? (
                      <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-center mb-4" style={{ color: `${RG}50` }}>
                        Select {3 - selectedProducts.length} more blend{3 - selectedProducts.length > 1 ? 's' : ''}
                      </p>
                    ) : (
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2" style={{ color: EMERALD }}>
                          <Sparkles size={14} />
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase">Bundle discount applied</span>
                        </div>
                        {savings > 0 && (
                          <p className="font-mono text-[8px] tracking-[0.2em] text-right" style={{ color: EMERALD }}>
                            You're saving ${savings.toFixed(2)}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="pt-4 border-t" style={{ borderColor: `${RG}20` }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
                          Regular Price
                        </span>
                        <span className="font-mono text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: EMERALD }}>
                          Bundle Price
                        </span>
                        <span className="font-serif font-bold text-lg" style={{ color: RG }}>
                          ${bundlePrice}
                        </span>
                      </div>
                      {savings > 0 && (
                        <div className="flex items-center justify-between mb-4 p-2" style={{ background: `${EMERALD}10`, border: `1px solid ${EMERALD}30` }}>
                          <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: EMERALD }}>
                            Total Savings
                          </span>
                          <span className="font-mono text-sm font-bold" style={{ color: EMERALD }}>
                            ${savings.toFixed(2)}
                          </span>
                        </div>
                      )}

                      <button
                        onClick={handleAddToCart}
                        disabled={selectedProducts.length !== 3}
                        className={`w-full font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all py-4 rounded-sm ${
                          selectedProducts.length === 3 ? 'hover:opacity-90 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                        }`}
                        style={{
                          background: selectedProducts.length === 3 ? RG : `${RG}30`,
                          color: selectedProducts.length === 3 ? '#050505' : 'rgba(255,255,255,0.3)',
                        }}
                      >
                        Add Bundle to Cart — ${bundlePrice}
                      </button>

                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-center mt-4" style={{ color: `${RG}40` }}>
                        ✦ Free shipping · 30-day guarantee
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile checkout CTA when bundle is complete */}
      {selectedProducts.length === 3 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 flex justify-center px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <a
            href={(() => {
              const items = selectedProducts.map(id => {
                const product = ALL_PRODUCTS.find(p => p.id === id);
                return product?.shopifyHandle ? { slug: product.shopifyHandle, qty: 1 } : null;
              }).filter(Boolean);
              const baseUrl = getShopifyBundleUrl(items);
              return baseUrl ? `${baseUrl}?discount=welcome15` : '#';
            })()}
            onClick={(e) => {
              e.preventDefault();
              const items = selectedProducts.map(id => {
                const product = ALL_PRODUCTS.find(p => p.id === id);
                return product?.shopifyHandle ? { slug: product.shopifyHandle, qty: 1 } : null;
              }).filter(Boolean);
              const baseUrl = getShopifyBundleUrl(items);
              const url = baseUrl ? `${baseUrl}?discount=welcome15` : null;
              if (url && url.includes('libertees-for-all.myshopify.com')) {
                window.location.href = url;
              } else {
                console.error('[Mobile CTA] Invalid checkout URL:', url);
                alert('Unable to proceed to checkout. Please contact support.');
              }
            }}
            className="w-full font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-4"
            style={{ background: RG, color: '#080808', boxShadow: '0 4px 24px rgba(0,0,0,0.7)', textDecoration: 'none', display: 'block' }}
          >
            Add Bundle to Cart — ${bundlePrice}
          </a>
        </div>
      )}

      {/* Trust Bar */}
      <section className="px-6 md:px-10 py-12" style={{ borderTop: `1px solid ${RG}10` }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              'Free Shipping on Bundles',
              '30-Day Satisfaction Guarantee',
              'Cancel Subscription Anytime',
              'Premium Functional Ingredients',
            ].map((item, i) => (
              <span key={i} className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
                ✦ {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}