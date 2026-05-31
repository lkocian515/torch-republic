import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '../../lib/mushroomProducts';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
// Clean product-only lineup image — no baked-in text
const BG_DESKTOP = HERO_IMAGE;
const BG_MOBILE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/473eeb1cb_ChatGPTImageMay31202604_33_21PM.png';

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <div
      className="md:hidden relative w-full"
      style={{ backgroundColor: '#050505', margin: 0, padding: 0 }}
    >
      {/* Full-width hero image — no cropping */}
      <img
        src={BG_MOBILE}
        alt="Torch Republic Coffee Company instant mushroom coffee mobile hero with six Lion's Mane and Chaga blends."
        fetchpriority="high"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          objectPosition: 'center top',
          margin: 0,
          padding: 0,
        }}
      />

      {/* Transparent clickable overlays for the two CTA buttons in the image.
          These are positioned over the bottom ~18% of the image where the buttons live.
          Using percentage-based positioning so they scale with image width. */}
      <Link
        to="/shop"
        aria-label="Shop the Blends"
        style={{
          position: 'absolute',
          bottom: '12.5%',
          left: '4%',
          right: '4%',
          height: '7%',
          borderRadius: '999px',
          display: 'block',
          background: 'transparent',
        }}
      />
      <Link
        to="/subscription"
        aria-label="Build Your Monthly Ritual"
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '4%',
          right: '4%',
          height: '7%',
          borderRadius: '999px',
          display: 'block',
          background: 'transparent',
        }}
      />
    </div>
  );
}

const TRUST_ITEMS = [
  { icon: '🍄', label: "Lion's Mane + Chaga" },
  { icon: '⚡', label: '100% Instant Coffee' },
  { icon: '☕', label: '27 Servings' },
  { icon: '✦', label: 'No Coffee Maker Needed' },
];

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
function DesktopHero() {
  return (
    <div
      className="hidden md:flex flex-col items-center justify-center relative w-full overflow-hidden"
      style={{
        minHeight: '82vh',
        maxHeight: '900px',
        backgroundColor: '#050505',
        backgroundImage: `url(${BG_DESKTOP})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text readability — covers any image detail */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.68) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content — sits above overlay */}
      <div
        className="relative flex flex-col items-center text-center"
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '36px 24px 0', zIndex: 2, alignSelf: 'flex-start' }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{
            color: 'rgba(230,183,173,0.72)',
            fontSize: '0.58rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            marginBottom: '24px',
          }}
        >
          Torch Republic Coffee Company
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-serif font-bold"
          style={{
            fontSize: 'clamp(3.5rem, 6vw, 6.4rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.0,
            marginBottom: '28px',
            textShadow: '0 2px 32px rgba(0,0,0,0.6)',
          }}
        >
          Instant Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            color: '#C8B8A6',
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: '700px',
            marginBottom: '36px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
          clearer routines, and a little everyday magic — without the mess of brewing.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36 }}
          className="flex flex-row items-center gap-4 mb-10"
        >
          <Link
            to="/shop"
            className="font-mono uppercase tracking-[0.3em] font-bold transition-all hover:opacity-90 btn-glow"
            style={{
              background: RG,
              color: '#050505',
              fontSize: '0.65rem',
              padding: '15px 40px',
              borderRadius: '999px',
            }}
          >
            Shop the Blends
          </Link>
          <Link
            to="/subscription"
            className="font-mono uppercase tracking-[0.3em] font-bold transition-all hover:opacity-80"
            style={{
              border: `1px solid ${RG}66`,
              color: RG_DEEP,
              fontSize: '0.65rem',
              padding: '15px 40px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.4)',
            }}
          >
            Build Monthly Ritual
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-0"
          style={{
            border: '1px solid rgba(230,183,173,0.12)',
            borderRadius: '999px',
            padding: '10px 4px',
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-6"
              style={{
                borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid rgba(230,183,173,0.15)' : 'none',
              }}
            >
              <span style={{ fontSize: '0.8rem' }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(230,183,173,0.65)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function MushroomHero() {
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <MobileHero />
      <DesktopHero />
    </div>
  );
}