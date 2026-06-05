import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';
const RG_DEEP = '#C98F86';

// The beautiful single-product lifestyle image uploaded by the user
const HERO_IMG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/d68634ad3_13_135fd8bf-00d4-48a1-953e-67d5361790db.png';

export default function MushroomHero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#0D0D0D',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      {/* ── Two-column layout on desktop, stacked on mobile ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 'clamp(480px, 60vh, 700px)',
          alignItems: 'center',
        }}
        className="hero-grid"
      >

        {/* ── LEFT: Copy ── */}
        <div style={{ padding: 'clamp(48px, 8vw, 88px) clamp(28px, 5vw, 72px) clamp(48px, 8vw, 88px) clamp(24px, 6vw, 80px)', zIndex: 2 }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.54rem',
              letterSpacing: '0.52em',
              textTransform: 'uppercase',
              color: 'rgba(230,183,173,0.5)',
              marginBottom: '20px',
            }}
          >
            Torch Republic Coffee Company
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 3.4vw, 3.4rem)',
              color: '#F5EFE6',
              lineHeight: 1.13,
              letterSpacing: '-0.02em',
              margin: '0 0 20px',
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
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.88rem, 1.2vw, 1.05rem)',
              color: 'rgba(200,184,166,0.78)',
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: '420px',
              marginBottom: '36px',
            }}
          >
            Premium instant coffee blends with functional mushrooms — crafted for smooth coffee-forward taste and everyday wellness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}
          >
            <Link
              to="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                background: RG, color: '#050505',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 32px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <ShoppingBag size={14} />
              Shop Blends
            </Link>
            <Link
              to="/blends"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '9px',
                border: '1px solid rgba(230,183,173,0.32)',
                color: RG_DEEP,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '14px 32px',
                background: 'rgba(0,0,0,0.28)',
                textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(230,183,173,0.6)'; e.currentTarget.style.background = 'rgba(230,183,173,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(230,183,173,0.32)'; e.currentTarget.style.background = 'rgba(0,0,0,0.28)'; }}
            >
              <Sparkles size={13} />
              Find My Blend
            </Link>
          </motion.div>

          {/* Promo line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.57rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(230,183,173,0.42)',
            }}
          >
            Use code{' '}
            <span style={{ color: RG, fontWeight: 700 }}>WELCOME10</span>
            {' '}for 10% off your first order.
          </motion.p>
        </div>

        {/* ── RIGHT: Product image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          style={{ position: 'relative', height: '100%', overflow: 'hidden' }}
          className="hero-image-col"
        >
          {/* Subtle left-edge fade so image blends into the copy side */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to right, #0D0D0D 0%, transparent 18%)',
          }} />
          <img
            src={HERO_IMG}
            alt="SunCap Rise — Torch Republic instant mushroom coffee with a warm steaming cup"
            fetchpriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
            }}
          />
        </motion.div>
      </div>

      {/* ── Mobile layout (stacked) ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .hero-image-col {
            height: 260px !important;
            order: -1;
          }
          .hero-image-col > div:first-child {
            background: linear-gradient(to bottom, #0D0D0D 0%, transparent 30%) !important;
          }
        }
      `}</style>
    </section>
  );
}