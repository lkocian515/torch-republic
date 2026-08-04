import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles } from 'lucide-react';

const RG   = '#E6B7AD';

export default function FinalCTA() {
  return (
    <section
      className="px-5 md:px-10 py-16 md:py-24 text-center"
      style={{
        background: 'linear-gradient(180deg, #111111 0%, #0D0D0D 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      {/* Warm champagne glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(196,163,90,0.07) 0%, transparent 75%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
        <p className="font-mono text-[8px] tracking-[0.6em] uppercase mb-5"
          style={{ color: 'rgba(230,183,173,0.5)' }}>
          Torch Republic Coffee Co.
        </p>

        <h2 className="font-serif font-bold mb-5"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Premium Instant Coffee<br />
          <span style={{ color: RG }}>For a Clearer Daily Ritual</span>
        </h2>

        <p className="font-heading mb-10 mx-auto"
          style={{ fontSize: '0.92rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300, maxWidth: '460px' }}>
          No pods. No machines. No chaotic energy. Pick any 3 blends, build your bundle, and start a ritual that actually feels good.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/build-your-ritual"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#050505', padding: '15px 36px' }}
          >
            <Sparkles size={13} />
            Build Your Ritual Bundle →
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: `1px solid rgba(230,183,173,0.35)`, color: RG, padding: '15px 28px' }}
          >
            <ShoppingBag size={13} />
            Browse All Blends
          </Link>
        </div>

        {/* Trust micro-line */}
        <p className="font-mono mt-8 text-[8px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(230,183,173,0.3)' }}>
          30-Day Money-Back Guarantee · Free Shipping $50+ · Small-Batch · No Machine Needed
        </p>
      </div>
    </section>
  );
}