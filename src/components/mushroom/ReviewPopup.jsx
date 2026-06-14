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

  const { data: allReviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const reviews = await base44.entities.Review.list('-review_date', 200);
      return reviews.filter(r => r.rating >= 4);
    },
  });

  // Shuffle and pick 15 unique reviews for popup
  const reviews = React.useMemo(() => {
    const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 15);
  }, [allReviews.length]);

  // Show popup after 3 seconds on first visit, then cycle: 8 seconds open, 5 seconds closed
  useEffect(() => {
    if (reviews.length === 0 || hasClosed) return;
    
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        // Keep open for 8 seconds, then close for 5 seconds
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => {
            if (!hasClosed) setIsOpen(true);
          }, 5000);
        }, 8000);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [reviews.length, hasClosed, isOpen]);

  // Auto-rotate reviews every 10 seconds
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isOpen, reviews.length]);

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
          className="fixed bottom-0 left-0 z-40 m-2 md:m-4 lg:m-6"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
        >
          <div
            className="relative w-full max-w-[140px] sm:max-w-[180px] md:max-w-sm"
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
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="p-3">
              {/* Header */}
              <div className="mb-2">
                <p
                  className="font-mono text-[5px] tracking-[0.4em] uppercase mb-1.5"
                  style={{ color: `${RG}60` }}
                >
                  Review
                </p>
                <div className="flex items-center gap-0.5 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-2.5 h-2.5 fill-current"
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
                  className="font-heading mb-2"
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(240,235,225,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  "{currentReview.body.length > 140 ? currentReview.body.substring(0, 140) + '...' : currentReview.body}"
                </blockquote>

                {/* Reviewer info */}
                <div className="flex items-center justify-between pt-1.5" style={{ borderTop: `1px solid ${RG}15` }}>
                  <p
                    className="font-mono text-[6px] tracking-[0.25em] uppercase font-bold"
                    style={{ color: RG }}
                  >
                    {currentReview.reviewer_name}
                  </p>
                  {currentReview.review_date && (
                    <p
                      className="font-mono text-[5px] tracking-[0.15em] uppercase"
                      style={{ color: `${RG}50` }}
                    >
                      {new Date(currentReview.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Navigation */}
              {reviews.length > 1 && (
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={handlePrev}
                    className="p-1 rounded-full transition-all hover:bg-white/10"
                    style={{ color: RG }}
                  >
                    <ChevronLeft className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-1">
                    {reviews.map((_, idx) => (
                      <div
                        key={idx}
                        className="transition-all"
                        style={{
                          width: idx === currentIndex ? '10px' : '3px',
                          height: '3px',
                          borderRadius: '1.5px',
                          background: idx === currentIndex ? RG : `rgba(230,183,173,0.2)`,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-1 rounded-full transition-all hover:bg-white/10"
                    style={{ color: RG }}
                  >
                    <ChevronRight className="w-3 h-3" />
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