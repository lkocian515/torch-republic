import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Coffee, BookOpen, HelpCircle, Leaf, GitCompare } from 'lucide-react';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';
import { ALL_BLOG_TOPICS, FAQ_PAGES, INGREDIENT_PAGES, COMPARISON_PAGES } from '@/lib/seoContent';

const RG = '#E6B7AD';

const CATEGORY_META = {
  product: { label: 'Products', icon: Coffee, color: RG },
  article: { label: 'Journal Articles', icon: BookOpen, color: '#7BA5D4' },
  faq: { label: 'FAQs', icon: HelpCircle, color: '#D4A576' },
  ingredient: { label: 'Ingredients', icon: Leaf, color: '#6CBD5A' },
  comparison: { label: 'Comparisons', icon: GitCompare, color: '#B88FA8' },
};

// Build the searchable index once (memoized at module level)
function buildSearchIndex() {
  const items = [];

  // Products
  ALL_PRODUCTS.forEach(p => {
    items.push({
      type: 'product',
      title: p.name,
      subtitle: p.tagline || p.bestFor || p.mood || '',
      description: p.description || '',
      keywords: [p.name, p.roast, p.category, ...(p.flavorNotes || []), p.mood, p.bestFor].join(' ').toLowerCase(),
      url: `/products/${p.slug}`,
      image: p.image,
    });
  });

  // Blog articles (only published ones)
  ALL_BLOG_TOPICS.filter(t => t.exists).forEach(t => {
    items.push({
      type: 'article',
      title: t.title,
      subtitle: 'Journal Article',
      keywords: t.title.toLowerCase(),
      url: `/journal/${t.slug}`,
    });
  });

  // FAQ pages
  FAQ_PAGES.forEach(f => {
    items.push({
      type: 'faq',
      title: f.question,
      subtitle: 'FAQ',
      keywords: (f.question + ' ' + (f.answer || '')).toLowerCase(),
      url: `/faq/${f.slug}`,
    });
  });

  // Ingredient pages
  INGREDIENT_PAGES.forEach(i => {
    items.push({
      type: 'ingredient',
      title: i.name,
      subtitle: i.category || 'Ingredient',
      keywords: (i.name + ' ' + (i.tagline || '') + ' ' + (i.description || '')).toLowerCase(),
      url: `/ingredients/${i.slug}`,
    });
  });

  // Comparison pages
  COMPARISON_PAGES.forEach(c => {
    items.push({
      type: 'comparison',
      title: c.title,
      subtitle: `vs ${c.competitor}`,
      keywords: c.title.toLowerCase(),
      url: `/compare/${c.slug}`,
    });
  });

  return items;
}

const SEARCH_INDEX = buildSearchIndex();

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [isOpen]);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX
      .filter(item => item.keywords.includes(q) || item.title.toLowerCase().includes(q))
      .slice(0, 20);
  }, [query]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups = {};
    results.forEach(r => {
      if (!groups[r.type]) groups[r.type] = [];
      groups[r.type].push(r);
    });
    return groups;
  }, [results]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex].url);
    }
  };

  const categoryOrder = ['product', 'article', 'faq', 'ingredient', 'comparison'];
  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60]"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <div
            className="w-full max-w-2xl mx-auto mt-[8vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ background: '#111', border: `1px solid ${RG}30`, borderRadius: '8px', overflow: 'hidden' }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: `1px solid ${RG}15` }}>
                <Search className="w-5 h-5 flex-shrink-0" style={{ color: RG }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, articles, FAQs..."
                  className="flex-1 bg-transparent outline-none font-heading text-base"
                  style={{ color: '#F5EFE6' }}
                />
                <button
                  onClick={onClose}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ color: 'rgba(240,235,225,0.5)', minWidth: '36px', minHeight: '36px' }}
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {!query.trim() ? (
                  <div className="px-4 py-12 text-center">
                    <Search className="w-8 h-8 mx-auto mb-3" style={{ color: 'rgba(230,183,173,0.2)' }} />
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.4)' }}>
                      Search for coffee blends, journal articles, ingredients, and more.
                    </p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-12 text-center">
                    <p className="font-heading text-sm mb-1" style={{ color: 'rgba(240,235,225,0.6)' }}>
                      No results for "{query}"
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.4)' }}>
                      Try a different keyword or browse the shop.
                    </p>
                  </div>
                ) : (
                  categoryOrder.map(type => {
                    const group = groupedResults[type];
                    if (!group) return null;
                    const meta = CATEGORY_META[type];
                    const Icon = meta.icon;
                    return (
                      <div key={type}>
                        <div className="px-4 pt-4 pb-2">
                          <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
                            {meta.label}
                          </p>
                        </div>
                        {group.map((item) => {
                          flatIndex++;
                          const idx = flatIndex;
                          const isActive = idx === activeIndex;
                          return (
                            <button
                              key={`${item.type}-${item.url}`}
                              onClick={() => handleSelect(item.url)}
                              onMouseEnter={() => setActiveIndex(idx)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                              style={{
                                background: isActive ? 'rgba(230,183,173,0.08)' : 'transparent',
                                borderLeft: isActive ? `2px solid ${RG}` : '2px solid transparent',
                              }}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: meta.color }} />
                              <div className="flex-1 min-w-0">
                                <p className="font-heading text-sm truncate" style={{ color: isActive ? '#F5EFE6' : 'rgba(240,235,225,0.8)' }}>
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p className="font-mono text-[9px] tracking-[0.1em] truncate" style={{ color: 'rgba(230,183,173,0.4)' }}>
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? RG : 'rgba(230,183,173,0.2)' }} />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              {results.length > 0 && (
                <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderTop: `1px solid ${RG}10`, background: '#0D0C0B' }}>
                  <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.3)' }}>
                    ↑↓ Navigate · ↵ Select · ESC Close
                  </p>
                  <p className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.3)' }}>
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}