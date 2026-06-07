import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, TrendingUp, Gift, Clock } from 'lucide-react';

const RG = '#E6B7AD';

const REWARD_TIERS = [
  { points: 0, discount: '10%', value: '$10 off', label: 'Welcome' },
  { points: 500, discount: '15%', value: '$15 off', label: 'Regular' },
  { points: 1000, discount: '20%', value: '$20 off', label: 'Devoted' },
  { points: 2500, discount: '25%', value: '$25 off', label: 'Torchbearer' },
];

const EARNING_RULES = [
  { action: 'Make a purchase', points: '1 pt per $1', icon: ShoppingBag },
  { action: 'Write a review', points: '50 pts', icon: TrendingUp },
  { action: 'Refer a friend', points: '100 pts', icon: Gift },
  { action: 'Birthday bonus', points: '100 pts', icon: Clock },
];

export default function LoyaltyTab({ points, lifetimePoints, nextTier, progressPercent }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Points Card */}
      <div style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}25`, borderRadius: '3px', padding: 'clamp(24px, 4vw, 32px)', marginBottom: '32px' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${RG}90` }}>
              Current Balance
            </p>
            <div className="flex items-baseline gap-3">
              <span className="font-serif font-bold" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#F5EFE6', lineHeight: 1 }}>
                {points.toLocaleString()}
              </span>
              <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: `${RG}70` }}>
                points
              </span>
            </div>
            {lifetimePoints > 0 && (
              <p className="font-heading text-xs mt-3" style={{ color: 'rgba(210,195,175,0.55)' }}>
                Lifetime earned: <span style={{ color: '#F5EFE6' }}>{lifetimePoints.toLocaleString()}</span> points
              </p>
            )}
          </div>

          {nextTier && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: `${RG}70` }}>
                  Next: {nextTier.points.toLocaleString()} pts
                </p>
                <p className="font-mono text-[7px] tracking-[0.2em]" style={{ color: RG }}>
                  {nextTier.discount} OFF
                </p>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${RG} 0%, #C98F86 100%)` }}
                />
              </div>
              <p className="font-heading text-[10px] mt-2" style={{ color: 'rgba(210,195,175,0.45)' }}>
                {nextTier.points - points} points to {nextTier.discount} off
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reward Tiers */}
      <div className="mb-8">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${RG}80` }}>
          Reward Tiers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REWARD_TIERS.map((tier, i) => (
            <div
              key={tier.points}
              style={{
                background: points >= tier.points ? 'rgba(230,183,173,0.06)' : 'rgba(255,255,255,0.015)',
                border: points >= tier.points ? `1px solid ${RG}25` : '1px solid rgba(230,183,173,0.06)',
                borderRadius: '2px',
                padding: '24px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: points >= tier.points ? 'rgba(230,183,173,0.12)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${points >= tier.points ? RG : 'rgba(230,183,173,0.08)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                {points >= tier.points ? <CheckCircle size={18} style={{ color: RG }} /> : <span style={{ color: 'rgba(230,183,173,0.3)', fontSize: '1.2rem' }}>🔒</span>}
              </div>
              <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                {tier.points.toLocaleString()} pts
              </p>
              <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: points >= tier.points ? '#F5EFE6' : 'rgba(245,239,230,0.4)' }}>
                {tier.label}
              </h3>
              <p className="font-mono text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: points >= tier.points ? RG : 'rgba(230,183,173,0.3)' }}>
                {tier.discount} OFF
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Earning Rules */}
      <div>
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${RG}80` }}>
          How to Earn
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          {EARNING_RULES.map((rule, i) => (
            <div
              key={rule.action}
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(230,183,173,0.06)',
                borderRadius: '2px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(230,183,173,0.08)',
                  border: `1px solid ${RG}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <rule.icon size={16} style={{ color: RG }} />
              </div>
              <div className="flex-1">
                <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>{rule.action}</p>
                <p className="font-mono text-[8px] tracking-[0.25em] uppercase mt-1" style={{ color: RG }}>{rule.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}