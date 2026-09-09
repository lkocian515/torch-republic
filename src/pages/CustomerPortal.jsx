import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';

import SubscriptionTracker from '../components/portal/SubscriptionTracker';
import {
  Package,
  Gift,
  Zap,
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle,
  ChevronRight,
  RefreshCw,
  Pause,
  Play,
  SkipForward,
  Loader2,
  AlertCircle,
  ExternalLink,
  Star,
  ArrowRight
} from 'lucide-react';

const RG = '#E6B7AD';
const CLAY = '#B7653E';
const PAGE = '#FBF8F2';
const CARD = '#FFFFFF';
const CREAM = '#FBF8F1';
const INK = '#2D2824';
const SECONDARY = '#5F574F';
const BORDER = '#E4D8C9';
const MOSS = '#566047';

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

const FREQUENCIES = [
  { label: 'Every Week', interval: 'week', intervalCount: 1 },
  { label: 'Every Month', interval: 'month', intervalCount: 1 },
  { label: 'Every 2 Months', interval: 'month', intervalCount: 2 },
];

export default function CustomerPortal() {
  useSEO({
    title: 'Customer Portal',
    description: 'Manage your Torch Republic subscription and loyalty rewards.',
    url: '/portal',
    noindex: true,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [sub, setSub] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState(null);
  const [toast, setToast] = useState(null);

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

  const { data: loyaltyData, isLoading: loyaltyLoading } = useQuery({
    queryKey: ['loyalty', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const records = await base44.entities.LoyaltyPoints.filter({ user_id: user.id });
      return records[0] || { points: 0, lifetime_points: 0, redeemed_codes: [] };
    },
    enabled: !!user?.id,
  });

  const fetchSub = async () => {
    setSubLoading(true);
    const res = await base44.functions.invoke('getSubscription', {});
    if (res.data?.subscription) {
      setSub(res.data.subscription);
      const match = FREQUENCIES.find(f => f.interval === res.data.subscription.interval && f.intervalCount === res.data.subscription.intervalCount);
      setSelectedFreq(match || FREQUENCIES[2]);
    }
    setSubLoading(false);
  };

  useEffect(() => {
    if (user) fetchSub();
  }, [user]);

  const doAction = async (action, extra = {}) => {
    setActionLoading(true);
    await base44.functions.invoke('updateSubscription', {
      action,
      contractId: sub.id,
      interval: sub.interval,
      intervalCount: sub.intervalCount,
      ...extra,
    });
    await fetchSub();
    setActionLoading(false);
  };

  const handlePauseResume = async () => {
    const action = sub.status === 'active' ? 'pause' : 'resume';
    await doAction(action);
    showToast(action === 'pause' ? 'Subscription paused.' : 'Subscription resumed!');
  };

  const handleFrequency = async (freq) => {
    setSelectedFreq(freq);
    await doAction('frequency', { interval: freq.interval, intervalCount: freq.intervalCount });
    showToast('Shipping frequency updated.');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAGE, padding: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="font-serif font-bold mb-4" style={{ fontSize: '2rem', color: INK }}>
            Member Access
          </h1>
          <p className="font-heading mb-8" style={{ color: SECONDARY }}>
            Sign in to access your customer portal
          </p>
          <Link
            to="/login"
            className="inline-block font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
            style={{
              background: CLAY,
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loyaltyLoading || subLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: PAGE }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: CLAY, borderTopColor: 'transparent' }} />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: CLAY }}>Loading...</p>
        </div>
      </div>
    );
  }

  const isPaused = sub?.status === 'paused';

  return (
    <div className="min-h-screen" style={{ background: PAGE, paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px 60px', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: CLAY }}>
              Customer Portal
            </p>
            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: INK, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Welcome Back, {user?.full_name || 'Member'}
            </h1>
            <p className="font-heading mt-4" style={{ fontSize: '0.95rem', color: SECONDARY, fontWeight: 300, lineHeight: 1.8 }}>
              Manage your subscription, track loyalty points, and customize your monthly blends.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mt-8 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: Star },
              { id: 'subscription', label: 'Subscription', icon: Package },
              { id: 'loyalty', label: 'Loyalty', icon: Gift },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm whitespace-nowrap transition-all font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{
                  background: activeTab === tab.id ? `${CLAY}14` : CARD,
                  border: activeTab === tab.id ? `1px solid ${CLAY}55` : `1px solid ${BORDER}`,
                  color: activeTab === tab.id ? CLAY : SECONDARY,
                }}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(40px, 6vw, 60px) 24px' }}>
        <div className="max-w-[1200px] mx-auto">

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Loyalty Summary */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 'clamp(20px, 3vw, 28px)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Gift size={18} style={{ color: CLAY }} />
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: CLAY }}>
                    Loyalty Balance
                  </p>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-serif font-bold" style={{ fontSize: '2.5rem', color: INK, lineHeight: 1 }}>
                    {points.toLocaleString()}
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: CLAY }}>
                    points
                  </span>
                </div>
                <p className="font-heading text-xs mb-4" style={{ color: SECONDARY }}>
                  Lifetime: <span style={{ color: INK }}>{lifetimePoints.toLocaleString()}</span> points
                </p>
                {nextTier && (
                  <div>
                    <div className="flex justify-between font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: SECONDARY }}>
                      <span>{nextTier.points - points} pts to {nextTier.discount}</span>
                      <span>{nextTier.label}</span>
                    </div>
                    <div style={{ height: 3, background: BORDER, borderRadius: 2, overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                        style={{ height: '100%', background: `linear-gradient(90deg, ${CLAY} 0%, ${RG} 100%)` }}
                      />
                    </div>
                  </div>
                )}
                <Link
                  to="/loyalty"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-80"
                  style={{ color: CLAY, borderBottom: `1px solid ${CLAY}40` }}
                >
                  View Full Portal <ArrowRight size={12} />
                </Link>
              </div>

              {/* Subscription Summary */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 'clamp(20px, 3vw, 28px)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Package size={18} style={{ color: CLAY }} />
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: CLAY }}>
                    Subscription
                  </p>
                </div>
                {sub ? (
                  <>
                    <p className="font-serif font-bold text-lg mb-2" style={{ color: INK }}>
                      {sub.productTitle}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1" style={{ color: SECONDARY }}>Status</p>
                        <p className="font-mono text-sm font-bold" style={{ color: isPaused ? SECONDARY : MOSS }}>
                          {isPaused ? 'Paused' : 'Active'}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1" style={{ color: SECONDARY }}>Next Delivery</p>
                        <p className="font-mono text-sm font-bold" style={{ color: INK }}>
                          {isPaused ? '—' : (sub.nextDelivery || '—')}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/subscription"
                      className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-80 py-2 px-4 rounded-sm"
                      style={{ background: `${CLAY}14`, border: `1px solid ${CLAY}40`, color: CLAY }}
                    >
                      Manage Subscription <ChevronRight size={12} />
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="font-heading text-sm mb-4" style={{ color: SECONDARY }}>
                      No active subscription
                    </p>
                    <Link
                      to="/subscription"
                      className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase transition-all hover:opacity-90 py-2 px-4 rounded-sm"
                      style={{ background: CLAY, color: '#FFFFFF', fontWeight: 700 }}
                    >
                      Start Subscription <ChevronRight size={12} />
                    </Link>
                  </>
                )}
              </div>

              {/* Quick Actions */}
              <div className="md:col-span-2" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '8px', padding: 'clamp(20px, 3vw, 28px)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={18} style={{ color: CLAY }} />
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: CLAY }}>
                    Quick Actions
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    to="/shop"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm transition-all font-mono text-[9px] tracking-[0.25em] uppercase"
                    style={{ background: `${CLAY}10`, border: `1px solid ${CLAY}30`, color: CLAY }}
                  >
                    <ShoppingBag size={14} /> Shop Blends
                  </Link>
                  <Link
                    to="/loyalty"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm transition-all font-mono text-[9px] tracking-[0.25em] uppercase"
                    style={{ background: `${CLAY}10`, border: `1px solid ${CLAY}30`, color: CLAY }}
                  >
                    <Gift size={14} /> Redeem Rewards
                  </Link>
                  <a
                    href="https://torchrepublic.com/account/subscriptions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm transition-all font-mono text-[9px] tracking-[0.25em] uppercase"
                    style={{ background: `${CLAY}10`, border: `1px solid ${CLAY}30`, color: CLAY }}
                  >
                    <ExternalLink size={14} /> Full Account
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <SubscriptionTracker
                sub={sub}
                subLoading={subLoading}
                actionLoading={actionLoading}
                selectedFreq={selectedFreq}
                onFrequencyChange={handleFrequency}
                onPauseResume={handlePauseResume}
                showToast={showToast}
              />
            </motion.div>
          )}

          {/* Loyalty Tab */}
          {activeTab === 'loyalty' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Points Card */}
              <div style={{ background: `linear-gradient(135deg, ${RG}22 0%, ${RG}0A 100%)`, border: `1px solid ${RG}55`, borderRadius: '8px', padding: 'clamp(24px, 4vw, 32px)', marginBottom: '32px' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: CLAY }}>
                      Current Balance
                    </p>
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif font-bold" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: INK, lineHeight: 1 }}>
                        {points.toLocaleString()}
                      </span>
                      <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: CLAY }}>
                        points
                      </span>
                    </div>
                    {lifetimePoints > 0 && (
                      <p className="font-heading text-xs mt-3" style={{ color: SECONDARY }}>
                        Lifetime earned: <span style={{ color: INK }}>{lifetimePoints.toLocaleString()}</span> points
                      </p>
                    )}
                  </div>

                  {nextTier && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: SECONDARY }}>
                          Next: {nextTier.points.toLocaleString()} pts
                        </p>
                        <p className="font-mono text-[7px] tracking-[0.2em]" style={{ color: CLAY }}>
                          {nextTier.discount} OFF
                        </p>
                      </div>
                      <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(progressPercent, 100)}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          style={{ height: '100%', background: `linear-gradient(90deg, ${CLAY} 0%, ${RG} 100%)` }}
                        />
                      </div>
                      <p className="font-heading text-[10px] mt-2" style={{ color: SECONDARY }}>
                        {nextTier.points - points} points to {nextTier.discount} off
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reward Tiers */}
              <div className="mb-8">
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: CLAY }}>
                  Reward Tiers
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {REWARD_TIERS.map((tier, i) => (
                    <div
                      key={tier.points}
                      style={{
                        background: points >= tier.points ? `${RG}18` : CARD,
                        border: points >= tier.points ? `1px solid ${RG}55` : `1px solid ${BORDER}`,
                        borderRadius: '6px',
                        padding: '24px 20px',
                        textAlign: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: points >= tier.points ? `${RG}28` : CREAM,
                          border: `1px solid ${points >= tier.points ? RG : BORDER}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 16px',
                        }}
                      >
                        {points >= tier.points ? <CheckCircle size={18} style={{ color: CLAY }} /> : <span style={{ color: '#B5A89A', fontSize: '1.2rem' }}>🔒</span>}
                      </div>
                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: SECONDARY }}>
                        {tier.points.toLocaleString()} pts
                      </p>
                      <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: points >= tier.points ? INK : '#9C948A' }}>
                        {tier.label}
                      </h3>
                      <p className="font-mono text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: points >= tier.points ? CLAY : '#B5A89A' }}>
                        {tier.discount} OFF
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earning Rules */}
              <div>
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: CLAY }}>
                  How to Earn
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                  {EARNING_RULES.map((rule, i) => (
                    <div
                      key={rule.action}
                      style={{
                        background: CARD,
                        border: `1px solid ${BORDER}`,
                        borderRadius: '6px',
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
                          background: `${RG}25`,
                          border: `1px solid ${RG}55`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <rule.icon size={16} style={{ color: CLAY }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-serif font-bold text-sm" style={{ color: INK }}>{rule.action}</p>
                        <p className="font-mono text-[8px] tracking-[0.25em] uppercase mt-1" style={{ color: CLAY }}>{rule.points}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center gap-3 px-5 py-3 rounded-sm"
            style={{ background: CARD, border: `1px solid ${CLAY}30` }}
          >
            <CheckCircle className="w-4 h-4" style={{ color: CLAY }} />
            <span className="font-mono text-[10px]" style={{ color: INK }}>{toast}</span>
          </motion.div>
        </div>
      )}
    </div>
  );
}