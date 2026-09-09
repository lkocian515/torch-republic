import React from 'react';
import { motion } from 'framer-motion';
import { CORE_PRODUCTS, RITUAL_COLORS } from '@/lib/coreProducts';

const ROWS = [
  { key: 'for', label: 'For' },
  { key: 'flavor', label: 'Flavor' },
  { key: 'energy', label: 'Energy' },
  { key: 'functional', label: 'Functional' },
  { key: 'prep', label: 'Prep' },
];

// Verified product information only — no medical or health claims.
const VALUES = {
  classic: {
    for: 'A familiar coffee ritual, no equipment.',
    flavor: 'Bold, smooth, premium Arabica',
    energy: 'High caffeine',
    functional: '-',
    prep: 'Hot or iced',
  },
  mushroom: {
    for: "Coffee made with Lion's Mane and Chaga.",
    flavor: 'Smooth coffee, cocoa, balanced finish',
    energy: 'Medium caffeine',
    functional: "Lion's Mane + Chaga",
    prep: 'Hot or iced',
  },
};

export default function RitualComparison() {
  return (
    <section style={{ background: '#FBF8F1' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#7A5C23' }}>
            Not sure where to start?
          </p>
          <h2 className="mt-4 font-serif font-semibold" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#292622' }}>
            Classic Coffee vs Mushroom Coffee
          </h2>
        </div>

        {/* Desktop table */}
        <div className="card-torch hidden overflow-hidden md:block">
          <div className="grid" style={{ gridTemplateColumns: '120px repeat(2, 1fr)' }}>
            <div />
            {CORE_PRODUCTS.map((p) => {
              const c = RITUAL_COLORS[p.ritualKey];
              return (
                <div key={p.id} className="p-4 text-center" style={{ background: c.soft }}>
                  <p className="font-serif font-bold" style={{ color: c.deep, fontSize: '1.05rem' }}>
                    {p.categoryLabel}
                  </p>
                </div>
              );
            })}
            {ROWS.map((r, ri) => (
              <React.Fragment key={r.key}>
                <div
                  className="p-4 font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: '#8A8076', background: ri % 2 ? '#FBF8F1' : '#FFFDF8', borderTop: '1px solid #E4D8C9' }}
                >
                  {r.label}
                </div>
                {CORE_PRODUCTS.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 text-center font-heading text-sm"
                    style={{ color: '#292622', background: ri % 2 ? '#FBF8F1' : '#FFFDF8', borderTop: '1px solid #E4D8C9' }}
                  >
                    {VALUES[p.ritualKey][r.key]}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile stacked cards */}
        <div className="space-y-4 md:hidden">
          {CORE_PRODUCTS.map((p) => {
            const c = RITUAL_COLORS[p.ritualKey];
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-torch overflow-hidden">
                <div className="p-4 text-center" style={{ background: c.soft }}>
                  <p className="font-serif font-bold" style={{ color: c.deep }}>
                    {p.categoryLabel}
                  </p>
                </div>
                <div>
                  {ROWS.map((r, ri) => (
                    <div key={r.key} className="flex gap-3 p-3" style={{ borderTop: ri === 0 ? 'none' : '1px solid #E4D8C9' }}>
                      <span className="w-20 flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: '#8A8076' }}>
                        {r.label}
                      </span>
                      <span className="font-heading text-sm" style={{ color: '#292622' }}>
                        {VALUES[p.ritualKey][r.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}