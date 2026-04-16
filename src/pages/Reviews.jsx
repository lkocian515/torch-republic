import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, ShieldCheck, Flame, Coffee, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: i <= rating ? '#C9A24A' : 'rgba(201,162,74,0.15)' }} />
      ))}
    </div>
  );
}

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'founders', label: 'Founders Favorites' },
  { value: 'liberty', label: 'Liberty Icons' },
];

function ReviewCard({ review, featured = false, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.5 }}
      className="p-7 flex flex-col gap-4"
      style={{
        background: featured ? 'linear-gradient(135deg, #13100A 0%, #0D0D0D 100%)' : '#0B0B0B',
        border: featured ? '1px solid rgba(201,162,74,0.55)' : '1px solid rgba(201,162,74,0.1)',
        borderRadius: '10px',
        boxShadow: featured ? '0 0 48px rgba(201,162,74,0.1)' : '0 2px 16px rgba(0,0,0,0.4)',
      }}
    >
      {featured && (
        <div className="inline-flex items-center gap-1.5 w-fit px-3 py-1 mb-1" style={{ background: 'rgba(201,162,74,0.1)', border: '1px solid rgba(201,162,74,0.3)', borderRadius: '4px' }}>
          <Flame className="w-3 h-3" style={{ color: '#C9A24A' }} />
          <span className="font-mono text-[9px] tracking-[0.45em] uppercase" style={{ color: '#C9A24A' }}>Top Review</span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3" style={{ color: 'rgba(201,162,74,0.4)' }} />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>Verified Buyer</span>
        </div>
      </div>

      {/* Reviewer name */}
      <div>
        <p className="font-mono text-sm font-bold" style={{ color: '#C9A24A' }}>{review.reviewer_name}</p>
        {review.location && (
          <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{review.location}</p>
        )}
      </div>

      {/* Body */}
      <p className="flex-1 leading-relaxed" style={{ color: 'rgba(234,234,234,0.7)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.9, fontFamily: 'var(--font-serif)' }}>
        &ldquo;{review.body}&rdquo;
      </p>

      {/* Experience tags */}
      <div className="flex flex-wrap gap-2">
        {review.rating === 5 && (
          <span className="font-mono text-[9px] tracking-wide px-2.5 py-1" style={{ background: 'rgba(201,162,74,0.07)', border: '1px solid rgba(201,162,74,0.18)', borderRadius: '4px', color: 'rgba(201,162,74,0.7)' }}>
            🔥 Founders Series
          </span>
        )}
        <span className="font-mono text-[9px] tracking-wide px-2.5 py-1" style={{ background: 'rgba(201,162,74,0.07)', border: '1px solid rgba(201,162,74,0.18)', borderRadius: '4px', color: 'rgba(201,162,74,0.7)' }}>
          🇺🇸 Patriot Favorite
        </span>
        {review.product_handle && (
          <span className="font-mono text-[9px] tracking-wide px-2.5 py-1" style={{ background: 'rgba(201,162,74,0.04)', border: '1px solid rgba(201,162,74,0.1)', borderRadius: '4px', color: 'rgba(255,255,255,0.25)' }}>
            ☕ {review.product_handle.replace(/-/g, ' ')}
          </span>
        )}
      </div>

      {/* Footer */}
      {review.review_date && (
        <div className="pt-4" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.18)' }}>
            {new Date(review.review_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function Reviews() {
  const [sort, setSort] = useState('recent');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: () => base44.entities.Review.list('-review_date', 50),
  });

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '4.8';
  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const pct = reviews.length ? Math.round((fiveStars / reviews.length) * 100) : 100;

  const sorted = [...reviews].sort((a, b) => {
    if (sort === 'highest') return b.rating - a.rating;
    if (sort === 'founders') return (b.product_handle || '').includes('founders') ? 1 : -1;
    if (sort === 'liberty') return (b.product_handle || '').includes('liberty') ? 1 : -1;
    return new Date(b.review_date || 0) - new Date(a.review_date || 0);
  });

  const [featured, ...rest] = sorted;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="py-28 px-6 md:px-12" style={{ borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.6)' }}>
              Verified Legacy Voices
            </p>
            <h1 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.03em' }}>
              What Torchbearers<br />Are Saying
            </h1>
            <div className="h-px w-14 mx-auto my-7" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />
            <p className="font-mono text-sm mb-16" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Every review is verified. Every voice is real.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center gap-10 md:gap-16 flex-wrap"
          >
            {[
              { icon: <Star className="w-5 h-5 fill-current" style={{ color: '#C9A24A' }} />, value: avgRating, sub: 'Average Rating' },
              { icon: <Coffee className="w-5 h-5" style={{ color: '#C9A24A' }} />, value: reviews.length || '—', sub: 'Total Reviews' },
              { icon: <Flame className="w-5 h-5" style={{ color: '#C9A24A' }} />, value: `${pct}%`, sub: '5-Star Reviews' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                {s.icon}
                <div className="text-left">
                  <p className="font-mono font-black" style={{ fontSize: '2rem', color: '#C9A24A', lineHeight: 1 }}>{s.value}</p>
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{s.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Headline */}
      <div className="py-10 px-6 text-center" style={{ borderBottom: '1px solid rgba(201,162,74,0.06)' }}>
        <p className="font-serif font-bold" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em' }}>
          Trusted by Patriots Across the Country
        </p>
      </div>

      {/* Reviews Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Sort Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-10">
            <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.45)' }} />
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className="font-mono text-[10px] tracking-wide uppercase px-3 py-1.5 transition-all"
                style={{
                  border: `1px solid ${sort === opt.value ? 'rgba(201,162,74,0.55)' : 'rgba(201,162,74,0.14)'}`,
                  color: sort === opt.value ? '#C9A24A' : 'rgba(255,255,255,0.35)',
                  background: sort === opt.value ? 'rgba(201,162,74,0.08)' : 'transparent',
                  borderRadius: '4px',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[...Array(6)].map((_, i) => <div key={i} className="h-52 animate-pulse" style={{ background: '#0D0D0D', borderRadius: '10px' }} />)}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.18)' }}>No reviews yet. Be the first Torchbearer.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-6">
                  <ReviewCard review={featured} featured index={0} />
                </div>
              )}
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {rest.map((review, i) => (
                  <ReviewCard key={review.id} review={review} index={i + 1} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Join the Torchbearers</p>
        <h2 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
          Share Your Experience.
        </h2>
        <p className="font-heading mb-10" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.9rem', lineHeight: 1.9 }}>
          Become part of the story. Your voice matters to the movement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://torch-republic.com/pages/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-all hover:opacity-85"
            style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 44px', borderRadius: '4px' }}
          >
            Write a Review →
          </a>
          <a
            href="/CoffeeCollection"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-75"
            style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.35)', padding: '16px 36px', borderRadius: '4px' }}
          >
            Shop the Collection
          </a>
        </div>
      </section>
    </div>
  );
}