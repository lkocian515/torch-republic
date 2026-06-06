import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Leaf, Zap, Recycle, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const ITEMS = [
  { icon: Sparkles,  label: 'Small-Batch · Made for Daily Rituals' },
  { icon: Leaf,      label: "Organic Lion's Mane + Chaga" },
  { icon: Coffee,    label: 'Zero Crash · Zero Jitters' },
  { icon: Recycle,   label: '30-Day First Cup Guarantee' },
  { icon: Zap,       label: 'U.S.-Based · Ethically Sourced' },
];

export default function HomeTrustStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
        padding: '16px 24px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(16px, 3vw, 48px)',
          flexWrap: 'wrap',
        }}
      >
        {ITEMS.map((item, i) => (
          <React.Fragment key={item.label}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
              }}
            >
              <item.icon size={13} style={{ color: RG, flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.53rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,235,225,0.58)',
                }}
              >
                {item.label}
              </span>
            </div>
            {i < ITEMS.length - 1 && (
              <span
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.25)',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
}