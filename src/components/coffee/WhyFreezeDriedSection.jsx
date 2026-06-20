import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Zap, Check } from 'lucide-react';
import { COFFEE_ORIGIN } from '@/lib/coffeeOrigin';

export default function WhyFreezeDriedSection({ accent = '#E6B7AD' }) {
  return (
    <div className="py-16 px-6 md:px-10" style={{ background: '#0A0908', borderTop: `1px solid ${accent}15`, borderBottom: `1px solid ${accent}15` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: accent }}>
            The Process
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {COFFEE_ORIGIN.freezeDried.title}
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.9 }}>
            {COFFEE_ORIGIN.freezeDried.description}
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {COFFEE_ORIGIN.freezeDried.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 text-center"
              style={{ background: '#0F0E0D', border: `1px solid ${accent}20`, borderRadius: '6px' }}
            >
              <div className="mb-3 mx-auto" style={{ width: 40, height: 40, borderRadius: '50%', background: `${accent}15`, border: `1px solid ${accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="font-mono font-bold text-sm" style={{ color: accent }}>{i + 1}</span>
              </div>
              <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1rem' }}>{step.step}</h3>
              <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.6 }}>{step.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="p-6" style={{ background: `${accent}06`, border: `1px solid ${accent}15`, borderRadius: '6px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COFFEE_ORIGIN.freezeDried.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.6 }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}