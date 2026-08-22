import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/siteConfig';

const ACCENT = '#B86543';
const BTN_TEXT = '#FBF8F1';
const INK = '#2D2824';
const MUTED = '#9A8A7A';
const BORDER = '#E4D8C9';

export default function CartToast() {
  const { toast, clearToast, subtotal } = useCart();
  const navigate = useNavigate();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isUnlocked = remaining <= 0;

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className="fixed bottom-20 md:bottom-6 left-0 right-0 z-[200] flex justify-center px-4"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div 
            className="w-full max-w-[400px]"
            style={{ 
              background: '#FFFFFF', 
              border: `1px solid ${BORDER}`, 
              boxShadow: '0 8px 40px rgba(45,40,36,0.12)', 
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div className="flex items-center gap-2 mb-2.5 justify-center">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} />
              <p className="font-mono text-[8px] md:text-[10px] tracking-[0.25em] uppercase font-bold text-center" style={{ color: ACCENT }}>
                Added to your ritual
              </p>
            </div>
            <p className="font-heading text-[10px] md:text-xs text-center leading-relaxed mb-3" style={{ color: MUTED }}>
              {toast}
            </p>
            {/* Compact free shipping progress */}
            <div className="w-full mb-3">
              <p className="font-mono text-[7px] tracking-[0.1em] text-center mb-1.5" style={{ color: isUnlocked ? '#10B981' : ACCENT }}>
                {isUnlocked
                  ? '✓ You\'ve unlocked FREE shipping'
                  : <>You're <span className="font-bold" style={{ color: ACCENT }}>${remaining.toFixed(2)}</span> away from FREE shipping</>}
              </p>
              <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: '#F3ECE2' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: isUnlocked ? 'linear-gradient(90deg, #10B981, #34D399)' : `linear-gradient(90deg, ${ACCENT}, #D6B27A)` }} />
              </div>
            </div>
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearToast();
                  navigate('/cart');
                }}
                className="flex-1 font-mono text-[8px] md:text-[10px] tracking-[0.22em] uppercase font-bold py-2.5 md:py-3 text-center transition-all hover:opacity-90 active:scale-[0.98] min-h-[40px]"
                style={{ background: ACCENT, color: BTN_TEXT, borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                View Cart
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clearToast();
                  navigate('/shop');
                }}
                className="flex-1 font-mono text-[8px] md:text-[10px] tracking-[0.22em] uppercase font-bold py-2.5 md:py-3 text-center transition-all hover:opacity-90 active:scale-[0.98] min-h-[40px]"
                style={{ border: `1px solid ${BORDER}`, color: ACCENT, background: 'transparent', borderRadius: '4px', cursor: 'pointer' }}>
                Keep Shopping
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}