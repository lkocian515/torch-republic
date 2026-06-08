import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BENEFITS = [
  {
    icon: '🔥',
    title: '20% Off Every Order',
    desc: 'Save on every subscription delivery, automatically.',
  },
  {
    icon: '📦',
    title: 'Free Shipping Always',
    desc: 'No minimum. Every order ships free to your door.',
  },
  {
    icon: '⚡',
    title: 'Priority Support',
    desc: 'Skip the queue. Members get same-day responses.',
  },
  {
    icon: '🎁',
    title: 'Exclusive Member Perks',
    desc: 'Early access to new blends, limited drops & promos.',
  },
  {
    icon: '⏸️',
    title: 'Pause or Cancel Anytime',
    desc: 'Full control. No lock-ins, no penalties, ever.',
  },
  {
    icon: '🌟',
    title: 'Loyalty Points',
    desc: 'Earn points on every order. Redeem for free product.',
  },
];

export default function RitualMembershipBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-8"
      style={{
        background: 'linear-gradient(135deg, rgba(230,183,173,0.06) 0%, rgba(8,8,8,0) 60%)',
        border: '1px solid rgba(230,183,173,0.2)',
        padding: '20px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Coffee Ritual Membership
          </p>
          <h3 className="font-serif font-bold" style={{ color: '#F7F1E8', fontSize: '1.05rem' }}>
            Why Members Never Look Back
          </h3>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="font-mono text-[8px] tracking-[0.2em] line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>
            One-time
          </p>
          <p className="font-mono font-bold text-sm" style={{ color: '#10B981' }}>
            Save 20% /mo
          </p>
        </div>
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {BENEFITS.map((b, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 p-3"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(230,183,173,0.07)' }}
          >
            <span className="text-base flex-shrink-0 mt-0.5">{b.icon}</span>
            <div>
              <p className="font-mono text-[8px] tracking-[0.15em] uppercase font-bold mb-0.5" style={{ color: '#E6B7AD' }}>
                {b.title}
              </p>
              <p className="font-heading text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.45)' }}>
          ✓ No commitment · Cancel anytime
        </p>
        <Link
          to="/subscription"
          className="font-mono text-[8px] tracking-[0.25em] uppercase transition-colors hover:opacity-80"
          style={{ color: 'rgba(230,183,173,0.7)' }}
        >
          Learn more →
        </Link>
      </div>
    </motion.div>
  );
}