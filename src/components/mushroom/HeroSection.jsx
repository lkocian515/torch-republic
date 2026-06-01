import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERO_IMAGE } from '../../lib/mushroomProducts';
import { ShoppingCart, Calendar } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

// Clean product-only image (no baked-in text)
const CLEAN_DESKTOP_BG = HERO_IMAGE;

// Mobile hero image
const MOBILE_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f2e57ca1e_LIVEFREESTAYREADY15x5in.png';

const TRUST_ITEMS = [
  { icon: '🍄', label: "Lion's Mane + Chaga" },
  { icon: '⚡', label: '100% Instant Coffee' },
  { icon: '☕', label: '27 Servings' },
  { icon: '✦', label: 'No Coffee Maker Needed' },
];

// ─── MOBILE HERO ──────────────────────────────────────────────────────────────
// Only shown on screens ≤768px. Uses baked-in image with transparent link overlays.
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
        overflow: 'hidden',
      }}
      className="mobile-hero"
    >
      {/* Heading image */}
      <img
        src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0dc59d3b3_generated_image.png"
        alt="Instant Mushroom Coffee for Focus, Flow & Daily Ritual"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />

      {/* Wide banner — crop to center on mobile using fixed height + object-position */}
      <div style={{ width: '100%', height: '52vw', minHeight: '200px', maxHeight: '340px', overflow: 'hidden' }}>
        <img
          src={MOBILE_BG}
          alt="Torch Republic instant mushroom coffee — six Lion's Mane and Chaga blends."
          fetchpriority="high"
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center center' }}
        />
      </div>
      {/* Subtitle + Trust bar — mobile */}
      <div style={{ background: '#06050A', padding: '28px 20px 8px', textAlign: 'center' }}>
        <p style={{
          fontSize: '1.05rem', color: 'rgba(200,184,166,0.85)',
          lineHeight: 1.75, fontWeight: 300, fontFamily: 'var(--font-heading)',
          marginBottom: '28px',
        }}>
          Premium coffee blended with <span style={{ color: RG }}>Lion's Mane + Chaga</span>, crafted for smoother mornings, clearer routines, and a little everyday magic — without the mess of brewing.
        </p>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
          border: '1px solid rgba(230,183,173,0.12)', borderRadius: '12px',
          background: 'rgba(0,0,0,0.3)', marginBottom: '24px', overflow: 'hidden',
        }}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              padding: '16px 8px',
              borderRight: i % 2 === 0 ? '1px solid rgba(230,183,173,0.12)' : 'none',
              borderBottom: i < 2 ? '1px solid rgba(230,183,173,0.12)' : 'none',
            }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.52rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.65)', textAlign: 'center', lineHeight: 1.5,
              }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons below image on mobile */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '12px',
        padding: '0 20px 28px', background: '#06050A', alignItems: 'center',
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
      {/* Heading image above banner */}
      <img
        src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0dc59d3b3_generated_image.png"
        alt="Instant Mushroom Coffee for Focus, Flow & Daily Ritual"
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />

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