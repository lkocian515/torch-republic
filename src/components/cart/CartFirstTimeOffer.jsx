import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT } from '@/lib/siteConfig';

const ACCENT = '#B86543';
const INK = '#2D2824';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

export default function CartFirstTimeOffer() {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  // Only show for non-authenticated users (first-time visitors)
  if (isLoadingAuth || isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full p-3 mb-4"
      style={{
        background: 'linear-gradient(135deg, rgba(184,101,67,0.07) 0%, rgba(214,178,122,0.05) 100%)',
        border: `1px solid ${BORDER}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(184,101,67,0.1)' }}>
          <Gift className="w-4 h-4" style={{ color: ACCENT }} />
        </div>
        <div>
          <p className="font-serif font-bold text-sm" style={{ color: INK }}>
            Welcome to Torch Republic
          </p>
          <p className="font-mono text-xs tracking-[0.06em]" style={{ color: MUTED }}>
            Enjoy {WELCOME_DISCOUNT_PERCENT}% off your first order with code{' '}
            <span className="font-bold" style={{ color: ACCENT }}>{WELCOME_DISCOUNT_CODE}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}