import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Star, Gift, Zap, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';

const REWARDS = [
  { points: 100, discount: '10% off', code: 'LOYALTY10', label: '10% Discount' },
  { points: 250, discount: '25% off', code: 'LOYALTY25', label: '25% Discount' },
  { points: 500, discount: 'Free tube', code: 'LOYALTYFREE', label: 'Free Tube' },
];

export default function LoyaltySection({ user }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    loadRecord();
  }, [user?.id]);

  const loadRecord = async () => {
    setLoading(true);
    const records = await base44.entities.LoyaltyPoints.filter({ user_id: user.id });
    if (records.length > 0) {
      setRecord(records[0]);
    } else {
      // Create a starter record with 50 welcome points
      const created = await base44.entities.LoyaltyPoints.create({
        user_id: user.id,
        points: 50,
        lifetime_points: 50,
        redeemed_codes: [],
      });
      setRecord(created);
    }
    setLoading(false);
  };

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
      <div className="bg-card border border-border p-6 mb-6 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/3 mb-4" />
        <div className="h-10 bg-muted rounded w-1/2" />
      </div>
    );
  }

  const points = record?.points ?? 0;
  const lifetime = record?.lifetime_points ?? 0;
  const redeemed = record?.redeemed_codes ?? [];

  // Progress toward next reward
  const nextReward = REWARDS.find(r => points < r.points);
  const progressPct = nextReward ? Math.min((points / nextReward.points) * 100, 100) : 100;

  return (
    <div className="bg-card border border-border p-6 md:p-8 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Star size={18} style={{ color: RG }} />
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: RG }}>
          Torch Loyalty
        </p>
      </div>

      {/* Points balance */}
      <div className="flex items-end gap-3 mb-2">
        <span className="font-serif font-bold" style={{ fontSize: '3rem', lineHeight: 1, color: RG }}>
          {points}
        </span>
        <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-2">
          points available
        </span>
      </div>
      <p className="font-mono text-xs text-muted-foreground mb-6">
        {lifetime} lifetime points earned
      </p>

      {/* Progress bar */}
      {nextReward && (
        <div className="mb-8">
          <div className="flex justify-between font-mono text-xs text-muted-foreground mb-2">
            <span>{points} pts</span>
            <span>{nextReward.points} pts — {nextReward.label}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: RG }}
            />
          </div>
        </div>
      )}

      {/* How to earn */}
      <div className="flex items-center gap-2 mb-6 p-3 border border-border/50 bg-muted/30">
        <Zap size={13} style={{ color: RG, flexShrink: 0 }} />
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          Earn <span style={{ color: RG }}>10 pts</span> per order · <span style={{ color: RG }}>50 pts</span> for subscribing · <span style={{ color: RG }}>25 pts</span> for leaving a review
        </p>
      </div>

      {/* Rewards */}
      <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4">
        Redeem Rewards
      </p>
      <div className="space-y-3">
        {REWARDS.map(reward => {
          const alreadyRedeemed = redeemed.includes(reward.code);
          const canRedeem = points >= reward.points && !alreadyRedeemed;

          return (
            <div
              key={reward.code}
              className="flex items-center justify-between p-4 border"
              style={{ borderColor: canRedeem ? RG + '55' : 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <Gift size={15} style={{ color: canRedeem ? RG : 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                <div>
                  <p className="font-mono text-sm" style={{ color: canRedeem ? '#F5EFE6' : 'rgba(255,255,255,0.35)' }}>
                    {reward.label}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {reward.points} pts required
                  </p>
                </div>
              </div>

              {alreadyRedeemed ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyCode(reward.code)}
                    className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 border"
                    style={{ borderColor: RG + '55', color: RG }}
                  >
                    {copied === reward.code ? 'Copied!' : reward.code}
                  </button>
                  <CheckCircle size={14} style={{ color: RG }} />
                </div>
              ) : (
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canRedeem || redeeming === reward.code}
                  className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  style={canRedeem ? { borderColor: RG, color: '#040404', background: RG } : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}
                >
                  {redeeming === reward.code ? '...' : 'Redeem'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}