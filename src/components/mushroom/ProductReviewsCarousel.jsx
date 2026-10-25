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
        // Filter reviews for this product - handle different naming conventions
        // Reviews may have handles like "mooncap-restore-instant-mushroom-coffee" or "mooncap-restore"
        const filtered = reviews.filter(r => {
          if (r.rating < 4) return false;
          const reviewHandle = r.product_handle || '';
          // Match if review handle contains the product slug
          return reviewHandle.includes(productSlug);
        });
        console.log(`Reviews for ${productSlug}:`, filtered.length, 'of', reviews.length);
        return filtered;
      } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
    },
  });

  if (isLoading) return null;
  if (!allReviews || allReviews.length === 0) {
    console.log('No reviews found for', productSlug);
    return null;
  }

  // Calculate average rating
  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
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
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-10" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p
            className="font-mono text-[8px] md:text-[9px] tracking-[0.5em] uppercase mb-3"
            style={{ color: `${RG}60` }}
          >
            Customer Reviews
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            What People Are Saying
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-current" style={{ color: i < Math.round(avgRating) ? GOLD : 'rgba(255,255,255,0.15)' }} />
            ))}
          </div>
          <p className="font-mono text-[7px] md:text-[8px] tracking-[0.2em]" style={{ color: `${RG}50` }}>
            {avgRating.toFixed(1)} out of 5 · {allReviews.length} verified review{allReviews.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {displayReviews.map((review, idx) => (
              <motion.div
                key={`${review.id}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="p-4 md:p-5"
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                  border: '1px solid rgba(230,183,173,0.12)',
                  borderRadius: '6px',
                  minHeight: '220px',
                }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current"
                      style={{ color: i < review.rating ? GOLD : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>

                {/* Review text */}
                <blockquote
                  className="font-heading mb-4 md:mb-5 flex-1"
                  style={{ fontSize: '0.8rem', md: '0.9rem', color: '#F5EFE6', lineHeight: 1.6 }}
                >
                  "{review.body.length > 150 ? review.body.substring(0, 150) + '...' : review.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-2 md:pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                  <p
                    className="font-mono text-[7px] md:text-[8px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: RG }}
                  >
                    {review.reviewer_name}
                  </p>
                  {review.review_date && (
                    <p
                      className="font-mono text-[5px] md:text-[6px] tracking-[0.15em] uppercase"
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
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={prevPage}
                className="p-2 md:p-2.5 rounded-full transition-all hover:bg-white/10"
                style={{ color: RG, border: `1px solid ${RG}30` }}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Pagination dots */}
              <div className="flex items-center gap-1.5 md:gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className="transition-all"
                    style={{
                      width: idx === Math.floor(currentIndex / reviewsPerPage) ? '18px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      background: idx === Math.floor(currentIndex / reviewsPerPage) ? RG : `rgba(230,183,173,0.2)`,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-2 md:p-2.5 rounded-full transition-all hover:bg-white/10"
                style={{ color: RG, border: `1px solid ${RG}30` }}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}