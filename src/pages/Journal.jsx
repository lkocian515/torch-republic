import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useSEO } from '@/hooks/useSEO';
import JournalHero from '../components/journal/JournalHero';
import ArticleCard from '../components/journal/ArticleCard';
import CategoryFilter from '../components/journal/CategoryFilter';

const RG = '#E6B7AD';

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('all');

  useSEO({
    title: 'Ritual Journal | Torch Republic Coffee Company',
    description: 'Explore the science behind mushroom coffee, learn about Lion\'s Mane and Chaga benefits, and discover tips for building better morning rituals.',
    url: '/journal',
    type: 'website',
  });

  const { data: articles, isLoading } = useQuery({
    queryKey: ['blog-posts', activeCategory],
    queryFn: async () => {
      const query = activeCategory === 'all' ? {} : { category: activeCategory };
      const posts = await base44.entities.BlogPost.filter(query);
      return posts.filter(post => post.published).sort((a, b) => 
        new Date(b.published_date) - new Date(a.published_date)
      );
    },
  });

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <JournalHero />
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      
      <section id="latest-articles" className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Latest Insights
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
              {activeCategory === 'all' ? 'Latest Articles' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles`}
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-heading text-lg mb-4" style={{ color: 'rgba(240,235,225,0.5)' }}>
                No articles found in this category yet.
              </p>
              <p className="font-mono text-sm" style={{ color: `${RG}50` }}>
                Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section
        className="px-6 md:px-10 py-16"
        style={{
          background: 'rgba(230,183,173,0.03)',
          borderTop: '1px solid rgba(230,183,173,0.08)',
        }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Stay Updated
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: '#F5EFE6' }}>
              Join the Ritual
            </h2>
            <p className="font-heading mb-8" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
              Get weekly insights on mushroom coffee science, morning ritual tips, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none"
                style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
              />
              <button
                className="px-8 py-3 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 rounded-sm"
                style={{ background: RG, color: '#050505' }}
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}