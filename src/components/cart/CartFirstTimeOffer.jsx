import React from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT } from '@/lib/siteConfig';

const RG = '#E6B7AD';

export default function CartFirstTimeOffer() {
  const { isAuthenticated, isLoadingAuth } = useAuth();

  // Only show for non-authenticated users (first-time visitors)
  if (isLoadingAuth || isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full p-4 mb-6"
      style={{
        background: 'linear-gradient(135deg, rgba(230,183,173,0.08) 0%, rgba(214,178,122,0.05) 100%)',
        border: '1px solid rgba(230,183,173,0.2)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(230,183,173,0.12)' }}>
          <Gift className="w-4 h-4" style={{ color: RG }} />
        </div>
        <div>
          <p className="font-serif font-bold text-sm" style={{ color: '#F5EFE6' }}>
            Welcome to Torch Republic
          </p>
          <p className="font-mono text-[9px] tracking-[0.1em]" style={{ color: 'rgba(230,183,173,0.7)' }}>
            Enjoy {WELCOME_DISCOUNT_PERCENT}% off your first order with code{' '}
            <span className="font-bold" style={{ color: RG }}>{WELCOME_DISCOUNT_CODE}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}