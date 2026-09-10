import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Clock, Ban, Feather } from 'lucide-react';
import { D, MONO, fadeUp } from './driftTheme';

const BENEFITS = [
  { icon: Coffee, label: 'Single-Origin Coffee' },
  { icon: Clock, label: 'Ready in Seconds' },
  { icon: Ban, label: 'No Pods' },
  { icon: Feather, label: 'No Machine' },
];

export default function DriftBenefitStrip() {
  return (
    <section style={{ background: D.cream, borderBottom: `1px solid ${D.rule}` }}>
      <div className="mx-auto max-w-[1100px] px-6 py-6">
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2">
          {BENEFITS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2.5">
              <Icon size={18} strokeWidth={1.5} style={{ color: D.terracotta }} />
              <span style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: D.ink, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}