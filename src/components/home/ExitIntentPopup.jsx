import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('exit_shown')) return;
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
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-lg p-10 text-center"
            style={{ background: '#0A0A0D', border: '1px solid rgba(196,163,90,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setVisible(false)}
              className="absolute top-4 right-4 transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              <X className="w-4 h-4" />
            </button>

            {/* Top line */}
            <div className="h-px w-full mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D, transparent)' }} />

            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(196,163,90,0.6)' }}>
              Welcome, Torchbearer
            </p>

            <h2 className="font-serif text-white mb-3" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.1 }}>
              Join the Legacy.<br />
              <span style={{ color: '#C8A44D' }}>15% Off Your First Order.</span>
            </h2>

            <p className="font-mono text-xs mb-8 max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
              Plus free shipping and early access to new Founders Series drops.
            </p>

            {submitted ? (
              <div className="py-4">
                <p className="font-mono text-sm" style={{ color: '#C8A44D' }}>The flame is lit. Check your inbox.</p>
                <p className="font-mono text-xs mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>Use code TORCH20 at checkout.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-4 text-sm font-mono text-center outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(196,163,90,0.2)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px',
                  }}
                />
                <button type="submit"
                  className="w-full py-4 font-mono font-bold uppercase tracking-[0.3em] transition-opacity hover:opacity-85"
                  style={{ fontSize: '11px', background: '#C8A44D', color: '#000' }}>
                  Claim My 15% Off
                </button>
              </form>
            )}

            <button onClick={() => setVisible(false)}
              className="mt-5 font-mono text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              No thanks, I'll pay full price
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}