import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

export default function MissionPage() {
  React.useEffect(() => {
    document.title = 'Our Mission | Torch Republic Mushroom Coffee';
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '100px 32px 80px',
          background: '#080808',
          borderBottom: '1px solid rgba(230,183,173,0.08)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: 'rgba(230,183,173,0.78)',
              fontSize: '0.58rem',
              letterSpacing: '0.55em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              marginBottom: '24px',
            }}
          >
            Why Torch Republic Exists
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '32px',
            }}
          >
            More Than Just Coffee
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
              color: 'rgba(200,184,166,0.9)',
              lineHeight: 1.8,
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            Torch Republic Coffee Company was created for people who want more from their daily coffee ritual.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
              color: 'rgba(200,184,166,0.9)',
              lineHeight: 1.8,
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            We believe coffee should do more than wake you up. It should support focus, clarity, resilience, and intentional living.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
              color: 'rgba(200,184,166,0.9)',
              lineHeight: 1.8,
              fontWeight: 400,
              marginBottom: '32px',
            }}
          >
            Every blend is designed around a specific mindset and purpose, combining premium coffee with functional mushrooms to create a better way to start your day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              padding: '24px',
              background: 'rgba(230,183,173,0.05)',
              border: `1px solid rgba(${RG},0.15)`,
              borderRadius: '12px',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                color: 'rgba(200,184,166,0.85)',
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Torch Republic is proudly founder-led and committed to quality, transparency, and continuous improvement.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}