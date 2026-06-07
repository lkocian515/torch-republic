import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Coffee, Leaf, Zap, X } from 'lucide-react';

const RG   = '#E6B7AD';

const PROMO_MESSAGES = [
  'One-time: 10% off code WELCOME10',
  'Get 20% off subscriptions — Code SUBSCRIBE20',
  'FREE SHIPPING on orders over $75',
];

const HERO_IMG        = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';
const HERO_IMG_MOBILE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

const TRUST = [
  { icon: Zap,    label: 'Ready in Seconds' },
  { icon: X,      label: 'No Machine Needed' },
  { icon: Coffee, label: 'Instant Powder' },
  { icon: Leaf,   label: 'Crafted for Daily Ritual' },
];

export default function MushroomHero() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const scrollToRitual = (e) => {
    e.preventDefault();
    const el = document.getElementById('find-your-ritual');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Rotate promo messages every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex(prev => (prev + 1) % PROMO_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ background: '#07080F', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>

      {/* ─────────────────────────────────────────────────────────────────
          DESKTOP  — two-column, image right (hidden on mobile)
      ───────────────────────────────────────────────────────────────── */}
      <div className="hero-desktop" style={{
        display: 'none', /* overridden by media query below */
        position: 'relative',
        width: '100%',
        minHeight: '600px',
        maxHeight: '720px',
        overflow: 'hidden',
        alignItems: 'stretch',
      }}>
        {/* Atmospheric teal-navy-champagne ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 90% at 75% 50%, rgba(11,45,42,0.22) 0%, rgba(8,16,26,0.18) 45%, transparent 75%)',
        }} />
        {/* Warm champagne glow — top right */}
        <div style={{
          position: 'absolute', top: '-20%', right: 0, width: '40%', height: '60%', zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 80% 20%, rgba(196,163,90,0.07) 0%, transparent 70%)',
        }} />

        {/* Left text column */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 52%', maxWidth: '52%',
          display: 'flex', alignItems: 'center',
          padding: 'clamp(48px,6vw,96px) clamp(32px,5vw,80px)',
          background: 'linear-gradient(100deg, #100F0D 0%, #100F0D 72%, rgba(16,15,13,0) 100%)',
        }}>
          <div style={{ maxWidth: '500px' }}>
            <motion.p
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:'0.52rem', letterSpacing:'0.48em',
                textTransform:'uppercase', color:'rgba(230,183,173,0.45)', marginBottom:'16px' }}
            >
              Torch Republic Coffee Company
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.07 }}
              style={{ fontFamily:'var(--font-serif)', fontWeight:800,
                fontSize:'clamp(2.1rem,3.4vw,3.2rem)', color:'#F5EFE6',
                lineHeight:1.12, letterSpacing:'-0.02em', margin:'0 0 18px' }}
            >
              Instant Coffee + Matcha<br />
              <span style={{ color: RG }}>for Clarity, Calm</span><br />
              <span style={{ color: RG }}>&amp; Clean Energy</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              style={{ fontFamily:'var(--font-heading)', fontWeight:300,
                fontSize:'clamp(0.88rem,1.1vw,1rem)', color:'rgba(210,195,175,0.78)',
                lineHeight:1.75, marginBottom:'32px', maxWidth:'420px' }}
            >
              Premium instant coffees, functional mushroom blends, and matcha rituals crafted for focus, balance, and everyday self-mastery — ready in seconds. No machine needed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.26 }}
              style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'20px' }}
            >
              <Link
                to="/shop"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background: RG, color:'#040404',
                  fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.22em',
                  textTransform:'uppercase', fontWeight:800,
                  padding:'14px 28px', textDecoration:'none',
                  border:`1px solid ${RG}`, transition:'opacity 0.2s',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity='0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}
              >
                <ShoppingBag size={13} />
                Shop the Rituals
              </Link>

              <Link
                to="/how-it-works"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background:'rgba(0,0,0,0.4)', border:'1px solid rgba(230,183,173,0.32)',
                  color: RG,
                  fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.22em',
                  textTransform:'uppercase', fontWeight:700,
                  padding:'14px 28px', textDecoration:'none',
                  transition:'background 0.2s, border-color 0.2s',
                  whiteSpace:'nowrap', cursor:'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(230,183,173,0.08)'; e.currentTarget.style.borderColor='rgba(230,183,173,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(0,0,0,0.4)'; e.currentTarget.style.borderColor='rgba(230,183,173,0.32)'; }}
              >
                <Sparkles size={13} />
                How It Works
              </Link>
            </motion.div>

            <div style={{ 
              fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.18em',
              textTransform:'uppercase', color:'rgba(230,183,173,0.38)',
              height: '20px', overflow: 'hidden',
            }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPromoIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ margin: 0 }}
                >
                  {PROMO_MESSAGES[currentPromoIndex].split('WELCOME10')[0]}
                  {PROMO_MESSAGES[currentPromoIndex].includes('WELCOME10') && (
                    <span style={{ color: RG, fontWeight:700 }}>WELCOME10</span>
                  )}
                  {PROMO_MESSAGES[currentPromoIndex].split('WELCOME10')[1] || 
                   PROMO_MESSAGES[currentPromoIndex].split('SUBSCRIBE20')[0]}
                  {PROMO_MESSAGES[currentPromoIndex].includes('SUBSCRIBE20') && (
                    <span style={{ color: RG, fontWeight:700 }}>SUBSCRIBE20</span>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right image column */}
        <div style={{
          flex: '0 0 48%', maxWidth: '48%',
          position: 'relative', overflow: 'hidden',
        }}>
          <img
            src={HERO_IMG}
            alt="GlowMind Clarity mushroom coffee blend"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            style={{
              width:'100%', height:'100%',
              objectFit:'cover', objectPosition:'center center',
              display:'block',
            }}
          />
          {/* Fade left edge to blend into text column */}
          <div style={{
            position:'absolute', top:0, left:0, bottom:0, width:'30%', zIndex:1, pointerEvents:'none',
            background:'linear-gradient(90deg, #07080F 0%, transparent 100%)',
          }} />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          MOBILE  — editorial stacked layout (hidden on desktop)
      ───────────────────────────────────────────────────────────────── */}
      <div className="hero-mobile" style={{ display:'none', background:'#07080F' }}>

        {/* Product image — FIRST, right under the menu */}
        <div style={{ position: 'relative', width: '100%', background: '#06070D', aspectRatio: '1 / 1', overflow: 'hidden' }}>
          <img
            src={HERO_IMG_MOBILE}
            alt="Torch Republic mushroom coffee collection"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
          {/* Fade bottom edge to blend into text block */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(0deg, #08090F 0%, transparent 100%)',
          }} />
        </div>

        {/* ── Text content block ── */}
        <div style={{
          padding: '28px 24px 36px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #08090F 0%, #06070D 100%)',
        }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.46em',
              textTransform: 'uppercase', color: 'rgba(230,183,173,0.5)',
              marginBottom: '14px',
            }}
          >
            Torch Republic Coffee Company
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.07 }}
            style={{
              fontFamily: 'var(--font-serif)', fontWeight: 800,
              fontSize: 'clamp(1.9rem, 9vw, 2.6rem)', color: '#F5EFE6',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              margin: '0 0 16px',
            }}
          >
            Instant Coffee + Matcha<br />
            <span style={{ color: RG }}>for Clarity, Calm &amp; Clean Energy</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)', fontWeight: 300,
              fontSize: '0.9rem', color: 'rgba(210,195,175,0.7)',
              lineHeight: 1.75, marginBottom: '32px',
              maxWidth: '320px', margin: '0 auto 32px',
            }}
          >
            Premium instant coffees, mushroom blends, and matcha for focus, balance, and everyday ritual — ready in seconds. No machine needed.
          </motion.p>

          {/* CTA Buttons — side by side */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.24 }}
            style={{ display: 'flex', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}
          >
            <Link
              to="/shop"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                flex: '1', maxWidth: '160px',
                background: RG, color: '#040404',
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 800,
                padding: '15px 12px', textDecoration: 'none',
                border: `1px solid ${RG}`,
              }}
            >
              <ShoppingBag size={13} />
              Shop Rituals
            </Link>

            <Link
              to="/how-it-works"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                flex: '1', maxWidth: '160px',
                background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(230,183,173,0.35)',
                color: RG,
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', fontWeight: 700,
                padding: '15px 12px', textDecoration: 'none', cursor: 'pointer',
              }}
            >
              <Sparkles size={13} />
              How It Works
            </Link>
          </motion.div>

          {/* Trust icons — 2×2 grid */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.34 }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '0',
              maxWidth: '320px', margin: '0 auto 24px',
              border: '1px solid rgba(230,183,173,0.1)',
            }}
          >
            {TRUST.map((item, i) => (
              <div key={item.label} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                padding: '14px 10px',
                borderRight: i % 2 === 0 ? '1px solid rgba(230,183,173,0.1)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(230,183,173,0.1)' : 'none',
              }}>
                <item.icon size={18} style={{ color: RG }} />
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'rgba(240,235,225,0.55)',
                  textAlign: 'center', lineHeight: 1.5,
                }}>
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Promo line - rotating carousel */}
          <div style={{ 
            fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(230,183,173,0.36)',
            height: '20px', overflow: 'hidden',
          }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPromoIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ margin: 0 }}
              >
                {PROMO_MESSAGES[currentPromoIndex].split('WELCOME10')[0]}
                {PROMO_MESSAGES[currentPromoIndex].includes('WELCOME10') && (
                  <span style={{ color: RG, fontWeight: 700 }}>WELCOME10</span>
                )}
                {PROMO_MESSAGES[currentPromoIndex].split('WELCOME10')[1] || 
                 PROMO_MESSAGES[currentPromoIndex].split('SUBSCRIBE20')[0]}
                {PROMO_MESSAGES[currentPromoIndex].includes('SUBSCRIBE20') && (
                  <span style={{ color: RG, fontWeight: 700 }}>SUBSCRIBE20</span>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── TRUST BAR — desktop only ── */}
      <div className="trust-bar-desktop" style={{
        background:'#0A0A0A',
        borderTop:'1px solid rgba(230,183,173,0.07)',
        borderBottom:'1px solid rgba(230,183,173,0.07)',
        padding:'14px 20px',
      }}>
        <div className="trust-grid" style={{
          maxWidth:'920px', margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'repeat(4,1fr)',
          gap:'4px',
          alignItems:'center',
        }}>
          {TRUST.map((item) => (
            <div key={item.label} style={{
              display:'flex', alignItems:'center', justifyContent:'center', gap:'7px',
              padding:'7px 8px',
            }}>
              <item.icon size={14} style={{ color: RG, flexShrink:0 }} />
              <span style={{
                fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.15em',
                textTransform:'uppercase', color:'rgba(240,235,225,0.55)',
                whiteSpace:'nowrap',
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive show/hide */}
      <style>{`
        @media (min-width: 641px) {
          .hero-desktop      { display: flex  !important; }
          .hero-mobile       { display: none  !important; }
          .trust-bar-desktop { display: block !important; }
        }
        @media (max-width: 640px) {
          .hero-desktop      { display: none  !important; }
          .hero-mobile       { display: block !important; }
          .trust-bar-desktop { display: none  !important; }
        }
      `}</style>
    </section>
  );
}