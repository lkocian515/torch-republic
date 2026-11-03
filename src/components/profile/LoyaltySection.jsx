import React, { useState, useEffect } from 'react';
import { ensureLoyaltyRecord, redeemReward } from '@/lib/loyalty';
import { Flame, Zap, CheckCircle, Copy, Trophy, Star, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RG = '#E6AC45';
const CLAY = '#9B4E2F';
const CARD = '#FFFCF7';
const CREAM = '#F7F2E9';
const INK = '#32190F';
const SECONDARY = '#5E4639';
const BORDER = '#B89A6D';
const GOLD = '#B89535';
const MOSS = '#264A35';

const REWARDS = [
  { points: 100, label: '10% Off',    code: 'LOYALTY10',   icon: '✦' },
  { points: 250, label: '25% Off',    code: 'LOYALTY25',   icon: '✦✦' },
  { points: 500, label: 'Free Tube',  code: 'LOYALTYFREE', icon: '✦✦✦' },
];

// Tier logic
function getTier(lifetime) {
  if (lifetime >= 500) return { name: 'Torchbearer Elite',  color: GOLD,   min: 500,  next: null };
  if (lifetime >= 250) return { name: 'Torchbearer',        color: CLAY,   min: 250,  next: 500 };
  if (lifetime >= 100) return { name: 'Kindler',            color: MOSS,   min: 100,  next: 250 };
  return                       { name: 'Spark',             color: CLAY,   min: 0,    next: 100 };
}

export default function LoyaltySection({ user }) {
  const [record, setRecord] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [redeemError, setRedeemError] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!user?.id) return;
      try {
        const { record, activity } = await ensureLoyaltyRecord(user);
        if (cancelled) return;
        if (record) setRecord(record);
        setActivity(activity);
      } catch (err) {
        if (cancelled) return;
      }
      setLoading(false);
    };

    load();
    return () => { cancelled = true; };
  }, [user?.id]);

  const handleRedeem = async (reward) => {
    if (!record || record.points < reward.points) return;
    if (record.redeemed_codes?.includes(reward.code)) return;

    // Optimistic: the balance drops and the code is marked redeemed on touch,
    // before the request resolves. The exact pre-tap record and activity are
    // held so a failed request can put everything back.
    const previousRecord = record;
    const previousActivity = activity;
    const optimisticId = `optimistic-${reward.code}-${Date.now()}`;
    const optimisticActivity = {
      id: optimisticId,
      type: 'redeem',
      points: reward.points,
      label: `Redeemed ${reward.label}`,
      created_date: new Date().toISOString(),
    };

    setRedeemError(null);
    setRedeeming(reward.code);
    setRecord({
      ...previousRecord,
      points: previousRecord.points - reward.points,
      redeemed_codes: [...(previousRecord.redeemed_codes || []), reward.code],
    });
    setActivity(prev => [optimisticActivity, ...prev].slice(0, 10));

    try {
      const { record: updated, activity: newActivity } = await redeemReward(user, previousRecord, reward);
      setRecord(updated);
      setActivity(prev => [newActivity, ...prev.filter(a => a.id !== optimisticId)].slice(0, 10));
      copyCode(reward.code);
    } catch (err) {
      // Roll back to the exact state before the tap.
      setRecord(previousRecord);
      setActivity(previousActivity);
      setRedeemError("We couldn't complete that redemption. Your points are unchanged — please try again.");
    }
    setRedeeming(null);
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2500);
  };

  if (loading) {
    return (
      <div className="mb-6 animate-pulse" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: '32px' }}>
        <div className="h-4 rounded w-1/3 mb-4" style={{ background: BORDER }} />
        <div className="h-10 rounded w-1/2" style={{ background: BORDER }} />
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
      style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', overflow: 'hidden' }}
    >
      {/* Top accent line */}
      <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${RG}, ${GOLD}, transparent)` }} />

      <div className="p-6 md:p-8">

        {/* Section header */}
        <div className="flex items-center gap-2.5 mb-6">
          <Flame size={16} style={{ color: CLAY }} />
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: CLAY }}>
            Republic Rewards
          </p>
        </div>

        {/* Tier badge + points */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 mb-3"
              style={{ background: `${tier.color}14`, border: `1px solid ${tier.color}40`, borderRadius: '4px' }}
            >
              <Trophy size={11} style={{ color: tier.color }} />
              <span className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold" style={{ color: tier.color }}>
                {tier.name}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-serif font-black" style={{ fontSize: '3.5rem', lineHeight: 1, color: tier.color }}>
                {points.toLocaleString()}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: SECONDARY }}>
                pts available
              </span>
            </div>
          </div>

          {/* Lifetime stat */}
          <div
            className="sm:ml-auto text-right px-5 py-4"
            style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '4px' }}
          >
            <div className="flex items-center gap-1.5 justify-end mb-1">
              <Star size={11} style={{ color: GOLD }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: SECONDARY }}>
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
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest mb-2" style={{ color: SECONDARY }}>
              <span>{tier.name}</span>
              <span>{tier.next - lifetime} pts to next tier</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: BORDER }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${nextTierProgress}%`, background: `linear-gradient(90deg, ${tier.color}99, ${tier.color})` }}
              />
            </div>
          </div>
        )}

        {/* How to earn strip */}
        <div
          className="flex items-start gap-2.5 mb-8 p-3"
          style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '4px' }}
        >
          <Zap size={13} style={{ color: CLAY, flexShrink: 0, marginTop: '1px' }} />
          <p className="font-mono text-[9px] leading-relaxed" style={{ color: SECONDARY }}>
            Earn <span style={{ color: CLAY }}>10 pts</span> per order ·{' '}
            <span style={{ color: CLAY }}>50 pts</span> for subscribing ·{' '}
            <span style={{ color: CLAY }}>25 pts</span> for a review
          </p>
        </div>

        {/* Reward progress bar */}
        {nextReward && (
          <div className="mb-6">
            <div className="flex justify-between font-mono text-[8px] uppercase tracking-widest mb-2" style={{ color: SECONDARY }}>
              <span>{points} pts</span>
              <span>{nextReward.points} pts — {nextReward.label}</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: BORDER }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${rewardProgressPct}%`, background: CLAY }}
              />
            </div>
          </div>
        )}

        {/* Rewards grid */}
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: SECONDARY }}>
          Redeem Republic Rewards
        </p>
        {redeemError && (
          <div className="mb-4 px-3 py-2.5" style={{ background: `${CLAY}10`, border: `1px solid ${CLAY}40`, borderRadius: '4px' }}>
            <p className="font-mono text-[9px] leading-relaxed" style={{ color: CLAY }}>
              {redeemError}
            </p>
          </div>
        )}
        <div className="space-y-2.5">
          {REWARDS.map(reward => {
            const alreadyRedeemed = redeemed.includes(reward.code);
            const canRedeem = points >= reward.points && !alreadyRedeemed;

            return (
              <div
                key={reward.code}
                className="flex items-center justify-between px-4 py-3.5"
                style={{
                  background: alreadyRedeemed ? `${RG}18` : canRedeem ? `${CLAY}0C` : CARD,
                  border: `1px solid ${alreadyRedeemed ? `${RG}55` : canRedeem ? `${CLAY}40` : BORDER}`,
                  borderRadius: '4px',
                }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ color: canRedeem || alreadyRedeemed ? CLAY : '#9C948A', fontSize: '10px', letterSpacing: '2px' }}>
                    {reward.icon}
                  </span>
                  <div>
                    <p className="font-mono text-xs font-bold" style={{ color: canRedeem || alreadyRedeemed ? INK : SECONDARY }}>
                      {reward.label}
                    </p>
                    <p className="font-mono text-[8px]" style={{ color: SECONDARY }}>
                      {reward.points} pts · code: {reward.code}
                    </p>
                  </div>
                </div>

                {alreadyRedeemed ? (
                  <button
                    onClick={() => copyCode(reward.code)}
                    className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-opacity hover:opacity-75"
                    style={{ background: `${RG}25`, border: `1px solid ${RG}55`, color: CLAY, borderRadius: '4px' }}
                  >
                    {copied === reward.code ? <CheckCircle size={10} /> : <Copy size={10} />}
                    {copied === reward.code ? 'Copied!' : 'Copy Code'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canRedeem || redeeming === reward.code}
                    className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={canRedeem
                      ? { background: CLAY, color: '#FFFCF7', borderRadius: '4px', fontWeight: 700, border: `1px solid ${CLAY}` }
                      : { background: CARD, color: SECONDARY, border: `1px solid ${BORDER}`, borderRadius: '4px' }
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
          <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: SECONDARY }}>
              Redeemed Codes
            </p>
            <div className="flex flex-wrap gap-2">
              {redeemed.map(code => (
                <button
                  key={code}
                  onClick={() => copyCode(code)}
                  className="flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 transition-opacity hover:opacity-70"
                  style={{ background: CREAM, border: `1px solid ${BORDER}`, color: SECONDARY, borderRadius: '4px' }}
                >
                  <CheckCircle size={9} style={{ color: MOSS }} />
                  {copied === code ? 'Copied!' : code}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Zero state message */}
        {!record && (
          <div className="mt-4 p-4 text-center" style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '4px' }}>
            <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: SECONDARY }}>
              Points are awarded after your first order.
            </p>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={12} style={{ color: SECONDARY }} />
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: SECONDARY }}>
              Recent Activity
            </p>
          </div>

          {activity.length === 0 ? (
            <p className="font-mono text-[9px]" style={{ color: SECONDARY }}>
              No activity yet — earn points with your first order.
            </p>
          ) : (
            <div className="space-y-2">
              {activity.map((item) => {
                const isEarn = item.type === 'earn';
                const color = isEarn ? MOSS : CLAY;
                const date = item.created_date
                  ? new Date(item.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  : '';
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-3 py-2.5"
                    style={{ background: CREAM, border: `1px solid ${BORDER}`, borderRadius: '4px' }}
                  >
                    <div className="flex items-center gap-2.5">
                      {isEarn
                        ? <TrendingUp size={12} style={{ color, flexShrink: 0 }} />
                        : <TrendingDown size={12} style={{ color, flexShrink: 0 }} />
                      }
                      <div>
                        <p className="font-mono text-[9px] font-medium" style={{ color: INK }}>
                          {item.label}
                        </p>
                        {date && (
                          <p className="font-mono text-[8px]" style={{ color: SECONDARY }}>
                            {date}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color }}>
                      {isEarn ? '+' : '−'}{item.points} pts
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}