import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Check } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/siteConfig';

const RG = '#E6B7AD';

export default function CartFreeShippingBar({ subtotal }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isUnlocked = remaining <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full p-4 mb-6"
      style={{
        background: isUnlocked ? 'rgba(16,185,129,0.06)' : 'rgba(230,183,173,0.04)',
        border: `1px solid ${isUnlocked ? 'rgba(16,185,129,0.25)' : 'rgba(230,183,173,0.15)'}`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        {isUnlocked ? (
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(16,185,129,0.15)' }}>
            <Check className="w-4 h-4" style={{ color: '#10B981' }} />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(230,183,173,0.1)' }}>
            <Truck className="w-4 h-4" style={{ color: RG }} />
          </div>
        )}
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: isUnlocked ? '#10B981' : 'rgba(245,239,230,0.85)' }}>
          {isUnlocked
            ? 'Congratulations! You\'ve unlocked FREE shipping'
            : <>You're only <span className="font-bold" style={{ color: RG }}>${remaining.toFixed(2)}</span> away from FREE shipping</>}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(230,183,173,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isUnlocked
              ? 'linear-gradient(90deg, #10B981, #34D399)'
              : `linear-gradient(90deg, ${RG}, #D6B27A)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}