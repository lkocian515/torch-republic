import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronDown, Pause, Play, SkipForward, RefreshCw, Check } from 'lucide-react';

const FREQUENCIES = [
  { value: 'weekly', label: 'Every Week' },
  { value: 'biweekly', label: 'Every 2 Weeks' },
  { value: 'monthly', label: 'Every Month' },
  { value: 'bimonthly', label: 'Every 2 Months' },
];

// Mock subscription state — in a real integration this would come from Shopify subscriptions API
const MOCK_SUB = {
  id: 'TRB-00142',
  status: 'active', // active | paused
  plan: 'Monthly Mushroom Coffee Subscription',
  nextDelivery: 'May 3, 2026',
  frequency: 'monthly',
  price: '$24.99 / month',
  lastDelivery: 'April 3, 2026',
};

export default function SubscriptionManager() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(MOCK_SUB);
  const [frequency, setFrequency] = useState(sub.frequency);
  const [toast, setToast] = useState(null);
  const [confirmSkip, setConfirmSkip] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePauseResume = () => {
    const next = sub.status === 'active' ? 'paused' : 'active';
    setSub(s => ({ ...s, status: next }));
    showToast(next === 'paused' ? 'Subscription paused.' : 'Subscription resumed!');
  };

  const handleSkip = () => {
    setConfirmSkip(false);
    // Advance next delivery by 1 interval (visual only)
    setSub(s => ({ ...s, nextDelivery: 'June 3, 2026' }));
    showToast('Next delivery skipped.');
  };

  const handleFrequencyChange = (val) => {
    setFrequency(val);
    setSub(s => ({ ...s, frequency: val }));
    showToast('Shipping frequency updated.');
  };

  const isPaused = sub.status === 'paused';

  return (
    <div className="border mb-6" style={{ borderColor: 'rgba(201,162,74,0.2)', background: '#0B0B0B' }}>
      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A24A' }} />
          <div>
            <p className="font-mono text-[11px] tracking-[0.35em] uppercase font-bold" style={{ color: '#F0EBE1' }}>
              Manage Subscription
            </p>
            <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(240,235,225,0.35)' }}>
              {sub.plan} · {isPaused ? 'Paused' : `Next: ${sub.nextDelivery}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5"
            style={{
              background: isPaused ? 'rgba(255,255,255,0.05)' : 'rgba(201,162,74,0.1)',
              border: isPaused ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(201,162,74,0.25)',
              color: isPaused ? 'rgba(255,255,255,0.3)' : '#C9A24A',
            }}>
            {isPaused ? 'Paused' : 'Active'}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.5)' }} />
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
            <div className="px-6 pb-6 space-y-6" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>

              {/* Subscription details */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-5">
                {[
                  { label: 'Plan', value: sub.plan },
                  { label: 'Price', value: sub.price },
                  { label: 'Next Delivery', value: isPaused ? '—' : sub.nextDelivery },
                  { label: 'Last Delivery', value: sub.lastDelivery },
                  { label: 'Subscription ID', value: sub.id },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3" style={{ background: '#111', border: '1px solid rgba(201,162,74,0.07)' }}>
                    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(201,162,74,0.45)' }}>{label}</p>
                    <p className="font-mono text-xs font-bold" style={{ color: 'rgba(240,235,225,0.8)' }}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Shipping frequency */}
              <div>
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.55)' }}>
                  Shipping Frequency
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {FREQUENCIES.map(f => (
                    <button
                      key={f.value}
                      onClick={() => handleFrequencyChange(f.value)}
                      className="flex items-center justify-between px-3 py-2.5 transition-all"
                      style={{
                        background: frequency === f.value ? 'rgba(201,162,74,0.1)' : 'transparent',
                        border: frequency === f.value ? '1px solid rgba(201,162,74,0.4)' : '1px solid rgba(201,162,74,0.1)',
                        color: frequency === f.value ? '#C9A24A' : 'rgba(240,235,225,0.45)',
                      }}
                    >
                      <span className="font-mono text-[10px] tracking-wide">{f.label}</span>
                      {frequency === f.value && <Check className="w-3 h-3 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {/* Pause / Resume */}
                <button
                  onClick={handlePauseResume}
                  className="flex items-center justify-center gap-2 py-3 px-5 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
                  style={{
                    border: '1px solid rgba(201,162,74,0.25)',
                    color: isPaused ? '#C9A24A' : 'rgba(240,235,225,0.55)',
                    background: isPaused ? 'rgba(201,162,74,0.06)' : 'transparent',
                  }}
                >
                  {isPaused
                    ? <><Play className="w-3.5 h-3.5" /> Resume Deliveries</>
                    : <><Pause className="w-3.5 h-3.5" /> Pause Subscription</>
                  }
                </button>

                {/* Skip next */}
                {!isPaused && !confirmSkip && (
                  <button
                    onClick={() => setConfirmSkip(true)}
                    className="flex items-center justify-center gap-2 py-3 px-5 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
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
                      className="flex-1 py-3 font-mono text-[10px] tracking-[0.25em] uppercase transition-all hover:opacity-80"
                      style={{ background: 'rgba(201,162,74,0.12)', border: '1px solid rgba(201,162,74,0.3)', color: '#C9A24A' }}>
                      Confirm Skip
                    </button>
                  </div>
                )}
              </div>

              {/* Change plan link */}
              <div className="flex items-center gap-2 pt-1">
                <RefreshCw className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.35)' }} />
                <a href="https://torch-republic.com/account/subscriptions" target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60 pb-px"
                  style={{ color: 'rgba(201,162,74,0.5)', borderBottom: '1px solid rgba(201,162,74,0.18)' }}>
                  Change plan or cancel on Shopify →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mx-6 mb-4 flex items-center gap-2 px-4 py-2.5"
            style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.25)' }}
          >
            <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C9A24A' }} />
            <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.7)' }}>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}