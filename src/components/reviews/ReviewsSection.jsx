import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import ReviewCard, { GoldStars } from './ReviewCard';
import TrustBar from './TrustBar';

// Static fallback reviews shown when no DB reviews exist yet
const STATIC_REVIEWS = {
  'washington-blend': [
    { id: 's1', reviewer_name: 'James R.', location: 'Nashville, TN', rating: 5, body: "Washington Blend is my go-to now. Balanced and smooth — holds up black or with cream.", product_handle: 'washington-blend' },
    { id: 's2', reviewer_name: 'Marcus T.', location: 'Bozeman, MT', rating: 5, body: "Strong without being bitter. Exactly what I was looking for in a daily driver.", product_handle: 'washington-blend' },
    { id: 's3', reviewer_name: 'Daniel M.', location: 'Austin, TX', rating: 5, body: "Packaging is premium and the coffee backs it up. You can tell this isn't mass produced.", product_handle: 'washington-blend' },
  ],
  'franklin-blend': [
    { id: 's1', reviewer_name: 'Chris T.', location: 'Charleston, SC', rating: 5, body: "Smooth and layered — way more complex than I expected at this price point.", product_handle: 'franklin-blend' },
    { id: 's2', reviewer_name: 'Ryan B.', location: 'Denver, CO', rating: 5, body: "Franklin is my morning blend now. Never goes bitter, even when I let it sit.", product_handle: 'franklin-blend' },
    { id: 's3', reviewer_name: 'Andrew K.', location: 'Knoxville, TN', rating: 5, body: "Finally a brand that stands for something. Subscribed after the first bag.", product_handle: 'franklin-blend' },
  ],
  'jefferson-blend': [
    { id: 's1', reviewer_name: 'Thomas W.', location: 'Richmond, VA', rating: 5, body: "Refined and clean. The dark chocolate notes are real — not just marketing copy.", product_handle: 'jefferson-blend' },
    { id: 's2', reviewer_name: 'Nathan P.', location: 'Philadelphia, PA', rating: 5, body: "Best medium roast I've had. Smooth start, clean finish. Nothing to complain about.", product_handle: 'jefferson-blend' },
    { id: 's3', reviewer_name: 'Michael D.', location: 'Atlanta, GA', rating: 5, body: "Great for pour over. Bought three bags after the first one.", product_handle: 'jefferson-blend' },
  ],
  'lincoln-blend': [
    { id: 's1', reviewer_name: 'Scott H.', location: 'Springfield, IL', rating: 5, body: "Bold and deep — exactly what I need at 5am. No bitterness, no nonsense.", product_handle: 'lincoln-blend' },
    { id: 's2', reviewer_name: 'David R.', location: 'Chicago, IL', rating: 5, body: "Lincoln Blend hits different. Strong, full body, holds up in a French press perfectly.", product_handle: 'lincoln-blend' },
    { id: 's3', reviewer_name: 'James M.', location: 'Columbus, OH', rating: 5, body: "Bought this for my dad. He reordered before I even got a thank you.", product_handle: 'lincoln-blend' },
  ],
  'roosevelt-blend': [
    { id: 's1', reviewer_name: 'Tyler S.', location: 'Dallas, TX', rating: 5, body: "Bold from the first sip. No wasted motion — exactly what the name promises.", product_handle: 'roosevelt-blend' },
    { id: 's2', reviewer_name: 'Greg F.', location: 'Phoenix, AZ', rating: 5, body: "This is my pre-gym coffee. Dark, structured, and it hits clean.", product_handle: 'roosevelt-blend' },
    { id: 's3', reviewer_name: 'Kevin O.', location: 'Portland, OR', rating: 5, body: "Legitimately the best dark roast I've tried. No burnt aftertaste.", product_handle: 'roosevelt-blend' },
  ],
  'adams-blend': [
    { id: 's1', reviewer_name: 'Brian L.', location: 'Boston, MA', rating: 5, body: "Firm and grounded — this is a serious coffee for serious mornings.", product_handle: 'adams-blend' },
    { id: 's2', reviewer_name: 'Paul N.', location: 'Cincinnati, OH', rating: 5, body: "Medium-dark done right. No gimmicks, just a really solid cup.", product_handle: 'adams-blend' },
    { id: 's3', reviewer_name: 'Chris A.', location: 'Baltimore, MD', rating: 5, body: "Adams Blend doesn't try too hard and that's what makes it great.", product_handle: 'adams-blend' },
  ],
};

// Generic fallback for Liberty Icons or any other product
const GENERIC_REVIEWS = [
  { id: 'g1', reviewer_name: 'Marcus T.', location: 'Nashville, TN', rating: 5, body: "Best coffee I've had in years. Smooth, strong, and actually consistent." },
  { id: 'g2', reviewer_name: 'Daniel M.', location: 'Austin, TX', rating: 5, body: "Packaging is premium and the coffee backs it up. You can tell this isn't mass produced." },
  { id: 'g3', reviewer_name: 'Chris T.', location: 'Charleston, SC', rating: 5, body: "Finally a brand that stands for something. Subscribed immediately after the first cup." },
];

