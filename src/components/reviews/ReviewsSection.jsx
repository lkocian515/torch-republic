import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import ReviewCard, { GoldStars } from './ReviewCard';
import TrustBar from './TrustBar';

const FILTERS = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'top', label: 'Highest Rated' },
];

export default function ReviewsSection({ productHandle }) {
  const [filter, setFilter] = useState('recent');

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productHandle],
    queryFn: () => productHandle
      ? base44.entities.Review.filter({ product_handle: productHandle }, '-review_date', 12)
      : base44.entities.Review.list('-review_date', 8),
  });

  if (!reviews.length) return null;

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const sorted = [...reviews].sort((a, b) => {
    if (filter === 'top') return b.rating - a.rating;
    return new Date(b.review_date || 0) - new Date(a.review_date || 0);
  });

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div id="reviews" className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(201,162,74,0.5)' }}>Verified Reviews</p>
          <div className="flex items-center gap-3">
            <GoldStars rating={Math.round(parseFloat(avgRating))} size="lg" />
            <span className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>{avgRating}</span>
            <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{reviews.length} reviews</span>
          </div>
        </div>
        {/* Filter pills */}
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all"
              style={{
                background: filter === f.key ? 'rgba(201,162,74,0.12)' : 'transparent',
                color: filter === f.key ? '#C9A24A' : 'rgba(255,255,255,0.3)',
                border: filter === f.key ? '1px solid rgba(201,162,74,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar avgRating={avgRating} />

      {/* Featured top review */}
      <div className="mb-5">
        <ReviewCard review={featured} featured={true} index={0} />
      </div>

      {/* Rest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rest.map((r, i) => <ReviewCard key={r.id} review={r} index={i + 1} />)}
      </div>

      {/* CTA */}
      <div className="mt-14 py-12 text-center rounded-xl" style={{ border: '1px solid rgba(201,162,74,0.1)', background: '#0B0B0B' }}>
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.5)' }}>Join the Torchbearers</p>
        <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>Share your experience.</h3>
        <p className="font-heading text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
          Become part of the story.
        </p>
        <a href="https://torch-republic.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-75"
          style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '14px 36px' }}>
          Write a Review →
        </a>
      </div>
    </div>
  );
}