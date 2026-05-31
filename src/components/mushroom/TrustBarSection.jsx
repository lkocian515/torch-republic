import React from 'react';
import { motion } from 'framer-motion';

const TRUST_BADGES = [
  { icon: '🦅', label: 'Made in USA' },
  { icon: '🍄', label: 'Functional Mushroom Blend' },
  { icon: '⚡', label: 'Instant & Travel Friendly' },
  { icon: '☕', label: 'Premium Arabica Coffee' },
  { icon: '🛡️', label: 'Small-Batch Quality Focus' },
];

export default function TrustBarSection() {
  return (
    <section style={{
      backgroundColor: '#050505',
      borderBottom: '1px solid rgba(230,183,173,0.08)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px',
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '32px',
        }}>
          {TRUST_BADGES.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                minWidth: '120px',
              }}
            >
              <span style={{ fontSize: '2rem' }}>{badge.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(230,183,173,0.75)',
                textAlign: 'center',
                lineHeight: 1.5,
              }}>
                {badge.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}