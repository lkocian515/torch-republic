import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

// --- Curated handle lists per section (strongest/most distinct first) ---
const TOP_PICKS_HANDLES = [
  'continental-army-1776-born-free-patriotic-tee',
  'second-amendment-t-shirt-the-second-amendment-1791-rifle-graphic-tee',
  't-shirt-no-taxation-without-caffeination-vintage-coffee-liberty-tee',
  'live-free-stay-ready-hancock-with-american-flag-shirt', // Boston Tea Party
];

const FOUNDERS_HANDLES = [
  'george-washington-live-free-stay-ready-tee',
  'jefferson-founding-father-live-free-stay-ready-patriotic-vintage-t-shirt',
  'benjamin-franklin-tee-live-free-stay-ready-patriotic-graphic-shirt',
  'adams-founding-father-graphic-tee-live-free-stay-ready-patriotic-mens-t-shirt',
  'hamilton-founding-father-live-free-stay-ready-tee',
  'live-free-stay-ready-george-washington-tee',
];

const LIBERTY_HANDLES = [
  'live-free-stay-ready-george-washington-tee',
  'second-amendment-t-shirt-the-second-amendment-1791-rifle-graphic-tee',
];

const HEROES_HANDLES = [
  'continental-army-1776-born-free-patriotic-tee',
];

// Keyword-based fallback classifier
function classify(product, allHandles) {
  const title = product.title.toLowerCase();
  const handle = product.shopify_handle || '';

  if (TOP_PICKS_HANDLES.includes(handle)) return 'top';
  if (FOUNDERS_HANDLES.includes(handle)) return 'founders';

  if (
    title.includes('washington') || title.includes('jefferson') ||
    title.includes('franklin') || title.includes('adams') ||
    title.includes('hamilton') || title.includes('boston tea') ||
    title.includes('1776') || title.includes('colonial') ||
    title.includes('continental') || title.includes('hancock')
  ) return 'founders';

  if (
    title.includes('live free') || title.includes('gadsden') ||
    title.includes('liberty') || title.includes('caffeination') ||
    title.includes('2nd amendment') || title.includes('second amendment') ||
    title.includes('1791') || title.includes('stay ready')
  ) return 'liberty';

  if (
    title.includes('military') || title.includes('roosevelt') ||
    title.includes('hero') || title.includes('veteran') ||
    title.includes('soldier') || title.includes('america') ||
    title.includes('eagle') || title.includes('patriot')
  ) return 'heroes';

  return 'other';
}

