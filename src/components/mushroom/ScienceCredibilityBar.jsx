import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, ShieldCheck, Leaf, Award, Coffee } from 'lucide-react';

const RG = '#E6B7AD';

const PILLARS = [
  {
    icon: FlaskConical,
    headline: 'Peer-Reviewed Research',
    sub: "Lion's Mane studied for cognitive + NGF support",
  },
  {
    icon: Leaf,
    headline: 'Organic Dual-Extract',
    sub: '500mg per serving — not a trace dose',
  },
  {
    icon: ShieldCheck,
    headline: 'Third-Party Tested',
    sub: 'Purity + potency verified every batch',
  },
  {
    icon: Coffee,
    headline: 'No Machine Required',
    sub: 'Just hot water — ready in 30 seconds',
  },
  {
    icon: Award,
    headline: '30-Day Money-Back',
    sub: 'You love it or you don\'t pay. Period.',
  },
];

export default function ScienceCredibilityBar() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      style={{
        background: 'linear-gradient(180deg, #0A0A0A 0%, #0C0D0F 100%)',
        borderTop: '1px solid rgba(230,183,173,0.1)',
        borderBottom: '1px solid rgba(230,183,173,0.1)',
        padding: 'clamp(28px, 4vw, 48px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(230,183,173,0.035) 0%, transparent 70%)',
      }} />

      <div className="max-w-[1200px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section label */}
        <p className="font-mono text-center text-[8px] tracking-[0.55em] uppercase mb-8"
          style={{ color: 'rgba(230,183,173,0.35)' }}>
          Why Torch Republic Is Different
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'rgba(230,183,173,0.07)',
          border: '1px solid rgba(230,183,173,0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.headline}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{
                background: '#0C0D0F',
                padding: 'clamp(20px, 3vw, 32px) 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '10px',
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: `${RG}0F`,
                border: `1px solid ${RG}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <p.icon size={18} style={{ color: RG }} />
              </div>
              <div>
                <p className="font-serif font-bold" style={{ fontSize: '0.95rem', color: '#F5EFE6', marginBottom: '5px', lineHeight: 1.3 }}>
                  {p.headline}
                </p>
                <p className="font-heading" style={{ fontSize: '0.78rem', color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.6 }}>
                  {p.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}