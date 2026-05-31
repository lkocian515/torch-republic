import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
const BG_DESKTOP = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1563af3fd_LIVEFREESTAYREADY3.png';
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

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
function DesktopHero() {
  return (
    <div
      className="hidden md:block relative w-full overflow-hidden"
      style={{ minHeight: '600px' }}
    >
      <img
        src={BG_DESKTOP}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(6,5,10,0.38) 0%, rgba(6,5,10,0.18) 45%, rgba(6,5,10,0.8) 100%)',
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-10 pt-16 pb-20 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono tracking-[0.45em] uppercase mb-6"
          style={{ color: 'rgba(230,183,173,0.75)', fontSize: '0.6rem' }}
        >
          Torch Republic Coffee Company
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="font-serif font-bold mb-10"
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 5.4rem)',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
            lineHeight: 1.07,
            textShadow: '0 2px 40px rgba(0,0,0,0.7)',
          }}
        >
          Instant Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Flow &amp; Daily Ritual</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-heading max-w-2xl mb-10"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'rgba(247,241,232,0.7)',
            lineHeight: 1.85,
            fontWeight: 300,
            textShadow: '0 1px 12px rgba(0,0,0,0.5)',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings,
          clearer routines, and a little everyday magic — without the mess of brewing.
        </motion.p>

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
            to="/subscription"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80"
            style={{ border: `1px solid ${RG}88`, color: RG_DEEP, padding: '14px 36px', background: 'rgba(0,0,0,0.35)' }}
          >
            Build Monthly Ritual
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