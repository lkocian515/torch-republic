import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import MushroomProductCard from '../components/mushroom/ProductCard';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

const ALL_PRODUCTS = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS];

const TABS = [
  { key: 'all',     label: 'All Products',     count: ALL_PRODUCTS.length,      color: RG },
  { key: 'mushroom', label: 'Mushroom Coffee',  count: MUSHROOM_PRODUCTS.length, color: RG },
  { key: 'matcha',  label: 'Matcha',            count: MATCHA_PRODUCTS.length,   color: EMERALD },
];

export default function MushroomShop() {
  const [tab, setTab] = useState('all');

  useSEO({
    title: 'Shop All Blends | Torch Republic Coffee Company',
    description: "Shop instant coffee, mushroom coffee, and matcha blends from Torch Republic. Crafted for focus, clarity, calm, and daily ritual. No machine needed.",
    url: '/shop',
  });

  const products = tab === 'all' ? ALL_PRODUCTS : tab === 'matcha' ? MATCHA_PRODUCTS : MUSHROOM_PRODUCTS;
  const activeTab = TABS.find(t => t.key === tab);

  return (
    <div style={{ backgroundColor: '#111111', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Torch Republic Coffee Company
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Instant Coffee, Mushroom Coffee &amp; Matcha
          </h1>
          <p className="font-heading max-w-xl mx-auto mb-8"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Premium instant blends crafted for focus, calm, energy, and everyday ritual. No machine needed.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mb-6">
            {['No Coffee Maker Needed', 'Instant Powder', 'Functional Adaptogens', 'Subscribe & Save 20%'].map(t => (
              <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase"
                style={{ color: 'rgba(230,183,173,0.45)' }}>✦ {t}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── TABS ── */}
      <section className="px-6 md:px-10 pt-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all"
                style={{
                  padding: '10px 22px',
                  border: `1px solid ${tab === t.key ? t.color + '60' : 'rgba(255,255,255,0.1)'}`,
                  background: tab === t.key ? `${t.color}12` : 'transparent',
                  color: tab === t.key ? t.color : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                }}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Bottom CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          >
            <Link to="/bundle"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Shop the Full Ritual Set →
            </Link>
            <Link to="/subscription"
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Build Monthly Subscription →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}