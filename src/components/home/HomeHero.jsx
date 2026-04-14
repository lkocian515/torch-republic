import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomeHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#000' }}>
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85"
        alt="Torch Republic"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      />

      {/* Edge fades */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-8 md:px-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[640px]"
        >
          <p className="font-mono text-[10px] tracking-[0.6em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.7)' }}>
            Torch Republic
          </p>
          <h1 className="font-serif mb-6" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 800, color: '#F0EBE1', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
            Carry the Flame.
          </h1>
          <p className="font-heading mb-10 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(240,235,225,0.6)', maxWidth: '480px', fontWeight: 300 }}>
            Coffee for those who refuse to forget what built this country.
          </p>
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center px-10 py-4 font-mono text-xs tracking-[0.3em] uppercase transition-all"
            style={{ background: '#C9A24A', color: '#000', fontWeight: 700 }}
            onMouseEnter={e => e.currentTarget.style.background = '#E4C46A'}
            onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
          >
            Shop Coffee
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
    </section>
  );
}