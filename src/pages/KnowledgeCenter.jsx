import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { Helmet } from 'react-helmet';
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_ARTICLES, getArticlesByCategory } from '@/lib/knowledgeArticles';
import KnowledgeArticleCard from '@/components/knowledge/KnowledgeArticleCard';

const RG = '#E6B7AD';

const CATEGORY_ICONS = {
  'Coffee Origins': '🌍',
  'Mushroom Coffee Education': '🍄',
  'Instant Coffee Education': '⚡',
  'Travel Coffee': '✈️',
  'Brewing Alternatives': '🔧',
  'Coffee Comparisons': '⚖️',
};

export default function KnowledgeCenter() {
  useSEO({
    title: 'Coffee Knowledge Center | Torch Republic',
    description: 'Comprehensive guides on Papua New Guinea coffee, mushroom coffee, freeze-dried instant coffee, travel coffee, and brewing alternatives. Learn from Torch Republic\'s Coffee Knowledge Center.',
    url: '/knowledge',
    type: 'website',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Knowledge Center', url: '/knowledge' },
    ],
  });

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Coffee Knowledge Center',
    description: 'Comprehensive guides on Papua New Guinea coffee, mushroom coffee, freeze-dried instant coffee, travel coffee, and brewing alternatives.',
    url: 'https://torchrepublic.com/knowledge',
    publisher: { '@type': 'Organization', name: 'Torch Republic' },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
        {/* Hero */}
        <section className="px-6 md:px-10 pt-20 pb-16 text-center">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <BookOpen size={16} style={{ color: RG }} />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: RG }}>Coffee Knowledge Center</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif font-bold mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#F5EFE6', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              Everything Worth Knowing About Premium Coffee
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-lg mb-8"
              style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}
            >
              Deep-dive guides on Papua New Guinea coffee, mushroom coffee, freeze-dried instant coffee, travel rituals, and brewing alternatives — written to help you make informed choices about your daily cup.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-6 font-mono text-[8px] tracking-[0.25em] uppercase"
              style={{ color: 'rgba(230,183,173,0.4)' }}
            >
              <span>{KNOWLEDGE_ARTICLES.length} Articles</span>
              <span style={{ color: 'rgba(230,183,173,0.15)' }}>|</span>
              <span>{KNOWLEDGE_CATEGORIES.length} Categories</span>
              <span style={{ color: 'rgba(230,183,173,0.15)' }}>|</span>
              <span>Updated June 2026</span>
            </motion.div>
          </div>
        </section>

        {/* Category Quick Nav */}
        <section className="px-6 md:px-10 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {KNOWLEDGE_CATEGORIES.map((cat, i) => (
                <a
                  key={i}
                  href={`#category-${cat.slug}`}
                  className="font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all hover:opacity-80"
                  style={{ border: '1px solid rgba(230,183,173,0.15)', color: 'rgba(230,183,173,0.5)' }}
                >
                  {cat.icon} {cat.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Article Sections by Category */}
        {KNOWLEDGE_CATEGORIES.map((category, catIdx) => {
          const articles = getArticlesByCategory(category.name);
          if (articles.length === 0) return null;

          return (
            <section
              key={category.slug}
              id={`category-${category.slug}`}
              className="px-6 md:px-10 py-12"
              style={{ borderTop: catIdx > 0 ? '1px solid rgba(230,183,173,0.06)' : 'none' }}
            >
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                    <h2 className="font-serif font-bold" style={{ fontSize: '1.8rem', color: '#F5EFE6', letterSpacing: '-0.01em' }}>
                      {category.name}
                    </h2>
                    <span className="font-mono text-[8px] tracking-[0.2em] uppercase ml-auto" style={{ color: 'rgba(230,183,173,0.3)' }}>
                      {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
                    </span>
                  </div>
                  <p className="font-heading text-sm max-w-2xl" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300, lineHeight: 1.7 }}>
                    {category.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((article, i) => (
                    <KnowledgeArticleCard key={article.slug} article={article} index={i} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="px-6 md:px-10 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <div className="max-w-xl mx-auto">
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: '1.8rem', color: '#F5EFE6' }}>Ready to Find Your Ritual?</h2>
            <p className="font-heading mb-8" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
              Take our 60-second blend quiz and we'll match you to the right premium coffee ritual — no machine needed.
            </p>
            <Link to="/quiz"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#050505' }}>
              Take the Blend Quiz <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}