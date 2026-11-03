import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const RG = '#E6AC45';

// Community member photos (lifestyle/ritual imagery) — verified reachable.
// Removed 4b8c7e3f1_14.png + 7a2d9f5e8_15.png (404).
const COMMUNITY_PHOTOS = [
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8815056a9_8.png',
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1cde802f2_9.png',
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/55f9e1350_10.png',
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0a615b4db_11.png',
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2bcbd60ef_12.png',
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9d0e4d06a_13.png',
];

// Product name mapping from handle
const PRODUCT_NAMES = {
  'mooncap-restore': 'MoonCap Restore',
  'glowmind-clarity': 'GlowMind Clarity',
  'suncap-rise': 'SunCap Rise',
  'the-oracle': 'The Oracle',
  'mystic-bloom': 'Mystic Bloom',
  'dreamcap-blend': 'DreamCap Blend',
  'the-monk': 'The Monk',
  'the-alchemist': 'The Alchemist',
  'the-ascendant': 'The Ascendant',
};

const getProductName = (handle) => {
  if (!handle) return 'Torch Republic';
  const slug = handle.replace('-instant-mushroom-coffee', '').replace('-instant-coffee', '').replace('-matcha-blend', '');
  return PRODUCT_NAMES[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

export default function CustomerTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews from database
  const { data: reviews = [] } = useQuery({
    queryKey: ['customer-testimonials'],
    queryFn: async () => {
      const allReviews = await base44.entities.Review.list();
      // Filter for high-quality reviews (4+ stars) with meaningful content
      return allReviews
        .filter(r => r.rating >= 4 && r.body && r.body.length > 20)
        .sort((a, b) => new Date(b.review_date) - new Date(a.review_date))
        .slice(0, 12); // Limit to 12 reviews
    },
  });

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, reviews.length - 3) : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 3 ? 0 : prev + 1));
  };

  const visibleTestimonials = reviews.slice(currentIndex, currentIndex + 3);

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Real Members, Real Rituals
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F7F2E9' }}>
            See How Our Members Are Using Torch Republic
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Join thousands making their morning ritual more intentional
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((review, idx) => {
            const photoIndex = (currentIndex + idx) % COMMUNITY_PHOTOS.length;
            const productName = getProductName(review.product_handle);
            
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col h-full"
                style={{
                  background: 'rgba(230,183,173,0.04)',
                  border: `1px solid ${RG}15`,
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                {/* Community Photo */}
                <div className="h-64 overflow-hidden" style={{ background: '#0F0E0D' }}>
                  <img
                    src={COMMUNITY_PHOTOS[photoIndex]}
                    alt={`${review.reviewer_name}'s ritual`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Graceful fallback to the next valid photo in the array
                      const fallback = COMMUNITY_PHOTOS[(photoIndex + 1) % COMMUNITY_PHOTOS.length];
                      if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array(Math.floor(review.rating)).fill(null).map((_, i) => (
                      <Star key={i} size={14} style={{ fill: RG, stroke: RG }} />
                    ))}
                  </div>

                  {/* Testimonial */}
                  <p className="font-heading text-sm mb-4 flex-1" style={{ color: '#F7F2E9', fontWeight: 300, lineHeight: 1.7 }}>
                    "{review.body}"
                  </p>

                  {/* Divider */}
                  <div style={{ height: '1px', background: `${RG}15`, margin: '16px 0' }} />

                  {/* User Info */}
                  <div>
                    <p className="font-serif font-bold text-sm" style={{ color: '#F7F2E9' }}>
                      {review.reviewer_name}
                    </p>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2" style={{ color: RG }}>
                      {productName}
                    </p>
                    <p className="font-heading text-[9px]" style={{ color: 'rgba(240,235,225,0.4)' }}>
                      Verified Customer
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={goToPrevious}
            className="p-2.5 rounded-full transition-all hover:opacity-70"
            style={{
              background: `${RG}10`,
              border: `1px solid ${RG}25`,
              color: RG,
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {Array(Math.ceil(reviews.length / 3)).fill(null).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx * 3)}
                className="transition-all"
                style={{
                  width: currentIndex === idx * 3 ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: currentIndex === idx * 3 ? RG : `${RG}30`,
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2.5 rounded-full transition-all hover:opacity-70"
            style={{
              background: `${RG}10`,
              border: `1px solid ${RG}25`,
              color: RG,
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}