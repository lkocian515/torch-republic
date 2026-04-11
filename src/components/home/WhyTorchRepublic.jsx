import React from 'react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: '⚗',
    title: 'Heritage-Crafted Roasts',
    body: 'Every blend is small-batch roasted to order, honoring the conviction and character of America\'s greatest figures.',
  },
  {
    icon: '🇺🇸',
    title: 'American Legacy',
    body: 'We don\'t just sell coffee — we carry a tradition. Each product is a collectible piece of American heritage.',
  },
  {
    icon: '✦',
    title: 'Uncompromising Quality',
    body: 'Single-origin beans. Precision roasting. Premium packaging. Every detail reflects the standard of those we honor.',
  },
  {
    icon: '∞',
    title: 'Lifetime Pride Guarantee',
    body: 'If you\'re not proud to serve it, we\'ll make it right — no questions, no conditions, no compromise.',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section style={{ background: '#000', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.55)' }}>
            Why Torch Republic
          </p>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
            The Standard We Hold
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(201,162,74,0.06)' }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6 p-10"
              style={{ background: '#000' }}
            >
              <span style={{ fontSize: '1.6rem', opacity: 0.7 }}>{p.icon}</span>
              <div>
                <h3 className="font-serif text-white mb-3" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{p.title}</h3>
                <p style={{ color: 'rgba(240,235,225,0.35)', fontSize: '0.875rem', lineHeight: 1.85, fontWeight: 300 }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}