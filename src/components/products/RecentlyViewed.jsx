import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const STORAGE_KEY = 'tr_recently_viewed';
const MAX_ITEMS = 4;

/**
 * RecentlyViewed — tracks and displays recently viewed products.
 * Call addToRecentlyViewed(product) on product page mount.
 * Render <RecentlyViewed currentSlug={product.slug} /> on product pages.
 */
export function addToRecentlyViewed(product) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = stored.filter(p => p.slug !== product.slug);
    const updated = [
      { slug: product.slug, name: product.name, price: product.price, image: product.image, accent: product.accent, category: product.category },
      ...filtered,
    ].slice(0, MAX_ITEMS + 1); // keep one extra to filter current
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}
}

export default function RecentlyViewed({ currentSlug }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setItems(stored.filter(p => p.slug !== currentSlug).slice(0, MAX_ITEMS));
    } catch (_) {}
  }, [currentSlug]);

  if (items.length === 0) return null;

  const categoryLabel = (cat) => {
    if (cat === 'matcha') return 'Ceremonial Matcha';
    if (cat === 'classic-coffee') return 'Instant Coffee';
    return 'Mushroom Coffee';
  };

  return (
    <section className="py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
      <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>
        Recently Viewed
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/products/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#181818', border: '1px solid rgba(230,183,173,0.08)', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}
              >
                {item.image && (
                  <div style={{ aspectRatio: '1/1', background: '#111', overflow: 'hidden' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-3"
                      style={{ transition: 'transform 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="font-serif font-bold text-white text-xs mb-0.5 truncate">{item.name}</p>
                  <p className="font-mono text-[7px] tracking-[0.15em] uppercase mb-1" style={{ color: `${item.accent}70` }}>
                    {categoryLabel(item.category)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold" style={{ color: '#E6B7AD' }}>${item.price?.toFixed(2)}</span>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-mono text-[7px]" style={{ color: 'rgba(255,255,255,0.4)' }}>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}