import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, Pause, Play, SkipForward, RefreshCw, Check, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const RG = '#C9A24A';

const FREQUENCIES = [
  { label: 'Every Week', interval: 'week', intervalCount: 1 },
  { label: 'Every 2 Weeks', interval: 'week', intervalCount: 2 },
  { label: 'Every Month', interval: 'month', intervalCount: 1 },
  { label: 'Every 2 Months', interval: 'month', intervalCount: 2 },
];

export default function SubscriptionManager() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [noSub, setNoSub] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmSkip, setConfirmSkip] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const fetchSub = async () => {
    setLoading(true);
    const res = await base44.functions.invoke('getSubscription', {});
    if (res.data?.subscription) {
      setSub(res.data.subscription);
      // Set selected frequency to match current sub
      const match = FREQUENCIES.find(f => f.interval === res.data.subscription.interval && f.intervalCount === res.data.subscription.intervalCount);
      setSelectedFreq(match || FREQUENCIES[2]);
    } else {
      setNoSub(true);
    }
    setLoading(false);
  };

  useEffect(() => { fetchSub(); }, []);

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

  const handleSkip = async () => {
    setConfirmSkip(false);
    await doAction('skip');
    showToast('Next delivery skipped.');
  };

  const handleFrequency = async (freq) => {
    setSelectedFreq(freq);
    await doAction('frequency', { interval: freq.interval, intervalCount: freq.intervalCount });
    showToast('Shipping frequency updated.');
  };

  const isPaused = sub?.status === 'paused';

  return (
    <div className="border mb-6" style={{ borderColor: `${RG}22`, background: '#0B0B0B' }}>
      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 flex-shrink-0" style={{ color: RG }} />
          <div>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase font-bold" style={{ color: '#F0EBE1' }}>
              Manage Subscription
            </p>
            <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(240,235,225,0.35)' }}>
              {loading ? 'Loading...' : noSub ? 'No active subscription' : sub?.productTitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!loading && !noSub && sub && (
            <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5"
              style={{
                background: isPaused ? 'rgba(255,255,255,0.04)' : `${RG}12`,
                border: isPaused ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${RG}30`,
                color: isPaused ? 'rgba(255,255,255,0.3)' : RG,
              }}>
              {isPaused ? 'Paused' : 'Active'}
            </span>
          )}
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" style={{ color: `${RG}55` }} />
          </motion.div>
        </div>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-6" style={{ borderTop: `1px solid ${RG}10` }}>

              {/* Loading */}
              {loading && (
                <div className="flex items-center justify-center gap-3 py-10">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: `${RG}60` }} />
                  <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: `${RG}50` }}>Loading subscription…</span>
                </div>
              )}

              {/* No subscription */}
              {!loading && noSub && (
                <div className="py-8 text-center space-y-4">
                  <AlertCircle className="w-6 h-6 mx-auto" style={{ color: `${RG}40` }} />
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>
                    No active subscription found for your account.
                  </p>
                  <a href="https://torchrepublic.com/subscription" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-70"
                    style={{ color: RG, borderBottom: `1px solid ${RG}30` }}>
                    Start a subscription <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Subscription details */}
              {!loading && sub && (
                <div className="space-y-6 pt-5">

                  {/* Info grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: 'Product', value: sub.productTitle },
                      { label: 'Price', value: sub.price },
                      { label: 'Next Delivery', value: isPaused ? '—' : (sub.nextDelivery || '—') },
                      { label: 'Frequency', value: selectedFreq?.label || '—' },
                      { label: 'Status', value: sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1) },
                      { label: 'Order Origin', value: sub.orderId || '—' },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3" style={{ background: '#111', border: `1px solid ${RG}09` }}>
                        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: `${RG}45` }}>{label}</p>
                        <p className="font-mono text-xs font-bold" style={{ color: 'rgba(240,235,225,0.8)' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Frequency selector */}
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: `${RG}55` }}>
                      Delivery Frequency
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {FREQUENCIES.map(f => {
                        const active = selectedFreq?.interval === f.interval && selectedFreq?.intervalCount === f.intervalCount;
                        return (
                          <button
                            key={`${f.interval}-${f.intervalCount}`}
                            onClick={() => !actionLoading && handleFrequency(f)}
                            disabled={actionLoading}
                            className="flex items-center justify-between px-3 py-2.5 transition-all disabled:opacity-50"
                            style={{
                              background: active ? `${RG}12` : 'transparent',
                              border: active ? `1px solid ${RG}40` : `1px solid ${RG}12`,
                              color: active ? RG : 'rgba(240,235,225,0.45)',
                            }}
                          >
                            <span className="font-mono text-[10px] tracking-wide">{f.label}</span>
                            {active && <Check className="w-3 h-3 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Pause / Resume */}
                    <button
                      onClick={handlePauseResume}
                      disabled={actionLoading}
                      className="flex items-center justify-center gap-2 py-3 px-5 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
                      style={{
                        border: `1px solid ${RG}28`,
                        color: isPaused ? RG : 'rgba(240,235,225,0.55)',
                        background: isPaused ? `${RG}08` : 'transparent',
                      }}
                    >
                      {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
                        isPaused
                          ? <><Play className="w-3.5 h-3.5" /> Resume Deliveries</>
                          : <><Pause className="w-3.5 h-3.5" /> Pause Subscription</>
                      }
                    </button>

                    {/* Skip next */}
                    {!isPaused && !confirmSkip && (
                      <button
                        onClick={() => setConfirmSkip(true)}
                        disabled={actionLoading}
                        className="flex items-center justify-center gap-2 py-3 px-5 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
                        style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,235,225,0.4)' }}
                      >
                        <SkipForward className="w-3.5 h-3.5" /> Skip Next Delivery
                      </button>
                    )}
                    {confirmSkip && (
                      <div className="flex gap-2 flex-1">
                        <button onClick={() => setConfirmSkip(false)}
                          className="flex-1 py-3 font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-70"
                          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(240,235,225,0.4)' }}>
                          Cancel
                        </button>
                        <button onClick={handleSkip}
                          disabled={actionLoading}
                          className="flex-1 py-3 font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
                          style={{ background: `${RG}14`, border: `1px solid ${RG}32`, color: RG }}>
                          {actionLoading ? 'Skipping…' : 'Confirm Skip'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Shopify portal link */}
                  <div className="flex items-center gap-2 pt-1">
                    <RefreshCw className="w-3 h-3 flex-shrink-0" style={{ color: `${RG}38` }} />
                    <a href="https://torchrepublic.com/account/subscriptions" target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60 pb-px"
                      style={{ color: `${RG}55`, borderBottom: `1px solid ${RG}20` }}>
                      Full subscription portal on Shopify →
                    </a>
                  </div>
                </div>
              )}

              {/* Toast */}
              <AnimatePresence>
                {toast && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-5 flex items-center gap-2 px-4 py-2.5"
                    style={{ background: `${RG}10`, border: `1px solid ${RG}25` }}
                  >
                    <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: RG }} />
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.7)' }}>{toast}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}