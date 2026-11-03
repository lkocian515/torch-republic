import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    category: 'Heritage',
    title: 'Why Washington Drank Rye, Not Coffee — And What Changed Everything',
    excerpt: "The story of how America's founders traded tea for coffee during the Revolution, and why that shift defines our relationship with the cup to this day.",
    date: 'April 2026',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80',
  },
  {
    category: 'Craft',
    title: 'What Small-Batch Actually Means — and Why It Matters',
    excerpt: "In an era of mass production, the decision to roast in limited runs isn't just a marketing choice. It's a commitment to taste, quality, and accountability.",
    date: 'March 2026',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    category: 'Legacy',
    title: 'The Discipline of Morning — Building Rituals That Outlast Trends',
    excerpt: 'The most accomplished people in history shared a commitment to intentional mornings. Torch Republic was built for them — and for you.',
    date: 'February 2026',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
  },
];

export default function JournalTeaser() {
  return (
    <section style={{ backgroundColor: '#050508', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-28">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(196,163,90,0.5)' }}>
              The Torch Republic Journal
            </p>
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.015em' }}>
              Stories Worth Carrying
            </h2>
          </div>
          <Link to="/Journal"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60 flex-shrink-0"
            style={{ color: 'rgba(196,163,90,0.55)', borderBottom: '1px solid rgba(196,163,90,0.2)', paddingBottom: '3px' }}>
            View Full Archive →
          </Link>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col"
              style={{ border: '1px solid rgba(196,163,90,0.09)', background: '#0E0E12', cursor: 'pointer', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.09)'}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img src={a.image} alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.65 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0E0E12 0%, transparent 60%)' }} />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1"
                    style={{ background: 'rgba(196,163,90,0.15)', color: 'rgba(196,163,90,0.8)', border: '1px solid rgba(196,163,90,0.2)' }}>
                    {a.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="font-serif text-white leading-snug" style={{ fontSize: '1.15rem', fontWeight: 600 }}>{a.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontWeight: 300 }}>{a.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{a.date}</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase transition-opacity group-hover:opacity-100 opacity-50"
                    style={{ color: '#E6AC45' }}>Read →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}