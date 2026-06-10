import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const trustPills = [
  'No coffee maker needed',
  '27 servings per tube',
  'Subscribe & Save 20%',
  '30-day guarantee',
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)', minHeight: '90vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Subtle warm glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(230,183,173,0.07) 0%, transparent 70%)',
      }} />

      {/* Hero image — full bleed behind text */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ee5e8f634_LIVEFREESTAYREADY5.png"
          alt="Torch Republic Coffee Co. — Conscious instant coffee, mushroom coffee, and matcha"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.22 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,7,6,0.55) 0%, #080808 85%)' }} />
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-[900px] mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[9px] tracking-[0.6em] uppercase mb-6"
            style={{ color: 'rgba(230,183,173,0.6)' }}
          >
            Torch Republic Coffee Co.
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="font-serif font-bold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', color: '#FFFFFF', letterSpacing: '-0.025em', lineHeight: 1.1 }}
          >
            Conscious Coffee for<br />
            <span style={{ color: RG }}>Clearer Daily Rituals</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-heading mb-10 mx-auto"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.85, maxWidth: '620px' }}
          >
            Premium instant coffee, mushroom coffee, and matcha crafted for calm energy, daily clarity, and intentional mornings.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link
              to="/shop"
              className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808', padding: '16px 40px', display: 'inline-block' }}
            >
              Shop Best Sellers
            </Link>
            <Link
              to="/build-your-ritual"
              className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-75"
              style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block' }}
            >
              Build Your Ritual Bundle
            </Link>
          </motion.div>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustPills.map((pill, i) => (
              <span
                key={i}
                className="font-mono text-[7.5px] tracking-[0.2em] uppercase"
                style={{ color: 'rgba(230,183,173,0.4)' }}
              >
                ✦ {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}