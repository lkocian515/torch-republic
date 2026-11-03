import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const RG = '#E6AC45';
const GOLD = '#E6AC45';

export default function ReviewsCarousel({ reviews }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + reviewsPerPage) % reviews.length);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - reviewsPerPage + reviews.length) % reviews.length);
  };

  const goToPage = (index) => {
    setCurrentIndex(index * reviewsPerPage);
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

  // Fill with reviews from start if we don't have enough at the end
  const displayReviews = visibleReviews.length < reviewsPerPage
    ? [...visibleReviews, ...reviews.slice(0, reviewsPerPage - visibleReviews.length)]
    : visibleReviews;

  return (
    <section className="py-20 px-6 md:px-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)', background: '#0a0a0a' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4"
            style={{ color: `${RG}60` }}
          >
            Customer Reviews
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}
          >
            What Our Community Says
          </h2>
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" style={{ color: GOLD }} />
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((review, idx) => (
              <motion.div
                key={`${review.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-6"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                  border: '1px solid rgba(230,183,173,0.12)',
                  borderRadius: '6px',
                  minHeight: '280px',
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: i < review.rating ? GOLD : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote
                  className="font-heading mb-6 flex-1"
                  style={{ fontSize: '0.95rem', color: '#F7F2E9', lineHeight: 1.7 }}
                >
                  "{review.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                  <div>
                    <p
                      className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                      style={{ color: RG }}
                    >
                      {review.reviewer_name}
                    </p>
                    {review.location && (
                      <p
                        className="font-heading text-xs"
                        style={{ color: 'rgba(240,235,225,0.35)' }}
                      >
                        {review.location}
                      </p>
                    )}
                  </div>
                  {review.review_date && (
                    <p
                      className="font-mono text-[7px] tracking-[0.18em] uppercase"
                      style={{ color: 'rgba(230,183,173,0.3)' }}
                    >
                      {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prevPage}
                className="p-3 rounded-full transition-all hover:bg-white/10"
                style={{ color: RG, border: `1px solid ${RG}30` }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Pagination dots */}
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className="transition-all"
                    style={{
                      width: idx === Math.floor(currentIndex / reviewsPerPage) ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: idx === Math.floor(currentIndex / reviewsPerPage) ? RG : `rgba(230,183,173,0.2)`,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-3 rounded-full transition-all hover:bg-white/10"
                style={{ color: RG, border: `1px solid ${RG}30` }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}