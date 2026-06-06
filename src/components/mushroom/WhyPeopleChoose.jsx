import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, Leaf, Coffee, Clock, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';

const BENEFITS = [
  {
    icon: Brain,
    title: 'Functional Mushroom Support',
    description: "Lion's Mane is traditionally associated with focus and mental clarity. Chaga is known for antioxidant support. Each blend delivers a meaningful dose — not a trace — of organic dual-extracted mushrooms.",
    accent: '#E6B7AD',
  },
  {
    icon: Zap,
    title: 'Clean Energy, No Crash',
    description: 'Premium instant coffee paired with adaptogenic mushrooms for smooth, balanced energy throughout your day — without the jitters or afternoon slump of a standard cup.',
    accent: '#D6B27A',
  },
  {
    icon: Leaf,
    title: 'Transparent Ingredients',
    description: '500mg of organic dual-extracted mushroom blend per serving — clearly labeled, no proprietary blend hiding. You know exactly what you\'re getting in every cup.',
    accent: '#C98F86',
  },
  {
    icon: Coffee,
    title: 'Tastes Like Premium Coffee',
    description: 'Rich, smooth, and genuinely delicious. The mushrooms are completely undetectable. You get all the benefits with none of the compromise — just great coffee.',
    accent: '#E6B7AD',
  },
  {
    icon: Clock,
    title: 'Ready in 30 Seconds',
    description: 'No machine. No pods. No mess. Just hot water and 27 servings of your daily ritual in every compact tube. Perfect for home, travel, or the office.',
    accent: '#D6B27A',
  },
  {
    icon: CheckCircle,
    title: 'Uncompromisingly Clean',
    description: 'Gluten-free. Dairy-free. No artificial colors, flavors, or preservatives. Just the ingredients your body deserves — nothing it doesn\'t.',
    accent: '#C98F86',
  },
];

export default function WhyPeopleChoose() {
  return (
    <section
      style={{
        background: '#0D0D0D',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div style={{
        position: 'absolute', top: 0, left: '25%', right: '25%', height: '200px',
        background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(230,183,173,0.06) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div className="max-w-[1100px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(36px, 5vw, 52px)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.45em',
              textTransform: 'uppercase', color: 'rgba(230,183,173,0.5)', marginBottom: '14px',
            }}
          >
            Why Torch Republic
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              color: '#F5EFE6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            A Better Cup. Every Single Morning.
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem', color: 'rgba(210,195,175,0.65)',
              fontWeight: 300, lineHeight: 1.75, maxWidth: '560px', margin: '0 auto',
            }}
          >
            Coffee-forward, smooth, and easy to drink — with subtle earthy depth from functional mushrooms. Designed for people who want daily wellness support without giving up the comfort of a real coffee ritual.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: 'clamp(18px, 2.5vw, 24px)',
                background: 'rgba(255,255,255,0.015)',
                border: `1px solid ${benefit.accent}18`,
                borderRadius: '3px',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${benefit.accent}38`}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${benefit.accent}18`}
            >
              <div
                style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: `${benefit.accent}10`,
                  border: `1px solid ${benefit.accent}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: '2px',
                }}
              >
                <benefit.icon size={17} style={{ color: benefit.accent }} />
              </div>
              <div>
                <h3
                  className="font-serif font-bold"
                  style={{ fontSize: '1.05rem', color: '#F5EFE6', marginBottom: '8px', lineHeight: 1.3 }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="font-heading"
                  style={{ fontSize: '0.87rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}
                >
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <Link
            to="/shop"
            style={{
              display: 'inline-block',
              background: RG, color: '#040404',
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              fontWeight: 700, padding: '14px 36px',
              textDecoration: 'none', borderRadius: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Shop All Blends
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(230,183,173,0.38)',
              marginTop: '14px',
            }}
          >
            30-Day First Cup Guarantee · Free shipping over $75
          </p>
        </motion.div>
      </div>
    </section>
  );
}