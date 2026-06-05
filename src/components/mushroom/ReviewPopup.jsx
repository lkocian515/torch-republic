import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-lg"
              style={{
                pointerEvents: 'auto',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                border: `1px solid ${RG}30`,
                borderRadius: '8px',
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${RG}15, inset 0 1px 0 ${RG}08`,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full transition-all hover:bg-white/10"
                style={{ color: RG }}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative top bar */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${RG}40 20%, ${GOLD}60 50%, ${RG}40 80%, transparent 100%)`,
                }}
              />

              {/* Content */}
              <div className="px-6 py-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <p
                    className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3"
                    style={{ color: `${RG}60` }}
                  >
                    Customer Reviews
                  </p>
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: i < currentReview.rating ? GOLD : 'rgba(255,255,255,0.15)' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Review content */}
                <motion.div
                  key={currentReview.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <blockquote
                    className="font-serif text-center mb-6"
                    style={{
                      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                      color: '#F5EFE6',
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    "{currentReview.body}"
                  </blockquote>

                  {/* Reviewer info */}
                  <div className="text-center">
                    <p
                      className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1"
                      style={{ color: RG, fontWeight: 700 }}
                    >
                      — {currentReview.reviewer_name}
                    </p>
                    {currentReview.location && (
                      <p
                        className="font-heading text-xs"
                        style={{ color: 'rgba(240,235,225,0.35)' }}
                      >
                        {currentReview.location}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Navigation dots */}
                {reviews.length > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-6">
                    {reviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="transition-all"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: idx === currentIndex ? RG : 'rgba(230,183,173,0.2)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Navigation arrows */}
                {reviews.length > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6" style={{ borderTop: `1px solid ${RG}15` }}>
                    <button
                      onClick={handlePrev}
                      className="p-2 rounded-full transition-all hover:bg-white/10"
                      style={{ color: RG }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <p
                      className="font-mono text-[8px] tracking-[0.2em] uppercase"
                      style={{ color: `${RG}50` }}
                    >
                      {currentIndex + 1} of {reviews.length}
                    </p>
                    <button
                      onClick={handleNext}
                      className="p-2 rounded-full transition-all hover:bg-white/10"
                      style={{ color: RG }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative bottom bar */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${RG}30 20%, ${GOLD}50 50%, ${RG}30 80%, transparent 100%)`,
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}