import React from 'react';
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
        // Fetch first 4 products from live Shopify collection in storefront order
        base44.functions.invoke('fetchShopifyCollection', { handle: col.shopifyHandle })
          .then(res => {
            const products = res.data?.products || [];
            return products.slice(0, 4);
          })
          .catch(() => [])
      )
    );
    return results;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return COLLECTIONS.map(() => []);
  }
}

function CollectionTile({ collection, products, isLoading, index }) {
  // Ensure we have valid product images
  const validImages = products
    .filter(p => p && p.image_url)
    .slice(0, 4)
    .map(p => p.image_url);

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
        <div className="relative overflow-hidden h-64 bg-gradient-to-b from-[#161616] to-[#0A0A0A]">
          {isLoading ? (
            <div className="w-full h-full animate-pulse" />
          ) : validImages.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 p-2 h-full">
              {validImages.map((img, i) => (
                <div key={i} className="relative overflow-hidden bg-black group/img">
                  <img
                    src={img}
                    alt={`${collection.name} product ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    loading={i > 0 ? 'lazy' : 'eager'}
                    style={{ opacity: 0.85 }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(201,162,74,0.08)', color: 'rgba(201,162,74,0.3)' }}>
              <span className="font-mono text-[10px]">Collection</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)' }} />
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
    staleTime: 15 * 60 * 1000,
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