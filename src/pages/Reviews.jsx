import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ReviewCard, { GoldStars } from '../components/reviews/ReviewCard';
import TrustBar from '../components/reviews/TrustBar';

const FILTERS = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'top', label: 'Highest Rated' },
  { key: 'founders', label: 'Founders Favorites' },
  { key: 'liberty', label: 'Liberty Icons' },
];

export default function Reviews() {
  const [filter, setFilter] = useState('recent');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: () => base44.entities.Review.list('-review_date', 50),
  });

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '4.8';

  const filtered = reviews.filter(r => {
    const h = (r.product_handle || '').toLowerCase();
    if (filter === 'founders') return h.includes('founders') || h.includes('washington') ||
      h.includes('jefferson') || h.includes('lincoln') || h.includes('franklin') ||
      h.includes('adams') || h.includes('roosevelt') || h.includes('blend');
    if (filter === 'liberty') return h.includes('liberty') || h.includes('eagle') ||
      h.includes('uncle-sam') || h.includes('rosie') || h.includes('old-glory');
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filter === 'top') return b.rating - a.rating;
    return new Date(b.review_date || 0) - new Date(a.review_date || 0);
  });

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="py-24 px-6 md:px-12 text-center" style={{ borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Verified Legacy Voices
          </p>
          <h1 className="font-serif text-white mb-5" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            What Torchbearers Are Saying
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <GoldStars rating={5} size="lg" />
            <span className="font-mono font-black" style={{ fontSize: '1.4rem', color: '#C9A24A' }}>{avgRating}</span>
          </div>
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Every review is verified. Every voice is real.
          </p>
        </motion.div>
      </section>

      {/* Filter bar */}
      <section className="px-6 md:px-12 py-6" style={{ borderBottom: '1px solid rgba(201,162,74,0.06)' }}>
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="font-mono text-[10px] tracking-wider uppercase px-4 py-2 rounded-sm transition-all"
              style={{
                background: filter === f.key ? 'rgba(201,162,74,0.12)' : 'transparent',
                color: filter === f.key ? '#C9A24A' : 'rgba(255,255,255,0.35)',
                border: filter === f.key ? '1px solid rgba(201,162,74,0.35)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              {f.label}
            </button>
          ))}
          <span className="font-mono text-[10px] ml-auto" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {sorted.length} review{sorted.length !== 1 ? 's' : ''}
          </span>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">

          {/* Trust bar */}
          <TrustBar avgRating={avgRating} totalReviews={reviews.length} />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl animate-pulse" style={{ background: '#111', height: 200 }} />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>No reviews in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-6">
                  <ReviewCard review={featured} featured={true} index={0} />
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rest.map((r, i) => <ReviewCard key={r.id} review={r} index={i + 1} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center" style={{ borderTop: '1px solid rgba(201,162,74,0.07)', background: '#070707' }}>
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Join the Torchbearers
          </p>
          <h2 className="font-serif text-white font-bold mb-4" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', letterSpacing: '-0.02em' }}>
            Share your experience and become<br />part of the story.
          </h2>
          <div className="h-px w-12 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />
          <a href="https://torch-republic.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
            style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '16px 48px' }}>
            Write a Review →
          </a>
        </div>
      </section>
    </div>
  );
}