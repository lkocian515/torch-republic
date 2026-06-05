import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

export default function FounderSection() {
  return (
    <section className="px-5 md:px-10 py-14 md:py-20" style={{ background: '#141414', position: 'relative', overflow: 'hidden' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      {/* Subtle warm glow */}
      <div style={{
        position: 'absolute', top: 0, left: '20%', right: '20%', height: '200px', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,163,90,0.07) 0%, transparent 100%)',
      }} />

      <div className="max-w-[820px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center"
        >
          {/* Eyebrow */}
          <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-5"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            From the Founder
          </p>

          {/* Decorative divider */}
          <div className="mx-auto mb-8" style={{ width: '48px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />

          {/* Quote */}
          <blockquote
            className="font-serif font-bold mb-8 text-center"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              color: '#F5EFE6',
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            "Your daily coffee can be more than a habit —{' '}
            <span style={{ color: RG }}>it can be a ritual for clarity, energy, and self-mastery.</span>"
          </blockquote>

          {/* Founder copy */}
          <p className="font-heading mx-auto mb-8"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(240,235,225,0.58)',
              lineHeight: 1.9,
              fontWeight: 300,
              maxWidth: '600px',
            }}>
            Founded by Lisa Kocian, Torch Republic was created for people who want their daily coffee to feel more intentional — a small ritual for clarity, energy, and self-mastery. Each blend is crafted to support a different part of your day, your focus, and your wellbeing.
          </p>

          {/* Attribution */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RG }}>
              Lisa Kocian
            </span>
            <span className="font-mono text-[7.5px] tracking-[0.28em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Founder · Torch Republic Coffee Company
            </span>
          </div>

          {/* Decorative divider */}
          <div className="mx-auto mb-8" style={{ width: '48px', height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}60, transparent)` }} />

          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
            style={{ color: 'rgba(230,183,173,0.65)', borderBottom: '1px solid rgba(230,183,173,0.25)', paddingBottom: '2px' }}
          >
            Our Story →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}