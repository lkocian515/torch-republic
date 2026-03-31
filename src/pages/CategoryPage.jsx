import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const CATEGORY_META = {
  't-shirts':      { title: 'T-Shirts',        description: 'Bold statements. Premium fabric. Built for patriots.' },
  'hoodies':       { title: 'Hoodies',          description: 'Heavyweight comfort. Heavyweight conviction.' },
  'tanks':         { title: 'Tanks',            description: 'Freedom never looked this good.' },
  'hats':          { title: 'Hats & Headwear',  description: 'Wear your conviction on your head.' },
  'magnets':       { title: 'Car Magnets',       description: 'Take the message everywhere you go.' },
  'stickers':      { title: 'Stickers',          description: 'Small. Loud. Unashamed.' },
  'mugs-tumblers': { title: 'Mugs & Tumblers',  description: 'Start every morning with conviction.' },
  'candles':       { title: 'Candles',           description: 'Set the atmosphere. Light what matters.' },
  'flags':         { title: 'Flags',             description: 'Raise what you believe in.' },
  'bobbleheads':   { title: 'Bobbleheads',       description: 'Collectibles with character.' },
  'coffee':        { title: 'Coffee',            description: 'Fuel the fire. Fuel the mission.' },
  'tea':           { title: 'Tea',               description: 'Slow down. Stand firm.' },
  'jewelry':       { title: 'Jewelry',           description: 'Carry your faith close.' },
  'accessories':   { title: 'Accessories',       description: 'The details that define you.' },
  'home-decor':    { title: 'Home Decor',        description: 'Make your space speak your values.' },
};

const SIZES = ['XS','S','M','L','XL','2XL','3XL'];
const SORT_OPTIONS = [
  { value: 'best-sellers', label: 'Best Sellers' },
  { value: 'new',          label: 'New' },
  { value: 'price-low',    label: 'Price: Low → High' },
  { value: 'price-high',   label: 'Price: High → Low' },
];

