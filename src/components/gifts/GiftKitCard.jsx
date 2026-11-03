import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Gift } from 'lucide-react';
import { guardExternalPurchase } from '@/lib/purchaseFallback';

const RG = '#E6AC45';

const fmtPrice = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

/**
 * GiftKitCard — a single gift kit in the "Choose Their Ritual" grid.
 *
 * Structure (per spec): image → badge → name → description → Includes →
 * included products → price → primary CTA.
 *
 * - Whole card is NOT a button; only the image/title/CTA are interactive links.
 * - ADD TO CART opens the real Shopify cart permalink built from verified IDs.
 * - VIEW GIFT links to the relevant shop category page.
 * - Minimum 44px touch targets; visible hover + focus states.
 * - Decoration note appears only when non-product props are pictured.
 */
export default function GiftKitCard({ kit, index = 0 }) {
  // First card (index 0) is considered above-the-fold → eager-load its image.
  const priority = index < 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
      style={{
        background: '#FFFCF7',
        border: '1px solid rgba(230,183,173,0.28)',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${RG}80`;
        e.currentTarget.style.boxShadow = `0 0 0 1px ${RG}40, 0 6px 24px rgba(63,48,39,0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(230,183,173,0.28)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* 1. Text-only header — decorative top accent + icon medallion (no image) */}
      <div aria-hidden="true" style={{ height: '4px', background: `linear-gradient(90deg, ${RG}30 0%, #9B4E2F80 50%, ${RG}30 100%)` }} />
      <div
        className="flex items-center justify-center pt-6 pb-2"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.22)', background: `${RG}0A` }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: '#F7F2E9', border: `1px solid ${RG}50` }}
        >
          <Gift size={22} style={{ color: '#9B4E2F' }} aria-hidden="true" />
        </div>
      </div>
      {void priority}

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* 2. Optional badge */}
        {kit.featured && kit.featuredLabel && (
          <div
            className="self-start mb-3 px-3 py-1.5 font-mono text-[8px] tracking-[0.3em] uppercase font-bold rounded-sm"
            style={{ background: '#9B4E2F', color: '#F7F2E9' }}
          >
            {kit.featuredLabel}
          </div>
        )}

        {/* 3. Kit name (heading) */}
        <h3
          className="font-serif font-bold mb-2"
          style={{ color: '#32190F', fontSize: '1.4rem', lineHeight: 1.2 }}
        >
          <Link
            to={kit.detailPath}
            className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold rounded"
            style={{ color: 'inherit' }}
          >
            {kit.name}
          </Link>
        </h3>

        {/* 4. Description */}
        <p
          className="font-heading mb-4"
          style={{ color: '#5E4639', fontWeight: 300, lineHeight: 1.6, fontSize: '0.92rem' }}
        >
          {kit.description}
        </p>

        {/* 5. "Includes" label + 6. included products */}
        <div className="mb-4">
          <p
            className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2"
            style={{ color: `${RG}` }}
          >
            Includes {kit.itemCount} {kit.itemCount === 1 ? 'item' : 'items'}
          </p>
          <ul className="space-y-1.5">
            {kit.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 font-heading"
                style={{ color: '#32190F', fontSize: '0.86rem', lineHeight: 1.45 }}
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 shrink-0"
                  style={{ width: '4px', height: '4px', borderRadius: '50%', background: RG, display: 'inline-block' }}
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decoration note — only when the photo contains non-product props */}
        {kit.decorationNote && (
          <p
            className="font-mono mb-4"
            style={{ color: '#9A8A7A', fontSize: '0.68rem', lineHeight: 1.5, letterSpacing: '0.02em' }}
          >
            {kit.decorationNote}
          </p>
        )}

        {/* 7. Price (real Shopify sum) */}
        <div className="mb-4">
          <span
            className="font-serif font-bold"
            style={{ color: '#9B4E2F', fontSize: '1.5rem' }}
          >
            {fmtPrice(kit.price)}
          </span>
          {/* No fabricated compareAt — omitted unless a real one exists. */}
          {kit.compareAtPrice && Number(kit.compareAtPrice) > kit.price && (
            <span
              className="ml-2 font-mono line-through"
              style={{ color: '#9A8A7A', fontSize: '0.85rem' }}
            >
              {fmtPrice(kit.compareAtPrice)}
            </span>
          )}
        </div>

        {/* 8. CTAs — pinned to the bottom so cards align */}
        <div className="mt-auto flex flex-col gap-2.5">
          <a
            href={kit.cartUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => guardExternalPurchase(e)}
            aria-label={`Add ${kit.name} to cart`}
            className="flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
            style={{
              background: '#9B4E2F',
              color: '#F7F2E9',
              minHeight: '44px',
              padding: '12px 16px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            Add to Cart
          </a>
          <Link
            to={kit.detailPath}
            aria-label={`View ${kit.name} details`}
            className="flex items-center justify-center gap-1 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold"
            style={{
              background: 'transparent',
              color: '#9B4E2F',
              border: `1px solid #E6AC45`,
              minHeight: '44px',
              padding: '12px 16px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#9B4E2F'; e.currentTarget.style.background = `${RG}18`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E6AC45'; e.currentTarget.style.background = 'transparent'; }}
          >
            View Gift <ChevronRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}