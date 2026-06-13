import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ShieldCheck, Truck, Zap, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import ShareButtons from '../components/social/ShareButtons';
import { useCart } from '@/contexts/CartContext';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../lib/mushroomProducts';
import FAQSection from '../components/mushroom/FAQSection';
import MushroomProductCard from '../components/mushroom/ProductCard';
import TasteProfileCard from '../components/mushroom/TasteProfileCard';
import BlendCompositionCard from '../components/mushroom/BlendCompositionCard';
import SubscribeAndSave from '../components/mushroom/SubscribeAndSave';
import OriginCraftsmanshipSection from '../components/mushroom/OriginCraftsmanshipSection';
import MushroomCoffeeComparison from '../components/mushroom/MushroomCoffeeComparison';
import FunctionalBenefits from '../components/mushroom/FunctionalBenefits';
import DreamCapEveningRitual from '../components/mushroom/DreamCapEveningRitual';
import ProductReviewsCarousel from '../components/mushroom/ProductReviewsCarousel';
import DiscountReminders from '../components/discounts/DiscountReminders';
import ProductPageFAQ from '../components/mushroom/ProductPageFAQ';
import { getShopifyCartUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import TorchbearerCrossSell from '../components/reserve/TorchbearerCrossSell';
import ScarcityBadge from '../components/mushroom/ScarcityBadge';
import { useSEO } from '@/hooks/useSEO';
import { base44 } from '@/api/base44Client';
import RitualMembershipBlock from '../components/mushroom/RitualMembershipBlock';
import ProductTestimonialFeed from '../components/mushroom/ProductTestimonialFeed';
import IngredientResearch from '../components/mushroom/IngredientResearch';
import IngredientSpotlight from '../components/mushroom/IngredientSpotlight';
import IngredientsAndBenefits from '../components/mushroom/IngredientsAndBenefits';

const TRUST_BY_CATEGORY = {
  'mushroom-coffee': [
    { icon: Zap, label: 'Instant — No Machine Needed' },
    { icon: ShieldCheck, label: "Lion's Mane + Chaga" },
    { icon: Truck, label: 'Free Shipping $75+' },
    { icon: Lock, label: 'Secure Checkout' },
  ],
  'classic-coffee': [
    { icon: Zap, label: 'Instant — No Machine Needed' },
    { icon: ShieldCheck, label: '100% Premium Arabica' },
    { icon: Truck, label: 'Free Shipping $75+' },
    { icon: Lock, label: 'Secure Checkout' },
  ],
  matcha: [
    { icon: Zap, label: 'Instant — Just Add Water' },
    { icon: ShieldCheck, label: 'Ceremonial Grade Matcha' },
    { icon: Truck, label: 'Free Shipping $75+' },
    { icon: Lock, label: 'Secure Checkout' },
  ],
};

const ACCORDIONS = [
  {
    title: 'Ingredients & Details',
    content: 'Premium instant coffee, organic Lion\'s Mane mushroom extract, organic Chaga mushroom extract. Net weight: 1.9 oz / 54g. 27 servings per tube. No artificial colors, flavors, or preservatives.',
  },
  {
    title: 'How to Use',
    content: 'Add one scoop (approximately 2g) to 8–12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. Enjoy immediately. For iced: dissolve in 2–3 oz hot water first, then pour over ice.',
  },
  {
    title: 'Shipping & Returns',
    content: 'Free standard shipping on orders over $75. Orders ship within 1–3 business days. 30-day satisfaction guarantee — contact us if you\'re not completely satisfied.',
  },
];

function Accordion({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left transition-colors hover:text-white"
        style={{ color: open ? '#F7F1E8' : 'rgba(247,241,232,0.6)', background: 'none', border: 'none' }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">{title}</span>
        <span className="font-mono text-lg" style={{ color: '#E6B7AD' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pb-5"
        >
          <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
            {content}
          </p>
        </motion.div>
      )}
    </div>
  );
}

function GalleryCarousel({ images, accent, productName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mt-6">
      <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3"
        style={{ color: 'rgba(230,183,173,0.5)' }}>Gallery</p>
      <div className="relative" style={{ background: '#0C0C0C', aspectRatio: '1/1', border: `1px solid ${accent}25`, overflow: 'hidden' }}>
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          src={images[currentIndex]}
          alt={`${productName} gallery image ${currentIndex + 1}`}
          className="w-full h-full object-contain p-6"
          style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }}
          onError={(e) => {
            e.target.style.opacity = '0.5';
          }}
        />
        
        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:bg-white/10"
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: `1px solid ${accent}30` }}
        >
          <ChevronLeft className="w-4 h-4" style={{ color: accent }} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:bg-white/10"
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: `1px solid ${accent}30` }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: accent }} />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="transition-all"
              style={{
                width: idx === currentIndex ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: idx === currentIndex ? accent : `${accent}40`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlendDetailInner({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const subscriptionPrice = product.price * 0.8; // 20% off

  const categoryLabel = product.category === 'matcha'
    ? 'Ceremonial Matcha'
    : product.category === 'classic-coffee'
    ? 'Premium Instant Coffee'
    : 'Instant Mushroom Coffee';

  const seoDesc = product.category === 'matcha'
    ? `${product.name} — ${product.tasteDescription} ${product.servings} servings. Ceremonial grade matcha for ${product.bestFor}. No machine needed. Torch Republic Coffee Company.`
    : product.category === 'classic-coffee'
    ? `${product.name} — ${product.tasteDescription} ${product.servings} servings. Premium instant coffee for ${product.bestFor}. No machine needed. Torch Republic Coffee Company.`
    : `${product.name} — ${product.tasteDescription} ${product.servings} servings. Instant mushroom coffee with Lion's Mane + Chaga for ${product.bestFor}. Torch Republic Coffee Company.`;

  // Build FAQ schema for product page
  const productFAQs = [
    { question: `What does ${product.name} taste like?`, answer: product.tasteDescription },
    { question: 'How do I prepare this blend?', answer: 'Add one serving to 8–12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. For iced: dissolve in 2–3 oz hot water first, then pour over ice.' },
    { question: 'Is this product instant?', answer: 'Yes. All Torch Republic blends are instant format — no machine, grinder, or pods needed. Just add hot water and stir.' },
    { question: 'Does it contain caffeine?', answer: product.category === 'matcha' ? 'Yes, ceremonial matcha contains natural caffeine for smooth, sustained energy.' : 'Yes, all blends contain caffeine from the premium instant coffee base.' },
    { question: 'How many servings are included?', answer: `${product.servings || (product.category === 'matcha' ? 25 : 27)} servings per ${product.category === 'matcha' ? 'tin' : 'tube'}.` },
    { question: 'Can I drink it daily?', answer: 'Yes, Torch Republic blends are designed for daily ritual use. Follow product directions and consult a healthcare professional if pregnant, nursing, or managing a medical condition.' },
  ];

  useSEO({
    title: `${product.name} | ${categoryLabel} | Torch Republic Coffee Company`,
    description: seoDesc.slice(0, 160),
    url: `/products/${product.slug}`,
    type: 'product',
    image: product.image,
    product: {
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
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

  // Remove hardcoded schema - useSEO hook handles it with real review data

  // Note: product is guaranteed non-null here (checked by parent)

  const related = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS].filter(p => p.id !== product.id && p.category === product.category).slice(0, 3)
    .concat([...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS].filter(p => p.id !== product.id && p.category !== product.category).slice(0, Math.max(0, 3 - [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS].filter(p => p.id !== product.id && p.category === product.category).slice(0, 3).length)))
    .slice(0, 3);

  const shopifyUrl = getShopifyCartUrl(product.slug, qty);
  const checkoutDest = shopifyUrl || SHOPIFY_CART_URL;

  const handleAddToCart = () => {
    // Track add to cart event
    try {
      base44.analytics.track({
        eventName: 'add_to_cart',
        properties: {
          product_id: product.slug,
          product_name: product.name,
          price: isSubscription ? subscriptionPrice : product.price,
          quantity: qty,
          is_subscription: isSubscription,
          currency: 'USD'
        }
      });
      // GA4 event
      if (window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'USD',
          value: (isSubscription ? subscriptionPrice : product.price) * qty,
          items: [{
            item_id: product.slug,
            item_name: product.name,
            price: isSubscription ? subscriptionPrice : product.price,
            quantity: qty
          }]
        });
      }
    } catch (e) {
      // Analytics tracking failed silently
    }
    // Add to local cart instead of redirecting to Shopify
    addItem({
      id: product.id || product.slug,
      name: product.name,
      price: isSubscription ? subscriptionPrice : product.price,
      image: product.image,
      category: product.category,
      servings: product.servings,
      shopifyHandle: product.shopifyHandle,
      isSubscription: isSubscription,
    }, qty);
  };

  // Track product view
  React.useEffect(() => {
    try {
      base44.analytics.track({
        eventName: 'view_item',
        properties: {
          product_id: product.slug,
          product_name: product.name,
          price: product.price,
          category: product.category || 'mushroom-coffee'
        }
      });
      if (window.gtag) {
        window.gtag('event', 'view_item', {
          currency: 'USD',
          value: product.price,
          items: [{
            item_id: product.slug,
            item_name: product.name,
            price: product.price,
            category: product.category || 'mushroom-coffee'
          }]
        });
      }
    } catch (e) {
      // Silent fail
    }
  }, [product.slug]);

  return (
    <div style={{ backgroundColor: '#080808', color: '#F7F1E8', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-2">
        <nav className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase"
          style={{ color: 'rgba(255,255,255,0.28)' }}>
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>›</span>
          <Link to="/blends" className="hover:text-white transition-colors">The Blends</Link>
          <span>›</span>
          <span style={{ color: '#E6B7AD' }}>{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT: Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative flex items-center justify-center"
              style={{ background: '#0C0C0C', aspectRatio: '1/1', border: `1px solid ${product.accent}25` }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${product.accent}12 0%, transparent 70%)` }} />
              {product.imagePlaceholder || !product.image ? (
                <div className="flex flex-col items-center justify-center gap-4 p-12">
                  <div className="w-24 h-24 rounded-full border-2 border-dashed"
                    style={{ borderColor: `${product.accent}35` }} />
                  <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center"
                    style={{ color: `${product.accent}50` }}>Product image coming soon</p>
                </div>
              ) : (
                <img
                  src={product.image}
                  alt={product.alt || `${product.name} - ${product.roast} ${product.category === 'matcha' ? 'ceremonial matcha' : product.category === 'classic-coffee' ? 'premium instant coffee' : 'instant mushroom coffee'} - Torch Republic Coffee Company`}
                  className="w-full h-full object-contain p-8"
                  style={{ filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.parentElement.querySelector('.product-image-error');
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
              )}
              {/* Error placeholder */}
              <div className="product-image-error hidden flex-col items-center justify-center gap-4 p-12 absolute inset-0"
                style={{ background: '#0C0C0C', display: (!product.image || product.imagePlaceholder) ? 'flex' : 'none' }}>
                <div className="w-24 h-24 rounded-full border-2 border-dashed"
                  style={{ borderColor: `${product.accent}35` }} />
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-center"
                  style={{ color: `${product.accent}50` }}>Image loading...</p>
              </div>
            </div>

            {/* Product specs grid below image on desktop */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {(product.category === 'matcha'
                ? [['100% Ceremonial Matcha', 'Grade'], ['25 Servings', 'Per Tin'], ['Instant', 'Just Add Water'], ['No Machine', 'Needed']]
                : product.category === 'classic-coffee'
                ? [['Premium Arabica', 'Instant Coffee'], ['27 Servings', 'Per Tube'], ['1.9 oz / 54g', 'Net Weight'], ['No Machine', 'Needed']]
                : [["Lion's Mane + Chaga", 'Mushroom Blend'], ['27 Servings', 'Per Tube'], ['1.9 oz / 54g', 'Net Weight'], ['Instant', 'No Brewer Needed']]
              ).map(([val, label]) => (
                <div key={label} className="flex flex-col gap-1 p-3"
                  style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.07)' }}>
                  <p className="font-serif font-bold text-white text-xs">{val}</p>
                  <p className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.32)' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Gallery carousel */}
            {product.galleryImages && product.galleryImages.length > 0 && (
              <GalleryCarousel images={product.galleryImages} accent={product.accent} productName={product.name} />
            )}
          </motion.div>

          {/* RIGHT: Purchase area */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1"
                style={{ background: `${product.accent}18`, color: product.accent, border: `1px solid ${product.accent}30` }}>
                {product.roast}
              </span>
                      <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-2.5 py-1"
                style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {product.category === 'matcha' ? 'Ceremonial Matcha' : product.category === 'classic-coffee' ? 'Premium Instant Coffee' : 'Instant Mushroom Coffee'}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-bold"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              {product.name}
            </h1>

            {/* Mood */}
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
              {product.mood}
            </p>

            {/* Share */}
            <ShareButtons title={`${product.name} — Torch Republic Coffee`} url={`/blends/${product.slug}`} />

            {/* Description */}
            <p className="font-heading leading-relaxed"
              style={{ fontSize: '0.93rem', color: 'rgba(247,241,232,0.55)', fontWeight: 300, lineHeight: 1.85 }}>
              {product.description}
            </p>

            {/* Flavor notes */}
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map(note => (
                <span key={note} className="font-mono text-[8px] tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{ background: `${product.accent}08`, border: `1px solid ${product.accent}20`, color: `${product.accent}80` }}>
                  {note}
                </span>
              ))}
            </div>

            {/* Why This Coffee */}
            <div className="p-4" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
              <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
                Why This Coffee
              </p>
              <ul className="space-y-2">
                {product.keyBenefits.map(b => (
                  <li key={b} className="flex items-start gap-2">
                    <span style={{ color: product.accent, marginTop: '2px', flexShrink: 0, fontSize: '0.6rem' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300 }}>{b}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
                  <span style={{ color: product.accent, marginTop: '2px', flexShrink: 0, fontSize: '0.6rem' }}>◆</span>
                  <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.6)', fontWeight: 300 }}>Best for: {product.bestFor}</span>
                </li>
              </ul>
            </div>

            {/* Functional promise — visible right before purchase */}
            <div className="px-4 py-3 flex items-center gap-3"
              style={{ background: 'rgba(230,183,173,0.05)', borderLeft: '2px solid rgba(230,183,173,0.4)' }}>
              <span style={{ fontSize: '1.1rem' }}>
                {product.category === 'matcha' ? '🍵' : product.category === 'classic-coffee' ? '☕' : '⚡'}
              </span>
              <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.8)', fontWeight: 400, lineHeight: 1.6 }}>
                {product.category === 'matcha'
                  ? 'Calm, focused energy in 30 seconds — just whisk with hot water.'
                  : product.category === 'classic-coffee'
                  ? 'Premium single-origin taste in 30 seconds — no machine, no pods.'
                  : `Clean, jitter-free focus in 30 seconds — Lion's Mane + Chaga, just add hot water.`}
              </p>
            </div>

            {/* Price */}
            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(230,183,173,0.2), transparent)' }} />
            <div className="flex items-baseline gap-3">
              <span className="font-mono font-black" style={{ fontSize: '2.2rem', color: '#E6B7AD' }}>
                ${isSubscription ? (product.price * 0.8).toFixed(2) : product.price.toFixed(2)}
              </span>
              {isSubscription && (
                <span className="font-mono text-[9px] tracking-[0.2em] line-through" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  ${product.price.toFixed(2)}
                </span>
              )}
              <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                per {product.category === 'matcha' ? 'tin' : 'tube'} · {product.servings || (product.category === 'matcha' ? 25 : 27)} servings
              </span>
            </div>
            {isSubscription && (
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#10B981' }}>
                Save ${(product.price * 0.2).toFixed(2)} with subscription
              </p>
            )}

            {/* Qty + Add to Cart */}
            <div className="flex flex-col gap-3">
              {/* Subscribe & Save Toggle */}
              <div className="mb-4 p-5" style={{ background: isSubscription ? 'rgba(230,183,173,0.08)' : 'rgba(230,183,173,0.04)', border: isSubscription ? '2px solid rgba(230,183,173,0.4)' : '1px solid rgba(230,183,173,0.12)', borderRadius: '4px', transition: 'all 0.3s ease' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="subscribe-toggle"
                      checked={isSubscription}
                      onChange={() => setIsSubscription(!isSubscription)}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: '#E6B7AD' }}
                    />
                    <label htmlFor="subscribe-toggle" className="cursor-pointer">
                      <span className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold block" style={{ color: '#E6B7AD' }}>
                        Subscribe &amp; Save 20%
                      </span>
                      <span className="font-mono text-[8px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.5)' }}>
                        Pause or cancel anytime in 2 clicks
                      </span>
                    </label>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[9px] tracking-[0.2em] line-through block" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: '#10B981', fontWeight: 700 }}>
                      ${(product.price * 0.8).toFixed(2)} /mo
                    </span>
                  </div>
                </div>
                
                {/* Membership Benefits */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { icon: '🔥', text: '20% off every order' },
                    { icon: '📦', text: 'Free shipping on all orders' },
                    { icon: '⚡', text: 'Priority customer support' },
                    { icon: '🎁', text: 'Exclusive member perks' },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 p-2" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '2px' }}>
                      <span className="text-sm">{benefit.icon}</span>
                      <span className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(230,183,173,0.7)' }}>{benefit.text}</span>
                    </div>
                  ))}
                </div>
                
                <p className="font-mono text-[7px] tracking-[0.2em] text-center" style={{ color: 'rgba(230,183,173,0.5)', lineHeight: 1.6, borderTop: '1px solid rgba(230,183,173,0.08)', paddingTop: '8px' }}>
                  Cancel or pause anytime · No commitments
                </p>
              </div>

              {/* Qty label */}
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(230,183,173,0.45)' }}>
                {isSubscription ? 'Your subscription quantity:' : 'Stock your ritual — choose one tube or build your full set.'}
              </p>

              {/* Qty selector */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0"
                  style={{ border: '1px solid rgba(230,183,173,0.2)' }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="flex items-center justify-center transition-colors hover:bg-white/5"
                    style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)', borderRight: '1px solid rgba(230,183,173,0.15)' }}>
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono text-sm w-12 text-center"
                    style={{ color: '#F7F1E8' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="flex items-center justify-center transition-colors hover:bg-white/5"
                    style={{ width: 40, height: 40, color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid rgba(230,183,173,0.15)' }}>
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                  ${((isSubscription ? subscriptionPrice : product.price) * qty).toFixed(2)} total
                  {isSubscription && <span className="text-green-500 ml-1">(save ${(product.price * 0.2 * qty).toFixed(2)})</span>}
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full font-mono text-[11px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4"
                style={{ background: '#E6B7AD', color: '#080808' }}>
                {isSubscription ? 'Subscribe Now' : 'Add to Cart'}
              </button>

              {/* Buy Now */}
              <a
                href={checkoutDest}
                className="w-full text-center font-mono text-[11px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-80 py-4"
                style={{ border: '1px solid rgba(230,183,173,0.35)', color: 'rgba(230,183,173,0.8)', display: 'block' }}>
                {isSubscription ? 'Start Subscription →' : 'Buy Now →'}
              </a>

              {/* Subscription info */}
              {isSubscription && (
                <div className="flex items-center justify-between px-3 py-2.5"
                  style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#10B981' }}>
                    ✓ Subscription discount applied
                  </span>
                  <Link to="/subscription" className="font-mono text-[8px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
                    style={{ color: 'rgba(16,185,129,0.8)' }}>
                    Learn more →
                  </Link>
                </div>
              )}

              {/* Microcopy */}
              <p className="font-mono text-[8px] tracking-[0.2em] text-center"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                {isSubscription ? 'Delivers every 4 weeks · Cancel anytime' : 'Ships within 1–3 business days · 30-day satisfaction guarantee'}
              </p>

              {/* Discount reminders */}
              <DiscountReminders cartSubtotal={product.price * qty} compact />

              {/* Scarcity / social proof */}
              <ScarcityBadge productSlug={product.slug} />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2">
              {(TRUST_BY_CATEGORY[product.category] || TRUST_BY_CATEGORY['mushroom-coffee']).map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-2.5"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.07)' }}>
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.5)' }} />
                  <span className="font-mono text-[8px] uppercase tracking-wide" style={{ color: 'rgba(247,241,232,0.35)' }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Torchbearers Rewards Banner */}
            <div className="my-5 p-4" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.12)' }}>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(230,183,173,0.1)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E6B7AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold" style={{ color: '#E6B7AD' }}>
                    Torchbearers Rewards
                  </p>
                  <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.6)' }}>
                    Earn points on this purchase
                  </p>
                </div>
              </div>
              <p className="font-mono text-[7.5px] tracking-[0.15em] text-center" style={{ color: 'rgba(245,239,230,0.55)', lineHeight: 1.6 }}>
                Join Torchbearers Rewards and earn points for every ritual. <a href="/torchbearers-rewards" style={{ color: '#E6B7AD', textDecoration: 'none' }}>Learn more →</a>
              </p>
            </div>

            {/* Ritual Membership Benefits Block */}
            <RitualMembershipBlock />

            {/* Ingredient Transparency */}
            <div className="p-5" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.15)' }}>
              <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(16,185,129,0.7)' }}>
                What's Inside Every Tube
              </p>
              {product.category === 'matcha' ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>100% Ceremonial Grade Matcha</strong> — whisked-quality, instant format
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>25 servings per tin</strong> — no fillers, no artificial flavors
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>Natural L-Theanine</strong> — calm focus without the jitter
                    </span>
                  </div>
                </div>
              ) : product.category === 'classic-coffee' ? (
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>Premium Arabica Instant Coffee</strong> — spray-dried, specialty grade
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>27 servings per tube</strong> — no artificial colors or preservatives
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px' }}>◆</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                      <strong style={{ color: '#F7F1E8' }}>No pods, no machine</strong> — just add 8–10 oz hot water
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {[
                    { label: 'Premium Instant Coffee', detail: 'Specialty Arabica base, clean roast — no artificial flavors' },
                    { label: "Organic Lion's Mane (Hericium erinaceus)", detail: '[Dosage per serving — supplier verification in progress]' },
                    { label: 'Organic Chaga (Inonotus obliquus)', detail: '[Dosage per serving — supplier verification in progress]' },
                    { label: 'Extract Type', detail: '[Fruiting body, mycelium, or blend — add exact extract type here]' },
                    { label: 'Caffeine', detail: '[Add exact mg per serving — estimated 50–80mg]' },
                    { label: '27 Servings · 1.9 oz / 54g', detail: 'No artificial colors, flavors, or preservatives' },
                  ].map(({ label, detail }) => (
                    <div key={label} className="flex items-start gap-2">
                      <span style={{ color: '#10B981', fontSize: '0.55rem', marginTop: '4px', flexShrink: 0 }}>◆</span>
                      <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)', fontWeight: 300 }}>
                        <strong style={{ color: '#F7F1E8' }}>{label}</strong> — {detail}
                      </span>
                    </div>
                  ))}
                  <p className="font-mono text-[7px] tracking-[0.15em] mt-3" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.7 }}>
                    These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>
              )}
            </div>

            {/* Guarantee + Shipping strip */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 text-center" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: '#E6B7AD' }}>30-Day Guarantee</p>
                <p className="font-heading text-[11px]" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>Not satisfied? Full refund, no questions asked.</p>
              </div>
              <div className="p-3 text-center" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[9px] tracking-[0.25em] uppercase mb-1" style={{ color: '#E6B7AD' }}>Free Shipping</p>
                <p className="font-heading text-[11px]" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>On orders over $75. Ships in 1–3 business days.</p>
              </div>
            </div>

            {/* Accordions */}
            <div className="mt-2" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
              {ACCORDIONS.map(a => <Accordion key={a.title} {...a} />)}
            </div>

            {/* Product Reviews Carousel */}
            <ProductReviewsCarousel productSlug={product.shopifyHandle} />

            {/* FDA */}
            <p className="font-mono text-[8px] tracking-[0.1em] leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.18)' }}>
              Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
            </p>

            {/* Torchbearer Cross-sell */}
            <TorchbearerCrossSell />
          </motion.div>
        </div>
      </section>

      {/* PREMIUM COFFEE EXPERIENCE SECTIONS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        {/* Ingredients & Benefits */}
        <IngredientsAndBenefits product={product} />

        {/* Functional Benefits */}
        <FunctionalBenefits product={product} />

        {/* Ingredient Spotlight — premium ingredient education */}
        <IngredientSpotlight product={product} />

        {/* Ingredient Research — clinical studies */}
        <IngredientResearch product={product} />

        {/* Taste Profile */}
        <TasteProfileCard product={product} />

        {/* Blend Composition */}
        <BlendCompositionCard product={product} />

        {/* Origin & Craftsmanship */}
        <OriginCraftsmanshipSection product={product} />

        {/* Comparison */}
        <MushroomCoffeeComparison productName={product.name} product={product} />

        {/* DreamCap Evening Ritual Section (only for DreamCap) */}
        {product.slug === 'dreamcap-blend' && <DreamCapEveningRitual />}

        {/* Product Page FAQ */}
        <ProductPageFAQ />
      </section>

      {/* Subscribe & Save Banner */}
      <SubscribeAndSave />

      {/* Customer Testimonial Feed */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ProductTestimonialFeed
          productHandle={product.shopifyHandle}
          productName={product.name}
          accent={product.accent}
        />
      </section>

      {/* Related products */}
      <section className="px-6 md:px-10 py-20" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase text-center mb-2"
            style={{ color: 'rgba(230,183,173,0.4)' }}>
            Complete Your Ritual
          </p>
          <h2 className="font-serif text-white text-center font-bold mb-10"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((p, i) => (
              <MushroomProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop sticky CTA */}
      <div className="hidden lg:block fixed right-6 bottom-8 z-40">
        <div style={{ background: '#0D0C0B', border: '1px solid rgba(230,183,173,0.2)', padding: '16px 20px', minWidth: '200px', boxShadow: '0 8px 40px rgba(0,0,0,0.7)' }}>
          <p className="font-serif font-bold text-white text-sm mb-1 truncate">{product.name}</p>
          <p className="font-mono text-xs mb-3" style={{ color: '#E6B7AD' }}>${(product.price * qty).toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="w-full font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3 transition-all hover:opacity-90"
            style={{ background: '#E6B7AD', color: '#080808' }}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        style={{ background: '#0C0B0A', borderTop: '1px solid rgba(230,183,173,0.15)', padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-serif font-bold text-white text-sm truncate">{product.name}</p>
            <p className="font-mono text-[9px]" style={{ color: '#E6B7AD' }}>${(product.price * qty).toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-0" style={{ border: '1px solid rgba(230,183,173,0.2)', flexShrink: 0 }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}
              className="flex items-center justify-center" style={{ width: 32, height: 32, color: 'rgba(255,255,255,0.5)' }}>
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-mono text-sm w-8 text-center" style={{ color: '#F7F1E8' }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}
              className="flex items-center justify-center" style={{ width: 32, height: 32, color: 'rgba(255,255,255,0.5)' }}>
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90 px-5 py-3"
            style={{ background: '#E6B7AD', color: '#080808', flexShrink: 0 }}>
            Add to Cart
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

  // Fetch product with Shopify images on mount
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

        // Fetch ALL Shopify products to ensure we find the match
        const response = await base44.functions.invoke('fetchShopifyProducts', {});
        
        if (response.data?.products) {
          // Try multiple matching strategies
          const shopifyProduct = response.data.products.find(p => 
            p.handle === localProduct.shopifyHandle ||  // Primary: match by shopifyHandle
            p.handle === localProduct.slug ||           // Fallback: match by slug
            p.handle === localProduct.id                // Last resort: match by id
          );
          
          if (shopifyProduct) {
            console.log('✅ Found Shopify match for', localProduct.name, ':', shopifyProduct.handle);
            // Merge Shopify data with local product
            setProduct({
              ...localProduct,
              image: shopifyProduct.featuredImage || shopifyProduct.images?.[0] || localProduct.image,
              galleryImages: shopifyProduct.images?.length > 0 ? shopifyProduct.images : localProduct.galleryImages,
              price: shopifyProduct.price || localProduct.price,
              inStock: shopifyProduct.availableForSale,
            });
          } else {
            console.warn('⚠️ No Shopify match for', localProduct.name, '- using local data. Searched for:', localProduct.shopifyHandle, localProduct.slug, localProduct.id);
            setProduct(localProduct);
          }
        } else {
          console.warn('⚠️ No Shopify products returned - using local data');
          setProduct(localProduct);
        }
      } catch (error) {
        console.error('❌ Failed to fetch product from Shopify:', error);
        // Fallback to local product
        const localProducts = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];
        setProduct(localProducts.find(p => p.slug === slug));
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-rose-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: '#E6B7AD' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: '#080808', color: '#F7F1E8' }}>
        <p className="font-serif text-2xl">Blend not found.</p>
        <Link to="/shop" className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: '#E6B7AD' }}>← Back to Shop</Link>
      </div>
    );
  }

  return <BlendDetailInner product={product} />;
}