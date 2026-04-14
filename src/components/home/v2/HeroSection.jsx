import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4b6e27689_ChatGPTImageApr10202612_28_03PM.png';

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(480px, 75vh, 780px)', backgroundColor: '#0B0B0B' }}
    >
      {/* ── SPLIT GRID ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: 'clamp(480px, 75vh, 780px)' }}>

        {/* LEFT — Text */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 py-16 lg:py-0">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5"
            style={{ color: 'rgba(201,162,74,0.55)' }}
          >
            Torch Republic · Founders Series
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-none mb-8"
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              color: '#EAEAEA',
              letterSpacing: '-0.025em',
            }}
          >
            Carry the<br />Flame.
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="origin-left mb-5"
            style={{ height: '1px', width: '56px', background: '#C9A24A', opacity: 0.6 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-heading mb-8 max-w-[380px] leading-loose"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              color: 'rgba(234,234,234,0.45)',
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
          >
            History in a cup.<br />Brewed daily.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link
              to="/CoffeeCollection"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-80 btn-glow"
              style={{
                background: '#C9A24A',
                color: '#0B0B0B',
                fontWeight: 700,
                padding: '16px 36px',
              }}
            >
              Shop Coffee
              <span style={{ fontSize: '0.9em', opacity: 0.7 }}>→</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT — Image */}
        <div className="relative hidden lg:block" style={{ minHeight: 'clamp(480px, 75vh, 780px)' }}>
          {/* Cinematic image */}
          <img
            src={HERO_IMAGE}
            alt="Torch Republic — Carry the Flame"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.9 }}
          />

          {/* Fade left into black */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0B0B0B 0%, transparent 30%)' }}
          />
          {/* Fade top */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #0B0B0B 0%, transparent 18%)' }}
          />
          {/* Fade bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0B0B0B 0%, transparent 18%)' }}
          />
          {/* Fade right edge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0B0B0B 0%, transparent 15%)' }}
          />
        </div>
      </div>

      {/* Mobile image — behind text, full bleed */}
      <div className="absolute inset-0 lg:hidden pointer-events-none">
        <img
          src={HERO_IMAGE}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.18 }}
        />
      </div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '120px', background: 'linear-gradient(to top, #0B0B0B, transparent)' }}
      />
    </section>
  );
}