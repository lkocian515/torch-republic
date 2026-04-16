import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Coffee, Flame, ShieldCheck } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Nashville, TN',
    headline: 'Best coffee I've had in years.',
    text: 'The most heritage-forward coffee I\'ve ever had. Rich, complex, and worthy of the name it carries. You can tell this isn\'t generic store coffee — it feels intentional.',
    tags: ['Founders Series', 'Smooth'],
    rating: 5,
  },
  {
    name: 'Sarah K.',
    location: 'Charleston, SC',
    headline: 'My daily ritual, elevated.',
    text: 'Every morning feels like a deliberate act of legacy. The aroma alone sets the tone for the whole day. I don\'t start without it.',
    tags: ['Patriot Favorite', 'Balanced'],
    rating: 5,
  },
  {
    name: 'James R.',
    location: 'Austin, TX',
    headline: 'Bought it for myself, then three friends.',
    text: 'I ordered the Founders Series and immediately sent it to three friends. Everyone reordered within a week. It just hits different than anything on the shelf.',
    tags: ['Founders Series', 'Bold'],
    rating: 5,
  },
  {
    name: 'David M.',
    location: 'Bozeman, MT',
    headline: 'This feels like a collector\'s item.',
    text: 'It\'s not just coffee. It\'s a mindset. Torch Republic understands what it means to stand for something. Every cup reinforces that.',
    tags: ['Liberty Icons', 'Strong'],
    rating: 5,
  },
  {
    name: 'Rachel B.',
    location: 'Knoxville, TN',
    headline: 'Best subscription I\'ve ever signed up for.',
    text: 'The Torch Box is unreal. Every month feels like an unboxing event — premium packaging, great variety, and you\'re always discovering a new favorite blend.',
    tags: ['Torch Box', 'Smooth'],
    rating: 5,
  },
];

const TAG_ICONS = {
  'Founders Series': '🔥',
  'Liberty Icons': '🗽',
  'Patriot Favorite': '🇺🇸',
  'Torch Box': '📦',
  'Smooth': '☕',
  'Bold': '⚡',
  'Strong': '💪',
  'Balanced': '⚖️',
};

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: i <= rating ? '#C9A24A' : 'rgba(201,162,74,0.18)' }} />
      ))}
    </div>
  );
}

function ReviewCard({ review, featured = false }) {
  return (
    <div
      className="flex flex-col h-full p-7"
      style={{
        background: featured ? 'linear-gradient(135deg, #141108 0%, #0D0D0D 100%)' : '#0D0D0D',
        border: featured ? '1px solid rgba(201,162,74,0.55)' : '1px solid rgba(201,162,74,0.1)',
        borderRadius: '10px',
        boxShadow: featured ? '0 0 40px rgba(201,162,74,0.1)' : '0 2px 16px rgba(0,0,0,0.4)',
        minWidth: 0,
      }}
    >
      {featured && (
        <div className="mb-4 inline-flex items-center gap-2 w-fit px-3 py-1" style={{ background: 'rgba(201,162,74,0.12)', border: '1px solid rgba(201,162,74,0.3)', borderRadius: '4px' }}>
          <Flame className="w-3 h-3" style={{ color: '#C9A24A' }} />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: '#C9A24A' }}>Top Review</span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <Stars rating={review.rating} />
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3" style={{ color: 'rgba(201,162,74,0.45)' }} />
          <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>Verified Buyer</span>
        </div>
      </div>

      {/* Headline */}
      <p className="font-serif font-bold mb-3" style={{ fontSize: featured ? '1.1rem' : '0.95rem', color: '#EAEAEA', lineHeight: 1.3 }}>
        "{review.headline}"
      </p>

      {/* Body */}
      <p className="flex-1 leading-relaxed mb-5" style={{ color: 'rgba(234,234,234,0.62)', fontSize: '0.875rem', lineHeight: 1.85, fontStyle: 'italic' }}>
        {review.text}
      </p>

      {/* Tags */}
      {review.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {review.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] tracking-wide px-2.5 py-1" style={{ background: 'rgba(201,162,74,0.07)', border: '1px solid rgba(201,162,74,0.18)', borderRadius: '4px', color: 'rgba(201,162,74,0.75)' }}>
              {TAG_ICONS[tag]} {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div>
          <p className="font-mono text-xs font-bold" style={{ color: '#C9A24A' }}>{review.name}</p>
          <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.28)' }}>{review.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="py-24 px-5 md:px-12" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(201,162,74,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-4" style={{ color: '#C9A24A' }}>
            Verified Reviews
          </p>
          <h2 className="font-serif leading-none mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Trusted by Patriots<br />Across the Country
          </h2>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap mt-8">
            {[
              { icon: <Star className="w-4 h-4 fill-current" style={{ color: '#C9A24A' }} />, value: '4.8/5', label: 'Average Rating' },
              { icon: <Coffee className="w-4 h-4" style={{ color: '#C9A24A' }} />, value: '1,000+', label: 'Cups Brewed' },
              { icon: <Flame className="w-4 h-4" style={{ color: '#C9A24A' }} />, value: '#1', label: 'Top Rated — Founders Series' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                {s.icon}
                <div className="text-left">
                  <p className="font-mono font-black" style={{ fontSize: '1.1rem', color: '#EAEAEA', lineHeight: 1 }}>{s.value}</p>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gold divider */}
        <div className="mb-12" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4), transparent)' }} />

        {/* Featured top review */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <ReviewCard review={REVIEWS[0]} featured />
        </motion.div>

        {/* Rest of reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.slice(1).map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <ReviewCard review={r} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="mb-3" style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.2), transparent)' }} />
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase mt-8 mb-2" style={{ color: 'rgba(201,162,74,0.55)' }}>Join the Torchbearers</p>
          <p className="font-heading mb-7" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>Share your experience and become part of the story.</p>
          <a
            href="https://torch-republic.com/pages/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.3em] uppercase transition-all hover:opacity-80"
            style={{ color: '#C9A24A', border: '1px solid rgba(201,162,74,0.35)', padding: '14px 36px', borderRadius: '4px' }}
          >
            Write a Review →
          </a>
        </motion.div>
      </div>
    </section>
  );
}