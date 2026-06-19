import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { SUBSCRIBE_SAVE_PERCENT, SUBSCRIBE_SAVE_RATE } from '@/lib/siteConfig';

const RG = '#E6B7AD';

const FREQUENCIES = [
  { label: 'Every 2 weeks', value: '2w' },
  { label: 'Every 4 weeks', value: '4w' },
  { label: 'Every 8 weeks', value: '8w' },
];

export default function CartSubscriptionPromo({ subtotal }) {
  const [frequency, setFrequency] = useState('4w');
  const savings = (subtotal * SUBSCRIBE_SAVE_RATE).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="mb-4 p-4"
      style={{
        background: 'rgba(230,183,173,0.04)',
        border: '1px solid rgba(230,183,173,0.15)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <RefreshCw className="w-3.5 h-3.5" style={{ color: RG }} />
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>
          Subscribe & Save {SUBSCRIBE_SAVE_PERCENT}%
        </p>
      </div>
      <p className="font-mono text-[8px] tracking-[0.1em] mb-3" style={{ color: 'rgba(245,239,230,0.55)' }}>
        Save <span className="font-bold" style={{ color: RG }}>${savings}</span> on this order when you subscribe
      </p>

      {/* Frequency selector */}
      <div className="flex flex-wrap gap-2 mb-3">
        {FREQUENCIES.map(freq => (
          <button
            key={freq.value}
            onClick={() => setFrequency(freq.value)}
            className="font-mono text-[8px] tracking-[0.1em] uppercase py-2 px-3 transition-all"
            style={{
              background: frequency === freq.value ? 'rgba(230,183,173,0.12)' : 'transparent',
              border: `1px solid ${frequency === freq.value ? 'rgba(230,183,173,0.35)' : 'rgba(230,183,173,0.12)'}`,
              color: frequency === freq.value ? RG : 'rgba(245,239,230,0.5)',
            }}
          >
            {freq.label}
          </button>
        ))}
      </div>

      <p className="font-mono text-[7.5px] tracking-[0.1em]" style={{ color: 'rgba(245,239,230,0.4)' }}>
        Pause or cancel anytime — no commitments
      </p>
    </motion.div>
  );
}