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
                "We built Torch Republic around a simple idea: coffee should feel intentional. Whether you choose classic instant, functional mushroom blends, or matcha — every cup is crafted for your daily ritual."
              </p>
              <div className="flex items-center gap-3 mt-6">
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(230,183,173,0.1)',
                    border: `1px solid ${RG}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span className="font-serif font-bold" style={{ color: RG, fontSize: '1.2rem' }}>TR</span>
                </div>
                <div>
                  <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>The Torch Republic Team</p>
                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>Coffee Company</p>
                </div>
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
              Our Story
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
              Built for Modern Rituals
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
              Torch Republic was founded on a belief: your morning coffee should be easy, intentional, and aligned with how you want your day to feel.
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
              We offer three paths: <strong style={{ color: 'rgba(245,239,230,0.8)' }}>Classic Instant Coffee</strong> (pure Arabica, no mushrooms), <strong style={{ color: 'rgba(245,239,230,0.8)' }}>Mushroom Coffee</strong> (Lion's Mane + Chaga for focus and calm), and <strong style={{ color: 'rgba(245,239,230,0.8)' }}>Matcha</strong> (ceremonial grade for calm energy). Each is designed for consistency, quality, and ease.
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