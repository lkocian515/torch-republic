import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function QualityMission() {
  const COMMITMENTS = [
    'No exaggerated claims',
    'Transparent ingredients',
    'Small-batch crafted',
    'Honest marketing',
    'Premium Arabica base',
    'Made in the USA',
  ];

  return (
    <section
      style={{
        padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 40px)',
        background: '#080808',
        borderTop: '1px solid rgba(230,183,173,0.06)',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.6em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}>
              Our Standard
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Quality You Can Trust
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(200,184,166,0.6)',
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              Trust is earned. That's why we're committed to transparent ingredients, honest marketing, and a product we're proud to put our name on.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {COMMITMENTS.map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
                <span style={{ color: RG, fontSize: '8px', flexShrink: 0 }}>✦</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(230,183,173,0.6)' }}>
                  {c}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}