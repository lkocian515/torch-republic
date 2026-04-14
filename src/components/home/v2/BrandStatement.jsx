import React from 'react';
import { motion } from 'framer-motion';

export default function BrandStatement() {
  return (
    <section className="py-28 px-6" style={{ backgroundColor: '#000' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto text-center"
        style={{ maxWidth: '700px' }}
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.4))' }} />
          <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>Our Mission</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), transparent)' }} />
        </div>

        <p
          className="font-serif leading-relaxed"
          style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'rgba(240,235,225,0.82)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.75 }}
        >
          "Torch Republic is not just coffee. It is a return to discipline, conviction, and clarity. Every blend is built on the legacy of those who carried the weight before us."
        </p>
      </motion.div>
    </section>
  );
}