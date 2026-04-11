import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3.5 h-3.5" fill={i <= rating ? '#C4A35A' : 'none'} stroke={i <= rating ? '#C4A35A' : 'rgba(255,255,255,0.15)'} />
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
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>

      {/* Hero */}
      <section className="py-24 px-6 md:px-12" style={{ borderBottom: '1px solid rgba(196,163,90,0.08)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(196,163,90,0.55)' }}>
            Verified Legacy Voices
          </p>
          <h1 className="font-serif text-white mb-4" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 700, lineHeight: 1.05 }}>
            What Torchbearers Are Saying
          </h1>
          <p className="font-mono text-sm mb-14" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Every review is verified. Every voice is real.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {[
              { value: avgRating, label: 'Average Rating', stars: true },
              { value: reviews.length || '—', label: 'Total Reviews' },
              { value: `${pct}%`, label: '5-Star Reviews' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-mono font-black" style={{ fontSize: '3rem', color: '#C4A35A', lineHeight: 1 }}>{stat.value}</p>
                {stat.stars && (
                  <div className="flex justify-center mt-2 mb-1">
                    <Stars rating={Math.round(parseFloat(avgRating))} />
                  </div>
                )}
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-40 animate-pulse" style={{ background: '#111' }} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-mono text-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>No reviews yet. Be the first Torchbearer.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(i * 0.04, 0.4) }}
                  className="p-7 flex flex-col gap-4"
                  style={{ background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.1)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Stars rating={review.rating} />
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3" style={{ color: 'rgba(196,163,90,0.5)' }} />
                      <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(196,163,90,0.45)' }}>Verified</span>
                    </div>
                  </div>

                  <p className="leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                    &ldquo;{review.body}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
                    <div>
                      <p className="font-mono text-xs font-bold" style={{ color: '#C4A35A' }}>{review.reviewer_name}</p>
                      {review.location && (
                        <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{review.location}</p>
                      )}
                    </div>
                    <div className="text-right">
                      {review.product_handle && (
                        <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                          {review.product_handle.replace(/-/g, ' ')}
                        </p>
                      )}
                      {review.review_date && (
                        <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>
                          {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center" style={{ borderTop: '1px solid rgba(196,163,90,0.07)' }}>
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(196,163,90,0.5)' }}>Join the Legacy</p>
        <h2 className="font-serif text-white mb-8" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 700 }}>
          Taste what Torchbearers are raving about.
        </h2>
        <a
          href="/CoffeeCollection"
          className="inline-flex items-center justify-center font-mono font-black uppercase tracking-[0.3em] transition-opacity hover:opacity-80"
          style={{ fontSize: '11px', background: '#C4A35A', color: '#000', padding: '1rem 2.75rem' }}
        >
          Shop the Founders Series
        </a>
      </section>
    </div>
  );
}