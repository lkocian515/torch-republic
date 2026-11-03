import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertCircle, RefreshCw, Pause, Play, Loader2, Check } from 'lucide-react';

const RG = '#E6AC45';

const FREQUENCIES = [
  { label: 'Every Week', interval: 'week', intervalCount: 1 },
  { label: 'Every Month', interval: 'month', intervalCount: 1 },
  { label: 'Every 2 Months', interval: 'month', intervalCount: 2 },
];

export default function SubscriptionTab({ sub, subLoading, actionLoading, selectedFreq, onFrequencyChange, onPauseResume, showToast }) {
  const isPaused = sub?.status === 'paused';

  const handlePauseResume = async () => {
    const action = sub.status === 'active' ? 'pause' : 'resume';
    await onPauseResume(action);
    showToast(action === 'pause' ? 'Subscription paused.' : 'Subscription resumed!');
  };

  if (subLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: `${RG}60` }} />
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-8 h-8 mx-auto mb-4" style={{ color: `${RG}40` }} />
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(240,235,225,0.35)' }}>
          No active subscription found
        </p>
        <Link
          to="/subscription"
          className="inline-block font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
          style={{ background: RG, color: '#050505', fontSize: '0.7rem', fontWeight: 700, padding: '14px 36px', borderRadius: '2px' }}
        >
          Start Subscription
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
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

      {/* Frequency Selector */}
      <div className="mb-6">
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: `${RG}55` }}>
          Delivery Frequency
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {FREQUENCIES.map(f => {
            const active = selectedFreq?.interval === f.interval && selectedFreq?.intervalCount === f.intervalCount;
            return (
              <button
                key={`${f.interval}-${f.intervalCount}`}
                onClick={() => !actionLoading && onFrequencyChange(f)}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handlePauseResume}
          disabled={actionLoading}
          className="flex items-center justify-center gap-2 py-3.5 px-6 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80 disabled:opacity-50"
          style={{
            border: `1px solid ${RG}28`,
            color: isPaused ? RG : 'rgba(240,235,225,0.55)',
            background: isPaused ? `${RG}08` : 'transparent',
          }}
        >
          {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> :
            isPaused
              ? <><Play className="w-4 h-4" /> Resume Deliveries</>
              : <><Pause className="w-4 h-4" /> Pause Subscription</>
          }
        </button>

        <a
          href="https://torchrepublic.com/account/subscriptions"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 px-6 font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
          style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,235,225,0.4)' }}
        >
          <RefreshCw className="w-4 h-4" /> Full Subscription Portal
        </a>
      </div>
    </motion.div>
  );
}