import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';

const BLEND_META = {
  'mooncap-restore':  { purpose: 'Calm evenings & restoration', caffeine: 'Moderate', bestTime: 'Evening or slow mornings' },
  'glowmind-clarity': { purpose: 'Focus + mental clarity',      caffeine: 'Moderate', bestTime: 'Morning work sessions' },
  'suncap-rise':      { purpose: 'Morning energy & fresh starts', caffeine: 'Moderate', bestTime: 'First thing in the morning' },
  'the-oracle':       { purpose: 'Creative flow & insight',     caffeine: 'Moderate', bestTime: 'Morning or afternoon creative sessions' },
  'mystic-bloom':     { purpose: 'Balance & gentle energy',     caffeine: 'Moderate', bestTime: 'Gentle mornings or self-care routines' },
  'dreamcap-blend':   { purpose: 'Evening ritual & late-night creativity', caffeine: 'Moderate', bestTime: 'Evening wind-down or night work' },
};

export default function BlendComparisonTable() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section
      style={{
        background: '#090909',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Know What You're Drinking
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            What's Inside Each Blend
          </h2>
          <p
            className="font-heading mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.8, maxWidth: '520px' }}
          >
            Every blend starts with premium instant coffee and functional mushrooms. Here's what makes each one different.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {MUSHROOM_PRODUCTS.map((p, i) => {
            const meta = BLEND_META[p.id] || {};
            const isOpen = expanded === p.id;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  background: isOpen ? `${p.accent}07` : '#0F0E0D',
                  border: `1px solid ${isOpen ? p.accent + '35' : p.accent + '14'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Row header — always visible */}
                <button
                  onClick={() => setExpanded(isOpen ? null : p.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-serif font-bold text-white text-sm">{p.name}</span>
                      <span className="font-mono text-[7.5px] tracking-[0.2em] uppercase" style={{ color: `${p.accent}80` }}>{p.roast}</span>
                    </div>
                    <p className="font-mono text-[7.5px] tracking-[0.18em] uppercase mt-0.5" style={{ color: 'rgba(247,241,232,0.38)' }}>
                      {meta.purpose}
                    </p>
                  </div>
                  <span className="font-mono text-xs flex-shrink-0 transition-transform duration-200" style={{ color: p.accent, transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>

                {/* Expanded detail */}
                {isOpen && (
                  <div
                    className="px-5 pb-5 pt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                    style={{ borderTop: `1px solid ${p.accent}12` }}
                  >
                    {[
                      { label: 'Purpose',           value: meta.purpose },
                      { label: 'Functional Mushrooms', value: p.mushrooms },
                      { label: 'Coffee Type',        value: 'Premium Instant Arabica' },
                      { label: 'Roast Level',         value: p.roast },
                      { label: 'Best Time to Drink', value: meta.bestTime },
                      { label: 'Flavor Notes',       value: p.flavorNotes?.join(', ') },
                      { label: 'Servings Per Tube',  value: `${p.servings} servings` },
                      { label: 'Prep Method',        value: 'Scoop, stir, sip — no equipment needed' },
                    ].map(row => (
                      <div key={row.label}>
                        <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1" style={{ color: `${p.accent}60` }}>{row.label}</p>
                        <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.75)', fontWeight: 300 }}>{row.value}</p>
                      </div>
                    ))}
                    <div className="sm:col-span-2 md:col-span-3 mt-2">
                      <Link
                        to={`/products/${p.slug}`}
                        className="inline-block font-mono text-[8px] tracking-[0.28em] uppercase py-2.5 px-5 transition-opacity hover:opacity-80"
                        style={{ background: p.accent, color: '#0A0806', fontWeight: 700 }}
                      >
                        View {p.name} →
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-10"
        >
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.35)' }}>
            All blends · $24.99 per tube · 27 servings · No coffee maker needed
          </p>
          <Link
            to="/shop"
            className="inline-block font-mono text-[9px] tracking-[0.35em] uppercase font-bold py-3.5 px-8 transition-opacity hover:opacity-90"
            style={{ background: RG, color: '#080808' }}
          >
            Shop All Blends →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}