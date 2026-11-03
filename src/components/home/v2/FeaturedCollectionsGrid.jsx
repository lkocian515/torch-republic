import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';

const AC = '#E6AC45';

const COLLECTIONS = [
  {
    id: 'founders',
    name: 'Founders Series',
    descriptor: 'Premium small-batch blends inspired by American patriots',
    link: '/CoffeeCollection',
    shopifyHandle: 'founders-series',
    color: '#E6AC45',
  },
  {
    id: 'liberty-icons',
    name: 'Liberty Icons',
    descriptor: 'Historical coffee celebrating American icons',
    link: '/LibertyIcons',
    shopifyHandle: 'liberty-icons',
    color: '#E6AC45',
  },
  {
    id: 'women',
    name: 'Women of the Republic',
    descriptor: 'Honoring the women who shaped America',
    link: '/WomenOfTheRepublic',
    shopifyHandle: 'women-of-the-republic',
    color: '#E6AC45',
  },
  {
    id: 'commanders',
    name: 'Commanders Series',
    descriptor: 'Bold blends honoring military leadership',
    link: '/CommandersSeries',
    shopifyHandle: 'commanders-series',
    color: '#E6AC45',
  },
  {
    id: 'pods',
    name: 'Coffee Pods',
    descriptor: 'Premium pods for easy brewing',
    link: '/CoffeeCollection',
    shopifyHandle: 'coffee-pods',
    color: '#E6AC45',
  },
  {
    id: 'mugs',
    name: 'Mugs & Tumblers',
    descriptor: 'Premium drinkware for your daily ritual',
    link: '/mugs-tumblers',
    shopifyHandle: 'mugs-and-tumblers',
    color: '#E6AC45',
  },
  {
    id: 'shirts',
    name: 'Apparel',
    descriptor: 'Historically themed apparel collection',
    link: '/Shop',
    shopifyHandle: 'apparel',
    color: '#E6AC45',
  },
];

// Simplified fetch: get raw products with image_url directly
async function fetchAllCollections() {
  try {
    const results = await Promise.all(
      COLLECTIONS.map(col =>
        base44.functions.invoke('fetchShopifyCollection', { handle: col.shopifyHandle })
          .then(res => {
            const allProducts = res.data?.products || [];
            console.log(`[FeaturedCollectionsGrid] ${col.id}: got ${allProducts.length} products`);
            if (allProducts.length > 0) {
              console.log(`[FeaturedCollectionsGrid] ${col.id} first product:`, {
                title: allProducts[0].title,
                image_url: allProducts[0].image_url,
              });
            }
            // Return first 4 products as-is; let the tile handle image extraction
            return allProducts.slice(0, 4);
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
  // Log the exact data received
  useEffect(() => {
    console.log(`[CollectionTile] ${collection.id}:`, {
      productCount: products.length,
      products: products.map(p => ({
        title: p.title,
        image_url: p.image_url,
      })),
    });
  }, [products, collection.id]);

  // Extract images: use product.image_url directly
  const images = products
    .filter(p => p && p.image_url)
    .slice(0, 4)
    .map(p => ({
      src: p.image_url,
      alt: p.title,
    }));

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
      <Link to={collection.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        {/* Image grid */}
        <div style={{ position: 'relative', width: '100%', height: '256px', background: '#0A0A0A', overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ width: '100%', height: '100%', background: '#161616', animation: 'pulse 2s infinite' }} />
          ) : images.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2px',
              padding: '2px',
              width: '100%',
              height: '100%',
            }}>
              {images.map((img, i) => (
                <div key={i} style={{ overflow: 'hidden', background: '#000' }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                      opacity: 0.85,
                    }}
                    loading={i > 0 ? 'lazy' : 'eager'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(201,162,74,0.08)',
              color: 'rgba(201,162,74,0.3)',
              fontSize: '12px',
            }}>
              No images
            </div>
          )}

          {/* Overlay gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }} />
        </div>

        {/* Text */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '96px' }}>
          <div>
            <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px', color: collection.color }}>
              {collection.name}
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(240,235,225,0.7)', lineHeight: '1.5' }}>
              {collection.descriptor}
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${collection.color}80` }}
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

  const collectionData = COLLECTIONS.map((col, idx) => ({
    ...col,
    products: allCollectionProducts[idx] || [],
  }));

  return (
    <section style={{ padding: '80px 24px', backgroundColor: '#000', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p style={{ fontSize: '9px', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(201,162,74,0.6)' }}>
            Torch Republic Collections
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#F7F2E9', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.1 }}>
            Explore the Collections
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            Built on history. Crafted for daily use.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '56px',
        }}>
          {isLoading ? (
            [...Array(7)].map((_, i) => (
              <div key={i} style={{ background: '#0B0B0B', height: '320px', animation: 'pulse 2s infinite' }} />
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
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', marginBottom: '16px' }}>
            Discover your perfect blend and complete your Torch Republic collection
          </p>
          <Link
            to="/Shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: AC,
              borderBottom: `1px solid ${AC}60`,
              paddingBottom: '4px',
              textDecoration: 'none',
            }}
          >
            Browse All Collections →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}