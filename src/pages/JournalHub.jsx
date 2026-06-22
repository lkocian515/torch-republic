/**
 * Journal Hub — comprehensive topic cluster navigation
 * Shows all 100 blog topics organized by cluster with internal linking.
 */
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, BookOpen, Coffee, HelpCircle, Leaf, Search, X } from 'lucide-react';
import { ALL_BLOG_TOPICS, TOPIC_CLUSTERS, FAQ_PAGES, INGREDIENT_PAGES, COMPARISON_PAGES } from '@/lib/seoContent';
import GEOOptimization from '@/components/seo/GEOOptimization';

const RG = '#E6B7AD';
const CLUSTER_ORDER = ['mushroom-coffee', 'instant-coffee', 'matcha', 'recipes', 'wellness-rituals', 'focus-productivity', 'morning-routines', 'ingredients'];

// Maps recipe topic slugs (from seoContent.js) to recipe IDs on the /recipes page
const RECIPE_SLUG_TO_ID = {
  'classic-morning-recipe': 'classic-morning',
  'creamy-focus-latte-recipe': 'creamy-latte',
  'iced-energy-boost-recipe': 'iced-energy',
  'protein-power-blend-recipe': 'protein-power',
  'golden-mushroom-milk-recipe': 'golden-mushroom',
  'morning-smoothie-boost-recipe': 'smoothie-boost',
};

