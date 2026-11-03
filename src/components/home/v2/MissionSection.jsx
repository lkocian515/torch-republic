import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function MissionSection() {
  return (
    <section
      className="py-28 px-6"
      style={{ backgroundColor: '#101010', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-[680px] mx-auto text-center"
      >
        {/* Torch divider */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.3))' }} />
          <span style={{ fontSize: '1.1rem', opacity: 0.4 }}>🔥</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.3), transparent)' }} />
        </div>

        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: '#E6AC45' }}>
          Why Torch Republic Exists
        </p>

        <h2 className="font-serif mb-8 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#FFFCF7', letterSpacing: '-0.02em' }}>
          Coffee as ritual.<br />Legacy as purpose.
        </h2>

        <p className="font-heading leading-relaxed mb-10" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.88)', fontWeight: 400, lineHeight: 2.1 }}>
          The founding generation didn't build this country from comfort. They built it from conviction — morning by morning, decision by decision. Torch Republic exists to remind you of that. Every blend carries a legacy. Every cup is a declaration.
        </p>

        <Link
          to="/Journal"
          className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-50 pb-0.5"
          style={{ color: '#E6AC45', borderBottom: '1px solid rgba(201,162,74,0.5)' }}
        >
          Read the Mission →
        </Link>
      </motion.div>
    </section>
  );
}