function ProductCard({ product, index }) {
  const [hover, setHover] = useState(false);
  const img = product.image_url || 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
    >
      <Link
        to={`/ProductDetail?id=${product.id}`}
        className="group block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden mb-4"
          style={{
            aspectRatio: '4/5',
            boxShadow: hover ? '0 0 0 1px rgba(201,162,74,0.35), 0 8px 32px rgba(201,162,74,0.08)' : '0 0 0 1px transparent',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          <img
            src={img}
            alt={product.title}
            className="w-full h-full object-cover object-top transition-transform duration-[1.1s] ease-out group-hover:scale-105"
            style={{ filter: 'brightness(0.9)' }}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80'; }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 50%)' }} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.best_seller_rank && product.best_seller_rank <= 10 && (
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase px-2 py-0.5" style={{ backgroundColor: '#C9A24A', color: '#0B0B0B' }}>
                Best Seller
              </span>
            )}
            {product.compare_at_price > product.price && (
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 bg-black/70 text-white">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="font-heading font-medium text-sm text-white leading-snug mb-1.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {product.title}
          </p>
          {product.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                ))}
              </div>
              <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>({product.review_count || 0})</span>
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-semibold text-white">${product.price?.toFixed(2)}</span>
            {product.compare_at_price > product.price && (
              <span className="font-mono text-xs line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
                ${product.compare_at_price?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CategoryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 't-shirts';
  const meta = CATEGORY_META[category] || { title: 'Shop', description: 'Browse our collection.' };

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('best-sellers');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['category-products', category],
    queryFn: () => base44.entities.Product.filter({ category }, '', 200),
  });

  const toggleSize = (s) => setSelectedSizes(prev =>
    prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
  );

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const sizeMatch = selectedSizes.length === 0 || selectedSizes.some(s => p.sizes?.includes(s));
      const priceMatch =
        priceRange === 'all' ? true :
        priceRange === 'under25' ? p.price < 25 :
        priceRange === '25-50' ? p.price >= 25 && p.price <= 50 :
        p.price > 50;
      return sizeMatch && priceMatch;
    });

    list = [...list].sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'new') return new Date(b.created_date) - new Date(a.created_date);
      // best-sellers
      const ar = a.best_seller_rank || 9999;
      const br = b.best_seller_rank || 9999;
      return ar - br;
    });

    return list;
  }, [products, selectedSizes, priceRange, sortBy]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>

      {/* Hero Header */}
      <div className="relative overflow-hidden flex items-end" style={{ minHeight: '260px', paddingBottom: '48px' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0B0B 0%, #111 40%, #0f0a00 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(201,162,74,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: 'rgba(201,162,74,0.1)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
              <span className="font-mono text-[11px] tracking-[0.45em] uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>
                Torch Republic
              </span>
            </div>
            <h1 className="font-serif font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}>
              {meta.title}
            </h1>
            <p className="font-heading font-light text-base" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '500px' }}>
              {meta.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-40 border-b" style={{ backgroundColor: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(12px)', borderColor: 'rgba(201,162,74,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4 flex-wrap">
          {/* Filters left */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Size */}
            <div className="relative">
              <button
                onClick={() => { setSizeOpen(!sizeOpen); setSortOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                style={{
                  border: '1px solid rgba(201,162,74,0.2)',
                  color: selectedSizes.length > 0 ? '#C9A24A' : 'rgba(255,255,255,0.45)',
                  backgroundColor: selectedSizes.length > 0 ? 'rgba(201,162,74,0.05)' : 'transparent',
                }}
              >
                Size {selectedSizes.length > 0 && `(${selectedSizes.length})`}
                <ChevronDown className={`w-3 h-3 transition-transform ${sizeOpen ? 'rotate-180' : ''}`} />
              </button>
              {sizeOpen && (
                <div className="absolute top-full left-0 mt-1 p-3 z-50 flex flex-wrap gap-1.5" style={{ backgroundColor: '#111', border: '1px solid rgba(201,162,74,0.15)', minWidth: '180px' }}>
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className="px-3 py-1.5 font-mono text-xs transition-all duration-200"
                      style={{
                        border: '1px solid',
                        borderColor: selectedSizes.includes(s) ? '#C9A24A' : 'rgba(255,255,255,0.1)',
                        color: selectedSizes.includes(s) ? '#C9A24A' : 'rgba(255,255,255,0.45)',
                        backgroundColor: selectedSizes.includes(s) ? 'rgba(201,162,74,0.08)' : 'transparent',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              {[
                { value: 'all', label: 'All Prices' },
                { value: 'under25', label: 'Under $25' },
                { value: '25-50', label: '$25–$50' },
                { value: 'over50', label: '$50+' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setPriceRange(opt.value)}
                  className="px-3 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{
                    color: priceRange === opt.value ? '#C9A24A' : 'rgba(255,255,255,0.35)',
                    borderBottom: priceRange === opt.value ? '1px solid #C9A24A' : '1px solid transparent',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort right */}
          <div className="relative">
            <button
              onClick={() => { setSortOpen(!sortOpen); setSizeOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(201,162,74,0.15)' }}
            >
              {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
              <ChevronDown className={`w-3 h-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute top-full right-0 mt-1 z-50" style={{ backgroundColor: '#111', border: '1px solid rgba(201,162,74,0.15)', minWidth: '180px' }}>
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className="w-full text-left px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-white/5"
                    style={{ color: sortBy === opt.value ? '#C9A24A' : 'rgba(255,255,255,0.45)' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Count */}
        <p className="font-mono text-xs tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {isLoading ? '...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
        </p>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="w-full bg-card" style={{ aspectRatio: '4/5' }} />
                <Skeleton className="h-4 w-3/4 bg-card" />
                <Skeleton className="h-3 w-1/3 bg-card" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Brand Quote */}
      <div className="border-t" style={{ borderColor: 'rgba(201,162,74,0.08)', backgroundColor: '#080808' }}>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4))' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C9A24A' }} />
            <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.4), transparent)' }} />
          </div>
          <p className="font-serif font-bold text-white leading-tight mb-6" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
            "Gear that carries a conviction."
          </p>
          <p className="font-heading font-light text-sm" style={{ color: 'rgba(255,255,255,0.3)', lineHeight: '1.8' }}>
            Every piece in the Torch Republic catalog is designed with intention.<br />
            We don't do generic. We do bold, on purpose.
          </p>
        </div>
      </div>

    </div>
  );
}