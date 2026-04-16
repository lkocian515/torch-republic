import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const EXPERIENCE_TAGS = ['Smooth', 'Bold', 'Strong', 'Balanced', 'Patriot Favorite', 'Founders Series'];

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: i <= rating ? '#C9A24A' : 'rgba(201,162,74,0.15)' }} />
      ))}
    </div>
  );
}

function ReviewCard({ review, featured = false }) {
  return (
    <div
      className="p-6 flex flex-col gap-4"
      style={{
        background: featured ? 'linear-gradient(135deg, #13100A 0%, #0D0D0D 100%)' : '#0D0D0D',
        border: featured ? '1px solid rgba(201,162,74,0.5)' : '1px solid rgba(201,162,74,0.09)',
        borderRadius: '10px',
        boxShadow: featured ? '0 0 36px rgba(201,162,74,0.08)' : '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      {featured && (
        <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1" style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.28)', borderRadius: '4px' }}>
          <Flame className="w-3 h-3" style={{ color: '#C9A24A' }} />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: '#C9A24A' }}>Top Review</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" style={{ color: 'rgba(201,162,74,0.4)' }} />
          <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>Verified Buyer</span>
        </div>
      </div>

      <p className="font-heading leading-relaxed" style={{ color: 'rgba(234,234,234,0.72)', fontSize: '0.875rem', fontStyle: 'italic', lineHeight: 1.85 }}>
        &ldquo;{review.body}&rdquo;
      </p>

      {/* Auto experience tags based on rating */}
      <div className="flex flex-wrap gap-1.5">
        {review.rating === 5 && (
          <span className="font-mono text-[8px] tracking-wide px-2 py-0.5" style={{ background: 'rgba(201,162,74,0.06)', border: '1px solid rgba(201,162,74,0.15)', borderRadius: '3px', color: 'rgba(201,162,74,0.65)' }}>
            🔥 Founders Series
          </span>
        )}
        <span className="font-mono text-[8px] tracking-wide px-2 py-0.5" style={{ background: 'rgba(201,162,74,0.06)', border: '1px solid rgba(201,162,74,0.15)', borderRadius: '3px', color: 'rgba(201,162,74,0.65)' }}>
          🇺🇸 Patriot Favorite
        </span>
      </div>

      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div>
          <p className="font-mono text-xs font-bold" style={{ color: '#C9A24A' }}>{review.reviewer_name}</p>
          {review.location && (
            <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>{review.location}</p>
          )}
        </div>
        <div className="text-right">
          {review.review_date && (
            <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
              {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ productHandle }) {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productHandle],
    queryFn: () => productHandle
      ? base44.entities.Review.filter({ product_handle: productHandle }, '-review_date', 10)
      : base44.entities.Review.list('-review_date', 8),
  });

  const [sort, setSort] = useState('recent');

  if (!reviews.length) return null;

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'highest') return b.rating - a.rating;
    return new Date(b.review_date || 0) - new Date(a.review_date || 0);
  });

  const [featured, ...rest] = sorted;

  return (
    <div id="reviews" className="mt-16 pt-10" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: 'rgba(201,162,74,0.55)' }}>Verified Reviews</p>
          <h2 className="font-serif font-black" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#EAEAEA', letterSpacing: '-0.02em' }}>
            What Torchbearers Are Saying
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#C9A24A' }} />)}
            </div>
            <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{avgRating} · {reviews.length} reviews</span>
          </div>
        </div>

        {/* Sort filter */}
        <div className="flex gap-2 flex-wrap">
          {[['recent', 'Most Recent'], ['highest', 'Highest Rated']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSort(val)}
              className="font-mono text-[10px] tracking-wide uppercase px-3 py-1.5 transition-all"
              style={{
                border: `1px solid ${sort === val ? 'rgba(201,162,74,0.55)' : 'rgba(201,162,74,0.14)'}`,
                color: sort === val ? '#C9A24A' : 'rgba(255,255,255,0.35)',
                background: sort === val ? 'rgba(201,162,74,0.08)' : 'transparent',
                borderRadius: '4px',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Gold rule */}
      <div className="mb-8" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,162,74,0.4), rgba(201,162,74,0.05), transparent)' }} />

      {/* Featured review */}
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-5">
        <ReviewCard review={featured} featured />
      </motion.div>

      {/* Rest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rest.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 pt-10 text-center" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-2" style={{ color: 'rgba(201,162,74,0.5)' }}>Join the Torchbearers</p>
        <p className="font-heading mb-6" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>Share your experience and become part of the story.</p>
        <a
          href="https://torch-republic.com/pages/reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
          style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.35)', padding: '13px 32px', borderRadius: '4px' }}
        >
          Write a Review →
        </a>
      </div>
    </div>
  );
}