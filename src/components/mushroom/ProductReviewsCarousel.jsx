import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

export default function ProductReviewsCarousel({ productSlug }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  // Fetch reviews for this specific product
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productSlug],
    queryFn: async () => {
      try {
        const reviews = await base44.entities.Review.list();
        // Filter reviews for this product by product_handle
        return reviews.filter(r => r.product_handle === productSlug && r.rating >= 4);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
    },
  });

  if (isLoading || allReviews.length === 0) return null;

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const visibleReviews = allReviews.slice(
    currentIndex,
    currentIndex + reviewsPerPage
  );
  const displayReviews =
    visibleReviews.length < reviewsPerPage
      ? [...visibleReviews, ...allReviews.slice(0, reviewsPerPage - visibleReviews.length)]
      : visibleReviews;

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + reviewsPerPage) % allReviews.length);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - reviewsPerPage + allReviews.length) % allReviews.length);
  };

  const goToPage = (index) => {
    setCurrentIndex(index * reviewsPerPage);
  };

  return (
    <section className="py-16 px-6 md:px-10" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3"
            style={{ color: `${RG}60` }}
          >
            Customer Reviews
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center gap-1.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" style={{ color: GOLD }} />
            ))}
          </div>
          <p className="font-mono text-[8px] tracking-[0.2em]" style={{ color: `${RG}50` }}>
            {allReviews.length} verified review{allReviews.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((review, idx) => (
              <motion.div
                key={`${review.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-5"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                  border: '1px solid rgba(230,183,173,0.12)',
                  borderRadius: '6px',
                  minHeight: '240px',
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
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
                  className="font-heading mb-5 flex-1"
                  style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.75)', lineHeight: 1.65 }}
                >
                  "{review.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                  <p
                    className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: RG }}
                  >
                    {review.reviewer_name}
                  </p>
                  {review.review_date && (
                    <p
                      className="font-mono text-[6px] tracking-[0.15em] uppercase"
                      style={{ color: `${RG}40` }}
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
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevPage}
                className="p-2.5 rounded-full transition-all hover:bg-white/10"
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
                      width: idx === Math.floor(currentIndex / reviewsPerPage) ? '22px' : '7px',
                      height: '7px',
                      borderRadius: '3.5px',
                      background: idx === Math.floor(currentIndex / reviewsPerPage) ? RG : `rgba(230,183,173,0.2)`,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-2.5 rounded-full transition-all hover:bg-white/10"
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