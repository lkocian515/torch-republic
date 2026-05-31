import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const BG_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1563af3fd_LIVEFREESTAYREADY3.png';

export default function MushroomHero() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ borderBottom: '1px solid rgba(230,183,173,0.08)', minHeight: '520px' }}
    >
      {/* Background image — uses <img> so it scales naturally on all viewports */}
      <img
        src={BG_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(6,5,10,0.38) 0%, rgba(6,5,10,0.22) 45%, rgba(6,5,10,0.75) 100%)' }}
      />

      {/* Content */}
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-10 pt-14 pb-16 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono tracking-[0.45em] uppercase mb-6"
          style={{ color: 'rgba(230,183,173,0.75)', fontSize: '0.6rem' }}
        >
          Torch Republic Coffee Company
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="font-serif font-bold leading-tight mb-10"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 5.8rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.08,
            textShadow: '0 2px 40px rgba(0,0,0,0.7)',
          }}
        >
          Instant Mushroom Coffee<br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading max-w-2xl mb-10"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(247,241,232,0.7)',
            lineHeight: 1.85,
            fontWeight: 300,
            textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for
          smoother mornings, clearer routines, and a little everyday magic — without
          the mess of brewing.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/shop"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 btn-glow"
            style={{ background: RG, color: '#050505', padding: '14px 36px' }}
          >
            Shop the Blends
          </Link>
          <Link
            to="/bundle"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
            style={{ border: `1px solid ${RG}88`, color: `${RG}DD`, padding: '14px 36px', background: 'rgba(0,0,0,0.35)' }}
          >
            Build Your Bundle
          </Link>
        </motion.div>
      </div>
    </div>
  );
}