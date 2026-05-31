import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function MissionStatement() {
  return (
    <section
      style={{
        padding: '80px 32px',
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
            marginBottom: '28px',
          }}
        >
          More Than Coffee
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 1.9,
            fontWeight: 300,
            marginBottom: '24px',
          }}
        >
          Torch Republic was built around the belief that small daily rituals create lasting change.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 1.9,
            fontWeight: 300,
          }}
        >
          Each blend represents a different mindset—from focus and discipline to creativity and transformation—helping you approach each day with intention.
        </motion.p>
      </div>
    </section>
  );
}