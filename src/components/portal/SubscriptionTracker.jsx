import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Coffee, Clock, Edit2, CheckCircle, ArrowRight, Loader2, AlertCircle, Play, Pause, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

export default function SubscriptionTracker({ sub, subLoading, actionLoading, selectedFreq, onFrequencyChange, onPauseResume, showToast }) {
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

  const isPaused = sub.status === 'paused';
  
  // Calculate next delivery date display
  const nextDelivery = sub.nextDelivery || '—';
  const nextBlend = sub.productTitle || '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mb-6"
      style={{
        background: 'rgba(230,183,173,0.06)',
        border: `1px solid ${RG}25`,
        borderRadius: '4px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={20} style={{ color: RG }} />
          <h3 className="font-serif font-bold" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>
            Your Subscription Tracker
          </h3>
        </div>
        {isPaused && (
          <span className="px-3 py-1 rounded-sm font-mono text-[7px] tracking-[0.25em] uppercase" style={{ background: `${RG}20`, color: RG, border: `1px solid ${RG}30` }}>
            Paused
          </span>
        )}
      </div>

      {/* Tracker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Next Delivery Date */}
        <div className="p-4" style={{ background: '#0F0E0E', border: `1px solid ${RG}15`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} style={{ color: `${RG}70` }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
              Next Delivery
            </p>
          </div>
          <p className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
            {isPaused ? '—' : nextDelivery}
          </p>
          {!isPaused && (
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-2" style={{ color: `${EMERALD}80` }}>
              On track
            </p>
          )}
        </div>

        {/* Next Blend */}
        <div className="p-4" style={{ background: '#0F0E0E', border: `1px solid ${RG}15`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Coffee size={16} style={{ color: `${RG}70` }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
              Next Blend
            </p>
          </div>
          <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>
            {nextBlend}
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-2" style={{ color: `${RG}50` }}>
            {sub.interval === 'week' ? `Every ${sub.intervalCount} week${sub.intervalCount > 1 ? 's' : ''}` : `Every ${sub.intervalCount} month${sub.intervalCount > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Frequency Edit */}
        <div className="p-4" style={{ background: '#0F0E0E', border: `1px solid ${RG}15`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Edit2 size={16} style={{ color: `${RG}70` }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
              Delivery Frequency
            </p>
          </div>
          <p className="font-serif font-bold text-sm mb-3" style={{ color: '#F5EFE6' }}>
            {selectedFreq?.label || '—'}
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>
            {sub.interval === 'week' ? `Every ${sub.intervalCount} week${sub.intervalCount > 1 ? 's' : ''}` : `Every ${sub.intervalCount} month${sub.intervalCount > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Visual Timeline */}
      {!isPaused && (
        <div className="p-4" style={{ background: 'rgba(230,183,173,0.04)', border: `1px solid ${RG}15`, borderRadius: '3px' }}>
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: `${RG}50` }}>
            Upcoming Deliveries
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1" style={{ background: `${RG}20` }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '30%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', background: RG }}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: RG }} />
              <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: RG }}>
                Next
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}40` }}>
              Today
            </span>
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}40` }}>
              {nextDelivery}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}