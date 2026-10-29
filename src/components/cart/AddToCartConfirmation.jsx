import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const AUTO_DISMISS_MS = 5000;

const THEME = {
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  clay: '#B7653E',
  moss: '#566047',
};

/**
 * Non-blocking Add to Cart confirmation card.
 *
 * NOT a modal: no overlay, no body scroll lock, no focus trap.
 * The page remains fully interactive while the card is visible.
 */
export default function AddToCartConfirmation() {
  const { confirmation, clearConfirmation } = useCart();
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timerRef = useRef(null);
  const cardRef = useRef(null);

  // Auto-dismiss after 5s unless hovering or focusing
  useEffect(() => {
    if (!confirmation) return;
    if (isHovering || isFocused) {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setTimeout(() => clearConfirmation(), AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    };
  }, [confirmation, isHovering, isFocused, clearConfirmation]);

  // Escape to close
  useEffect(() => {
    if (!confirmation) return;
    const onKey = (e) => { if (e.key === 'Escape') clearConfirmation(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [confirmation, clearConfirmation]);

  // Click outside to close (no overlay needed)
  useEffect(() => {
    if (!confirmation) return;
    const onMouseDown = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        clearConfirmation();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [confirmation, clearConfirmation]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    };
  }, []);

  const handleViewCart = () => {
    clearConfirmation();
    navigate('/cart');
  };

  // One authoritative price source: unitPrice × quantity — never trust a
  // pre-computed line total that could disagree with the cart subtotal.
  // A set (e.g. both bags of a duo) arrives as { items: [...] } so every line
  // added is confirmed and the combined subtotal is what is shown.
  const lines = confirmation?.items?.length ? confirmation.items : confirmation ? [confirmation] : [];
  const priceOf = (line) => (line.shopifyPrice ? parseFloat(line.shopifyPrice) : line.price || 0);
  const totalQty = lines.reduce((sum, line) => sum + (line.qty || 1), 0);
  const subtotal = lines.reduce((sum, line) => sum + priceOf(line) * (line.qty || 1), 0).toFixed(2);
  const isSet = lines.length > 1;

  // The grind and size are what the shopper chose, so they are what the card
  // repeats back rather than an internal category name.
  const detailOf = (line) => {
    if (line.isSubscription) return line.sellingPlanName || 'Deliver every 4 weeks';
    const detail = [line.format, line.weight].filter(Boolean).join(' · ');
    return detail || 'One-time purchase';
  };

  return (
    <AnimatePresence>
      {confirmation && (
        <motion.div
          key="cart-confirmation"
          ref={cardRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
          className="fixed z-[80] left-3 right-3 md:left-auto md:right-6 md:w-[380px]"
          style={{
            bottom: 'calc(var(--bottom-nav-height) + 12px)',
            background: THEME.card,
            border: `1px solid ${THEME.border}`,
            borderRadius: 12,
            boxShadow: '0 8px 32px rgba(45,40,36,0.15)',
            overflow: 'hidden',
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${THEME.moss}20` }}>
                <Check className="w-3 h-3" style={{ color: THEME.moss }} strokeWidth={2.5} />
              </div>
              <span className="font-serif font-bold" style={{ color: THEME.text, fontSize: '1rem' }}>Added to Your Cart</span>
            </div>
            <button
              onClick={clearConfirmation}
              aria-label="Close confirmation"
              className="w-8 h-8 flex items-center justify-center rounded-md transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ color: THEME.secondary }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Every line that was just added, so a duo confirms as two bags */}
          <div className="flex flex-col gap-3 px-4 py-3">
            {lines.map((line, index) => (
              <div key={`${line.id || line.name}-${index}`} className="flex items-center gap-3">
                <img
                  src={line.image}
                  alt={line.imageAlt || line.name}
                  className="w-12 h-12 object-contain rounded-md flex-shrink-0"
                  style={{ background: '#F8F5EF', padding: 2 }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold truncate" style={{ color: THEME.text, fontSize: '0.875rem' }}>{line.name}</p>
                  <p
                    className="font-mono tracking-[0.15em] uppercase mt-0.5"
                    style={{ color: line.isSubscription ? THEME.clay : THEME.secondary, fontSize: '0.5625rem' }}
                  >
                    {detailOf(line)}
                  </p>
                </div>
                <p className="font-mono flex-shrink-0" style={{ color: THEME.secondary, fontSize: '0.75rem' }}>
                  Qty {line.qty || 1} &middot; ${(priceOf(line) * (line.qty || 1)).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {isSet && (
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderTop: `1px solid ${THEME.border}`, background: '#FBF8F2' }}
            >
              <span className="font-mono tracking-[0.15em] uppercase" style={{ color: THEME.secondary, fontSize: '0.625rem' }}>
                {totalQty} items subtotal
              </span>
              <span className="font-heading font-bold" style={{ color: THEME.text, fontSize: '0.875rem' }}>${subtotal}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 px-4 pb-4">
            <button
              onClick={handleViewCart}
              className="btn btn-primary flex-1"
              style={{ minHeight: 40, fontSize: '0.8125rem' }}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              View Cart
            </button>
            <button
              onClick={clearConfirmation}
              className="btn btn-secondary"
              style={{ minHeight: 40, fontSize: '0.8125rem' }}
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}