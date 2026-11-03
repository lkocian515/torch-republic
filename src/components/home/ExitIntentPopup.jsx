import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT } from '@/lib/siteConfig';
import openModalRegistry from '@/lib/openModalRegistry.js';

const CLAY = '#9B4E2F';
const INK = '#32190F';
const BODY = '#5E4639';
const CARD = '#FFFCF7';
const CREAM = '#F7F2E9';
const RG = '#E6AC45';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit_shown')) return;
    if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/email-campaign') || window.location.pathname.startsWith('/traffic-report') || window.location.pathname.startsWith('/research')) return;

    const timer = setTimeout(() => {
      const handleMouseLeave = (e) => {
        if (e.clientY <= 0) {
          setVisible(true);
          sessionStorage.setItem('exit_shown', '1');
          document.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Register while open so other popups (ReviewPopup) defer
  useEffect(() => {
    if (!visible) return;
    const unregister = openModalRegistry.register('exit_intent');
    return () => unregister();
  }, [visible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    base44.entities.EmailSubscriber.create({ email, source: 'exit_intent', discount_code: WELCOME_DISCOUNT_CODE });
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
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(45,40,36,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-md text-center overflow-hidden"
            style={{ background: CARD, border: `1px solid ${RG}40`, borderRadius: '16px' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Ambient glow */}
            <div style={{ position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)', width: '120%', height: '60%', background: `radial-gradient(ellipse, ${CLAY}12 0%, transparent 70%)`, pointerEvents: 'none' }} />

            {/* Top accent line */}
            <div style={{ height: '2px', background: `linear-gradient(90deg, transparent 0%, ${CLAY}60 40%, ${CLAY}80 60%, transparent 100%)` }} />

            <div className="p-10 relative z-10">
              <button onClick={() => setVisible(false)}
                className="absolute top-4 right-4 transition-opacity hover:opacity-60"
                style={{ color: BODY }}>
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center mb-4">
                <div style={{ border: `1px solid ${RG}40`, borderRadius: '50%', padding: '10px' }}>
                  <Coffee size={20} style={{ color: CLAY }} />
                </div>
              </div>

              <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-4" style={{ color: CLAY }}>
                Before You Go
              </p>

              {submitted ? (
                <div className="py-4">
                  <h2 className="font-serif font-bold mb-3" style={{ fontSize: '1.7rem', color: INK }}>
                    You're in. ☕
                  </h2>
                  <p className="font-mono text-xs mb-3" style={{ color: BODY, lineHeight: 1.8 }}>
                    Check your inbox for your discount code.
                  </p>
                  <div style={{ background: `${CLAY}12`, border: `1px solid ${CLAY}40`, padding: '12px 20px', display: 'inline-block', borderRadius: '8px' }}>
                    <span className="font-mono font-bold tracking-[0.3em]" style={{ color: CLAY, fontSize: '1rem' }}>{WELCOME_DISCOUNT_CODE}</span>
                  </div>
                  <p className="font-mono text-[8px] mt-3" style={{ color: BODY }}>{WELCOME_DISCOUNT_PERCENT}% off your first order · applies at checkout</p>
                </div>
              ) : (
                <>
                  <h2 className="font-serif font-bold mb-3" style={{ fontSize: '1.8rem', lineHeight: 1.1, color: INK }}>
                    Get {WELCOME_DISCOUNT_PERCENT}% off<br />
                    <span style={{ color: CLAY }}>your first order.</span>
                  </h2>

                  <p className="font-mono text-xs mb-7 max-w-xs mx-auto" style={{ color: BODY, lineHeight: 1.8 }}>
                    Enter your email and we'll send you a discount code instantly. No spam, ever.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-5 py-4 text-sm font-mono text-center outline-none"
                      style={{
                        background: CREAM,
                        border: `1px solid ${RG}40`,
                        color: INK,
                        fontSize: '13px',
                        borderRadius: '10px',
                      }}
                    />
                    <button type="submit"
                      className="w-full py-4 font-mono font-bold uppercase tracking-[0.3em] transition-opacity hover:opacity-85"
                      style={{ fontSize: '11px', background: CLAY, color: '#F7F2E9', borderRadius: '999px' }}>
                      Claim My {WELCOME_DISCOUNT_PERCENT}% Off
                    </button>
                  </form>
                </>
              )}

              <button onClick={() => setVisible(false)}
                className="mt-5 font-mono text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
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