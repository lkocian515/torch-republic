import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RG = '#E6AC45';

const SPOTLIGHTS = [
  {
    name: 'Sarah M.',
    location: 'Denver, CO',
    blend: 'Rise & Clarity',
    avatar: 'SM',
    ritual: 'Before my 6am hike, I mix a packet with hot water right in my Nalgene. No coffee maker, no mess — just clear-headed energy by the time I hit the trailhead. It replaced my pre-workout completely.',
    detail: 'Hiker & yoga instructor',
    since: '4 months',
  },
  {
    name: 'James T.',
    location: 'Austin, TX',
    blend: 'Calm Focus',
    avatar: 'JT',
    ritual: 'I work from home and my mornings used to be chaotic. Now I have one ritual: boil water, pour over Torch Republic, sit for five minutes before opening the laptop. That quiet cup has become sacred to me.',
    detail: 'Freelance designer',
    since: '7 months',
  },
  {
    name: 'Priya K.',
    location: 'Chicago, IL',
    blend: 'Dream Cap Evening',
    avatar: 'PK',
    ritual: "I switched to the evening blend after my second cup of regular coffee started giving me anxiety. Now I have one Torch Republic in the morning and the Dream Cap at night. My sleep tracker actually improved — I'm getting deeper sleep.",
    detail: 'ICU nurse',
    since: '3 months',
  },
  {
    name: 'Marcus L.',
    location: 'Portland, OR',
    blend: 'The Complete Bundle',
    avatar: 'ML',
    ritual: "I rotate blends based on what my day looks like. Demanding client call? Rise & Clarity. Creative work day? Calm Focus. The fact that I can tailor my morning ritual to my schedule feels genuinely luxurious.",
    detail: 'Architect',
    since: '5 months',
  },
  {
    name: 'Elena R.',
    location: 'Scottsdale, AZ',
    blend: 'Rise & Clarity',
    avatar: 'ER',
    ritual: "My husband thought I'd give up on it in a week. Six months later, he steals half my packet every morning. We finally just ordered the bundle. It's become our morning thing — we actually talk over coffee now.",
    detail: 'Pediatric therapist',
    since: '6 months',
  },
];

export default function CustomerSpotlight() {
  const [active, setActive] = useState(0);

  const current = SPOTLIGHTS[active];

  return (
    <section
      style={{
        backgroundColor: '#0E0C0B',
        borderTop: '1px solid rgba(230,183,173,0.12)',
        borderBottom: '1px solid rgba(230,183,173,0.12)',
      }}
      className="py-20 md:py-28 px-4"
    >
      {/* Header */}
      <div className="text-center mb-14 max-w-xl mx-auto">
        <p
          className="font-mono uppercase tracking-[0.28em] mb-3"
          style={{ color: RG, fontSize: '0.65rem' }}
        >
          Community Rituals
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl mb-4"
          style={{ color: '#F5EDE4', lineHeight: 1.2 }}
        >
          Morning Stories from the Community
        </h2>
        <p className="text-sm" style={{ color: '#9A8A7A', lineHeight: 1.7 }}>
          Real people, real mornings. Here's how Torch Republic fits into their daily rituals.
        </p>
      </div>

      {/* Cards row — desktop tab-like selectors */}
      <div className="max-w-5xl mx-auto">
        {/* Selector tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-10">
          {SPOTLIGHTS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all"
              style={{
                borderColor: i === active ? RG : 'rgba(230,183,173,0.18)',
                background: i === active ? 'rgba(230,183,173,0.08)' : 'transparent',
                color: i === active ? RG : '#9A8A7A',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
              }}
            >
              {/* Avatar circle */}
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{
                  background: i === active ? RG : 'rgba(230,183,173,0.15)',
                  color: i === active ? '#0E0C0B' : RG,
                }}
              >
                {s.avatar}
              </span>
              {s.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Spotlight card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border mx-auto"
            style={{
              maxWidth: 720,
              borderColor: 'rgba(230,183,173,0.14)',
              background: 'rgba(255,255,255,0.025)',
            }}
          >
            {/* Top bar */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: 'rgba(230,183,173,0.1)' }}
            >
              {/* Person info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: 'rgba(230,183,173,0.18)', color: RG }}
                >
                  {current.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F5EDE4' }}>
                    {current.name}
                  </p>
                  <p className="text-xs" style={{ color: '#7A6A5A' }}>
                    {current.detail} · {current.location}
                  </p>
                </div>
              </div>
              {/* Blend badge */}
              <span
                className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded-full border"
                style={{
                  borderColor: 'rgba(230,183,173,0.22)',
                  color: RG,
                  letterSpacing: '0.06em',
                }}
              >
                {current.blend}
              </span>
            </div>

            {/* Quote */}
            <div className="px-6 py-8">
              {/* Decorative open quote */}
              <span
                className="block font-serif text-5xl leading-none mb-3 -ml-1"
                style={{ color: 'rgba(230,183,173,0.25)' }}
              >
                "
              </span>
              <p
                className="text-base md:text-lg leading-relaxed font-serif italic"
                style={{ color: '#D8CABC' }}
              >
                {current.ritual}
              </p>
            </div>

            {/* Footer */}
            <div
              className="px-6 py-4 border-t flex items-center justify-between"
              style={{ borderColor: 'rgba(230,183,173,0.1)' }}
            >
              <p className="text-xs" style={{ color: '#5E4639' }}>
                Community member for {current.since}
              </p>
              {/* Navigation arrows */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActive(i => (i - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length)}
                  className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors hover:border-rose-gold"
                  style={{ borderColor: 'rgba(230,183,173,0.2)', color: '#9A8A7A' }}
                >
                  ‹
                </button>
                <button
                  onClick={() => setActive(i => (i + 1) % SPOTLIGHTS.length)}
                  className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors hover:border-rose-gold"
                  style={{ borderColor: 'rgba(230,183,173,0.2)', color: '#9A8A7A' }}
                >
                  ›
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {SPOTLIGHTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                background: i === active ? RG : 'rgba(230,183,173,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}