import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '../../lib/mushroomProducts';
import { ShoppingCart, Calendar } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

// Clean product-only image (no baked-in text)
const CLEAN_DESKTOP_BG = HERO_IMAGE;

// Mobile hero image (has baked-in text, buttons, trust icons)
const MOBILE_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6a37e654a_generated_image.png';

const TRUST_ITEMS = [
  { icon: '🍄', label: "Lion's Mane + Chaga" },
  { icon: '⚡', label: '100% Instant Coffee' },
  { icon: '☕', label: '27 Servings' },
  { icon: '✦', label: 'No Coffee Maker Needed' },
];

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
// Only shown on screens ≤768px. Uses original background with live HTML text overlay.
function MobileHero() {
  return (
    <div
      style={{
        display: 'none',
        position: 'relative',
        width: '100%',
        backgroundColor: '#050505',
        margin: 0,
        padding: 0,
      }}
      className="mobile-hero"
    >
      {/* Background image */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '9 / 16',
        backgroundImage: `url(${MOBILE_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Gradient overlay for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Live HTML text overlay */}
        <div style={{
          position: 'absolute', top: '8%', left: '6%', right: '6%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', zIndex: 2,
        }}>
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: 'rgba(230,183,173,0.78)',
              fontSize: '0.52rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              marginBottom: '14px',
            }}
          >
            Torch Republic Coffee Company
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 8vw, 2.8rem)',
              color: '#FFFFFF',
              lineHeight: 1.15,
              textShadow: '0 2px 24px rgba(0,0,0,0.85)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Mushroom Coffee
            <br />
            <span style={{ color: RG }}>for Focus, Clarity &amp; Daily Ritual</span>
          </motion.h1>
        </div>

        {/* CTA Buttons */}
        <div style={{
          position: 'absolute', bottom: '14%', left: '6%', right: '6%',
          display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2,
        }}>
          <Link
            to="/shop"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: RG, color: '#050505',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '14px 28px',
              borderRadius: '999px',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(230,183,173,0.25)',
            }}
          >
            <ShoppingCart size={14} />
            Shop the Blends
          </Link>
          <Link
            to="/subscription"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              border: `1px solid rgba(230,183,173,0.35)`,
              color: RG_DEEP,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '14px 28px',
              borderRadius: '999px',
              background: 'rgba(0,0,0,0.45)',
              textDecoration: 'none',
            }}
          >
            <Calendar size={14} />
            Build Monthly Ritual
          </Link>
        </div>

        {/* Trust icons */}
        <div style={{
          position: 'absolute', bottom: '4%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', gap: '18px', zIndex: 2,
        }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(230,183,173,0.65)' }}>🍄</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(230,183,173,0.65)' }}>⚡</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(230,183,173,0.65)' }}>☕</span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(230,183,173,0.65)' }}>✦</span>
        </div>
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
      {/* Image section — clean product lineup, 16:7 cinematic ratio */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 7' }}>

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

        {/* Live HTML text — eyebrow + headline */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', padding: '40px 32px 0', zIndex: 2,
        }}>
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: 'rgba(230,183,173,0.78)',
              fontSize: '0.58rem',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              marginBottom: '18px',
            }}
          >
            Torch Republic Coffee Company
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
              color: '#FFFFFF',
              lineHeight: 1.08,
              textShadow: '0 2px 32px rgba(0,0,0,0.75)',
              letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Mushroom Coffee
            <br />
            <span style={{ color: RG }}>for Focus, Clarity &amp; Daily Ritual</span>
          </motion.h1>
        </div>
      </div>

      {/* Below-image section — subtitle + trust bar + CTAs on solid dark bg */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '40px 32px 56px',
        background: '#06050A',
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
              display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px',
              borderRight: i < TRUST_ITEMS.length - 1 ? '1px solid rgba(230,183,173,0.15)' : 'none',
            }}>
              <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.65)',
                whiteSpace: 'nowrap',
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