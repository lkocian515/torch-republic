import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '../../lib/mushroomProducts';
import { ShoppingCart, Calendar, Sparkles, Zap, Coffee, Star } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

// Clean product-only image (no baked-in text)
const CLEAN_DESKTOP_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7f4efdbaa_LIVEFREESTAYREADY15x5in.png';

// Mobile hero image
const MOBILE_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/849523a71_LIVEFREESTAYREADY15x5in.png';

const TRUST_ITEMS = [
  { icon: Sparkles, label: "Lion's Mane + Chaga" },
  { icon: Zap, label: '100% Instant Coffee' },
  { icon: Coffee, label: '27 Servings' },
  { icon: Star, label: 'No Coffee Maker Needed' },
];

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
function MobileHero() {
  return (
    <div
      style={{
        display: 'none',
        width: '100%',
        backgroundColor: '#111111',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      className="mobile-hero"
    >
      {/* Live text heading */}
      <div style={{ padding: '36px 20px 6px', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          color: 'rgba(230,183,173,0.55)',
          marginBottom: '16px',
        }}>
          Torch Republic Coffee Company
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          fontSize: 'clamp(1.4rem, 5vw, 2rem)',
          color: '#FFFFFF',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          margin: 0,
        }}>
          Premium Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Clarity &amp; Daily Ritual</span>
        </h1>
      </div>

      {/* Hero banner image */}
      <div style={{ width: '100vw', position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: '0px', overflow: 'hidden' }}>
        <img
          src={MOBILE_BG}
          alt="Torch Republic instant mushroom coffee — six Lion's Mane and Chaga blends"
          fetchpriority="high"
          style={{
            width: '100vw',
            height: 'auto',
            display: 'block',
            transform: 'scale(1.25)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* CTA buttons */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        padding: '0 18px 28px', background: '#111111', alignItems: 'center',
      }}>
        <Link
          to="/shop"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: RG, color: '#050505',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
            padding: '14px 0', borderRadius: '999px', textDecoration: 'none', width: '100%',
          }}
        >
          <ShoppingCart size={14} />
          Shop the Blends
        </Link>
        <Link
          to="/subscription"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            border: '1px solid rgba(230,183,173,0.35)', color: RG_DEEP,
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700,
            padding: '14px 0', borderRadius: '999px', background: 'rgba(0,0,0,0.35)',
            textDecoration: 'none', width: '100%',
          }}
        >
          <Calendar size={14} />
          Build Monthly Ritual
        </Link>
        <p style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '0.82rem',
          color: 'rgba(200,184,166,0.75)',
          lineHeight: 1.65,
          fontWeight: 300,
          textAlign: 'center',
          marginTop: '4px',
        }}>
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings, clearer routines, and a little everyday magic — without the mess of brewing.
        </p>
        {/* Discount reminder */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(230,183,173,0.45)',
          textAlign: 'center',
          marginTop: '12px',
        }}>
          New customers — code{' '}
          <span style={{ color: '#E6B7AD', fontWeight: 700 }}>WELCOME10</span>
          {' '}· 10% off your first order
        </p>
      </div>
    </div>
  );
}

// ─── DESKTOP HERO ─────────────────────────────────────────────────────────────
// Only shown on screens ≥769px. Uses clean product-only image with live HTML text.
function DesktopHero() {
  return (
    <div
      style={{ display: 'none', backgroundColor: '#06050A', width: '100%', overflow: 'hidden' }}
      className="desktop-hero"
    >
      {/* Live text heading */}
      <div style={{ padding: '44px 32px 32px', textAlign: 'center', background: '#06050A' }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(230,183,173,0.55)',
            marginBottom: '18px',
          }}
        >
          Torch Republic Coffee Company
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2.4rem, 4vw, 4rem)',
            color: '#FFFFFF',
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          Premium Mushroom Coffee
          <br />
          <span style={{ color: RG }}>for Focus, Clarity &amp; Daily Ritual</span>
        </motion.h1>
      </div>

      {/* Image section — wide product lineup banner */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '15 / 5' }}>

        {/* Clean background image — NO baked-in text */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${CLEAN_DESKTOP_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          zIndex: 0,
        }} />

        {/* Gradient overlay for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.62) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />


      </div>

      {/* Below-image section — subtitle + trust bar + CTAs on solid dark bg */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '32px 32px 48px',
        background: '#111111',
      }}>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 2,
            fontWeight: 300,
            maxWidth: '660px',
            fontFamily: 'var(--font-heading)',
            marginBottom: '36px',
          }}
        >
          Premium instant coffee blended with Lion's Mane + Chaga, crafted for smoother mornings, clearer routines, and a little everyday magic — without the mess of brewing.
        </motion.p>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid rgba(230,183,173,0.12)',
            borderRadius: '999px',
            padding: '10px 4px',
            background: 'rgba(0,0,0,0.3)',
            marginBottom: '32px',
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '0 28px',
              borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid rgba(230,183,173,0.15)' : 'none',
            }}>
              <item.icon size={18} style={{ color: RG, flexShrink: 0 }} />
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                letterSpacing: '0.02em',
                textTransform: 'none',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                fontWeight: 500,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
        >
          <Link
            to="/shop"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: RG, color: '#050505',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '15px 40px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            <ShoppingCart size={15} />
            Shop the Blends
          </Link>
          <Link
            to="/subscription"
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              border: `1px solid rgba(230,183,173,0.35)`,
              color: RG_DEEP,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '15px 40px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.35)',
              textDecoration: 'none',
            }}
          >
            <Calendar size={15} />
            Build Monthly Ritual
          </Link>
        </motion.div>

        {/* Discount badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(230,183,173,0.5)',
            marginTop: '20px',
          }}
        >
          New customers — use code{' '}
          <span style={{ color: '#E6B7AD', fontWeight: 700 }}>WELCOME10</span>
          {' '}for 10% off your first order
        </motion.p>
      </div>
    </div>
  );
}

export default function MushroomHero() {
  return (
    <>
      <style>{`
        .mobile-hero { display: none !important; }
        .desktop-hero { display: block !important; }
        @media (max-width: 768px) {
          .mobile-hero { display: block !important; }
          .desktop-hero { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-hero { display: none !important; }
          .desktop-hero { display: block !important; }
        }
      `}</style>
      <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <MobileHero />
        <DesktopHero />
      </div>
    </>
  );
}