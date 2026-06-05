import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS, BUNDLE_IMAGE } from '../lib/mushroomProducts';
import { getFullBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

export default function MushroomBundle() {
  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div className="absolute inset-0" style={{ background: '#0B0B0B' }} />
        <img src={BUNDLE_IMAGE} alt="Torch Republic six instant mushroom coffee tubes lineup"
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
              The Full Ritual Set
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              The 6-Blend Bundle
            </h1>
            <p className="font-heading max-w-lg" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
              Can't choose one? Start with the full six-blend collection and discover your daily favorite. Each tube delivers 27 servings of premium instant mushroom coffee with Lion's Mane + Chaga.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products in bundle */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-center mb-10"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            What's Included — All Six Blends
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MUSHROOM_PRODUCTS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-5"
                style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.1)' }}
              >
                {p.image && !p.imagePlaceholder ? (
                  <img src={p.image} alt={p.alt} loading="lazy"
                    className="w-14 h-14 object-contain flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center"
                    style={{ background: '#161515', border: `1px dashed ${p.accent}30` }}>
                    <span className="font-mono text-[7px]" style={{ color: `${p.accent}50` }}>IMG</span>
                  </div>
                )}
                <div>
                  <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                  <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${p.accent}70` }}>
                    {p.roast}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-12 p-8 text-center" style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.2)' }}>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.55)' }}>
            Bundle Price
          </p>
          <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '3rem' }}>$129.99</p>
          <p className="font-mono text-[9px] tracking-[0.2em] mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
            All six blends · 27 servings each · Lion's Mane + Chaga
          </p>
          <a
            href={getFullBundleUrl() || SHOPIFY_CART_URL}
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: '#E6B7AD', color: '#080808', padding: '16px 40px' }}
          >
            Shop the 6-Tube Bundle →
          </a>
          <p className="font-mono text-[8px] tracking-[0.15em] mt-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Checkout via Shopify · Secure payment
          </p>
          </div>
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