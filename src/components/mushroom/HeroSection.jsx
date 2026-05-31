import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE, LOGO_URL } from '../../lib/mushroomProducts';
import { ShoppingCart, Calendar } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
const BG_DESKTOP = HERO_IMAGE;
const BG_MOBILE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/efac670cf_ChatGPTImageMay31202604_33_21PM.png';

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

const TRUST_ICONS = [
  { svg: '🍄', label: "Lion's Mane\n+ Chaga" },
  { svg: '☕', label: '100%\nInstant Coffee' },
  { svg: '✦', label: '27\nServings' },
  { svg: '🌿', label: 'No Coffee\nMaker Needed' },
];

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
function DesktopHero() {
  return (
    <div
      className="hidden md:flex flex-col items-center justify-start relative w-full overflow-hidden"
      style={{
        backgroundColor: '#0a0708',
        backgroundImage: `url(${BG_DESKTOP})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(5,4,6,0.72)', zIndex: 1 }} />

      {/* Content column — centered, narrow, like the mobile design */}
      <div
        className="relative flex flex-col items-center text-center w-full"
        style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 32px 56px', zIndex: 2 }}
      >
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <img src={LOGO_URL} alt="Torch Republic Coffee Company" style={{ height: '80px', width: 'auto' }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-serif font-bold"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '0',
            textShadow: '0 2px 24px rgba(0,0,0,0.5)',
          }}
        >
          Instant<br />Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Flow<br />&amp; Daily Ritual</span>
        </motion.h1>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ width: '100%', margin: '20px 0' }}
        >
          <img
            src={BG_DESKTOP}
            alt="Six Torch Republic instant mushroom coffee tubes"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: '1rem',
            color: '#C8B8A6',
            lineHeight: 1.75,
            fontWeight: 300,
            marginBottom: '28px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings, clearer routines,
          and a little everyday magic — without the mess of brewing.
        </motion.p>

        {/* Trust icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-start justify-center gap-8 w-full mb-8"
        >
          {TRUST_ICONS.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span style={{ fontSize: '1.5rem', color: RG }}>{item.svg}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.7)',
                textAlign: 'center',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons — full width stacked */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="flex flex-col gap-3 w-full"
        >
          <Link
            to="/shop"
            className="flex items-center justify-center gap-3 font-mono uppercase tracking-[0.28em] font-bold transition-all hover:opacity-90 btn-glow w-full"
            style={{
              background: RG,
              color: '#050505',
              fontSize: '0.72rem',
              padding: '18px 24px',
              borderRadius: '999px',
            }}
          >
            <ShoppingCart size={16} />
            Shop the Blends
          </Link>
          <Link
            to="/subscription"
            className="flex items-center justify-center gap-3 font-mono uppercase tracking-[0.28em] font-bold transition-all hover:opacity-80 w-full"
            style={{
              border: `1px solid rgba(230,183,173,0.35)`,
              color: RG,
              fontSize: '0.72rem',
              padding: '18px 24px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.3)',
            }}
          >
            <Calendar size={16} />
            Build Your Monthly Ritual
          </Link>
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