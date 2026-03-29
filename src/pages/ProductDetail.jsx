import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, ArrowLeft, Minus, Plus, ShoppingCart, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductGrid from '../components/products/ProductGrid';
import ProductImageCarousel from '../components/products/ProductImageCarousel';
import ReviewsSection from '../components/reviews/ReviewsSection';
import { useCart } from '@/lib/CartContext';

export default function ProductDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.filter({ id: productId }),
    enabled: !!productId,
    select: (data) => data?.[0],
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['related', product?.collection],
    queryFn: () => base44.entities.Product.filter(
      { collection: product.collection },
      '-created_date',
      5
    ),
    enabled: !!product?.collection,
    initialData: [],
    select: (data) => data?.filter(p => p.id !== productId)?.slice(0, 4),
  });

  const { data: variantsData } = useQuery({
    queryKey: ['variants', product?.shopify_handle],
    queryFn: () => base44.functions.invoke('shopifyStorefront', {
      action: 'getVariants',
      handle: product.shopify_handle,
    }).then(r => r.data.variants),
    enabled: !!product?.shopify_handle,
    initialData: [],
  });

  const selectedVariant = useMemo(() => {
    if (!variantsData || variantsData.length === 0) return null;
    if (!selectedSize) return variantsData.find(v => v.availableForSale) || variantsData[0];
    return variantsData.find(v =>
      v.selectedOptions.some(o => o.name === 'Size' && o.value === selectedSize)
    ) || variantsData[0];
  }, [variantsData, selectedSize]);

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    setAddingToCart(true);
    await addToCart(selectedVariant.id, quantity);
    setAddingToCart(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square bg-card" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 bg-card" />
            <Skeleton className="h-6 w-1/4 bg-card" />
            <Skeleton className="h-24 w-full bg-card" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 px-6 text-center">
        <p className="text-muted-foreground font-mono">Product not found.</p>
        <Link to={createPageUrl('BestSellers')} className="text-primary font-mono text-sm mt-4 inline-block">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-8 px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to={createPageUrl('BestSellers')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-mono text-xs tracking-wider transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Shop
          </Link>
        </div>
      </div>

      {/* Product */}
      <div className="pt-8 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Carousel */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <ProductImageCarousel product={product} />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            {product.collection && (
              <p className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-3">
                {product.collection.replace(/-/g, ' ')}
              </p>
            )}

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'fill-primary text-primary' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground font-mono text-xs">
                  {product.rating?.toFixed(1)} ({product.review_count || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-mono font-bold text-foreground">
                ${product.price?.toFixed(2)}
              </span>
              {product.compare_at_price > product.price && (
                <span className="text-lg font-mono text-muted-foreground line-through">
                  ${product.compare_at_price?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground mt-6 leading-relaxed text-sm">
                {product.description}
              </p>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-foreground font-mono text-xs tracking-wider uppercase">Size</p>
                  {!selectedSize && variantsData?.length > 0 && (
                    <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: '#C8A44D' }}>
                      ← Select a size to continue
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border font-mono text-xs tracking-wider uppercase transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-foreground font-mono text-xs tracking-wider uppercase mb-3">Quantity</p>
              <div className="flex items-center gap-1 border border-border w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart + Buy Now */}
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock || addingToCart || !selectedVariant}
                className={`w-full py-5 flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase transition-all border border-primary ${
                  !product.in_stock
                    ? 'bg-muted text-muted-foreground cursor-not-allowed border-muted'
                    : 'bg-transparent text-primary hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {addingToCart ? 'Adding...' : !product.in_stock ? 'Sold Out' : 'Add to Cart'}
              </button>

              <a
                href={product?.shopify_handle
                  ? `https://torchrepublic.com/products/${product.shopify_handle}`
                  : 'https://torchrepublic.com'}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-5 flex items-center justify-center gap-2 font-mono text-sm tracking-widest uppercase transition-all ${
                  !product.in_stock
                    ? 'bg-muted text-muted-foreground cursor-not-allowed pointer-events-none'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {!product.in_stock ? 'Sold Out' : (
                  <><ExternalLink className="w-4 h-4" /> Buy Now — ${(product.price * quantity).toFixed(2)}</>
                )}
              </a>
            </div>

            {/* Specs */}
            <div className="mt-8 border-t border-border pt-6 space-y-3">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground tracking-wider uppercase">Category</span>
                <span className="text-foreground">{product.category?.replace(/-/g, ' ') || '—'}</span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground tracking-wider uppercase">Availability</span>
                <span className={product.in_stock ? 'text-green-500' : 'text-destructive'}>
                  {product.in_stock ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              <div className="flex justify-between font-mono text-xs">
                <span className="text-muted-foreground tracking-wider uppercase">Shipping</span>
                <span className="text-foreground">Free over $100</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="max-w-7xl mx-auto px-0">
          <ReviewsSection productHandle={product?.collection} />
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto mt-24">
            <h2 className="text-2xl font-heading font-black uppercase tracking-tight mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </div>
  );
}