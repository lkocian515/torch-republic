import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    slug: 'why-founders-series-exists',
    date: 'March 2026',
    category: 'Brand Story',
    title: 'Why the Founders Series Exists',
    excerpt: 'Torch Republic didn\'t set out to be a coffee company. But somewhere between the designs and the conviction behind them, it became clear — the brand had more to say. The Founders Series is the result.',
    readTime: '5 min read',
  },
  {
    slug: 'story-behind-each-blend',
    date: 'March 2026',
    category: 'Coffee',
    title: 'The Story Behind Each Blend',
    excerpt: 'Washington demanded discipline. Jefferson demanded nuance. Franklin demanded curiosity. Each roast profile was built to match the archetype of its founder — not as a gimmick, but as a philosophy.',
    readTime: '8 min read',
  },
  {
    slug: 'more-than-merch',
    date: 'February 2026',
    category: 'Brand',
    title: 'More Than Merch: Why Torch Republic Is Evolving',
    excerpt: 'Patriotic apparel will always be part of the story. But the story is getting bigger. Here\'s what the evolution means — and why coffee is the center of it.',
    readTime: '4 min read',
  },
  {
    slug: 'coffee-conviction-craftsmanship',
    date: 'February 2026',
    category: 'Coffee',
    title: 'Coffee, Conviction, and Craftsmanship',
    excerpt: 'There\'s a reason the founders started their days early. Discipline, clarity, purpose — and almost certainly, a cup of something strong. We built this brand around that same morning ritual.',
    readTime: '6 min read',
  },
];

function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }}
    />
  );
}

export default function Journal() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030303' }}>
      <GrainOverlay />

      {/* Header */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 pt-20 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>
              Torch Republic
            </span>
          </div>
          <h1
            className="font-serif text-white leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700 }}
          >
            The Journal
          </h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'rgba(232,223,175,0.5)', fontFamily: 'var(--font-mono)' }}>
            Stories, philosophies, and the thinking behind the brand. Coffee, conviction, and the American character.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10">
        <div className="h-px w-full mb-14" style={{ background: 'linear-gradient(90deg, rgba(200,164,77,0.3), transparent)' }} />
      </div>

      {/* Articles */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 pb-28">
        <div className="space-y-0">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group py-12 cursor-pointer"
              style={{ borderBottom: '1px solid rgba(200,164,77,0.08)' }}
            >
              {/* Meta */}
              <div className="flex items-center gap-5 mb-5">
                <span
                  className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
                  style={{ color: '#C8A44D', border: '1px solid rgba(200,164,77,0.25)', background: 'rgba(200,164,77,0.05)' }}
                >
                  {article.category}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {article.date}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h2
                className="font-serif text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600 }}
              >
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ color: 'rgba(232,223,175,0.45)', lineHeight: 1.8 }}>
                {article.excerpt}
              </p>

              {/* Read more */}
              <div
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all group-hover:gap-3"
                style={{ color: 'rgba(200,164,77,0.6)' }}
              >
                Read More <ArrowRight className="w-3 h-3" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}