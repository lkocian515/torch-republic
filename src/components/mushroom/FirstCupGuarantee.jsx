import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, Award } from 'lucide-react';

const RG = '#E6B7AD';

export default function FirstCupGuarantee() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0C0C0C 0%, #0A0A0A 100%)',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '80%',
          background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(230,183,173,0.04) 0%, transparent 75%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[900px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(24px, 4vw, 32px)' }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'rgba(230,183,173,0.08)',
              border: '1px solid rgba(230,183,173,0.2)',
              borderRadius: '2px',
              marginBottom: '18px',
            }}
          >
            <Award size={14} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>
              First Cup Guarantee
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
              color: '#F5EFE6',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            You Either Love It or You Don't Pay
          </h2>

          {/* Promise */}
          <p
            className="font-heading"
            style={{
              fontSize: '1.05rem',
              color: 'rgba(210,195,175,0.75)',
              fontWeight: 300,
              lineHeight: 1.75,
              maxWidth: '620px',
              margin: '0 auto',
            }}
          >
            We're so confident Torch Republic will become the best part of your morning that we back every first order with a 30-day money-back guarantee. If it's not life-changing, contact us and we'll make it right — no hoops, no hassle, no hard feelings.
          </p>
        </motion.div>

        {/* Guarantee Box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(230,183,173,0.12)',
            borderRadius: '3px',
            padding: 'clamp(24px, 3.5vw, 36px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                icon: Shield,
                title: '30-Day Money-Back',
                description: 'Try your first order completely risk-free. If it doesn\'t become a staple in your morning, we\'ll refund it — no questions, no delays.',
              },
              {
                icon: Check,
                title: 'Zero-Hassle Returns',
                description: 'Email us once. We handle everything. Our 500+ five-star customers are proof that this product works — and that we stand by it.',
              },
              {
                icon: Award,
                title: 'Premium Quality, Always',
                description: 'Organic mushrooms. Ethically sourced coffee. Third-party tested for purity. Every tube, every time. You get what\'s on the label.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '10px',
                  padding: '16px',
                }}
              >
                <item.icon size={20} style={{ color: RG, flexShrink: 0 }} />
                <h3
                  className="font-serif font-bold"
                  style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '6px', lineHeight: 1.3 }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-heading text-sm"
                  style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.7 }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(230,183,173,0.07)' }}>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.45)' }}>
              Questions? Reach out to{' '}
              <a href="mailto:support@torchrepublic.com" style={{ color: RG, textDecoration: 'none' }}>
                support@torchrepublic.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}