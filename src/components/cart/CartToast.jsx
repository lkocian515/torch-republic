import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';

export default function CartToast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className="fixed bottom-24 md:bottom-6 z-[200] w-[calc(100%-32px)] max-w-[400px] mx-4"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center gap-3 px-4 md:px-5 py-4 w-full"
            style={{ background: '#13110F', border: '1px solid rgba(230,183,173,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#E6B7AD' }} />
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] uppercase font-bold text-center" style={{ color: '#E6B7AD' }}>
                Added to your ritual.
              </p>
            </div>
            <p className="font-heading text-[11px] md:text-xs text-center leading-snug" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {toast}
            </p>
            <div className="flex items-center gap-2 md:gap-3 w-full">
              <Link
                to="/cart"
                className="flex-1 font-mono text-[8px] md:text-[9px] tracking-[0.22em] md:tracking-[0.25em] uppercase py-2.5 md:py-2.5 text-center transition-all hover:opacity-90 min-h-[40px] min-w-[120px]"
                style={{ background: '#E6B7AD', color: '#080808', fontWeight: 700, textDecoration: 'none' }}>
                View Cart
              </Link>
              <Link to="/shop"
                className="flex-1 font-mono text-[8px] md:text-[9px] tracking-[0.22em] md:tracking-[0.25em] uppercase py-2.5 md:py-2.5 text-center transition-all hover:border-rose-gold min-h-[40px] min-w-[120px]"
                style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.6)' }}>
                Keep Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}