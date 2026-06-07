import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

const steps = [
  {
    number: '01',
    title: 'Set Your Intention',
    description: 'Before brewing, take a moment to set your intention for the day. What energy do you want to cultivate?',
    icon: '🌅',
    tip: 'Clarity, Focus, Calm, or Transformation',
  },
  {
    number: '02',
    title: 'Measure Your Blend',
    description: 'Use one serving (one tube or packet) of your chosen mushroom coffee or matcha blend.',
    icon: '☕',
    tip: 'Lion\'s Mane + Chaga for coffee | Ceremonial grade for matcha',
  },
  {
    number: '03',
    title: 'Heat Your Water',
    description: 'Heat fresh water to 175°F (80°C) for matcha, or 200°F (93°C) for mushroom coffee.',
    icon: '💧',
    tip: 'Never use boiling water — it damages delicate compounds',
  },
  {
    number: '04',
    title: 'Mix with Intention',
    description: 'Pour water over your blend. Stir gently in a clockwise motion while focusing on your intention.',
    icon: '🥄',
    tip: 'Matcha: whisk in W-motion | Coffee: stir 7 times clockwise',
  },
  {
    number: '05',
    title: 'Pause & Sip',
    description: 'Hold the cup with both hands. Take three deep breaths. Sip slowly and mindfully.',
    icon: '🧘',
    tip: 'No screens. Just you, your breath, and your ritual.',
  },
  {
    number: '06',
    title: 'Carry the Energy',
    description: 'Let the intention you set guide your actions throughout the day. Return to it when needed.',
    icon: '✨',
    tip: 'Your ritual is complete. The energy is yours.',
  },
];

export default function MorningRitualGuide() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
            The Practice
          </p>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: '#FFFFFF' }}>
            Your Morning Ritual
          </h2>
          <p
            className="font-heading text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}
          >
            Six intentional steps to transform your daily cup into a sacred practice of clarity and purpose.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 rounded-sm transition-all hover:bg-white/[0.03]"
              style={{
                border: '1px solid rgba(230,183,173,0.1)',
              }}
            >
              {/* Step Number */}
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${RG} 0%, ${RG}80 100%)`,
                  color: '#050505',
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-3xl mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="font-serif font-bold text-lg sm:text-xl mb-3" style={{ color: '#FFFFFF' }}>
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="font-heading text-xs sm:text-sm mb-4 leading-relaxed"
                style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.7 }}
              >
                {step.description}
              </p>

              {/* Tip */}
              <div
                className="p-3 rounded-sm"
                style={{ background: `${RG}10`, borderLeft: `2px solid ${RG}` }}
              >
                <p
                  className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: RG, fontWeight: 500 }}
                >
                  {step.tip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-80 py-3 px-8 rounded-sm"
            style={{
              background: `${RG}20`,
              border: `1px solid ${RG}40`,
              color: RG,
            }}
          >
            Begin Your Ritual →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}