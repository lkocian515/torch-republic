import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ShoppingBag, Sparkles } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { getShopifyBundleUrl } from '@/lib/shopifyCheckout';
import { base44 } from '@/api/base44Client';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '@/lib/mushroomProducts';

const LOCAL_IMAGE_MAP = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS]
  .reduce((acc, p) => { acc[p.shopifyHandle] = p.image; return acc; }, {});

import { BUNDLE_PRICE_3, getPriceByCategory } from '@/lib/pricingConfig';

const RG = '#E6B7AD';
const EMERALD = '#10B981';
// Fixed bundle price — always $49.99 regardless of products selected
const BUNDLE_PRICE = BUNDLE_PRICE_3;
const INDIVIDUAL_PRICE = 22.99; // default fallback price
const BUNDLE_SIZE = 3;

// Core 12 products with their Shopify handles
const CORE_PRODUCT_HANDLES = [
  // Mushroom Coffee (6)
  'glowmind-clarity-instant-mushroom-coffee',
  'mooncap-restore-instant-mushroom-coffee',
  'dreamcap-instant-mushroom-coffee',
  'suncap-rise-instant-mushroom-coffee',
  'the-oracle-instant-mushroom-coffee',
  'mystic-bloom-instant-mushroom-coffee',
  // Classic Coffee (3)
  'torchbearer-instant-coffee',
  'ember-rise-instant-coffee',
  'midnight-watch-instant-coffee',
  // Matcha (3)
  'the-monk-matcha-blend',
  'the-ascendant-matcha-blend',
  'the-alchemist-matcha-blend',
];

// Category mapping
const PRODUCT_CATEGORIES = {
  'Mushroom Coffee': ['suncap-rise-instant-mushroom-coffee', 'glowmind-clarity-instant-mushroom-coffee', 'mooncap-restore-instant-mushroom-coffee', 'dreamcap-instant-mushroom-coffee', 'the-oracle-instant-mushroom-coffee', 'mystic-bloom-instant-mushroom-coffee'],
  'Classic Coffee': ['torchbearer-instant-coffee', 'ember-rise-instant-coffee', 'midnight-watch-instant-coffee'],
  'Matcha': ['the-monk-matcha-blend', 'the-ascendant-matcha-blend', 'the-alchemist-matcha-blend'],
};

