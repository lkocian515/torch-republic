import React from 'react';
import { motion } from 'framer-motion';
import { Check, Gift, TrendingUp, Crown } from 'lucide-react';

const RG = '#E6AC45';

const TIERS = [
  {
    name: 'Initiate',
    months: 1,
    multiplier: '1.0x',
    perks: [
      'Access to Torchbearer Portal',
      'Standard point earning',
      'Email support',
    ],
    gift: null,
  },
  {
    name: 'Torchbearer',
    months: 3,
    multiplier: '1.25x',
    perks: [
      '1.25x point multiplier',
      'Early access to drops',
      'Priority support',
      'Matte Black Scoop & Clip',
    ],
    gift: {
      name: 'Matte Black Scoop & Clip',
      description: 'Heavy-gauge matte black coffee scoop with gold Torch Republic logo and built-in bag clip.',
      icon: Gift,
    },
  },
  {
    name: 'Keeper',
    months: 6,
    multiplier: '1.5x',
    perks: [
      '1.5x point multiplier',
      'Free shipping on all orders',
      'Exclusive apparel access',
      "Founders Only Heavyweight Tee",
    ],
    gift: {
      name: "Founders Only Heavyweight Tee",
      description: 'Premium heavyweight cotton tee with exclusive cinematic design. Never sold publicly.',
      icon: Crown,
    },
  },
  {
    name: 'Republic',
    months: 12,
    multiplier: '2.0x',
    perks: [
      '2.0x point multiplier',
      'VIP event access',
      'Limited edition drops',
      'Laser-Engraved Tumbler',
    ],
    gift: {
      name: 'Laser-Engraved Tumbler',
      description: 'Dark navy double-walled steel tumbler, laser-engraved with "Torchbearer: Year One".',
      icon: Crown,
    },
  },
];

const POINT_EXAMPLES = [
  { purchase: '$50 order', basePoints: 50 },
  { purchase: '$100 order', basePoints: 100 },
  { purchase: '$150 order', basePoints: 150 },
];

export default function LoyaltyTierCalculator() {
  const [monthsActive, setMonthsActive] = React.useState(3);

  const currentTier = TIERS.reduce((prev, curr) => {
    return monthsActive >= curr.months ? curr : prev;
  }, TIERS[0]);

  const nextTier = TIERS.find(t => t.months > monthsActive);
  const monthsToNext = nextTier ? nextTier.months - monthsActive : 0;

  const calculatePoints = (basePoints) => {
    const multiplier = parseFloat(currentTier.multiplier);
    return Math.round(basePoints * multiplier);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Slider */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <label className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: RG }}>
            Your Journey
          </label>
          <span className="font-serif font-bold text-white" style={{ fontSize: '1.4rem' }}>
            {monthsActive} Month{monthsActive !== 1 ? 's' : ''} Active
          </span>
        </div>
        
        <input
          type="range"
          min="1"
          max="12"
          value={monthsActive}
          onChange={(e) => setMonthsActive(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: 'linear-gradient(90deg, #E6AC45 0%, #E6AC45 ' + (monthsActive / 12 * 100) + '%, rgba(230,183,173,0.1) ' + (monthsActive / 12 * 100) + '%, rgba(230,183,173,0.1) 100%)',
          }}
        />
        
        <div className="flex justify-between mt-2 font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
          <span>Month 1</span>
          <span>Month 12</span>
        </div>
      </div>

      {/* Current Tier Card */}
      <motion.div
        key={currentTier.name}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 mb-8"
        style={{
          background: 'linear-gradient(135deg, rgba(230,183,173,0.08) 0%, rgba(230,183,173,0.02) 100%)',
          border: `1px solid ${RG}`,
          borderRadius: '4px',
        }}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: `${RG}99` }}>
              Current Status
            </p>
            <h3 className="font-serif font-bold text-white" style={{ fontSize: '2rem' }}>
              {currentTier.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: `${RG}99` }}>
              Point Multiplier
            </p>
            <p className="font-serif font-bold" style={{ fontSize: '2rem', color: RG }}>
              {currentTier.multiplier}
            </p>
          </div>
        </div>

        {/* Perks */}
        <div className="mb-6">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Your Perks
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTier.perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: RG }} />
                <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.8)' }}>
                  {perk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Gift */}
        {currentTier.gift && (
          <div className="mt-6 p-4" style={{ background: 'rgba(230,183,173,0.05)', borderRadius: '4px', border: `1px solid ${RG}40` }}>
            <div className="flex items-start gap-3">
              <currentTier.gift.icon className="w-5 h-5 mt-0.5" style={{ color: RG }} />
              <div>
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1" style={{ color: `${RG}99` }}>
                  Milestone Gift Unlocked
                </p>
                <h4 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.1rem' }}>
                  {currentTier.gift.name}
                </h4>
                <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.6 }}>
                  {currentTier.gift.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next Tier Progress */}
        {nextTier && (
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(230,183,173,0.15)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                {monthsToNext} month{monthsToNext !== 1 ? 's' : ''} to {nextTier.name}
              </p>
              <TrendingUp className="w-4 h-4" style={{ color: RG }} />
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(230,183,173,0.1)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(monthsActive / nextTier.months) * 100}%` }}
                className="h-full rounded-full"
                style={{ background: RG }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Point Calculator Examples */}
      <div className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}>
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-4 text-center" style={{ color: 'rgba(230,183,173,0.5)' }}>
          Points You'd Earn at {currentTier.name} Tier
        </p>
        <div className="grid grid-cols-3 gap-4">
          {POINT_EXAMPLES.map((example) => (
            <div key={example.purchase} className="text-center">
              <p className="font-heading text-xs mb-2" style={{ color: 'rgba(240,235,225,0.6)' }}>
                {example.purchase}
              </p>
              <p className="font-serif font-bold" style={{ fontSize: '1.4rem', color: RG }}>
                {calculatePoints(example.basePoints)}
              </p>
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(230,183,173,0.4)' }}>
                points
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}