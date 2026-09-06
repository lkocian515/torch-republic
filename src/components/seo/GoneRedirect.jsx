/**
 * GoneRedirect — renders a 410 Gone signal for discontinued product URLs.
 * Google treats a page with noindex + canonical-less + "410" messaging as gone.
 * We also update document title so crawlers see a clear "not found" signal.
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// GoneRedirect — renders a branded 410 Gone page for discontinued product/category URLs.

export default function GoneRedirect() {
  useEffect(() => {
    document.title = '410 Gone — Torch Republic';
    // Inject a <meta name="robots" content="noindex"> if not already present
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, follow';
    return () => {
      if (meta) meta.content = 'index, follow';
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#080808' }}
    >
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-4" style={{ color: '#E6B7AD' }}>
        410 · Product Discontinued
      </p>
      <h1 className="font-serif font-bold text-3xl text-white mb-3">
        This product is no longer available
      </h1>
      <p className="font-heading text-base mb-8" style={{ color: 'rgba(245,239,230,0.75)', maxWidth: '400px' }}>
        Torch Republic now focuses on premium instant coffee, mushroom coffee, and matcha. Browse our current collection below.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/shop"
          className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808' }}
        >
          Shop Best Sellers →
        </Link>
        <Link
          to="/quiz"
          className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-75"
          style={{ border: '1px solid rgba(230,183,173,0.35)', color: '#E6B7AD' }}
        >
          Take the 30-Second Quiz
        </Link>
        <Link
          to="/"
          className="font-mono text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-all hover:opacity-75"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}