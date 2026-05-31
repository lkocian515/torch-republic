import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const RG = '#E6B7AD';

export default function ReviewsSection() {
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
            Customer Experiences
          </h2>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1rem',
            color: 'rgba(200,184,166,0.7)',
          }}>
            Real feedback from our founding community members
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {[
            { title: 'Customer reviews coming soon', message: 'Be one of the first to share your experience' },
            { title: 'Founding customer feedback', message: 'Early adopter reviews will be featured here' },
            { title: 'Your story matters', message: 'Help shape the future of Torch Republic' },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'rgba(230,183,173,0.03)',
                border: '1px solid rgba(230,183,173,0.08)',
                borderRadius: '12px',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={RG} stroke={RG} />
                ))}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '12px',
              }}>
                {card.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                color: 'rgba(200,184,166,0.7)',
                lineHeight: 1.6,
              }}>
                {card.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}