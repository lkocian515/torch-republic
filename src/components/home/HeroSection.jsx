import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const TRUST_ICONS = [
  { label: 'Instant Rituals', sub: 'Coffee + Mushroom Coffee + Matcha' },
  { label: '25–27 Servings', sub: 'Per Tube' },
  { label: 'No Machine Needed', sub: 'Just Add Hot Water' },
  { label: '30-Day Guarantee', sub: 'If Not Right, We Make It Right' },
];

export default function HeroSection() {
  return (
    <div style={{ background: '#080808' }}>
      {/* Hero Banner Image — smaller on desktop, full width on mobile */}
      <div className="flex justify-center md:max-w-[70vw] mx-auto">
        <img
          src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-hero-banner.jpg"
          alt="Torch Republic Coffee Company — Torchbearer premium instant coffee, GlowMind Clarity mushroom coffee, and The Monk ceremonial matcha. Fuel your ritual, elevate your life."
          style={{ width: '100%', height: 'auto', display: 'block' }}
          fetchPriority="high"
          loading="eager"
          onError={(e) => {
            e.target.src = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9e6cba4d4_ChatGPTImageJun10202607_49_52AM.png';
          }}
        />
      </div>

      {/* Headline + CTAs below image */}
      <section
        className="px-6 md:px-10 py-12 md:py-16 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Torch Republic Coffee Company
          </p>
          <h1
            className="font-serif font-bold mb-4 mx-auto"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              maxWidth: '720px',
            }}
          >
            Premium Instant Coffee, Mushroom Coffee & Matcha<br />
            <span style={{ color: RG }}>for Your Daily Ritual</span>
          </h1>
          <p
            className="font-heading mx-auto mb-8"
            style={{
              fontSize: 'clamp(1.05rem, 1.7vw, 1.15rem)',
              color: 'rgba(245,239,230,0.85)',
              fontWeight: 400,
              lineHeight: 1.85,
              maxWidth: '560px',
            }}
          >
            Torch Republic Coffee Company creates premium instant coffee, functional mushroom coffee, and ceremonial matcha designed to support focus, clarity, energy, and intentional daily rituals.
          </p>
        </motion.div>

        {/* Primary + Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4"
        >
          <Link
            to="/build-your-ritual"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808', padding: '16px 44px', display: 'inline-block', minWidth: '240px', textAlign: 'center' }}
          >
            Build My Ritual Bundle →
          </Link>
          <Link
            to="/shop"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block', minWidth: '220px', textAlign: 'center' }}
          >
            Shop Best Sellers
          </Link>
        </motion.div>

        {/* Reassurance line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
            U.S.-based small business &nbsp;·&nbsp; Secure checkout &nbsp;·&nbsp; Instant preparation
          </p>
        </motion.div>

        {/* Discount nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mb-6"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.75)' }}>
            First order? Use <span style={{ color: RG, fontWeight: 700 }}>WELCOME15</span> for 15% off
          </p>
        </motion.div>

        {/* Tertiary quiz link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-10"
        >
          <Link
            to="/quiz"
            className="font-mono text-[12px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
            style={{ color: 'rgba(230,183,173,0.7)', textDecoration: 'none' }}
          >
            Not sure where to start? → Take the Blend Quiz
          </Link>
        </motion.div>

        {/* Trust icon row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 pt-8"
          style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}
        >
          {TRUST_ICONS.map((item, i) => (
            <div key={i} className="text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold" style={{ color: RG }}>
                {item.label}
              </p>
              <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(210,195,175,0.5)', fontWeight: 400 }}>
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}