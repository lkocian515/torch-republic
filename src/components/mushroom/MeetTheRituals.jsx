import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';
const EMERALD = '#10B981';
const GOLD = '#C4A35A';

const PRODUCTS = {
  coffee: [
    { name: 'Torchbearer', type: 'Premium Instant Coffee', benefit: 'Bold, smooth, steady.', href: '/torchbearer', accent: GOLD, live: true },
    { name: 'Ember Rise', type: 'Premium Instant Coffee', benefit: 'Warm, bright, morning energy.', href: '/shop', accent: GOLD, live: false },
    { name: 'Midnight Watch', type: 'Premium Instant Coffee', benefit: 'Deep, dark, focused.', href: '/shop', accent: GOLD, live: false },
  ],
  mushroom: [
    { name: 'SunCap Rise', type: 'Mushroom Coffee', benefit: 'Morning energy + clarity.', href: '/blends/suncap-rise', accent: RG, live: true },
    { name: 'MoonCap Restore', type: 'Mushroom Coffee', benefit: 'Grounding, restoration, and balance.', href: '/blends/mooncap-restore', accent: RG, live: true },
    { name: 'GlowMind Clarity', type: 'Mushroom Coffee', benefit: 'Focus, flow, and mental clarity.', href: '/blends/glowmind-clarity', accent: RG, live: true },
    { name: 'DreamCap', type: 'Mushroom Coffee', benefit: 'Evening calm and ritual.', href: '/blends/dreamcap-blend', accent: RG, live: true },
    { name: 'The Oracle', type: 'Mushroom Coffee', benefit: 'Intuition, focus, and reflection.', href: '/blends/the-oracle', accent: RG, live: true },
    { name: 'Mystic Bloom', type: 'Mushroom Coffee', benefit: 'Beauty, balance, and glow.', href: '/blends/mystic-bloom', accent: RG, live: true },
  ],
  matcha: [
    { name: 'The Monk', type: 'Instant Matcha', benefit: 'Discipline, calm, and focused ritual.', href: '/shop', accent: EMERALD, live: false },
    { name: 'The Ascendant', type: 'Instant Matcha', benefit: 'Elevation, energy, and transformation.', href: '/shop', accent: EMERALD, live: false },
    { name: 'The Alchemist', type: 'Instant Matcha', benefit: 'Creation, clarity, and inspired focus.', href: '/shop', accent: EMERALD, live: false },
  ],
};

const TABS = [
  { key: 'coffee', label: 'Classic Coffee', color: GOLD },
  { key: 'mushroom', label: 'Mushroom Coffee', color: RG },
  { key: 'matcha', label: 'Matcha', color: EMERALD },
];

function ProductCard({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      className="flex flex-col justify-between"
      style={{
        padding: '20px',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${p.accent}18`,
        borderRadius: '3px',
        minHeight: 140,
      }}
    >
      <div>
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-1.5" style={{ color: `${p.accent}80` }}>
          {p.type}
        </p>
        <h4 className="font-serif font-bold mb-1" style={{ fontSize: '1.1rem', color: '#F5EFE6', lineHeight: 1.2 }}>
          {p.name}
        </h4>
        <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
          {p.benefit}
        </p>
      </div>
      {p.live ? (
        <Link
          to={p.href}
          className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.25em] uppercase font-bold transition-opacity hover:opacity-70"
          style={{ color: p.accent }}
        >
          Shop Now <ArrowRight className="w-2.5 h-2.5" />
        </Link>
      ) : (
        <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Coming Soon
        </span>
      )}
    </motion.div>
  );
}

export default function MeetTheRituals() {
  const [tab, setTab] = useState('mushroom');
  const activeTab = TABS.find(t => t.key === tab);

  return (
    <section style={{ background: '#0C0C0C', padding: 'clamp(56px,7vw,96px) 24px', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Meet the Rituals
          </p>
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Every Product, Every Ritual
          </h2>
          <p className="font-heading text-sm max-w-md mx-auto" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            All Torch Republic products are instant powders — no machine, no pods, no brewing equipment needed.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
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
              {t.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS[tab].map((p, i) => (
            <ProductCard key={p.name} p={p} i={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-opacity hover:opacity-85"
            style={{ background: RG, color: '#060606', padding: '14px 36px' }}
          >
            Shop All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}