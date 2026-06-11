import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Flame, Gift, Zap, CheckCircle, Copy, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';
const GOLD = '#C8A96E';

const REWARDS = [
  { points: 100, label: '10% Off',    code: 'LOYALTY10',   icon: '✦' },
  { points: 250, label: '25% Off',    code: 'LOYALTY25',   icon: '✦✦' },
  { points: 500, label: 'Free Tube',  code: 'LOYALTYFREE', icon: '✦✦✦' },
];

// Tier logic
function getTier(lifetime) {
  if (lifetime >= 500) return { name: 'Torchbearer Elite',  color: GOLD,   min: 500,  next: null };
  if (lifetime >= 250) return { name: 'Torchbearer',        color: RG,     min: 250,  next: 500 };
  if (lifetime >= 100) return { name: 'Kindler',            color: '#A8D5BA', min: 100, next: 250 };
  return                       { name: 'Spark',             color: '#7A9EA8', min: 0,   next: 100 };
}

export default function LoyaltySection({ user }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    base44.entities.LoyaltyPoints.filter({ user_id: user.id }).then(records => {
      if (records.length > 0) setRecord(records[0]);
      setLoading(false);
    });
  }, [user?.id]);

  const handleRedeem = async (reward) => {
    if (!record || record.points < reward.points) return;
    if (record.redeemed_codes?.includes(reward.code)) return;
    setRedeeming(reward.code);
    const updated = await base44.entities.LoyaltyPoints.update(record.id, {
      points: record.points - reward.points,
      redeemed_codes: [...(record.redeemed_codes || []), reward.code],
    });
    setRecord(updated);
    setRedeeming(null);
    copyCode(reward.code);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2500);
  };

  if (loading) {
    return (
      <div className="mb-6 animate-pulse" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '2px', padding: '32px' }}>
        <div className="h-4 rounded w-1/3 mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="h-10 rounded w-1/2" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>
    );
  }

  const points = record?.points ?? 0;
  const lifetime = record?.lifetime_points ?? 0;
  const redeemed = record?.redeemed_codes ?? [];
  const tier = getTier(lifetime);

  // Progress to next tier
  const nextTierProgress = tier.next
    ? Math.min(((lifetime - tier.min) / (tier.next - tier.min)) * 100, 100)
    : 100;

  // Progress to next reward
  const nextReward = REWARDS.find(r => points < r.points);
  const rewardProgressPct = nextReward ? Math.min((points / nextReward.points) * 100, 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
      style={{ background: '#0A0908', border: `1px solid ${RG}22`, borderRadius: '2px', overflow: 'hidden' }}
    >
      {/* Top accent line */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${RG}80, ${GOLD}60, transparent)` }} />

      <div className="p-6 md:p-8">

        {/* Section header */}
        <div className="flex items-center gap-2.5 mb-6">
          <Flame size={16} style={{ color: RG }} />
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: `${RG}80` }}>
            Torchbearer Rewards
          </p>
        </div>

        {/* Tier badge + points */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 mb-3"
              style={{ background: `${tier.color}12`, border: `1px solid ${tier.color}35`, borderRadius: '2px' }}
            >
              <Trophy size={11} style={{ color: tier.color }} />
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold" style={{ color: tier.color }}>
                {tier.name}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-serif font-black" style={{ fontSize: '3.5rem', lineHeight: 1, color: RG }}>
                {points.toLocaleString()}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                pts available
              </span>
            </div>
          </div>

          {/* Lifetime stat */}
          <div
            className="sm:ml-auto text-right px-5 py-4"
            style={{ background: `${GOLD}08`, border: `1px solid ${GOLD}20`, borderRadius: '2px' }}
          >
            <div className="flex items-center gap-1.5 justify-end mb-1">
              <Star size={11} style={{ color: GOLD }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: `${GOLD}70` }}>
                Lifetime Earned
              </p>
            </div>
            <p className="font-serif font-black text-2xl" style={{ color: GOLD, lineHeight: 1 }}>
              {lifetime.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Tier progress */}
        {tier.next && (
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <span>{tier.name}</span>
              <span>{tier.next - lifetime} pts to next tier</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${nextTierProgress}%`, background: `linear-gradient(90deg, ${tier.color}80, ${tier.color})` }}
              />
            </div>
          </div>
        )}

        {/* How to earn strip */}
        <div
          className="flex items-start gap-2.5 mb-8 p-3"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px' }}
        >
          <Zap size={13} style={{ color: RG, flexShrink: 0, marginTop: '1px' }} />
          <p className="font-mono text-[9px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Earn <span style={{ color: RG }}>10 pts</span> per order ·{' '}
            <span style={{ color: RG }}>50 pts</span> for subscribing ·{' '}
            <span style={{ color: RG }}>25 pts</span> for a review
          </p>
        </div>

        {/* Reward progress bar */}
        {nextReward && (
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <span>{points} pts</span>
              <span>{nextReward.points} pts — {nextReward.label}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${rewardProgressPct}%`, background: RG }}
              />
            </div>
          </div>
        )}

        {/* Rewards grid */}
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Redeem Rewards
        </p>
        <div className="space-y-2.5">
          {REWARDS.map(reward => {
            const alreadyRedeemed = redeemed.includes(reward.code);
            const canRedeem = points >= reward.points && !alreadyRedeemed;

            return (
              <div
                key={reward.code}
                className="flex items-center justify-between px-4 py-3.5"
                style={{
                  background: alreadyRedeemed ? `${RG}08` : canRedeem ? `${RG}06` : 'rgba(255,255,255,0.015)',
                  border: `1px solid ${alreadyRedeemed ? RG + '40' : canRedeem ? RG + '30' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '2px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: canRedeem || alreadyRedeemed ? RG : 'rgba(255,255,255,0.15)', fontSize: '10px', letterSpacing: '2px' }}>
                    {reward.icon}
                  </span>
                  <div>
                    <p className="font-mono text-xs font-bold" style={{ color: canRedeem || alreadyRedeemed ? '#F5EFE6' : 'rgba(255,255,255,0.3)' }}>
                      {reward.label}
                    </p>
                    <p className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {reward.points} pts · code: {reward.code}
                    </p>
                  </div>
                </div>

                {alreadyRedeemed ? (
                  <button
                    onClick={() => copyCode(reward.code)}
                    className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-opacity hover:opacity-75"
                    style={{ background: `${RG}15`, border: `1px solid ${RG}40`, color: RG, borderRadius: '2px' }}
                  >
                    {copied === reward.code ? <CheckCircle size={10} /> : <Copy size={10} />}
                    {copied === reward.code ? 'Copied!' : 'Copy Code'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canRedeem || redeeming === reward.code}
                    className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={canRedeem
                      ? { background: RG, color: '#040404', borderRadius: '2px', fontWeight: 700 }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '2px' }
                    }
                  >
                    {redeeming === reward.code ? '...' : 'Redeem'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Redeemed codes history */}
        {redeemed.length > 0 && (
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Redeemed Codes
            </p>
            <div className="flex flex-wrap gap-2">
              {redeemed.map(code => (
                <button
                  key={code}
                  onClick={() => copyCode(code)}
                  className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 transition-opacity hover:opacity-70"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', borderRadius: '2px' }}
                >
                  <CheckCircle size={9} style={{ color: '#10B981' }} />
                  {copied === code ? 'Copied!' : code}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Zero state message */}
        {!record && (
          <div className="mt-4 p-4 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '2px' }}>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Points are awarded after your first order.
            </p>
          </div>
        )}

      </div>
    </motion.div>
  );
}