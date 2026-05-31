import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import FAQSection from '../components/mushroom/FAQSection';

const BLEND_GUIDE = [
  { name: 'MoonCap Restore', roast: 'Dark Roast', moment: 'Slow mornings & reflective evenings', accent: '#C98F86' },
  { name: 'GlowMind Clarity', roast: 'Medium Roast', moment: 'Deep work & mental clarity', accent: '#E6B7AD' },
  { name: 'SunCap Rise', roast: 'Light Roast', moment: 'Fresh starts & morning momentum', accent: '#D6B27A' },
  { name: 'The Oracle Blend', roast: 'Medium Roast', moment: 'Creative work & journaling', accent: '#C4A8A0' },
  { name: 'DreamCap Blend', roast: 'Medium Roast', moment: 'Calm focus & creative flow', accent: '#B8A8C8' },
  { name: 'Mystic Bloom', roast: 'Medium Roast', moment: 'Gentle mornings & self-care', accent: '#E6B7C8' },
];

const BUNDLE_PRODUCT = {
  id: 'full-ritual-set',
  name: 'The Full Ritual Set',
  slug: null,
  roast: 'All Roasts',
  mood: 'Complete · Curated · All Six Blends',
  tagline: 'Every blend. Every ritual. One complete mushroom coffee collection.',
  description: 'All six instant mushroom coffee tubes in one set. MoonCap, GlowMind, SunCap, The Oracle, DreamCap, and Mystic Bloom — each with Lion\'s Mane + Chaga for focus, flow, and daily ritual.',
  flavorNotes: ['Dark', 'Medium', 'Light'],
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/ChatGPT_Image_May_31_2026_01_37_31_PM.png?v=1780252673',
  alt: 'Torch Republic Full Ritual Set — all six mushroom coffee tubes',
  price: 129.99,
  shopifyHandle: null,
  accent: '#E6B7AD',
  keyBenefits: ['All six blends', 'Lion\'s Mane + Chaga', '162 total servings'],
  isBundle: true,
};

function BundleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="flex flex-col h-full"
      style={{
        background: 'linear-gradient(160deg, #13100F 0%, #110E0D 100%)',
        border: '1px solid rgba(230,183,173,0.25)',
        boxShadow: '0 0 40px rgba(230,183,173,0.06)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: '1/1', background: '#0C0B0A' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(230,183,173,0.1) 0%, transparent 70%)' }} />
        <img
          src={BUNDLE_PRODUCT.image}
          alt={BUNDLE_PRODUCT.alt}
          className="w-full h-full object-contain"
          style={{ padding: '16px' }}
        />
        <div className="absolute top-3 left-3">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2 py-1"
            style={{ background: 'rgba(230,183,173,0.18)', color: '#E6B7AD', border: '1px solid rgba(230,183,173,0.35)' }}>
            Bundle · Best Value
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pt-5 pb-3 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
            {BUNDLE_PRODUCT.name}
          </h3>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.7)' }}>
            All Six Blends · 162 Servings
          </p>
        </div>
        <p className="font-heading text-xs leading-relaxed flex-1" style={{ color: 'rgba(240,235,225,0.5)' }}>
          {BUNDLE_PRODUCT.tagline}
        </p>
        <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
          <span className="font-mono font-bold" style={{ color: '#E6B7AD', fontSize: '1rem' }}>
            ${BUNDLE_PRODUCT.price.toFixed(2)}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wide" style={{ color: 'rgba(230,183,173,0.4)' }}>
            6 tubes included
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 pt-0">
        <Link
          to="/bundle"
          className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3"
          style={{ background: '#E6B7AD', color: '#080808', display: 'flex' }}
        >
          Shop the Bundle →
        </Link>
      </div>
    </motion.div>
  );
}

