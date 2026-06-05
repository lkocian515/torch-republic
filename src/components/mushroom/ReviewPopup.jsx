import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

export default function ReviewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClosed, setHasClosed] = useState(false);

  // Fetch reviews from database
  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        const reviews = await base44.entities.Review.list();
        // Filter for reviews with 4-5 stars only for the popup
        return reviews.filter(r => r.rating >= 4);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
    },
  });

  // Use only first 15 reviews for popup
  const reviews = allReviews.slice(0, 15);

  // Show popup after 3 seconds on first visit (if there are reviews)
  useEffect(() => {
    if (reviews.length > 0 && !hasClosed && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reviews.length, hasClosed, isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setHasClosed(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (isLoading || reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 z-40 m-4 md:m-6"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
        >
          <div
            className="relative w-full max-w-sm"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: `1px solid ${RG}30`,
              borderRadius: '6px',
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${RG}10`,
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all hover:bg-white/10"
              style={{ color: `${RG}60` }}
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="mb-3">
                <p
                  className="font-mono text-[6px] tracking-[0.4em] uppercase mb-2"
                  style={{ color: `${RG}60` }}
                >
                  Customer Review
                </p>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-current"
                      style={{ color: i < currentReview.rating ? GOLD : 'rgba(255,255,255,0.15)' }}
                    />
                  ))}
                </div>
              </div>

              {/* Review content */}
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <blockquote
                  className="font-heading mb-3"
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(240,235,225,0.75)',
                    lineHeight: 1.55,
                  }}
                >
                  "{currentReview.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${RG}15` }}>
                  <p
                    className="font-mono text-[6px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: RG }}
                  >
                    {currentReview.reviewer_name}
                  </p>
                  {currentReview.review_date && (
                    <p
                      className="font-mono text-[5px] tracking-[0.15em] uppercase"
                      style={{ color: `${RG}40` }}
                    >
                      {new Date(currentReview.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Navigation */}
              {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-full transition-all hover:bg-white/10"
                    style={{ color: RG }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {reviews.map((_, idx) => (
                      <div
                        key={idx}
                        className="transition-all"
                        style={{
                          width: idx === currentIndex ? '14px' : '4px',
                          height: '4px',
                          borderRadius: '2px',
                          background: idx === currentIndex ? RG : `rgba(230,183,173,0.2)`,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-full transition-all hover:bg-white/10"
                    style={{ color: RG }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}