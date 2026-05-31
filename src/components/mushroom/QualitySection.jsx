import React from 'react';
import { motion } from 'framer-motion';

const QUALITY_ITEMS = [
  { icon: '☕', title: 'Premium Arabica Coffee', description: 'Sourced for smooth, rich flavor' },
  { icon: '🍄', title: 'Functional Mushroom Extracts', description: "Lion's Mane + Chaga blend" },
  { icon: '⚡', title: 'Instant Preparation', description: 'No brewing equipment needed' },
  { icon: '✈️', title: 'Travel-Friendly Format', description: 'Perfect for on-the-go rituals' },
  { icon: '🔄', title: 'Designed for Daily Rituals', description: 'Consistent quality, every cup' },
  { icon: '🦅', title: 'Made in the USA', description: 'Small-batch production' },
];

export default function QualitySection() {
  return (
    <section style={{
      backgroundColor: '#050505',
      borderBottom: '1px solid rgba(230,183,173,0.08)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '16px',
          }}>
            What's Inside Every Blend
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {QUALITY_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'rgba(230,183,173,0.03)',
                border: '1px solid rgba(230,183,173,0.08)',
                borderRadius: '12px',
                padding: '28px 24px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: '2.5rem', marginBottom: '16px', display: 'block' }}>{item.icon}</span>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                color: 'rgba(200,184,166,0.7)',
                lineHeight: 1.6,
              }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}