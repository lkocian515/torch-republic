import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Check, ShoppingBag, Truck, ShieldCheck, RotateCcw, ChevronRight, Gift, Brain, Leaf } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductBySlug, otherRituals, LEGACY_SLUG_REDIRECT } from '@/lib/coreProducts';
import RitualCard from '@/components/products/RitualCard';
import RitualProductImage from '@/components/products/RitualProductImage';
import RecentlyViewed, { addToRecentlyViewed } from '@/components/products/RecentlyViewed';
import ShareButtons from '@/components/social/ShareButtons';
import BlendDetail from '@/pages/BlendDetail';
import RitualMomentStrip from '@/components/home/ritual/RitualMomentStrip';
import RitualLifestyleBanner from '@/components/home/ritual/RitualLifestyleBanner';
import PoweredByNature from '@/components/home/ritual/PoweredByNature';
import RitualProductGallery from '@/components/products/RitualProductGallery';

const COFFEE_FLAKES = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/634eeca77_generated_image.png';

const LIFESTYLE_IMAGE = {
  'mushroom-coffee': null,
  'classic-coffee': null,
};

// Extra gallery images per category (the real bag is always image #0).
// ONLY single-product shots — no group / lineup / collage images.
const GALLERY_EXTRA = {
  'mushroom-coffee': {
    images: [COFFEE_FLAKES],
    alts: ['Instant coffee flakes — what is inside the bag'],
  },
  'classic-coffee': {
    images: [COFFEE_FLAKES],
    alts: ['Instant coffee flakes — what is inside the bag'],
  },
};

const LIFESTYLE_COPY = {
  'mushroom-coffee': { eyebrow: 'Brewed for focus', title: 'Your daily ritual, in a real cup.', subtitle: "Lion's Mane and Chaga meet smooth instant coffee. Just add hot water." },
  'classic-coffee': { eyebrow: 'Brewed for smooth mornings', title: 'Single-origin, in a real cup.', subtitle: '100% Arabica Papua New Guinea instant coffee. Just add hot water.' },
};
import { useSEO } from '@/hooks/useSEO';
import { trackViewItem, trackAddToCart } from '@/lib/analyticsEvents';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';

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

const TRUST = [
  { icon: Truck, title: 'Free shipping', body: 'On orders over $50' },
  { icon: RotateCcw, title: '30-day returns', body: 'Love it or return it' },
  { icon: ShieldCheck, title: 'Secure checkout', body: 'Shop with confidence' },
];

// Verified ingredient lists (matches live BlendDetail copy — no invented claims).
const INGREDIENTS = {
  'classic-coffee':
    '100% single-origin Arabica instant coffee from Papua New Guinea. No artificial colors, flavors, or preservatives.',
  'mushroom-coffee':
    "Premium instant coffee, organic Lion's Mane mushroom extract, organic Chaga mushroom extract. No artificial colors, flavors, or preservatives.",
};

const PREP =
  'Add one serving to 8–12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. For iced: dissolve in 2–3 oz hot water first, then pour over ice.';

const TABS = ['Ingredients', 'Benefits', 'How to Prepare', 'FAQ'];

function benefitsFor(p) {
  const list = [p.positioning];
  if (p.functionalLabel) list.push(p.functionalLabel);
  list.push(`${p.caffeineLabel} caffeine`);
  list.push(`${p.servings} servings`);
  list.push('Instant — no machine needed');
  return list;
}

function faqsFor(p) {
  return [
    { q: `What does ${p.name} taste like?`, a: `${p.flavorLabel}.` },
    { q: 'How do I prepare it?', a: PREP },
    { q: 'Is it instant?', a: 'Yes. All Torch Republic blends are instant format — no machine, grinder, or pods needed. Just add hot water and stir.' },
    { q: 'How many servings are included?', a: `${p.servings} servings per bag.` },
    {
      q: 'Does it contain caffeine?',
      a: 'Yes, these blends contain caffeine from the premium instant coffee base.',
    },
  ];
}

// Legacy slug → canonical slug redirect map lives in coreProducts
// (LEGACY_SLUG_REDIRECT) and is imported above.

export default function RitualProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  if (!product) {
    const redirect = LEGACY_SLUG_REDIRECT[slug];
    if (redirect) {
      if (redirect === 'shop') return <Navigate to="/shop" replace />;
      return <Navigate to={`/products/${redirect}`} replace />;
    }
    // Order-linked / truly unknown slugs defer to the existing template unchanged.
    return <BlendDetail />;
  }
  return <RitualPDP product={product} />;
}

