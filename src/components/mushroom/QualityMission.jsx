import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function QualityMission() {
  return (
    <section
      style={{
        padding: '60px 32px',
        background: '#080808',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '24px',
          }}
        >
          Our Commitment to Quality
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            color: 'rgba(200,184,166,0.9)',
            lineHeight: 1.8,
            fontWeight: 400,
            marginBottom: '20px',
          }}
        >
          We believe trust is earned. That's why we're committed to transparent product information, honest marketing, and continuous improvement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: RG,
              fontWeight: 600,
            }}
          >
            No exaggerated claims.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: RG,
              fontWeight: 600,
            }}
          >
            No gimmicks.
          </p>
        </motion.div>

        <div style={{ height: '1px', background: 'rgba(230,183,173,0.12)', margin: '24px 0' }} />

        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '18px',
          }}
        >
          More Than Coffee
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '16px',
          }}
        >
          Torch Republic was built around the belief that small daily rituals create lasting change.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          Each blend represents a different mindset—from focus and discipline to creativity and transformation—helping you approach each day with intention.
        </motion.p>
      </div>
    </section>
  );
}