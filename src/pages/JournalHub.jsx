/**
 * Journal Topic Hub — organized cluster navigation for Torch Republic content
 * Serves as the primary internal linking hub for all educational content
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, BookOpen } from 'lucide-react';

const RG = '#E6B7AD';

const CLUSTERS = [
  {
    id: 'mushroom-coffee',
    title: 'Mushroom Coffee',
    description: 'Research, comparisons, flavor, and ingredient transparency for functional mushroom coffee.',
    color: '#6CBD5A',
    articles: [
      { title: 'Mushroom Coffee vs. Regular Coffee', slug: 'mushroom-coffee-vs-regular-coffee', excerpt: 'Compare by caffeine, taste, and research without exaggerated claims.' },
      { title: 'Does Mushroom Coffee Make You Less Jittery?', slug: 'does-mushroom-coffee-make-you-less-jittery', excerpt: 'What the evidence actually says about caffeine and jitter reduction.' },
      { title: 'What Does Mushroom Coffee Actually Taste Like?', slug: 'what-does-mushroom-coffee-taste-like', excerpt: 'An honest flavor guide — earthy, coffee-forward, and not savory.' },
      { title: 'The History of Mushroom Coffee', slug: 'history-of-mushroom-coffee', excerpt: 'From ancient traditions to modern wellness rituals.' },
      { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane', excerpt: 'Research-backed benefits for brain and body.' },
      { title: 'Chaga Mushroom: The Antioxidant King', slug: 'chaga-mushroom-antioxidant-king', excerpt: 'Behind evening restoration.' },
    ],
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
    ],
  },
  {
    id: 'matcha',
    title: 'Matcha',
    description: 'Ceremonial grade matcha: history, preparation, caffeine, L-theanine, and daily rituals.',
    color: '#8BC45A',
    articles: [
      { title: 'Matcha vs. Coffee: Energy, Focus, Taste, and Caffeine Compared', slug: 'matcha-vs-coffee', excerpt: 'Research-based context instead of hype.' },
      { title: 'The History of Matcha', slug: 'history-of-matcha', excerpt: 'From ancient China to modern wellness rituals.' },
      { title: 'Instant Ceremonial Matcha', slug: 'instant-ceremonial-matcha', excerpt: 'What ceremonial grade means and why it matters.' },
      { title: 'Matcha Benefits Guide', slug: 'matcha-benefits', excerpt: 'A guide to L-theanine, catechins, and honest research.' },
    ],
    products: [
      { name: 'Shop Matcha', path: '/shop/matcha' },
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'The Alchemist Matcha', path: '/products/the-alchemist-matcha-blend' },
    ],
  },
  {
    id: 'pod-free',
    title: 'Pod-Free Coffee',
    description: 'Why more coffee drinkers are choosing premium instant over single-use pods.',
    color: '#C4A35A',
    articles: [
      { title: 'Why Coffee Drinkers Are Switching Away From Pods', slug: 'why-coffee-drinkers-are-switching-away-from-pods', excerpt: 'Packaging, convenience, cost, and pod-free alternatives.' },
      { title: 'What Makes Premium Instant Coffee Different?', slug: 'what-makes-premium-instant-coffee-different', excerpt: 'Freeze-dried quality, flavor, and preparation.' },
      { title: 'Best Instant Coffee Guide', slug: 'best-instant-coffee', excerpt: 'How to evaluate quality in a tube or jar.' },
      { title: 'Instant Coffee for Energy', path: '/instant-coffee-for-energy', external: true },
    ],
    products: [
      { name: 'Shop Classic Instant Coffee', path: '/shop/instant-coffee' },
      { name: 'Torchbearer', path: '/products/torchbearer' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
    ],
  },
  {
    id: 'rituals',
    title: 'Coffee Rituals',
    description: 'Morning habits, focus routines, and intentional preparation for a better daily ritual.',
    color: '#E6B7AD',
    articles: [
      { title: 'Building Better Morning Habits', slug: 'building-better-morning-habits', excerpt: 'A guide to intentional daily rituals.' },
      { title: 'Coffee and Focus: A Research Guide', slug: 'coffee-and-focus', excerpt: 'What caffeine and alertness science actually shows.' },
      { title: 'Morning Ritual for Focus', slug: 'morning-ritual-for-focus', excerpt: 'Structured morning habits for intentional productivity.' },
    ],
    products: [
      { name: 'Take the Blend Quiz', path: '/quiz' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
      { name: 'How It Works', path: '/how-it-works' },
    ],
  },
  {
    id: 'ingredients',
    title: 'Ingredients & Research',
    description: 'Transparent, source-cited deep dives on adaptogens, mushrooms, caffeine, and L-theanine.',
    color: '#B88FA8',
    articles: [
      { title: 'The Science of Lion\'s Mane', slug: 'science-of-lions-mane', excerpt: 'NGF, cognitive studies, and honest limitations.' },
      { title: 'Chaga Mushroom: Antioxidant King', slug: 'chaga-mushroom-antioxidant-king', excerpt: 'Beta-glucans, antioxidant properties, and research.' },
      { title: 'Adaptogens Guide', slug: 'adaptogens-guide', excerpt: 'What adaptogens are — and what they are not.' },
      { title: 'Mushroom Coffee Benefits Guide', slug: 'mushroom-coffee-benefits', excerpt: 'Research-backed ingredient overview with honest caveats.' },
    ],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Research Hub', path: '/research' },
      { name: 'Why Mushroom Coffee', path: '/why-mushroom-coffee' },
    ],
  },
];

export default function JournalHub() {
  useSEO({
    title: 'Journal | Torch Republic Coffee & Matcha Education',
    description: 'Explore research-backed guides on mushroom coffee, ceremonial matcha, premium instant coffee, pod-free alternatives, and intentional coffee rituals.',
    url: '/journal',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-12 py-16 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Torch Republic
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            The Journal
          </h1>
          <p className="font-heading max-w-xl mx-auto"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
            Research-backed guides on mushroom coffee, ceremonial matcha, premium instant coffee, and intentional daily rituals. No guaranteed health claims — just honest education.
          </p>
        </motion.div>
      </section>

      {/* Topic Clusters */}
      <section className="px-6 md:px-12 py-14 max-w-6xl mx-auto">
        <div className="space-y-16">
          {CLUSTERS.map((cluster, ci) => (
            <motion.div key={cluster.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: ci * 0.05, duration: 0.5 }}>
              {/* Cluster Header */}
              <div className="flex items-center gap-4 mb-6 pb-4" style={{ borderBottom: `1px solid ${cluster.color}25` }}>
                <div className="w-1 h-8 rounded" style={{ background: cluster.color }} />
                <div>
                  <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>{cluster.title}</h2>
                  <p className="font-heading text-sm mt-0.5" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>{cluster.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Articles */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cluster.articles.map((article, ai) => {
                    if (article.external) {
                      return (
                        <Link key={ai} to={article.path}
                          className="p-4 block transition-opacity hover:opacity-75"
                          style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="w-3 h-3" style={{ color: cluster.color }} />
                            <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>Article</p>
                          </div>
                          <p className="font-heading text-sm font-medium" style={{ color: '#F5EFE6' }}>{article.title}</p>
                        </Link>
                      );
                    }
                    return (
                      <Link key={ai} to={`/journal/${article.slug}`}
                        className="p-4 block transition-all hover:border-opacity-30 group"
                        style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster.color}35`}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-3 h-3" style={{ color: cluster.color }} />
                          <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>Article</p>
                        </div>
                        <p className="font-heading text-sm font-medium mb-1" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{article.title}</p>
                        {article.excerpt && (
                          <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.4)', fontWeight: 300, lineHeight: 1.6 }}>{article.excerpt}</p>
                        )}
                        <div className="flex items-center gap-1 mt-3">
                          <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${cluster.color}80` }}>Read</span>
                          <ArrowRight className="w-3 h-3" style={{ color: `${cluster.color}80` }} />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Related Products */}
                <div className="p-5" style={{ background: `${cluster.color}08`, border: `1px solid ${cluster.color}20` }}>
                  <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-4" style={{ color: cluster.color }}>Related Products</p>
                  <div className="space-y-2">
                    {cluster.products.map((prod, pi) => (
                      <Link key={pi} to={prod.path}
                        className="flex items-center justify-between py-2 px-3 transition-opacity hover:opacity-75"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <span className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 400 }}>{prod.name}</span>
                        <ArrowRight className="w-3 h-3" style={{ color: cluster.color }} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: '#070707', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>Find Your Blend</p>
        <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F5EFE6' }}>
          Ready to start your ritual?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quiz"
            className="font-mono text-[11px] tracking-[0.3em] uppercase font-bold py-4 px-10 transition-opacity hover:opacity-80"
            style={{ background: RG, color: '#080808' }}>
            Take the Blend Quiz →
          </Link>
          <Link to="/shop"
            className="font-mono text-[11px] tracking-[0.3em] uppercase font-bold py-4 px-10 transition-opacity hover:opacity-80"
            style={{ border: `1px solid ${RG}40`, color: RG }}>
            Shop All Blends
          </Link>
        </div>
      </section>
    </div>
  );
}