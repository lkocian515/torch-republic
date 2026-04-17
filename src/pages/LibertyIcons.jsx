import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import ProductImage from '../components/products/ProductImage';
import TorchBoxCollectionBanner from '../components/collections/TorchBoxCollectionBanner';

const LIBERTY_ICONS = [
  {
    name: "Eagle's Flight Blend",
    handle: 'EaglesFlightBlend',
    price: 20,
    icon: '🦅',
    color: '#8B6D47',
    roast: 'Strong Dark Roast',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
    tagline: 'Soar higher with bold strength'
  },
  {
    name: 'Liberty Torch Blend',
    handle: 'LibertyTorchBlend',
    price: 20,
    icon: '🔥',
    color: '#C4A35A',
    roast: 'Bright Medium Roast',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
    tagline: 'Light the way with eternal freedom'
  },
  {
    name: 'Old Glory House Blend',
    handle: 'OldGloryHouseBlend',
    price: 18,
    icon: '🇺🇸',
    color: '#B38B4D',
    roast: 'Classic Medium Roast',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/32.png?v=1776038800',
    tagline: 'The blend that built America'
  },
  {
    name: "Rosie's Grind",
    handle: 'RosiesGrind',
    price: 20,
    icon: '💪',
    color: '#A8893A',
    roast: 'Bold Medium Dark Roast',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
    tagline: 'Channel American grit and resilience'
  },
  {
    name: "Uncle Sam's Bold Brew",
    handle: 'UncleSamsBoldBrew',
    price: 20,
    icon: '🎩',
    color: '#9B7B4D',
    roast: 'Extra Bold Dark Roast',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
    tagline: 'Uncle Sam wants YOU to wake up and taste freedom'
  }
];

const ProductCard = ({ product, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8 }}
    className="group"
  >
    <Link to={`/${product.handle}`} className="block">
      <div className="relative mb-5">
        <ProductImage
          src={product.image}
          alt={product.name}
          variant="clean"
          aspectRatio="4/5"
        />
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1">
          <span style={{ fontSize: '1.5rem' }}>{product.icon}</span>
          <span className="font-mono text-[7px] font-bold tracking-wider px-1.5 py-0.5"
            style={{ background: 'rgba(201,162,74,0.2)', color: 'rgba(201,162,74,0.9)', border: '1px solid rgba(201,162,74,0.3)' }}>
            In Torch Box
          </span>
        </div>
      </div>
      
      <h3 className="font-serif text-lg font-bold mb-1 group-hover:text-opacity-80 transition-colors" style={{ color: '#F0EBE1' }}>
        {product.name}
      </h3>
      
      <p className="font-heading text-xs mb-2" style={{ color: 'rgba(240,235,225,0.5)' }}>
        {product.roast}
      </p>
      
      <p className="font-heading text-xs leading-relaxed mb-4" style={{ color: 'rgba(240,235,225,0.6)' }}>
        {product.tagline}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="font-serif font-bold text-lg" style={{ color: product.color }}>
          ${product.price}
        </span>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(201,162,74,0.5)' }}>
          VIEW →
        </span>
      </div>
    </Link>
  </motion.div>
);

export default function LibertyIcons() {
  return (
    <div style={{ backgroundColor: '#000000', color: '#F0EBE1' }}>
      {/* ════ HERO ════ */}
      <section className="py-20 px-6 border-b" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <Flame className="w-8 h-8" style={{ color: '#C9A24A' }} />
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C9A24A' }}>
              Liberty Icons Series
            </h1>
            
            <p className="font-heading text-sm max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.6)' }}>
              Five roasts. Five symbols. Each blend honors a different facet of American freedom, resilience, and the people who embody them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ COLLECTION GRID ════ */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <TorchBoxCollectionBanner />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {LIBERTY_ICONS.map((product, i) => (
              <ProductCard key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════ COLLECTION INFO ════ */}
      <section className="py-16 px-6 border-t" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>
              ABOUT THIS SERIES
            </p>
            
            <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
              The Liberty Icons series represents core ideals: the vision of eagles, the eternal flame of freedom, the pride of heritage, the strength of those who serve, and the bold conviction that matters. Each blend is crafted to honor these principles and the people who carry them forward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              to="/CoffeeCollection"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                backgroundColor: '#C9A24A',
                color: '#000000',
                border: '1px solid #C9A24A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4C46A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C9A24A'}
            >
              View All Coffee
            </Link>
            <Link
              to="/Shop"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                backgroundColor: 'transparent',
                color: '#C9A24A',
                border: '1px solid #C9A24A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Shop Apparel
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}