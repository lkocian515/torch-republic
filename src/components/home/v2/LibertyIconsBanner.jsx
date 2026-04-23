import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

export default function LibertyIconsBanner() {
  return (
    <section style={{
      backgroundColor: '#070707',
      padding: '120px 24px',
      borderTop: '1px solid rgba(201,162,74,0.1)',
      borderBottom: '1px solid rgba(201,162,74,0.1)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center' }}
        >
          {/* Icon */}
          <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
            <Flame
              size={48}
              style={{
                color: '#C9A24A',
                opacity: 0.85,
                filter: 'drop-shadow(0 0 24px rgba(201,162,74,0.3))',
              }}
            />
          </div>

          {/* Main Title */}
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800,
              fontFamily: 'var(--font-serif)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Liberty Icons
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: '1.05rem',
              fontFamily: 'var(--font-heading)',
              color: 'rgba(240,235,225,0.75)',
              lineHeight: 1.8,
              marginBottom: '12px',
              fontWeight: 400,
            }}
          >
            Symbols of freedom. Carried forward in every blend.
          </p>

          {/* Optional small line */}
          <p
            style={{
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)',
              color: 'rgba(201,162,74,0.55)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            A tribute to the ideals that built the Republic.
          </p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              height: '1px',
              width: '60px',
              background: '#C9A24A',
              margin: '0 auto 40px',
              transformOrigin: 'center',
            }}
          />

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/LibertyIcons"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                background: '#C9A24A',
                color: '#080808',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(201,162,74,0.2)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,162,74,0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,162,74,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Explore the Icons →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}