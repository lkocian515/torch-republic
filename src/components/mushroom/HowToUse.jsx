import React from 'react';
import { motion } from 'framer-motion';

const STEPS = [
  { num: '01', label: 'Scoop', desc: 'Add one serving to your cup.' },
  { num: '02', label: 'Stir', desc: 'Mix with hot water, milk, or your favorite creamer.' },
  { num: '03', label: 'Sip', desc: 'Stir, sip, and enjoy your ritual.' },
];

export default function HowToUse() {
  return (
    <section className="px-6 md:px-10 py-24" style={{ background: '#0D0C0C', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.65)' }}>How to Use</p>
          <h2 className="font-serif font-bold"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Your Ritual in Seconds
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center gap-4 p-8"
              style={{ background: '#111010', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <span className="font-mono font-black" style={{ fontSize: '2rem', color: 'rgba(201,162,74,0.25)', letterSpacing: '-0.04em' }}>
                {step.num}
              </span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.3rem' }}>{step.label}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.75, fontWeight: 300 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.2em] mt-10"
          style={{ color: 'rgba(255,255,255,0.22)' }}
        >
          Follow the serving instructions on the product packaging.
        </motion.p>
      </div>
    </section>
  );
}