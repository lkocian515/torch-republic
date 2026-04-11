import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('tr_popup_seen');
    if (seen) return;

    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        setVisible(true);
        sessionStorage.setItem('tr_popup_seen', '1');
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4 }}
            className="relative max-w-lg w-full p-12 text-center"
            style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.25)' }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setVisible(false)} className="absolute top-5 right-5 transition-opacity hover:opacity-50" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <X className="w-4 h-4" />
            </button>

            <div className="w-px h-10 mx-auto mb-8" style={{ background: 'linear-gradient(to bottom, transparent, #C9A24A)' }} />

            {!submitted ? (
              <>
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.6)' }}>Before You Go</p>
                <h2 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2 }}>
                  Join the Legacy
                </h2>
                <p style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Get <strong style={{ color: '#C9A24A' }}>15% off</strong> your first order + free shipping when you join our community of 10,000+ patriots.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full px-5 py-3.5 font-mono text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,162,74,0.2)', color: 'rgba(255,255,255,0.8)' }}
                  />
                  <button type="submit" className="w-full py-4 font-mono text-[11px] tracking-[0.3em] uppercase font-black transition-opacity hover:opacity-80" style={{ background: '#C9A24A', color: '#000' }}>
                    Claim My 15% Off
                  </button>
                </form>
                <button onClick={() => setVisible(false)} className="mt-4 font-mono text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  No thanks, I'll pay full price
                </button>
              </>
            ) : (
              <>
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: '#C9A24A' }}>Welcome to the Legacy</p>
                <h2 className="font-serif text-white mb-4" style={{ fontSize: '1.8rem', fontWeight: 700 }}>Your Code is On the Way</h2>
                <p style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.875rem', lineHeight: 1.8 }}>
                  Check your inbox for your 15% discount code and free shipping offer. The flame is yours to carry.
                </p>
                <button onClick={() => setVisible(false)} className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-3.5 transition-opacity hover:opacity-80" style={{ background: '#C9A24A', color: '#000' }}>
                  Start Shopping
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}