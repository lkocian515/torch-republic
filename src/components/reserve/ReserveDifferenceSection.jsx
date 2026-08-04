import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const GOLD = '#C4A35A';
const RG = '#E6B7AD';

const PERKS = [
  'Just add hot water — no equipment',
  'Freeze-dried to preserve full flavor',
  'Portable — fits in any bag or pocket',
  'Consistent cup quality every time',
  'Single-origin Papua New Guinea Arabica',
];

export default function ReserveDifferenceSection() {
  const cartUrl = getShopifyCartUrl('torchbearer-premium-instant-coffee', 1);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0c0907 0%, #0a0806 100%)',
        borderTop: `1px solid ${GOLD}18`,
        borderBottom: `1px solid ${GOLD}10`,
        padding: 'clamp(56px, 7vw, 88px) 24px',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,163,90,0.06) 0%, transparent 70%)` }}
      />

      {/* Gold accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}60 30%, ${RG}70 65%, transparent 100%)` }} />

      <div className="max-w-[1000px] mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 'clamp(36px, 5vw, 56px)' }}
        >
          <div
            className="inline-flex items-center gap-3 mb-6 px-4 py-2"
            style={{ background: `${GOLD}0C`, border: `1px solid ${GOLD}28`, borderRadius: '2px' }}
          >
            <div style={{ width: '16px', height: '1px', background: `${GOLD}60` }} />
            <span className="font-mono text-[7px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
              Classic Instant Coffee
            </span>
            <div style={{ width: '16px', height: '1px', background: `${GOLD}60` }} />
          </div>

          <h2
            className="font-serif font-bold mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#F5EDE0',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Why Instant Coffee<br />Done Right
          </h2>

          <div style={{ height: '1px', maxWidth: '160px', margin: '0 auto 24px', background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(28px, 5vw, 56px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Quote block + perks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {/* Quote */}
            <blockquote
              className="font-heading mb-8"
              style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                color: 'rgba(240,230,210,0.75)',
                fontWeight: 300,
                lineHeight: 1.9,
                paddingLeft: '20px',
                borderLeft: `2px solid ${GOLD}50`,
              }}
            >
              For those moments when simplicity is enough. Torchbearer delivers premium Papua New Guinea Arabica coffee in an instant format designed for exceptional flavor, effortless preparation, and everyday ritual.
            </blockquote>

            {/* Perks */}
            <div className="space-y-0">
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-3 py-2.5"
                  style={{ borderBottom: i < PERKS.length - 1 ? `1px solid ${GOLD}10` : 'none' }}
                >
                  <span style={{ color: GOLD, fontSize: '0.6rem', flexShrink: 0 }}>◆</span>
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,230,210,0.65)', fontWeight: 300 }}>
                    {perk}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Callout card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, rgba(196,163,90,0.06) 0%, rgba(14,11,7,0.95) 100%)`,
                border: `1px solid ${GOLD}30`,
                borderRadius: '3px',
                padding: 'clamp(24px, 3.5vw, 40px)',
              }}
            >
              <div
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5"
                style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30`, borderRadius: '2px' }}
              >
                <span className="font-mono text-[7px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>
                  Specialty Coffee · Instant Format
                </span>
              </div>

              <h3
                className="font-serif font-bold mb-3"
                style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EDE0', letterSpacing: '-0.01em', lineHeight: 1.1 }}
              >
                Torchbearer™
              </h3>
              <p
                className="font-mono tracking-[0.3em] uppercase mb-6"
                style={{ fontSize: '0.7rem', color: GOLD, fontWeight: 500 }}
              >
                Classic Coffee · Single-Origin
              </p>

              <p
                className="font-heading text-sm mb-8"
                style={{ color: 'rgba(240,230,210,0.6)', fontWeight: 300, lineHeight: 1.8 }}
              >
                Papua New Guinea single-origin Arabica. Freeze-dried to preserve character. Ready in seconds — just add hot water.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href={cartUrl}
                  className="text-center font-mono text-[9px] tracking-[0.3em] uppercase py-3.5 transition-all hover:opacity-90 btn-glow"
                  style={{ background: GOLD, color: '#0A0806', fontWeight: 700, borderRadius: '2px' }}
                >
                  Shop Torchbearer
                </a>
                <Link
                  to="/torchbearer"
                  className="text-center font-mono text-[9px] tracking-[0.28em] uppercase py-3.5 transition-all hover:opacity-75"
                  style={{
                    background: 'transparent',
                    color: GOLD,
                    border: `1px solid ${GOLD}35`,
                    borderRadius: '2px',
                    fontWeight: 600,
                  }}
                >
                  Learn More
                </Link>
              </div>

              <p
                className="font-mono text-[7px] tracking-[0.15em] uppercase text-center mt-5"
                style={{ color: `${GOLD}35` }}
              >
                $24.99 · 27 servings · Free shipping $50+
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}