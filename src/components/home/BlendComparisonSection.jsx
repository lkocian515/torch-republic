import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';

const BLENDS = [
  {
    name: 'Torchbearer',
    category: 'Classic Coffee',
    categoryColor: '#E6AC45',
    bestFor: 'Everyday morning energy',
    caffeine: 'Medium-High (~80–100mg)',
    flavor: 'Smooth, balanced, bold',
    servings: '27',
    keyIngredient: 'None — 100% premium instant coffee',
    slug: 'torchbearer',
  },
  {
    name: 'Ember Reserve',
    category: 'Classic Coffee',
    categoryColor: '#E6AC45',
    bestFor: 'Fresh starts, renewal',
    caffeine: 'Medium-High (~80–100mg)',
    flavor: 'Warm, smooth, medium roast',
    servings: '27',
    keyIngredient: 'None — 100% premium instant coffee',
    slug: 'ember-rise',
  },
  {
    name: 'Ember Reserve',
    category: 'Classic Coffee',
    categoryColor: '#E6AC45',
    bestFor: 'Deep focus, resilience',
    caffeine: 'Medium-High (~80–100mg)',
    flavor: 'Dark, rich, bold finish',
    servings: '27',
    keyIngredient: 'None — 100% premium instant coffee',
    slug: 'midnight-watch',
  },
  {
    name: 'GlowMind Clarity',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Focus + mental clarity',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Smooth coffee, cocoa notes',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'glowmind-clarity',
  },
  {
    name: 'SunCap Rise',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Morning vitality, energy',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Bright coffee, light cocoa',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'suncap-rise',
  },
  {
    name: 'MoonCap Restore',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Calm reset, restoration',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Dark cocoa, earthy, smooth',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'mooncap-restore',
  },
  {
    name: 'DreamCap Blend',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Deep rest, subconscious renewal',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Smooth, dark cocoa, mellow',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'dreamcap-blend',
  },
  {
    name: 'The Oracle Blend',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Intuition, inner knowing',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Smooth coffee, soft cocoa',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'the-oracle',
  },
  {
    name: 'Mystic Bloom Blend',
    category: 'Mushroom Coffee',
    categoryColor: '#264A35',
    bestFor: 'Transformation, growth',
    caffeine: 'Medium (~50–80mg)',
    flavor: 'Smooth, soft cocoa, rounded',
    servings: '27',
    keyIngredient: "Lion's Mane + Cordyceps + Reishi",
    slug: 'mystic-bloom',
  },
  {
    name: 'The Monk',
    category: 'Matcha',
    categoryColor: '#264A35',
    bestFor: 'Calm focus, discipline',
    caffeine: 'Low-Medium (~25–40mg)',
    flavor: 'Smooth, earthy, clean finish',
    servings: '25',
    keyIngredient: '100% Ceremonial Grade Matcha',
    slug: 'the-monk-matcha-blend',
  },
  {
    name: 'The Ascendant',
    category: 'Matcha',
    categoryColor: '#264A35',
    bestFor: 'Growth, elevated energy',
    caffeine: 'Low-Medium (~25–40mg)',
    flavor: 'Bright, vegetal, uplifting',
    servings: '25',
    keyIngredient: '100% Ceremonial Grade Matcha',
    slug: 'the-ascendant-matcha-blend',
  },
  {
    name: 'The Alchemist',
    category: 'Matcha',
    categoryColor: '#264A35',
    bestFor: 'Creativity, inspired work',
    caffeine: 'Low-Medium (~25–40mg)',
    flavor: 'Creative, focused, bright',
    servings: '25',
    keyIngredient: '100% Ceremonial Grade Matcha',
    slug: 'the-alchemist-matcha-blend',
  },
];

const FILTERS = ['All', 'Classic Coffee', 'Mushroom Coffee', 'Matcha'];

export default function BlendComparisonSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? BLENDS : BLENDS.filter(b => b.category === activeFilter);

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0F0E0D' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Compare the Blends
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            Find Your Perfect Blend
          </h2>
          <p className="font-heading mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.8, maxWidth: '520px' }}>
            Every blend is crafted for a specific ritual moment. Filter by category to find what's right for your day.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="font-mono text-[8px] tracking-[0.3em] uppercase transition-all"
              style={{
                padding: '8px 18px',
                border: activeFilter === f ? `1px solid ${RG}60` : '1px solid rgba(255,255,255,0.1)',
                background: activeFilter === f ? `rgba(230,183,173,0.1)` : 'transparent',
                color: activeFilter === f ? RG : 'rgba(255,255,255,0.35)',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table — desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
                {['Blend', 'Category', 'Best For', 'Caffeine', 'Flavor Profile', 'Servings', 'Key Ingredient'].map(h => (
                  <th key={h} className="text-left pb-3 pr-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.5)', fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((blend, i) => (
                <tr
                  key={blend.name}
                  style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}
                >
                  <td className="py-4 pr-4">
                    <Link to={`/products/${blend.slug}`} className="font-serif font-bold hover:opacity-70 transition-opacity" style={{ color: '#F7F2E9', fontSize: '0.95rem', textDecoration: 'none' }}>
                      {blend.name}
                    </Link>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-2 py-1" style={{ color: blend.categoryColor, border: `1px solid ${blend.categoryColor}30`, background: `${blend.categoryColor}10` }}>
                      {blend.category}
                    </span>
                  </td>
                  <td className="py-4 pr-4 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, maxWidth: '160px' }}>
                    {blend.bestFor}
                  </td>
                  <td className="py-4 pr-4 font-mono text-[8px]" style={{ color: 'rgba(240,235,225,0.5)', whiteSpace: 'nowrap' }}>
                    {blend.caffeine}
                  </td>
                  <td className="py-4 pr-4 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, maxWidth: '160px' }}>
                    {blend.flavor}
                  </td>
                  <td className="py-4 pr-4 font-mono text-[8px] text-center" style={{ color: RG }}>
                    {blend.servings}
                  </td>
                  <td className="py-4 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, maxWidth: '180px' }}>
                    {blend.keyIngredient}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards — mobile */}
          <div className="md:hidden space-y-3">
          {filtered.map((blend, i) => (
            <div
              key={blend.name}
              className="p-5"
              style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.1)' }}
            >
              <div className="flex items-start justify-between mb-2">
                <Link to={`/products/${blend.slug}`} className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: '1rem', textDecoration: 'none' }}>
                  {blend.name}
                </Link>
                <span className="font-mono text-[6px] tracking-[0.2em] uppercase px-2 py-0.5 flex-shrink-0" style={{ color: blend.categoryColor, border: `1px solid ${blend.categoryColor}30`, background: `${blend.categoryColor}10` }}>
                  {blend.category}
                </span>
              </div>
              <p className="font-heading text-xs mb-1" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}>
                <span style={{ color: 'rgba(230,183,173,0.6)' }}>Best for: </span>{blend.bestFor}
              </p>
              <p className="font-heading text-xs mb-1" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                <span style={{ color: 'rgba(230,183,173,0.6)' }}>Caffeine: </span>{blend.caffeine}
              </p>
              <p className="font-heading text-xs mb-2" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                <span style={{ color: 'rgba(230,183,173,0.6)' }}>Key ingredient: </span>{blend.keyIngredient}
              </p>
              <Link to={`/products/${blend.slug}`} className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: RG, textDecoration: 'none' }}>
                View Blend →
              </Link>
            </div>
          ))}
        </div>

        {/* FDA disclaimer */}
        <p className="font-mono text-[7px] tracking-[0.15em] text-center mt-10" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          Caffeine levels are estimates. These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}