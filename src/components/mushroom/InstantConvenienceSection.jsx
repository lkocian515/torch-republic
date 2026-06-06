import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, X, Droplet } from 'lucide-react';

const GOLD = '#C4A35A';
const RG = '#E6B7AD';

const BENEFITS = [
  'Ready in seconds',
  'Just add hot water',
  'No coffee maker required',
  'No single-use coffee pods',
  'No filters or cleanup',
  'Travel friendly',
  'Office friendly',
  'Consistent taste every cup',
];

const COMPARE = [
  {
    label: 'Traditional Coffee',
    items: [
      { text: 'Requires equipment', positive: false },
      { text: 'Requires cleanup', positive: false },
      { text: 'Not travel friendly', positive: false },
    ],
    accent: 'rgba(255,255,255,0.12)',
    border: 'rgba(255,255,255,0.06)',
  },
  {
    label: 'Coffee Pods',
    items: [
      { text: 'Requires a machine', positive: false },
      { text: 'Single-use waste', positive: false },
      { text: 'Limited flexibility', positive: false },
    ],
    accent: 'rgba(255,255,255,0.12)',
    border: 'rgba(255,255,255,0.06)',
  },
  {
    label: 'Torch Republic',
    items: [
      { text: 'Just add hot water', positive: true },
      { text: 'No machine required', positive: true },
      { text: 'No cleanup', positive: true },
      { text: 'Portable anywhere', positive: true },
      { text: 'Premium coffee + functional mushrooms', positive: true },
    ],
    accent: `${GOLD}12`,
    border: `${GOLD}35`,
    highlight: true,
  },
];

export default function InstantConvenienceSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, #0A0806 0%, #0C0907 100%)',
        borderTop: `1px solid ${GOLD}12`,
        borderBottom: `1px solid ${GOLD}08`,
      }}
    >
      {/* Gold accent line */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}50 30%, ${RG}60 60%, transparent 100%)` }} />

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-20 md:py-28">

        {/* ── HEADER ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2 mb-6"
            style={{ background: `${GOLD}0E`, border: `1px solid ${GOLD}28`, borderRadius: '2px' }}
          >
            <div style={{ width: '16px', height: '1px', background: `${GOLD}60` }} />
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: `${GOLD}CC` }}>
              Why Instant Mushroom Coffee
            </span>
            <div style={{ width: '16px', height: '1px', background: `${GOLD}60` }} />
          </div>

          <h2
            className="font-serif font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: '#F5EDE0',
              letterSpacing: '0.04em',
              lineHeight: 1.1,
            }}
          >
            NO PODS. NO MACHINE. NO MESS.
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(240,230,210,0.6)',
              lineHeight: 1.85,
              maxWidth: '600px',
              margin: '0 auto',
              fontWeight: 300,
            }}
          >
            Whether you're at home, in the office, traveling, or starting your morning routine — Torch Republic delivers premium coffee and functional mushrooms in a simple, convenient format designed for modern life.
          </p>
        </motion.div>

        {/* ── BENEFITS LIST ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              style={{
                padding: '10px 16px',
                background: `${GOLD}06`,
                border: `1px solid ${GOLD}18`,
                borderRadius: '2px',
              }}
            >
              <Check size={14} style={{ color: GOLD, flexShrink: 0 }} />
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: 'rgba(240,230,210,0.75)' }}>
                {b}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── SPECIALTY CALLOUT BOX ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: `${GOLD}08`,
            border: `1px solid ${GOLD}30`,
            borderRadius: '2px',
            padding: 'clamp(24px, 3.5vw, 40px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${GOLD}08 0%, transparent 70%)`,
            }}
          />
          <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: `${GOLD}80` }}>
            Specialty Coffee · Instant Convenience
          </p>
          <p
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', color: '#F5EDE0', lineHeight: 1.2 }}
          >
            Exceptional Quality. Zero Equipment.
          </p>
          <p
            className="font-heading"
            style={{
              fontSize: '0.93rem',
              color: 'rgba(240,230,210,0.6)',
              lineHeight: 1.8,
              maxWidth: '520px',
              margin: '0 auto',
              fontWeight: 300,
            }}
          >
            Torch Republic blends are crafted for people who want exceptional coffee quality without complicated brewing equipment. Simply add hot water and enjoy.
          </p>
        </motion.div>

        {/* ── COMPARISON TABLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-center mb-8" style={{ color: `${GOLD}55` }}>
            Compare
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPARE.map((col, i) => (
              <motion.div
                key={col.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                style={{
                  background: col.accent,
                  border: `1px solid ${col.border}`,
                  borderRadius: '2px',
                  padding: 'clamp(20px, 3vw, 28px)',
                  position: 'relative',
                }}
              >
                {col.highlight && (
                  <div
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                      background: `linear-gradient(90deg, transparent, ${GOLD}80, ${RG}90, transparent)`,
                    }}
                  />
                )}
                <p
                  className="font-mono text-[9px] tracking-[0.3em] uppercase mb-5"
                  style={{ color: col.highlight ? GOLD : 'rgba(255,255,255,0.35)' }}
                >
                  {col.label}
                </p>
                <div className="space-y-3">
                  {col.items.map((item) => (
                    <div key={item.text} className="flex items-start gap-2.5">
                      {item.positive
                        ? <Check size={13} style={{ color: GOLD, flexShrink: 0, marginTop: '2px' }} />
                        : <X size={13} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0, marginTop: '2px' }} />
                      }
                      <span
                        className="font-heading text-sm"
                        style={{
                          color: item.positive ? 'rgba(240,230,210,0.8)' : 'rgba(240,230,210,0.35)',
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

        {/* ── REPUBLIC RESERVE CALLOUT ── */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            border: `1px solid ${GOLD}20`,
            borderRadius: '2px',
            padding: 'clamp(24px, 3.5vw, 40px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5"
                style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30`, borderRadius: '2px' }}
              >
                <Droplet size={11} style={{ color: GOLD }} />
                <span className="font-mono text-[7px] tracking-[0.4em] uppercase" style={{ color: GOLD }}>
                  The Republic Reserve Difference
                </span>
              </div>
              <p
                className="font-serif font-bold mb-3"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: '#F5EDE0', lineHeight: 1.2 }}
              >
                Torchbearer™ — Pure Coffee, Effortless
              </p>
              <p
                className="font-heading"
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(240,230,210,0.55)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  maxWidth: '480px',
                }}
              >
                For those moments when simplicity is enough. Torchbearer delivers premium Papua New Guinea Arabica coffee in an instant format designed for exceptional flavor, effortless preparation, and everyday ritual.
              </p>
            </div>
            <Link
              to="/torchbearer"
              className="flex-shrink-0 font-mono text-[10px] tracking-[0.3em] uppercase px-7 py-3.5 transition-all hover:opacity-80"
              style={{
                border: `1px solid ${GOLD}40`,
                color: GOLD,
                borderRadius: '2px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Explore Torchbearer →
            </Link>
          </div>
        </motion.div>

      </div>

      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}20 50%, transparent 100%)` }} />
    </section>
  );
}