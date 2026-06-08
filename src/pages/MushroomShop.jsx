import React, { useState } from 'react';
import { getShopifyBundleUrl, getAllClassicBundleUrl, getAllMatchaBundleUrl, getFullBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import { MUSHROOM_PRODUCTS as MUSH_PROD } from '@/lib/mushroomProducts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import MushroomProductCard from '../components/mushroom/ProductCard';

import BlendFilters from '../components/mushroom/BlendFilters';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

const ALL_PRODUCTS = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];

const TABS = [
  { key: 'all',     label: 'All Products',     count: ALL_PRODUCTS.length,           color: RG },
  { key: 'mushroom', label: 'Mushroom Coffee',  count: MUSHROOM_PRODUCTS.length,      color: RG },
  { key: 'matcha',  label: 'Matcha',            count: MATCHA_PRODUCTS.length,        color: EMERALD },
  { key: 'classic', label: 'Classic Coffee',    count: CLASSIC_COFFEE_PRODUCTS.length, color: '#C98F86' },
];

export default function MushroomShop() {
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    return cat === 'matcha' ? 'matcha' : cat === 'mushroom' ? 'mushroom' : 'all';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [roastFilter, setRoastFilter] = useState('all');
  const [caffeineFilter, setCaffeineFilter] = useState('all');

  useSEO({
    title: 'Shop All Products | Torch Republic Coffee Company',
    description: "Shop premium instant coffee, mushroom coffee, and matcha from Torch Republic. Classic Arabica, functional blends with Lion's Mane + Chaga, and ceremonial grade matcha. No machine needed.",
    url: '/shop',
  });

  const baseProducts = tab === 'all' ? ALL_PRODUCTS : tab === 'matcha' ? MATCHA_PRODUCTS : tab === 'classic' ? CLASSIC_COFFEE_PRODUCTS : MUSHROOM_PRODUCTS;
  const activeTab = TABS.find(t => t.key === tab);
  
  const filteredProducts = baseProducts.filter(p => {
    // Search filter
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mood.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Roast filter
    let matchesRoast = true;
    if (roastFilter !== 'all') {
      if (roastFilter === 'light') matchesRoast = p.roastIntensity && p.roastIntensity <= 4;
      if (roastFilter === 'medium') matchesRoast = p.roastIntensity && p.roastIntensity >= 5 && p.roastIntensity <= 6;
      if (roastFilter === 'dark') matchesRoast = p.roastIntensity && p.roastIntensity >= 7;
    }
    
    // Caffeine filter
    let matchesCaffeine = true;
    if (caffeineFilter !== 'all') {
      matchesCaffeine = p.caffeineLevel === caffeineFilter;
    }
    
    return matchesSearch && matchesRoast && matchesCaffeine;
  });
  
  const products = filteredProducts;

  return (
    <div style={{ backgroundColor: '#111111', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        {/* Desktop layout */}
        <div className="hidden md:block">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c34315a9e_LIVEFREESTAYREADY5.png"
            alt="Torch Republic Products"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '16/9', maxHeight: '600px' }}
          />
        </div>

        {/* Mobile layout with text overlay */}
        <div className="md:hidden px-6 pt-20 pb-14 text-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c34315a9e_LIVEFREESTAYREADY5.png"
            alt="Torch Republic Products"
            className="w-full h-auto object-cover rounded mb-8"
            style={{ aspectRatio: '1/1', maxHeight: '350px' }}
          />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Torch Republic Coffee Company
            </p>
            <h1 className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Instant Coffee, Mushroom Coffee &amp; Matcha
            </h1>
            <p className="font-heading max-w-xl mx-auto mb-8"
              style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
              Premium instant blends crafted for focus, calm, energy, and everyday ritual. No machine needed.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mb-6">
              {['No Coffee Maker Needed', 'Instant Powder', 'Functional Adaptogens', 'Subscribe & Save 20%'].map(t => (
                <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase"
                  style={{ color: 'rgba(230,183,173,0.45)' }}>✦ {t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="px-6 md:px-10 pt-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(230,183,173,0.5)' }} />
              <input
                type="text"
                placeholder="Search blends, collections, or moods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 font-heading text-sm focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(230,183,173,0.2)',
                  borderRadius: '4px',
                  color: '#F0EBE1',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(230,183,173,0.5)' }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* ── TABS ── */}
      <section className="px-6 md:px-10 pt-6">
        <div className="max-w-[1280px] mx-auto">
          <BlendFilters 
            roastFilter={roastFilter}
            caffeineFilter={caffeineFilter}
            onFilterChange={(type, value) => {
              if (type === 'roast') setRoastFilter(value);
              if (type === 'caffeine') setCaffeineFilter(value);
            }}
          />
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all"
                style={{
                  padding: '10px 22px',
                  border: `1px solid ${tab === t.key ? t.color + '60' : 'rgba(255,255,255,0.1)'}`,
                  background: tab === t.key ? `${t.color}12` : 'transparent',
                  color: tab === t.key ? t.color : 'rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                }}
              >
                {t.label} ({t.count})
              </button>
            ))}
          </div>
        </div>
      </section>



      {/* ── PRODUCT GRID ── */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <MushroomProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Bundle Options */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8"
            style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.15)' }}
          >
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-center mb-6" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Build Your Ritual Bundle
            </p>
            <p className="font-heading text-center max-w-xl mx-auto mb-6" style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
              Choose your blends. Create your daily ritual. Save when you bundle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Link to="/build-your-ritual"
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.2)' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">FREE SHIP</p>
                </div>
                <p className="font-serif font-bold text-white text-sm mb-1">Starter Ritual 3-Pack</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Choose Any 3 Blends</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$74.97</p>
              </Link>
              <a href={getShopifyBundleUrl(MUSH_PROD.map(p => ({ slug: p.shopifyHandle, qty: 1 }))) || SHOPIFY_CART_URL}
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#141312', border: '2px solid rgba(230,183,173,0.4)', display: 'block' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">BEST VALUE</p>
                </div>
                <p className="font-serif font-bold text-white text-sm mb-1">Deep Ritual 6-Pack</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>All 6 Mushroom Blends</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$129.99</p>
              </a>
              <a href={getFullBundleUrl() || SHOPIFY_CART_URL}
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.2)', display: 'block' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">FREE SHIP</p>
                </div>
                <p className="font-serif font-bold text-white text-sm mb-1">Complete Collection</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>All 12 Products</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$239.94</p>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href={getAllClassicBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-white text-xs mb-1">Classic Trio</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>3 Classic Coffees</p>
              </a>
              <a href={getShopifyBundleUrl(MUSH_PROD.map(p => ({ slug: p.shopifyHandle, qty: 1 }))) || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-white text-xs mb-1">Mushroom Collection</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>6 Mushroom Blends</p>
              </a>
              <a href={getAllMatchaBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-white text-xs mb-1">Matcha Ritual</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>3 Matcha Blends</p>
              </a>
              <a href={getFullBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#141312', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-white text-xs mb-1">Complete Collection</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>All 12 Products</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}