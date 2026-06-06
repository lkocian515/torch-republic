import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplet, X, Briefcase, MapPin, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const BENEFITS = [
  'Ready in seconds',
  'Just add hot water',
  'No coffee maker required',
  'No single-use coffee pods',
  'No filters or cleanup',
  'Travel friendly',
  'Office friendly',
  'Dorm friendly',
  'Consistent taste every cup',
];

const COMPARISON = [
  {
    label: 'Traditional Coffee',
    icon: '☕',
    negative: true,
    items: [
      { text: 'Requires equipment', check: false },
      { text: 'Requires cleanup', check: false },
      { text: 'Not travel friendly', check: false },
    ],
  },
  {
    label: 'Coffee Pods',
    icon: '💊',
    negative: true,
    items: [
      { text: 'Requires a machine', check: false },
      { text: 'Creates single-use waste', check: false },
      { text: 'Limited flexibility', check: false },
    ],
  },
  {
    label: 'Torch Republic',
    icon: '🔥',
    negative: false,
    highlight: true,
    items: [
      { text: 'Just add hot water', check: true },
      { text: 'No machine required', check: true },
      { text: 'No cleanup', check: true },
      { text: 'Portable anywhere', check: true },
      { text: 'Premium coffee + functional mushrooms', check: true },
    ],
  },
];

export default function InstantConvenienceSection() {
  return (
    <section
      style={{
        background: '#0B0B0B',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
      }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}
        >
          <div
            className="inline-flex items-center gap-3 mb-6 px-4 py-2"
            style={{ background: `${GOLD}0C`, border: `1px solid ${GOLD}25`, borderRadius: '2px' }}
          >
            <span className="font-mono text-[7px] tracking-[0.5em] uppercase" style={{ color: GOLD }}>
              Instant · Simple · Premium
            </span>
          </div>

          <h2
            className="font-serif font-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              color: '#F5EFE6',
              letterSpacing: '0.06em',
              lineHeight: 1.0,
            }}
          >
            NO PODS.
          </h2>
          <h2
            className="font-serif font-bold mb-3"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              color: '#F5EFE6',
              letterSpacing: '0.06em',
              lineHeight: 1.0,
            }}
          >
            NO MACHINE.
          </h2>
          <h2
            className="font-serif font-bold mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              color: RG,
              letterSpacing: '0.06em',
              lineHeight: 1.0,
            }}
          >
            NO MESS.
          </h2>

          <div style={{ height: '1px', maxWidth: '200px', margin: '0 auto 24px', background: `linear-gradient(90deg, transparent, ${GOLD}50, transparent)` }} />

          <p
            className="font-mono tracking-[0.3em] uppercase"
            style={{ fontSize: '0.65rem', color: `${GOLD}90`, letterSpacing: '0.28em' }}
          >
            Premium Coffee. Functional Mushrooms. Nothing Else Required.
          </p>
        </motion.div>

        {/* ── Two-column: Why Instant + Benefits list ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(28px, 5vw, 56px)',
            marginBottom: 'clamp(40px, 6vw, 64px)',
            alignItems: 'start',
          }}
        >
          {/* Left: Label + copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <p
              className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4"
              style={{ color: 'rgba(230,183,173,0.5)' }}
            >
              Why Instant Mushroom Coffee?
            </p>
            <p
              className="font-heading mb-8"
              style={{ fontSize: '0.95rem', color: 'rgba(210,195,175,0.7)', fontWeight: 300, lineHeight: 1.85 }}
            >
              Whether you're at home, in the office, traveling, camping, or starting your morning routine, Torch Republic delivers premium coffee and functional mushrooms in a simple, convenient format designed for modern life.
            </p>

            {/* Callout box */}
            <div
              style={{
                background: `${GOLD}08`,
                border: `1px solid ${GOLD}25`,
                borderRadius: '2px',
                padding: 'clamp(18px, 2.5vw, 24px)',
              }}
            >
              <p
                className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3"
                style={{ color: GOLD }}
              >
                Specialty Coffee. Instant Convenience.
              </p>
              <p
                className="font-heading text-sm"
                style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300, lineHeight: 1.75 }}
              >
                Torch Republic blends are crafted for people who want exceptional coffee quality without complicated brewing equipment. Simply add hot water and enjoy.
              </p>
            </div>
          </motion.div>

          {/* Right: Benefits checklist */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(230,183,173,0.1)',
              borderRadius: '3px',
              padding: 'clamp(20px, 3vw, 32px)',
            }}
          >
            <div className="space-y-0">
              {BENEFITS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center gap-3 py-3"
                  style={{ borderBottom: i < BENEFITS.length - 1 ? '1px solid rgba(230,183,173,0.06)' : 'none' }}
                >
                  <span style={{ color: RG, fontSize: '0.7rem', flexShrink: 0 }}>✓</span>
                  <span
                    className="font-heading text-sm"
                    style={{ color: 'rgba(247,241,232,0.72)', fontWeight: 300 }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Comparison Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p
            className="font-mono text-[8px] tracking-[0.4em] uppercase text-center mb-8"
            style={{ color: 'rgba(230,183,173,0.4)' }}
          >
            How It Compares
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '12px',
            }}
          >
            {COMPARISON.map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{
                  background: col.highlight
                    ? `linear-gradient(135deg, rgba(196,163,90,0.07) 0%, rgba(230,183,173,0.05) 100%)`
                    : 'rgba(255,255,255,0.012)',
                  border: col.highlight
                    ? `1px solid ${GOLD}35`
                    : '1px solid rgba(230,183,173,0.08)',
                  borderRadius: '3px',
                  padding: 'clamp(20px, 2.5vw, 28px)',
                  position: 'relative',
                }}
              >
                {col.highlight && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, ${GOLD}, ${RG}, transparent)`,
                    }}
                  />
                )}

                <div className="flex items-center gap-2 mb-4">
                  <span style={{ fontSize: '1.1rem' }}>{col.icon}</span>
                  <h3
                    className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold"
                    style={{ color: col.highlight ? GOLD : 'rgba(230,183,173,0.5)' }}
                  >
                    {col.label}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {col.items.map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      <span
                        style={{
                          fontSize: '0.6rem',
                          color: item.check ? RG : 'rgba(255,255,255,0.2)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {item.check ? '✓' : '✕'}
                      </span>
                      <span
                        className="font-heading text-sm"
                        style={{
                          color: item.check ? 'rgba(247,241,232,0.75)' : 'rgba(247,241,232,0.38)',
                          fontWeight: 300,
                          lineHeight: 1.5,
                        }}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
          style={{ marginTop: 'clamp(36px, 5vw, 56px)' }}
        >
          <Link
            to="/shop"
            className="inline-block font-mono text-[10px] tracking-[0.32em] uppercase px-10 py-4 transition-all hover:opacity-85 btn-glow"
            style={{ background: RG, color: '#040404', fontWeight: 700, borderRadius: '2px' }}
          >
            Shop Mushroom Coffee
          </Link>
        </motion.div>

      </div>
    </section>
  );
}