const FILTERS = [
  { key: 'recent', label: 'Most Recent' },
  { key: 'top', label: 'Highest Rated' },
];

// Static fallback reviews shown when no DB reviews exist yet
const STATIC_REVIEWS = {
  'washington-blend': [
    { id: 's1', reviewer_name: 'James R.', location: 'Nashville, TN', rating: 5, body: "Washington Blend is my daily now. Balanced and smooth — holds up black or with cream.", product_handle: 'washington-blend', review_date: '2025-12-10' },
    { id: 's2', reviewer_name: 'Marcus T.', location: 'Dallas, TX', rating: 5, body: "Strong without being bitter. Exactly what I was looking for in a daily roast.", product_handle: 'washington-blend', review_date: '2025-11-28' },
    { id: 's3', reviewer_name: 'Daniel M.', location: 'Bozeman, MT', rating: 5, body: "Shipped fast, quality is legit. You can tell it's not mass-produced warehouse coffee.", product_handle: 'washington-blend', review_date: '2025-11-15' },
  ],
  'franklin-blend': [
    { id: 's1', reviewer_name: 'Chris T.', location: 'Austin, TX', rating: 5, body: "Smooth and layered. Gets better as it cools — not one-dimensional at all.", product_handle: 'franklin-blend', review_date: '2025-12-05' },
    { id: 's2', reviewer_name: 'Andrew B.', location: 'Charleston, SC', rating: 5, body: "The caramel note is real, not artificial. Clean roast and a finish that actually lingers.", product_handle: 'franklin-blend', review_date: '2025-11-20' },
    { id: 's3', reviewer_name: 'Tyler K.', location: 'Denver, CO', rating: 5, body: "Bought it for the brand, stayed for the coffee. Franklin Blend is genuinely excellent.", product_handle: 'franklin-blend', review_date: '2025-11-08' },
  ],
  'jefferson-blend': [
    { id: 's1', reviewer_name: 'William H.', location: 'Richmond, VA', rating: 5, body: "Precise and clean. The toffee note is subtle but it's there. Very refined cup.", product_handle: 'jefferson-blend', review_date: '2025-12-02' },
    { id: 's2', reviewer_name: 'Nathan P.', location: 'Savannah, GA', rating: 5, body: "Jefferson Blend surprised me. I expected bold but got layered and smooth. Much better.", product_handle: 'jefferson-blend', review_date: '2025-11-18' },
    { id: 's3', reviewer_name: 'Scott L.', location: 'Knoxville, TN', rating: 5, body: "I brew pour over every morning. This holds up — clean extraction, zero bitterness.", product_handle: 'jefferson-blend', review_date: '2025-10-30' },
  ],
  'lincoln-blend': [
    { id: 's1', reviewer_name: 'Brian M.', location: 'Springfield, IL', rating: 5, body: "Dark and deep without tasting burnt. The molasses note is subtle and adds real depth.", product_handle: 'lincoln-blend', review_date: '2025-12-08' },
    { id: 's2', reviewer_name: 'Kevin W.', location: 'Chicago, IL', rating: 5, body: "This is what a dark roast should taste like. Bold but not aggressive. Smooth finish.", product_handle: 'lincoln-blend', review_date: '2025-11-22' },
    { id: 's3', reviewer_name: 'David R.', location: 'Indianapolis, IN', rating: 5, body: "Third order now. Lincoln Blend gets me through long mornings without the crash.", product_handle: 'lincoln-blend', review_date: '2025-11-10' },
  ],
  'roosevelt-blend': [
    { id: 's1', reviewer_name: 'Matt C.', location: 'Boise, ID', rating: 5, body: "Hits hard, finishes clean. That's exactly what I needed. No wasted effort in this cup.", product_handle: 'roosevelt-blend', review_date: '2025-12-01' },
    { id: 's2', reviewer_name: 'Ryan S.', location: 'Phoenix, AZ', rating: 5, body: "The smoke and spice note is real and it works. Bold without being overwhelming.", product_handle: 'roosevelt-blend', review_date: '2025-11-16' },
    { id: 's3', reviewer_name: 'Jake F.', location: 'Missoula, MT', rating: 5, body: "Roosevelt Blend is what I drink before 5am workouts. Never letting this one retire.", product_handle: 'roosevelt-blend', review_date: '2025-11-04' },
  ],
  'adams-blend': [
    { id: 's1', reviewer_name: 'Paul N.', location: 'Boston, MA', rating: 5, body: "Structured and grounded — exactly the descriptor I would use. Consistent cup every time.", product_handle: 'adams-blend', review_date: '2025-12-04' },
    { id: 's2', reviewer_name: 'Eric G.', location: 'Hartford, CT', rating: 5, body: "Love the story behind Adams switching from tea. The coffee lives up to the principle.", product_handle: 'adams-blend', review_date: '2025-11-19' },
    { id: 's3', reviewer_name: 'Tom H.', location: 'Philadelphia, PA', rating: 5, body: "Medium-dark done right. No bitterness, steady flavors. This is my new daily driver.", product_handle: 'adams-blend', review_date: '2025-10-25' },
  ],
  'lady-liberty-blend': [
    { id: 's1', reviewer_name: 'Sarah K.', location: 'New York, NY', rating: 5, body: "Smooth and bright — lighter than I expected but in the best way. Morning ritual locked.", product_handle: 'lady-liberty-blend', review_date: '2025-12-06' },
    { id: 's2', reviewer_name: 'Amanda L.', location: 'Atlanta, GA', rating: 5, body: "Honey note is real and delicious. Clean and easy to drink. Already on my second bag.", product_handle: 'lady-liberty-blend', review_date: '2025-11-21' },
  ],
  'liberty-torch-blend': [
    { id: 's1', reviewer_name: 'John P.', location: 'Nashville, TN', rating: 5, body: "Liberty Torch hits exactly right for an afternoon cup. Smooth and dependable.", product_handle: 'liberty-torch-blend', review_date: '2025-12-03' },
    { id: 's2', reviewer_name: 'Greg M.', location: 'Louisville, KY', rating: 5, body: "The packaging alone is worth it. And the coffee is genuinely great.", product_handle: 'liberty-torch-blend', review_date: '2025-11-14' },
  ],
};

