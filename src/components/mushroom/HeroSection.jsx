import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '../../lib/mushroomProducts';

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

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
// Cinematic wide layout: eyebrow → headline over image → subtitle below
const DESKTOP_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9f4a5277b_LIVEFREESTAYREADY3.png';

function DesktopHero() {
  return (
    <div
      className="hidden md:block relative w-full overflow-hidden"
      style={{ backgroundColor: '#06050A' }}
    >
      {/* ── TOP SECTION: eyebrow + headline over the image ── */}
      <div className="relative w-full" style={{ position: 'relative' }}>

        {/* Background image — full width cinematic */}
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 7',
            backgroundImage: `url(${DESKTOP_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}
        >
          {/* Top fade for text readability */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(6,5,10,0.65) 0%, rgba(6,5,10,0.1) 40%, rgba(6,5,10,0.55) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Eyebrow + Headline — overlaid on top of the image */}
          <div
            className="absolute top-0 left-0 right-0 flex flex-col items-center text-center"
            style={{ padding: '36px 32px 0' }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                color: 'rgba(230,183,173,0.75)',
                fontSize: '0.6rem',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
                marginBottom: '18px',
              }}
            >
              Torch Republic Coffee Company
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.08,
                textShadow: '0 2px 32px rgba(0,0,0,0.7)',
                letterSpacing: '-0.01em',
              }}
            >
              Instant Mushroom Coffee
              <br />
              <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: subtitle on dark background ── */}
      <div
        className="flex flex-col items-center text-center"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,5,10,1) 0%, #06050A 100%)',
          padding: '36px 24px 52px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 2,
            fontWeight: 300,
            maxWidth: '680px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings, clearer routines, and a little everyday magic — without the mess of brewing.
        </motion.p>
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