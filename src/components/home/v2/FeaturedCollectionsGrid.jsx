import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

const AC = '#C9A24A';

// Collection definitions with Shopify handles and internal routing
const COLLECTIONS = [
  {
    id: 'founders',
    name: 'Founders Series',
    descriptor: 'Premium small-batch blends inspired by American patriots',
    link: '/CoffeeCollection',
    shopifyHandle: 'founders-series',
    color: '#C9A24A',
  },
  {
    id: 'liberty-icons',
    name: 'Liberty Icons',
    descriptor: 'Historical coffee celebrating American icons',
    link: '/LibertyIcons',
    shopifyHandle: 'liberty-icons',
    color: '#C9A24A',
  },
  {
    id: 'women',
    name: 'Women of the Republic',
    descriptor: 'Honoring the women who shaped America',
    link: '/WomenOfTheRepublic',
    shopifyHandle: 'women-of-the-republic',
    color: '#C9A24A',
  },
  {
    id: 'commanders',
    name: 'Commanders Series',
    descriptor: 'Bold blends honoring military leadership',
    link: '/CommandersSeries',
    shopifyHandle: 'commanders-series',
    color: '#C9A24A',
  },
  {
    id: 'pods',
    name: 'Coffee Pods',
    descriptor: 'Premium pods for easy brewing',
    link: '/CoffeeCollection',
    shopifyHandle: 'coffee-pods',
    color: '#C9A24A',
  },
  {
    id: 'mugs',
    name: 'Mugs & Tumblers',
    descriptor: 'Premium drinkware for your daily ritual',
    link: '/mugs-tumblers',
    shopifyHandle: 'mugs-and-tumblers',
    color: '#C9A24A',
  },
  {
    id: 'shirts',
    name: 'Shirts',
    descriptor: 'Historically themed apparel collection',
    link: '/Shop',
    shopifyHandle: 'apparel',
    color: '#C9A24A',
  },
];

async function fetchAllCollections() {
  try {
    const results = await Promise.all(
      COLLECTIONS.map(col =>
        base44.functions.invoke('fetchShopifyCollection', { handle: col.shopifyHandle })
          .then(res => {
            const allProducts = res.data?.products || [];
            
            // Extract first 4 products with valid featured images
            const previewProducts = [];
            for (const product of allProducts) {
              if (previewProducts.length >= 4) break;
              
              // Get featured image URL from product
              const imageUrl = product.image_url || product.featured_image?.src;
              if (imageUrl) {
                previewProducts.push({
                  title: product.title,
                  handle: product.shopify_handle,
                  imageUrl: imageUrl,
                  alt: product.title,
                });
              }
            }
            
            // Debug logging
            console.log(`[FeaturedCollectionsGrid] Fetched ${col.id} (${col.shopifyHandle}):`, {
              totalProducts: allProducts.length,
              previewCount: previewProducts.length,
              previewUrls: previewProducts.map(p => p.imageUrl),
              previewTitles: previewProducts.map(p => p.title),
            });
            
            return previewProducts;
          })
          .catch(err => {
            console.error(`[FeaturedCollectionsGrid] Error fetching ${col.shopifyHandle}:`, err);
            return [];
          })
      )
    );
    return results;
  } catch (error) {
    console.error('[FeaturedCollectionsGrid] Error fetching all collections:', error);
    return COLLECTIONS.map(() => []);
  }
}

function CollectionTile({ collection, products, isLoading, index }) {
  // Debug: log preview product data
  useEffect(() => {
    console.log(`[CollectionTile] ${collection.id} render:`, {
      productCount: products.length,
      hasImages: products.filter(p => p && p.imageUrl).length,
      products: products.map(p => ({ title: p.title, imageUrl: p.imageUrl })),
    });
  }, [products, collection.id]);
  
  // Extract image URLs from previewProducts array
  const previewImages = products
    .filter(p => p && p.imageUrl)
    .slice(0, 4)
    .map(p => ({ url: p.imageUrl, alt: p.alt || p.title }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative overflow-hidden cursor-pointer h-full"
      style={{
        background: '#0B0B0B',
        border: '1px solid rgba(201,162,74,0.15)',
        minHeight: '300px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)';
        e.currentTarget.style.boxShadow = '0 0 40px 4px rgba(201,162,74,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Link to={collection.link} className="block h-full" style={{ textDecoration: 'none' }}>
        {/* Product preview grid */}
        <div className="relative w-full h-64" style={{ background: '#0A0A0A', overflow: 'hidden' }}>
          {isLoading ? (
            <div className="w-full h-full animate-pulse" />
          ) : previewImages.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', padding: '2px', width: '100%', height: '100%' }}>
              {previewImages.map((item, i) => (
                <div key={i} style={{ position: 'relative', overflow: 'hidden', background: '#000', width: '100%', height: '100%' }}>
                  <img
                    src={item.url}
                    alt={item.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: 0.85,
                      display: 'block',
                    }}
                    loading={i > 0 ? 'lazy' : 'eager'}
                    onError={(e) => {
                      console.warn(`[CollectionTile] Image failed to load for ${collection.id}: ${item.url}`);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,162,74,0.08)', color: 'rgba(201,162,74,0.3)' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>No preview images</span>
            </div>
          )}

          {/* Overlay gradient - positioned absolutely over content */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)', pointerEvents: 'none', zIndex: 1 }} />
        </div>

        {/* Text content */}
        <div className="p-5 flex flex-col justify-between h-24">
          <div>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1.5" style={{ color: collection.color }}>
              {collection.name}
            </p>
            <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.5 }}>
              {collection.descriptor}
            </p>
          </div>

          {/* Hover reveal */}
          <motion.p
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ color: `${collection.color}80` }}
          >
            Explore Collection →
          </motion.p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedCollectionsGrid() {
  const { data: allCollectionProducts = [], isLoading } = useQuery({
    queryKey: ['all-featured-collections'],
    queryFn: fetchAllCollections,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });

  // Map products to collections
  const collectionData = COLLECTIONS.map((col, idx) => ({
    ...col,
    products: allCollectionProducts[idx] || [],
  }));

  return (
    <section className="px-6 md:px-12 py-20 md:py-28" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>
            Torch Republic Collections
          </p>
          <h2 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#F0EBE1', letterSpacing: '-0.02em' }}>
            Explore the Collections
          </h2>
          <p className="font-heading mx-auto" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6, maxWidth: '520px' }}>
            Built on history. Crafted for daily use.
          </p>
        </motion.div>

        {/* Collections Grid — responsive 2-3-4 layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isLoading ? (
            [...Array(7)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#0B0B0B', height: '320px' }} />
            ))
          ) : (
            collectionData.map((col, idx) => (
              <CollectionTile
                key={col.id}
                collection={col}
                products={col.products}
                isLoading={false}
                index={idx}
              />
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="font-heading mb-4" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)' }}>
            Discover your perfect blend and complete your Torch Republic collection
          </p>
          <Link
            to="/Shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90"
            style={{ color: AC, borderBottom: `1px solid ${AC}60`, paddingBottom: '4px' }}
          >
            Browse All Collections →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}