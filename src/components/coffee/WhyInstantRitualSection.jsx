import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Plane, Tent, Briefcase, Heart, Check } from 'lucide-react';
import { COFFEE_ORIGIN } from '@/lib/coffeeOrigin';

const ICON_MAP = {
  sun: Sun,
  plane: Plane,
  tent: Tent,
  briefcase: Briefcase,
  heart: Heart,
  check: Check,
};

export default function WhyInstantRitualSection({ accent = '#E6AC45' }) {
  return (
    <div className="py-16 px-6 md:px-10" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: accent }}>
            The Ritual
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            {COFFEE_ORIGIN.whyInstant.title}
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
            {COFFEE_ORIGIN.whyInstant.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COFFEE_ORIGIN.whyInstant.useCases.map((useCase, i) => {
            const Icon = ICON_MAP[useCase.icon] || Check;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6"
                style={{ background: '#0F0E0D', border: `1px solid ${accent}20`, borderRadius: '6px' }}
              >
                <div className="mb-4" style={{ width: 44, height: 44, borderRadius: '50%', background: `${accent}15`, border: `1px solid ${accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>{useCase.title}</h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{useCase.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}