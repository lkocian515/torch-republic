import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

const AC = '#C9A24A';

// Collection definitions with internal routing paths
const COLLECTIONS = [
  {
    id: 'founders',
    name: 'Founders Series',
    descriptor: 'Premium small-batch blends inspired by American patriots',
    link: '/CoffeeCollection',
    filter: 'founders-series',
    color: '#C9A24A',
  },
  {
    id: 'liberty-icons',
    name: 'Liberty Icons',
    descriptor: 'Historical coffee celebrating American icons',
    link: '/LibertyIcons',
    filter: 'liberty-icons',
    color: '#C9A24A',
  },
  {
    id: 'women',
    name: 'Women of the Republic',
    descriptor: 'Honoring the women who shaped America',
    link: '/WomenOfTheRepublic',
    filter: 'women-of-the-republic',
    color: '#C9A24A',
  },
  {
    id: 'commanders',
    name: 'Commanders Series',
    descriptor: 'Bold blends honoring military leadership',
    link: '/CommandersSeries',
    filter: 'commanders-series',
    color: '#C9A24A',
  },
  {
    id: 'pods',
    name: 'Coffee Pods',
    descriptor: 'Premium pods for easy brewing',
    link: '/CoffeeCollection',
    filter: 'pods',
    color: '#C9A24A',
  },
  {
    id: 'mugs',
    name: 'Mugs & Tumblers',
    descriptor: 'Premium drinkware for your daily ritual',
    link: '/mugs-tumblers',
    filter: 'mugs-tumblers',
    color: '#C9A24A',
  },
  {
    id: 'shirts',
    name: 'Shirts',
    descriptor: 'Historically themed apparel collection',
    link: '/Shop',
    filter: 'apparel',
    color: '#C9A24A',
  },
];

async function fetchCollectionProducts(filter) {
  try {
    const res = await base44.entities.Product.filter({ collection: filter }, '', 6);
    return res || [];
  } catch (error) {
    console.error(`Error fetching ${filter} products:`, error);
    return [];
  }
}

function CollectionTile({ collection, products, isLoading, index }) {
  const images = products.slice(0, 4).map(p => p.image_url).filter(Boolean);

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
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 gap-0.5 p-2 h-full">
              {images.map((img, i) => (
                <div key={i} className="relative overflow-hidden bg-black group/img">
                  <img
                    src={img}
                    alt={`${collection.name} product ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                    style={{ opacity: 0.85 }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.1)' }}>
              No products
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
  // Fetch products for all collections in parallel
  const queries = COLLECTIONS.map(col => ({
    ...useQuery({
      queryKey: [`collection-${col.id}`, col.filter],
      queryFn: () => fetchCollectionProducts(col.filter),
      staleTime: 15 * 60 * 1000,
    }),
    id: col.id,
  }));

  // Extract data from all queries
  const collectionData = COLLECTIONS.map((col, idx) => ({
    ...col,
    products: queries[idx]?.data || [],
    isLoading: queries[idx]?.isLoading || false,
  }));

  const isLoading = queries.some(q => q.isLoading);

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#0B0B0B', height: '320px' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {collectionData.map((col, idx) => (
              <CollectionTile
                key={col.id}
                collection={col}
                products={col.products}
                isLoading={col.isLoading}
                index={idx}
              />
            ))}
          </div>
        )}

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