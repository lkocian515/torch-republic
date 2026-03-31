import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '../lib/CartContext';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, Minus, Plus, ShoppingCart, ExternalLink, ShieldCheck, Flag, Zap, ChevronDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductImageCarousel from '../components/products/ProductImageCarousel';
import ReviewsSection from '../components/reviews/ReviewsSection';

const TRUST = [
  { icon: ShieldCheck, label: 'Secure Checkout', sub: '256-bit SSL' },
  { icon: Flag,        label: 'American Made',   sub: 'USA operated' },
  { icon: Zap,         label: 'Fast Shipping',    sub: 'Free over $100' },
];

const EXPANDABLE = [
  { id: 'description', label: 'Description' },
  { id: 'materials',   label: 'Materials & Care' },
  { id: 'shipping',    label: 'Shipping & Returns' },
];

const EXPAND_CONTENT = {
  description: 'Premium quality construction built to last. Each piece is designed with intention — for those who stand for something.',
  materials:   'Heavyweight cotton blend. Machine wash cold, tumble dry low. Do not bleach. Designed for long-lasting wear.',
  shipping:    'Ships within 1–3 business days. Free shipping on orders over $100. 30-day satisfaction guarantee on all items.',
};

function ExpandSection({ product }) {
  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="border-t mt-8 pt-2" style={{ borderColor: 'rgba(201,162,74,0.1)' }}>
      {EXPANDABLE.map(({ id, label }) => (
        <div key={id} className="border-b" style={{ borderColor: 'rgba(201,162,74,0.08)' }}>
          <button
            onClick={() => toggle(id)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase transition-colors group-hover:text-primary" style={{ color: open === id ? '#C9A24A' : 'rgba(255,255,255,0.55)' }}>
              {label}
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-300"
              style={{ color: '#C9A24A', transform: open === id ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
          <AnimatePresence>
            {open === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-5 font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {id === 'description' && product?.description ? product.description : EXPAND_CONTENT[id]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function RelatedCard({ product }) {
  return (
    <Link to={`/ProductDetail?id=${product.id}`} className="group block">
      <div
        className="relative overflow-hidden mb-3"
        style={{ aspectRatio: '4/5' }}
      >
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80'}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-[1.1s] group-hover:scale-105"
          style={{ filter: 'brightness(0.85)' }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1px rgba(201,162,74,0.35)' }} />
      </div>
      <p className="font-heading text-sm text-white leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">{product.title}</p>
      <p className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>${product.price?.toFixed(2)}</p>
    </Link>
  );
}

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }),
    enabled: !!productId,
    select: (data) => data?.[0],
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related', product?.collection],
    queryFn: () => base44.entities.Product.filter({ collection: product.collection }, '-created_date', 5),
    enabled: !!product?.collection,
    select: (data) => data?.filter(p => p.id !== productId)?.slice(0, 4),
  });

  const { data: variantsData = [] } = useQuery({
    queryKey: ['variants', product?.shopify_handle],
    queryFn: async () => {
      if (!product?.shopify_handle) return [];
      const res = await base44.functions.invoke('shopifyStorefront', { action: 'getVariants', handle: product.shopify_handle });
      return res.data.variants || [];
    },
    enabled: !!product?.shopify_handle,
  });

  const availableSizes = useMemo(() => {
    if (!variantsData.length) return product?.sizes || [];
    const sizeSet = new Set();
    variantsData.forEach(v => v.selectedOptions?.forEach(opt => { if (opt.name === 'Size') sizeSet.add(opt.value); }));
    return sizeSet.size > 0 ? Array.from(sizeSet) : (product?.sizes || []);
  }, [variantsData, product?.sizes]);

  const selectedVariant = useMemo(() => {
    if (!variantsData.length) return null;
    if (!selectedSize) return variantsData.find(v => v.availableForSale) || variantsData[0];
    const matching = variantsData.filter(v => v.selectedOptions?.some(o => o.name === 'Size' && o.value === selectedSize));
    return matching.find(v => v.availableForSale) || matching[0] || null;
  }, [variantsData, selectedSize]);

  const { addToCart, cart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) { alert('Please select a size first'); return; }
    if (!selectedVariant.availableForSale) { alert('This size is currently sold out.'); return; }
    await addToCart(selectedVariant.id, quantity);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-12 px-6" style={{ backgroundColor: '#0B0B0B' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Skeleton className="bg-card" style={{ aspectRatio: '4/5' }} />
          <div className="space-y-5">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-8 bg-card" style={{ width: `${[75,30,100,60][i-1]}%` }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center" style={{ backgroundColor: '#0B0B0B' }}>
        <p className="font-mono text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Product not found.</p>
        <Link to="/BestSellers" className="text-primary font-mono text-xs mt-4 inline-block">← Back to Shop</Link>
      </div>
    );
  }

  const discount = product.compare_at_price > product.price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Breadcrumb */}
      <div className="pt-8 pb-6 px-6 border-b" style={{ borderColor: 'rgba(201,162,74,0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <Link to="/BestSellers" className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-colors hover:text-primary" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <ArrowLeft className="w-3 h-3" /> Shop
          </Link>
        </div>
      </div>

      {/* Main product layout */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Image */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <ProductImageCarousel product={product} />
          </motion.div>

          {/* RIGHT: Details */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            {/* Collection tag */}
            {product.collection && (
              <p className="font-mono text-[11px] tracking-[0.45em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.7)' }}>
                {product.collection.replace(/-/g, ' ')}
              </p>
            )}

            {/* Title */}
            <h1 className="font-serif font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                  ))}
                </div>
                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {product.rating?.toFixed(1)} · {product.review_count || 0} reviews
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
              <span className="font-mono font-bold text-white" style={{ fontSize: '2rem' }}>
                ${product.price?.toFixed(2)}
              </span>
              {discount > 0 && (
                <>
                  <span className="font-mono text-lg line-through" style={{ color: 'rgba(255,255,255,0.28)' }}>
                    ${product.compare_at_price?.toFixed(2)}
                  </span>
                  <span className="font-mono text-xs px-2 py-0.5" style={{ backgroundColor: 'rgba(201,162,74,0.15)', color: '#C9A24A' }}>
                    −{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            {product.description && (
              <p className="font-heading font-light text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: '420px' }}>
                {product.description.slice(0, 120)}{product.description.length > 120 ? '…' : ''}
              </p>
            )}

            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Size</span>
                  {!selectedSize && variantsData.length > 0 && (
                    <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>Select a size</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => {
                    const variant = variantsData.find(v => v.selectedOptions?.some(o => o.name === 'Size' && o.value === size));
                    const soldOut = variant && !variant.availableForSale;
                    return (
                      <button
                        key={size}
                        onClick={() => !soldOut && setSelectedSize(size)}
                        disabled={soldOut}
                        className="relative px-5 py-2.5 font-mono text-xs tracking-wider uppercase transition-all duration-200"
                        style={{
                          border: '1px solid',
                          borderColor: selectedSize === size ? '#C9A24A' : 'rgba(255,255,255,0.12)',
                          color: soldOut ? 'rgba(255,255,255,0.2)' : selectedSize === size ? '#C9A24A' : 'rgba(255,255,255,0.55)',
                          backgroundColor: selectedSize === size ? 'rgba(201,162,74,0.08)' : 'transparent',
                          cursor: soldOut ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {size}
                        {soldOut && <span className="absolute inset-0 flex items-center justify-center"><span className="w-full h-px rotate-45" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} /></span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase block mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Quantity</span>
              <div className="inline-flex items-center border" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 transition-colors hover:text-primary" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-5 font-mono text-sm text-white min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 transition-colors hover:text-primary" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock || !selectedVariant}
                className="w-full py-5 flex items-center justify-center gap-2.5 font-mono text-sm tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  backgroundColor: (!product.in_stock || !selectedVariant) ? 'rgba(201,162,74,0.2)' : '#C9A24A',
                  color: (!product.in_stock || !selectedVariant) ? 'rgba(201,162,74,0.4)' : '#0B0B0B',
                  fontWeight: 700,
                  cursor: (!product.in_stock || !selectedVariant) ? 'not-allowed' : 'pointer',
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                {!product.in_stock ? 'Sold Out' : 'Add to Cart'}
              </button>

              <a
                href={cart?.checkoutUrl || (product?.shopify_handle ? `https://www.torchrepublic.com/products/${product.shopify_handle}` : 'https://www.torchrepublic.com')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 flex items-center justify-center gap-2.5 font-mono text-sm tracking-[0.25em] uppercase transition-all duration-300"
                style={{
                  border: '1px solid rgba(201,162,74,0.3)',
                  color: product.in_stock ? 'rgba(201,162,74,0.85)' : 'rgba(255,255,255,0.2)',
                  pointerEvents: product.in_stock ? 'auto' : 'none',
                }}
              >
                <ExternalLink className="w-4 h-4" />
                {product.in_stock ? `Buy Now — $${(product.price * quantity).toFixed(2)}` : 'Sold Out'}
              </a>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 mb-8 py-6 border-t border-b" style={{ borderColor: 'rgba(201,162,74,0.08)' }}>
              {TRUST.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.6)' }} />
                  <span className="font-mono text-[10px] tracking-wider uppercase text-white leading-tight">{label}</span>
                  <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</span>
                </div>
              ))}
            </div>

            {/* Expandable sections */}
            <ExpandSection product={product} />
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="mt-24 max-w-4xl">
          <ReviewsSection productHandle={product?.collection} />
        </div>

        {/* You may also like */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
              <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(p => <RelatedCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}