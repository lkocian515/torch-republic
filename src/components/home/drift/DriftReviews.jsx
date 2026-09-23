import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

// Early customer feedback (product handles normalized to current catalog).
const REVIEWS = [
  { name: 'Monica V.', rating: 5, text: 'The flavor is gentle, smooth, and easy to mix. I would recommend it to anyone trying mushroom coffee for the first time.', product: 'Instant Mushroom Coffee' },
  { name: 'Erica L.', rating: 4, text: 'It has a gentle coffee flavor and a cozy feel. I especially like that it does not taste artificial or overly sweet.', product: 'Instant Mushroom Coffee' },
  { name: 'Miranda H.', rating: 5, text: 'This is the blend I reach for on a slow morning. It feels calm, uplifting, and effortless to enjoy.', product: 'Instant Mushroom Coffee' },
  { name: 'James R.', rating: 5, text: 'Smooth, bold, and ready in seconds. This is my new go-to morning cup \u2014 no machine, no fuss.', product: 'Instant Classic Coffee' },
  { name: 'Danielle T.', rating: 4, text: 'I was skeptical about instant coffee, but this genuinely tastes like a fresh brew. No bitterness at all.', product: 'Instant Classic Coffee' },
  { name: 'Marcus W.', rating: 5, text: 'Clean flavor and so convenient. I keep a bag at my desk for afternoon pick-me-ups.', product: 'Instant Classic Coffee' },
];

export default function DriftReviews() {
  return (
    <section style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="text-center mb-10">
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
            Early Customer Feedback
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>
            Your morning, according to you.
          </h2>
        </motion.div>

        {/* Horizontal scroll */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:justify-center md:flex-wrap md:overflow-visible md:mx-0 md:px-0" style={{ scrollbarWidth: 'thin', scrollSnapType: 'x mandatory' }}>
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex-shrink-0 w-[280px] md:w-[300px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} strokeWidth={1.5} style={{ color: i < r.rating ? D.terracotta : D.rule }} fill={i < r.rating ? D.terracotta : 'none'} />
                ))}
              </div>
              <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.65, color: D.ink, margin: '0 0 1.25rem' }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.8125rem', color: D.ink, margin: 0 }}>{r.name}</p>
              <p style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: D.secondary, margin: '0.25rem 0 0' }}>{r.product} · Early customer feedback</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}