import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ReviewPopup from '../components/mushroom/ReviewPopup';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

export default function Reviews() {
  useSEO({
    title: 'Customer Reviews | Torch Republic Mushroom Coffee',
    description: 'Read customer reviews and experiences with Torch Republic premium instant mushroom coffee blends for focus, clarity, energy, balance, and daily ritual.',
  });

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      try {
        return await base44.entities.Review.list();
      } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
    },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* Review Popup Modal */}
      <ReviewPopup />

      {/* Hero */}
      <section className="py-32 px-6 md:px-12 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-6"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Reviews
          </p>
          <h1 className="font-serif text-white mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {reviews.length > 0 ? 'What Our Customers Say' : 'Reviews Coming Soon'}
          </h1>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#E6B7AD' }} />
              ))}
            </div>
          )}
          <p className="font-heading mb-8"
            style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            {reviews.length > 0 
              ? 'Real reviews from our community of ritual seekers.'
              : 'Be one of the first to experience the new Torch Republic Coffee Company collection — six premium instant mushroom coffee blends crafted for focus, flow, and daily ritual.'
            }
          </p>
          {reviews.length === 0 && (
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'rgba(230,183,173,0.35)' }}>
              Reviews will appear here as our community grows.
            </p>
          )}
        </motion.div>
      </section>

      {/* Reviews Grid */}
      {reviews.length > 0 && (
        <section className="py-20 px-6 md:px-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-6"
                  style={{
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                    border: '1px solid rgba(230,183,173,0.12)',
                    borderRadius: '6px',
                  }}
                >
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        style={{ color: i < review.rating ? '#E6B7AD' : 'rgba(255,255,255,0.15)' }}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <blockquote
                    className="font-heading mb-4"
                    style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.7)', lineHeight: 1.7 }}
                  >
                    "{review.body}"
                  </blockquote>

                  {/* Reviewer info */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                    <div>
                      <p
                        className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                        style={{ color: '#E6B7AD' }}
                      >
                        {review.reviewer_name}
                      </p>
                      {review.location && (
                        <p
                          className="font-heading text-xs"
                          style={{ color: 'rgba(240,235,225,0.35)' }}
                        >
                          {review.location}
                        </p>
                      )}
                    </div>
                    {review.review_date && (
                      <p
                        className="font-mono text-[7px] tracking-[0.18em] uppercase"
                        style={{ color: 'rgba(230,183,173,0.3)' }}
                      >
                        {new Date(review.review_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: '#070707' }}>
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.4)' }}>
            Try the Blends
          </p>
          <h2 className="font-serif text-white font-bold mb-6"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.02em' }}>
            Start your ritual today.
          </h2>
          <div className="h-px w-12 mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #E6B7AD, transparent)' }} />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/shop"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ background: '#E6B7AD', color: '#080808', fontWeight: 800, padding: '16px 40px' }}>
              Shop All Blends →
            </Link>
            <Link to="/bundle"
              className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.35)', color: 'rgba(230,183,173,0.7)', padding: '16px 40px' }}>
              Try the Bundle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}