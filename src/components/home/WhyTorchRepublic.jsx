import React from 'react';
import { motion } from 'framer-motion';

const RG = '#E6B7AD';

const CARDS = [
  {
    title: 'Instant Daily Ritual',
    body: 'No machine, pods, grinder, or complicated routine. Just add water or milk, stir, and begin. Ready in seconds, every morning.',
    icon: '⚡',
  },
  {
    title: 'Coffee, Mushroom Coffee & Matcha',
    body: 'A complete ritual collection for different moments of your day — morning energy, focused work, calm reset, and smooth matcha clarity.',
    icon: '☕',
  },
  {
    title: 'Ingredient Transparency',
    body: 'Each product page clearly explains what is inside, how much caffeine it contains, how to prepare it, and what kind of ritual it is best for.',
    icon: '🌿',
  },
  {
    title: 'Founder-Led Small Business',
    body: 'Torch Republic is a U.S.-based small business created to make daily coffee feel more intentional, grounded, and supportive.',
    icon: '🕯️',
  },
];

export default function WhyTorchRepublic() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#080808' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Why Torch Republic?
          </p>
          <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Made for the Way You Actually Live
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '0.97rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.9 }}>
            Torch Republic was created for people who want their daily energy ritual to feel more intentional — less rushed, less generic, and more aligned with the person they are becoming.
          </p>
        </motion.div>

        {/* Guarantee strip */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            { label: '30-Day Satisfaction Guarantee', sub: 'Not right? We make it right.' },
            { label: 'Free Shipping Over $75', sub: 'Ships in 1–3 business days.' },
            { label: 'Subscribe & Save 20%', sub: 'Cancel or pause anytime.' },
            { label: 'U.S.-Based Small Business', sub: 'Corpus Christi, TX.' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: RG }}>{item.label}</p>
              <p className="font-heading text-xs mt-0.5" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 400 }}>{item.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="p-7 flex flex-col gap-4"
              style={{ background: '#111', border: '1px solid rgba(230,183,173,0.09)' }}
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-serif font-bold text-white" style={{ fontSize: '1.05rem' }}>{b.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 400, lineHeight: 1.75 }}>
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}