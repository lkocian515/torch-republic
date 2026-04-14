import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section
      className="relative py-36 px-6 overflow-hidden"
      style={{ backgroundColor: '#0D0D0D', borderTop: '1px solid rgba(196,163,90,0.1)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{ width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 65%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-[600px] mx-auto"
      >
        <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-6" style={{ color: '#C9A24A' }}>
          Begin the Ritual
        </p>

        <h2 className="font-serif leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.025em' }}>
          Carry the<br />Flame.
        </h2>

        <div className="h-px w-16 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A60, transparent)' }} />

        <p className="font-heading mb-12" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.75)', fontWeight: 400, lineHeight: 1.9 }}>
          Start your ritual today.
        </p>

        <Link
          to="/CoffeeCollection"
          className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow"
          style={{ background: '#C9A24A', color: '#0B0B0B', fontWeight: 700, padding: '18px 52px' }}
        >
          Shop Coffee →
        </Link>
      </motion.div>
    </section>
  );
}