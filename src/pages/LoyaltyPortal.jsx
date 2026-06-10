import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Gift, TrendingUp, ShoppingBag, Clock, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

function LoyaltyCard({ points, lifetimePoints, nextTier, progressPercent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{
        background: 'linear-gradient(135deg, rgba(230,183,173,0.08) 0%, rgba(230,183,173,0.02) 100%)',
        border: `1px solid ${RG}25`,
        borderRadius: '3px',
        padding: 'clamp(24px, 4vw, 32px)',
      }}
    >
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
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${RG} 0%, #C98F86 100%)`,
                }}
              />
            </div>
            <p className="font-heading text-[10px] mt-2" style={{ color: 'rgba(210,195,175,0.45)' }}>
              {nextTier.points - points} points to {nextTier.discount} off
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RewardTier({ tier, currentPoints, isUnlocked }) {
  const Icon = tier.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        background: isUnlocked ? 'rgba(230,183,173,0.06)' : 'rgba(255,255,255,0.015)',
        border: isUnlocked ? `1px solid ${RG}25` : '1px solid rgba(230,183,173,0.06)',
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
          background: isUnlocked ? 'rgba(230,183,173,0.12)' : 'rgba(255,255,255,0.03)',
          border: `1px solid ${isUnlocked ? RG : 'rgba(230,183,173,0.08)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
        }}
      >
        {isUnlocked ? <CheckCircle size={18} style={{ color: RG }} /> : <Lock size={18} style={{ color: 'rgba(230,183,173,0.3)' }} />}
      </div>
      <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
        {tier.points.toLocaleString()} pts
      </p>
      <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: isUnlocked ? '#F5EFE6' : 'rgba(245,239,230,0.4)' }}>
        {tier.label}
      </h3>
      <p className="font-mono text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: isUnlocked ? RG : 'rgba(230,183,173,0.3)' }}>
        {tier.discount} OFF
      </p>
    </motion.div>
  );
}

function EarningRule({ rule, index }) {
  const Icon = rule.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
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
        <Icon size={16} style={{ color: RG }} />
      </div>
      <div className="flex-1">
        <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>{rule.action}</p>
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase mt-1" style={{ color: RG }}>{rule.points}</p>
      </div>
    </motion.div>
  );
}

export default function LoyaltyPortal() {
  useSEO({
    title: 'Loyalty Rewards | Torch Republic Coffee Co.',
    description: 'Track your Torch Republic loyalty points and unlock exclusive discounts.',
    url: '/loyalty',
    noindex: true,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.isAuthenticated().then(async (authed) => {
      setIsAuthenticated(authed);
      if (authed) {
        try {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        } catch {
          setUser(null);
        }
      }
    });
  }, []);

  const { data: loyaltyData, isLoading } = useQuery({
    queryKey: ['loyalty', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const records = await base44.entities.LoyaltyPoints.filter({ user_id: user.id });
      return records[0] || { points: 0, lifetime_points: 0, redeemed_codes: [] };
    },
    enabled: !!user?.id,
  });

  const points = loyaltyData?.points || 0;
  const lifetimePoints = loyaltyData?.lifetime_points || 0;

  const nextTier = REWARD_TIERS.slice().reverse().find(tier => tier.points > points);
  const prevTier = REWARD_TIERS.slice().reverse().find((tier, i, arr) => tier.points <= points && (i === arr.length - 1 || arr[i + 1].points > points));
  const progressPercent = nextTier && prevTier
    ? ((points - prevTier.points) / (nextTier.points - prevTier.points)) * 100
    : points >= (REWARD_TIERS[REWARD_TIERS.length - 1]?.points || 0)
    ? 100
    : 0;

  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A', padding: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="font-serif font-bold mb-4" style={{ fontSize: '2rem', color: '#F5EFE6' }}>
            Member Access
          </h1>
          <p className="font-heading mb-8" style={{ color: 'rgba(210,195,175,0.6)' }}>
            Sign in to view your loyalty points and rewards
          </p>
          <Link
            to="/login"
            className="inline-block font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#050505',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '14px 36px',
              borderRadius: '2px',
            }}
          >
            Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  if (isLoading || !loyaltyData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0A0A0A' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: RG }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A', paddingBottom: '80px' }}>
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px 60px', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Loyalty Rewards
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Welcome to Torch Republic Rewards
            </h1>
            <p className="font-heading mt-4 max-w-2xl" style={{ fontSize: '0.95rem', color: 'rgba(210,195,175,0.65)', fontWeight: 300, lineHeight: 1.8 }}>
              Earn points on every purchase, unlock exclusive discounts, and join the republic of premium coffee lovers.
            </p>
          </motion.div>

          <LoyaltyCard points={points} lifetimePoints={lifetimePoints} nextTier={nextTier} progressPercent={progressPercent} />
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Unlock Rewards
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
              Your Path to Savings
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REWARD_TIERS.map((tier, i) => (
              <RewardTier key={tier.points} tier={tier} currentPoints={points} isUnlocked={points >= tier.points} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Earn Points
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
              How to Earn Rewards
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {EARNING_RULES.map((rule, i) => (
              <EarningRule key={rule.action} rule={rule} index={i} />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
              style={{ background: RG, color: '#050505', fontSize: '0.7rem', fontWeight: 700, padding: '14px 36px', borderRadius: '2px' }}
            >
              Start Earning <ChevronRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="text-center" style={{ padding: '40px 24px' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          <strong style={{ color: 'rgba(255,255,255,0.3)' }}>Terms:</strong> Points are awarded per qualifying purchase. Discount codes are single-use and cannot be combined with other offers. Points expire after 12 months of account inactivity.
        </p>
      </section>
    </div>
  );
}