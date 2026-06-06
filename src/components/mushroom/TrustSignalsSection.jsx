import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, MapPin, Shield, Package, Heart, Leaf } from 'lucide-react';

const RG = '#E6B7AD';
const WARM = 'rgba(240,232,220,0.72)';
const DIM  = 'rgba(240,232,220,0.38)';

const PILLARS = [
  {
    icon: FlaskConical,
    title: 'Third-Party Lab Tested',
    body: 'Every batch is independently tested for potency, purity, and heavy metals before it leaves our facility. You get the Certificate of Analysis — no guessing, no hiding.',
    badge: 'COA Available',
  },
  {
    icon: Leaf,
    title: "Dual-Extracted Mushrooms",
    body: "We use hot-water + alcohol dual extraction on every mushroom — the method that actually unlocks the active beta-glucans and terpenoids. 500mg per serving. Full-spectrum.",
    badge: 'Beta-Glucan Verified',
  },
  {
    icon: MapPin,
    title: 'Ethically Sourced Ingredients',
    body: "Our mushrooms are grown on their native substrate — wood for Lion's Mane, birch for Chaga — not grain. Our coffee is specialty-grade, direct-trade, single-origin.",
    badge: 'Direct Trade',
  },
  {
    icon: Package,
    title: 'Packaged in the USA',
    body: 'Blended, filled, and sealed in a certified U.S. facility. We hold ourselves to domestic food-grade manufacturing standards — because your morning ritual deserves it.',
    badge: 'Made in USA',
  },
  {
    icon: Shield,
    title: 'No Fillers. No Fluff.',
    body: 'Gluten-free, dairy-free, no artificial colors or preservatives. Our label tells you exactly what\'s inside. If it\'s not on the label, it\'s not in the tube.',
    badge: 'Clean Label',
  },
  {
    icon: Heart,
    title: 'A Note from Our Founder',
    body: '"I built Torch Republic because I wanted a morning ritual that actually supported how I wanted to feel — focused, calm, and grounded — without the anxiety of too much caffeine or the gimmicks of most wellness brands. Every blend is something I drink every day."',
    badge: '— Marcus, Founder',
    isQuote: true,
  },
];

export default function TrustSignalsSection() {
  return (
    <section
      style={{
        background: '#100F0D',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(230,183,173,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.48em',
            textTransform: 'uppercase', color: 'rgba(230,183,173,0.45)', marginBottom: '14px',
          }}>
            Our Standards
          </p>
          <h2 className="font-serif font-bold" style={{
            fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)',
            color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '14px',
          }}>
            You Deserve to Know What's in Your Cup
          </h2>
          <p className="font-heading" style={{
            fontSize: '0.95rem', color: DIM, fontWeight: 300, lineHeight: 1.8,
            maxWidth: '520px', margin: '0 auto',
          }}>
            Transparency isn't a feature for us — it's the foundation. Here's exactly how we source, test, and stand behind every blend.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1px',
          background: 'rgba(230,183,173,0.08)',
          border: '1px solid rgba(230,183,173,0.08)',
        }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                background: '#100F0D',
                padding: 'clamp(24px, 3vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {/* Icon + badge row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: 'rgba(230,183,173,0.07)',
                  border: '1px solid rgba(230,183,173,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <p.icon size={16} style={{ color: RG }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: RG,
                  border: '1px solid rgba(230,183,173,0.25)',
                  padding: '3px 8px', whiteSpace: 'nowrap',
                }}>
                  {p.badge}
                </span>
              </div>

              <h3 className="font-serif font-bold" style={{
                fontSize: '1.05rem', color: '#F5EFE6', lineHeight: 1.3, margin: 0,
              }}>
                {p.title}
              </h3>

              <p className="font-heading" style={{
                fontSize: '0.87rem',
                color: p.isQuote ? 'rgba(240,232,220,0.6)' : DIM,
                fontWeight: 300, lineHeight: 1.75, margin: 0,
                fontStyle: p.isQuote ? 'italic' : 'normal',
              }}>
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* COA download CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ textAlign: 'center', marginTop: 'clamp(32px, 4vw, 48px)' }}
        >
          <a
            href="mailto:hello@torchrepublic.com?subject=COA Request"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: RG, border: '1px solid rgba(230,183,173,0.3)',
              padding: '12px 28px', textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = RG; e.currentTarget.style.background = 'rgba(230,183,173,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(230,183,173,0.3)'; e.currentTarget.style.background = 'transparent'; }}
          >
            Request a Certificate of Analysis →
          </a>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
            textTransform: 'uppercase', color: DIM, marginTop: '12px',
          }}>
            We respond within 1 business day
          </p>
        </motion.div>
      </div>
    </section>
  );
}