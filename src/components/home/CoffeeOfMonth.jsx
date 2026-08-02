import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../../lib/mushroomProducts';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const ALL_PRODUCTS = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];

export default function CoffeeOfMonth({ topBlend, avgRating, reviewCount }) {
  const product = ALL_PRODUCTS.find(p => p.slug === topBlend);
  
  if (!product) return null;

  return (
    <section
      className="px-6 md:px-10 py-20"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(196,163,90,0.08) 0%, transparent 70%)',
        borderTop: '1px solid rgba(196,163,90,0.15)',
        borderBottom: '1px solid rgba(196,163,90,0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award size={24} style={{ color: GOLD }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: `${GOLD}90` }}>
              Coffee of the Month
            </p>
            <Award size={24} style={{ color: GOLD }} />
          </div>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}
          >
            {product.name}
          </h2>
          <p
            className="font-heading max-w-2xl mx-auto mb-6"
            style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, fontSize: '1.05rem' }}
          >
            {product.tagline}
          </p>
          
          {/* Rating Stats */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-current"
                    style={{ color: i < Math.round(avgRating) ? GOLD : 'rgba(255,255,255,0.15)' }}
                  />
                ))}
              </div>
              <span className="font-serif font-bold" style={{ color: GOLD, fontSize: '1.25rem' }}>
                {avgRating.toFixed(1)}
              </span>
            </div>
            <div className="w-px h-6" style={{ background: `${GOLD}30` }} />
            <div className="flex items-center gap-2">
              <TrendingUp size={16} style={{ color: `${GOLD}70` }} />
              <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${GOLD}70` }}>
                {reviewCount} verified reviews
              </span>
            </div>
          </div>
        </motion.div>

        {/* Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10"
        >
          {/* Image */}
          <div className="relative">
            <div
              className="rounded-sm overflow-hidden"
              style={{
                background: '#0F0E0E',
                border: `1px solid ${product.accent}30`,
              }}
            >
              <img
                src={getProductImage(product)}
                alt={getProductAltText(product)}
                className="w-full h-auto object-contain"
                style={{ minHeight: '400px', background: '#F8F5EF', padding: '16px' }}
              />
            </div>
            {/* Badge */}
            <div
              className="absolute top-4 left-4 px-4 py-2 rounded-sm font-mono text-[8px] tracking-[0.3em] uppercase font-bold"
              style={{
                background: `${GOLD}20`,
                border: `1px solid ${GOLD}40`,
                color: GOLD,
                backdropFilter: 'blur(8px)',
              }}
            >
              Top Rated This Month
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className="px-4 py-2 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                style={{
                  background: `${product.accent}20`,
                  border: `1px solid ${product.accent}40`,
                  color: product.accent,
                }}
              >
                {product.category === 'matcha' ? 'Ceremonial Matcha' : product.category === 'classic-coffee' ? 'Classic Coffee' : 'Mushroom Coffee'}
              </span>
            </div>

            {/* Description */}
            <p
              className="font-heading text-lg mb-6"
              style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.8 }}
            >
              {product.description}
            </p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h4 className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: `${RG}70` }}>
                Key Benefits
              </h4>
              <ul className="space-y-2">
                {product.keyBenefits.slice(0, 4).map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: product.accent }} />
                    <span className="font-heading" style={{ color: 'rgba(240,235,225,0.6)', fontSize: '0.95rem' }}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flavor Notes */}
            <div className="mb-8">
              <h4 className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: `${RG}70` }}>
                Flavor Profile
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-sm font-mono text-[7px] tracking-[0.2em] uppercase"
                    style={{
                      background: `${product.accent}15`,
                      border: `1px solid ${product.accent}30`,
                      color: product.accent,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-6 mb-6">
              <div>
                <p className="font-serif font-bold" style={{ fontSize: '2rem', color: product.accent }}>
                  ${product.price}
                </p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>
                  {product.servings} servings
                </p>
              </div>
              <Link
                to={`/products/${product.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 rounded-sm"
                style={{ background: RG, color: '#050505' }}
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>

            {/* Subscription Note */}
            <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
              ✦ Subscribe & Save 20% — Cancel anytime
            </p>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80 py-3 px-6 rounded-sm"
            style={{
              border: `1px solid ${RG}30`,
              color: `${RG}70`,
            }}
          >
            View All Blends
          </Link>
          <Link
            to="/build-your-ritual"
            className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80 py-3 px-6 rounded-sm"
            style={{
              border: `1px solid ${RG}30`,
              color: `${RG}70`,
            }}
          >
            Explore Bundles
          </Link>
          <Link
            to="/quiz"
            className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80 py-3 px-6 rounded-sm"
            style={{
              border: `1px solid ${RG}30`,
              color: `${RG}70`,
            }}
          >
            Find Your Blend
          </Link>
        </motion.div>
      </div>
    </section>
  );
}