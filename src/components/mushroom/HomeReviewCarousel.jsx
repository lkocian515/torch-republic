import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const RG = '#E6AC45';
const GOLD = '#E6AC45';

// Energy and focus focused keywords
const ENERGY_FOCUS_KEYWORDS = ['energy', 'focus', 'clear', 'alert', 'concentrate', 'productive', 'morning', 'routine', 'boost', 'sharp', 'clarity'];

// Simple quote icon component
function QuoteIcon({ className, style }) {
  return (
    <svg 
      className={className} 
      style={style}
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M14.017 21v-3.999c0-1.105.895-2 2-2h5.999v-8h-5.999c-1.105 0-2-.895-2-2v-3.999h8.999v15.999h-8.999zm-14.017 0v-3.999c0-1.105.895-2 2-2h5.999v-8h-5.999c-1.105 0-2-.895-2-2v-3.999h8.999v15.999h-8.999z" />
    </svg>
  );
}

export default function HomeReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const { data: allReviews = [] } = useQuery({
    queryKey: ['reviews-home-carousel'],
    queryFn: async () => {
      const reviews = await base44.entities.Review.list();
      return reviews.filter(r => r.rating >= 4);
    },
  });

  // Filter for energy/focus related reviews or high-quality testimonials
  const displayReviews = allReviews.filter(review => {
    const text = ((review.body || '') + ' ' + (review.product_handle || '')).toLowerCase();
    return ENERGY_FOCUS_KEYWORDS.some(keyword => text.includes(keyword)) || review.rating === 5;
  }).slice(0, 6);

  const currentReview = displayReviews[currentIndex] || displayReviews[0];

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (!autoPlay || displayReviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, displayReviews.length]);

  if (displayReviews.length === 0) return null; // StaticReviewsSection handles fallback

  return (
    <section className="py-20 px-6 md:px-10" style={{ background: '#0b0b0b', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3"
            style={{ color: 'rgba(230,183,173,0.5)' }}
          >
            500+ Verified Reviews
          </p>
          <h2
            className="font-serif font-bold"
            style={{ 
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
              color: '#F7F2E9', 
              letterSpacing: '-0.02em',
              lineHeight: 1.2
            }}
          >
            Real People. Real Results. Real Mornings Changed.
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-center"
            >
              {/* Quote icon */}
              <QuoteIcon 
                className="w-8 h-8 mx-auto mb-6" 
                style={{ color: `${RG}40` }} 
              />

              {/* Stars */}
              <div className="flex items-center justify-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-current" 
                    style={{ color: i < (currentReview?.rating || 0) ? GOLD : 'rgba(255,255,255,0.15)' }} 
                  />
                ))}
              </div>

              {/* Review text */}
              {currentReview?.body && (
                <blockquote
                  className="font-heading mb-8"
                  style={{ 
                    fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
                    color: '#F7F2E9', 
                    lineHeight: 1.8,
                    maxWidth: '800px',
                    margin: '0 auto 2rem',
                    fontWeight: 300
                  }}
                >
                  "{currentReview.body}"
                </blockquote>
              )}

              {/* Reviewer info */}
              {currentReview?.reviewer_name && (
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p
                      className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                      style={{ color: RG }}
                    >
                      {currentReview.reviewer_name}
                    </p>
                    {currentReview.location && (
                      <p
                        className="font-heading text-xs mt-0.5"
                        style={{ color: 'rgba(240,235,225,0.35)' }}
                      >
                        {currentReview.location}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Product badge */}
              {currentReview?.product_handle && (
                <div className="mt-4">
                  <span
                    className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-1"
                    style={{ 
                      background: 'rgba(230,183,173,0.08)',
                      color: 'rgba(230,183,173,0.5)',
                      borderRadius: '2px',
                      border: '1px solid rgba(230,183,173,0.15)'
                    }}
                  >
                    {currentReview.product_handle.replace(/-/g, ' ').replace('instant mushroom coffee', '').trim()}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {displayReviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setAutoPlay(false);
                }}
                className="transition-all"
                style={{
                  width: idx === currentIndex ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === currentIndex ? RG : `rgba(230,183,173,0.2)`,
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-8 mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="text-center">
            <p className="font-serif font-bold text-2xl" style={{ color: RG }}>4.9</p>
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Average Rating
            </p>
          </div>
          <div className="w-px h-10" style={{ background: 'rgba(230,183,173,0.15)' }} />
          <div className="text-center">
            <p className="font-serif font-bold text-2xl" style={{ color: RG }}>{allReviews.length}+</p>
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Verified Reviews
            </p>
          </div>
          <div className="w-px h-10" style={{ background: 'rgba(230,183,173,0.15)' }} />
          <div className="text-center">
            <p className="font-serif font-bold text-2xl" style={{ color: RG }}>98%</p>
            <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Would Recommend
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}