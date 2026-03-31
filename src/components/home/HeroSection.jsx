import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=85"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.45, filter: 'contrast(1.15) saturate(0.6)' }}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
        <div className="absolute top-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }} />
      </div>

      {/* Centered content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
          <span className="font-mono text-xs tracking-[0.55em] uppercase" style={{ color: '#C9A24A' }}>
            Torch Republic
          </span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, #C9A24A, transparent)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif font-bold text-white leading-[1.0] tracking-tight mb-6"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
        >
          Carry the Flame.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="font-mono text-sm md:text-base tracking-[0.5em] uppercase mb-12"
          style={{ color: 'rgba(201,162,74,0.8)' }}
        >
          Faith &nbsp;·&nbsp; Freedom &nbsp;·&nbsp; Truth
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to={createPageUrl('BestSellers')}
            className="w-full sm:w-auto inline-flex items-center justify-center font-mono text-sm tracking-[0.25em] uppercase px-10 py-5 transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C9A24A', color: '#0B0B0B', fontWeight: 700, minWidth: '220px' }}
          >
            Shop Collection
          </Link>
          <a
            href="https://torchbearer-nation.sintra.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center font-mono text-sm tracking-[0.25em] uppercase px-10 py-5 transition-all duration-300"
            style={{ border: '1px solid rgba(201,162,74,0.4)', color: 'rgba(201,162,74,0.9)', backgroundColor: 'rgba(0,0,0,0.3)', minWidth: '220px' }}
          >
            Explore The Torch Box
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,162,74,0.5), transparent)' }}
        />
      </motion.div>
    </div>
  );
}