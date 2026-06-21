import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const RG = '#E6B7AD';

export default function CartBundleIncentive({ itemCount }) {
  if (!itemCount || itemCount < 1) return null;

  const getMessage = () => {
    if (itemCount >= 3) {
      return {
        text: 'Ritual Bundle unlocked',
        icon: Check,
        color: '#10B981',
        bg: 'rgba(16,185,129,0.06)',
        border: 'rgba(16,185,129,0.2)',
      };
    }
    if (itemCount === 2) {
      return {
        text: 'Add one more product and complete your ritual',
        icon: null,
        color: RG,
        bg: 'rgba(230,183,173,0.04)',
        border: 'rgba(230,183,173,0.12)',
      };
    }
    return {
      text: 'Most customers choose 3 products to create their ritual',
      icon: null,
      color: 'rgba(245,239,230,0.6)',
      bg: 'rgba(230,183,173,0.03)',
      border: 'rgba(230,183,173,0.08)',
    };
  };

  const msg = getMessage();
  const Icon = msg.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={msg.text}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-3 py-2.5 mb-4"
        style={{ background: msg.bg, border: `1px solid ${msg.border}` }}
      >
        {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: msg.color }} />}
        <p className="font-mono text-[9px] tracking-[0.1em]" style={{ color: msg.color, lineHeight: 1.5 }}>
          {msg.text}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}