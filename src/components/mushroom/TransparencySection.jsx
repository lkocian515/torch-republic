import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function TransparencySection() {
  return (
    <section style={{
      backgroundColor: '#050505',
      borderBottom: '1px solid rgba(230,183,173,0.08)',
    }}>
      <div style={{
        maxWidth: '800px',
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
            Our Commitment to Quality
          </h2>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            lineHeight: 2,
            color: 'rgba(200,184,166,0.85)',
          }}>
            <p style={{ marginBottom: '24px' }}>
              We believe trust is earned.
            </p>
            <p style={{ marginBottom: '24px' }}>
              That's why we're committed to transparent product information, honest marketing, continuous product improvement, and listening closely to customer feedback as we grow.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              margin: '32px 0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: RG,
              fontWeight: 600,
            }}>
              <span>No exaggerated claims</span>
              <span>•</span>
              <span>No gimmicks</span>
            </div>
            <p style={{ color: 'rgba(200,184,166,0.9)' }}>
              Just thoughtfully crafted coffee blends designed to support your daily routine.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}