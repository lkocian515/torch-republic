import React from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    icon: '⚡',
    title: 'Instant',
    desc: 'Mixes quickly with hot water or your favorite milk. No brewer, no grinder, no waiting.',
  },
  {
    icon: '🍄',
    title: 'Functional',
    desc: "Blended with Lion's Mane + Chaga — mushrooms crafted to support your daily coffee ritual.",
  },
  {
    icon: '✦',
    title: 'Ritual-Ready',
    desc: 'Designed for focus, creative flow, calm energy, and a more intentional daily routine.',
  },
];

export default function WhyInstant() {
  return (
    <section className="px-6 md:px-10 py-24" style={{ background: '#0A0909' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.65)' }}>
            Why Instant Mushroom Coffee
          </p>
          <h2 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Coffee Without the Complicated Morning
          </h2>
          <p className="font-heading max-w-xl mx-auto"
            style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300 }}>
            No grinder. No coffee maker. No waiting on a pot. Just scoop, stir, sip, and step into
            your ritual. Each tube is made for people who want coffee that feels intentional, elevated, and easy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-start gap-4 p-8"
              style={{ background: '#111010', border: '1px solid rgba(230,183,173,0.1)' }}
            >
              <span style={{ fontSize: '1.8rem' }}>{card.icon}</span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>{card.title}</h3>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}