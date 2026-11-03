import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6AC45';

export default function QualityMission() {
  const COMMITMENTS = [
    'Premium instant mushroom coffee powder',
    'Lion\'s Mane + Cordyceps + Reishi in every blend',
    '27 servings per tube',
    'No coffee maker, grinder, or pods needed',
    'Ships from the U.S.',
    '30-day satisfaction guarantee',
    'Secure checkout on every order',
    'Customer support available',
  ];

  return (
    <section
      style={{
        padding: 'clamp(56px, 7vw, 80px) clamp(20px, 5vw, 40px)',
        background: '#161616',
        position: 'relative',
      }}
    >
      <div className="divider-gradient absolute top-0 left-0 right-0" />
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
                color: '#F7F2E9',
                lineHeight: 1.15,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Why Torch Republic
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(250,245,235,0.78)',
                lineHeight: 1.85,
                fontWeight: 300,
              }}
            >
              A premium instant mushroom coffee brand built for people who want their daily coffee to feel more intentional. Every blend supports focus, calm, energy, or restoration — without a complicated brew routine.
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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,245,235,0.85)' }}>
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