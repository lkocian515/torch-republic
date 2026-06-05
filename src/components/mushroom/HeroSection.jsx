import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Coffee, Leaf, Zap, X } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';
const GOLD = '#C4A35A';

// GlowMind Clarity hero image — used as background only
const HERO_BG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/427ae26ea_ChatGPTImageJun4202611_14_26PM.png';

const TRUST_ITEMS = [
  { icon: Coffee,   label: '100% Instant Coffee' },
  { icon: Leaf,     label: "Lion's Mane + Chaga" },
  { icon: Zap,      label: '27 Servings' },
  { icon: X,        label: 'No Coffee Maker Needed' },
];

export default function MushroomHero() {
  const scrollToRitual = (e) => {
    e.preventDefault();
    const el = document.getElementById('find-your-ritual');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>

      {/* ── HERO BANNER ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 'clamp(420px, 55vw, 680px)',
          background: '#07080F',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
        className="hero-banner"
      >
        {/* Background image */}
        <img
          src={HERO_BG}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center right',
            display: 'block',
            zIndex: 0,
          }}
        />

        {/* Dark gradient overlay — left side heavier so text is readable */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(100deg, rgba(5,6,14,0.96) 0%, rgba(5,6,14,0.82) 38%, rgba(5,6,14,0.35) 62%, rgba(5,6,14,0.1) 100%)',
        }} />

        {/* Content — left-aligned text over the gradient */}
        <div
          style={{
            position: 'relative', zIndex: 2,
            width: '100%', maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(40px, 6vw, 80px) clamp(20px, 6vw, 80px)',
          }}
        >
          <div style={{ maxWidth: '520px' }}>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.5)',
                marginBottom: '18px',
              }}
            >
              Torch Republic Coffee Company
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 3.6vw, 3.6rem)',
                color: '#F5EFE6',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                margin: '0 0 18px',
              }}
            >
              Instant Mushroom Coffee
              <br />
              <span style={{ color: RG }}>for Focus, Calm</span>
              <br />
              <span style={{ color: RG }}>&amp; Daily Ritual</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
                color: 'rgba(210,195,175,0.82)',
                lineHeight: 1.72,
                fontWeight: 300,
                marginBottom: '32px',
                maxWidth: '420px',
              }}
            >
              Premium instant coffee blends with functional mushrooms — crafted for smooth coffee-forward taste and everyday wellness.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '22px' }}
            >
              <Link
                to="/shop"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: GOLD,
                  color: '#040404',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  padding: '14px 30px',
                  textDecoration: 'none',
                  border: `1px solid ${GOLD}`,
                  transition: 'background 0.2s, opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <ShoppingBag size={13} />
                Shop Blends
              </Link>

              <a
                href="#find-your-ritual"
                onClick={scrollToRitual}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(230,183,173,0.35)',
                  color: RG,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '14px 30px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(230,183,173,0.08)'; e.currentTarget.style.borderColor = 'rgba(230,183,173,0.65)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor = 'rgba(230,183,173,0.35)'; }}
              >
                <Sparkles size={13} />
                Find My Blend
              </a>
            </motion.div>

            {/* Promo line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.42 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.56rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.42)',
              }}
            >
              Start your ritual with 10% off — code{' '}
              <span style={{ color: RG, fontWeight: 700 }}>WELCOME10</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: '16px 24px',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}
          className="trust-bar-inner"
        >
          {TRUST_ITEMS.map((item, i) => (
            <React.Fragment key={item.label}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 20px',
              }}>
                <item.icon size={14} style={{ color: RG, flexShrink: 0 }} />
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,235,225,0.6)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              </div>
              {i < TRUST_ITEMS.length - 1 && (
                <div style={{ width: '1px', height: '16px', background: 'rgba(230,183,173,0.12)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 640px) {
          .hero-banner {
            min-height: 520px !important;
            align-items: flex-end !important;
          }
          .hero-banner img {
            object-position: 70% center !important;
          }
          .hero-banner > div:first-child {
            background: linear-gradient(180deg, rgba(5,6,14,0.55) 0%, rgba(5,6,14,0.97) 52%, rgba(5,6,14,1) 100%) !important;
          }
          .trust-bar-inner {
            gap: 4px !important;
          }
        }
      `}</style>
    </section>
  );
}