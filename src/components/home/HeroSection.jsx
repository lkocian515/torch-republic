import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a1f33e3ce_hero.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45, filter: 'contrast(1.1) saturate(0.8)' }}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(110deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.2) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0B0B0B 0%, transparent 35%)' }} />
        {/* Subtle top vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%)' }} />
      </div>

      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(900px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(201,162,74,0.04), transparent 55%)`,
        }}
      />

      {/* Emerald edge glow — very subtle */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px opacity-30 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #1B7A6A 40%, #1B7A6A 60%, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-32 md:py-40">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
            <span className="font-mono text-xs tracking-[0.5em] uppercase" style={{ color: '#C9A24A', letterSpacing: '0.45em' }}>
              Faith &nbsp;·&nbsp; Freedom &nbsp;·&nbsp; Truth
            </span>
          </motion.div>

          {/* Main headline — serif, cinematic */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold leading-[1.0] tracking-tight text-white mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            Wear What<br />
            <span style={{ color: '#C9A24A' }}>You Stand For.</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-base md:text-lg leading-relaxed mb-12 max-w-lg font-heading font-light"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            Premium American gear for patriots, believers, and those who refuse to stay silent.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to={createPageUrl('BestSellers')}
              className="group inline-flex items-center justify-center gap-2 font-mono text-sm tracking-[0.25em] uppercase px-10 py-5 transition-all duration-300"
              style={{
                backgroundColor: '#C9A24A',
                color: '#0B0B0B',
                fontWeight: 700,
              }}
            >
              Shop the Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="https://torchbearer-nation.sintra.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-mono text-sm tracking-[0.25em] uppercase px-10 py-5 transition-all duration-300 hover:border-primary/80"
              style={{
                border: '1px solid rgba(201,162,74,0.35)',
                color: 'rgba(201,162,74,0.9)',
                backgroundColor: 'transparent',
              }}
            >
              🔥 The Torch Box
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.35)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
    </div>
  );
}