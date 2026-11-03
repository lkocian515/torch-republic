import React from 'react';
import { motion } from 'framer-motion';

const CREAM = '#F7F2E9';
const CARD = '#FFFCF7';
const TEXT = '#32190F';
const BODY = '#5E4639';
const RG = '#E6AC45';
const CLAY = '#9B4E2F';

const STEPS = [
  { num: '01', label: 'Scoop', desc: 'Add one serving of instant mushroom coffee powder to your mug.' },
  { num: '02', label: 'Mix', desc: 'Stir with 8–12 oz of hot water, milk, or your favorite creamer. Dissolves in 15 seconds.' },
  { num: '03', label: 'Sip', desc: 'Enjoy smooth, coffee-forward taste with functional mushrooms. No machine needed.' },
];

export default function HowToUse() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: CREAM, position: 'relative' }}>
      <div className="max-w-[800px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-3"
            style={{ color: RG }}>How to Use</p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: TEXT, letterSpacing: '-0.02em' }}>
            How to Use It
          </h2>
          <p className="font-heading mt-3 max-w-md mx-auto"
            style={{ fontSize: '0.9rem', color: BODY, fontWeight: 300, lineHeight: 1.8 }}>
            No coffee maker. No grinder. No cleanup. Just scoop, stir, and sip.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-7"
              style={{ background: CARD, border: '1px solid rgba(230,183,173,0.28)' }}
            >
              <span className="font-mono font-black" style={{ fontSize: '0.7rem', color: 'rgba(184,101,67,0.35)', letterSpacing: '0.1em' }}>
                {step.num}
              </span>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.2rem', color: TEXT }}>{step.label}</h3>
              <p className="font-heading text-sm" style={{ color: BODY, lineHeight: 1.8, fontWeight: 300 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[7px] tracking-[0.2em] mt-8"
          style={{ color: BODY }}
        >
          Follow serving instructions on the product packaging.
        </motion.p>
      </div>
    </section>
  );
}