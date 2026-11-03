import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Check } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, FREE_SHIPPING_THRESHOLD_DISPLAY } from '@/lib/siteConfig';

const ACCENT = '#9B4E2F';
const INK = '#32190F';
const BORDER = '#B89A6D';

export default function CartFreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isUnlocked = remaining <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full p-3"
      style={{
        background: isUnlocked ? 'rgba(16,185,129,0.06)' : 'rgba(184,101,67,0.05)',
        border: `1px solid ${isUnlocked ? 'rgba(16,185,129,0.25)' : BORDER}`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        {isUnlocked ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(16,185,129,0.15)' }}
          >
            <Check className="w-4 h-4" style={{ color: '#264A35' }} />
          </motion.div>
        ) : (
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,101,67,0.1)' }}>
            <Truck className="w-4 h-4" style={{ color: ACCENT }} />
          </div>
        )}
        <p className="font-mono text-xs tracking-[0.08em] uppercase" style={{ color: isUnlocked ? '#264A35' : INK }}>
          {isUnlocked ? (
            '✓ Free standard shipping applied'
          ) : remaining < 1 ? (
            /* A few cents short states the policy and stops there — the gap is
               never turned into a penny count. */
            <>Free standard shipping on orders {FREE_SHIPPING_THRESHOLD_DISPLAY}</>
          ) : (
            <>Add <span className="font-bold" style={{ color: ACCENT }}>${Math.ceil(remaining)}</span> for free standard shipping</>
          )}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: '#F7F2E9' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isUnlocked
              ? 'linear-gradient(90deg, #264A35, #34D399)'
              : `linear-gradient(90deg, ${ACCENT}, #E6AC45)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}