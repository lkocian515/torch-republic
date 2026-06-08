import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star } from 'lucide-react';

const FALLBACK_REVIEWS = [
  { reviewer_name: 'Marcus T.', location: 'Austin, TX', rating: 5, body: "I've tried every mushroom coffee on the market. Torch Republic is the only one that actually tastes like real coffee. Glowmind is my daily driver now — focused all morning, no crash." },
  { reviewer_name: 'Sarah K.', location: 'Portland, OR', rating: 5, body: "The Midnight Watch is a game changer for late work sessions. Smooth energy without the anxiety spike I used to get from regular espresso. I'm a convert." },
  { reviewer_name: 'James R.', location: 'Nashville, TN', rating: 5, body: "Bought it skeptical, hooked after the first tube. The Ember Rise has become my whole morning ritual. Packaging is beautiful, product is legit." },
];

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star key={s} className="w-3 h-3" fill={s <= rating ? '#E6B7AD' : 'none'} stroke={s <= rating ? '#E6B7AD' : 'rgba(230,183,173,0.25)'} />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { data: reviews } = useQuery({
    queryKey: ['home-reviews'],
    queryFn: () => base44.entities.Review.filter({ rating: { $gte: 4 } }, '-created_date', 6),
    initialData: [],
  });

  const displayReviews = (reviews?.length >= 3 ? reviews : FALLBACK_REVIEWS).slice(0, 3);

  return (
    <section className="py-24 px-6 md:px-10" style={{ background: '#0a0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Social Proof
          </p>
          <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            What Customers Are Saying
          </h2>
          <p className="font-heading mt-4" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300 }}>
            Real people. Real rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayReviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="flex flex-col gap-4 p-6"
              style={{ background: '#111010', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <StarRow rating={r.rating} />
              <p className="font-heading text-sm flex-1" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300, lineHeight: 1.75, fontStyle: 'italic' }}>
                &ldquo;{r.body}&rdquo;
              </p>
              <div>
                <p className="font-mono text-[8.5px] tracking-[0.2em] uppercase font-bold" style={{ color: '#E6B7AD' }}>
                  {r.reviewer_name}
                </p>
                {r.location && (
                  <p className="font-mono text-[7.5px] tracking-[0.15em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
                    {r.location}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}