function ShirtCard({ product, index, large = false }) {
  const shopifyUrl = `https://torch-republic.com/products/${product.shopify_handle}`;
  const cleanTitle = product.title
    .replace(/^T-Shirt\s*[—–-]\s*/i, '')
    .replace(/\s*[-–]\s*(Patriotic|Vintage|Graphic|Men's)\s*(T-Shirt|Tee|Shirt)?/gi, '')
    .trim();

  return (
    <motion.a
      href={shopifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group flex flex-col"
      style={{
        background: '#111111',
        border: '1px solid rgba(196,163,90,0.15)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(201,162,74,0.6)';
        e.currentTarget.style.boxShadow = '0 0 20px 2px rgba(201,162,74,0.12)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(196,163,90,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: large ? '4/5' : '3/4' }}>
        <img
          src={product.image_url}
          alt={cleanTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ opacity: 0.92, filter: 'brightness(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <h3 className="font-serif font-bold leading-snug" style={{ fontSize: large ? '0.95rem' : '0.85rem', color: '#FFFFFF', lineHeight: 1.35 }}>
          {cleanTitle}
        </h3>
        <span className="font-mono font-bold text-xs" style={{ color: '#C9A24A' }}>
          ${parseFloat(product.price).toFixed(2)}
        </span>
      </div>
    </motion.a>
  );
}

function ShirtSection({ label, eyebrow, products, cols = 4, large = false, shopLink }) {
  if (!products || products.length === 0) return null;
  const colClass = cols === 4
    ? 'grid-cols-2 sm:grid-cols-4'
    : cols === 3
    ? 'grid-cols-2 sm:grid-cols-3'
    : 'grid-cols-2';

  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-7 flex-wrap gap-3"
      >
        <div>
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(196,163,90,0.5)' }}>
            {eyebrow}
          </p>
          <h3 className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            {label}
          </h3>
        </div>
        {shopLink && (
          <a
            href={shopLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] tracking-[0.3em] uppercase flex items-center gap-1.5 transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: 'rgba(196,163,90,0.65)', borderBottom: '1px solid rgba(201,162,74,0.22)' }}
          >
            View All <ArrowRight className="w-3 h-3" />
          </a>
        )}
      </motion.div>

      <div className={`grid ${colClass} gap-3 md:gap-4`}>
        {products.map((p, i) => (
          <ShirtCard key={p.id} product={p} index={i} large={large} />
        ))}
      </div>
    </div>
  );
}

export default function ApparelSection() {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['home-shirts-curated'],
    queryFn: () => base44.entities.Product.filter({ category: 't-shirts' }, '', 50),
  });

  const shirts = allProducts.filter(p => p.image_url && p.in_stock !== false);

  // Build ordered maps
  const byHandle = Object.fromEntries(shirts.map(p => [p.shopify_handle, p]));

  // Section 1: Top Picks — curated handles first, then fallback to first available
  const topPicks = TOP_PICKS_HANDLES
    .map(h => byHandle[h])
    .filter(Boolean)
    .slice(0, 4);

  // Track used IDs to avoid duplication
  const usedIds = new Set(topPicks.map(p => p.id));

  // Section 2: Founders Series
  const foundersRaw = FOUNDERS_HANDLES.map(h => byHandle[h]).filter(Boolean);
  const foundersExtra = shirts.filter(p => !usedIds.has(p.id) && classify(p, []) === 'founders');
  const founders = [...foundersRaw, ...foundersExtra].filter(p => {
    if (usedIds.has(p.id)) return false;
    usedIds.add(p.id);
    return true;
  }).slice(0, 6);

  // Section 3: Liberty / Identity
  const liberty = shirts.filter(p => {
    if (usedIds.has(p.id)) return false;
    const c = classify(p, []);
    if (c === 'liberty') { usedIds.add(p.id); return true; }
    return false;
  }).slice(0, 4);

  // Section 4: American Heroes
  const heroes = shirts.filter(p => {
    if (usedIds.has(p.id)) return false;
    const c = classify(p, []);
    if (c === 'heroes') { usedIds.add(p.id); return true; }
    return false;
  }).slice(0, 4);

  // Overflow: anything not yet placed, show in top picks if top picks < 4
  const remaining = shirts.filter(p => !usedIds.has(p.id));

  const finalTopPicks = topPicks.length < 4
    ? [...topPicks, ...remaining.slice(0, 4 - topPicks.length)]
    : topPicks;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 px-6 md:px-12" style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(196,163,90,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: '#1A1A1A', aspectRatio: '3/4' }} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12"
      style={{ backgroundColor: '#0B0B0B', borderTop: '1px solid rgba(196,163,90,0.08)' }}
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12 md:mb-16 flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] tracking-[0.6em] uppercase mb-3" style={{ color: 'rgba(196,163,90,0.55)' }}>
              Graphic Tees
            </p>
            <h2 className="font-serif leading-none" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>
              Wear the Message.
            </h2>
          </div>
          <a
            href="https://torch-republic.com/collections/t-shirts"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] tracking-[0.3em] uppercase flex items-center gap-2 transition-opacity hover:opacity-55 pb-0.5"
            style={{ color: 'rgba(196,163,90,0.7)', borderBottom: '1px solid rgba(201,162,74,0.25)' }}
          >
            Shop All Shirts <ArrowRight className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Sub-sections */}
        <ShirtSection
          eyebrow="Editor's Picks"
          label="Top Picks"
          products={finalTopPicks}
          cols={4}
          large={true}
        />
        <ShirtSection
          eyebrow="Historical Designs"
          label="Founders Series"
          products={founders}
          cols={founders.length <= 4 ? founders.length : 4}
          shopLink="https://torch-republic.com/collections/t-shirts"
        />
        {liberty.length > 0 && (
          <ShirtSection
            eyebrow="Freedom & Identity"
            label="Live Free. Stay Ready."
            products={liberty}
            cols={liberty.length <= 3 ? liberty.length : 4}
          />
        )}
        {heroes.length > 0 && (
          <ShirtSection
            eyebrow="American Heroes"
            label="Built on Honor"
            products={heroes}
            cols={heroes.length <= 3 ? heroes.length : 4}
          />
        )}
      </div>
    </section>
  );
}