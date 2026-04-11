import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Flame, Coffee, Truck, Star, ArrowRight } from 'lucide-react';

const TIMELINE = [
  { icon: Flame, label: 'Roasted to Order', sub: 'Your blend is roasted fresh within 24 hours of your order.' },
  { icon: Coffee, label: 'Quality Check', sub: 'Every batch is tasted and approved before it ships.' },
  { icon: Truck, label: 'Shipped with Care', sub: 'Sealed and dispatched within 2–3 business days.' },
  { icon: Star, label: 'Enjoy the Legacy', sub: 'Pour, reflect, and carry the flame every morning.' },
];

export default function OrderConfirmation() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get('order') || '#TR-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060608', color: '#F0EBE1' }}>

      {/* Hero confirmation */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16"
            style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.25)', borderRadius: '50%' }}>
            <CheckCircle className="w-7 h-7" style={{ color: '#C9A24A' }} />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.3)' }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
              Order Confirmed
            </p>
            <div className="h-px w-8" style={{ background: 'rgba(196,163,90,0.3)' }} />
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
              The Flame is Lit.
            </h1>
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase mt-3" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Thank you for your order — {orderNum}
            </p>
          </div>

          <p style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.9, fontWeight: 300, maxWidth: '480px' }}>
            Your heritage-crafted order is now in the hands of our roasters. 
            We'll send a confirmation to your email along with tracking details.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link to="/"
              className="flex-1 flex items-center justify-center gap-2 py-4 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-80"
              style={{ background: '#C9A24A', color: '#000', fontWeight: 900, fontSize: '10px' }}>
              Return Home
            </Link>
            <Link to="/CoffeeCollection"
              className="flex-1 flex items-center justify-center gap-2 py-4 font-mono uppercase tracking-[0.25em] transition-all hover:border-white/25"
              style={{ border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.7)', fontSize: '10px' }}>
              Explore Collection <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What to Expect timeline */}
      <section style={{ borderTop: '1px solid rgba(196,163,90,0.07)', background: '#0A0A0D' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-10 py-20">
          <div className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Your Journey
            </p>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700, letterSpacing: '-0.01em' }}>
              What to Expect
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 p-7 relative"
                style={{ background: '#0E0E12', border: '1px solid rgba(196,163,90,0.07)' }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-8 h-8"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.15)', borderRadius: '50%' }}>
                    <Icon className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.6)' }} />
                  </div>
                  <span className="font-mono text-[9px] font-black" style={{ color: 'rgba(201,162,74,0.2)' }}>0{i + 1}</span>
                </div>
                <p className="font-serif font-bold text-white" style={{ fontSize: '1rem' }}>{label}</p>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.75, fontWeight: 300 }}>{sub}</p>

                {/* Connector */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden lg:flex items-center justify-center z-10"
                    style={{ color: 'rgba(201,162,74,0.25)', fontSize: '1rem' }}>
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Legacy / Torch Box CTA */}
      <section className="max-w-[700px] mx-auto px-5 md:px-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-7"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.4))' }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Join the Legacy
            </p>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.4), transparent)' }} />
          </div>

          <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#F0EBE1', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
            Never run out of the flame.
          </h2>

          <p style={{ color: 'rgba(240,235,225,0.38)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem', maxWidth: '440px' }}>
            The Torch Box delivers your chosen Founders Series blend monthly — roasted fresh, shipped free, with early access to limited edition releases.
          </p>

          <Link to="/TheTorchBox"
            className="inline-flex items-center gap-3 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-75 btn-glow"
            style={{ background: '#C9A24A', color: '#000', fontWeight: 900, fontSize: '10px', padding: '16px 36px' }}>
            <Flame className="w-3.5 h-3.5" />
            Become a Torchbearer
          </Link>

          <p className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Cancel anytime · First box ships free · Save 15% every order
          </p>
        </motion.div>
      </section>

      {/* Share prompt */}
      <section style={{ borderTop: '1px solid rgba(196,163,90,0.07)', background: '#040406' }}>
        <div className="max-w-[700px] mx-auto px-5 md:px-10 py-14 text-center">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Carry the Flame Further
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', fontWeight: 300, marginBottom: '1.5rem' }}>
            Share your order with fellow patriots. Use <span style={{ color: '#C9A24A' }}>#TorchRepublic</span> and tag us — your story becomes part of the legacy.
          </p>
          <div className="flex items-center justify-center gap-4">
            {['Instagram', 'X / Twitter', 'Facebook'].map(s => (
              <a key={s} href="#"
                className="font-mono text-[9px] uppercase tracking-wider px-4 py-2.5 transition-all hover:border-white/25"
                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}