import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, BUNDLE_IMAGE } from '../lib/mushroomProducts';
import { getFullBundleUrl, getOneFromEachBundleUrl, getAllMatchaBundleUrl, getAllClassicBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import DiscountReminders from '../components/discounts/DiscountReminders';

const BUNDLE_OPTIONS = [
  {
    id: 'full-collection',
    name: 'The Full Ritual Set',
    description: 'All 6 mushroom coffee blends',
    price: 129.99,
    products: MUSHROOM_PRODUCTS,
    cta: 'Shop the 6-Tube Bundle',
    getUrl: getFullBundleUrl,
  },
  {
    id: 'one-from-each',
    name: 'One From Each Category',
    description: 'Classic + Mushroom + Matcha',
    price: 74.97,
    products: [CLASSIC_COFFEE_PRODUCTS[0], MUSHROOM_PRODUCTS[0], MATCHA_PRODUCTS[0]],
    cta: 'Shop the Variety Bundle',
    getUrl: getOneFromEachBundleUrl,
  },
  {
    id: 'all-matcha',
    name: 'Complete Matcha Collection',
    description: 'All 3 ceremonial grade matcha blends',
    price: 74.97,
    products: MATCHA_PRODUCTS,
    cta: 'Shop the Matcha Bundle',
    getUrl: getAllMatchaBundleUrl,
  },
  {
    id: 'all-classic',
    name: 'Classic Coffee Collection',
    description: 'All 3 classic instant coffee blends',
    price: 74.97,
    products: CLASSIC_COFFEE_PRODUCTS,
    cta: 'Shop the Classic Bundle',
    getUrl: getAllClassicBundleUrl,
  },
];

export default function MushroomBundle() {
  useSEO({
    title: 'Coffee Bundles — Save on Mushroom Coffee, Matcha & Classic Blends | Torch Republic',
    description: 'Bundle and save at Torch Republic Coffee Company. Choose from the full 6-blend mushroom coffee collection, one from each category, all matcha, or all classic coffee bundles. Premium instant blends with Lion\'s Mane + Chaga.',
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
              Bundle & Save
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Choose Your Bundle
            </h1>
            <p className="font-heading max-w-lg" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
              Four curated bundle options. Each delivers premium instant blends with 27 servings per tube. Subscribe & Save 20% on any bundle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bundle Options */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {BUNDLE_OPTIONS.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col"
                style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.15)' }}
              >
                {/* Header */}
                <div className="p-6 border-b" style={{ borderColor: 'rgba(230,183,173,0.08)' }}>
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                    {bundle.description}
                  </p>
                  <h3 className="font-serif font-bold text-white text-xl mb-1">{bundle.name}</h3>
                  <p className="font-serif font-bold" style={{ fontSize: '2rem', color: '#E6B7AD' }}>${bundle.price}</p>
                </div>

                {/* Products */}
                <div className="flex-1 p-6">
                  <div className="space-y-3">
                    {bundle.products.map((p) => (
                      <div key={p.id} className="flex items-center gap-3">
                        {p.image && !p.imagePlaceholder ? (
                          <img src={p.image} alt={p.alt} loading="lazy"
                            className="w-10 h-10 object-contain flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                            style={{ background: '#161515', border: `1px dashed ${p.accent}30` }}>
                            <span className="font-mono text-[6px]" style={{ color: `${p.accent}50` }}>IMG</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                          <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${p.accent}70` }}>
                            {p.roast} · {p.servings} servings
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <a
                    href={bundle.getUrl() || SHOPIFY_CART_URL}
                    className="block w-full text-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
                    style={{ background: '#E6B7AD', color: '#080808', padding: '14px 24px' }}
                  >
                    {bundle.cta} →
                  </a>
                  <div className="mt-4">
                    <DiscountReminders cartSubtotal={bundle.price} showAll={false} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscription CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 text-center"
            style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.2)' }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.55)' }}>
              Subscribe & Save
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