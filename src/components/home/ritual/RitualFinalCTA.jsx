import React from 'react';
import { Link } from 'react-router-dom';

// Final purchase CTA — closes the homepage conversion flow. Primary CTA leads
// into the current shopping experience (no checkout behavior change).
export default function RitualFinalCTA() {
  return (
    <section style={{ background: '#292622' }}>
      <div className="mx-auto max-w-[900px] px-6 py-20 text-center md:px-10 md:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#E6B7AD' }}>
          Your ritual starts here
        </p>
        <h2
          className="mx-auto mt-4 font-serif font-bold"
          style={{ fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#FBF8F1', lineHeight: 1.12, textWrap: 'balance', maxWidth: '40rem' }}
        >
          Three products. One simple daily ritual.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-heading" style={{ color: 'rgba(251,248,241,0.82)', lineHeight: 1.7 }}>
          Instant coffee, mushroom coffee, and ceremonial matcha &mdash; made to be easy, premium, and worth slowing down for.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="btn btn-primary" style={{ minWidth: '220px' }}>Shop All Three</Link>
          <Link
            to="/build-your-ritual"
            className="btn btn-ghost"
            style={{ minWidth: '220px', color: '#FBF8F1', borderColor: 'rgba(251,248,241,0.4)' }}
          >
            Build Your Ritual
          </Link>
        </div>
      </div>
    </section>
  );
}