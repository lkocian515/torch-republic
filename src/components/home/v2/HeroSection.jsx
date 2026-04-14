import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: '#0B0B0B' }}
    >
      {/* ── RIGHT SIDE IMAGE ── */}
      <div className="absolute inset-0 flex">
        {/* Left half: pure black */}
        <div className="w-1/2 h-full" style={{ backgroundColor: '#0B0B0B' }} />
        {/* Right half: image */}
        <div className="w-1/2 h-full relative">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/73803359d_generated_image.png"
            alt="Coffee hero"
            className="absolute inset-0 w-full h-full object-cover object-left"
            style={{ opacity: 0.9 }}
          />
          {/* Fade left into black */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0B0B0B 0%, transparent 35%)' }} />
          {/* Fade top */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #0B0B0B 0%, transparent 18%)' }} />
          {/* Fade bottom */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0B0B0B 0%, transparent 18%)' }} />
          {/* Fade right edge */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0B0B0B 0%, transparent 25%)' }} />
        </div>
      </div>

      {/* Mobile image (shown below md) */}
      <div className="absolute inset-0 md:hidden">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/73803359d_generated_image.png"
          alt="Coffee hero"
          className="w-full h-full object-cover"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0B 40%, transparent 100%)' }} />
      </div>

      {/* ── LEFT SIDE TEXT ── */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="w-full md:w-1/2 px-8 md:px-16 lg:px-24 py-32 flex flex-col justify-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[9px] tracking-[0.55em] uppercase mb-10"
            style={{ color: 'rgba(201,162,74,0.55)' }}
          >
            Torch Republic · Founders Series
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif leading-none mb-8"
            style={{
              fontSize: 'clamp(3.8rem, 7vw, 6.5rem)',
              fontWeight: 700,
              color: '#EAEAEA',
              letterSpacing: '-0.025em',
              lineHeight: 0.95,
            }}
          >
            Carry the<br />Flame.
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ originX: 0 }}
            className="mb-8"
          >
            <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, #C9A24A, transparent)' }} />
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-heading mb-14"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'rgba(234,234,234,0.45)',
              fontWeight: 300,
              letterSpacing: '0.04em',
              lineHeight: 1.8,
            }}
          >
            History in a cup.<br />Brewed daily.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              to="/CoffeeCollection"
              className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] uppercase transition-all"
              style={{
                padding: '14px 32px',
                background: '#C9A24A',
                color: '#0B0B0B',
                fontWeight: 700,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#D4AE5A'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}
            >
              Shop Coffee <span style={{ opacity: 0.7 }}>→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}