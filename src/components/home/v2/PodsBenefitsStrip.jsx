import React from 'react';
import { motion } from 'framer-motion';

const BENEFITS = [
  {
    icon: '☕',
    label: 'Keurig Compatible',
    sub: 'Works with any K-Cup brewer',
  },
  {
    icon: '🔥',
    label: 'Bold Dark Roast',
    sub: 'Full-bodied, zero bitterness',
  },
  {
    icon: '✓',
    label: 'Consistent Every Cup',
    sub: 'Same great brew, every time',
  },
  {
    icon: '📦',
    label: 'Small-Batch Roasted',
    sub: 'Fresh to order, never stale',
  },
];

export default function PodsBenefitsStrip() {
  return (
    <section style={{ background: '#060606', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
          style={{ borderTop: '1px solid rgba(201,162,74,0.1)', borderBottom: '1px solid rgba(201,162,74,0.1)', divideColor: 'rgba(201,162,74,0.1)' }}
        >
          {BENEFITS.map((b, i) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center gap-2 py-7 px-4 md:py-8 md:px-6"
              style={{ borderColor: 'rgba(201,162,74,0.1)' }}
            >
              <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{b.icon}</span>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#C9A24A' }}>
                {b.label}
              </p>
              <p className="font-heading text-[12px]" style={{ color: 'rgba(240,235,225,0.38)', lineHeight: 1.5 }}>
                {b.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}