import React from 'react';
import { motion } from 'framer-motion';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Texas',
    text: 'Finally a brand that gets it. The quality is legit — thick fabric, sharp graphics. Wore my Torch tee to church and got three compliments before the service started.',
  },
  {
    name: 'Jennifer R.',
    location: 'Tennessee',
    text: "Bought the Faith Over Fear tee for my husband. He hasn't taken it off. The fit is perfect and the message is exactly what we stand for.",
  },
  {
    name: 'David K.',
    location: 'Georgia',
    text: "This isn't Target patriotism. These are real pieces with real meaning. The craftsmanship shows and the brand stands for something. That matters.",
  },
];

const STATS = [
  { num: '50,000+', label: 'Patriots Outfitted' },
  { num: '4.9★', label: 'Average Rating' },
  { num: '100%', label: 'USA Based & Operated' },
  { num: '30-Day', label: 'Satisfaction Guarantee' },
];

export default function FounderSection() {
  return (
    <section className="py-32 px-6" style={{ backgroundColor: '#060606' }}>
      <div className="max-w-7xl mx-auto">

        {/* Brand story */}
        <div
          className="grid md:grid-cols-2 gap-20 items-center pb-28 mb-28"
          style={{ borderBottom: '1px solid rgba(201,162,74,0.1)' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C9A24A' }}>
                Why We Exist
              </span>
            </div>

            <h2
              className="font-serif font-bold text-white leading-tight mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              We don't make merch.<br />
              <span style={{ color: '#C9A24A', fontStyle: 'italic' }}>We make statements.</span>
            </h2>

            <div className="space-y-5 font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <p>
                Torch Republic was built for people who believe freedom is worth fighting for,
                faith is worth living out loud, and truth is something worth standing behind —
                even when it's costly.
              </p>
              <p>
                Every design starts with a conviction. Every piece is built to carry that conviction
                into the world. We don't do safe. We don't do generic. We do bold.
              </p>
              <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(201,162,74,0.6)' }}>
                — The Torch Republic Team
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-px"
            style={{ border: '1px solid rgba(201,162,74,0.12)' }}
          >
            {STATS.map(({ num, label }, i) => (
              <div
                key={label}
                className="p-8 flex flex-col gap-2"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgba(201,162,74,0.03)' : 'transparent',
                  borderRight: i % 2 === 0 ? '1px solid rgba(201,162,74,0.1)' : 'none',
                  borderBottom: i < 2 ? '1px solid rgba(201,162,74,0.1)' : 'none',
                }}
              >
                <span className="font-serif font-bold text-3xl" style={{ color: '#C9A24A' }}>{num}</span>
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reviews */}
        <div>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-5 mb-6">
              <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4))' }} />
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.7)' }}>
                Real Customers
              </span>
              <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.4), transparent)' }} />
            </div>
            <h3 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
              What Patriots Are Saying
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="p-8 flex flex-col gap-6"
                style={{ border: '1px solid rgba(201,162,74,0.12)', backgroundColor: 'rgba(255,255,255,0.015)' }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3 h-3" style={{ color: '#C9A24A', fill: 'currentColor' }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-heading font-light text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  "{review.text}"
                </p>

                <div>
                  <p className="font-heading font-semibold text-sm text-white">{review.name}</p>
                  <p className="font-mono text-[10px] tracking-wider mt-1" style={{ color: 'rgba(201,162,74,0.5)' }}>
                    {review.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}