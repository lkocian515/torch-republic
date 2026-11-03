import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
 * category, accent) is rehydrated from the canonical product catalog on read,
 * so a cached stale image or retired name can never be restored.
 *
 * Styled on the storefront's warm cream palette so it reads as part of the
 * page rather than a dark panel.
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
    if (cat === 'classic-coffee') return 'Instant Coffee';
    if (cat === 'bundle') return 'Coffee Duo';
    return 'Mushroom Coffee';
  };

  return (
    <section className="py-12" style={{ borderTop: '1px solid #B89A6D' }}>
      <p className="font-mono text-[9px] uppercase tracking-[0.4em] mb-6" style={{ color: '#5E4639' }}>
        Recently Viewed
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item, i) => {
          const accent = item.ritual?.accent || '#9B4E2F';
          return (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={item.path || `/products/${item.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  style={{
                    background: '#FFFCF7',
                    border: '1px solid #B89A6D',
                    borderRadius: 10,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${accent}66`;
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(45,40,36,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#B89A6D';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {item.image && (
                    <div style={{ aspectRatio: '1/1', background: '#FFFCF7', overflow: 'hidden' }}>
                      <img
                        src={item.image}
                        alt={item.alt || item.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-3"
                        style={{ transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                      />
                    </div>
                  )}
                  <div className="p-3">
                    <p className="font-serif font-bold text-xs mb-0.5 truncate" style={{ color: '#32190F' }}>
                      {item.name}
                    </p>
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] mb-1" style={{ color: accent }}>
                      {categoryLabel(item.category)}
                    </p>
                    <span className="font-mono text-xs font-bold" style={{ color: item.ritual?.deep || '#32190F' }}>
                      ${item.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}