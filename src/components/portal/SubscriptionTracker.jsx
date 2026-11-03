import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Coffee, Clock, Edit2, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';
const CLAY = '#9B4E2F';
const CARD = '#FFFCF7';
const INK = '#32190F';
const SECONDARY = '#5E4639';
const BORDER = '#B89A6D';
const MOSS = '#264A35';

export default function SubscriptionTracker({ sub, subLoading, actionLoading, selectedFreq, onFrequencyChange, onPauseResume, showToast }) {
  if (subLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: `${CLAY}80` }} />
      </div>
    );
  }

  if (!sub) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-8 h-8 mx-auto mb-4" style={{ color: `${CLAY}80` }} />
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: SECONDARY }}>
          No active subscription found
        </p>
        <Link
          to="/subscription"
          className="inline-block font-mono uppercase tracking-[0.28em] transition-all hover:opacity-90"
          style={{ background: CLAY, color: '#FFFCF7', fontSize: '0.7rem', fontWeight: 700, padding: '14px 36px', borderRadius: '2px' }}
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
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: '4px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar size={20} style={{ color: CLAY }} />
          <h3 className="font-serif font-bold" style={{ fontSize: '1.3rem', color: INK }}>
            Your Subscription Tracker
          </h3>
        </div>
        {isPaused && (
          <span className="px-3 py-1 rounded-sm font-mono text-[7px] tracking-[0.25em] uppercase" style={{ background: `${RG}30`, color: CLAY, border: `1px solid ${RG}55` }}>
            Paused
          </span>
        )}
      </div>

      {/* Tracker Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Next Delivery Date */}
        <div className="p-4" style={{ background: '#F7F2E9', border: `1px solid ${BORDER}`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} style={{ color: CLAY }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: SECONDARY }}>
              Next Delivery
            </p>
          </div>
          <p className="font-serif font-bold text-lg" style={{ color: INK }}>
            {isPaused ? '—' : nextDelivery}
          </p>
          {!isPaused && (
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-2" style={{ color: MOSS }}>
              On track
            </p>
          )}
        </div>

        {/* Next Blend */}
        <div className="p-4" style={{ background: '#F7F2E9', border: `1px solid ${BORDER}`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Coffee size={16} style={{ color: CLAY }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: SECONDARY }}>
              Next Blend
            </p>
          </div>
          <p className="font-serif font-bold text-sm" style={{ color: INK }}>
            {nextBlend}
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-2" style={{ color: SECONDARY }}>
            {sub.interval === 'week' ? `Every ${sub.intervalCount} week${sub.intervalCount > 1 ? 's' : ''}` : `Every ${sub.intervalCount} month${sub.intervalCount > 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Frequency Edit */}
        <div className="p-4" style={{ background: '#F7F2E9', border: `1px solid ${BORDER}`, borderRadius: '3px' }}>
          <div className="flex items-center gap-2 mb-3">
            <Edit2 size={16} style={{ color: CLAY }} />
            <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: SECONDARY }}>
              Delivery Frequency
            </p>
          </div>
          <p className="font-serif font-bold text-sm mb-3" style={{ color: INK }}>
            {selectedFreq?.label || '—'}
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: SECONDARY }}>
            {sub.interval === 'week' ? `Every ${sub.intervalCount} week${sub.intervalCount > 1 ? 's' : ''}` : `Every ${sub.intervalCount} month${sub.intervalCount > 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Visual Timeline */}
      {!isPaused && (
        <div className="p-4" style={{ background: '#F7F2E9', border: `1px solid ${BORDER}`, borderRadius: '3px' }}>
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: SECONDARY }}>
            Upcoming Deliveries
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1" style={{ background: BORDER }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '30%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ height: '100%', background: CLAY }}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: CLAY }} />
              <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: CLAY }}>
                Next
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-3">
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: SECONDARY }}>
              Today
            </span>
            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: SECONDARY }}>
              {nextDelivery}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}