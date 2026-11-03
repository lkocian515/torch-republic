import React from 'react';
import { motion } from 'framer-motion';

const PAGE = '#F7F2E9';
const CARD = '#FFFCF7';
const TEXT = '#32190F';
const BODY = '#5E4639';
const RG = '#E6AC45';
const CLAY = '#9B4E2F';

const PILLARS = [
  {
    num: '01',
    title: 'Instant. Always.',
    desc: 'No brewer. No grinder. No mess. One scoop into hot water or milk — your ritual begins in seconds, anywhere.',
  },
  {
    num: '02',
    title: 'Functional by Design',
    desc: "Lion's Mane, Cordyceps and Reishi aren't trends — they're backed by centuries of traditional use and modern research for focus, flow, and immune support.",
  },
  {
    num: '03',
    title: 'Built for Ritual',
    desc: 'Each blend is named for a mindset. Choose the energy you want to carry into your day, and drink with intention.',
  },
];

export default function WhyInstant() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: PAGE, position: 'relative' }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: RG }}>
            The Torch Republic Difference
          </p>
          <h2 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            Coffee That Works as Hard as You Do
          </h2>
          <p className="font-heading max-w-md mx-auto"
            style={{ fontSize: '0.9rem', color: BODY, lineHeight: 1.9, fontWeight: 300 }}>
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
              style={{ background: CARD, border: '1px solid rgba(230,183,173,0.28)', transition: 'border-color 0.3s' }}
            >
              <span className="font-mono font-black" style={{ fontSize: '0.7rem', color: 'rgba(184,101,67,0.4)', letterSpacing: '0.1em' }}>
                {p.num}
              </span>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.15rem', lineHeight: 1.2, color: TEXT }}>{p.title}</h3>
              <p className="font-heading text-sm leading-relaxed" style={{ color: BODY, fontWeight: 300 }}>
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
          style={{ background: CARD, border: '1px solid rgba(230,183,173,0.28)' }}
        >
          <h3 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: TEXT, letterSpacing: '-0.01em' }}>
            Small daily rituals create lasting change.
          </h3>
          <p className="font-heading max-w-2xl mx-auto"
            style={{ fontSize: '0.9rem', color: BODY, lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic was built on that belief. Each blend represents a different mindset — from focus and discipline to creativity and transformation. Drink with intention. Build your ritual.
          </p>
        </motion.div>
      </div>
    </section>
  );
}