export default function JournalHub() {
  const [activeCluster, setActiveCluster] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'Coffee, Mushroom and Matcha Guides | Torch Republic Journal',
    description: 'Explore practical guides to instant coffee, mushroom coffee, Lion\'s Mane, Chaga, matcha, ingredients, and easy daily rituals.',
    url: '/journal',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
    ],
  });

  const clusters = CLUSTER_ORDER.map(key => ({
    key,
    ...TOPIC_CLUSTERS[key],
    topics: ALL_BLOG_TOPICS.filter(t => t.cluster === key),
    published: ALL_BLOG_TOPICS.filter(t => t.cluster === key && t.exists),
  }));

  const filteredTopics = useMemo(() => {
    let topics = activeCluster === 'all'
      ? ALL_BLOG_TOPICS.filter(t => t.exists)
      : ALL_BLOG_TOPICS.filter(t => t.cluster === activeCluster && t.exists);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      topics = topics.filter(t => t.title.toLowerCase().includes(q));
    }
    return topics;
  }, [activeCluster, searchQuery]);

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      <GEOOptimization page="journal" />

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
          <p className="font-heading max-w-xl mx-auto mb-6"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, fontWeight: 300 }}>
            Research-backed guides on mushroom coffee, ceremonial matcha, instant coffee, and intentional daily rituals. No guaranteed health claims — just honest education.
          </p>
          {/* Quick nav */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link to="/faq" className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2 transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}30`, color: RG }}>
              <HelpCircle size={11} /> FAQ Library
            </Link>
            <Link to="/ingredients" className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2 transition-all hover:opacity-80"
              style={{ border: `1px solid rgba(230,183,173,0.2)`, color: 'rgba(230,183,173,0.6)' }}>
              <Leaf size={11} /> Ingredient Guides
            </Link>
            <Link to="/recipes" className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2 transition-all hover:opacity-80"
              style={{ border: `1px solid rgba(230,183,173,0.2)`, color: 'rgba(230,183,173,0.6)' }}>
              <Coffee size={11} /> Coffee Recipes
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <div className="px-6 md:px-12 py-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(230,183,173,0.4)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title..."
            className="w-full pl-11 pr-10 py-3 font-heading text-sm outline-none transition-colors"
            style={{
              background: '#111',
              border: '1px solid rgba(230,183,173,0.15)',
              color: '#F5EFE6',
              borderRadius: '4px',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ color: 'rgba(230,183,173,0.5)', minWidth: '32px', minHeight: '32px', background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-center mt-3 font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
            {filteredTopics.length} article{filteredTopics.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Cluster Tabs */}
      <div className="px-6 md:px-12 py-4 sticky top-0 z-20" style={{ background: 'rgba(8,8,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2">
          <button onClick={() => setActiveCluster('all')}
            className="px-4 py-2 font-mono text-[7px] tracking-[0.25em] uppercase transition-all"
            style={{ background: activeCluster === 'all' ? `${RG}15` : 'transparent', border: `1px solid ${activeCluster === 'all' ? RG : `${RG}20`}`, color: activeCluster === 'all' ? RG : `${RG}40` }}>
            All
          </button>
          {clusters.map(c => (
            <button key={c.key} onClick={() => setActiveCluster(c.key)}
              className="px-4 py-2 font-mono text-[7px] tracking-[0.25em] uppercase transition-all"
              style={{ background: activeCluster === c.key ? `${c.color}15` : 'transparent', border: `1px solid ${activeCluster === c.key ? c.color : `${c.color}20`}`, color: activeCluster === c.key ? c.color : `${c.color}40` }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {searchQuery.trim() ? (
            // Show search results as flat grid
            <div>
              {filteredTopics.length === 0 ? (
                <div className="text-center py-12">
                  <p className="font-heading text-base mb-2" style={{ color: 'rgba(240,235,225,0.6)' }}>
                    No articles match "{searchQuery}"
                  </p>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
                    Try a different keyword
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTopics.map((article, i) => {
                    const cluster = TOPIC_CLUSTERS[article.cluster];
                    const isRecipe = article.cluster === 'recipes';
                    const recipeHref = isRecipe ? `/recipes#${RECIPE_SLUG_TO_ID[article.slug] || ''}` : `/journal/${article.slug}`;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                        <Link to={recipeHref}
                          className="p-4 block transition-all h-full"
                          style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster?.color || RG}35`}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                          <div className="flex items-center gap-2 mb-2">
                            {isRecipe ? <Coffee size={11} style={{ color: cluster?.color || RG }} /> : <BookOpen size={11} style={{ color: cluster?.color || RG }} />}
                            <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster?.color || RG }}>{isRecipe ? 'Recipe' : 'Article'}</p>
                          </div>
                          <p className="font-heading text-sm font-medium mb-3" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{article.title}</p>
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${cluster?.color || RG}70` }}>{isRecipe ? 'View' : 'Read'}</span>
                            <ArrowRight size={9} style={{ color: `${cluster?.color || RG}70` }} />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeCluster === 'all' ? (
            // Show clusters with articles
            <div className="space-y-16">
              {clusters.filter(c => c.published.length > 0).map((cluster, ci) => (
                <motion.div key={cluster.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: ci * 0.04 }}>
                  <div className="flex items-center justify-between gap-4 mb-6 pb-3" style={{ borderBottom: `1px solid ${cluster.color}20` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-7 rounded" style={{ background: cluster.color }} />
                      <div>
                        <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>{cluster.label}</h2>
                        <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>
                          {cluster.published.length} articles published · {cluster.topics.length - cluster.published.length} coming soon
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setActiveCluster(cluster.key)}
                      className="font-mono text-[7px] tracking-[0.25em] uppercase hidden sm:flex items-center gap-1 hover:opacity-75 transition-opacity"
                      style={{ color: cluster.color }}>
                      View all <ArrowRight size={9} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Published articles */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cluster.published.slice(0, 6).map((article, ai) => {
                        const isRecipe = cluster.key === 'recipes';
                        const recipeHref = isRecipe ? `/recipes#${RECIPE_SLUG_TO_ID[article.slug] || ''}` : `/journal/${article.slug}`;
                        return (
                          <Link key={ai} to={recipeHref}
                            className="p-4 block transition-all group"
                            style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster.color}35`}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                            <div className="flex items-center gap-2 mb-2">
                              {isRecipe ? <Coffee size={11} style={{ color: cluster.color }} /> : <BookOpen size={11} style={{ color: cluster.color }} />}
                              <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>{isRecipe ? 'Recipe' : 'Article'}</p>
                            </div>
                            <p className="font-heading text-sm font-medium mb-2" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{article.title}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${cluster.color}70` }}>{isRecipe ? 'View' : 'Read'}</span>
                              <ArrowRight size={9} style={{ color: `${cluster.color}70` }} />
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-3">
                      {/* Related Products */}
                      <div className="p-4" style={{ background: `${cluster.color}08`, border: `1px solid ${cluster.color}20` }}>
                        <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-3" style={{ color: cluster.color }}>Products</p>
                        <div className="space-y-1.5">
                          {cluster.products?.slice(0, 3).map((prod, pi) => (
                            <Link key={pi} to={prod.path}
                              className="flex items-center justify-between py-1.5 px-2 transition-opacity hover:opacity-75"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <span className="font-heading text-xs" style={{ color: '#F5EFE6', fontWeight: 400 }}>{prod.name}</span>
                              <ArrowRight size={10} style={{ color: cluster.color }} />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Related FAQs */}
                      <div className="p-4" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                        <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.4)' }}>Questions</p>
                        <div className="space-y-2">
                          {FAQ_PAGES.filter(f => f.cluster === cluster.key).slice(0, 3).map((faq, fi) => (
                            <Link key={fi} to={`/faq/${faq.slug}`}
                              className="flex items-start gap-2 hover:opacity-75 transition-opacity py-1">
                              <HelpCircle size={11} className="flex-shrink-0 mt-0.5" style={{ color: `${cluster.color}50` }} />
                              <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.3 }}>{faq.question}</p>
                            </Link>
                          ))}
                        </div>
                        <Link to="/faq" className="font-mono text-[7px] tracking-[0.2em] uppercase mt-2 block" style={{ color: 'rgba(230,183,173,0.35)' }}>
                          All FAQs →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Show filtered cluster
            <div>
              {(() => {
                const cluster = clusters.find(c => c.key === activeCluster);
                if (!cluster) return null;
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: `1px solid ${cluster.color}20` }}>
                      <div className="w-1 h-8 rounded" style={{ background: cluster.color }} />
                      <div>
                        <h2 className="font-serif font-bold text-2xl" style={{ color: '#F5EFE6' }}>{cluster.label}</h2>
                        <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>
                          {cluster.published.length} published · {cluster.topics.length - cluster.published.length} planned
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {cluster.published.map((article, i) => {
                        const isRecipe = cluster.key === 'recipes';
                        const recipeHref = isRecipe ? `/recipes#${RECIPE_SLUG_TO_ID[article.slug] || ''}` : `/journal/${article.slug}`;
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <Link to={recipeHref}
                              className="p-4 block transition-all h-full"
                              style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = `${cluster.color}35`}
                              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                              <div className="flex items-center gap-2 mb-2">
                                {isRecipe ? <Coffee size={11} style={{ color: cluster.color }} /> : <BookOpen size={11} style={{ color: cluster.color }} />}
                                <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: cluster.color }}>{isRecipe ? 'Recipe' : 'Article'}</p>
                              </div>
                              <p className="font-heading text-sm font-medium mb-3" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{article.title}</p>
                              <div className="flex items-center gap-1">
                                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${cluster.color}70` }}>{isRecipe ? 'View' : 'Read'}</span>
                                <ArrowRight size={9} style={{ color: `${cluster.color}70` }} />
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Coming soon */}
                    {cluster.topics.filter(t => !t.exists).length > 0 && (
                      <div className="mt-10">
                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.2)' }}>Coming Soon</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {cluster.topics.filter(t => !t.exists).map((t, i) => (
                            <div key={i} className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.06)' }}>
                              <p className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>{t.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Ingredient Guides Block */}
      <section className="px-6 md:px-12 py-12" style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Leaf size={18} style={{ color: RG }} />
              <h2 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>Ingredient Guides</h2>
            </div>
            <Link to="/ingredients" className="font-mono text-[7px] tracking-[0.25em] uppercase flex items-center gap-1 hover:opacity-75 transition-opacity" style={{ color: RG }}>
              All Ingredients <ArrowRight size={9} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {INGREDIENT_PAGES.map((ing, i) => (
              <Link key={i} to={`/ingredients/${ing.slug}`}
                className="p-4 text-center block transition-all"
                style={{ background: '#0F0E0D', border: `1px solid ${ing.color}20` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${ing.color}50`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${ing.color}20`}>
                <p className="font-serif font-bold text-sm mb-1" style={{ color: ing.color }}>{ing.name}</p>
                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>{ing.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Guides Block */}
      <section className="px-6 md:px-12 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-xl mb-6" style={{ color: '#F5EFE6' }}>Comparison Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {COMPARISON_PAGES.map((comp, i) => (
              <Link key={i} to={`/compare/${comp.slug}`}
                className="p-4 block transition-all"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}50` }}>vs. {comp.competitor}</p>
                <p className="font-heading text-sm font-medium mb-2" style={{ color: '#F5EFE6', lineHeight: 1.35 }}>{comp.title}</p>
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}60` }}>Read Guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center" style={{ background: '#070707', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>Find Your Blend</p>
        <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F5EFE6' }}>
          Ready to start your ritual?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/quiz" className="font-mono text-[11px] tracking-[0.3em] uppercase font-bold py-4 px-10 transition-opacity hover:opacity-80"
            style={{ background: RG, color: '#080808' }}>
            Take the Blend Quiz →
          </Link>
          <Link to="/shop" className="font-mono text-[11px] tracking-[0.3em] uppercase font-bold py-4 px-10 transition-opacity hover:opacity-80"
            style={{ border: `1px solid ${RG}40`, color: RG }}>
            Shop All Blends
          </Link>
        </div>
      </section>
    </div>
  );
}