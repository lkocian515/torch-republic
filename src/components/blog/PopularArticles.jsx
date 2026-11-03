import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';

const POPULAR = [
  { slug: 'mushroom-coffee-benefits', title: 'Mushroom Coffee Benefits: What the Science Says', category: 'Science', readTime: '6 min' },
  { slug: 'best-instant-coffee', title: 'Best Instant Coffee: How to Choose Quality', category: 'Guides', readTime: '5 min' },
  { slug: 'lions-mane-mushroom-coffee', title: "Lion's Mane Mushroom Coffee: A Complete Guide", category: 'Science', readTime: '7 min' },
  { slug: 'matcha-benefits', title: 'Matcha Benefits: Why This Green Tea Is Different', category: 'Wellness', readTime: '5 min' },
  { slug: 'morning-ritual-for-focus', title: 'How to Build a Morning Ritual for Deep Focus', category: 'Habits', readTime: '6 min' },
  { slug: 'coffee-and-focus', title: 'Coffee and Focus: How Caffeine Affects Concentration', category: 'Science', readTime: '5 min' },
];

export default function PopularArticles() {
  return (
    <section className="px-6 md:px-10 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={16} style={{ color: RG }} />
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: RG }}>Popular Articles</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POPULAR.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/journal/${article.slug}`}
                className="block p-5 transition-all group"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}40`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: `${RG}80` }}>{article.category}</span>
                  <span style={{ color: 'rgba(230,183,173,0.2)', fontSize: 8 }}>·</span>
                  <span className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>{article.readTime}</span>
                </div>
                <h3 className="font-serif font-bold mb-2" style={{ fontSize: '0.95rem', color: '#F7F2E9', lineHeight: 1.3 }}>{article.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${RG}70` }}>Read</span>
                  <ArrowRight size={10} style={{ color: `${RG}70` }} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}