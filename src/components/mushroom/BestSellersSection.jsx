import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';

const BEST_SELLERS = [
  {
    name: 'SunCap Rise',
    type: 'Mushroom Coffee · Light Roast',
    benefit: 'Morning energy + clarity',
    badge: 'Best Seller',
    badgeColor: RG,
    href: '/products/suncap-rise',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/666faf673_4.png',
    why: 'Best mainstream hook: morning energy + mushroom coffee',
  },
  {
    name: 'GlowMind Clarity',
    type: 'Mushroom Coffee · Medium Roast',
    benefit: 'Focus, flow, and mental clarity',
    badge: "Founder's Pick",
    badgeColor: GOLD,
    href: '/products/glowmind-clarity-blend',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ded856483_3.png',
    why: 'Strongest benefit name — "Clarity" is what shoppers want',
  },
  {
    name: 'Torchbearer',
    type: 'Classic Coffee · Medium Roast',
    benefit: 'Bold · Smooth · Intense',
    badge: 'Classic Favorite',
    badgeColor: '#D67A5A',
    href: '/products/torchbearer',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0960b7cd6_fsdfesfes.png',
    why: 'Best entry product for people curious about the brand',
  },
  {
    name: 'MoonCap Restore',
    type: 'Mushroom Coffee · Dark Roast',
    benefit: 'Grounding, restoration, and calm balance',
    badge: 'Calm Ritual',
    badgeColor: '#C98F86',
    href: '/products/mooncap-restore',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/375860656_2.png',
    why: 'Strong emotional appeal: calm, recovery, evening ritual',
  },
];

function BestSellerCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="flex flex-col overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.015)',
        border: `1px solid ${product.badgeColor}25`,
        borderRadius: '3px',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={getProductImage(product)}
          alt={getProductAltText(product)}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          style={{ opacity: 0.95, background: '#F8F5EF', padding: '12px' }}
        />
        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="font-mono text-[7px] tracking-[0.25em] uppercase px-2.5 py-1"
            style={{
              background: `${product.badgeColor}15`,
              color: product.badgeColor,
              border: `1px solid ${product.badgeColor}40`,
              borderRadius: '2px',
            }}
          >
            {product.badge}
          </span>
        </div>
        {/* Stars */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-current" style={{ color: GOLD }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1.5" style={{ color: `${product.badgeColor}70` }}>
            {product.type}
          </p>
          <h4 className="font-serif font-bold mb-2" style={{ fontSize: '1.2rem', color: '#F5EFE6', lineHeight: 1.2 }}>
            {product.name}
          </h4>
          <p className="font-heading text-xs mb-3" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
            {product.benefit}
          </p>
          <p className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
            {product.why}
          </p>
        </div>

        <Link
          to={product.href}
          className="inline-flex items-center gap-2 font-mono text-[8px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
          style={{ color: product.badgeColor, marginTop: 'auto' }}
        >
          Shop Now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function BestSellersSection() {
  return (
    <section
      id="best-sellers"
      style={{
        background: '#0C0C0C',
        padding: 'clamp(60px, 8vw, 100px) 24px',
        borderTop: '1px solid rgba(230,183,173,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Customer Favorites
          </p>
          <h2
            className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            Our Best-Selling Rituals
          </h2>
          <p className="font-heading text-sm max-w-2xl mx-auto" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Based on customer love, repeat purchases, and life-changing results. These are the blends that start mornings, fuel focus, and create moments of calm.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {BEST_SELLERS.map((product, i) => (
            <BestSellerCard key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* Starter Kit Bundle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
          style={{
            background: 'rgba(230,183,173,0.04)',
            border: '1px solid rgba(230,183,173,0.1)',
            borderRadius: '3px',
            padding: 'clamp(24px, 4vw, 32px)',
          }}
        >
          <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Can't Decide?
          </p>
          <h3
            className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#F5EFE6', lineHeight: 1.2 }}
          >
            Try The Starter Ritual Kit
          </h3>
          <p className="font-heading text-sm max-w-xl mx-auto mb-6" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300 }}>
            SunCap Rise + GlowMind Clarity + Torchbearer — everything you need to discover your perfect morning ritual.
          </p>
          <Link
            to="/build-your-ritual"
            className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.28em] text-xs font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#050505', padding: '14px 36px', borderRadius: '2px' }}
          >
            Shop the Bundle <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}