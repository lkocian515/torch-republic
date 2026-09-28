import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Small, non-intrusive floating card on the homepage.
// Appears after 4 seconds, dismissible, positioned above the mobile bottom nav.
const PUMPKIN_SPICE_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8390f4ba6_file_00000000333081f6826a284f26569cc8.png';

const STORAGE_KEY = 'tr_seasonal_card_dismissed';

export default function SeasonalFloatingCard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch (_) {}

    // Show after 8s OR after the user scrolls past 250px — whichever comes first.
    // This lets first-time visitors see the brand before an overlay appears.
    let timer;
    const onScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
        clearTimeout(timer);
      }
    };
    timer = setTimeout(() => {
      setVisible(true);
      window.removeEventListener('scroll', onScroll);
    }, 8000);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
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
              padding: '10px 12px',
            }}
          >
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-70"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#F7EEDD' }}
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src={PUMPKIN_SPICE_IMAGE}
              alt=""
              loading="lazy"
              className="h-14 w-10 flex-shrink-0 object-contain"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
            />

            <Link
              to="/products/pumpkin-spice-whole-bean-coffee"
              onClick={dismiss}
              className="flex-1 pr-5"
              style={{ textDecoration: 'none' }}
            >
              <p
                className="font-heading text-sm font-semibold"
                style={{ color: '#F7EEDD', lineHeight: 1.3 }}
              >
                Meet our limited Pumpkin Spice whole bean coffee.
              </p>
              <p
                className="mt-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
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