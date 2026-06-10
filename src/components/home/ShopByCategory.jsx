import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    label: 'Classic Instant Coffee',
    route: '/classic-coffee',
    cta: 'Shop Instant Coffee',
    accent: '#C4A35A',
    body: 'Smooth, premium instant coffee for simple daily energy. No machines, no pods. Rich flavor in seconds.',
    detail: 'Medium & Dark Roasts · 27 Servings · No Mushrooms',
    productImage: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/db12468c8_jbbjkvbjkhbjk.png',
    shopifyHandle: 'classic-coffee',
  },
  {
    label: 'Mushroom Coffee',
    route: '/mushroom-coffee',
    cta: 'Shop Mushroom Coffee',
    accent: '#10B981',
    body: "Coffee-forward blends with functional mushrooms to support clarity, focus, and calm energy. Tastes like coffee, not mushrooms.",
    detail: "Lion's Mane + Chaga · Coffee-Forward · 27 Servings",
    productImage: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9a812eb06_bgyvyj.png',
    featured: true,
    shopifyHandle: 'mushroom-coffee',
  },
  {
    label: 'Ceremonial Matcha',
    route: '/matcha',
    cta: 'Shop Matcha',
    accent: '#6EE7B7',
    body: 'Ceremonial-style matcha for smooth focus, presence, and daily ritual. Calm energy, no jitters, no coffee.',
    detail: 'Ceremonial Grade · Instant Powder · 25 Servings · No Coffee',
    productImage: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/215a14bcb_bhjbkjjk.png',
    shopifyHandle: 'matcha',
  },
];

export default function ShopByCategory() {
  const [collectionImages, setCollectionImages] = useState({});

  // Fetch collection images from Shopify on mount
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await base44.functions.invoke('fetchShopifyProducts', {});
        if (response.data?.collections) {
          const images = {};
          response.data.collections.forEach(collection => {
            images[collection.handle] = collection.image;
          });
          setCollectionImages(images);
        }
      } catch (error) {
        console.error('Failed to fetch collection images:', error);
      }
    }
    fetchImages();
  }, []);

  return (
    <section className="px-6 md:px-10 py-16 md:py-24 relative" style={{ background: '#0A0807' }}>
      <div className="divider-gradient absolute top-0 left-0 right-0" />
      <div className="max-w-[1280px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Or Browse by Category
          </p>
          <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Three Rituals. One Brand.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const categoryImage = collectionImages[cat.shopifyHandle];
            return (
              <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col relative"
              style={{
                background: cat.featured ? 'rgba(16,185,129,0.04)' : '#141312',
                border: cat.featured ? `1px solid rgba(16,185,129,0.25)` : '1px solid rgba(230,183,173,0.1)',
              }}
            >
              {cat.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1" style={{ background: '#10B981', color: '#080808' }}>
                  <p className="font-mono text-[7px] tracking-[0.3em] uppercase font-bold">Most Popular</p>
                </div>
              )}
              <div className="p-8 flex-1 flex flex-col">
                {cat.productImage && (
                  <div className="mb-6 flex items-center justify-center" style={{ height: '200px' }}>
                    <img 
                      src={cat.productImage} 
                      alt={cat.label} 
                      className="max-h-full max-w-full object-contain" 
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                {categoryImage ? (
                  <div className="mb-5 flex items-center justify-center" style={{ height: '120px' }}>
                    <img src={categoryImage} alt={cat.label} className="max-h-full max-w-full object-contain" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                ) : null}
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.25rem', lineHeight: 1.2 }}>
                  {cat.label}
                </h3>
                <p className="font-heading text-base mb-4 flex-1" style={{ color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.8 }}>
                  {cat.body}
                </p>
                <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-6" style={{ color: `${cat.accent}FF` }}>
                  {cat.detail}
                </p>
                <Link
                  to={cat.route}
                  className="block text-center font-mono text-[12px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-80 py-3.5"
                  style={{
                    background: cat.featured ? '#10B981' : 'transparent',
                    color: cat.featured ? '#080808' : RG,
                    border: cat.featured ? 'none' : `1px solid rgba(230,183,173,0.3)`,
                  }}
                >
                  {cat.cta} →
                </Link>
              </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}