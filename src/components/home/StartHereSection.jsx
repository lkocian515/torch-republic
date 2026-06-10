import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { HOMEPAGE_FEATURED_PRODUCTS, FALLBACK_PRODUCT_IMAGE } from '@/lib/homepageFeaturedProducts';

const RG = '#E6B7AD';

export default function StartHereSection() {
  const { addItem } = useCart();

  // Use static featured products with verified image URLs for fast, reliable homepage loading
  const BEST_SELLERS = HOMEPAGE_FEATURED_PRODUCTS;

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.slug,
      name: product.label,
      price: 29.99,
      image: product.imageUrl || FALLBACK_PRODUCT_IMAGE,
      category: product.category || 'mushroom-coffee',
      shopifyHandle: product.slug,
    });
  };

  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#0A0807' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Start Here
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            Our Most Loved Rituals
          </h2>
          <p
            className="font-heading mx-auto"
            style={{ fontSize: '1.1rem', color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.85, maxWidth: '560px' }}
          >
            The blends our customers return to again and again.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BEST_SELLERS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="flex flex-col"
              style={{
                background: '#1A1A1A',
                border: `1px solid ${product.accent}30`,
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = product.accent;
                e.currentTarget.style.boxShadow = `0 8px 40px ${product.accent}30`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${product.accent}30`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Product Image */}
              <Link to={`/products/${product.slug}`} className="group block">
                <div className="relative overflow-hidden flex items-center justify-center product-image-wrap" style={{ aspectRatio: '1/1', background: '#141414' }}>
                  <img
                    src={(() => {
                      // Add cache-busting to force refresh of updated Shopify images with new logo
                      const imgUrl = product.imageUrl || FALLBACK_PRODUCT_IMAGE;
                      const separator = imgUrl.includes('?') ? '&' : '?';
                      return `${imgUrl}${separator}cb=${Date.now()}`;
                    })()}
                    alt={product.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchpriority={i < 2 ? "high" : undefined}
                    width="400"
                    height="400"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{ padding: '12px' }}
                    onError={(e) => {
                      console.warn(`⚠️ Image failed for ${product.label}:`, product.imageUrl);
                      e.currentTarget.src = FALLBACK_PRODUCT_IMAGE;
                    }}
                  />
                  {/* Review Stars */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded" style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-mono text-[8px] tracking-[0.15em] text-white">4.9</span>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="px-4 py-5 flex flex-col gap-3 flex-1">
                <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.05rem', lineHeight: 1.2 }}>
                    {product.label}
                  </h3>
                </Link>

                {/* Best For */}
                <p className="font-mono text-[7.5px] tracking-[0.2em] uppercase" style={{ color: `${product.accent}99` }}>
                  Best for: {product.bestFor}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${product.accent}20` }}>
                  <span className="font-mono font-bold" style={{ color: RG, fontSize: '1.05rem' }}>
                    $29.99
                  </span>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={e => handleAddToCart(product, e)}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[8.5px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-85 py-2.5"
                  style={{ background: RG, color: '#080808', borderRadius: '2px' }}
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </button>

                {/* View Details */}
                <Link
                  to={`/products/${product.slug}`}
                  className="text-center font-mono text-[7px] tracking-[0.2em] uppercase"
                  style={{ color: `${product.accent}70`, textDecoration: 'none' }}
                >
                  View Details →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}