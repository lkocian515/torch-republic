import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplet, Coffee, Leaf, Check, Zap } from 'lucide-react';

const RG = '#E6B7AD';

const SPECS = [
  {
    icon: Leaf,
    label: 'Mushroom Blend per Serving',
    value: '500mg',
    note: "Organic dual-extracted Lion's Mane + Cordyceps + Reishi — a meaningful, effective dose. Not a trace. Not a sprinkle.",
  },
  {
    icon: Coffee,
    label: 'Caffeine per Serving',
    value: '50–80mg',
    note: "Roughly half to one full cup of regular coffee — enough for a smooth, focused lift without the spike-and-crash.",
  },
  {
    icon: Droplet,
    label: 'Servings per Tube',
    value: '27',
    note: 'A full month of your daily ritual in every tube. Compact, travel-ready, ready in seconds.',
  },
  {
    icon: Shield,
    label: 'Functional Mushrooms',
    value: "Lion's Mane, Cordyceps & Reishi",
    note: "Lion's Mane for cognitive support + NGF. Cordyceps for natural energy and stamina. Reishi for balance and antioxidant support. Research-backed, not trendy.",
  },
  {
    icon: Check,
    label: 'Extraction Method',
    value: 'Dual Extract',
    note: 'Hot water + alcohol extraction captures the full spectrum of active compounds for maximum bioavailability.',
  },
  {
    icon: Zap,
    label: 'Ready In',
    value: '30 Seconds',
    note: 'Just hot water. No machine, no pods, no cleanup — your entire wellness ritual in half a minute.',
  },
];

export default function WhatsInsideEveryCup() {
  return (
    <section
      style={{
        background: '#0C0C0C',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}
          >
            Transparency
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
            Nothing Hidden. Everything Counts.
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.7)',
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            We believe you deserve to know exactly what you're putting in your body. Full transparency, no "proprietary blend" hiding, no fillers — just the ingredients that actually do something.
          </p>
        </motion.div>

        {/* Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(230,183,173,0.08)',
                borderRadius: '3px',
                padding: 'clamp(18px, 2.5vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.08)',
                  border: '1px solid rgba(230,183,173,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <spec.icon size={17} style={{ color: RG }} />
              </div>

              {/* Label */}
              <div>
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)', marginBottom: '6px' }}>
                  {spec.label}
                </p>
                <p className="font-serif font-bold" style={{ fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.2 }}>
                  {spec.value}
                </p>
              </div>

              {/* Note */}
              <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300, lineHeight: 1.6 }}>
                {spec.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="font-mono text-[8px] tracking-[0.15em] uppercase text-center"
          style={{
            color: 'rgba(230,183,173,0.35)',
            marginTop: 'clamp(24px, 4vw, 32px)',
            paddingTop: '20px',
            borderTop: '1px solid rgba(230,183,173,0.06)',
          }}
        >
          All blends are gluten-free, dairy-free, and contain no artificial colors, flavors, or preservatives.
        </motion.p>
      </div>
    </section>
  );
}