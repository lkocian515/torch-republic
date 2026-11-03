import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

const APPAREL_TABS = [
  { key: 'all', label: 'All' },
  { key: 't-shirts', label: 'T-Shirts' },
  { key: 'hoodies-sweatshirts', label: 'Hoodies' },
  { key: 'hats', label: 'Hats' },
];

const RECENT = [
  '✓ Sarah just purchased the Patriot Hoodie',
  '✓ Mike ordered the We The People T-Shirt',
  '✓ Jessica verified buyer — "Love the quality!"',
  '✓ David just claimed his best seller',
  '✓ Emma purchased the Classic Letterman Jacket',
  '✓ James verified — "Worth every penny"',
];

const HIDDEN_CATEGORIES = new Set(['jewelry', 'tea', 'candles', 'home-decor', 'bobbleheads', 'accessories']);

const PREMIUM_LAUNCH_HANDLES = new Set([
  'usa-flag-full-zip-hoodie',
  'patriotic-camouflage-cropped-hoodie',
  'unapologetic-patriot-hoodie',
  'classic-black-white-letterman-jacket',
  'patriot-crewneck-sweatshirt',
  '1776-party-sweatshirt',
]);

function StarRow({ rating = 4.8 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`} />
      ))}
    </div>
  );
}

function ProductCard({ product, index }) {
  const [imgError, setImgError] = useState(false);
  const handle = product.shopify_handle;
  const url = handle ? `https://torch-republic.com/products/${handle}` : 'https://torch-republic.com';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col"
    >
      <a href={url} onClick={e => { e.preventDefault(); window.location.href = url; }} className="block">
        {/* Image */}
        <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '4/5', background: 'linear-gradient(160deg, #1a0e00 0%, #0d1a20 50%, #000 100%)' }}>
          <img
            src={imgError ? 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=400&q=80' : product.image_url}
            onError={() => setImgError(true)}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.compare_at_price > product.price && (
            <div className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #09243A, #E6AC45)', color: '#fff' }}>
              SAVE {Math.round((1 - product.price / product.compare_at_price) * 100)}%
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-white font-heading font-bold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <StarRow rating={product.rating || 4.8} />
            <span className="font-mono text-[10px]" style={{ color: '#E6AC45' }}>{(product.rating || 4.8).toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm" style={{ color: '#E6AC45' }}>${product.price?.toFixed(2)}</span>
            {product.compare_at_price > product.price && (
              <span className="font-mono text-xs text-gray-600 line-through">${product.compare_at_price?.toFixed(2)}</span>
            )}
          </div>
          <div
            className="mt-1 py-2.5 text-center font-mono font-bold text-[11px] tracking-[0.2em] uppercase"
            style={{ background: 'linear-gradient(135deg, #09243A 0%, #09243A 50%, #E6AC45 100%)', color: '#fff' }}
          >
            View Product →
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function PremiumBestSellers() {
  const [recentIdx] = useState(() => Math.floor(Math.random() * RECENT.length));
  const [activeTab, setActiveTab] = useState('all');

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['premium-best-sellers'],
    queryFn: () => base44.entities.Product.list('best_seller_rank', 200),
  });

  // Get top 10 best sellers
  const bestSellers = allProducts
    .filter(p => p.image_url && !HIDDEN_CATEGORIES.has(p.category))
    .sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999))
    .slice(0, 10);

  // Get premium launch products
  const premiumLaunchProducts = allProducts.filter(p => 
    p.shopify_handle && PREMIUM_LAUNCH_HANDLES.has(p.shopify_handle) && p.image_url
  );

  // Mix premium products into best sellers at intervals
  const mergedProducts = [];
  const addedPremium = new Set();
  
  for (let i = 0; i < bestSellers.length; i++) {
    mergedProducts.push(bestSellers[i]);
    if (i % 2 === 1) {
      const nextPremium = premiumLaunchProducts.find(p => !addedPremium.has(p.id));
      if (nextPremium) {
        mergedProducts.push(nextPremium);
        addedPremium.add(nextPremium.id);
      }
    }
  }
  premiumLaunchProducts.forEach(p => {
    if (!addedPremium.has(p.id)) {
      mergedProducts.push(p);
      addedPremium.add(p.id);
    }
  });

  // Filter by tab
  const products = mergedProducts
    .filter(p => activeTab === 'all' || p.category === activeTab || PREMIUM_LAUNCH_HANDLES.has(p.shopify_handle))
    .slice(0, 8);

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#000' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #E6AC45)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#E6AC45' }}>Top Picks</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #E6AC45, transparent)' }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight text-white">
            Best Sellers
          </h2>
          <p className="text-gray-500 font-mono text-sm mt-2">Highest rated. Most loved. Patriot approved.</p>
        </div>

        {/* Social proof ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8 px-4 py-2 mx-auto max-w-md"
          style={{ background: 'rgba(14,42,47,0.4)', border: '1px solid rgba(212,175,90,0.15)' }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <p className="font-mono text-[11px] tracking-wider" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {RECENT[recentIdx]}
          </p>
        </motion.div>

        {/* Apparel Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {APPAREL_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-6 py-2 font-mono text-xs tracking-[0.25em] uppercase transition-all"
              style={activeTab === tab.key
                ? { background: 'linear-gradient(135deg, #09243A, #09243A, #E6AC45)', color: '#fff', border: '1px solid rgba(212,175,90,0.4)' }
                : { background: 'transparent', color: 'rgba(212,175,90,0.5)', border: '1px solid rgba(212,175,90,0.2)' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-900 mb-3" style={{ aspectRatio: '4/5' }} />
                <div className="h-3 bg-gray-900 mb-2 w-3/4" />
                <div className="h-3 bg-gray-900 w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center font-mono text-sm text-gray-600 py-12">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        {/* View All */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 font-mono font-bold text-sm tracking-[0.25em] uppercase transition-all hover:gap-3"
            style={{ border: '1px solid rgba(212,175,90,0.4)', color: '#E6AC45' }}
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}