function RitualPDP({ product }) {
  const { addItem } = useCart();
  const c = product.ritual;
  const [qty, setQty] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [tab, setTab] = useState('Ingredients');
  const [justAdded, setJustAdded] = useState(false);

  // NOTE: 20% reflects the CURRENT live Subscribe & Save configured in
  // Shopify/Recharge. The new 10% / 15% model is deferred until that discount
  // can be reconciled with the subscription provider (requires Builder+).
  const subscriptionPrice = product.price * 0.8;
  const unitPrice = isSubscription ? subscriptionPrice : product.price;
  const imageUrl = getProductImage(product);
  const imageAlt = getProductAltText(product, `${product.name} by Torch Republic`);
  const galleryImages = [imageUrl, ...GALLERY_EXTRA[product.category].images];
  const galleryAlts = [imageAlt, ...GALLERY_EXTRA[product.category].alts];
  const faqs = faqsFor(product);
  const benefits = benefitsFor(product);
  const related = otherRituals(product.ritualKey);

  useSEO({
    title: `${product.name} | ${product.categoryLabel} | Torch Republic`,
    description: `${product.name} — ${product.description}`.slice(0, 160),
    url: product.path,
    type: 'product',
    image: imageUrl,
    product: { name: product.name, description: product.description, price: product.price, image: imageUrl, sku: product.shopifyHandle || product.slug },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop', url: '/shop' },
      { name: product.name, url: product.path },
    ],
    faq: faqs,
  });

  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product.slug]);

  useEffect(() => {
    trackViewItem({ productId: product.slug, productName: product.name, price: product.price, category: product.category });
  }, [product.slug]);

  const handleAdd = (cta) => {
    trackAddToCart({
      productId: product.slug,
      productName: product.name,
      category: product.category,
      price: unitPrice,
      quantity: qty,
      isSubscription,
      ctaLocation: cta,
    });
    addItem(
      { id: product.id, name: product.name, price: unitPrice, image: imageUrl, category: product.category, servings: product.servings, shopifyHandle: product.shopifyHandle, isSubscription },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const OptionRow = ({ active, onClick, title, sub, price, priceColor }) => (
    <button
      onClick={onClick}
      className="text-left transition-all"
      style={{ background: active ? THEME.card : 'transparent', border: `1.5px solid ${active ? c.accent : THEME.border}`, borderRadius: 10, cursor: 'pointer', padding: '1rem' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center" style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${c.accent}` }}>
            {active && <span style={{ width: 9, height: 9, borderRadius: '50%', background: c.accent }} />}
          </span>
          <div>
            <p className="font-heading text-sm font-bold" style={{ color: THEME.text }}>{title}</p>
            <p className="font-mono text-[9px] tracking-[0.12em]" style={{ color: THEME.secondary }}>{sub}</p>
          </div>
        </div>
        <span className="font-mono text-sm font-bold" style={{ color: priceColor }}>{price}</span>
      </div>
    </button>
  );

  return (
    <div style={{ backgroundColor: THEME.page, color: THEME.text, minHeight: '100vh', paddingBottom: '7rem' }} className="lg:pb-0">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1100px] px-6 pb-2 pt-7 md:px-10">
        <nav className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: THEME.secondary }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <ChevronRight size={11} />
          <Link to="/shop" className="hover:opacity-70">Shop</Link>
          <ChevronRight size={11} />
          <Link to={product.collectionPath} className="hover:opacity-70">{product.categoryLabel}</Link>
          <ChevronRight size={11} />
          <span style={{ color: c.deep }}>{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-[1100px] px-6 py-8 md:px-10 md:py-12">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery — bag product container */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:sticky lg:top-24">
            <RitualProductGallery images={galleryImages} alts={galleryAlts} accent={c.accent} />
          </motion.div>

          {/* Info + purchase */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-torch" style={{ background: `${c.accent}14`, color: c.deep, borderColor: `${c.accent}30` }}>{product.categoryLabel}</span>
              <span className="badge-torch">{product.prep}</span>
            </div>

            <div>
              <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: THEME.text, lineHeight: 1.1 }}>{product.name}</h1>
            </div>

            <p className="font-heading" style={{ color: THEME.secondary, lineHeight: 1.7 }}>{product.description}</p>

            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2 font-heading text-sm" style={{ color: THEME.text }}>
                <Brain size={15} style={{ color: c.accent }} /> {product.positioning}
              </p>
              {product.functionalLabel && (
                <p className="flex items-center gap-2 font-heading text-sm" style={{ color: THEME.text }}>
                  <Leaf size={15} style={{ color: c.accent }} /> {product.functionalLabel}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-serif font-bold" style={{ fontSize: '2rem', color: c.deep }}>${unitPrice.toFixed(2)}</span>
              {isSubscription && <span className="font-mono text-sm line-through" style={{ color: THEME.secondary }}>${product.price.toFixed(2)}</span>}
              <span className="font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: THEME.secondary }}>
                ${(unitPrice / product.servings).toFixed(2)} per cup
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <OptionRow active={isSubscription} onClick={() => setIsSubscription(true)} title="Subscribe & Save 20%" sub="Deliver every 30 days - Pause or cancel anytime" price={`$${subscriptionPrice.toFixed(2)}`} priceColor={THEME.moss} />
              <OptionRow active={!isSubscription} onClick={() => setIsSubscription(false)} title="One-time purchase" sub="Just this order" price={`$${product.price.toFixed(2)}`} priceColor={THEME.text} />
            </div>

            {isSubscription && (
              <p className="font-heading text-xs" style={{ color: THEME.secondary }}>
                Subscribers earn Torch Republic rewards on every delivery.{' '}
                <Link to="/torchbearers-rewards" style={{ color: c.accent, textDecoration: 'underline' }}>Learn more</Link>
              </p>
            )}

            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: THEME.secondary }}>Quantity</span>
              <div className="flex items-center" style={{ border: `1px solid ${THEME.border}`, borderRadius: 8, overflow: 'hidden' }}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 44, height: 44, color: THEME.text, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Decrease quantity"><Minus size={14} /></button>
                <span className="w-12 text-center font-mono text-base" style={{ color: THEME.text }}>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} style={{ width: 44, height: 44, color: THEME.text, background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Increase quantity"><Plus size={14} /></button>
              </div>
              <span className="font-mono text-xs" style={{ color: THEME.secondary }}>${(unitPrice * qty).toFixed(2)} total</span>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => handleAdd(isSubscription ? 'product_pdp_subscribe' : 'product_pdp_onetime')} className="btn w-full" style={{ background: c.accent, borderColor: c.accent, color: '#FFFFFF' }}>
                {justAdded ? (<><Check size={16} /> Added to cart</>) : (<><ShoppingBag size={16} /> Add to Cart</>)}
              </button>
              {justAdded && (
                <p className="text-center font-heading text-sm" style={{ color: THEME.moss }}>
                  Added to your cart. <Link to="/cart" style={{ color: c.accent, textDecoration: 'underline' }}>View cart →</Link>
                </p>
              )}
            </div>

            <Link to="/torchbearers-rewards" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70" style={{ color: THEME.secondary }}>
              <Gift size={13} style={{ color: c.accent }} /> Earn Torch Republic rewards on this purchase
            </Link>

            <div className="grid grid-cols-3 gap-3 pt-2" style={{ borderTop: `1px solid ${THEME.border}` }}>
              {TRUST.map((t) => (
                <div key={t.title} className="flex flex-col items-center gap-1 pt-3 text-center">
                  <t.icon size={18} style={{ color: c.accent }} />
                  <p className="font-heading text-xs font-bold" style={{ color: THEME.text }}>{t.title}</p>
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: THEME.secondary }}>{t.body}</p>
                </div>
              ))}
            </div>

            <p className="text-center font-mono text-[8px] tracking-[0.08em] pt-1" style={{ color: THEME.secondary }}>
              Shipping details &middot; Easy subscription changes &middot;{' '}
              <Link to="/shipping-policy" style={{ color: c.accent, textDecoration: 'underline' }}>See shipping &amp; returns</Link>
            </p>

            <ShareButtons title={`${product.name} — Torch Republic`} url={product.path} />
          </motion.div>
        </div>
      </section>

      <RitualLifestyleBanner
        image={LIFESTYLE_IMAGE[product.category]}
        alt={`${product.name} in a real home ritual setting`}
        accent={c.accent}
        eyebrow={LIFESTYLE_COPY[product.category].eyebrow}
        title={LIFESTYLE_COPY[product.category].title}
        subtitle={LIFESTYLE_COPY[product.category].subtitle}
      />

      <PoweredByNature accent={c.accent} />

      {/* Tabs */}
      <section className="mx-auto max-w-[1100px] px-6 py-10 md:px-10" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <div className="flex gap-6 overflow-x-auto" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} className="whitespace-nowrap pb-3 font-mono text-[10px] uppercase tracking-[0.22em] transition-all" style={{ color: active ? c.deep : THEME.secondary, borderBottom: `2px solid ${active ? c.accent : 'transparent'}`, background: 'none', cursor: 'pointer' }}>
                {t}
              </button>
            );
          })}
        </div>
        <div className="py-6 font-heading text-sm" style={{ color: THEME.secondary, lineHeight: 1.8 }}>
          {tab === 'Ingredients' && (
            <div className="flex flex-col gap-5">
              <p>{INGREDIENTS[product.category]}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: 'Servings', value: `${product.servings} per pouch` },
                  { label: 'Serving size', value: '1 scoop' },
                  { label: 'Caffeine', value: `${product.caffeineLabel} caffeine` },
                  { label: 'Format', value: 'Instant - no machine needed' },
                  ...(product.mushrooms ? [{ label: 'Functional ingredients', value: product.mushrooms }] : []),
                  { label: 'Preparation', value: 'Hot or iced' },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] flex-shrink-0" style={{ color: THEME.secondary, minWidth: '120px' }}>
                      {row.label}
                    </span>
                    <span className="font-heading text-sm" style={{ color: THEME.text }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="font-heading text-xs" style={{ color: THEME.secondary }}>
                <Link to="/shipping-policy" style={{ color: c.accent, textDecoration: 'underline' }}>Shipping &amp; returns</Link>
                {' \u00b7 '}
                <Link to="/return-policy" style={{ color: c.accent, textDecoration: 'underline' }}>Return policy</Link>
              </p>
            </div>
          )}
          {tab === 'Benefits' && (
            <ul className="flex flex-col gap-2">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, marginTop: 8, flexShrink: 0 }} /> {b}
                </li>
              ))}
            </ul>
          )}
          {tab === 'How to Prepare' && <p>{PREP}</p>}
          {tab === 'FAQ' && (
            <div className="flex flex-col gap-5">
              {faqs.map((f, i) => (
                <div key={i}>
                  <p className="mb-1 font-heading text-sm font-bold" style={{ color: THEME.text }}>{f.q}</p>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <RitualMomentStrip
        image="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/634eeca77_generated_image.png"
        alt="Instant coffee flakes stirred into a hot cup"
        accent={c.accent}
        eyebrow="The Ritual"
        title="Your ritual, ready in seconds."
        subtitle="One scoop. A swirl of hot water. A café-quality cup — no machine, no pods, no compromise."
      />

      {/* Quiz callout */}
      <section className="px-6 py-10 md:px-10" style={{ background: THEME.cream }}>
        <div className="mx-auto max-w-[800px]">
          <div className="card-torch flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex-1">
              <p className="font-heading text-sm" style={{ color: THEME.text }}>
                Not sure which ritual fits your morning?
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] mt-1" style={{ color: THEME.secondary }}>
                Take the 60-second quiz
              </p>
            </div>
            <Link to="/quiz" className="btn btn-ghost" style={{ flexShrink: 0 }}>
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Related — only the other two core rituals */}
      <section className="px-6 py-14 md:px-10" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: c.deep }}>Try another ritual</p>
            <h2 className="mt-2 font-serif font-semibold" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: THEME.text }}>You may also like</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((p, i) => (
              <RitualCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-6 pb-16 md:px-10">
        <RecentlyViewed currentSlug={product.slug} />
      </section>

      {/* Mobile sticky purchase bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden" style={{ background: THEME.card, borderTop: `1px solid ${THEME.border}`, padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(45,40,36,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-sm font-bold" style={{ color: THEME.text }}>{product.name}</p>
            <p className="font-mono text-[10px]" style={{ color: c.deep }}>${(unitPrice * qty).toFixed(2)}{isSubscription ? ' · Subscribe & Save' : ''}</p>
          </div>
          <div className="flex items-center" style={{ border: `1px solid ${THEME.border}`, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Decrease quantity"><Minus size={13} /></button>
            <span className="w-9 text-center font-mono text-sm" style={{ color: THEME.text }}>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Increase quantity"><Plus size={13} /></button>
          </div>
          <button onClick={() => handleAdd('product_pdp_sticky')} className="btn" style={{ background: c.accent, borderColor: c.accent, color: '#FFFFFF', flexShrink: 0, padding: '0.6rem 1.1rem' }}>
            {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}