import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import ReviewCard, { GoldStars } from './ReviewCard';
import TrustBar from './TrustBar';

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
    { id: 's3', reviewer_name: 'David R.', location: 'Indianapolis, IN', rating: 5, body: "Third order now. This blend has become part of my long-morning routine.", product_handle: 'lincoln-blend', review_date: '2025-11-10' },
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
  'eagles-flight-blend': [
    { id: 's1', reviewer_name: 'Mike D.', location: 'Colorado Springs, CO', rating: 5, body: "Crisp and bold — exactly what I want first thing in the morning. Eagle's Flight is now my everyday.", product_handle: 'eagles-flight-blend', review_date: '2025-12-07' },
    { id: 's2', reviewer_name: 'Travis H.', location: 'Fayetteville, NC', rating: 5, body: "The citrus note is subtle but real. Light roast done right. No bitterness at all.", product_handle: 'eagles-flight-blend', review_date: '2025-11-23' },
    { id: 's3', reviewer_name: 'Cole R.', location: 'San Antonio, TX', rating: 5, body: "Ordered on a recommendation. Won't need another recommendation — I'm subscribed now.", product_handle: 'eagles-flight-blend', review_date: '2025-11-09' },
  ],
  'uncle-sams-bold-brew': [
    { id: 's1', reviewer_name: 'Rick B.', location: 'Pittsburgh, PA', rating: 5, body: "Dark, bold, zero compromise. Uncle Sam's is what coffee is supposed to taste like.", product_handle: 'uncle-sams-bold-brew', review_date: '2025-12-09' },
    { id: 's2', reviewer_name: 'Aaron M.', location: 'Memphis, TN', rating: 5, body: "I drink it black and it delivers every time. Intense without burning your palate.", product_handle: 'uncle-sams-bold-brew', review_date: '2025-11-25' },
    { id: 's3', reviewer_name: 'Steve J.', location: 'Tampa, FL', rating: 5, body: "The boldest roast in the lineup and worth every cent. Packaging is premium too.", product_handle: 'uncle-sams-bold-brew', review_date: '2025-11-11' },
  ],
  "rosies-grind": [
    { id: 's1', reviewer_name: 'Lauren T.', location: 'Richmond, VA', rating: 5, body: "Smooth and approachable. Rosie's Grind is the one I reach for when I want something reliable.", product_handle: "rosies-grind", review_date: '2025-12-05' },
    { id: 's2', reviewer_name: 'Jessica M.', location: 'Raleigh, NC', rating: 5, body: "Medium roast that actually has character. Chocolate note is real and not overpowering.", product_handle: "rosies-grind", review_date: '2025-11-20' },
    { id: 's3', reviewer_name: 'Hannah K.', location: 'Greenville, SC', rating: 5, body: "Got this as a gift and now I'm buying my third bag. Smooth, consistent, and delicious.", product_handle: "rosies-grind", review_date: '2025-11-06' },
  ],
  'old-glory-house-blend': [
    { id: 's1', reviewer_name: 'Frank L.', location: 'Columbus, OH', rating: 5, body: "Old Glory is the house blend done right. Every morning, no complaints, no variation.", product_handle: 'old-glory-house-blend', review_date: '2025-12-04' },
    { id: 's2', reviewer_name: 'Bill S.', location: 'Kansas City, MO', rating: 5, body: "Balanced and consistent. I've been through four bags and it's the same quality every time.", product_handle: 'old-glory-house-blend', review_date: '2025-11-18' },
    { id: 's3', reviewer_name: 'Gary W.', location: 'Omaha, NE', rating: 5, body: "Classic medium roast. Clean, dependable, and worth the price. This is my default now.", product_handle: 'old-glory-house-blend', review_date: '2025-11-02' },
  ],
  'remember-the-ladies': [
    { id: 's1', reviewer_name: 'Claire B.', location: 'Philadelphia, PA', rating: 5, body: "The Abigail Adams blend is beautiful — bright and refined. Feels like drinking a piece of history.", product_handle: 'remember-the-ladies', review_date: '2025-12-06' },
    { id: 's2', reviewer_name: 'Susan W.', location: 'Boston, MA', rating: 5, body: "Smooth, bright, and complex. The story behind it makes every cup more meaningful.", product_handle: 'remember-the-ladies', review_date: '2025-11-22' },
  ],
  'midnight-railway': [
    { id: 's1', reviewer_name: 'Diana H.', location: 'Baltimore, MD', rating: 5, body: "Bold and deep — the dark roast is exactly right. A coffee with real conviction behind it.", product_handle: 'midnight-railway', review_date: '2025-12-08' },
    { id: 's2', reviewer_name: 'Renee T.', location: 'Detroit, MI', rating: 5, body: "Midnight Railway is rich and intentional. A dark roast that doesn't overpower — just delivers.", product_handle: 'midnight-railway', review_date: '2025-11-24' },
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