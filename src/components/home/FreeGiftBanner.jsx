import React from 'react';
import { Link } from 'react-router-dom';
import { FREE_GIFT_IMAGE } from '@/lib/freeGiftConfig';

export default function FreeGiftBanner() {
  return (
    <section className="px-6 py-10 md:px-10 md:py-14" style={{ background: '#FBF8F2', borderTop: '1px solid #E4D8C9' }}>
      <div className="mx-auto max-w-[900px] text-center">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: '#A97B32' }}>
          Our gift to you
        </p>
        <h2 className="mb-5 font-serif font-bold" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#292622' }}>
          Free Gift with Purchase
        </h2>
        <Link to="/shop" className="block">
          <img
            src={FREE_GIFT_IMAGE}
            alt="Free gift with purchase — choose from Canvas Tote, Insulated Tumbler, or Dad Cap"
            className="mx-auto w-full max-w-[640px] rounded-lg"
            style={{ border: '1px solid #E4D8C9' }}
            loading="lazy"
          />
        </Link>
        <p className="mx-auto mt-5 max-w-md font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.7 }}>
          Choose your favorite at checkout &mdash; a Canvas Tote, Insulated Tumbler, or Dad Cap, all featuring the Torch Republic logo.
        </p>
        <Link
          to="/shop"
          className="mt-5 inline-block font-mono text-[10px] tracking-[0.3em] uppercase font-bold px-8 py-3 transition-all hover:opacity-90"
          style={{ background: '#B86543', color: '#FBF8F1', borderRadius: '6px' }}
        >
          Shop to Qualify
        </Link>
      </div>
    </section>
  );
}