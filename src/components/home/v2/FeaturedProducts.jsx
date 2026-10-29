import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

function ProductCard({ product, index }) {
  const [imgError, setImgError] = React.useState(false);
  const url = product.shopify_handle
    ? `https://torch-republic.com/products/${product.shopify_handle}`
    : 'https://torch-republic.com';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group"
    >
      <a href={url} onClick={e => { e.preventDefault(); window.location.href = url; }} className="block">
        {/* Image */}
        <div
          className="relative overflow-hidden mb-4"
          style={{ aspectRatio: '4/5', background: '#0A0A0A', border: '1px solid rgba(196,163,90,0.08)' }}
        >
          <img
            src={getProductImage(product)}
            onError={() => setImgError(true)}
            alt={getProductAltText(product)}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            style={{ opacity: imgError ? 0.6 : 0.95, background: '#F8F5EF', padding: '12px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {product.compare_at_price > product.price && (
            <div className="absolute top-3 left-3 px-2 py-0.5 font-mono text-[9px] font-bold" style={{ background: 'rgba(196,163,90,0.9)', color: '#000' }}>
              SAVE {Math.round((1 - product.price / product.compare_at_price) * 100)}%
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="font-heading font-bold text-sm text-white leading-tight mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm" style={{ color: '#C8A44D' }}>${product.price?.toFixed(2)}</span>
          {product.compare_at_price > product.price && (
            <span className="font-mono text-xs text-gray-600 line-through">${product.compare_at_price?.toFixed(2)}</span>
          )}
        </div>
      </a>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-featured'],
    queryFn: () => base44.entities.Product.filter({ collection: 'best-sellers' }, '', 50),
  });

  const products = allProducts
    .filter(p => p.image_url)
    .sort((a, b) => (a.best_seller_rank || 999) - (b.best_seller_rank || 999))
    .slice(0, 6);

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(196,163,90,0.07)' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.45)' }}>Top Picks</p>
            <h2 className="font-serif text-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700 }}>
              Best Sellers
            </h2>
          </div>
          <Link
            to="/BestSellers"
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: 'rgba(196,163,90,0.6)', borderBottom: '1px solid rgba(196,163,90,0.25)' }}
          >
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-900 mb-3" style={{ aspectRatio: '4/5' }} />
                <div className="h-3 bg-gray-900 mb-2 w-3/4" />
                <div className="h-3 bg-gray-900 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </section>
  );
}