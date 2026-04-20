import React from 'react';
import { motion } from 'framer-motion';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=1600&q=80';

export default function MugsTumblersHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(420px, 55vh, 720px)', backgroundColor: '#0A0A0A' }}>
      {/* Hero image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Mugs & Tumblers"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.55, filter: 'brightness(0.9) contrast(1.1)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 50%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24" style={{ minHeight: 'clamp(420px, 55vh, 720px)' }}>
        <div className="max-w-[580px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.6em] uppercase mb-6"
            style={{ color: '#C9A24A' }}
          >
            Torch Republic · Home & Lifestyle
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-none mb-4"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 48px rgba(0,0,0,0.95)',
            }}
          >
            Mugs &<br />Tumblers
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="origin-left mb-6"
            style={{ height: '2px', width: '60px', background: '#C9A24A' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-heading mb-8"
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
              color: '#F0EBE1',
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: '440px',
              textShadow: '0 1px 12px rgba(0,0,0,0.8)',
            }}
          >
            Carry the Flame Beyond the Brew
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            href="https://torch-republic.com/collections/mugs-tumblers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-90 btn-glow"
            style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 36px' }}
          >
            Shop Drinkware →
          </motion.a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '140px', background: 'linear-gradient(to top, #000, transparent)' }} />
    </section>
  );
}