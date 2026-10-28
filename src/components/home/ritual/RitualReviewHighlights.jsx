import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const GOLD = '#B48A4A';

// Retired product names that should NOT appear on the homepage.
// Reviews whose body text mentions these are filtered out.
const RETIRED_NAMES = [
  'DreamCap', 'Mystic Bloom', 'The Oracle', 'MoonCap', 'SunCap',
  'GlowMind', 'The Alchemist', 'The Monk', 'The Ascendant', 'Ember', 'matcha', 'Matcha',
];

// Current product handles — reviews matching these get a product label.
const PRODUCT_MAP = {
  'glowmind-clarity-instant-mushroom-coffee': 'Instant Mushroom Coffee',
  'torchbearer\u2122-single-origin-instant-coffee': 'Instant Classic Coffee',
};

// Concise homepage review section — pulls from genuine Review records,
// deduplicates by body text, and filters out reviews mentioning retired
// products. Links to the full Reviews page. Does NOT invent reviews.
export default function RitualReviewHighlights() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['homepage-reviews'],
    queryFn: async () => {
      const all = await base44.entities.Review.list('-review_date', 200);
      // Only 4+ star reviews with meaningful content
      return all.filter((r) => r.rating >= 4 && r.body && r.body.length > 20);
    },
    staleTime: 1000 * 60 * 10,
  });

  const cleanReviews = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const r of reviews) {
      const key = (r.body || '').trim().toLowerCase();
      // Skip duplicates (same body text under different names)
      if (seen.has(key)) continue;
      // Skip reviews that mention retired product names
      if (RETIRED_NAMES.some((name) => (r.body || '').includes(name))) continue;
      seen.add(key);
      result.push(r);
      if (result.length >= 3) break;
    }
    return result;
  }, [reviews]);

  if (!cleanReviews.length) return null;

  return (
    <section style={{ background: '#FBF8F1' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#7A5C23' }}>
            Real Customer Reviews
          </p>
          <h2
            className="mt-4 font-serif font-semibold"
            style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', color: '#292622', textWrap: 'balance' }}
          >
            What customers are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cleanReviews.map((review, idx) => {
            const productName = PRODUCT_MAP[review.product_handle];
            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="card-torch flex flex-col p-6"
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-0.5" aria-label={`${Math.floor(review.rating)} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      style={{
                        fill: i < Math.floor(review.rating) ? GOLD : 'none',
                        stroke: i < Math.floor(review.rating) ? GOLD : '#D8C9B6',
                      }}
                    />
                  ))}
                </div>

                {/* Body */}
                <blockquote
                  className="flex-1 font-heading text-sm"
                  style={{ color: '#292622', lineHeight: 1.7 }}
                >
                  &ldquo;{review.body}&rdquo;
                </blockquote>

                {/* Footer */}
                <div className="mt-5 border-t pt-4" style={{ borderColor: '#E4D8C9' }}>
                  <p className="font-heading font-semibold text-sm" style={{ color: '#292622' }}>
                    {review.reviewer_name?.trim()}
                  </p>
                  {productName && (
                    <p className="font-mono text-[8px] uppercase tracking-[0.15em] mt-1" style={{ color: '#A97B32' }}>
                      {productName}
                    </p>
                  )}
                  <p className="font-heading text-[10px] mt-1" style={{ color: '#8A8076' }}>
                    Verified Customer
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Link to full reviews */}
        <div className="mt-10 text-center">
          <Link
            to="/reviews"
            className="btn btn-ghost"
            style={{ minWidth: '220px' }}
          >
            Read All Reviews <ArrowRight size={16} />
          </Link>
        </div>

        {/* Small feedback invitation */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/reviews"
            className="btn btn-ghost inline-flex items-center gap-1.5"
            style={{ minHeight: 38, padding: '0 1.15rem', fontSize: '0.8rem' }}
          >
            Share your feedback <ArrowRight size={13} />
          </Link>
          <Link
            to="/customer-spotlight"
            className="btn btn-ghost inline-flex items-center gap-1.5"
            style={{ minHeight: 38, padding: '0 1.15rem', fontSize: '0.8rem' }}
          >
            Share your story <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}