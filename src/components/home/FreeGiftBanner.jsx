import React from 'react';
import { Link } from 'react-router-dom';
import { FREE_GIFT_IMAGE, FREE_GIFT_ENABLED } from '@/lib/freeGiftConfig';

export default function FreeGiftBanner() {
  if (!FREE_GIFT_ENABLED) return null;
  return (
    <section className="px-6 py-10 md:px-10 md:py-14" style={{ background: '#F7F2E9', borderTop: '1px solid #B89A6D' }}>
      <div className="mx-auto max-w-[900px] text-center">
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#E6AC45' }}>
          Our gift to you
        </p>
        <h2 className="mb-5 font-serif font-bold" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', color: '#32190F' }}>
          Free Gift with Purchase
        </h2>
        <Link to="/shop" className="block">
          <img
            src={FREE_GIFT_IMAGE}
            alt="Free gift with purchase — choose from Canvas Tote, Insulated Tumbler, Dad Cap, or Heart Keychain"
            className="mx-auto w-full max-w-[640px] rounded-lg"
            style={{ border: '1px solid #B89A6D', boxShadow: '0 6px 20px rgba(36,26,22,0.08)' }}
            loading="lazy"
          />
        </Link>
        <p className="mx-auto mt-5 max-w-md font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.7 }}>
          Choose your favorite in your cart &mdash; a Canvas Tote, Insulated Tumbler, Dad Cap, or Heart Keychain, all featuring the Torch Republic logo.
        </p>
        <p className="mx-auto mt-2 max-w-md font-heading text-xs" style={{ color: '#7A6E5F', lineHeight: 1.6 }}>
          One free gift with any purchase. Select your gift in the cart before checkout &mdash; no code needed.
        </p>
        <Link
          to="/shop"
          className="mt-5 inline-block tr-btn-lift font-mono text-xs tracking-[0.12em] uppercase font-bold px-8 py-3"
          style={{ background: '#9B4E2F', color: '#F7F2E9', borderRadius: '6px', boxShadow: '0 3px 10px rgba(184,101,67,0.20)' }}
        >
          Shop Coffee
        </Link>
      </div>
    </section>
  );
}