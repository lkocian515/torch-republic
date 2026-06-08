import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0807 0%, #111010 60%, #0d0b09 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 30%, rgba(230,183,173,0.08) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-32 md:py-40">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6"
          style={{ color: 'rgba(230,183,173,0.6)' }}
        >
          Lion's Mane · Chaga · Instant Powder
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif font-bold text-white mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
        >
          Coffee That Works<br />
          <span style={{ color: RG }}>As Hard As You Do</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-heading mb-10 max-w-xl mx-auto"
          style={{ fontSize: '1.05rem', color: 'rgba(247,241,232,0.55)', fontWeight: 300, lineHeight: 1.8 }}
        >
          Torch Republic blends premium instant coffee with functional mushrooms — Lion's Mane for focus, Chaga for resilience. No brewer needed. No compromises.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold px-8 py-4 transition-all hover:opacity-90 btn-glow"
            style={{ background: RG, color: '#080808', minWidth: 220, textAlign: 'center' }}
          >
            Shop Mushroom Coffee
          </Link>
          <Link
            to="/blends"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold px-8 py-4 transition-all hover:opacity-80"
            style={{ border: `1px solid rgba(230,183,173,0.35)`, color: 'rgba(230,183,173,0.8)', minWidth: 220, textAlign: 'center' }}
          >
            View All Blends →
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {['27 Servings Per Tube', 'Free Shipping $75+', '30-Day Guarantee', 'No Brewer Needed'].map(t => (
            <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
              ✦ {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}