import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Coffee, Leaf, Zap, X } from 'lucide-react';

const RG   = '#E6B7AD';
const GOLD = '#C4A35A';

const HERO_IMG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/427ae26ea_ChatGPTImageJun4202611_14_26PM.png';

const TRUST = [
  { icon: Coffee, label: '100% Instant Coffee' },
  { icon: Leaf,   label: "Lion's Mane + Chaga" },
  { icon: Zap,    label: '27 Servings' },
  { icon: X,      label: 'No Coffee Maker Needed' },
];

export default function MushroomHero() {
  const scrollToRitual = (e) => {
    e.preventDefault();
    const el = document.getElementById('find-your-ritual');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
        {/* Subtle ambient glow behind image */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(30,80,180,0.10) 0%, transparent 70%)',
        }} />

        {/* Left text column */}
        <div style={{
          position: 'relative', zIndex: 2,
          flex: '0 0 52%', maxWidth: '52%',
          display: 'flex', alignItems: 'center',
          padding: 'clamp(48px,6vw,96px) clamp(32px,5vw,80px)',
          background: 'linear-gradient(100deg, #07080F 0%, #07080F 72%, rgba(7,8,15,0) 100%)',
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
                fontSize:'clamp(2.1rem,3.4vw,3.4rem)', color:'#F5EFE6',
                lineHeight:1.12, letterSpacing:'-0.02em', margin:'0 0 18px' }}
            >
              Instant Mushroom Coffee<br />
              <span style={{ color: RG }}>for Focus, Calm</span><br />
              <span style={{ color: RG }}>&amp; Daily Ritual</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
              style={{ fontFamily:'var(--font-heading)', fontWeight:300,
                fontSize:'clamp(0.88rem,1.1vw,1rem)', color:'rgba(210,195,175,0.78)',
                lineHeight:1.75, marginBottom:'32px', maxWidth:'420px' }}
            >
              Premium instant coffee blends with functional mushrooms — crafted for smooth coffee-forward taste and everyday wellness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.26 }}
              style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'20px' }}
            >
              <Link
                to="/shop"
                style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background: GOLD, color:'#040404',
                  fontFamily:'var(--font-mono)', fontSize:'0.62rem', letterSpacing:'0.22em',
                  textTransform:'uppercase', fontWeight:800,
                  padding:'14px 28px', textDecoration:'none',
                  border:`1px solid ${GOLD}`, transition:'opacity 0.2s',
                  whiteSpace:'nowrap',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity='0.82'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}
              >
                <ShoppingBag size={13} />
                Shop Blends
              </Link>

              <a
                href="#find-your-ritual" onClick={scrollToRitual}
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
                Find My Blend
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}
              style={{ fontFamily:'var(--font-mono)', fontSize:'0.55rem', letterSpacing:'0.18em',
                textTransform:'uppercase', color:'rgba(230,183,173,0.38)' }}
            >
              Start your ritual with 10% off — code{' '}
              <span style={{ color: RG, fontWeight:700 }}>WELCOME10</span>
            </motion.p>
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
            fetchpriority="high"
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
          MOBILE  — stacked layout (hidden on desktop)
      ───────────────────────────────────────────────────────────────── */}
      <div className="hero-mobile" style={{ display:'none' /* overridden below */ }}>

        {/* Text block */}
        <div style={{
          padding:'36px 24px 28px',
          background:'linear-gradient(180deg, #07080F 0%, #09090F 100%)',
        }}>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.44em',
              textTransform:'uppercase', color:'rgba(230,183,173,0.4)', marginBottom:'14px' }}
          >
            Torch Republic Coffee Company
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
            style={{ fontFamily:'var(--font-serif)', fontWeight:800,
              fontSize:'clamp(1.7rem,8vw,2.3rem)', color:'#F5EFE6',
              lineHeight:1.14, letterSpacing:'-0.01em', margin:'0 0 14px' }}
          >
            Instant Mushroom Coffee{' '}
            <span style={{ color: RG }}>for Focus, Calm &amp; Daily Ritual</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, delay: 0.14 }}
            style={{ fontFamily:'var(--font-heading)', fontWeight:300,
              fontSize:'0.9rem', color:'rgba(210,195,175,0.72)', lineHeight:1.72, marginBottom:'28px' }}
          >
            Premium instant coffee blends with functional mushrooms — crafted for smooth coffee-forward taste and everyday wellness.
          </motion.p>

          {/* Buttons — full width, stacked */}
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}
            style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'20px' }}
          >
            <Link
              to="/shop"
              style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                background: GOLD, color:'#040404',
                fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.22em',
                textTransform:'uppercase', fontWeight:800,
                padding:'16px 24px', textDecoration:'none',
                border:`1px solid ${GOLD}`,
              }}
            >
              <ShoppingBag size={14} />
              Shop Blends
            </Link>

            <a
              href="#find-your-ritual" onClick={scrollToRitual}
              style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                background:'transparent', border:'1px solid rgba(230,183,173,0.38)',
                color: RG,
                fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.22em',
                textTransform:'uppercase', fontWeight:700,
                padding:'16px 24px', textDecoration:'none', cursor:'pointer',
              }}
            >
              <Sparkles size={14} />
              Find My Blend
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.32 }}
            style={{ fontFamily:'var(--font-mono)', fontSize:'0.54rem', letterSpacing:'0.16em',
              textTransform:'uppercase', color:'rgba(230,183,173,0.38)', textAlign:'center' }}
          >
            10% off with code <span style={{ color: RG, fontWeight:700 }}>WELCOME10</span>
          </motion.p>
        </div>

        {/* Product image — below buttons, full bleed */}
        <div style={{ position:'relative', width:'100%', background:'#07080F' }}>
          <img
            src={HERO_IMG}
            alt="GlowMind Clarity mushroom coffee blend"
            fetchpriority="high"
            style={{
              width:'100%',
              aspectRatio:'4/3',
              objectFit:'cover',
              objectPosition:'center center',
              display:'block',
            }}
          />
          {/* Fade top edge */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:'32px', pointerEvents:'none',
            background:'linear-gradient(180deg, #09090F 0%, transparent 100%)',
          }} />
        </div>
      </div>

      {/* ── TRUST BAR ── */}
      <div style={{
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

      {/* Responsive show/hide + trust grid override */}
      <style>{`
        @media (min-width: 641px) {
          .hero-desktop { display: flex !important; }
          .hero-mobile  { display: none  !important; }
        }
        @media (max-width: 640px) {
          .hero-desktop { display: none  !important; }
          .hero-mobile  { display: block !important; }
          .trust-grid   { grid-template-columns: repeat(2,1fr) !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  );
}