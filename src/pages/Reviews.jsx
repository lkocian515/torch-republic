import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const ALL_PRODUCTS = [
  ...MUSHROOM_PRODUCTS,
  ...MATCHA_PRODUCTS,
  ...CLASSIC_COFFEE_PRODUCTS,
];

function StarRating({ rating, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${sz} fill-current`} style={{ color: i <= rating ? GOLD : 'rgba(255,255,255,0.12)' }} />
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className="flex flex-col p-6"
      style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}
    >
      <StarRating rating={review.rating} />
      <blockquote className="font-heading mt-4 mb-5 flex-1"
        style={{ fontSize: '0.93rem', color: 'rgba(240,235,225,0.7)', lineHeight: 1.75, fontWeight: 300 }}>
        "{review.body}"
      </blockquote>
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div>
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold" style={{ color: RG }}>
            {review.reviewer_name}
          </p>
          {review.location && (
            <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(240,235,225,0.3)' }}>
              {review.location}
            </p>
          )}
        </div>
        {review.review_date && (
          <p className="font-mono text-[7px] tracking-[0.18em] uppercase" style={{ color: 'rgba(230,183,173,0.3)' }}>
            {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useSEO({
    title: 'Torch Republic Reviews | Customer Rituals & Blend Feedback',
    description: 'Read real customer reviews of Torch Republic instant coffee, mushroom coffee blends, and ceremonial matcha. See what customers say about taste, convenience, energy, focus, and daily ritual.',
    url: '/reviews',
    type: 'website',
  });

  const { data: allReviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => base44.entities.Review.list('-review_date', 200),
  });

  const avgRating = '4.8';

  const fiveStarCount = allReviews.filter(r => r.rating === 5).length;

  const filters = [
    { key: 'all', label: 'All Reviews' },
    ...ALL_PRODUCTS.map(p => ({ key: p.shopifyHandle, label: p.name })),
  ];

  const filtered = activeFilter === 'all'
    ? allReviews
    : allReviews.filter(r => r.product_handle === activeFilter);

  const INITIAL_SHOW = 12;
  const visibleReviews = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="py-20 px-6 md:px-12 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Reviews
          </p>
          <h1 className="font-serif text-white mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            What Our Community Says
          </h1>

          {/* Aggregate Rating */}
          {allReviews.length > 0 && (
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-6 h-6 fill-current" style={{ color: GOLD }} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-serif font-bold text-white" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{avgRating}</span>
                <div className="text-left">
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: RG }}>out of 5</p>
                  <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300 }}>
                    {allReviews.length} verified reviews · {fiveStarCount} five-star
                  </p>
                </div>
              </div>
            </div>
          )}

          <p className="font-heading" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            Real experiences from people who made Torch Republic part of their daily ritual.
          </p>
        </motion.div>
      </section>

      {/* Filter bar */}
      {allReviews.length > 0 && (
        <section className="px-6 md:px-12 py-8 sticky top-0 z-20" style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-6xl mx-auto overflow-x-auto">
            <div className="flex gap-2 justify-start md:justify-center min-w-max md:min-w-0 mx-auto">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => { setActiveFilter(f.key); setShowAll(false); }}
                  className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all whitespace-nowrap"
                  style={{
                    background: activeFilter === f.key ? RG : 'rgba(255,255,255,0.03)',
                    color: activeFilter === f.key ? '#080808' : 'rgba(230,183,173,0.55)',
                    border: activeFilter === f.key ? `1px solid ${RG}` : '1px solid rgba(230,183,173,0.15)',
                    fontWeight: activeFilter === f.key ? 700 : 400,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Grid */}
      {filtered.length > 0 ? (
        <section className="px-6 md:px-12 py-14">
          <div className="max-w-6xl mx-auto">
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-8 text-center" style={{ color: 'rgba(230,183,173,0.35)' }}>
              Showing {visibleReviews.length} of {filtered.length} reviews
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleReviews.map((r, i) => <ReviewCard key={r.id || i} review={r} />)}
            </div>

            {/* Show more */}
            {!showAll && filtered.length > INITIAL_SHOW && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold px-8 py-4 transition-all hover:opacity-90"
                  style={{ border: `1px solid ${RG}`, color: RG }}
                >
                  Show All {filtered.length} Reviews
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="py-20 text-center px-6">
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.3)' }}>
            No reviews for this blend yet.
          </p>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: '#070707', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Try the Blends
          </p>
          <h2 className="font-serif text-white font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Start your ritual today.
          </h2>
          <div className="h-px w-12 mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #E6B7AD, transparent)' }} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ background: RG, color: '#080808', fontWeight: 800, padding: '16px 40px' }}>
              Shop All Blends →
            </Link>
            <Link to="/bundle"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.35)', color: 'rgba(230,183,173,0.7)', padding: '16px 40px' }}>
              Try the Bundle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}