import React from 'react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: '⚗',
    title: 'Small-Batch Craftsmanship',
    body: 'Every blend is roasted to order in limited runs. No mass production. No compromise. Just meticulous attention to every bean.',
  },
  {
    icon: '🦅',
    title: 'Heritage-Inspired',
    body: "Named for the architects of America's founding — each product carries the weight of legacy and the clarity of conviction.",
  },
  {
    icon: '◈',
    title: 'Uncompromising Quality',
    body: 'We source only premium single-origin and estate beans, crafted with the same standard we apply to every product we make.',
  },
  {
    icon: '🔥',
    title: 'Built for Legacy',
    body: 'Torch Republic products are made to be passed down, worn with pride, and remembered — not discarded. Timeless by design.',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section style={{ backgroundColor: '#060609', borderTop: '1px solid rgba(196,163,90,0.07)', borderBottom: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.5))' }} />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>Our Standard</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.5), transparent)' }} />
          </div>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.015em' }}>
            Why Torch Republic
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-5 p-8"
              style={{ background: '#0E0E12', border: '1px solid rgba(196,163,90,0.09)' }}
            >
              <span style={{ fontSize: '1.5rem' }}>{p.icon}</span>
              <div className="w-8 h-px" style={{ background: 'rgba(196,163,90,0.35)' }} />
              <h3 className="font-serif text-white" style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.3 }}>{p.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.85, fontWeight: 300 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}