export default function MushroomShop() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? MUSHROOM_PRODUCTS
    : MUSHROOM_PRODUCTS.filter(p => p.roast === activeFilter);

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* SEO title update via document.title */}

      {/* ── HERO ── */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.6)' }}>
            Torch Republic Coffee Company
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Shop Instant Mushroom Coffee
          </h1>
          <p className="font-heading max-w-xl mx-auto mb-10"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Explore six premium instant mushroom coffee blends crafted with Lion's Mane + Chaga for focus, flow, and daily ritual.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mb-10">
            {["Lion's Mane + Chaga", "27 Servings Per Tube", "No Brewer Needed", "Instant Coffee"].map(t => (
              <span key={t} className="font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ color: 'rgba(230,183,173,0.45)' }}>✦ {t}</span>
            ))}
          </div>

          {/* Roast filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Light Roast', 'Medium Roast', 'Dark Roast'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
                style={{
                  background: activeFilter === f ? '#E6B7AD' : 'transparent',
                  color: activeFilter === f ? '#080808' : 'rgba(230,183,173,0.6)',
                  border: `1px solid ${activeFilter === f ? '#E6B7AD' : 'rgba(230,183,173,0.25)'}`,
                  fontWeight: activeFilter === f ? 700 : 400,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
            {/* Show bundle card only when All filter is active */}
            {activeFilter === 'All' && <BundleCard />}
          </div>
          {filtered.length === 0 && (
            <p className="text-center font-mono text-[10px] tracking-[0.3em] uppercase py-20"
              style={{ color: 'rgba(230,183,173,0.35)' }}>
              No blends match that filter.
            </p>
          )}
        </div>
      </section>

      {/* ── BLEND GUIDE ── */}
      <section className="px-6 md:px-10 py-20"
        style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3"
              style={{ color: 'rgba(230,183,173,0.45)' }}>Not Sure Where to Start?</p>
            <h2 className="font-serif font-bold text-white"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.015em' }}>
              Find Your Ritual
            </h2>
            <p className="font-heading mt-3 max-w-md mx-auto"
              style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.8 }}>
              Each blend is made for a specific moment in your day. Pick yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BLEND_GUIDE.map((b, i) => {
              const product = MUSHROOM_PRODUCTS.find(p => p.name.includes(b.name.split(' ')[0]));
              return (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    to={product ? `/products/${product.slug}` : '/shop'}
                    className="flex items-start gap-4 p-4 transition-all hover:border-opacity-40 group"
                    style={{ background: '#0F0E0D', border: `1px solid ${b.accent}15`, textDecoration: 'none', display: 'flex' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = `${b.accent}35`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = `${b.accent}15`}
                  >
                    <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5"
                      style={{ background: b.accent }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-white text-sm">{b.name}</p>
                      <p className="font-mono text-[8px] tracking-[0.2em] uppercase mt-0.5"
                        style={{ color: `${b.accent}70` }}>{b.roast}</p>
                      <p className="font-heading text-xs mt-1.5" style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>
                        {b.moment}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] group-hover:translate-x-1 transition-transform flex-shrink-0"
                      style={{ color: `${b.accent}50` }}>→</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BUNDLE CALLOUT ── */}
      <section className="px-6 md:px-10 py-20 text-center"
        style={{ borderTop: '1px solid rgba(230,183,173,0.07)', background: '#080808' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[600px] mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.45)' }}>
            Can't choose just one?
          </p>
          <h2 className="font-serif font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.015em' }}>
            Try All Six Blends
          </h2>
          <p className="font-heading mb-8"
            style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.92rem' }}>
            The Full Ritual Set includes all six instant mushroom coffee tubes — one complete collection for focus, flow, and daily ritual.
          </p>
          <Link
            to="/bundle"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: '#E6B7AD', color: '#080808', padding: '16px 36px' }}>
            Shop the 6-Tube Bundle →
          </Link>
        </motion.div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <FAQSection />

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. · Shop Instant Mushroom Coffee | Torch Republic Coffee Company
        </p>
      </div>
    </div>
  );
}