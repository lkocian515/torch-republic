import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Small, non-intrusive floating card on the homepage.
// Appears after 4 seconds, dismissible, positioned above the mobile bottom nav.
const PUMPKIN_SPICE_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/81a11c090_tcr_coffee_blank_final_latest4.jpeg';

const STORAGE_KEY = 'tr_seasonal_card_dismissed';

export default function SeasonalFloatingCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch (_) {}

    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed z-[150] left-3 right-3 md:left-auto md:right-6 md:w-[340px]"
          style={{ bottom: 'calc(var(--bottom-nav-height, 60px) + env(safe-area-inset-bottom) + 12px)' }}
        >
          <div
            className="relative flex items-center gap-3 overflow-hidden"
            style={{
              background: '#2A1A12',
              border: '1px solid #5D2F20',
              borderRadius: '14px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              padding: '12px 14px',
            }}
          >
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#F7EEDD' }}
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <img
              src={PUMPKIN_SPICE_IMAGE}
              alt=""
              className="h-16 w-12 flex-shrink-0 object-contain"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            />

            <Link
              to="/products/pumpkin-spice-whole-bean-coffee"
              onClick={dismiss}
              className="flex-1 pr-4"
              style={{ textDecoration: 'none' }}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-[0.15em]"
                style={{ color: '#D6743A' }}
              >
                Something wicked is brewing.
              </p>
              <p
                className="mt-1 font-heading text-sm font-semibold"
                style={{ color: '#F7EEDD', lineHeight: 1.35 }}
              >
                Meet our limited Pumpkin Spice whole bean coffee.
              </p>
              <p
                className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: '#D6743A' }}
              >
                Shop the drop &rarr;
              </p>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}