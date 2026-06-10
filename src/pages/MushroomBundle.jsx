import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, ALL_PRODUCTS, BUNDLE_IMAGE } from '../lib/mushroomProducts';
import { getFullBundleUrl, getAllClassicBundleUrl, getAllMatchaBundleUrl, getShopifyBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import DiscountReminders from '../components/discounts/DiscountReminders';

// All 12 products
const ALL_12_PRODUCTS = [...CLASSIC_COFFEE_PRODUCTS, ...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS];

// Category bundles
const MUSHROOM_ONLY_BUNDLE = MUSHROOM_PRODUCTS;
const MATCHA_ONLY_BUNDLE = MATCHA_PRODUCTS;
const CLASSIC_ONLY_BUNDLE = CLASSIC_COFFEE_PRODUCTS;
const WELLNESS_BUNDLE = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS]; // 9 products

const BUNDLE_OPTIONS = [
  {
    id: 'starter-3pack',
    name: 'Starter Ritual 3-Pack',
    subtitle: 'Discover',
    description: 'Choose any 3 blends',
    price: 74.97,
    products: ALL_12_PRODUCTS.slice(0, 3),
    cta: 'Build Your 3-Pack',
    getUrl: null, // uses Link to /build-your-ritual
    badge: 'Most Popular',
  },
  {
    id: 'deep-6pack',
    name: 'Deep Ritual 6-Pack',
    subtitle: 'Commit',
    description: 'All 6 mushroom blends',
    price: 129.99,
    products: MUSHROOM_PRODUCTS,
    cta: 'Shop 6-Pack',
    getUrl: () => getShopifyBundleUrl(MUSHROOM_PRODUCTS.map(p => ({ slug: p.shopifyHandle, qty: 1 }))),
    badge: 'Best Value',
  },
  {
    id: 'complete-12pack',
    name: 'Complete Torch Republic Collection',
    subtitle: 'The Full Experience',
    description: 'All 12 products — Classic, Mushroom &amp; Matcha',
    price: 239.94,
    products: ALL_12_PRODUCTS.slice(0, 6),
    cta: 'Shop the Complete Collection',
    getUrl: getFullBundleUrl,
    badge: 'Complete Ritual',
  },
];

const CATEGORY_BUNDLES = [
  {
    id: 'classic-trio',
    name: 'Classic Instant Coffee Trio',
    description: 'All 3 classic blends',
    price: 74.97,
    products: CLASSIC_ONLY_BUNDLE,
    cta: 'Shop Classic Trio',
    getUrl: getAllClassicBundleUrl,
  },
  {
    id: 'mushroom-collection',
    name: 'Mushroom Coffee Collection',
    description: 'All 6 mushroom blends',
    price: 129.99,
    products: MUSHROOM_ONLY_BUNDLE,
    cta: 'Shop Mushroom Collection',
    getUrl: () => getShopifyBundleUrl(MUSHROOM_ONLY_BUNDLE.map(p => ({ slug: p.shopifyHandle, qty: 1 }))),
  },
  {
    id: 'matcha-ritual',
    name: 'Matcha Ritual Trio',
    description: 'All 3 ceremonial matcha blends',
    price: 74.97,
    products: MATCHA_ONLY_BUNDLE,
    cta: 'Shop Matcha Trio',
    getUrl: getAllMatchaBundleUrl,
  },
  {
    id: 'wellness-bundle',
    name: 'Full Wellness Ritual Bundle',
    description: 'All mushroom + matcha blends (9 total)',
    price: 179.94,
    products: WELLNESS_BUNDLE.slice(0, 6),
    cta: 'Shop Wellness Bundle',
    getUrl: () => getShopifyBundleUrl(WELLNESS_BUNDLE.map(p => ({ slug: p.shopifyHandle, qty: 1 }))),
  },
];

