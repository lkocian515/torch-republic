import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RG = '#E6AC45';
const EMERALD = '#264A35';
const GOLD = '#E6AC45';

const PRODUCTS = {
  coffee: [
    { name: 'Torchbearer', type: 'Instant Coffee · Medium Roast', benefit: 'Bold · Smooth · Intense — the original daily ritual. 100% Arabica + Lion\'s Mane + Cordyceps + Reishi.', href: '/torchbearer', accent: GOLD, live: true },
    { name: 'Ember Reserve', type: 'Instant Coffee · Medium Roast', benefit: 'Rich · Smooth · Bold — ignite your momentum. 100% Arabica + Lion\'s Mane + Cordyceps + Reishi.', href: '/shop', accent: GOLD, live: true },
  ],
  mushroom: [
    { name: 'SunCap Rise', type: 'Mushroom Coffee · Light Roast', benefit: 'Morning energy + clarity. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/suncap-rise', accent: RG, live: true },
    { name: 'GlowMind Clarity', type: 'Mushroom Coffee · Medium Roast', benefit: 'Focus, flow, and mental clarity. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/glowmind-clarity', accent: RG, live: true },
    { name: 'MoonCap Restore', type: 'Mushroom Coffee · Medium Roast', benefit: 'Grounding, restoration, and calm balance. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/mooncap-restore', accent: RG, live: true },
    { name: 'The Oracle', type: 'Mushroom Coffee · Medium Roast', benefit: 'Intuition, clarity, and deep focus. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/the-oracle', accent: RG, live: true },
    { name: 'DreamCap', type: 'Mushroom Coffee', benefit: 'Evening calm, recovery, and ritual. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/dreamcap-blend', accent: RG, live: true },
    { name: 'Mystic Bloom', type: 'Mushroom Coffee', benefit: 'Beauty, balance, and radiant glow. Lion\'s Mane + Cordyceps + Reishi.', href: '/blends/mystic-bloom', accent: RG, live: true },
  ],
  matcha: [
    { name: 'The Monk', type: 'Matcha Blend · 100% Instant Matcha', benefit: 'Focus & clarity, calm & balance — a mindful blend for inner calm and steady focus.', href: '/shop', accent: EMERALD, live: true },
    { name: 'The Ascendant', type: 'Matcha Blend · 100% Instant Matcha', benefit: 'Energy & endurance, focus & clarity — fuel your climb with ceremonial grade matcha.', href: '/shop', accent: EMERALD, live: true },
    { name: 'The Alchemist', type: 'Matcha Blend · 100% Instant Matcha', benefit: 'Balance & harmony, antioxidants & detox — elevate your ritual and creative focus.', href: '/shop', accent: EMERALD, live: true },
  ],
};

const TABS = [
  { key: 'coffee', label: 'Instant Coffee (3)', color: GOLD },
  { key: 'mushroom', label: 'Mushroom Coffee (6)', color: RG },
  { key: 'matcha', label: 'Matcha (3)', color: EMERALD },
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
        <h4 className="font-serif font-bold mb-1" style={{ fontSize: '1.1rem', color: '#F7F2E9', lineHeight: 1.2 }}>
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
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#F7F2E9', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
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