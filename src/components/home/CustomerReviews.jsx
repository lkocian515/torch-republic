import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    product: 'Washington Blend | TR-001',
    rating: 5,
    text: 'The Washington Blend hits hard. Dark, bold, no nonsense — exactly what the name should be. Already ordered the Jefferson.',
  },
  {
    name: 'Rachel K.',
    product: 'Franklin Blend | TR-003',
    rating: 5,
    text: 'I bought it as a gift and ended up keeping it for myself. The story on the back of the bag alone is worth the price.',
  },
  {
    name: 'Daniel W.',
    product: 'Founders Starter Pack',
    rating: 5,
    text: 'I\'ve tried a lot of \'patriotic\' coffee brands. This one actually backs it up. The rarity system makes it feel like you\'re collecting something real.',
  },
  {
    name: 'Stephanie R.',
    product: 'Roosevelt Blend | TR-006',
    rating: 5,
    text: 'The Roosevelt Blend is my morning ritual now. Bold, full-body, no apologies. Like its namesake.',
  },
  {
    name: 'James P.',
    product: 'Founders Starter Pack',
    rating: 5,
    text: 'Ordered the Founders Starter Pack for my dad\'s birthday. He called me the next morning to ask where to get more. That says everything.',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'
          }`}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-16 px-6 bg-background" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.3))' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C8A44D' }}>
              Real Customers
            </span>
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
          </div>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700 }}>
            What Torchbearers Are Saying
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 rounded border"
              style={{ 
                borderColor: 'rgba(200,164,77,0.2)',
                backgroundColor: 'rgba(14,42,47,0.3)',
              }}
            >
              {/* Stars */}
              <div className="mb-2">
                <StarRating rating={review.rating} />
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-300 mb-3 italic leading-relaxed">
                "{review.text}"
              </p>

              {/* Product */}
              <p className="text-xs font-mono text-gray-500 mb-2">
                Purchased: <span style={{ color: '#C8A44D' }}>{review.product}</span>
              </p>

              {/* Name */}
              <p className="text-xs font-heading font-bold text-white">
                {review.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust line */}
        <div className="text-center mt-8">
          <p className="text-xs font-mono tracking-widest text-gray-500 uppercase">
            ✓ Verified purchases from real customers
          </p>
        </div>
      </div>
    </section>
  );
}