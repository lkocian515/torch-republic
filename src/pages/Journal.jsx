import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6B7AD';
const EMERALD = '#10B981';
const TEAL = '#06B6D4';
const DARK_EMERALD = '#047857';

const FEATURED_POSTS = [
  {
    slug: '/journal/lions-mane-mushroom-coffee',
    date: 'June 2026',
    category: 'Ingredients',
    readTime: '12 min read',
    title: "Lion's Mane Mushroom Coffee: Benefits, Research, and Why Your Morning Ritual Just Leveled Up",
    excerpt: "Lion's Mane is the only widely consumed food containing compounds proven to cross the blood-brain barrier and stimulate your brain's own NGF production. Here's the science, three decades of research, and how to make it part of your daily ritual.",
    featured: true,
  },
  {
    slug: '/journal/chaga-mushroom-coffee',
    date: 'June 2026',
    category: 'Ingredients',
    readTime: '11 min read',
    title: "What Is Chaga Mushroom? The World's Most Powerful Antioxidant — In Your Morning Coffee",
    excerpt: 'Chaga holds the highest ORAC antioxidant value ever recorded for any natural food substance — 15x wild blueberries. Learn the history, the bioactive compounds, the Memorial Sloan Kettering research, and why Chaga belongs in your morning cup.',
    featured: true,
  },
  {
    slug: '/journal/instant-ceremonial-matcha',
    date: 'June 2026',
    category: 'Education',
    readTime: '13 min read',
    title: 'Instant Ceremonial Matcha: What It Is, Why It Matters, and How to Find Your Ritual',
    excerpt: '800 years of Zen tradition. L-theanine for 3–6 hours of calm focus. EGCG antioxidants at 15x wild blueberries. All of it available in seconds. The complete guide to ceremonial grade matcha and the Torch Republic matcha collection.',
    featured: true,
  },
];

const COMING_SOON = [
  {
    date: 'Coming Soon',
    category: 'Ritual',
    title: 'How to Build a Morning Coffee Ritual That Sticks',
    excerpt: "The best rituals aren't complicated. They're consistent. Here's how to build a simple, intentional morning routine around your daily blend — and why it changes everything about the rest of your day.",
    readTime: '4 min read',
  },
  {
    date: 'Coming Soon',
    category: 'Education',
    title: 'Why Instant Mushroom Coffee Is Not What You Think',
    excerpt: '"Instant" used to mean cheap. Not anymore. Torch Republic instant mushroom coffee is freeze-dried from specialty-grade beans and blended with functional mushroom extracts — no fillers, no shortcuts.',
    readTime: '6 min read',
  },
  {
    date: 'Coming Soon',
    category: 'Blends',
    title: 'Choosing the Right Blend for Your Routine',
    excerpt: "Focus in the morning. Calm in the afternoon. Rest at night. Each of our six blends is designed for a specific time, mood, and intention. Here's how to match your blend to your day.",
    readTime: '7 min read',
  },
  {
    date: 'Coming Soon',
    category: 'Wellness',
    title: "Functional Coffee vs. Regular Coffee: What's the Difference?",
    excerpt: "Regular coffee gives you a spike. Functional mushroom coffee gives you sustained energy with less crash, more focus, and adaptogenic support built in. The science — explained simply.",
    readTime: '5 min read',
  },
];

