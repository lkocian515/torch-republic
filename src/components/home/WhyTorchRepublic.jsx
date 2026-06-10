import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const BENEFITS = [
  {
    title: 'Instant Convenience',
    body: 'No machines, no pods, no complicated routine. Just add hot water, stir, and begin your day. Ready in seconds.',
    icon: '⚡',
  },
  {
    title: 'No Machine Needed',
    body: 'Torch Republic products are designed to work without any equipment — just a cup and hot water. That\'s the entire ritual.',
    icon: '☕',
  },
  {
    title: 'Built for Daily Rituals',
    body: 'Every blend is crafted with a specific intention — morning clarity, afternoon focus, or a calm evening reset.',
    icon: '🌿',
  },
  {
    title: 'Coffee, Mushroom Coffee & Matcha',
    body: 'One brand, three distinct product families. Classic instant coffee, functional mushroom coffee, and ceremonial matcha — each clearly labeled.',
    icon: '🕯️',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Why Torch Republic
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Made for the Way You Actually Live
          </h2>
        </motion.div>

        {/* Guarantee / Shipping strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { label: '30-Day Money-Back Guarantee', sub: 'If it\'s not right, we\'ll make it right.' },
            { label: 'Free Shipping Over $75', sub: 'Ships in 1–3 business days.' },
            { label: 'Subscribe & Save 20%', sub: 'Cancel or pause anytime.' },
            { label: '27 Servings Per Tube', sub: 'No machine. No pods. Just add water.' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: '#E6B7AD' }}>{item.label}</p>
              <p className="font-heading text-[11px] mt-0.5" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Brand philosophy quote */}
        <p className="font-heading text-center max-w-2xl mx-auto mb-10" style={{ fontSize: '0.97rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.9 }}>
          Torch Republic was created for people who want their daily energy ritual to feel more intentional — less rushed, less generic, and more aligned with the person they are becoming.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="p-7 flex flex-col gap-4"
              style={{ background: '#111', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.05rem' }}>{b.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}