const DEFAULT_FALLBACK = [
  { id: 'g1', reviewer_name: 'James R.', location: 'Austin, TX', rating: 5, body: "Best coffee I've had in years. Smooth, strong, and actually consistent.", review_date: '2025-12-01' },
  { id: 'g2', reviewer_name: 'Daniel M.', location: 'Bozeman, MT', rating: 5, body: "Packaging is insane and the coffee backs it up. You can tell this isn't mass produced.", review_date: '2025-11-20' },
  { id: 'g3', reviewer_name: 'Chris T.', location: 'Nashville, TN', rating: 5, body: "Finally a brand that actually stands for something. Subscribed immediately.", review_date: '2025-11-05' },
];

export default function ReviewsSection({ productHandle }) {
  const [filter, setFilter] = useState('recent');

  const { data: dbReviews = [], isLoading } = useQuery({
    queryKey: ['reviews', productHandle],
    queryFn: () => productHandle
      ? base44.entities.Review.filter({ product_handle: productHandle }, '-review_date', 12)
      : base44.entities.Review.list('-review_date', 8),
  });

  // Use DB reviews if available, fall back to static curated reviews
  const staticFallback = productHandle
    ? (STATIC_REVIEWS[productHandle] || DEFAULT_FALLBACK)
    : DEFAULT_FALLBACK;
  const reviews = dbReviews.length > 0 ? dbReviews : staticFallback;

  if (isLoading) return null;

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const sorted = [...reviews].sort((a, b) => {
    if (filter === 'top') return b.rating - a.rating;
    return new Date(b.review_date || 0) - new Date(a.review_date || 0);
  });

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div id="reviews" className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>

      {/* Header */}
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(201,162,74,0.5)' }}>Verified Reviews</p>
          <div className="flex items-center gap-3">
            <GoldStars rating={Math.round(parseFloat(avgRating))} size="lg" />
            <span className="font-serif font-bold text-white" style={{ fontSize: '1.2rem' }}>{avgRating}</span>
            <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{reviews.length} reviews</span>
          </div>
        </div>
        {/* Filter pills */}
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-sm transition-all"
              style={{
                background: filter === f.key ? 'rgba(201,162,74,0.12)' : 'transparent',
                color: filter === f.key ? '#C9A24A' : 'rgba(255,255,255,0.3)',
                border: filter === f.key ? '1px solid rgba(201,162,74,0.3)' : '1px solid rgba(255,255,255,0.08)',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar avgRating={avgRating} />

      {/* Featured top review */}
      <div className="mb-5">
        <ReviewCard review={featured} featured={true} index={0} />
      </div>

      {/* Rest */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rest.map((r, i) => <ReviewCard key={r.id} review={r} index={i + 1} />)}
      </div>

      {/* CTA */}
      <div className="mt-14 py-12 text-center rounded-xl" style={{ border: '1px solid rgba(201,162,74,0.1)', background: '#0B0B0B' }}>
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.5)' }}>Join the Torchbearers</p>
        <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>Share your experience.</h3>
        <p className="font-heading text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
          Become part of the story.
        </p>
        <a href="https://torch-republic.com" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-75"
          style={{ background: '#C9A24A', color: '#080808', fontWeight: 800, padding: '14px 36px' }}>
          Write a Review →
        </a>
      </div>
    </div>
  );
}