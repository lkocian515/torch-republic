import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Crown, Gift, TrendingUp, Clock, Star } from 'lucide-react';

const RG = '#E6AC45';

const TIER_ICONS = {
  ember: Flame,
  beacon: Sparkles,
  flamekeeper: Crown,
};

const TIER_COLORS = {
  ember: '#9B4E2F',
  beacon: '#E6AC45',
  flamekeeper: '#E6AC45',
};

export default function LoyaltyDashboard({ user, pointsData }) {
  const { currentPoints = 0, lifetimePoints = 0, tier = 'ember', nextTierPoints = 500, referralCount = 0 } = pointsData || {};
  
  const progress = Math.min((currentPoints / nextTierPoints) * 100, 100);
  const TierIcon = TIER_ICONS[tier] || Flame;
  const tierColor = TIER_COLORS[tier] || RG;

  const recentActivity = [
    { icon: Gift, text: 'Welcome bonus', points: '+50', date: 'Today' },
    { icon: Star, text: 'Product review', points: '+25', date: '2 days ago' },
    { icon: TrendingUp, text: 'Purchase reward', points: '+120', date: '5 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Tier Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
        style={{
          background: `linear-gradient(135deg, ${tierColor}12 0%, ${tierColor}08 100%)`,
          border: `1px solid ${tierColor}40`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${tierColor}20` }}>
              <TierIcon className="w-6 h-6" style={{ color: tierColor }} />
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: `${tierColor}90` }}>
                Current Tier
              </p>
              <h3 className="font-serif font-bold" style={{ fontSize: '1.5rem', color: tierColor }}>
                {tier === 'ember' ? 'EMBER' : tier === 'beacon' ? 'BEACON' : 'FLAMEKEEPER'}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Available Points
            </p>
            <p className="font-mono text-2xl font-bold" style={{ color: RG }}>
              {currentPoints.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(245,239,230,0.6)' }}>
              Progress to Next Tier
            </p>
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: tierColor }}>
              {currentPoints} / {nextTierPoints.toLocaleString()} pts
            </p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(230,183,173,0.1)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: tierColor }}
            />
          </div>
          <p className="font-mono text-[7px] tracking-[0.15em] uppercase mt-2" style={{ color: 'rgba(230,183,173,0.4)' }}>
            {nextTierPoints - currentPoints} points to next tier
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" style={{ color: RG }} />
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Lifetime Points
            </p>
          </div>
          <p className="font-mono text-xl font-bold" style={{ color: '#F7F2E9' }}>
            {lifetimePoints.toLocaleString()}
          </p>
        </div>

        <div className="p-4" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-4 h-4" style={{ color: RG }} />
            <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Referrals
            </p>
          </div>
          <p className="font-mono text-xl font-bold" style={{ color: '#F7F2E9' }}>
            {referralCount}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-5" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4" style={{ color: RG }} />
          <p className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold" style={{ color: RG }}>
            Recent Activity
          </p>
        </div>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(230,183,173,0.5)' }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.7)' }}>
                    {activity.text}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold" style={{ color: RG }}>
                    {activity.points}
                  </p>
                  <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.3)' }}>
                    {activity.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="/torchbearers-rewards"
          className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase font-bold px-6 py-3 transition-all hover:opacity-90"
          style={{ background: RG, color: '#080808' }}
        >
          View All Torchbearer Rewards
        </a>
      </div>
    </div>
  );
}