import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const ACCENT = '#B86543';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

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
        color: ACCENT,
        bg: 'rgba(184,101,67,0.05)',
        border: BORDER,
      };
    }
    return {
      text: 'Most customers choose 3 products to create their ritual',
      icon: null,
      color: MUTED,
      bg: 'rgba(184,101,67,0.03)',
      border: BORDER,
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