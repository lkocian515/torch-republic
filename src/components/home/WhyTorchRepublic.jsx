import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const CARDS = [
  {
    title: 'Instant Convenience',
    body: 'No pods, machines, or long brew times. Stir one scoop into hot water and your ritual is ready in seconds — at home, at work, or anywhere you go.',
    icon: '⚡',
  },
  {
    title: 'Ritual-Based Wellness',
    body: 'Coffee, mushroom coffee, and matcha designed around daily intention — each blend crafted to support a different part of your day, from morning momentum to calm evenings.',
    icon: '🌿',
  },
  {
    title: 'Founder-Led',
    body: 'Built by a real person, not a faceless wellness company. Torch Republic was created from a genuine search for better daily ritual — and every product reflects that.',
    icon: '🕯️',
  },
  {
    title: 'Transparency First',
    body: 'Clear ingredients, clear preparation, clear purpose. We believe you should know exactly what is in your cup and why it is there.',
    icon: '🔍',
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
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Why Torch Republic?
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Why Torch Republic Is Different
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '1.1rem', color: 'rgba(245,239,230,0.8)', fontWeight: 400, lineHeight: 1.9 }}>
            Torch Republic was created for people who want the convenience of instant coffee without sacrificing intention, quality, or wellness.
          </p>
        </motion.div>

        {/* Guarantee strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: '30-Day Satisfaction Guarantee', sub: 'Not right? We make it right.' },
            { label: 'Free Shipping Over $75', sub: 'Ships in 1–3 business days.' },
            { label: 'Subscribe & Save 20%', sub: 'Cancel or pause anytime.' },
            { label: 'U.S.-Based Small Business', sub: 'Corpus Christi, TX.' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: RG }}>{item.label}</p>
              <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 400 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((b, i) => (
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
              <p className="font-heading text-base" style={{ color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.75 }}>
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}