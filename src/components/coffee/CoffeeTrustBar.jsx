import React from 'react';
import { motion } from 'framer-motion';
import { COFFEE_ORIGIN } from '@/lib/coffeeOrigin';

export default function CoffeeTrustBar({ accent = '#E6AC45' }) {
  return (
    <div className="py-8 px-6 md:px-10" style={{ background: '#0A0908', borderTop: `1px solid ${accent}15`, borderBottom: `1px solid ${accent}15` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {COFFEE_ORIGIN.trust.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1.5 p-3">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: accent }}>
                {item.label}
              </p>
              <p className="font-heading text-[10px]" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.5 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}