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

export default function Reviews() {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: () => base44.entities.Review.list('-review_date', 50),
  });

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const fiveStars = reviews.filter(r => r.rating === 5).length;
  const pct = reviews.length ? Math.round((fiveStars / reviews.length) * 100) : 100;

  return (
    <div className="min-h-screen pt-12 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">Verified Customers</p>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
            What Patriots Are Saying
          </h1>

          {/* Summary stats */}
          <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
            <div className="text-center">
              <p className="text-5xl font-mono font-black" style={{ color: '#C8A44D' }}>{avgRating}</p>
              <StarRow rating={Math.round(avgRating)} />
              <p className="text-muted-foreground text-xs mt-1 font-mono">Average Rating</p>
            </div>
            <div className="w-px h-16 bg-border hidden sm:block" />
            <div className="text-center">
              <p className="text-5xl font-mono font-black" style={{ color: '#C8A44D' }}>{reviews.length}</p>
              <p className="text-muted-foreground text-xs mt-2 font-mono">Total Reviews</p>
            </div>
            <div className="w-px h-16 bg-border hidden sm:block" />
            <div className="text-center">
              <p className="text-5xl font-mono font-black" style={{ color: '#C8A44D' }}>{pct}%</p>
              <p className="text-muted-foreground text-xs mt-2 font-mono">5-Star Reviews</p>
            </div>
          </div>
        </div>

        {/* Review Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card border border-border p-5 h-32 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-card border border-border p-6"
              >
                <StarRow rating={review.rating} />
                <p className="text-foreground text-sm mt-3 leading-relaxed">"{review.body}"</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="font-mono text-xs font-bold" style={{ color: '#C8A44D' }}>{review.reviewer_name}</span>
                  <div className="flex items-center gap-3">
                    {review.product_handle && (
                      <span className="text-xs text-muted-foreground font-mono truncate max-w-[120px]" title={review.product_handle}>
                        {review.product_handle.replace(/-/g, ' ')}
                      </span>
                    )}
                    {review.review_date && (
                      <span className="font-mono text-xs text-muted-foreground">
                        {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}