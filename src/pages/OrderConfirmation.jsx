import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Sparkles } from 'lucide-react';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';

const TIMELINE = [
  { icon: Package, label: 'Order Received', sub: 'Your instant mushroom coffee order has been confirmed and is being prepared.' },
  { icon: Sparkles, label: 'Packed with Care', sub: 'Your tubes are sealed and quality-checked before leaving our facility.' },
  { icon: Truck, label: 'Shipped to You', sub: 'Estimated delivery in 3–7 business days. Tracking sent to your email.' },
  { icon: CheckCircle, label: 'Start Your Ritual', sub: 'Scoop, stir, sip. Your daily mushroom coffee ritual begins.' },
];

const RITUAL_NOTES = [
  { name: 'MoonCap', note: 'for slow, grounded moments' },
  { name: 'GlowMind', note: 'for deep focus and clarity' },
  { name: 'SunCap', note: 'for bright morning momentum' },
  { name: 'The Oracle', note: 'for creative reflection' },
  { name: 'DreamCap', note: 'for calm, immersive flow' },
  { name: 'Mystic Bloom', note: 'for soft, restorative self-care' },
];

export default function OrderConfirmation() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get('order') || '#TR-' + Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#050505', color: '#F7F1E8' }}>

      {/* Hero */}
      <section className="max-w-[680px] mx-auto px-5 md:px-10 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16"
            style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.25)', borderRadius: '50%' }}>
            <CheckCircle className="w-7 h-7" style={{ color: '#E6B7AD' }} />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <div className="h-px w-8" style={{ background: 'rgba(230,183,173,0.3)' }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(230,183,173,0.55)' }}>
              Order Confirmed
            </p>
            <div className="h-px w-8" style={{ background: 'rgba(230,183,173,0.3)' }} />
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, color: '#F7F1E8', letterSpacing: '-0.015em', lineHeight: 1.1 }}>
              Your Ritual Is Confirmed.
            </h1>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase mt-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
              Order {orderNum}
            </p>
          </div>

          <p style={{ fontSize: '1rem', color: 'rgba(247,241,232,0.45)', lineHeight: 1.9, fontWeight: 300, maxWidth: '480px' }}>
            Thank you for ordering from Torch Republic Coffee Company. Your instant mushroom coffee is being prepared for shipment. A confirmation has been sent to your email.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link to="/shop"
              className="flex-1 flex items-center justify-center py-4 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-80"
              style={{ background: '#E6B7AD', color: '#050505', fontWeight: 900, fontSize: '10px' }}>
              Continue Shopping
            </Link>
            <Link to="/blends"
              className="flex-1 flex items-center justify-center py-4 font-mono uppercase tracking-[0.25em] transition-all hover:border-white/20"
              style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.7)', fontSize: '10px' }}>
              Explore the Blends →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* What to expect */}
      <section style={{ borderTop: '1px solid rgba(230,183,173,0.07)', background: '#0A0908' }}>
        <div className="max-w-[900px] mx-auto px-5 md:px-10 py-20">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-center mb-4"
            style={{ color: 'rgba(230,183,173,0.4)' }}>What to Expect</p>
          <h2 className="font-serif text-white text-center font-bold mb-14"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.01em' }}>
            Your Ritual Is on Its Way
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4 p-6"
                style={{ background: '#11100F', border: '1px solid rgba(230,183,173,0.07)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-8 h-8"
                    style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.12)', borderRadius: '50%' }}>
                    <Icon className="w-4 h-4" style={{ color: 'rgba(230,183,173,0.6)' }} />
                  </div>
                  <span className="font-mono text-[9px] font-black" style={{ color: 'rgba(230,183,173,0.18)' }}>0{i + 1}</span>
                </div>
                <p className="font-serif font-bold text-white" style={{ fontSize: '0.95rem' }}>{label}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.75, fontWeight: 300 }}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual notes */}
      <section className="max-w-[680px] mx-auto px-5 md:px-10 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-7"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
            While You Wait
          </p>
          <h2 className="font-serif font-bold text-white"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.01em' }}>
            Start planning your first ritual.
          </h2>
          <p style={{ color: 'rgba(247,241,232,0.38)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.92rem' }}>
            Each blend is made for a specific moment in your day:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
            {RITUAL_NOTES.map(r => (
              <div key={r.name} className="flex items-start gap-3 p-4"
                style={{ background: '#11100F', border: '1px solid rgba(230,183,173,0.07)' }}>
                <span className="font-mono text-[8px]" style={{ color: 'rgba(230,183,173,0.4)', marginTop: 2 }}>✦</span>
                <div>
                  <p className="font-serif font-bold text-white text-sm">{r.name}</p>
                  <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.note}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/shop"
            className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.3em] transition-all hover:opacity-80 mt-4"
            style={{ background: '#E6B7AD', color: '#050505', fontWeight: 900, fontSize: '10px', padding: '16px 36px' }}>
            Shop More Blends →
          </Link>
        </motion.div>
      </section>

      {/* FDA */}
      <div className="px-5 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.05)' }}>
        <p className="font-mono text-[8px] tracking-[0.12em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.15)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}