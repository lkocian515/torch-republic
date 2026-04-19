import React from 'react';
import { motion } from 'framer-motion';

export default function PodsSocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}
    >
      <div className="max-w-[680px] mx-auto px-6 py-12 md:py-14 text-center">
        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ color: '#C9A24A', fontSize: '18px' }}>★</span>
          ))}
        </div>
        {/* Quote */}
        <blockquote
          className="font-serif italic mb-4"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', color: 'rgba(240,235,225,0.82)', lineHeight: 1.7 }}
        >
          "Best coffee I've had in years — bold but smooth."
        </blockquote>
        {/* Attribution */}
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
          — Verified Torchbearer · Washington Blend Pods
        </p>
      </div>
    </motion.section>
  );
}