/**
 * RelatedArticles — smart internal linking component
 * Surfaces related content based on cluster matching.
 * Used on journal articles, FAQ pages, ingredient pages, comparison pages.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ALL_BLOG_TOPICS, TOPIC_CLUSTERS, FAQ_PAGES, INGREDIENT_PAGES } from '@/lib/seoContent';

const RG = '#E6B7AD';

export default function RelatedArticles({ currentSlug, cluster, maxArticles = 4, showProducts = true }) {
  const clusterData = cluster ? TOPIC_CLUSTERS[cluster] : null;
  const color = clusterData?.color || RG;

  // Get related journal articles (published ones in same cluster)
  const articles = ALL_BLOG_TOPICS
    .filter(t => t.exists && t.slug !== currentSlug && (!cluster || t.cluster === cluster))
    .slice(0, maxArticles);

  // Get related FAQs
  const faqs = FAQ_PAGES
    .filter(f => !cluster || f.cluster === cluster)
    .slice(0, 3);

  // Get related ingredients
  const ingredients = INGREDIENT_PAGES.slice(0, 3);

  if (articles.length === 0 && faqs.length === 0) return null;

  return (
    <section className="px-6 md:px-10 py-14" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Articles */}
          {articles.length > 0 && (
            <div className="md:col-span-2">
              <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-5" style={{ color }}>More Articles</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {articles.map((article, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}>
                    <Link to={`/journal/${article.slug}`}
                      className="p-4 block transition-all group h-full"
                      style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = `${color}30`}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={11} style={{ color }} />
                        <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color }}>Article</span>
                      </div>
                      <p className="font-heading text-sm font-medium mb-3" style={{ color: 'rgba(240,235,225,0.85)', lineHeight: 1.35 }}>
                        {article.title}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${color}70` }}>Read</span>
                        <ArrowRight size={9} style={{ color: `${color}70` }} />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs + Products sidebar */}
          <div className="space-y-5">
            {/* FAQs */}
            {faqs.length > 0 && (
              <div className="p-4" style={{ background: '#0F0E0D', border: `1px solid ${color}15` }}>
                <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-3" style={{ color }}>Related Questions</p>
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <Link key={i} to={`/faq/${faq.slug}`}
                      className="flex items-start gap-2 py-1.5 hover:opacity-75 transition-opacity">
                      <span className="font-mono text-[8px] flex-shrink-0 mt-0.5" style={{ color }}>Q</span>
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.4 }}>{faq.question}</p>
                    </Link>
                  ))}
                </div>
                <Link to="/faq" className="font-mono text-[7px] tracking-[0.2em] uppercase mt-3 block" style={{ color: `${color}60` }}>
                  All FAQs →
                </Link>
              </div>
            )}

            {/* Products */}
            {showProducts && clusterData?.products && (
              <div className="p-4" style={{ background: `${color}08`, border: `1px solid ${color}20` }}>
                <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-3" style={{ color }}>Shop Products</p>
                <div className="space-y-1.5">
                  {clusterData.products.slice(0, 3).map((p, i) => (
                    <Link key={i} to={p.path}
                      className="flex items-center justify-between py-2 px-2.5 transition-opacity hover:opacity-75"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.75)' }}>{p.name}</span>
                      <ArrowRight size={10} style={{ color }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}