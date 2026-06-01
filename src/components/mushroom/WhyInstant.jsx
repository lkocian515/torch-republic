import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const PILLARS = [
  {
    num: '01',
    title: 'Instant. Always.',
    desc: 'No brewer. No grinder. No mess. One scoop into hot water or milk — your ritual begins in seconds, anywhere.',
  },
  {
    num: '02',
    title: 'Functional by Design',
    desc: "Lion's Mane and Chaga aren't trends — they're backed by centuries of traditional use and modern research for focus, flow, and immune support.",
  },
  {
    num: '03',
    title: 'Built for Ritual',
    desc: 'Each blend is named for a mindset. Choose the energy you want to carry into your day, and drink with intention.',
  },
];

export default function WhyInstant() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#0A0909' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            The Torch Republic Difference
          </p>
          <h2 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Coffee That Works as Hard as You Do
          </h2>
          <p className="font-heading max-w-md mx-auto"
            style={{ fontSize: '0.88rem', color: 'rgba(240,235,225,0.42)', lineHeight: 1.85, fontWeight: 300 }}>
            Premium instant coffee elevated with functional mushrooms — no compromise on taste, no compromise on quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-4 p-7"
              style={{ background: '#0E0D0D', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <span className="font-mono font-black" style={{ fontSize: '0.7rem', color: 'rgba(230,183,173,0.25)', letterSpacing: '0.1em' }}>
                {p.num}
              </span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>{p.title}</h3>
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand philosophy strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 p-8 md:p-10 text-center"
          style={{ background: '#0C0B0B', border: '1px solid rgba(230,183,173,0.08)' }}
        >
          <h3 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
            Small daily rituals create lasting change.
          </h3>
          <p className="font-heading max-w-2xl mx-auto"
            style={{ fontSize: '0.9rem', color: 'rgba(200,184,166,0.65)', lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic was built on that belief. Each blend represents a different mindset — from focus and discipline to creativity and transformation. Drink with intention. Build your ritual.
          </p>
        </motion.div>
      </div>
    </section>
  );
}