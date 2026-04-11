import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    category: 'Heritage',
    title: 'The Coffeehouses That Built a Revolution',
    excerpt: 'Before there were boardrooms, there were coffeehouses. How America\'s founding fathers used coffee, debate, and conviction to forge a nation.',
    date: 'Apr 2026',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  },
  {
    category: 'Craft',
    title: 'What Small-Batch Roasting Actually Means',
    excerpt: 'Most brands use the phrase. Few live it. Here\'s what goes into every Torch Republic roast — and why it matters in the cup.',
    date: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  {
    category: 'Founders',
    title: 'Theodore Roosevelt: The Man Who Drank a Gallon a Day',
    excerpt: 'TR\'s legendary coffee habit wasn\'t indulgence — it was discipline. A look at the president who embodied relentless forward motion.',
    date: 'Feb 2026',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
  },
];

export default function JournalTeaser() {
  return (
    <section style={{ background: '#000', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-32">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>The Journal</p>
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>Stories Worth Keeping</h2>
          </div>
          <Link to="/Journal" className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.6)', borderBottom: '1px solid rgba(201,162,74,0.25)', paddingBottom: '3px' }}>
            Read All Stories →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col"
              style={{ border: '1px solid rgba(201,162,74,0.08)', background: '#0A0A0A', transition: 'border-color 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.08)'}
            >
              <div className="overflow-hidden" style={{ height: '200px' }}>
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ opacity: 0.75 }} />
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: '#C9A24A' }}>{post.category}</span>
                  <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.75rem' }}>·</span>
                  <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{post.date}</span>
                </div>
                <h3 className="font-serif text-white" style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ color: 'rgba(240,235,225,0.35)', fontSize: '0.875rem', lineHeight: 1.8, fontWeight: 300 }}>{post.excerpt}</p>
                <Link to="/Journal" className="mt-auto font-mono text-[10px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60" style={{ color: 'rgba(201,162,74,0.5)' }}>
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}