import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PremiumHero() {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '100svh',
        backgroundColor: '#000',
        backgroundImage: 'url(https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/29ced6b7f_1001704061.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}
    >
      {/* Layered cinematic overlays */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.78) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(0,0,0,0.5) 0%, transparent 80%)' }} />
      {/* Vignette bottom for content blending */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '38%', background: 'linear-gradient(to top, #050508 0%, rgba(5,5,8,0.6) 55%, transparent 100%)' }} />

      {/* Left decorative line — desktop only */}
      <div className="absolute left-8 md:left-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
        <div className="w-px h-20" style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,163,90,0.3))' }} />
        <span className="font-mono text-[8px] tracking-[0.6em] uppercase" style={{ color: 'rgba(196,163,90,0.3)', writingMode: 'vertical-rl', letterSpacing: '0.6em' }}>Est. Legacy</span>
        <div className="w-px h-20" style={{ background: 'linear-gradient(to top, transparent, rgba(196,163,90,0.3))' }} />
      </div>

      {/* Right decorative — desktop */}
      <div className="absolute right-8 md:right-14 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
        <div className="w-px h-20" style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,163,90,0.15))' }} />
        <span className="font-mono text-[8px] tracking-[0.6em] uppercase" style={{ color: 'rgba(196,163,90,0.2)', writingMode: 'vertical-rl' }}>Founders Series</span>
        <div className="w-px h-20" style={{ background: 'linear-gradient(to top, transparent, rgba(196,163,90,0.15))' }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-28 md:py-36" style={{ maxWidth: '720px' }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22,1,0.36,1] }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.5))' }} />
          <span className="font-mono text-[9px] tracking-[0.55em] uppercase" style={{ color: 'rgba(196,163,90,0.6)' }}>
            Heritage-Crafted · Founders Series Coffee
          </span>
          <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.5), transparent)' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white"
          style={{
            fontSize: 'clamp(2.6rem, 5.5vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 60px rgba(0,0,0,0.95)',
            marginBottom: '0.5rem',
          }}
        >
          Carry the Flame.
        </motion.h1>

        {/* Sub headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.58 }}
          className="flex items-center gap-3 mb-7"
        >
          <div className="h-px w-5" style={{ background: 'rgba(196,163,90,0.3)' }} />
          <span className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: 'rgba(196,163,90,0.55)' }}>Live Free &nbsp;·&nbsp; Stay Ready</span>
          <div className="h-px w-5" style={{ background: 'rgba(196,163,90,0.3)' }} />
        </motion.div>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.3, delay: 0.72 }}
          className="font-serif"
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.18rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 2,
            color: 'rgba(255,255,255,0.46)',
            textShadow: '0 2px 20px rgba(0,0,0,0.95)',
            marginBottom: '3.5rem',
            maxWidth: '520px',
          }}
        >
          Small-batch coffee, premium apparel, and heritage accessories — honoring America's greatest founders, one timeless piece at a time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/CoffeeCollection"
            className="inline-flex items-center justify-center gap-3 font-mono uppercase tracking-[0.32em] transition-all btn-glow"
            style={{ fontSize: '11px', fontWeight: 900, background: '#C9A24A', color: '#000', padding: '1.15rem 2.8rem' }}
          >
            Explore the Collection
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/Mission"
            className="inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.28em] transition-all"
            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)', padding: '1.15rem 2.2rem', border: '1px solid rgba(255,255,255,0.13)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,163,90,0.35)'; e.currentTarget.style.color = 'rgba(196,163,90,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
          >
            Our Legacy
          </Link>
        </motion.div>

        {/* Trust micro-line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex items-center gap-5 mt-12 flex-wrap justify-center"
        >
          {['🔒 Secure Checkout', '🇺🇸 Proudly American', '↩ 30-Day Returns', '✦ Free Shipping $150+'].map(t => (
            <span key={t} className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.2)' }}>{t}</span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <div className="w-px h-10 animate-bounce" style={{ background: 'linear-gradient(to bottom, rgba(196,163,90,0.4), transparent)' }} />
      </div>
    </div>
  );
}