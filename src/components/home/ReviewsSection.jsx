import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const RG = '#E6B7AD';

const FALLBACK_REVIEWS = [
  {
    reviewer_name: 'Megan T.',
    location: 'Austin, TX',
    rating: 5,
    body: "I switched from a $6 daily latte habit to Torch Republic and I genuinely feel better. Smoother energy, no afternoon crash. The packaging is beautiful too.",
    product_handle: 'glowmind-clarity-blend',
  },
  {
    reviewer_name: 'Jordan K.',
    location: 'Denver, CO',
    rating: 5,
    body: "I was skeptical about mushroom coffee but the GlowMind blend tastes like actual coffee. No weird aftertaste. Just smooth, clear energy.",
    product_handle: 'glowmind-clarity-blend',
  },
  {
    reviewer_name: 'Sarah M.',
    location: 'Portland, OR',
    rating: 5,
    body: "The Monk Matcha is incredible. Calm focus without the jitters I get from coffee. This is my new afternoon ritual.",
    product_handle: 'the-monk-matcha-blend',
  },
  {
    reviewer_name: 'Chris D.',
    location: 'Nashville, TN',
    rating: 5,
    body: "Torchbearer is dark and rich and exactly what I wanted. No machine, no pods, perfect cup every morning. Worth every penny.",
    product_handle: 'torchbearer',
  },
  {
    reviewer_name: 'Amanda L.',
    location: 'Seattle, WA',
    rating: 5,
    body: "The 3-pack bundle was the best way to try a few blends. All three were outstanding. Already subscribed and saving 20%.",
    product_handle: 'glowmind-clarity-blend',
  },
  {
    reviewer_name: 'Tyler R.',
    location: 'Chicago, IL',
    rating: 5,
    body: "I do one cup of SunCap Rise every morning before my workout. Clear energy, no crash. This has become non-negotiable for me.",
    product_handle: 'suncap-rise',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <Star key={n} className="w-3 h-3" fill={n <= rating ? RG : 'transparent'} stroke={n <= rating ? RG : 'rgba(230,183,173,0.3)'} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const { data: dbReviews = [] } = useQuery({
    queryKey: ['homepage-reviews'],
    queryFn: () => base44.entities.Review.filter({ rating: { $gte: 4 } }, '-created_date', 12),
  });

  const reviews = dbReviews.length >= 4 ? dbReviews.slice(0, 6) : FALLBACK_REVIEWS;

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[8px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Torchbearer Reviews
          </p>
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            What Early Torchbearers Are Saying
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4" fill={RG} stroke={RG} />)}
            </div>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              4.9 / 5 average rating
            </span>
          </div>
        </motion.div>

        {/* Featured review carousel */}
        <div className="relative" style={{ minHeight: '220px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45 }}
              className="max-w-[720px] mx-auto text-center p-8"
              style={{ background: '#111', border: '1px solid rgba(230,183,173,0.12)' }}
            >
              <StarRating rating={reviews[currentIdx]?.rating || 5} />
              <p className="font-heading text-base mt-5 mb-5"
                style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 300, lineHeight: 1.85, fontStyle: 'italic' }}>
                "{reviews[currentIdx]?.body}"
              </p>
              <div>
                <p className="font-serif font-bold text-white text-sm">{reviews[currentIdx]?.reviewer_name}</p>
                {reviews[currentIdx]?.location && (
                  <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(230,183,173,0.45)' }}>
                    {reviews[currentIdx].location}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className="transition-all"
              style={{
                width: i === currentIdx ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === currentIdx ? RG : 'rgba(230,183,173,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}