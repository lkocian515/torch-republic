import React from 'react';
import { motion } from 'framer-motion';

export default function BrandExplainer() {
  return (
    <section
      className="py-16 px-6 text-center"
      style={{ backgroundColor: '#000', borderBottom: '1px solid rgba(196,163,90,0.08)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-[600px] mx-auto"
      >
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: '#C9A24A' }}>
          Our Story
        </p>
        <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
          What is Torch Republic?
        </h2>
        <div className="h-px w-12 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />
        <p className="font-heading" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.72)', fontWeight: 400, lineHeight: 2 }}>
          Torch Republic is small-batch coffee inspired by the people who refused to quit. Every blend carries a story—of resilience, independence, and the fire that built something greater.
        </p>
      </motion.div>
    </section>
  );
}