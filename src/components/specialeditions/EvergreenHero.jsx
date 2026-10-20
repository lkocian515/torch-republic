import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Evergreen homepage hero — shown whenever no special-edition campaign is
 * live (no campaign configured, or the campaign window has expired).
 * Keeps the everyday coffee range front and center.
 */
export default function EvergreenHero() {
  return (
    <section
      className="w-full"
      style={{ background: 'linear-gradient(135deg, #1E1A16 0%, #2C2620 55%, #1E1A16 100%)' }}
      aria-label="Torch Republic everyday coffee"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-14 text-center md:px-10 md:py-20">
        <p className="font-mono uppercase" style={{ color: '#D6B27A', fontSize: '10px', letterSpacing: '0.35em' }}>
          Torch Republic Coffee Company
        </p>
        <h1
          className="font-serif font-bold mt-4"
          style={{ color: '#FBF8F1', fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.1 }}
        >
          Two rituals. One easy morning.
        </h1>
        <p className="mt-4 font-heading mx-auto" style={{ color: '#E0D3C4', fontSize: '1.0625rem', lineHeight: 1.7, maxWidth: '560px' }}>
          Instant Classic Coffee and Instant Mushroom Coffee. No machine, no pods, no morning production.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center font-heading font-semibold"
            style={{ background: '#FBF8F1', color: '#3D2418', minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
          >
            Shop the everyday range
          </Link>
          <Link
            to="/special-editions"
            className="inline-flex items-center justify-center font-heading font-semibold"
            style={{ color: '#FBF8F1', border: '1px solid rgba(251,248,241,0.45)', minHeight: 48, padding: '0.875rem 2rem', borderRadius: 999 }}
          >
            Special Editions
          </Link>
        </div>
      </div>
    </section>
  );
}