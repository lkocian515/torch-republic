import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function MissionSection() {
  return (
    <section style={{
      backgroundColor: '#050505',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '32px',
          }}>
            More Than Coffee
          </h2>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            lineHeight: 2,
            color: 'rgba(200,184,166,0.85)',
            marginBottom: '40px',
          }}>
            <p style={{ marginBottom: '24px' }}>
              Torch Republic was built around the belief that small daily rituals create lasting change.
            </p>
            <p>
              Each blend represents a different mindset—from focus and discipline to creativity and transformation—helping you approach each day with intention.
            </p>
          </div>

          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: RG,
              color: '#050505',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '15px 40px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}