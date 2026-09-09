import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const GOLD = '#C4A35A';
const RG = '#E6B7AD';

const FEATURES = [
  'Medium Roast',
  'Single-Origin Papua New Guinea',
  'Freeze-Dried Instant Coffee',
  '27 Servings',
  '100% Arabica Coffee',
];

// Future Reserve products — framework ready for expansion
const COMING_SOON = ['Ember Reserve'];

export default function RepublicReserveSection() {
  const cartUrl = getShopifyCartUrl('torchbearer-premium-instant-coffee', 1);

  return (
    <>
      {/* ── TORCHBEARER FEATURE SECTION ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #08070500 0%, #0c0a06 15%, #0e0b07 50%, #0c0a06 85%, #08070500 100%)',
          borderTop: `1px solid ${GOLD}18`,
          borderBottom: `1px solid ${GOLD}10`,
        }}
      >
        {/* Cinematic ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,163,90,0.07) 0%, rgba(196,163,90,0.02) 40%, transparent 70%)`,
          }}
        />
        {/* Gold accent line */}
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}60 25%, ${RG}80 60%, ${GOLD}40 80%, transparent 100%)` }} />

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32 relative z-10">

          {/* Section Label */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-3 px-5 py-2 mb-6"
              style={{
                background: `${GOLD}0E`,
                border: `1px solid ${GOLD}30`,
                borderRadius: '2px',
              }}
            >
              <div style={{ width: '20px', height: '1px', background: `${GOLD}60` }} />
              <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: `${GOLD}CC` }}>
                Classic Instant Coffee
              </span>
              <div style={{ width: '20px', height: '1px', background: `${GOLD}60` }} />
            </div>
          </motion.div>

          {/* Main Product Layout — cinematic two-column */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: Product Image */}
            <motion.div
              className="relative flex items-center justify-center order-2 md:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Deep glow behind product */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${GOLD}12 0%, transparent 65%)`,
                  filter: 'blur(40px)',
                }}
              />
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png"
                alt="Torchbearer™ Premium Instant Coffee"
                className="relative z-10 w-full max-w-xs md:max-w-sm object-contain"
                style={{ filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(196,163,90,0.12))' }}
              />
            </motion.div>

            {/* Right: Copy + CTA */}
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Prestige badge */}
              <div
                className="inline-flex items-center gap-2 mb-6 px-3 py-1.5"
                style={{
                  background: `${GOLD}10`,
                  border: `1px solid ${GOLD}35`,
                  borderRadius: '2px',
                }}
              >
                <span className="font-mono text-[7px] tracking-[0.45em] uppercase" style={{ color: GOLD }}>
                  Premium Single-Origin · Papua New Guinea
                </span>
              </div>

              <h2
                className="font-serif font-bold mb-2"
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  color: '#F5EDE0',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}
              >
                Torchbearer™ Classic Coffee
              </h2>
              <p
                className="font-mono tracking-[0.3em] uppercase mb-8"
                style={{ fontSize: '0.72rem', color: GOLD, fontWeight: 500 }}
              >
                Premium Instant Coffee · 27 Servings
              </p>

              {/* Gold divider */}
              <div className="mb-8" style={{ height: '1px', background: `linear-gradient(90deg, ${GOLD}50 0%, transparent 70%)` }} />

              <p
                className="font-heading mb-8"
                style={{ fontSize: '0.95rem', color: 'rgba(240,230,210,0.7)', lineHeight: 1.85, maxWidth: '400px' }}
              >
                Pure, single-origin instant coffee sourced from the volcanic highlands of Papua New Guinea. 100% Arabica, freeze-dried to preserve flavor. Smooth, clean, and ready in seconds — no coffee maker needed.
              </p>

              {/* Feature points */}
              <div className="space-y-2 mb-10">
                {FEATURES.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span style={{ color: GOLD, fontSize: '0.6rem' }}>◆</span>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,230,210,0.65)' }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={cartUrl}
                  className="text-center font-mono text-[10px] tracking-[0.32em] uppercase px-8 py-4 transition-all hover:opacity-90"
                  style={{
                    background: GOLD,
                    color: '#0A0806',
                    fontWeight: 700,
                    borderRadius: '2px',
                  }}
                >
                  Shop Classic Coffee
                </a>
                <Link
                  to="/torchbearer"
                  className="text-center font-mono text-[10px] tracking-[0.28em] uppercase px-8 py-4 transition-all hover:opacity-80"
                  style={{
                    background: 'transparent',
                    color: GOLD,
                    fontWeight: 600,
                    borderRadius: '2px',
                    border: `1px solid ${GOLD}40`,
                  }}
                >
                  Learn More
                </Link>
              </div>

              {/* Price hint */}
              <p className="mt-5 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(196,163,90,0.4)' }}>
                $24.99 · 54g · 27 servings · Free shipping $50+
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom accent */}
        <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}25 50%, transparent 100%)` }} />
      </section>

      {/* ── NOT EVERY JOURNEY REQUIRES MUSHROOMS ── */}
      <section
        className="py-20 px-6 md:px-10"
        style={{ background: 'linear-gradient(180deg, #0a0806 0%, #0c0907 100%)', borderBottom: `1px solid ${GOLD}08` }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="font-serif font-bold mb-6"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: '#F5EDE0',
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Not Every Journey Requires Mushrooms
            </h3>
            <p
              className="font-heading mb-10"
              style={{ fontSize: '0.95rem', color: 'rgba(240,230,210,0.6)', lineHeight: 1.85 }}
            >
              For moments when simplicity is enough, Torchbearer delivers specialty instant coffee quality without functional mushrooms. Crafted from premium Papua New Guinea Arabica beans and freeze-dried to preserve flavor, it represents the pure coffee side of Torch Republic.
              <br /><br />
              Smooth and balanced with notes of toasted almond and sweet toffee. No coffee maker needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/torchbearer"
                className="font-mono text-[9px] tracking-[0.32em] uppercase px-8 py-3.5 transition-all hover:opacity-80"
                style={{
                  background: 'transparent',
                  color: GOLD,
                  fontWeight: 600,
                  borderRadius: '2px',
                  border: `1px solid ${GOLD}40`,
                }}
              >
                View Classic Coffee
              </Link>
            </div>

            {/* Coming soon teaser */}
            <div className="mt-14 pt-10" style={{ borderTop: `1px solid ${GOLD}12` }}>
              <p className="font-mono text-[7px] tracking-[0.45em] uppercase mb-5" style={{ color: `${GOLD}45` }}>
                More Releases Coming
              </p>
              <div className="flex items-center justify-center gap-6">
                {COMING_SOON.map((name) => (
                  <span
                    key={name}
                    className="font-mono text-[8px] tracking-[0.25em] uppercase px-3 py-1.5"
                    style={{
                      background: `${GOLD}08`,
                      border: `1px solid ${GOLD}18`,
                      color: `${GOLD}50`,
                      borderRadius: '2px',
                    }}
                  >
                    {name} — Coming Soon
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}