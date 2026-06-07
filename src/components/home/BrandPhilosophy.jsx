import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Coffee } from 'lucide-react';

const RG = '#E6B7AD';
const DEEP_CHARCOAL = '#0A0908';

const PILLARS = [
  {
    title: 'Ignition',
    desc: 'For the part of you that refuses to go out. The inner fire that drives you forward.',
    icon: Sparkles,
    color: '#E6B7AD'
  },
  {
    title: 'Revolution',
    desc: 'For those who rebel against empty routines and build something meaningful.',
    icon: Shield,
    color: '#D6B27A'
  },
  {
    title: 'Rebirth',
    desc: 'For every morning you choose to begin again, stronger than yesterday.',
    icon: Coffee,
    color: '#C98F86'
  }
];

export default function BrandPhilosophy() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: DEEP_CHARCOAL, borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Ignite Your Power. Rewrite Your Story.
          </p>
          <p className="font-heading max-w-2xl mx-auto" style={{
            fontSize: '1.05rem',
            color: 'rgba(240,235,225,0.6)',
            fontWeight: 300,
            lineHeight: 1.9
          }}>
            A movement for people who refuse to dim their light. Torch Republic was created for those who choose intention over autopilot, purpose over distraction, and progress over stagnation.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="text-center p-8"
              style={{
                background: '#0F0E0D',
                border: `1px solid ${pillar.color}25`,
                borderRadius: '6px'
              }}
            >
              <div className="mb-5 flex justify-center" style={{
                width: 56,
                height: 56,
                margin: '0 auto 20px',
                borderRadius: '50%',
                background: `${pillar.color}15`,
                border: `1px solid ${pillar.color}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <pillar.icon size={26} style={{ color: pillar.color }} />
              </div>
              <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>
                {pillar.title}
              </h3>
              <p className="font-heading text-sm" style={{
                color: 'rgba(240,235,225,0.55)',
                fontWeight: 300,
                lineHeight: 1.7
              }}>
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}