import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
          className="fixed bottom-24 md:bottom-6 z-[200] w-[calc(100%-24px)] max-w-[400px] left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2.5 px-3.5 md:px-5 py-3.5 w-full"
            style={{ background: '#13110F', border: '1px solid rgba(230,183,173,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" style={{ color: '#E6B7AD' }} />
              <p className="font-mono text-[8.5px] md:text-[10px] tracking-[0.22em] md:tracking-[0.3em] uppercase font-bold text-center" style={{ color: '#E6B7AD' }}>
                Added to your ritual.
              </p>
            </div>
            <p className="font-heading text-[10.5px] md:text-xs text-center leading-snug px-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {toast}
            </p>
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => {
                  clearToast();
                  window.location.href = '/cart';
                }}
                className="flex-1 font-mono text-[8.5px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] uppercase py-2.5 text-center transition-all hover:opacity-90 min-h-[38px]"
                style={{ background: '#E6B7AD', color: '#080808', fontWeight: 700, textDecoration: 'none', border: 'none', cursor: 'pointer' }}>
                View Cart
              </button>
              <Link
                to="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearToast();
                  window.location.href = '/shop';
                }}
                className="flex-1 font-mono text-[8.5px] md:text-[9px] tracking-[0.2em] md:tracking-[0.25em] uppercase py-2.5 text-center transition-all hover:border-rose-gold min-h-[38px]"
                style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.6)' }}
              >
                Keep Shopping
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}