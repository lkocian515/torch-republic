import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';
import { SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';

export default function CartToast() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className="fixed bottom-24 md:bottom-6 left-1/2 z-[200] flex flex-col items-center"
          style={{ transform: 'translateX(-50%)', minWidth: 300 }}
        >
          <div className="flex flex-col items-center gap-3 px-6 py-4 w-full"
            style={{ background: '#13110F', border: '1px solid rgba(230,183,173,0.3)', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4" style={{ color: '#E6B7AD' }} />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#E6B7AD' }}>
                Added to your ritual.
              </p>
            </div>
            <p className="font-heading text-xs text-center" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {toast}
            </p>
            <div className="flex items-center gap-3 w-full">
              <a
                href={SHOPIFY_CART_URL}
                className="flex-1 font-mono text-[9px] tracking-[0.25em] uppercase py-2.5 text-center transition-all hover:opacity-90"
                style={{ background: '#E6B7AD', color: '#080808', fontWeight: 700, textDecoration: 'none' }}>
                View Cart
              </a>
              <Link to="/shop"
                className="flex-1 font-mono text-[9px] tracking-[0.25em] uppercase py-2.5 text-center transition-all hover:border-rose-gold"
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