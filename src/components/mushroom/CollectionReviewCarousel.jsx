import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// Sample reviews for each category (fallback if no DB reviews)
const SAMPLE_REVIEWS = {
  'matcha': [
    { reviewer_name: 'Sarah M.', location: 'Austin, TX', rating: 5, body: 'The Monk is my morning ritual now. Calm energy without the jitters. Matcha has never tasted this smooth.' },
    { reviewer_name: 'James K.', location: 'Denver, CO', rating: 5, body: 'I was skeptical about instant matcha, but The Alchemist is incredible. No whisk needed, just pure focused creativity.' },
    { reviewer_name: 'Emily R.', location: 'Portland, OR', rating: 5, body: 'Finally, a matcha that fits my busy lifestyle. The Ascendant gives me clean energy that lasts all morning.' },
  ],
  'mushroom-coffee': [
    { reviewer_name: 'Michael T.', location: 'Nashville, TN', rating: 5, body: 'GlowMind Clarity is my secret weapon for deep work. Lion\'s Mane + coffee is a game changer for focus.' },
    { reviewer_name: 'Rachel P.', location: 'Seattle, WA', rating: 5, body: 'MoonCap Restore helped me replace my evening wine habit. Rich, comforting, and I sleep better now.' },
    { reviewer_name: 'David L.', location: 'Chicago, IL', rating: 5, body: 'SunCap Rise is the perfect morning ritual. No crash, just clean energy and mental clarity.' },
  ],
  'classic-coffee': [
    { reviewer_name: 'Tom H.', location: 'Dallas, TX', rating: 5, body: 'Torchbearer is the best instant coffee I\'ve ever had. Bold, smooth, and ready in seconds. No machine needed.' },
    { reviewer_name: 'Jennifer S.', location: 'Miami, FL', rating: 5, body: 'Ember Reserve is my late-night work companion. Dark, rich, and never bitter. Pure coffee perfection.' },
    { reviewer_name: 'Chris B.', location: 'Phoenix, AZ', rating: 5, body: 'Ember Reserve replaced my expensive espresso habit. Same bold flavor, fraction of the time and cost.' },
  ],
};

export default function CollectionReviewCarousel({ category = 'matcha' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch reviews from database
  const { data: dbReviews = [] } = useQuery({
    queryKey: ['reviews', category],
    queryFn: async () => {
      try {
        const allReviews = await base44.entities.Review.list();
        // Filter by category if product_handle matches
        return allReviews.filter(r => r.product_handle && r.product_handle.includes(category));
      } catch {
        return [];
      }
    },
  });

  // Use DB reviews if available, otherwise use sample reviews
  const displayReviews = dbReviews.length > 0 ? dbReviews : SAMPLE_REVIEWS[category] || SAMPLE_REVIEWS['matcha'];

  // Auto-rotate reviews
  useEffect(() => {
    if (!isAutoPlaying || displayReviews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayReviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, displayReviews.length]);

  if (displayReviews.length === 0) return null;

  const nextReview = () => setCurrentIndex(prev => (prev + 1) % displayReviews.length);
  const prevReview = () => setCurrentIndex(prev => (prev - 1 + displayReviews.length) % displayReviews.length);

  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) 24px', background: '#0A0A0A' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: '#E6B7AD' }}>
            Customer Stories
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', color: '#F5EFE6' }}>
            Real People. Real Rituals.
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl mx-auto"
              >
                <div className="text-center px-6 py-10" style={{ background: '#111111', borderRadius: '12px', border: '1px solid rgba(230,183,173,0.12)' }}>
                  {/* Quote icon */}
                  <div className="mb-6 flex justify-center">
                    <Quote size={32} style={{ color: '#E6B7AD', opacity: 0.6 }} />
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < (displayReviews[currentIndex].rating || 5) ? '#E6B7AD' : 'none'}
                        stroke={i < (displayReviews[currentIndex].rating || 5) ? '#E6B7AD' : '#444'}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="font-heading text-sm mb-6" style={{ color: 'rgba(245,239,230,0.75)', lineHeight: 1.8, fontStyle: 'italic' }}>
                    "{displayReviews[currentIndex].body}"
                  </p>

                  {/* Reviewer info */}
                  <div className="flex flex-col items-center gap-1">
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase font-bold" style={{ color: '#E6B7AD' }}>
                      {displayReviews[currentIndex].reviewer_name}
                    </p>
                    <p className="font-heading text-xs" style={{ color: 'rgba(210,195,175,0.5)' }}>
                      {displayReviews[currentIndex].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation arrows */}
          {displayReviews.length > 1 && (
            <>
              <button
                onClick={prevReview}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:opacity-100"
                style={{ background: 'rgba(230,183,173,0.15)', color: '#E6B7AD' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextReview}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:opacity-100"
                style={{ background: 'rgba(230,183,173,0.15)', color: '#E6B7AD' }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {displayReviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {displayReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="transition-all rounded-full"
                  style={{
                    width: index === currentIndex ? '28px' : '8px',
                    height: '8px',
                    background: index === currentIndex ? '#E6B7AD' : 'rgba(230,183,173,0.25)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}