import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { base44 } from '@/api/base44Client';
import { ALL_PRODUCTS } from '@/lib/mushroomProducts';

const RG = '#E6B7AD';
// Fallback image - Torch Republic branded placeholder
const FALLBACK_IMAGE = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333';

// Best sellers for homepage - matched by Shopify handle
const BEST_SELLERS = [
  { slug: 'glowmind-clarity-blend', label: 'GlowMind Clarity Blend', bestFor: 'Deep work & daily focus', accent: '#10B981' },
  { slug: 'mooncap-restore', label: 'MoonCap Restore', bestFor: 'Calm evenings & restoration', accent: '#8B9ED4' },
  { slug: 'torchbearer', label: 'Torchbearer', bestFor: 'Bold mornings & deep work', accent: '#D6B27A' },
  { slug: 'the-monk-matcha-blend', label: 'The Monk Matcha', bestFor: 'Focus, calm & presence', accent: '#6EE7B7' },
];

export default function StartHereSection() {
  const { addItem } = useCart();
  const [products, setProducts] = useState({});

  // Fetch Shopify products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await base44.functions.invoke('fetchShopifyProducts', {});
        if (response.data?.products) {
          const productMap = {};
          response.data.products.forEach(p => {
            // Use featuredImage URL or first image from gallery, fallback to branded placeholder
            const image = p.featuredImage || (p.images && p.images[0]) || FALLBACK_IMAGE;
            productMap[p.handle] = {
              image: image,
              price: p.price || 29.99,
              category: p.productType || 'mushroom-coffee',
            };
          });
          setProducts(productMap);
        }
      } catch (error) {
        console.error('Failed to fetch Shopify products:', error);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    const shopifyProduct = products[product.slug] || {};
    addItem({
      id: product.slug,
      name: product.label,
      price: shopifyProduct.price || 29.99,
      image: shopifyProduct.image || FALLBACK_IMAGE,
      category: shopifyProduct.category || product.category || 'mushroom-coffee',
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
                <div className="relative overflow-hidden flex items-center justify-center" style={{ aspectRatio: '1/1', background: '#141414' }}>
                  <img
                    src={products[product.slug]?.image || FALLBACK_IMAGE}
                    alt={product.label}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{ padding: '12px' }}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
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
                    ${products[product.slug]?.price?.toFixed(2) || '29.99'}
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