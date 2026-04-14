import React from 'react';
import { motion } from 'framer-motion';

export default function HomeBrandStatement() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto text-center"
        style={{ maxWidth: '700px' }}
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.3))' }} />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>Our Conviction</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.3), transparent)' }} />
        </div>
        <p className="font-serif leading-relaxed" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: 'rgba(240,235,225,0.82)', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.75 }}>
          "Torch Republic is not just coffee. It is a return to discipline, conviction, and clarity. Every blend is built on the legacy of those who carried the weight before us."
        </p>
      </motion.div>
    </section>
  );
}