export default function BuildYourRitual() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [shopifyProducts, setShopifyProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSEO({
    title: 'Build Your Ritual Bundle | Torch Republic Coffee Company',
    description: 'Build your custom 3-blend bundle and save. Mix and match from 12 products — classic coffee, mushroom coffee with Lions Mane and Chaga, and ceremonial matcha. Any 3 blends for $49.99. 30-day guarantee.',
    url: '/build-your-ritual',
  });

  // Fetch live product data from Shopify on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await base44.functions.invoke('fetchShopifyProducts', {});
        
        if (!response.data?.products) {
          throw new Error('No products returned from Shopify');
        }

        const allProducts = response.data.products;
        
        // Filter to only our core 12 products
        const coreProducts = allProducts.filter(p => 
          CORE_PRODUCT_HANDLES.includes(p.handle)
        );

        // Map to our internal format
        const mappedProducts = coreProducts.map(p => {
          // Determine category based on handle
          let category = 'mushroom-coffee';
          if (p.handle.includes('matcha')) category = 'matcha';
          else if (p.handle.includes('instant-coffee') && !p.handle.includes('mushroom')) category = 'classic-coffee';

          // Get accent color based on category
          const accentColors = {
            'mushroom-coffee': '#4A9EE6',
            'classic-coffee': '#C4A35A',
            'matcha': '#6CBD5A',
          };

          return {
            id: p.handle,
            shopifyHandle: p.handle,
            name: p.title.replace(/(Instant Coffee|Instant Mushroom Coffee|Matcha Blend|Matcha)/g, '').trim(),
            title: p.title,
            price: p.price || 24.99,
            compareAtPrice: p.compareAtPrice,
            image: p.images?.[0]?.src || p.image || LOCAL_IMAGE_MAP[p.handle],
            category: category,
            accent: accentColors[category] || '#E6B7AD',
            available: p.availableForSale !== false,
            inventory: p.quantityAvailable || 0,
            shopifyData: p,
          };
        });

        setShopifyProducts(mappedProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Unable to load products. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Sum of individual prices for selected products (for "regular value" display only)
  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((sum, productId) => {
      const product = shopifyProducts.find(p => p.id === productId);
      return sum + (product?.price || INDIVIDUAL_PRICE);
    }, 0);
  }, [selectedProducts, shopifyProducts]);

  // Bundle price is always fixed at $49.99 — never varies by product selection
  const bundleTotal = BUNDLE_PRICE;
  const savings = selectedProducts.length === BUNDLE_SIZE ? Math.max(0, totalPrice - BUNDLE_PRICE) : 0;

  const toggleProduct = (productId) => {
    setSelectedProducts(prev => {
      const index = prev.indexOf(productId);
      if (index !== -1) {
        const newArray = [...prev];
        newArray.splice(index, 1);
        return newArray;
      }
      return [...prev, productId];
    });
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return shopifyProducts;
    const categoryHandles = PRODUCT_CATEGORIES[activeCategory] || [];
    return shopifyProducts.filter(p => categoryHandles.includes(p.shopifyHandle));
  }, [shopifyProducts, activeCategory]);

  const handleAddToCart = () => {
    if (selectedProducts.length !== 3) return;

    const items = selectedProducts.map(id => {
      const product = shopifyProducts.find(p => p.id === id);
      return product?.shopifyHandle ? { slug: product.shopifyHandle, qty: 1 } : null;
    }).filter(Boolean);

    if (items.length !== 3) {
      console.error('[Bundle] Not all products have valid Shopify handles');
      alert('Some products are unavailable. Please try again.');
      return;
    }

    const url = getShopifyBundleUrl(items);
    if (!url) {
      console.error('[Bundle] Failed to build Shopify bundle URL');
      alert('Could not build cart URL. Please contact support.');
      return;
    }

    if (!url.includes('libertees-for-all.myshopify.com')) {
      console.error('[Bundle] Invalid Shopify domain in URL:', url);
      alert('Checkout configuration error. Please contact support.');
      return;
    }

    console.log('[Bundle] Bundle cart URL:', url, '| Bundle total: $' + bundleTotal.toFixed(2));
    window.location.href = url;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808', color: '#F0EBE1' }}>
        <div className="text-center">
          <p className="font-serif text-xl mb-4" style={{ color: RG }}>Unable to Load Products</p>
          <p className="font-heading mb-6" style={{ color: 'rgba(240,235,225,0.5)' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="font-mono text-[9px] tracking-[0.3em] uppercase px-6 py-3"
            style={{ background: RG, color: '#080808' }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#080808', color: '#F0EBE1' }}>

      {/* Best Starter Bundle */}
      <section className="px-6 md:px-10 pt-16 pb-0">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, rgba(230,183,173,0.07) 0%, rgba(230,183,173,0.02) 100%)`, border: `1px solid ${RG}35` }}
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
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif font-bold" style={{ fontSize: '1.6rem', color: RG }}>${BUNDLE_PRICE.toFixed(2)}</span>
                    <span className="font-mono text-[10px] line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>$67.97 separately</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}>Save $17.98</span>
                  </div>
                  <p className="font-mono text-[9px] mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Bundle pricing cannot be combined with additional product discounts.
                  </p>
                  <a
                    href="https://libertees-for-all.myshopify.com/cart/49148263596284:1,49171204276476:1,49170574115068:1"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'https://libertees-for-all.myshopify.com/cart/49148263596284:1,49171204276476:1,49170574115068:1';
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
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>Only ~$0.76 per serving</p>
                  </div>
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>No Machine Needed</p>
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>Instant powder — stir, sip, begin.</p>
                  </div>
                  <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>Shipping Calculated at Checkout</p>
                    <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.45)' }}>Rates calculated at Shopify checkout.</p>
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
              Build Your Ritual
            </h1>
            <p className="font-heading max-w-2xl mx-auto mb-6" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85 }}>
              Choose any 3 products and save. Mix and match from our complete collection of premium instant coffee, functional mushroom coffee, and ceremonial matcha.
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: RG }}>3</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Blends</p>
              </div>
              <div className="w-px h-10" style={{ background: `${RG}30` }} />
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: RG }}>${BUNDLE_PRICE}</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Bundle Price</p>
              </div>
              <div className="w-px h-10" style={{ background: `${RG}30` }} />
              <div className="text-center">
                <p className="font-serif font-bold text-2xl" style={{ color: EMERALD }}>Save up to $14.98</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>vs. Buying Separately</p>
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
                {['All', 'Mushroom Coffee', 'Matcha', 'Classic Coffee'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase transition-all ${activeCategory === cat ? 'scale-105' : 'hover:scale-105'}`}
                    style={{
                      background: activeCategory === cat ? `${RG}15` : 'transparent',
                      border: `1px solid ${activeCategory === cat ? RG : `${RG}20`}`,
                      color: activeCategory === cat ? RG : `${RG}50`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>Loading products...</p>
                </div>
              ) : shopifyProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-heading mb-4" style={{ color: 'rgba(240,235,225,0.5)' }}>No products available</p>
                  <p className="font-mono text-[8px] tracking-[0.2em]" style={{ color: `${RG}50` }}>Please check back soon</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((product, i) => {
                    const isSelected = selectedProducts.includes(product.id);
                    const countInBundle = selectedProducts.filter(id => id === product.id).length;
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
                                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase">
                                    {countInBundle > 1 ? `×${countInBundle}` : 'Selected'}
                                  </span>
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
              )}
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
                        {Array.from(new Set(selectedProducts)).map((productId) => {
                          const product = shopifyProducts.find(p => p.id === productId);
                          if (!product) return null;
                          const countInBundle = selectedProducts.filter(id => id === productId).length;
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
                                    ${product.price} {countInBundle > 1 && <span style={{ color: RG }}>×{countInBundle}</span>}
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
                    ) : selectedProducts.length > 3 ? (
                      <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-center mb-4" style={{ color: '#E67A5A' }}>
                        You have {selectedProducts.length} items. Please remove {selectedProducts.length - 3} to continue.
                      </p>
                    ) : (
                      <div className="mb-4 p-3" style={{ background: `${EMERALD}10`, border: `1px solid ${EMERALD}30` }}>
                        <div className="flex items-center gap-2 mb-1" style={{ color: EMERALD }}>
                          <Sparkles size={14} />
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold">Bundle Savings Applied</span>
                        </div>
                        <p className="font-mono text-[8px] tracking-[0.1em]" style={{ color: EMERALD }}>
                          You saved ${savings.toFixed(2)} with this ritual bundle.
                        </p>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="pt-4 border-t" style={{ borderColor: `${RG}20` }}>
                      {selectedProducts.length === 3 && (
                        <>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}40` }}>
                              Bundle Value
                            </span>
                            <span className="font-mono text-sm line-through" style={{ color: 'rgba(240,235,225,0.35)' }}>
                              ${totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: EMERALD }}>
                              Your Price
                            </span>
                            <span className="font-serif font-bold text-lg" style={{ color: RG }}>
                              ${bundleTotal.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between mb-3 pb-3" style={{ borderBottom: `1px solid ${RG}15` }}>
                            <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: EMERALD }}>
                              You Save
                            </span>
                            <span className="font-mono text-sm font-bold" style={{ color: EMERALD }}>
                              ${savings.toFixed(2)}
                            </span>
                          </div>
                        </>
                      )}
                      {selectedProducts.length !== 3 && (
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: EMERALD }}>
                            Bundle Price
                          </span>
                          <span className="font-serif font-bold text-lg" style={{ color: RG }}>
                            ${BUNDLE_PRICE}
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
                        {selectedProducts.length > 3 ? `Remove ${selectedProducts.length - 3} to Continue` : selectedProducts.length < 3 ? `Add ${3 - selectedProducts.length} More` : `Add Bundle to Cart — $${bundleTotal.toFixed(2)}`}
                      </button>

                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-center mt-4" style={{ color: `${RG}40` }}>
                        ✦ Bundle pricing cannot be combined with other discounts
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky mobile checkout CTA */}
      {selectedProducts.length === 3 && (
        <div className="md:hidden fixed bottom-16 left-0 right-0 z-30 flex justify-center px-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <button
            onClick={handleAddToCart}
            className="w-full font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-4"
            style={{ background: RG, color: '#080808', boxShadow: '0 4px 24px rgba(0,0,0,0.7)' }}
          >
            Add Bundle to Cart — ${bundleTotal.toFixed(2)}
          </button>
        </div>
      )}

      {/* Trust Bar */}
      <section className="px-6 md:px-10 py-12" style={{ borderTop: `1px solid ${RG}10` }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              'Shipping Calculated at Checkout',
              '30-Day Satisfaction Guarantee',
              'No Machine Needed',
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