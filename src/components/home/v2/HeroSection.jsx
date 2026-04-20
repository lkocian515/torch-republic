import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0a3c00618_generated_image.png';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(580px, 90vh, 920px)', backgroundColor: '#0A0A0A' }}>

      {/* Full-bleed cinematic image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Torch Republic"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.65, filter: 'brightness(1.1) contrast(1.06)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 45%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 20%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24" style={{ minHeight: 'clamp(580px, 90vh, 920px)' }}>
        <div className="max-w-[640px]">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.6em] uppercase mb-6"
            style={{ color: '#C9A24A' }}
          >
            Torch Republic · Small-Batch Coffee
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-none mb-6"
            style={{
              fontSize: 'clamp(3.2rem, 8vw, 7rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              textShadow: '0 4px 48px rgba(0,0,0,0.95)',
            }}
          >
            Carry the<br />Flame.
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="origin-left mb-7"
            style={{ height: '2px', width: '60px', background: '#C9A24A' }}
          />

          <motion.p
             initial={{ opacity: 0, y: 14 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.7, delay: 0.4 }}
             className="font-heading mb-10"
             style={{
               fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
               color: '#F0EBE1',
               fontWeight: 400,
               lineHeight: 1.7,
               maxWidth: '420px',
               textShadow: '0 1px 12px rgba(0,0,0,0.8)',
             }}
           >
             Premium coffee from the icons of American history.
           </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/CoffeeCollection"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-90 btn-glow"
              style={{ background: '#D4AE57', color: '#080808', fontWeight: 800, padding: '16px 36px' }}
            >
              Choose Your Blend →
            </Link>
            <Link
              to="/TheTorchBox"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
              style={{ color: '#F0EBE1', border: '1px solid rgba(240,235,225,0.4)', padding: '16px 28px' }}
            >
              Pick Your First Box
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '180px', background: 'linear-gradient(to top, #000, transparent)' }} />
    </section>
  );
}