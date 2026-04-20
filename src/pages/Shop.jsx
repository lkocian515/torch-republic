import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProductGrid from '../components/products/ProductGrid';
import TorchBoxCollectionBanner from '../components/collections/TorchBoxCollectionBanner';

const AC = '#C9A24A';

// Real Shopify collection handles in priority order (coffee first, apparel second)
const COLLECTION_HANDLES = [
  'founders-series',
  'liberty-icons',
  'commanders-series',
  'apparel', // Apparel last — still visible but after coffee
];

// Collection display metadata (title, color, description)
const COLLECTION_META = {
  'founders-series': {
    title: 'Founders Series',
    description: 'Premium small-batch blends inspired by American founders.',
    color: '#C9A24A',
  },
  'liberty-icons': {
    title: 'Liberty Icons',
    description: 'Historical coffee and apparel celebrating American icons.',
    color: '#C9A24A',
  },
  'commanders-series': {
    title: 'Commanders Series',
    description: 'Bold blends honoring American military leadership.',
    color: '#C9A24A',
  },
  'apparel': {
    title: 'Apparel',
    description: 'Historical collections and branded merchandise.',
    color: '#C9A24A',
  },
};

// Fallback images for collections without Shopify images
const COLLECTION_FALLBACKS = {
  'founders-series': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/washington-blend-hero.jpg',
  'liberty-icons': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/liberty-icons-collection.jpg',
  'commanders-series': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/commanders-collection.jpg',
  'apparel': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/apparel-collection.jpg',
};

async function fetchCollectionWithImage(handle) {
  try {
    // Fetch products from collection
    const productsRes = await base44.functions.invoke('fetchShopifyCollection', { handle });
    const products = productsRes.data?.products || [];

    // First image choice: Shopify collection image (if we can fetch it)
    // This would require fetching collection metadata separately
    let collectionImage = COLLECTION_FALLBACKS[handle];

    // Second choice: first product image from collection
    if (products.length > 0 && products[0].image_url) {
      collectionImage = products[0].image_url;
    }

    return {
      handle,
      products,
      image: collectionImage,
    };
  } catch (error) {
    console.error(`Error fetching collection ${handle}:`, error);
    return {
      handle,
      products: [],
      image: COLLECTION_FALLBACKS[handle],
    };
  }
}

function CollectionCard({ collection, meta, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden w-full cursor-pointer text-left transition-all duration-300 hover:shadow-2xl"
      style={{
        background: '#0B0B0B',
        border: '1px solid rgba(201,162,74,0.2)',
        aspectRatio: '16/9',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${meta.color}80`;
        e.currentTarget.style.boxShadow = `0 0 40px ${meta.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.2)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Background image */}
      <img
        src={collection.image}
        alt={meta.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ opacity: 0.6 }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        <div />
        <div>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: meta.color }}>
            {collection.handle.toUpperCase()}
          </p>
          <h3 className="font-serif leading-tight mb-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#F0EBE1', fontWeight: 700 }}>
            {meta.title}
          </h3>
          <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.5 }}>
            {meta.description}
          </p>
          {collection.products.length > 0 && (
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-3" style={{ color: 'rgba(201,162,74,0.6)' }}>
              {collection.products.length} products →
            </p>
          )}
        </div>
      </div>
    </motion.button>
  );
}

export default function Shop() {
  const [selectedCollection, setSelectedCollection] = useState(null);

  // Fetch all collections in parallel
  const { data: collections = [], isLoading } = useQuery({
    queryKey: ['shop-collections'],
    queryFn: async () => {
      const results = await Promise.all(COLLECTION_HANDLES.map(fetchCollectionWithImage));
      return results;
    },
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });

  // Get the selected collection's products
  const selectedData = selectedCollection
    ? collections.find((c) => c.handle === selectedCollection)
    : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <div className="pt-16 pb-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: AC }}>
              Torch Republic Shop
            </p>
            <h1 className="font-serif leading-none mb-3" style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Collections
            </h1>
            <p className="font-heading text-[0.95rem]" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
              Premium coffee and apparel inspired by American historical figures and ideals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="px-6 pb-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse" style={{ background: '#0B0B0B', aspectRatio: '16/9' }} />
                ))
              : collections.map((collection) => {
                  const meta = COLLECTION_META[collection.handle] || { title: collection.handle, description: '' };
                  return (
                    <CollectionCard
                      key={collection.handle}
                      collection={collection}
                      meta={meta}
                      onClick={() => setSelectedCollection(collection.handle)}
                    />
                  );
                })}
          </div>
        </div>
      </div>

      {/* Selected Collection Products */}
      {selectedData && (
        <div className="px-6 pb-32">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-10">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <button
                  onClick={() => setSelectedCollection(null)}
                  className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4 transition-opacity hover:opacity-60"
                  style={{ color: AC }}
                >
                  ← Back to Collections
                </button>
                <h2
                  className="font-serif leading-none mb-2"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}
                >
                  {COLLECTION_META[selectedData.handle]?.title}
                </h2>
                <p style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {COLLECTION_META[selectedData.handle]?.description}
                </p>
              </motion.div>
            </div>

            <TorchBoxCollectionBanner />

            <ProductGrid products={selectedData.products} isLoading={false} columns={4} />
          </div>
        </div>
      )}

      {/* Torch Box CTA */}
      {!selectedCollection && (
        <div className="px-6 pb-20">
          <div className="max-w-[1280px] mx-auto">
            <TorchBoxCollectionBanner />
          </div>
        </div>
      )}
    </div>
  );
}