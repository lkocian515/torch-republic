import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function FounderSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0D0D0D 0%, #0A0A0A 100%)',
        padding: 'clamp(60px, 8vw, 100px) 24px',
        borderTop: '1px solid rgba(230,183,173,0.06)',
        borderBottom: '1px solid rgba(230,183,173,0.06)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Founder Image/Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
            className="order-2 md:order-1"
          >
            <div
              style={{
                background: 'rgba(230,183,173,0.03)',
                border: '1px solid rgba(230,183,173,0.1)',
                borderRadius: '3px',
                padding: 'clamp(24px, 4vw, 32px)',
              }}
            >
              <p
                className="font-serif italic text-lg mb-4"
                style={{
                  color: 'rgba(245,239,230,0.7)',
                  lineHeight: 1.8,
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                }}
              >
                "Torch Republic was created from the belief that coffee can be more than a quick source of energy. It can be a small daily ritual — a moment to pause, reset, and step into the day with more clarity and intention."
              </p>
              <div className="mt-6">
                <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>Lisa Kocian</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Founder, Torch Republic Coffee Company</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="order-1 md:order-2"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
              From the Founder
            </p>
            <h2
              className="font-serif font-bold mb-6"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)',
                color: '#F5EFE6',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Coffee for the Rising
            </h2>
            <p
              className="font-heading mb-4"
              style={{
                fontSize: '0.95rem',
                color: 'rgba(210,195,175,0.65)',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              I wanted to build a coffee company that felt thoughtful, elevated, and purposeful. Something for people who care about what they put into their body, but also care about the feeling behind their morning routine.
            </p>
            <p
              className="font-heading mb-6"
              style={{
                fontSize: '0.95rem',
                color: 'rgba(210,195,175,0.65)',
                fontWeight: 300,
                lineHeight: 1.8,
              }}
            >
              The torch represents that first spark of the day — the decision to begin again, refocus, and move forward with steady energy. Torch Republic is coffee for the rising: for early mornings, fresh starts, quiet discipline, and the everyday ritual of carrying your own light forward.
            </p>
            <Link
              to="/about"
              className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all py-3 px-6"
              style={{
                background: 'transparent',
                color: RG,
                border: `1px solid ${RG}`,
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${RG}10`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Read Our Full Story →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}