export default function MushroomBundle() {
  useSEO({
    title: 'Ritual Coffee Bundles | Torch Republic Coffee Company',
    description: 'Build your Torch Republic ritual with curated bundles of instant coffee, mushroom coffee, and matcha for different moments of your day. Free shipping on all bundles.',
    url: '/bundle',
  });
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0" style={{ background: '#0B0B0B' }} />
        <img src={BUNDLE_IMAGE} alt="Torch Republic coffee bundles lineup"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.3 }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, #080808 100%)' }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-5"
          >
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Build Your Ritual Bundle
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Choose Your Blends. Create Your Ritual.
            </h1>
            <p className="font-heading max-w-2xl" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
              Choose your blends. Create your daily ritual. Save when you bundle. From the Starter 3-Pack to the Complete 12-Product Collection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Bundle Tiers */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Build Your Ritual
            </p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Three Ways to Save
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BUNDLE_OPTIONS.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col relative"
                style={{ 
                  background: '#0F0E0E', 
                  border: bundle.badge === 'Best Value' ? '2px solid rgba(230,183,173,0.4)' : '1px solid rgba(230,183,173,0.15)',
                  borderRadius: '4px'
                }}
              >
                {/* Badges */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {bundle.badge && (
                    <div className="px-4 py-1"
                      style={{ 
                        background: bundle.badge === 'Best Value' ? '#E6B7AD' : 'rgba(230,183,173,0.15)',
                        color: bundle.badge === 'Best Value' ? '#080808' : '#E6B7AD',
                        border: `1px solid ${bundle.badge === 'Best Value' ? '#E6B7AD' : 'rgba(230,183,173,0.3)'}`,
                        borderRadius: '2px'
                      }}>
                      <p className="font-mono text-[7px] tracking-[0.3em] uppercase font-bold">{bundle.badge}</p>
                    </div>
                  )}
                  <div className="px-4 py-1"
                    style={{ 
                      background: 'rgba(16,185,129,0.15)',
                      color: '#10B981',
                      border: '1px solid rgba(16,185,129,0.3)',
                      borderRadius: '2px'
                    }}>
                    <p className="font-mono text-[7px] tracking-[0.3em] uppercase font-bold">FREE SHIPPING</p>
                  </div>
                </div>

                {/* Header */}
                <div className="p-6 border-b pt-8" style={{ borderColor: 'rgba(230,183,173,0.08)' }}>
                  <p className="font-mono text-[7px] tracking-[0.35em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    {bundle.subtitle}
                  </p>
                  <h3 className="font-serif font-bold text-white text-lg mb-2">{bundle.name}</h3>
                  <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {bundle.description}
                  </p>
                  <p className="font-serif font-bold" style={{ fontSize: '2.25rem', color: '#E6B7AD' }}>${bundle.price}</p>
                </div>

                {/* Products Preview */}
                <div className="flex-1 p-5">
                  <div className="space-y-2.5">
                    {bundle.products.map((p) => (
                      <div key={p.id} className="flex items-center gap-2.5">
                        {p.image && !p.imagePlaceholder ? (
                          <img src={p.image} alt={p.alt} loading="lazy"
                            className="w-8 h-8 object-contain flex-shrink-0" />
                        ) : (
                          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center"
                            style={{ background: '#161515', border: `1px dashed ${p.accent}30` }}>
                            <span className="font-mono text-[5px]" style={{ color: `${p.accent}50` }}>IMG</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-bold text-white text-xs truncate">{p.name}</p>
                          <p className="font-mono text-[6px] tracking-[0.15em] uppercase truncate" style={{ color: `${p.accent}60` }}>
                            {p.category}
                          </p>
                        </div>
                      </div>
                    ))}
                    {bundle.products.length > 6 && (
                      <p className="font-mono text-[7px] tracking-[0.2em] uppercase text-center pt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        +{bundle.products.length - 6} more products
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-5 pt-0">
                  {bundle.id === 'starter-3pack' ? (
                    <Link
                      to="/build-your-ritual"
                      className="block w-full text-center font-mono text-[8px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
                      style={{ background: '#E6B7AD', color: '#080808', padding: '12px 20px' }}
                    >
                      Build Your 3-Pack →
                    </Link>
                  ) : (
                    <a
                      href={(() => {
                        const url = bundle.getUrl();
                        console.log('[Bundle CTA]', bundle.name, '| URL:', url);
                        return url || SHOPIFY_CART_URL;
                      })()}
                      className="block w-full text-center font-mono text-[8px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
                      style={{ 
                        background: bundle.badge === 'Best Value' ? '#E6B7AD' : 'transparent',
                        color: bundle.badge === 'Best Value' ? '#080808' : '#E6B7AD',
                        border: bundle.badge === 'Best Value' ? 'none' : '1px solid rgba(230,183,173,0.4)',
                        padding: '12px 20px'
                      }}
                    >
                      {bundle.cta} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Bundles */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              By Category
            </p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
              Category-Specific Bundles
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORY_BUNDLES.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col"
                style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.12)' }}
              >
                <div className="p-5 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif font-bold text-white text-sm">{bundle.name}</h3>
                    <span className="font-mono text-[6px] tracking-[0.25em] uppercase px-2 py-0.5"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                      FREE SHIPPING
                    </span>
                  </div>
                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {bundle.description}
                  </p>
                  <p className="font-serif font-bold mb-3" style={{ fontSize: '1.5rem', color: '#E6B7AD' }}>${bundle.price}</p>
                  <div className="space-y-2">
                    {bundle.products.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center gap-2">
                        {p.image && !p.imagePlaceholder ? (
                          <img src={p.image} alt={p.alt} loading="lazy"
                            className="w-6 h-6 object-contain flex-shrink-0" />
                        ) : (
                          <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center"
                            style={{ background: '#161515', border: `1px dashed ${p.accent}30` }}>
                            <span className="font-mono text-[4px]" style={{ color: `${p.accent}50` }}>IMG</span>
                          </div>
                        )}
                        <p className="font-mono text-[6px] tracking-[0.15em] uppercase truncate" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {p.name}
                        </p>
                      </div>
                    ))}
                    {bundle.products.length > 3 && (
                      <p className="font-mono text-[6px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        +{bundle.products.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href={(() => {
                      const url = bundle.getUrl();
                      console.log('[Category Bundle CTA]', bundle.name, '| URL:', url);
                      return url || SHOPIFY_CART_URL;
                    })()}
                    className="block w-full text-center font-mono text-[7px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90"
                    style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)', padding: '10px 16px' }}
                  >
                    {bundle.cta} →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 text-center"
            style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.2)' }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.55)' }}>
              Subscribe &amp; Save
            </p>
            <p className="font-heading max-w-2xl mx-auto mb-6" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
              Get 20% off every order when you subscribe. Cancel anytime. Never run out of your daily ritual.
            </p>
            <Link
              to="/subscription"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ border: '1px solid rgba(230,183,173,0.4)', color: 'rgba(230,183,173,0.8)', padding: '14px 32px' }}
            >
              Build Your Subscription →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}