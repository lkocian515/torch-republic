import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';

export default function CartToast() {
  const { toast, clearToast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className="fixed bottom-20 md:bottom-6 z-[200] w-[calc(100%-32px)] max-w-[420px] left-1/2 -translate-x-1/2"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex flex-col items-center gap-2.5 px-4 md:px-5 py-4 w-full"
            style={{ background: '#13110F', border: '1px solid rgba(230,183,173,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(230,183,173,0.08)', borderRadius: '8px' }}>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 md:w-4.5 md:h-4.5 flex-shrink-0" style={{ color: '#E6B7AD' }} />
              <p className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-bold text-center" style={{ color: '#E6B7AD' }}>
                Added to your ritual
              </p>
            </div>
            <p className="font-heading text-[11px] md:text-xs text-center leading-relaxed px-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {toast}
            </p>
            <div className="flex items-center gap-2 w-full pt-1">
              <button
                onClick={() => {
                  clearToast();
                  window.location.href = '/cart';
                }}
                className="flex-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-bold py-3 text-center transition-all hover:opacity-90 active:scale-[0.98] min-h-[44px]"
                style={{ background: '#E6B7AD', color: '#080808', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                View Cart
              </button>
              <button
                onClick={() => {
                  clearToast();
                  window.location.href = '/shop';
                }}
                className="flex-1 font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-bold py-3 text-center transition-all hover:border-rose-gold active:scale-[0.98] min-h-[44px]"
                style={{ border: '1px solid rgba(230,183,173,0.25)', color: 'rgba(230,183,173,0.7)', background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}>
                Keep Shopping
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}