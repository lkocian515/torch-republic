import React from 'react';
import { motion } from 'framer-motion';

const REASONS = [
  {
    icon: '🧠',
    title: 'Lion\'s Mane for Focus',
    body: 'Lion\'s Mane mushroom supports cognitive function and mental clarity — helping you stay sharp through deep work, long days, and demanding mornings.',
  },
  {
    icon: '🛡️',
    title: 'Chaga for Resilience',
    body: 'Chaga is one of the most antioxidant-rich substances on earth. It supports your immune system and helps your body adapt to daily stress.',
  },
  {
    icon: '⚡',
    title: 'Smooth, Jitter-Free Energy',
    body: 'Unlike regular coffee, our mushroom blends deliver sustained energy without the crash or jitters — because the mushrooms help buffer the caffeine response.',
  },
  {
    icon: '☕',
    title: 'Still Tastes Like Coffee',
    body: 'No earthy mushroom taste. Just bold, smooth, premium instant coffee — the mushrooms are entirely behind the scenes.',
  },
];

export default function WhyMushroomCoffee() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#080808', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
            The Science
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            Why Mushroom Coffee?
          </h2>
          <p className="font-heading mt-4 max-w-xl mx-auto" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
            Functional mushrooms have been used for centuries. We put them in your morning cup.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="p-6 flex flex-col gap-4"
              style={{ background: '#111010', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <span style={{ fontSize: '1.8rem' }}>{r.icon}</span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.05rem' }}>{r.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.75 }}>{r.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="font-mono text-[7.5px] tracking-[0.1em] text-center mt-10" style={{ color: 'rgba(255,255,255,0.18)' }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </section>
  );
}