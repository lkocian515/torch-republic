import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Package } from 'lucide-react';

const VALUES = [
  {
    icon: Package,
    label: 'Durable, Everyday Use',
    detail: 'Built to withstand the daily ritual of carrying the flame.',
  },
  {
    icon: Zap,
    label: 'Designed to Match Your Collection',
    detail: 'Complement your Founders Series blends with premium drinkware.',
  },
  {
    icon: Flame,
    label: 'Built for Any Moment',
    detail: 'Home, work, or on the move—carry the legacy everywhere.',
  },
];

export default function LifestyleValueSection() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32" style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.08)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>
            Why Torch Republic Drinkware
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#F7F2E9', letterSpacing: '-0.02em' }}>
            More Than a Cup
          </h2>
          <p className="font-heading mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.7, maxWidth: '520px' }}>
            Every mug and tumbler represents discipline, history, and the daily ritual of carrying the flame.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 p-4" style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.15)' }}>
                  <Icon className="w-6 h-6" style={{ color: '#E6AC45' }} />
                </div>
                <h3 className="font-serif mb-2" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F7F2E9' }}>
                  {value.label}
                </h3>
                <p className="font-heading" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>
                  {value.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}