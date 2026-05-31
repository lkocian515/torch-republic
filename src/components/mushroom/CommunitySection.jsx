import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function CommunitySection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section style={{
      backgroundColor: '#050505',
      borderBottom: '1px solid rgba(230,183,173,0.08)',
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '80px 24px',
        textAlign: 'center',
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
            marginBottom: '24px',
          }}>
            Join the Founding Community
          </h2>

          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.05rem',
            lineHeight: 2,
            color: 'rgba(200,184,166,0.85)',
            marginBottom: '40px',
          }}>
            Torch Republic is a growing community of people seeking focus, clarity, discipline, creativity, and personal growth.
            <br />
            <span style={{ color: RG }}>Be among the first to experience our collection and help shape the future of the brand.</span>
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'center',
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '16px 24px',
                  backgroundColor: 'rgba(230,183,173,0.05)',
                  border: '1px solid rgba(230,183,173,0.15)',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: RG,
                  color: '#050505',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '15px 48px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Join the Community
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                backgroundColor: 'rgba(230,183,173,0.1)',
                border: '1px solid rgba(230,183,173,0.2)',
                borderRadius: '12px',
                padding: '32px 24px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                color: RG,
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                Welcome to the Republic
              </p>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                color: 'rgba(200,184,166,0.8)',
              }}>
                We'll be in touch soon with exclusive updates.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}