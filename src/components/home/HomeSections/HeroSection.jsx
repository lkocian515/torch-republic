import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0a0807 0%, #111010 60%, #0d0b09 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 30% 40%, rgba(230,183,173,0.07) 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 py-28 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Right: Product image (order-first on desktop = appears left visually due to reversed grid) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-2 lg:order-1 flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-sm mx-auto"
              style={{
                background: 'linear-gradient(135deg, #141312 0%, #0F0E0D 100%)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(230,183,173,0.05)',
                borderRadius: '2px',
              }}
            >
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7f4efdbaa_LIVEFREESTAYREADY15x5in.png"
                alt="Torch Republic Premium Mushroom Coffee Collection"
                className="w-full h-auto object-contain"
                style={{ padding: '12px' }}
              />
              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(230,183,173,0.07) 0%, transparent 70%)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </motion.div>

          {/* Left: Copy + CTAs */}
          <motion.div
            className="order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p
              className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6"
              style={{ color: 'rgba(230,183,173,0.6)' }}
            >
              Lion's Mane · Chaga · Instant Powder
            </p>

            {/* Headline */}
            <h1
              className="font-serif font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
            >
              Coffee That Works<br />
              <span style={{ color: RG }}>As Hard As You Do</span>
            </h1>

            {/* Sub */}
            <p
              className="font-heading mb-10 max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: '1.05rem', color: 'rgba(247,241,232,0.55)', fontWeight: 300, lineHeight: 1.8 }}
            >
              Torch Republic blends premium instant coffee with functional mushrooms — Lion's Mane for focus, Chaga for resilience. No brewer needed. No compromises.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
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
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
              {['27 Servings Per Tube', 'Free Shipping $75+', '30-Day Guarantee', 'No Brewer Needed'].map(t => (
                <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  ✦ {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}