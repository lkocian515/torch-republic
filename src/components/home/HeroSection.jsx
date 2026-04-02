import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Star, ChevronDown } from 'lucide-react';

const TRUST_SIGNALS = [
  { icon: ShieldCheck, text: 'Secure Checkout' },
  { icon: Truck, text: 'Ships from USA' },
  { icon: Star, text: '5-Star Rated' },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-background"
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, hsl(49 100% 50% / 0.05), transparent 60%)`,
        }}
      />

      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/56cf651fe_ggrtgtrgrt.png"
          alt="Torch Republic Hero"
          className="w-full h-full object-contain"
          style={{ objectPosition: 'center -30%', backgroundColor: '#000', filter: 'brightness(1.12) contrast(1.08)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 25%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
        <div className="max-w-lg">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-5"
          >
            <div className="h-px w-6 sm:w-8" style={{ background: 'linear-gradient(90deg, #0E2A2F, #C8A44D)' }} />
            <span className="font-mono tracking-[0.2em] sm:tracking-[0.35em] uppercase whitespace-nowrap" style={{ color: '#C8A44D', fontSize: '10px' }}>Faith · Freedom · Truth</span>
            <div className="h-px w-6 sm:w-8" style={{ background: 'linear-gradient(90deg, #C8A44D, #0E2A2F)' }} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
                        className="text-2xl sm:text-4xl md:text-5xl font-heading font-black leading-[1.1] tracking-tight text-white mb-5"
          >
            Premium Patriot Gear<br /><span style={{ color: '#D4AF5A' }}>Built for the Bold.</span>
          </motion.h1>
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed max-w-xl"
          >
            Rugged apparel, accessories, and collectibles for patriots, believers, and freedom-lovers. Designed to last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 mb-8"
          >
            <Link
              to={createPageUrl('BestSellers')}
              className="inline-flex items-center justify-center font-heading font-black text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C9A24A 100%)', color: '#fff', boxShadow: '0 4px 30px rgba(14,42,47,0.6), 0 0 0 1px rgba(201,162,74,0.3)' }}
            >
              Shop Bestsellers
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Shirt text overlay */}
      <div
        className="absolute hidden md:flex flex-col items-center justify-center pointer-events-none"
        style={{
          right: '14%',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.55,
          mixBlendMode: 'overlay',
        }}
      >
        <span
          className="block font-heading font-black uppercase tracking-[0.35em] text-white"
          style={{ fontSize: '13px', letterSpacing: '0.5em', textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
        >
          GOD · FAMILY · COUNTRY
        </span>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" style={{ color: 'rgba(200,164,77,0.5)' }} />
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}