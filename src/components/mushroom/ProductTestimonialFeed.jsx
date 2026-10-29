import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

function StarRow({ rating, size = 'sm' }) {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${sz} fill-current`}
          style={{ color: i < rating ? GOLD : 'rgba(255,255,255,0.12)' }} />
      ))}
    </div>
  );
}

export default function ProductTestimonialFeed({ productHandle, productName, accent }) {
  const [expanded, setExpanded] = useState(null);
  const color = accent || RG;

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['product-testimonials', productHandle],
    queryFn: async () => {
      const all = await base44.entities.Review.list();
      return all.filter(r => {
        if (r.rating < 4) return false;
        if (!r.body || r.body.trim().length < 20) return false;
        const handle = r.product_handle || '';
        // Match by full handle or by a shared slug prefix
        return handle === productHandle ||
          (productHandle && handle.includes(productHandle.split('-instant')[0].split('-matcha')[0]));
      }).slice(0, 9); // cap at 9
    },
    enabled: !!productHandle,
  });

  if (isLoading || reviews.length === 0) return null;

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  // Pick 1 "hero" review (longest body among 5-star reviews, else highest rating)
  const heroReview = [...reviews]
    .filter(r => r.rating === 5)
    .sort((a, b) => b.body.length - a.body.length)[0] || reviews[0];

  const restReviews = reviews.filter(r => r.id !== heroReview.id).slice(0, 6);

  return (
    <section className="py-14" style={{ borderTop: `1px solid rgba(230,183,173,0.08)` }}>
      {/* Section header */}
      <div className="text-center mb-10">
        <p className="font-mono text-[8px] tracking-[0.5em] uppercase mb-2" style={{ color: `${RG}55` }}>
          Customer Experiences
        </p>
        <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#FFFFFF' }}>
          {productName ? `What People Say About ${productName}` : 'What Our Customers Say'}
        </h2>
        {/* Summary row */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <StarRow rating={Math.round(avgRating)} size="lg" />
          <span className="font-serif font-bold" style={{ color: RG, fontSize: '1.1rem' }}>
            {avgRating.toFixed(1)}
          </span>
          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {reviews.length} verified review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Hero testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 relative p-6 md:p-8"
        style={{
          background: `linear-gradient(135deg, ${color}10 0%, rgba(15,14,14,0.8) 100%)`,
          border: `1px solid ${color}25`,
          borderRadius: '6px',
        }}
      >
        <Quote className="w-8 h-8 mb-4 opacity-30" style={{ color }} />
        <blockquote
          className="font-serif mb-5"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#F5EFE6', lineHeight: 1.75, fontStyle: 'italic' }}
        >
          "{heroReview.body}"
        </blockquote>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm"
              style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
              {heroReview.reviewer_name?.charAt(0) || '?'}
            </div>
            <div>
              <p className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold" style={{ color }}>
                {heroReview.reviewer_name}
              </p>
              {heroReview.location && (
                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  {heroReview.location}
                </p>
              )}
            </div>
          </div>
          <StarRow rating={heroReview.rating} />
        </div>
      </motion.div>

      {/* Grid of remaining reviews */}
      {restReviews.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {restReviews.map((review, idx) => {
            const isLong = review.body.length > 120;
            const isExpanded = expanded === review.id;
            const bodyText = isLong && !isExpanded
              ? review.body.slice(0, 120) + '…'
              : review.body;

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col p-4"
                style={{
                  background: 'linear-gradient(135deg, #161515 0%, #0f0e0e 100%)',
                  border: '1px solid rgba(230,183,173,0.1)',
                  borderRadius: '6px',
                }}
              >
                <StarRow rating={review.rating} />
                <p className="font-heading mt-3 mb-4 flex-1"
                  style={{ fontSize: '0.82rem', color: 'rgba(240,235,225,0.72)', lineHeight: 1.65 }}>
                  "{bodyText}"
                  {isLong && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : review.id)}
                      className="ml-1 font-mono text-[7px] tracking-[0.15em] uppercase underline"
                      style={{ color: `${RG}70` }}>
                      {isExpanded ? 'less' : 'more'}
                    </button>
                  )}
                </p>
                <div className="flex items-center justify-between pt-3"
                  style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
                  <p className="font-mono text-[7px] tracking-[0.25em] uppercase font-bold" style={{ color: RG }}>
                    {review.reviewer_name}
                  </p>
                  {review.review_date && (
                    <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}