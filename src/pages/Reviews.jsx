import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ReviewPopup from '../components/mushroom/ReviewPopup';
import ReviewsCarousel from '../components/mushroom/ReviewsCarousel';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';

const REVIEW_THEMES = [
  { label: 'Taste', desc: 'Smooth, coffee-forward flavor that actually tastes like great coffee — not dirt.' },
  { label: 'Convenience', desc: 'Ready in 30 seconds. No machine, no pods, no mess.' },
  { label: 'Repeat Purchase', desc: 'Customers come back. The 27-serving tube keeps the ritual going.' },
];

export default function Reviews() {
  const [activeFilter, setActiveFilter] = useState('all');

  useSEO({
    title: 'Reviews | Torch Republic Coffee Company',
    description: 'Read real customer feedback and ritual stories from the Torch Republic Coffee Company community.',
    url: '/reviews',
    type: 'website',
  });

  const { data: allReviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => base44.entities.Review.list(),
  });

  const filters = [
    { key: 'all', label: 'All Reviews' },
    ...MUSHROOM_PRODUCTS.map(p => ({ key: p.shopifyHandle, label: p.name })),
  ];

  const reviews = activeFilter === 'all'
    ? allReviews
    : allReviews.filter(r => r.product_handle === activeFilter);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      <ReviewPopup />

      {/* Hero */}
      <section className="py-24 px-6 md:px-12 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-6"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Reviews
          </p>
          <h1 className="font-serif text-white mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {allReviews.length > 0 ? 'What Customers Are Saying' : 'Reviews Coming Soon'}
          </h1>
          <p className="font-heading mb-8"
            style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            {allReviews.length > 0
              ? 'Real experiences from people who made instant mushroom coffee part of their daily ritual.'
              : 'Be one of the first to try Torch Republic — six instant mushroom coffee blends crafted for focus, calm, and daily ritual.'
            }
          </p>
          {allReviews.length === 0 && (
            <p className="font-mono text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'rgba(230,183,173,0.35)' }}>
              Reviews will appear here as our community grows.
            </p>
          )}
        </motion.div>
      </section>

      {/* Review Themes */}
      <section className="px-6 md:px-12 py-12" style={{ background: '#070707', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[8px] tracking-[0.45em] uppercase text-center mb-8"
            style={{ color: 'rgba(230,183,173,0.35)' }}>
            What Customers Talk About Most
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {REVIEW_THEMES.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" style={{ color: '#E6B7AD' }} />)}
                </div>
                <p className="font-serif font-bold text-white text-sm mb-2">{t.label}</p>
                <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Filter */}
      {allReviews.length > 0 && (
        <section className="px-6 md:px-12 pt-12 pb-4">
          <div className="max-w-5xl mx-auto">
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-5 text-center"
              style={{ color: 'rgba(230,183,173,0.4)' }}>
              Filter by Blend
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {filters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all"
                  style={{
                    background: activeFilter === f.key ? '#E6B7AD' : 'rgba(255,255,255,0.03)',
                    color: activeFilter === f.key ? '#080808' : 'rgba(230,183,173,0.55)',
                    border: activeFilter === f.key ? '1px solid #E6B7AD' : '1px solid rgba(230,183,173,0.15)',
                    fontWeight: activeFilter === f.key ? 700 : 400,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Carousel */}
      {reviews.length > 0 && (
        <ReviewsCarousel reviews={reviews} />
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