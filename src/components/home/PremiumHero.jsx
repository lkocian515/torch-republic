import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PremiumHero() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000',
        backgroundImage: 'url(https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/29ced6b7f_1001704061.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Cinematic overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 55%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.05) 75%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: 'linear-gradient(to top, #050508, transparent)' }} />

      {/* Decorative side lines */}
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3">
        <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,163,90,0.4))' }} />
        <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.4)', writingMode: 'vertical-rl' }}>Est. Legacy</span>
        <div className="w-px h-16" style={{ background: 'linear-gradient(to top, transparent, rgba(196,163,90,0.4))' }} />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ maxWidth: '700px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.5)' }} />
          <span className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(196,163,90,0.65)' }}>
            Founders Series · Heritage-Crafted Coffee
          </span>
          <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.5)' }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white"
          style={{
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            textShadow: '0 2px 40px rgba(0,0,0,0.9)',
            marginBottom: '0.5rem',
          }}
        >
          Carry the Flame.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.75 }}
          className="font-serif"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.9,
            color: 'rgba(255,255,255,0.52)',
            textShadow: '0 1px 12px rgba(0,0,0,0.9)',
            marginBottom: '3.5rem',
            maxWidth: '520px',
          }}
        >
          Premium small-batch coffee, apparel, and accessories honoring America's founding legacy — one timeless piece at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center justify-center font-mono font-black uppercase tracking-[0.3em] transition-all hover:opacity-85 btn-glow"
            style={{ fontSize: '11px', background: '#C9A24A', color: '#000', padding: '1.1rem 3rem' }}
          >
            Explore the Collection
          </Link>
          <Link
            to="/Mission"
            className="inline-flex items-center justify-center font-mono uppercase tracking-[0.25em] transition-all hover:border-gold hover:text-white"
            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', padding: '1.1rem 2.25rem', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            Our Legacy
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <div className="w-px h-10 animate-bounce" style={{ background: 'linear-gradient(to bottom, rgba(196,163,90,0.5), transparent)' }} />
        </motion.div>
      </div>
    </div>
  );
}