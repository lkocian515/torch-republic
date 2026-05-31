import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import { Link } from 'react-router-dom';

const ROAST_FILTERS = ['All', 'Light Roast', 'Medium Roast', 'Dark Roast'];

export default function MushroomShop() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? MUSHROOM_PRODUCTS
    : MUSHROOM_PRODUCTS.filter(p => p.roast === activeFilter);

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Header */}
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
          <p className="font-heading max-w-lg mx-auto mb-8"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Six premium instant mushroom coffee blends with Lion's Mane + Chaga. 27 servings per tube. No brewer needed.
          </p>

          {/* Roast filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ROAST_FILTERS.map(f => (
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

      {/* Grid */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Can't choose just one?
        </p>
        <h2 className="font-serif font-bold mb-4 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
          Try All Six Blends
        </h2>
        <Link to="/bundle"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop the 6-Tube Bundle →
        </Link>
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