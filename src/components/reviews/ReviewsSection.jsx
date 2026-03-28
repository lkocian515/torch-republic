import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

function StarRow({ rating }) {
  return (
    <div className="flex">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-4 h-4 ${i <= rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
      ))}
    </div>
  );
}

export default function ReviewsSection({ productHandle }) {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', productHandle],
    queryFn: () => productHandle
      ? base44.entities.Review.filter({ product_handle: productHandle }, '-review_date', 10)
      : base44.entities.Review.list('-review_date', 8),
  });

  if (!reviews.length) return null;

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="mt-16 pt-10 border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-heading font-black uppercase tracking-widest" style={{ color: '#E8DFAF' }}>
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <StarRow rating={Math.round(avgRating)} />
            <span className="font-mono text-sm text-muted-foreground">{avgRating} out of 5 · {reviews.length} reviews</span>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border p-5"
          >
            <StarRow rating={review.rating} />
            <p className="text-foreground text-sm mt-3 leading-relaxed">"{review.body}"</p>
            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-xs font-bold text-primary">{review.reviewer_name}</span>
              {review.review_date && (
                <span className="font-mono text-xs text-muted-foreground">
                  {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}