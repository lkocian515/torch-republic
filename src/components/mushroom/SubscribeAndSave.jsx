import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, RotateCcw, Pause, Lock } from 'lucide-react';

const RG = '#E6B7AD';

const BADGES = [
  { icon: Check, label: '20% Off Every Order' },
  { icon: RotateCcw, label: 'Cancel Anytime' },
  { icon: Pause, label: 'Pause or Skip' },
  { icon: Lock, label: 'Secure Checkout' },
];

export default function SubscribeAndSave() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0D0D0D 0%, #0A0A0A 100%)',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
        padding: 'clamp(56px, 7vw, 96px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(230,183,173,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[1100px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65 }}
          >
            {/* Badge */}
            <div
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: 'rgba(230,183,173,0.1)',
                border: '1px solid rgba(230,183,173,0.25)',
                borderRadius: '2px',
                marginBottom: '18px',
              }}
            >
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>
                Subscribe & Save
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-serif font-bold"
              style={{
                fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                color: '#F5EFE6',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              Make It a Ritual. Save 20%.
            </h2>

            {/* Subheadline */}
            <p
              className="font-heading"
              style={{
                fontSize: '1.05rem',
                color: 'rgba(210,195,175,0.75)',
                fontWeight: 300,
                lineHeight: 1.7,
                marginBottom: '28px',
              }}
            >
              Save 20% when you subscribe and keep your favorite blend stocked every 4 weeks. Skip, pause, or cancel anytime — no phone calls, no hassle.
            </p>

            {/* Benefits list */}
            <ul style={{ marginBottom: '32px' }}>
              {[
                'Never run out of your daily ritual',
                '20% discount on every subscription order',
                'Free shipping on all subscription orders',
                'Full flexibility — pause, skip, or cancel anytime',
                'Easy online management — no phone calls needed',
              ].map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '11px',
                    listStyle: 'none',
                  }}
                >
                  <Check size={16} style={{ color: RG, flexShrink: 0, marginTop: '2px' }} />
                  <span className="font-heading" style={{ color: 'rgba(247,241,232,0.65)', fontWeight: 300, fontSize: '0.93rem', lineHeight: 1.6 }}>
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              to="/subscription"
              className="inline-block font-mono text-[11px] tracking-[0.35em] uppercase font-bold transition-all py-4 px-8"
              style={{
                background: RG,
                color: '#080808',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Start Your Subscription →
            </Link>
          </motion.div>

          {/* Right: Badges Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(230,183,173,0.1)',
              borderRadius: '3px',
              padding: 'clamp(24px, 3vw, 32px)',
            }}
          >
            <p
              className="font-mono text-[8px] tracking-[0.3em] uppercase text-center"
              style={{ color: 'rgba(230,183,173,0.45)', marginBottom: '20px' }}
            >
              Subscription Promise
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 12px',
                    background: 'rgba(230,183,173,0.03)',
                    border: '1px solid rgba(230,183,173,0.08)',
                    borderRadius: '2px',
                  }}
                >
                  <badge.icon size={18} style={{ color: RG }} />
                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase text-center" style={{ color: 'rgba(247,241,232,0.55)' }}>
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Microcopy */}
            <p
              className="font-mono text-[7px] tracking-[0.15em] uppercase text-center"
              style={{
                color: 'rgba(230,183,173,0.35)',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(230,183,173,0.06)',
              }}
            >
              No commitments. No hidden fees. Just great coffee.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}