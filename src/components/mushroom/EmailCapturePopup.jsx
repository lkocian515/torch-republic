import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

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
    const timer = setTimeout(() => {
      setVisible(true);
      localStorage.setItem('email_capture_shown', '1');
    }, 20000); // 20 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-sm overflow-hidden"
            style={{ background: '#0C0B0A', border: `1px solid ${RG}22` }}
            onClick={e => e.stopPropagation()}
          >
            {/* Accent line */}
            <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${RG}70, transparent)` }} />

            <div className="p-8 text-center">
              <button onClick={() => setVisible(false)}
                className="absolute top-4 right-4 transition-opacity hover:opacity-60"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center mb-4">
                <Sparkles size={18} style={{ color: RG }} />
              </div>

              {submitted ? (
                <>
                  <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>
                    Check your inbox ☕
                  </h3>
                  <p className="font-mono text-[10px] mb-4" style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}>
                    Your code is on the way.
                  </p>
                  <div style={{ background: `${RG}12`, border: `1px solid ${RG}30`, padding: '10px 16px', display: 'inline-block' }}>
                    <span className="font-mono font-bold tracking-[0.3em]" style={{ color: RG }}>WELCOME10</span>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-mono text-[8px] tracking-[0.45em] uppercase mb-3" style={{ color: `${RG}50` }}>
                    Limited Offer
                  </p>
                  <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.5rem', lineHeight: 1.15 }}>
                    10% off your<br />
                    <span style={{ color: RG }}>first order.</span>
                  </h3>
                  <p className="font-mono text-[10px] mb-6" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
                    Join our list and get an instant discount code + wellness tips.
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
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid ${RG}20`,
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: '13px',
                      }}
                    />
                    <button type="submit"
                      className="w-full py-3.5 font-mono font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-85"
                      style={{ fontSize: '10px', background: RG, color: '#060606' }}>
                      Get 10% Off →
                    </button>
                  </form>
                </>
              )}

              <button onClick={() => setVisible(false)}
                className="mt-4 font-mono text-[8px] tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: 'rgba(255,255,255,0.15)' }}>
                No thanks
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}