import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Check, ShoppingBag, Truck, ShieldCheck, RotateCcw, ChevronRight } from 'lucide-react';
import ShareButtons from '../components/social/ShareButtons';
import { useCart } from '@/contexts/CartContext';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import MushroomProductCard from '../components/mushroom/ProductCard';
import RecentlyViewed, { addToRecentlyViewed } from '../components/products/RecentlyViewed';
import GoneRedirect from '@/components/seo/GoneRedirect';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import { trackViewItem, trackAddToCart } from '@/lib/analyticsEvents';
import { getProductImage, withApprovedProductImage } from '@/lib/productImageHelpers';

const THEME = {
  page: '#F7F1E7',
  cream: '#FBF8F1',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  clay: '#B7653E',
  moss: '#566047',
};

const DEPRECATED_PRODUCT_REDIRECTS = {
  'ember-rise': '/products/ember-reserve',
  'ember-rise-instant-coffee': '/products/ember-reserve',
  'torchbearer-instant-coffee': '/products/torchbearer',
  'torchbearer™-single-origin-instant-coffee': '/products/torchbearer',
  'torchbearer-single-origin-instant-coffee': '/products/torchbearer',
  'the-alchemist-matcha': '/products/the-alchemist-matcha-blend',
  'the-monk-matcha': '/products/the-monk-matcha-blend',
  'midnight-watch': '/shop/instant-coffee',
  'dreamcap-blend': '/shop/instant-mushroom-coffee',
  'the-oracle': '/shop/instant-mushroom-coffee',
  'mystic-bloom': '/shop/instant-mushroom-coffee',
  'the-ascendant-matcha-blend': '/shop/matcha',
};

const DISCONTINUED_PRODUCT_PATTERN = /(american|patriot|shirt|long-sleeve|tee|hoodie|apparel|liberty|freedom)/i;

