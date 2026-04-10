import React from 'react';
import { motion } from 'framer-motion';

const RARITY_TIERS = [
  { tier: 'CORE', color: '#6B7280', bg: 'rgba(107,114,128,0.12)', desc: 'Always available — your everyday lineup', border: 'rgba(107,114,128,0.3)' },
  { tier: 'LIMITED', color: '#9BB8CC', bg: 'rgba(155,184,204,0.08)', desc: 'Seasonal drops — gone with the season', border: 'rgba(155,184,204,0.25)' },
  { tier: 'ARCHIVE', color: '#5BA87D', bg: 'rgba(91,168,125,0.08)', desc: 'Retired forever — never reprinted', border: 'rgba(91,168,125,0.25)' },
  { tier: "FOUNDER'S EDITION", color: '#C8A44D', bg: 'rgba(200,164,77,0.1)', desc: 'First print only — original release', border: 'rgba(200,164,77,0.35)' },
  { tier: 'TORCH BOX EXCLUSIVE', color: '#C87070', bg: 'rgba(200,112,112,0.08)', desc: 'Members only — never sold publicly', border: 'rgba(200,112,112,0.25)' },
];

export default function CollectorSystemSection() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(200,164,77,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>The Torch Index</span>
            </div>

            <h2 className="font-serif text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700 }}>
              More Than Coffee.<br />
              <span style={{ color: '#C8A44D' }}>A Collection.</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Every blend is part of a larger system. Each bag carries a permanent identity — a TR code, a series number, and a rarity tier that lives on the bag, on the site, and in the customer's head.
            </p>

            <div className="space-y-1 mb-8">
              <p className="font-mono text-xs text-gray-600 uppercase tracking-widest mb-3">Product Identity Format</p>
              <div className="inline-flex items-center gap-2 px-4 py-3" style={{ background: 'rgba(200,164,77,0.06)', border: '1px solid rgba(200,164,77,0.2)' }}>
                <span className="font-mono text-sm font-bold" style={{ color: '#C8A44D' }}>TR-001</span>
                <span className="font-mono text-sm text-gray-500">|</span>
                <span className="font-mono text-sm text-white">Founders #01</span>
                <span className="font-mono text-sm text-gray-500">|</span>
                <span className="font-mono text-sm" style={{ color: '#C8A44D' }}>FOUNDER'S EDITION</span>
              </div>
            </div>

            <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(200,164,77,0.5)' }}>
              This isn't just coffee. It's a collection you build over time.<br />
              Some products retire forever. Collect before they're gone.
            </p>

            <div className="mt-8">
              <a
                href="https://torch-republic.com/collections/coffee"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs tracking-[0.25em] uppercase"
                style={{ border: '1px solid rgba(200,164,77,0.3)', color: '#C8A44D' }}
              >
                Collect them all →
              </a>
            </div>
          </motion.div>

          {/* Right — rarity tiers */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(200,164,77,0.4)' }}>Rarity Tiers</p>
            {RARITY_TIERS.map((t, i) => (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-4 p-4"
                style={{ background: t.bg, border: `1px solid ${t.border}` }}
              >
                <span className="font-mono text-[10px] font-bold tracking-wider shrink-0 px-2 py-1" style={{ color: t.color, border: `1px solid ${t.border}`, minWidth: '140px' }}>
                  {t.tier}
                </span>
                <span className="text-sm text-gray-400">{t.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}