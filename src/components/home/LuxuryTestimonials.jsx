import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'James M.',
    location: 'Texas',
    rating: 5,
    text: 'The Washington Blend is the best dark roast I\'ve ever had. Rich, bold, no bitterness. I brew a pot every single morning. This isn\'t just coffee — it\'s a ritual.',
    product: 'Washington Blend',
    initials: 'JM',
  },
  {
    name: 'Sarah K.',
    location: 'Tennessee',
    rating: 5,
    text: 'I bought the Franklin Blend as a gift for my husband and he immediately ordered three more bags. The packaging alone is stunning — looks incredible on the counter.',
    product: 'Franklin Blend',
    initials: 'SK',
  },
  {
    name: 'Mike R.',
    location: 'Montana',
    rating: 5,
    text: 'Finally a patriotic brand that doesn\'t feel cheap. The Roosevelt Blend is as bold as the man himself. Fast shipping, beautiful packaging. Torch Republic has a customer for life.',
    product: 'Roosevelt Blend',
    initials: 'MR',
  },
  {
    name: 'Laura T.',
    location: 'Virginia',
    rating: 5,
    text: 'The Torch Box subscription is incredible value. Every month I get something new and premium. The curation is thoughtful — it\'s clear these people care deeply about quality.',
    product: 'The Torch Box',
    initials: 'LT',
  },
  {
    name: 'David C.',
    location: 'Georgia',
    rating: 5,
    text: 'Jefferson Blend is smooth, complex, and exactly what I wanted from a medium roast. The historical storytelling makes every cup more meaningful. Genuinely proud to support this brand.',
    product: 'Jefferson Blend',
    initials: 'DC',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C9A24A', fontSize: '0.8rem' }}>★</span>
      ))}
    </div>
  );
}

export default function LuxuryTestimonials() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);
  const review = REVIEWS[index];

  return (
    <section style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[800px] mx-auto px-6 md:px-12 py-28 text-center">

        <motion.p
          className="font-mono text-[9px] tracking-[0.55em] uppercase mb-16"
          style={{ color: 'rgba(201,162,74,0.5)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Customer Voices
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <Stars count={review.rating} />

            <blockquote className="font-serif" style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', color: 'rgba(240,235,225,0.85)', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 400 }}>
              "{review.text}"
            </blockquote>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-black" style={{ background: '#C9A24A', color: '#000' }}>
                {review.initials}
              </div>
              <p className="font-mono text-xs font-bold tracking-wider" style={{ color: 'rgba(255,255,255,0.7)' }}>{review.name}</p>
              <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{review.location} · {review.product}</p>
              <span className="font-mono text-[8px] tracking-widest uppercase px-3 py-1" style={{ color: '#C9A24A', background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.2)' }}>
                Verified Purchase
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button onClick={prev} className="p-2 transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.5)' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === index ? '#C9A24A' : 'rgba(201,162,74,0.2)' }}
              />
            ))}
          </div>
          <button onClick={next} className="p-2 transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.5)' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="font-mono text-[10px] mt-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Joining 10,000+ proud owners across America
        </p>
      </div>
    </section>
  );
}