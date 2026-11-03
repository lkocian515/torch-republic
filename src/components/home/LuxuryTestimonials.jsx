import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Nashville, TN',
    rating: 5,
    product: 'Washington Blend',
    text: "The Washington Blend is the best dark roast I've had outside of a specialty cafe — and the presentation alone makes it feel like something worth keeping. Torch Republic is the real deal.",
  },
  {
    name: 'Sarah K.',
    location: 'Austin, TX',
    rating: 5,
    product: 'Franklin Blend',
    text: "I ordered the Franklin Blend on a whim and ended up subscribing to the Torch Box immediately. The quality is unmatched and every sip feels intentional. This is what coffee should be.",
  },
  {
    name: 'David R.',
    location: 'Charleston, SC',
    rating: 5,
    product: 'Heritage Apparel',
    text: "The quality of the apparel surprised me. The fabric is thick and substantial — not the flimsy stuff you usually get from patriotic brands. I've worn it every week since it arrived.",
  },
  {
    name: 'Jennifer M.',
    location: 'Denver, CO',
    rating: 5,
    product: 'Jefferson Blend',
    text: "Jefferson Blend hits differently on a cold morning. The toffee and dark chocolate notes aren't marketing words — you actually taste them. A genuine small-batch product worth every dollar.",
  },
  {
    name: 'Col. Brian H. (Ret.)',
    location: 'Virginia Beach, VA',
    rating: 5,
    product: 'Founders Series Bundle',
    text: "I've tried every patriotic coffee brand out there. None of them come close. Torch Republic feels like it was made by people who actually care — about quality, about history, about getting it right.",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill={i < count ? '#E6AC45' : 'rgba(200,164,77,0.15)'}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function LuxuryTestimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setIdx((i) => (i + 1) % REVIEWS.length);
  const r = REVIEWS[idx];

  return (
    <section style={{ backgroundColor: '#0B0B0E', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.5))' }} />
            <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>Customer Legacy Voices</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.5), transparent)' }} />
          </div>
          <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
            Heard from the Field
          </h2>
        </div>

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Stars count={r.rating} />

              <blockquote
                className="font-serif mt-8 mb-10"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#F7F2E9',
                  lineHeight: 1.65,
                }}
              >
                "{r.text}"
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div>
                  <p className="font-mono text-sm font-bold" style={{ color: '#E6AC45' }}>{r.name}</p>
                  <p className="font-mono text-[9px] tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>{r.location}</p>
                </div>
                <div className="w-px h-8 mx-2" style={{ background: 'rgba(196,163,90,0.15)' }} />
                <div>
                  <p className="font-mono text-[9px] tracking-wider uppercase" style={{ color: 'rgba(196,163,90,0.5)' }}>{r.product}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-3 h-3" style={{ color: 'rgba(196,163,90,0.5)' }} />
                    <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: 'rgba(196,163,90,0.4)' }}>Verified Purchase</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-14">
            <button onClick={prev} className="w-10 h-10 flex items-center justify-center transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.6)' }}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className="transition-all"
                  style={{
                    width: i === idx ? '24px' : '6px',
                    height: '2px',
                    background: i === idx ? '#E6AC45' : 'rgba(196,163,90,0.2)',
                  }}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 flex items-center justify-center transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(196,163,90,0.2)', color: 'rgba(196,163,90,0.6)' }}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Review page CTA */}
        <div className="text-center mt-16">
          <a href="/reviews" className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-60"
            style={{ color: 'rgba(196,163,90,0.5)', borderBottom: '1px solid rgba(196,163,90,0.2)', paddingBottom: '3px' }}>
            Read All Verified Reviews
          </a>
        </div>
      </div>
    </section>
  );
}