function FeaturedCard({ post, index }) {
  const isFirst = index === 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.2 }}
    >
      <Link to={post.slug} className="block group">
        <div
          className="p-7 md:p-9 transition-all duration-300 hover:border-opacity-60"
          style={{
            background: isFirst ? `linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.04))` : 'rgba(255,255,255,0.015)',
            border: `1px solid ${isFirst ? `${EMERALD}40` : `${EMERALD}20`}`,
            borderRadius: '2px',
          }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
              style={{ color: EMERALD, border: `1px solid ${EMERALD}40`, background: `${EMERALD}12` }}>
              {post.category}
            </span>
            <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {post.date}
            </span>
            <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {post.readTime}
            </span>
          </div>

          <h2 className="font-serif font-bold leading-tight mb-4 transition-colors duration-300 group-hover:text-primary"
            style={{ fontSize: isFirst ? 'clamp(1.5rem, 3vw, 2.1rem)' : 'clamp(1.25rem, 2.5vw, 1.7rem)', color: '#FFFFFF', fontWeight: 700 }}>
            {post.title}
          </h2>

          <p className="font-heading text-sm mb-6 max-w-2xl"
            style={{ color: 'rgba(230,183,173,0.4)', lineHeight: 1.85, fontWeight: 300 }}>
            {post.excerpt}
          </p>

          <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: RG }}>
            Read Article <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Journal() {
  useSEO({
    title: 'The Journal | Mushroom Coffee Research & Ritual | Torch Republic',
    description: "Deep-dive research on Lion's Mane, Chaga, ceremonial matcha, and the science of daily functional coffee rituals. The Torch Republic Content Hub.",
    url: '/journal',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#030303' }}>
      {/* Emerald glow backdrop */}
      <div className="fixed top-0 left-1/3 w-96 h-96 -z-10 opacity-20 blur-3xl"
        style={{ background: `radial-gradient(ellipse 60% 60%, ${EMERALD}, transparent)` }} />

      {/* Header */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10 pt-20 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: `linear-gradient(90deg, transparent, ${EMERALD})` }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: RG }}>
              Torch Republic
            </span>
          </div>
          <h1 className="font-serif text-white leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700 }}>
            The Journal
          </h1>
          <p className="text-sm leading-relaxed max-w-lg font-heading font-light"
            style={{ color: 'rgba(230,183,173,0.45)', lineHeight: 1.85 }}>
            Deep research on functional mushrooms, ceremonial matcha, and the science of the daily ritual.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10">
        <div className="h-px w-full mb-14"
          style={{ background: `linear-gradient(90deg, ${EMERALD}, ${TEAL}, transparent)`, opacity: 0.4 }} />
      </div>

      {/* Featured label */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-mono text-[9px] tracking-[0.5em] uppercase"
          style={{ color: 'rgba(255,255,255,0.2)' }}>
          Featured Research
        </motion.p>
      </div>

      {/* Featured Posts */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10 mb-20">
        <div className="space-y-5">
          {FEATURED_POSTS.map((post, i) => (
            <FeaturedCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>

      {/* Coming Soon label */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10 mb-8">
        <div className="h-px mb-10" style={{ background: `linear-gradient(90deg, ${EMERALD}, transparent)`, opacity: 0.2 }} />
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Coming Soon
        </p>
      </div>

      {/* Coming Soon Articles */}
      <div className="max-w-[920px] mx-auto px-6 md:px-10 pb-28">
        <div className="space-y-0">
          {COMING_SOON.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 + 0.5 }}
              className="py-10"
              style={{ borderBottom: `1px solid ${EMERALD}15` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
                  style={{ color: `${EMERALD}80`, border: `1px solid ${EMERALD}20`, background: `${EMERALD}08` }}>
                  {article.category}
                </span>
                <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.12)' }}>
                  {article.readTime}
                </span>
              </div>

              <h2 className="font-serif leading-tight mb-3"
                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
                {article.title}
              </h2>

              <p className="text-sm leading-relaxed mb-4 max-w-2xl font-heading font-light"
                style={{ color: 'rgba(230,183,173,0.2)', lineHeight: 1.8 }}>
                {article.excerpt}
              </p>

              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(230,183,173,0.2)' }}>
                Coming Soon
              </span>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link to="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:shadow-lg"
            style={{ background: `linear-gradient(135deg, ${EMERALD}, ${TEAL})`, color: '#080808', padding: '14px 32px' }}>
            Shop the Blends <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}