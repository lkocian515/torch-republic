import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const TRUST_ICONS = [
  { label: 'Instant Rituals', sub: 'Coffee · Mushroom · Matcha' },
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
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6acb79309_ChatGPTImageJun10202602_18_46AM.png"
          alt="Torch Republic Coffee Company — Premium instant coffee, mushroom coffee and matcha for clarity, focus, and intentional daily rituals."
          style={{ width: '100%', height: 'auto', display: 'block' }}
          fetchPriority="high"
          loading="eager"
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
              fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              maxWidth: '680px',
            }}
          >
            Build Your<br />
            <span style={{ color: RG }}>Daily Ritual</span>
          </h1>
          <p
            className="font-heading mx-auto mb-8"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.05rem)',
              color: 'rgba(210,195,175,0.75)',
              fontWeight: 400,
              lineHeight: 1.85,
              maxWidth: '540px',
            }}
          >
            Premium instant coffee, mushroom coffee, and matcha crafted for morning energy, focus, calm clarity, and intentional daily routines.
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
            Build Your Ritual Bundle →
          </Link>
          <Link
            to="/shop"
            className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block', minWidth: '220px', textAlign: 'center' }}
          >
            Shop Individual Blends
          </Link>
        </motion.div>

        {/* Tertiary quiz link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <Link
            to="/quiz"
            className="font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:opacity-80"
            style={{ color: 'rgba(230,183,173,0.45)', textDecoration: 'none' }}
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