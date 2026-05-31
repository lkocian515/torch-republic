import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    slug: null,
    date: 'May 2026',
    category: 'Ingredients',
    title: "What Is Lion's Mane + Chaga Coffee?",
    excerpt: "Lion's Mane is a mushroom long studied for cognitive support and mental clarity. Chaga is one of the most antioxidant-dense foods on earth. Together, they transform your morning cup into something that works as hard as you do.",
    readTime: '5 min read',
  },
  {
    slug: null,
    date: 'May 2026',
    category: 'Ritual',
    title: 'How to Build a Morning Coffee Ritual That Sticks',
    excerpt: "The best rituals aren't complicated. They're consistent. Here's how to build a simple, intentional morning routine around your daily blend — and why it changes everything about the rest of your day.",
    readTime: '4 min read',
  },
  {
    slug: null,
    date: 'May 2026',
    category: 'Education',
    title: 'Why Instant Mushroom Coffee Is Not What You Think',
    excerpt: "\"Instant\" used to mean cheap. Not anymore. Torch Republic instant mushroom coffee is freeze-dried from specialty-grade beans and blended with functional mushroom extracts — no fillers, no shortcuts.",
    readTime: '6 min read',
  },
  {
    slug: null,
    date: 'June 2026',
    category: 'Blends',
    title: 'Choosing the Right Blend for Your Routine',
    excerpt: "Focus in the morning. Calm in the afternoon. Rest at night. Each of our six blends is designed for a specific time, mood, and intention. Here's how to match your blend to your day.",
    readTime: '7 min read',
  },
  {
    slug: null,
    date: 'June 2026',
    category: 'Wellness',
    title: "Functional Coffee vs. Regular Coffee: What\u2019s the Difference?",
    excerpt: "Regular coffee gives you a spike. Functional mushroom coffee gives you sustained energy with less crash, more focus, and adaptogenic support built in. The science — explained simply.",
    readTime: '5 min read',
  },
];

export default function Journal() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030303' }}>

      {/* Header */}
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pt-20 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #E6B7AD)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#E6B7AD' }}>
              Torch Republic
            </span>
          </div>
          <h1 className="font-serif text-white leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700 }}>
            The Journal
          </h1>
          <p className="text-sm leading-relaxed max-w-lg font-mono"
            style={{ color: 'rgba(230,183,173,0.4)', lineHeight: 1.8 }}>
            Mushroom coffee, daily ritual, and the ingredients behind the blends.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="h-px w-full mb-14"
          style={{ background: 'linear-gradient(90deg, rgba(230,183,173,0.3), transparent)' }} />
      </div>

      {/* Articles */}
      <div className="max-w-[900px] mx-auto px-6 md:px-10 pb-28">
        <div className="space-y-0">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group py-12"
              style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}
            >
              <div className="flex items-center gap-5 mb-5">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
                  style={{ color: '#E6B7AD', border: '1px solid rgba(230,183,173,0.2)', background: 'rgba(230,183,173,0.04)' }}>
                  {article.category}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {article.date}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  {article.readTime}
                </span>
              </div>

              <h2 className="font-serif text-white leading-tight mb-4 group-hover:text-primary transition-colors duration-300"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 600 }}>
                {article.title}
              </h2>

              <p className="text-sm leading-relaxed mb-6 max-w-2xl"
                style={{ color: 'rgba(230,183,173,0.35)', lineHeight: 1.8 }}>
                {article.excerpt}
              </p>

              <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(230,183,173,0.3)' }}>
                Coming Soon
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
            Shop the Blends <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}