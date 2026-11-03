import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const RG = '#E6AC45';
const GOLD = '#E6AC45';

const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    rating: 5,
    headline: 'Smooth enough for every morning.',
    body: 'I wanted something functional that still tasted like real coffee. GlowMind became part of my work routine — I just scoop and stir while my computer boots up. It\'s that easy.',
    blend: 'GlowMind Clarity',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cdb889116_9.png',
  },
  {
    name: 'James R.',
    location: 'Denver, CO',
    rating: 5,
    headline: 'The easiest wellness habit I\'ve added.',
    body: 'No machine, no mess, just a quick cup that feels more intentional than regular coffee. I\'ve been doing a subscription for three months and I don\'t see myself stopping.',
    blend: 'SunCap Rise',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2e60f0546_10.png',
  },
  {
    name: 'Priya K.',
    location: 'Chicago, IL',
    rating: 5,
    headline: 'DreamCap is my night coffee.',
    body: 'I like having coffee in the evening when I\'m writing or reading. DreamCap feels cozy and settled without being heavy. Smooth and surprisingly comforting.',
    blend: 'DreamCap Blend',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/390d22377_11.png',
  },
  {
    name: 'Marcus T.',
    location: 'Nashville, TN',
    rating: 5,
    headline: 'Actually tastes like coffee.',
    body: 'I was skeptical about mushroom coffee but this genuinely just tastes like good instant coffee. No weird aftertaste. The Oracle is my daily blend now.',
    blend: 'The Oracle Blend',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9a21cf463_13.png',
  },
  {
    name: 'Emily W.',
    location: 'Seattle, WA',
    rating: 5,
    headline: 'The ritual matters to me.',
    body: 'There\'s something about having a specific morning blend that makes the day feel more intentional. MoonCap in the evening, SunCap in the morning. Both are really smooth.',
    blend: 'MoonCap Restore',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9c00cda6c_8.png',
  },
  {
    name: 'David L.',
    location: 'Phoenix, AZ',
    rating: 4,
    headline: 'Simple, smooth, and it works.',
    body: 'I\'ve tried a lot of instant coffees and this is genuinely one of the better ones. The functional mushroom side is a bonus but the taste is what keeps me coming back.',
    blend: 'Mystic Bloom Blend',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/45e7257d5_12.png',
  },
];

export default function StaticReviewsSection() {
  return (
    <section
      style={{
        background: '#0b0b0b',
        borderTop: '1px solid rgba(230,183,173,0.06)',
        padding: 'clamp(56px, 7vw, 88px) 24px',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Reviews
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)', color: '#F7F2E9', letterSpacing: '-0.02em', lineHeight: 1.2 }}
          >
            What Customers Are Saying
          </h2>
          {/* Stars row */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" style={{ color: GOLD }} />
            ))}
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase ml-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
              4.9 Average Rating
            </span>
          </div>
        </motion.div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col overflow-hidden"
              style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
            >
              {/* Product lifestyle image */}
              {r.image && (
                <div className="w-full overflow-hidden" style={{ height: 200 }}>
                  <img
                    src={r.image}
                    alt={r.blend}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col gap-4 flex-1">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-current" style={{ color: j < r.rating ? GOLD : 'rgba(255,255,255,0.1)' }} />
                ))}
              </div>

              {/* Headline */}
              <p className="font-serif font-bold text-white text-sm leading-snug">"{r.headline}"</p>

              {/* Body */}
              <p className="font-heading text-xs leading-relaxed flex-1" style={{ color: '#F7F2E9', fontWeight: 300 }}>
                {r.body}
              </p>

              {/* Reviewer */}
              <div style={{ borderTop: '1px solid rgba(230,183,173,0.07)', paddingTop: '14px' }}>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: RG }}>{r.name}</p>
                <p className="font-mono text-[7px] tracking-[0.15em] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{r.location}</p>
                <span
                  className="inline-block mt-2 font-mono text-[6.5px] tracking-[0.18em] uppercase px-2 py-0.5"
                  style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.12)', color: 'rgba(230,183,173,0.45)' }}
                >
                  {r.blend}
                </span>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          {[
            { stat: '4.9 ★', label: 'Average Rating' },
            { stat: '30-Day', label: 'Satisfaction Guarantee' },
            { stat: '27', label: 'Servings Per Tube' },
            { stat: '6', label: 'Blends to Choose From' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-serif font-bold text-xl" style={{ color: RG }}>{s.stat}</p>
              <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}