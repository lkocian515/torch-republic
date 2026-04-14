import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=85"
        alt="Coffee hero"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
      />

      {/* Edge fades */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, #000 0%, transparent 40%, transparent 65%, #000 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, #000 0%, transparent 35%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #000 0%, transparent 20%)' }} />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-16 lg:px-24">
        <div className="max-w-[640px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ color: 'rgba(196,163,90,0.7)' }}
          >
            Torch Republic · Founders Series
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em' }}
          >
            Carry the Flame.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading text-base md:text-lg mb-10 max-w-[480px] leading-relaxed"
            style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300 }}
          >
            Coffee for those who refuse to forget what built this country.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link
              to="/CoffeeCollection"
              className="inline-flex items-center px-8 py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all hover:opacity-85"
              style={{ background: '#C4A35A', color: '#000', fontWeight: 700 }}
            >
              Shop Coffee →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}