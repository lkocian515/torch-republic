import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function CommunitySection() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section
      style={{
        padding: '80px 32px',
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          Join the Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
            color: 'rgba(200,184,166,0.85)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '32px',
          }}
        >
          Torch Republic is a growing community of people seeking focus, clarity, discipline, creativity, and personal growth.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
            color: 'rgba(200,184,166,0.75)',
            lineHeight: 1.8,
            fontWeight: 300,
            marginBottom: '32px',
          }}
        >
          Be among the first to experience our collection and help shape the future of the brand.
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '16px 24px',
              background: 'rgba(230,183,173,0.1)',
              border: `1px solid ${RG}`,
              borderRadius: '8px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: RG,
                fontWeight: 600,
              }}
            >
              Welcome to the Republic
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'rgba(0,0,0,0.4)',
                border: `1px solid rgba(${RG},0.25)`,
                borderRadius: '999px',
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                background: RG,
                color: '#050505',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontWeight: 700,
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Join
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}