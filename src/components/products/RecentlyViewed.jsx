import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getProductBySlug } from '@/lib/coreProducts';

// Versioned storage key — previous caches (which held stale tube imagery and
// retired product objects) are intentionally abandoned so they can never
// re-render. Old keys are cleared on first read of the new version.
const LEGACY_STORAGE_KEYS = ['tr_recently_viewed'];
const STORAGE_KEY = 'tr_recently_viewed_v3';
const MAX_ITEMS = 4;

/**
 * RecentlyViewed — tracks and displays recently viewed products.
 * Call addToRecentlyViewed(product) on product page mount.
 * Render <RecentlyViewed currentSlug={product.slug} /> on product pages.
 *
 * Only the product slug is persisted. Everything shown (name, price, image,
 * category, accent) is rehydrated from the canonical three-product catalog on
 * read, so a cached stale image or retired name can never be restored.
 */
export function addToRecentlyViewed(product) {
  try {
    purgeLegacyKeys();
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = stored.filter((p) => p.slug !== product.slug);
    const updated = [{ slug: product.slug }, ...filtered].slice(0, MAX_ITEMS + 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (_) {}
}

function purgeLegacyKeys() {
  try {
    LEGACY_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k));
  } catch (_) {}
}

export default function RecentlyViewed({ currentSlug }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      purgeLegacyKeys();
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      // Rehydrate from the canonical catalog; discard any entry whose slug is
      // no longer an active product. This prevents retired/tube products from
      // ever reappearing, regardless of what was cached.
      const active = stored
        .map((p) => getProductBySlug(p.slug))
        .filter(Boolean)
        .filter((p) => p.slug !== currentSlug)
        .slice(0, MAX_ITEMS);
      setItems(active);
    } catch (_) {
      setItems([]);
    }
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
                    <img src={item.image} alt={item.alt || item.name} className="w-full h-full object-contain p-3"
                      style={{ transition: 'transform 0.3s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="font-serif font-bold text-white text-xs mb-0.5 truncate">{item.name}</p>
                  <p className="font-mono text-[7px] tracking-[0.15em] uppercase mb-1" style={{ color: `${item.ritual?.accent}70` || 'rgba(230,183,173,0.5)' }}>
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