import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'Texas',
    rating: 5,
    text: 'Finally a brand that gets it. The quality is legit — thick fabric, sharp graphics. Wore my Torch tee to church and got three compliments before the service started.',
  },
  {
    name: 'Jennifer R.',
    location: 'Tennessee',
    rating: 5,
    text: 'Bought the Faith Over Fear tee for my husband. He hasn\'t taken it off. The fit is perfect and the message is exactly what we stand for. Will be ordering more.',
  },
  {
    name: 'David K.',
    location: 'Georgia',
    rating: 5,
    text: 'This isn\'t Target patriotism. These are real pieces with real meaning. The craftsmanship shows and the brand stands for something. That matters.',
  },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#E6AC45' }} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function FounderSection() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#050505' }}>
      <div className="max-w-7xl mx-auto">
        {/* Brand manifesto */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 pb-20" style={{ borderBottom: '1px solid rgba(200,164,77,0.15)' }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(200,164,77,0.12)', border: '1px solid rgba(200,164,77,0.35)' }}>
                <Flame className="w-5 h-5" style={{ color: '#E6AC45' }} />
              </div>
              <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#E6AC45' }}>Why We Exist</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase leading-tight tracking-tight text-white mb-6">
              We Don't Make Merch. <span style={{ color: '#D4AF5A' }}>We Make Statements.</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Torch Republic was built for people who believe freedom is worth fighting for, faith is worth living out loud, and truth is something worth standing behind — even when it's costly.
              </p>
              <p>
                Every design starts with a conviction. Every piece is built to carry that conviction into the world. We don't do safe. We don't do generic. We do bold, because bold is what the moment calls for.
              </p>
              <p style={{ color: 'rgba(232,223,175,0.7)' }}>
                — The Torch Republic Team
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { num: '50,000+', label: 'Patriots Outfitted' },
              { num: '4.9★', label: 'Average Rating' },
              { num: '100%', label: 'USA Based & Operated' },
              { num: '30-Day', label: 'Satisfaction Guarantee' },
            ].map(({ num, label }) => (
              <div key={label} className="flex items-center gap-5 p-5" style={{ border: '1px solid rgba(200,164,77,0.15)', backgroundColor: 'rgba(200,164,77,0.04)' }}>
                <span className="font-heading font-black text-2xl" style={{ color: '#D4AF5A' }}>{num}</span>
                <span className="font-mono text-xs tracking-wider uppercase text-gray-400">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reviews */}
        <div>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
              <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#E6AC45' }}>Real Customers</span>
              <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight text-white">
              What Patriots Are Saying
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex flex-col gap-4"
                style={{ border: '1px solid rgba(200,164,77,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <Stars />
                <p className="text-gray-300 text-sm leading-relaxed flex-1">"{review.text}"</p>
                <div>
                  <p className="font-heading font-bold text-sm text-white">{review.name}</p>
                  <p className="font-mono text-xs" style={{ color: 'rgba(200,164,77,0.6)' }}>{review.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}