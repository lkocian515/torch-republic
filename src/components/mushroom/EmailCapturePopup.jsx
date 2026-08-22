import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT } from '@/lib/siteConfig';
import openModalRegistry from '@/lib/openModalRegistry.js';

const CLAY = '#B86543';
const INK = '#2D2824';
const BODY = '#6A5A4A';
const CARD = '#FFFFFF';
const CREAM = '#FBF8F2';
const RG = '#E6B7AD';

/**
 * Timed email capture popup — fires after 20s on first visit.
 * Separate from exit-intent popup. Uses localStorage so it
 * only shows once per browser (not just session).
 */
export default function EmailCapturePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('email_capture_shown')) return;
    if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/email-campaign') || window.location.pathname.startsWith('/traffic-report') || window.location.pathname.startsWith('/research')) return;
    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem('email_capture_shown', '1');
    }, 20000); // 20 seconds
    return () => clearTimeout(timer);
  }, []);

  // Register while open so other popups (ReviewPopup) defer
  useEffect(() => {
    if (!visible) return;
    const unregister = openModalRegistry.register('email_capture');
    return () => unregister();
  }, [visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    base44.entities.EmailSubscriber.create({ email, source: 'timed_popup', discount_code: WELCOME_DISCOUNT_CODE });
    base44.functions.invoke('sendWelcomeEmail', { email, discount_code: WELCOME_DISCOUNT_CODE });
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          style={{ background: 'rgba(45,40,36,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-sm overflow-hidden"
            style={{ background: CARD, border: `1px solid ${RG}40`, borderRadius: '16px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Accent line */}
            <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${CLAY}80, transparent)` }} />

            <div className="p-8 text-center">
              <button onClick={() => setVisible(false)}
                className="absolute top-4 right-4 transition-opacity hover:opacity-60"
                style={{ color: BODY }}>
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center mb-4">
                <Sparkles size={18} style={{ color: CLAY }} />
              </div>

              {submitted ? (
                <>
                  <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.4rem', color: INK }}>
                    Check your inbox ☕
                  </h3>
                  <p className="font-mono text-[10px] mb-4" style={{ color: BODY, lineHeight: 1.8 }}>
                    Your code is on the way.
                  </p>
                  <div style={{ background: `${CLAY}12`, border: `1px solid ${CLAY}40`, padding: '10px 16px', display: 'inline-block', borderRadius: '8px' }}>
                    <span className="font-mono font-bold tracking-[0.3em]" style={{ color: CLAY }}>{WELCOME_DISCOUNT_CODE}</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-3" style={{ color: CLAY }}>
                    First Time Customer
                  </p>
                  <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.5rem', lineHeight: 1.15, color: INK }}>
                    {WELCOME_DISCOUNT_PERCENT}% off your<br />
                    <span style={{ color: CLAY }}>first order.</span>
                  </h3>
                  <p className="font-mono text-[10px] mb-6" style={{ color: BODY, lineHeight: 1.8 }}>
                    Join our community and get an instant discount code + exclusive wellness tips.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3.5 text-sm font-mono text-center outline-none"
                      style={{
                        background: CREAM,
                        border: `1px solid ${RG}40`,
                        color: INK,
                        fontSize: '13px',
                        borderRadius: '10px',
                      }}
                    />
                    <button type="submit"
                      className="w-full py-3.5 font-mono font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-85"
                      style={{ fontSize: '10px', background: CLAY, color: '#FBF8F1', borderRadius: '999px' }}>
                      Get {WELCOME_DISCOUNT_PERCENT}% Off →
                    </button>
                  </form>
                </>
              )}

              <button onClick={() => setVisible(false)}
                className="mt-4 font-mono text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: BODY }}>
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}