const TRUST = [
  { icon: Truck, label: 'Free shipping $50+' },
  { icon: RotateCcw, label: '30-day satisfaction guarantee' },
  { icon: ShieldCheck, label: 'Secure checkout' },
];

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: `1px solid ${THEME.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
      >
        <span className="font-serif font-bold" style={{ fontSize: '1rem', color: THEME.text }}>{title}</span>
        <span className="font-mono text-xl" style={{ color: THEME.clay, minWidth: 20, textAlign: 'center' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-6">
          <div className="font-heading text-sm" style={{ color: THEME.secondary, lineHeight: 1.8 }}>
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Gallery({ product, alt }) {
  const images = (product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [getProductImage(product)]);
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  return (
    <div>
      {/* Main image — fixed aspect ratio prevents layout shift */}
      <div
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ aspectRatio: '1 / 1', background: THEME.cream, border: `1px solid ${THEME.border}`, borderRadius: 12 }}
      >
        <img
          src={images[active]}
          alt={hasMultiple ? `${alt} — view ${active + 1}` : alt}
          width={800}
          height={800}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="w-full h-full"
          style={{ objectFit: 'contain', padding: 20, WebkitUserDrag: 'none', userSelect: 'none' }}
          onError={(e) => { e.currentTarget.src = '/torch-republic-logo-transparent.png'; }}
        />
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="overflow-hidden flex items-center justify-center"
              style={{
                aspectRatio: '1 / 1', background: THEME.cream,
                border: `1px solid ${i === active ? THEME.clay : THEME.border}`,
                borderRadius: 8, cursor: 'pointer',
              }}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt="" loading="lazy" draggable={false}
                className="w-full h-full" style={{ objectFit: 'contain', padding: 6 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, children }) {
  return (
    <div className="card-torch p-5">
      <p className="eyebrow mb-2" style={{ color: THEME.clay }}>{label}</p>
      <div className="font-heading text-sm" style={{ color: THEME.secondary, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function BlendDetailInner({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [cartError, setCartError] = useState(null);

  const subscriptionPrice = product.price * 0.9;
  const unitPrice = isSubscription ? subscriptionPrice : product.price;
  const servings = product.servings || (product.category === 'matcha' ? 25 : 27);

  const categoryLabel = product.category === 'matcha'
    ? 'Ceremonial Matcha'
    : product.category === 'classic-coffee'
    ? 'Premium Instant Coffee'
    : 'Instant Mushroom Coffee';

  const alt = product.alt || `${product.name} ${categoryLabel} by Torch Republic`;
  const inStock = product.inStock !== false;
  const formatLabel = product.category === 'matcha' ? `${servings} servings · Tin` : `${servings} servings · Tube`;

  const ingredientsText = product.category === 'matcha'
    ? '100% ceremonial grade matcha. No artificial colors, flavors, or preservatives.'
    : product.category === 'classic-coffee'
    ? '100% single-origin Arabica instant coffee from Papua New Guinea. No artificial colors, flavors, or preservatives.'
    : "Premium instant coffee, organic Lion's Mane mushroom extract, organic Chaga mushroom extract. No artificial colors, flavors, or preservatives.";

  const prepText = 'Add one serving to 8–12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. For iced: dissolve in 2–3 oz hot water first, then pour over ice.';

  const shippingText = 'Ships from Texas within 1–3 business days. Free standard shipping on orders $50+. 30-day satisfaction guarantee — if you’re not happy, reach out and we’ll make it right.';

  const productFAQs = [
    { question: `What does ${product.name} taste like?`, answer: product.tasteDescription || product.description },
    { question: 'How do I prepare this blend?', answer: prepText },
    { question: 'Is this product instant?', answer: 'Yes. All Torch Republic blends are instant format — no machine, grinder, or pods needed. Just add hot water and stir.' },
    { question: 'How many servings are included?', answer: `${servings} servings per ${product.category === 'matcha' ? 'tin' : 'tube'}.` },
    { question: 'Does it contain caffeine?', answer: product.category === 'matcha' ? 'Yes, ceremonial matcha contains naturally occurring caffeine.' : 'Yes, these blends contain caffeine from the premium instant coffee base.' },
  ];

  const seoDesc = `${product.name} — ${product.tasteDescription || product.description} ${servings} servings. ${categoryLabel} for ${product.bestFor}. No machine needed. Torch Republic Coffee Company.`;

  useSEO({
    title: `${product.name} | ${categoryLabel} | Torch Republic Coffee Company`,
    description: seoDesc.slice(0, 160),
    url: `/products/${product.slug}`,
    type: 'product',
    image: getProductImage(product),
    product: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: getProductImage(product),
      sku: product.shopifyHandle || product.slug,
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop', url: '/shop' },
      { name: categoryLabel, url: product.category === 'matcha' ? '/shop/matcha' : product.category === 'classic-coffee' ? '/shop/instant-coffee' : '/shop/instant-mushroom-coffee' },
      { name: product.name, url: `/products/${product.slug}` },
    ],
    faq: productFAQs,
  });

  const allCatalog = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];
  const sameCategory = allCatalog.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const otherCategory = allCatalog.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 3 - sameCategory.length);
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  const handleAddToCart = (ctaLocation = 'product_primary_add_to_cart') => {
    if (!inStock) return;
    setCartError(null);
    try {
      trackAddToCart({
        productId: product.slug,
        productName: product.name,
        category: product.category,
        price: unitPrice,
        quantity: qty,
        isSubscription,
        ctaLocation,
      });
      addItem({
        id: product.id || product.slug,
        name: product.name,
        price: unitPrice,
        image: getProductImage(product),
        category: product.category,
        servings,
        shopifyHandle: product.shopifyHandle,
        isSubscription,
      }, qty);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2500);
    } catch (e) {
      setCartError('We couldn’t add this to your cart. Please try again.');
    }
  };

  React.useEffect(() => { addToRecentlyViewed(product); }, [product.slug]);
  React.useEffect(() => {
    trackViewItem({ productId: product.slug, productName: product.name, price: product.price, category: product.category || 'mushroom-coffee' });
  }, [product.slug]);

  return (
    <div style={{ backgroundColor: THEME.page, color: THEME.text, minHeight: '100vh', paddingBottom: '7rem' }} className="lg:pb-0">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-7 pb-2">
        <nav className="flex items-center gap-2 font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: THEME.secondary }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <ChevronRight size={11} />
          <Link to="/shop" className="hover:opacity-70">Shop</Link>
          <ChevronRight size={11} />
          <Link to={product.category === 'matcha' ? '/shop/matcha' : product.category === 'classic-coffee' ? '/shop/instant-coffee' : '/shop/instant-mushroom-coffee'} className="hover:opacity-70">{categoryLabel}</Link>
          <ChevronRight size={11} />
          <span style={{ color: THEME.clay }}>{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:sticky lg:top-24">
            <Gallery product={product} alt={alt} />
          </motion.div>

          {/* Purchase panel */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="flex flex-col gap-6">
            {/* Type + roast badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-torch" style={{ background: `${THEME.clay}14`, color: THEME.clay, borderColor: `${THEME.clay}30` }}>{categoryLabel}</span>
              <span className="badge-torch">{product.roast}</span>
            </div>

            {/* Title */}
            <h1 className="h1" style={{ fontSize: 'clamp(1.9rem, 3.4vw, 2.6rem)' }}>{product.name}</h1>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase" style={{ color: THEME.clay }}>{product.mood}</p>

            {/* Share */}
            <ShareButtons title={`${product.name} — Torch Republic Coffee`} url={`/products/${product.slug}`} />

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif font-bold" style={{ fontSize: '2rem', color: THEME.text }}>${unitPrice.toFixed(2)}</span>
              {isSubscription && (
                <span className="font-mono text-sm line-through" style={{ color: THEME.secondary }}>${product.price.toFixed(2)}</span>
              )}
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: THEME.secondary }}>
                ${(unitPrice / servings).toFixed(2)} per {product.category === 'matcha' ? 'serving' : 'cup'}
              </span>
            </div>

            {/* Format / size */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>Format:</span>
              <span className="badge-torch" style={{ background: THEME.card, borderColor: THEME.clay + '55', color: THEME.text }}>{formatLabel}</span>
            </div>

            {/* Purchase type selector */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsSubscription(true)}
                className="text-left p-4 transition-all"
                style={{
                  background: isSubscription ? THEME.card : 'transparent',
                  border: `1.5px solid ${isSubscription ? THEME.clay : THEME.border}`,
                  borderRadius: 10, cursor: 'pointer',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${THEME.clay}` }}>
                      {isSubscription && <span style={{ width: 9, height: 9, borderRadius: '50%', background: THEME.clay }} />}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-sm" style={{ color: THEME.text }}>Subscribe &amp; Save 10%</p>
                      <p className="font-mono text-[9px] tracking-[0.12em]" style={{ color: THEME.secondary }}>Every 4 weeks &middot; Pause or cancel anytime</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold" style={{ color: THEME.moss }}>${subscriptionPrice.toFixed(2)}</span>
                </div>
              </button>

              <button
                onClick={() => setIsSubscription(false)}
                className="text-left p-4 transition-all"
                style={{
                  background: !isSubscription ? THEME.card : 'transparent',
                  border: `1.5px solid ${!isSubscription ? THEME.clay : THEME.border}`,
                  borderRadius: 10, cursor: 'pointer',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${THEME.clay}` }}>
                      {!isSubscription && <span style={{ width: 9, height: 9, borderRadius: '50%', background: THEME.clay }} />}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-sm" style={{ color: THEME.text }}>One-time purchase</p>
                      <p className="font-mono text-[9px] tracking-[0.12em]" style={{ color: THEME.secondary }}>Just this order</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold" style={{ color: THEME.text }}>${product.price.toFixed(2)}</span>
                </div>
              </button>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>Quantity</span>
              <div className="flex items-center" style={{ border: `1px solid ${THEME.border}`, borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex items-center justify-center" style={{ width: 44, height: 44, color: THEME.text, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span className="font-mono text-base w-12 text-center" style={{ color: THEME.text }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="flex items-center justify-center" style={{ width: 44, height: 44, color: THEME.text, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <span className="font-mono text-xs" style={{ color: THEME.secondary }}>${(unitPrice * qty).toFixed(2)} total</span>
            </div>

            {/* Add to cart + status */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleAddToCart(isSubscription ? 'product_primary_add_to_cart_subscribe' : 'product_primary_add_to_cart_onetime')}
                disabled={!inStock}
                className="btn btn-primary w-full"
                style={inStock ? {} : { opacity: 0.5, cursor: 'not-allowed' }}
              >
                {justAdded ? <><Check size={16} /> Added to cart</> : <><ShoppingBag size={16} /> Add to Cart</>}
              </button>
              {!inStock && (
                <p className="font-mono text-[9px] tracking-[0.12em] uppercase text-center" style={{ color: THEME.clay }}>
                  Currently unavailable — check back soon
                </p>
              )}
              {justAdded && (
                <p className="font-heading text-sm text-center" style={{ color: THEME.moss }}>
                  Added to your cart. <Link to="/cart" style={{ color: THEME.clay, textDecoration: 'underline' }}>View cart →</Link>
                </p>
              )}
              {cartError && (
                <p className="font-heading text-sm text-center" style={{ color: '#B23A2A' }}>{cartError}</p>
              )}
            </div>

            {/* Reassurance row */}
            <div className="flex flex-col gap-2 pt-1">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: THEME.clay, flexShrink: 0 }} />
                  <span className="font-heading text-sm" style={{ color: THEME.secondary }}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shopper summary */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-10">
        <div className="mb-6">
          <p className="eyebrow mb-2" style={{ color: THEME.clay }}>At a glance</p>
          <h2 className="h2">{product.tagline ? product.tagline : 'A daily ritual, simplified'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SummaryCard label="What it is">
            {product.description}
          </SummaryCard>
          <SummaryCard label="Flavor profile">
            <p>{product.tasteDescription}</p>
            {product.flavorNotes && product.flavorNotes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {product.flavorNotes.map(note => (
                  <span key={note} className="badge-torch" style={{ background: `${product.accent}10`, color: product.accent, borderColor: `${product.accent}25` }}>{note}</span>
                ))}
              </div>
            )}
          </SummaryCard>
          <SummaryCard label="How to prepare">
            {prepText}
          </SummaryCard>
          <SummaryCard label="Who it’s for">
            {product.bestFor}
          </SummaryCard>
        </div>
      </section>

      {/* Information accordions */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-10" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <div className="max-w-3xl">
          <Accordion title="Ingredients & details" defaultOpen>
            <p>{ingredientsText}</p>
          </Accordion>
          <Accordion title="How to prepare">
            <p>{prepText}</p>
          </Accordion>
          <Accordion title="Shipping & returns">
            <p>{shippingText}</p>
          </Accordion>
          <Accordion title="Frequently asked questions">
            <div className="flex flex-col gap-5">
              {productFAQs.map((f, i) => (
                <div key={i}>
                  <p className="font-heading font-bold text-sm mb-1" style={{ color: THEME.text }}>{f.question}</p>
                  <p style={{ color: THEME.secondary }}>{f.answer}</p>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="px-6 md:px-10 py-14" style={{ borderTop: `1px solid ${THEME.border}` }}>
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-8">
              <p className="eyebrow mb-2" style={{ color: THEME.clay }}>Complete your ritual</p>
              <h2 className="h2">You might also like</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <MushroomProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* Recently viewed */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-16">
        <RecentlyViewed currentSlug={product.slug} />
      </section>

      {/* Mobile sticky purchase bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: THEME.card, borderTop: `1px solid ${THEME.border}`, padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(45,40,36,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-sm truncate" style={{ color: THEME.text }}>{product.name}</p>
            <p className="font-mono text-[10px]" style={{ color: THEME.clay }}>${(unitPrice * qty).toFixed(2)}{isSubscription ? ' · Subscribe & Save' : ''}</p>
          </div>
          <div className="flex items-center" style={{ border: `1px solid ${THEME.border}`, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex items-center justify-center" style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Decrease quantity"><Minus size={13} /></button>
            <span className="font-mono text-sm w-9 text-center" style={{ color: THEME.text }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="flex items-center justify-center" style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Increase quantity"><Plus size={13} /></button>
          </div>
          <button
            onClick={() => handleAddToCart('product_sticky_mobile_cart')}
            disabled={!inStock}
            className="btn btn-primary"
            style={{ flexShrink: 0, padding: '0.6rem 1.1rem' }}
          >
            {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlendDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const localProducts = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];
        const localProduct = localProducts.find(p => p.slug === slug);

        if (!localProduct) {
          console.error('Product not found in local catalog:', slug);
          setLoading(false);
          return;
        }

        const response = await base44.functions.invoke('fetchShopifyProducts', {});

        if (response.data?.products) {
          const shopifyProduct = response.data.products.find(p =>
            p.handle === localProduct.shopifyHandle ||
            p.handle === localProduct.slug ||
            p.handle === localProduct.id
          );

          if (shopifyProduct) {
            setProduct(withApprovedProductImage({
              ...localProduct,
              image: shopifyProduct.featuredImage || shopifyProduct.images?.[0] || localProduct.image,
              galleryImages: shopifyProduct.images?.length > 0 ? shopifyProduct.images : localProduct.galleryImages,
              price: shopifyProduct.price || localProduct.price,
              inStock: shopifyProduct.availableForSale,
            }));
          } else {
            setProduct(withApprovedProductImage(localProduct));
          }
        } else {
          setProduct(withApprovedProductImage(localProduct));
        }
      } catch (error) {
        console.error('Failed to fetch product from Shopify:', error);
        const localProducts = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];
        setProduct(withApprovedProductImage(localProducts.find(p => p.slug === slug)));
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: THEME.page }}>
        <div className="text-center">
          <div className="w-10 h-10 border-2 rounded-full animate-spin mx-auto mb-4" style={{ borderColor: THEME.clay, borderTopColor: 'transparent' }} />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: THEME.clay }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    const redirectTo = DEPRECATED_PRODUCT_REDIRECTS[slug];
    if (redirectTo) return <Navigate to={redirectTo} replace />;
    if (DISCONTINUED_PRODUCT_PATTERN.test(slug)) return <GoneRedirect />;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: THEME.page, color: THEME.text }}>
        <p className="font-serif text-2xl">Product not found.</p>
        <Link to="/shop" className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: THEME.clay }}>← Back to Shop</Link>
      </div>
    );
  }

  return <BlendDetailInner product={product} />;
}