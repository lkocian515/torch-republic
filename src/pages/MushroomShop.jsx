import React, { useState, useEffect } from 'react';
import { getShopifyBundleUrl, getAllClassicBundleUrl, getAllMatchaBundleUrl, getFullBundleUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import { MUSHROOM_PRODUCTS as MUSH_PROD, mergeWithShopifyData } from '@/lib/mushroomProducts';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import { useSEO } from '@/hooks/useSEO';
import MushroomProductCard from '../components/mushroom/ProductCard';
import { base44 } from '@/api/base44Client';
import BlendFilters from '../components/mushroom/BlendFilters';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({ email, source: 'shop_page' });
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Subscription failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '4px' }}>
        <p className="font-heading text-sm" style={{ color: '#10B981' }}>
          ✓ Welcome to the Republic. Check your inbox for your 10% off code.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 font-heading text-base bg-white border rounded-sm focus:outline-none"
        style={{ borderColor: '#E4D8C9', color: '#2D2824' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 rounded-sm disabled:opacity-50"
        style={{ background: '#B86543', color: '#FBF8F1' }}
      >
        {status === 'loading' ? 'Joining...' : 'Subscribe'}
      </button>
    </form>
  );
}

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
  const [allProducts, setAllProducts] = useState(ALL_PRODUCTS);
  const [loading, setLoading] = useState(true);

  // Fetch all products from Shopify on mount
  useEffect(() => {
    async function fetchShopifyData() {
      try {
        const { products } = await mergeWithShopifyData(ALL_PRODUCTS);
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to fetch Shopify data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchShopifyData();
  }, []);

  useSEO({
    title: 'Shop Instant Coffee, Mushroom Coffee & Matcha | Torch Republic',
    description: 'Explore light-roast instant coffee, functional mushroom blends, and ceremonial matcha created for simple, intentional daily rituals.',
    url: '/shop',
    type: 'website',
    noindex: false,
  });

  const baseProducts = tab === 'all' ? allProducts : tab === 'matcha' ? allProducts.filter(p => p.category === 'matcha') : tab === 'classic' ? allProducts.filter(p => p.category === 'classic-coffee') : allProducts.filter(p => p.category === 'mushroom-coffee');
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
    <div style={{ backgroundColor: '#FBF8F2', color: '#2D2824', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="mx-auto hidden max-w-3xl px-6 pb-8 pt-10 text-center md:block md:pb-10 md:pt-12">
          <p className="font-mono text-[9px] uppercase tracking-[0.45em]" style={{ color: '#B86543' }}>Torch Republic Coffee Company</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-6xl" style={{ color: '#293626' }}>Shop Coffee, Mushroom Blends &amp; Matcha</h1>
          <p className="mx-auto mt-5 max-w-2xl font-heading text-base leading-8" style={{ color: '#5F5145' }}>Explore premium instant coffee, functional mushroom coffee, ceremonial matcha, and ritual bundles made for simple daily preparation.</p>
        </div>
        {/* Desktop layout */}
        <div className="hidden md:block">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a7ef71722_ChatGPTImageAug4202607_00_32AM.png"
            alt="Torch Republic Products"
            className="w-full h-auto object-contain"
            style={{ aspectRatio: '16/9', maxHeight: '600px', background: '#FBF8F2', padding: '32px' }}
            onError={(e) => {
              e.target.src = '/torch-republic-logo-transparent.png';
            }}
          />
        </div>

        {/* Mobile layout */}
        <div className="md:hidden px-6 pt-20 pb-14 text-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a7ef71722_ChatGPTImageAug4202607_00_32AM.png"
            alt="Torch Republic Products"
            className="w-full h-auto object-contain rounded mb-8"
            style={{ maxHeight: '400px', background: '#FBF8F2', padding: '20px' }}
            onError={(e) => {
              e.target.src = '/torch-republic-logo-transparent.png';
            }}
          />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Torch Republic Coffee Company
            </p>
            <h1 className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#2D2824', letterSpacing: '-0.02em' }}>
              Shop Coffee, Mushroom Blends &amp; Matcha
            </h1>
            <p className="font-heading max-w-xl mx-auto mb-8"
              style={{ fontSize: '0.95rem', color: '#6D625A', lineHeight: 1.85, fontWeight: 300 }}>
              Premium instant blends crafted for focus, calm, energy, and everyday ritual. No machine needed.
            </p>

            {/* Trust bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 mb-6">
              {['No Coffee Maker Needed', 'Instant Powder', 'Functional Adaptogens', 'Subscribe & Save 20%'].map(t => (
                <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase"
                  style={{ color: '#6D625A' }}>✦ {t}</span>
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
                  color: '#2D2824',
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



      {/* ── CATEGORY FILTERS — Visible Links for Crawlers ── */}
      <section className="px-6 md:px-10 pt-6">
        <div className="sr-only">
          <nav aria-label="Product categories">
            <Link to="/shop/instant-mushroom-coffee">Instant Mushroom Coffee</Link>
            <Link to="/shop/instant-coffee">Classic Instant Coffee</Link>
            <Link to="/shop/matcha">Ceremonial Matcha</Link>
            <Link to="/build-your-ritual">Build Your Ritual Bundle</Link>
          </nav>
        </div>
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
                className="min-h-[44px] font-mono text-[9px] tracking-[0.3em] uppercase transition-all"
                style={{
                  padding: '10px 22px',
                  border: `1px solid ${tab === t.key ? t.color + '60' : '#E4D8C9'}`,
                  background: tab === t.key ? `${t.color}12` : '#FFFFFF',
                  color: tab === t.key ? t.color : '#6D625A',
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
            style={{ background: '#FFFFFF', border: '1px solid #E4D8C9' }}
          >
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-center mb-6" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Build Your Ritual Bundle
            </p>
            <p className="font-heading text-center max-w-xl mx-auto mb-6" style={{ fontSize: '1rem', color: '#6D625A', fontWeight: 400, lineHeight: 1.7 }}>
              Choose your blends. Create your daily ritual. Save when you bundle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Link to="/build-your-ritual"
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#F3ECE2', border: '1px solid #E4D8C9' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">FREE SHIP</p>
                </div>
                <p className="font-serif font-bold text-sm mb-1">Starter Ritual 3-Pack</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6D625A' }}>Choose Any 3 Blends</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$74.97</p>
              </Link>
              <a href={getShopifyBundleUrl(MUSH_PROD.map(p => ({ slug: p.shopifyHandle, qty: 1 }))) || SHOPIFY_CART_URL}
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#F3ECE2', border: '2px solid #C2A66E', display: 'block' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">BEST VALUE</p>
                </div>
                <p className="font-serif font-bold text-sm mb-1">Mushroom Ritual 3-Pack</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6D625A' }}>All 3 Mushroom Coffees</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$129.99</p>
              </a>
              <a href={getFullBundleUrl() || SHOPIFY_CART_URL}
                className="p-4 text-center transition-all hover:opacity-90 relative"
                style={{ background: '#F3ECE2', border: '1px solid #E4D8C9', display: 'block' }}>
                <div className="absolute top-2 right-2 px-2 py-0.5"
                  style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                  <p className="font-mono text-[5px] tracking-[0.25em] uppercase font-bold">FREE SHIP</p>
                </div>
                <p className="font-serif font-bold text-sm mb-1">Complete Collection</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-2" style={{ color: '#6D625A' }}>All 7 Products</p>
                <p className="font-serif font-bold" style={{ fontSize: '1.25rem', color: '#E6B7AD' }}>$159.93</p>
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a href={getAllClassicBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-xs mb-1">Classic Duo</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: '#6D625A' }}>2 Classic Coffees</p>
              </a>
              <a href={getShopifyBundleUrl(MUSH_PROD.map(p => ({ slug: p.shopifyHandle, qty: 1 }))) || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-xs mb-1">Mushroom Collection</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: '#6D625A' }}>3 Mushroom Coffees</p>
              </a>
              <a href={getAllMatchaBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-xs mb-1">Matcha Ritual</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: '#6D625A' }}>2 Matcha Blends</p>
              </a>
              <a href={getFullBundleUrl() || SHOPIFY_CART_URL}
                className="p-3 text-center transition-all hover:opacity-90"
                style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.15)', display: 'block' }}>
                <p className="font-serif font-bold text-xs mb-1">Complete Collection</p>
                <p className="font-mono text-[6px] tracking-[0.15em] uppercase" style={{ color: '#6D625A' }}>All 7 Products</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER SIGNUP ── */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#B86543' }}>
              Stay Connected
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', color: '#293626' }}>
              Get Updates, Special Offers & New Product Announcements
            </h2>
            <p className="font-heading mb-8" style={{ color: '#5F5145', fontWeight: 400, lineHeight: 1.8 }}>
              Join the Torch Republic community. Be the first to know about new blends, limited releases, and exclusive member offers.
            </p>
            <NewsletterSignup />
          </motion.div>
        </div>
      </section>

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: '#6D625A', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}