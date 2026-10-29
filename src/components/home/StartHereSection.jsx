import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { HOMEPAGE_FEATURED_PRODUCTS, FALLBACK_PRODUCT_IMAGE } from '@/lib/homepageFeaturedProducts';
import { getPriceByCategory, getSubscriptionPriceByCategory } from '@/lib/pricingConfig';

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
      price: getPriceByCategory(product.category),
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
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
            Best Sellers
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            Our Most Loved Blends
          </h2>
          <p
            className="font-heading mx-auto mb-3"
            style={{ fontSize: '1rem', color: 'rgba(245,239,230,0.9)', fontWeight: 400, lineHeight: 1.8, maxWidth: '520px' }}
          >
            Trusted by high-performers for focus, clarity, and calm energy.
          </p>
          <div className="flex items-center justify-center gap-1.5">
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="14" height="14" viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            ))}
            <span className="font-mono text-[11px] tracking-[0.1em] ml-2" style={{ color: 'rgba(230,183,173,0.9)' }}>4.9 average · store-wide reviews</span>
          </div>
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
                    src={product.imageUrl || FALLBACK_PRODUCT_IMAGE}
                    alt={product.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    fetchPriority={i < 2 ? "high" : "low"}
                    decoding={i < 2 ? "sync" : "async"}
                    width="400"
                    height="400"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{ padding: '12px' }}
                    onError={(e) => { e.currentTarget.src = FALLBACK_PRODUCT_IMAGE; }}
                  />
                  {/* No per-product review badge — aggregate shown in section header */}
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
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: product.accent }}>
                  Best for: {product.bestFor}
                </p>

                {/* Price */}
                <div className="flex flex-col gap-0.5 pt-3" style={{ borderTop: `1px solid ${product.accent}20` }}>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold" style={{ color: RG, fontSize: '1.05rem' }}>${getPriceByCategory(product.category).toFixed(2)}</span>
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5" style={{ background: 'rgba(230,183,173,0.1)', color: RG }}>or ${getSubscriptionPriceByCategory(product.category).toFixed(2)} with Sub &amp; Save</span>
                  </div>
                  <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.65)' }}>Shipping calculated at checkout</p>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={e => handleAddToCart(product, e)}
                  className="w-full flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase font-bold transition-all hover:opacity-85 py-2.5"
                  style={{ background: RG, color: '#080808', borderRadius: '2px' }}
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add to Cart
                </button>

                {/* View Details */}
                <Link
                  to={`/products/${product.slug}`}
                  className="text-center font-mono text-[10px] tracking-[0.12em] uppercase"
                  style={{ color: product.accent, textDecoration: 'none' }}
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