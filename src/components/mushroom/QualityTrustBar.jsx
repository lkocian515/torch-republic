import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const QUALITY_POINTS = [
  { icon: '🦅', label: 'Made in USA' },
  { icon: '☕', label: 'Premium Arabica Coffee' },
  { icon: '🛡️', label: 'Small-Batch Quality Focus' },
];

export default function QualityTrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 32px',
        background: '#080808',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: `1px solid rgba(${RG},0.15)`,
          borderRadius: '999px',
          padding: '12px 8px',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        {QUALITY_POINTS.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 20px',
              borderRight: i < QUALITY_POINTS.length - 1 ? '1px solid rgba(230,183,173,0.12)' : 'none',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.7)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}