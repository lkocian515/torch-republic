import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function FounderStory() {
  return (
    <section style={{
      backgroundColor: '#050505',
      borderBottom: '1px solid rgba(230,183,173,0.08)',
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
        >
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '32px',
            lineHeight: 1.2,
          }}>
            Why Torch Republic Exists
          </h2>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            lineHeight: 2,
            color: 'rgba(200,184,166,0.85)',
            textAlign: 'center',
          }}>
            <p style={{ marginBottom: '24px' }}>
              Torch Republic Coffee Company was created for people who want more from their daily coffee ritual.
            </p>
            <p style={{ marginBottom: '24px' }}>
              We believe coffee should do more than wake you up. It should support focus, clarity, resilience, and intentional living.
            </p>
            <p style={{ marginBottom: '24px' }}>
              Every blend is designed around a specific mindset and purpose, combining premium coffee with functional mushrooms to create a better way to start your day.
            </p>
            <p style={{
              color: RG,
              fontWeight: 500,
            }}>
              Torch Republic is proudly founder-led and committed to quality, transparency, and continuous improvement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}