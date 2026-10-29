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
import BrewingGuide from '@/components/products/BrewingGuide';
import PurchaseOptionSelector from '@/components/products/PurchaseOptionSelector';

const COFFEE_FLAKES = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/634eeca77_generated_image.png';

// Current bag photography supplied for the storefront refresh (1600×1600).
const CLASSIC_LIFESTYLE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/620fb687d_torch-republic-classic-lifestyle-1600.png';
const MUSHROOM_LIFESTYLE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7b9372bd1_torch-republic-mushroom-lifestyle-1600.png';

// "Your ritual, ready in seconds." imagery — the current bag in a real home
// ritual setting for the two core coffees; flakes for every other product.
const RITUAL_MOMENT = {
  'classic-coffee': {
    src: CLASSIC_LIFESTYLE,
    alt: 'Torch Republic Instant Classic Coffee pouch beside a steaming mug of black coffee on a rustic kitchen table',
  },
  'mushroom-coffee': {
    src: MUSHROOM_LIFESTYLE,
    alt: 'Torch Republic Instant Mushroom Coffee pouch beside a mug of coffee, books and a notebook on a wooden table',
  },
};

const LIFESTYLE_IMAGE = {
  'mushroom-coffee': null,
  'classic-coffee': null,
  'pumpkin-spice':
    'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f9c58b8b7_file_00000000eb7481f68fa2a08c4f327f49.png',
  'bundle': null,
};

// Extra gallery images per category (the real bag is always image #0).
// ONLY single-product shots — no group / lineup / collage images.
const GALLERY_EXTRA = {
  'mushroom-coffee': {
    images: [
      MUSHROOM_LIFESTYLE,
      COFFEE_FLAKES,
    ],
    alts: [
      'Torch Republic Instant Mushroom Coffee pouch beside a mug of coffee, books and a notebook on a wooden table',
      'Instant coffee flakes, shown close up',
    ],
  },
  'classic-coffee': {
    images: [
      CLASSIC_LIFESTYLE,
      COFFEE_FLAKES,
    ],
    alts: [
      'Torch Republic Instant Classic Coffee pouch beside a steaming mug of black coffee on a rustic kitchen table',
      'Instant coffee flakes, shown close up',
    ],
  },
  'pumpkin-spice': {
    images: [
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f9c58b8b7_file_00000000eb7481f68fa2a08c4f327f49.png',
    ],
    alts: [
      'Pumpkin Spice Whole Bean Coffee in an autumn scene with whipped cream coffee, cinnamon, and roasted beans',
    ],
  },
  'bundle': {
    images: [],
    alts: [],
  },
};

const LIFESTYLE_COPY = {
  'mushroom-coffee': { eyebrow: 'For focus', title: 'Mushrooms, blended into real coffee.', subtitle: 'Functional mushroom extracts in a smooth instant coffee. Just add hot water.' },
  'classic-coffee': { eyebrow: 'Straight coffee', title: 'Premium Arabica, nothing added.', subtitle: 'Smooth instant coffee. Just add hot water.' },
  'pumpkin-spice': { eyebrow: 'Seasonal, for a short while', title: 'Whole beans, pumpkin spice, one batch.', subtitle: 'A limited-edition whole bean roast for crisp fall mornings. Here for spooky season only.' },
  'bundle': { eyebrow: 'Both coffees', title: 'Keep one of each in the cupboard.', subtitle: 'Two complementary instant coffees in one bundle. The everyday cup, plus the one with mushrooms.' },
};
import { useSEO } from '@/hooks/useSEO';
// FreeGiftBanner removed — promotion stack cleanup per profit-first audit.
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
  { icon: Truck, title: 'Free shipping', body: '$50+' },
  { icon: RotateCcw, title: 'First Cup Guarantee', body: '30 days on your first order' },
  { icon: ShieldCheck, title: 'Secure checkout', body: 'Shop with confidence' },
];

// Verified ingredient lists (matches live BlendDetail copy — no invented claims).
const INGREDIENTS = {
  'classic-coffee':
    'Premium Arabica instant coffee. No artificial colors, flavors, or preservatives.',
  'mushroom-coffee':
    "Premium instant coffee with organic Lion's Mane, Cordyceps and Reishi mushroom extracts. No artificial colors, flavors, or preservatives.",
  'pumpkin-spice':
    'Whole bean Arabica coffee with natural pumpkin spice flavor. Cinnamon, nutmeg, and cozy autumn spices. No artificial colors or preservatives.',
  'bundle':
    'Two bags: Instant Classic Coffee (premium Arabica instant coffee) and Instant Mushroom Coffee (premium instant coffee blended with functional mushroom extracts). No artificial colors, flavors, or preservatives.',
};

const PREP_INSTANT =
  'Add one serving to 8–12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. For iced: dissolve in 2–3 oz hot water first, then pour over ice.';

const PREP_WHOLE_BEAN =
  'Grind beans to your preferred consistency just before brewing. Use 2 tablespoons of ground coffee per 6 oz of water. Brew it however you normally brew: drip, French press, pour-over, or espresso. For the best flavor, grind fresh and brew with water just off the boil.';

const prepFor = (p) => (p.format === 'Whole Bean' ? PREP_WHOLE_BEAN : PREP_INSTANT);

const TABS = ["What's in Your Cup", 'Benefits', 'How to Prepare', 'FAQ'];

function benefitsFor(p) {
  const list = [p.positioning];
  if (p.functionalLabel) list.push(p.functionalLabel);
  list.push(`${p.caffeineLabel} caffeine`);
  if (p.format === 'Whole Bean') {
    list.push(p.weight);
    list.push('Limited batch release');
  } else {
    list.push(`${p.servings} servings`);
    list.push('Instant, no machine needed');
  }
  return list;
}

function faqsFor(p) {
  if (p.format === 'Whole Bean') {
    return [
      { q: `What does ${p.name} taste like?`, a: `${p.flavorLabel}.` },
      { q: 'How do I prepare it?', a: prepFor(p) },
      { q: 'Is it instant?', a: 'No. This is a seasonal whole bean coffee, a departure from our instant lineup. You will need a grinder and a brewer for this one.' },
      { q: 'How much coffee is included?', a: `${p.weight} whole bean. Approximately ${p.servings} cups depending on your brew strength.` },
      { q: 'Is it limited edition?', a: 'Yes. This is a Halloween Special Edition, available for a limited time during the fall season.' },
      { q: 'Does it contain caffeine?', a: 'Yes, this is a caffeinated whole bean coffee.' },
    ];
  }
  return [
    { q: `What does ${p.name} taste like?`, a: `${p.flavorLabel}.` },
    { q: 'How do I prepare it?', a: prepFor(p) },
    { q: 'Is it instant?', a: 'Yes. This product is instant. No machine, grinder, or pods needed. Just add hot water and stir.' },
    { q: 'How many servings are included?', a: p.category === 'bundle' ? `${p.servings} servings total across two bags (27 per bag).` : `${p.servings} servings per bag.` },
    { q: 'Does it contain caffeine?', a: 'Yes, these blends contain caffeine from the premium instant coffee base.' },
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
  const [purchaseMode, setPurchaseMode] = useState({
    mode: 'onetime',
    sellingPlanId: null,
    price: product.price,
    sellingPlanName: null,
  });
  const isSubscription = purchaseMode.mode === 'subscription';
  const [tab, setTab] = useState("What's in Your Cup");
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = purchaseMode.price;
  const imageUrl = getProductImage(product);
  const imageAlt = getProductAltText(product, `${product.name} by Torch Republic`);
  const galleryImages = [imageUrl, ...GALLERY_EXTRA[product.category].images];
  const galleryAlts = [imageAlt, ...GALLERY_EXTRA[product.category].alts];
  const faqs = faqsFor(product);
  const benefits = benefitsFor(product);
  const related = otherRituals(product.ritualKey);

  const SEO_META = {
    'instant-classic-coffee': {
      title: 'Instant Classic Coffee | Torch Republic',
      description: 'Bold, smooth instant Arabica coffee. No pods or equipment required.',
    },
    'instant-mushroom-coffee': {
      title: 'Instant Mushroom Coffee | Torch Republic',
      description: 'Smooth instant coffee blended with functional mushroom extracts for an easy, balanced daily ritual.',
    },
    'pumpkin-spice-whole-bean-coffee': {
      title: 'Pumpkin Spice Whole Bean Coffee | Halloween Special Edition | Torch Republic',
      description: 'A limited-edition seasonal whole bean roast, warm and spiced for crisp mornings. Here for spooky season only.',
    },
    'torch-republic-coffee-duo': {
      title: 'Coffee Duo | Torch Republic',
      description: 'Two complementary instant coffees in one bundle. Classic + Mushroom. Bold everyday ritual plus focused clarity.',
    },
  };
  const seoMeta = SEO_META[product.slug] || { title: `${product.name} | Torch Republic`, description: product.description };

  useSEO({
    title: seoMeta.title,
    description: seoMeta.description,
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
      { id: product.id, name: product.name, price: unitPrice, image: imageUrl, category: product.category, servings: product.servings, shopifyHandle: product.shopifyHandle, isSubscription, sellingPlanId: purchaseMode.sellingPlanId, sellingPlanName: purchaseMode.sellingPlanName },
      qty
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  return (
    <div style={{ backgroundColor: THEME.page, color: THEME.text, minHeight: '100vh', paddingBottom: '7rem' }} className="lg:pb-0">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1100px] px-6 pb-2 pt-7 md:px-10">
        <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em]" style={{ color: THEME.secondary }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <ChevronRight size={11} />
          <Link to="/shop" className="hidden hover:opacity-70 sm:block">Shop</Link>
          <ChevronRight size={11} className="hidden sm:block" />
          <Link to={product.collectionPath} className="hidden hover:opacity-70 sm:block">{product.categoryLabel}</Link>
          <ChevronRight size={11} className="hidden sm:block" />
          <span className="min-w-0 truncate" style={{ color: c.deep }}>{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="mx-auto max-w-[1100px] px-5 py-4 md:px-10 md:py-12">
        <div className="grid grid-cols-1 items-start gap-5 lg:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery — bag product container */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:sticky lg:top-24">
            <RitualProductGallery images={galleryImages} alts={galleryAlts} accent={c.accent} />
          </motion.div>

          {/* Info + purchase */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="flex flex-col gap-4 md:gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-torch" style={{ background: `${c.accent}14`, color: c.deep, borderColor: `${c.accent}30` }}>{product.categoryLabel}</span>
              <span className="badge-torch">{product.prep}</span>
            </div>

            <div>
              <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: THEME.text, lineHeight: 1.18 }}>{product.name}</h1>
              {/* The everyday lineup is instant and nothing else — stated on the
                  product page as well as on every card. */}
              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.14em]" style={{ color: c.deep }}>
                Instant only &middot; just add water
              </p>
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
              <span className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: THEME.secondary }}>
                ${(unitPrice / product.servings).toFixed(2)} per cup
              </span>
            </div>

            <PurchaseOptionSelector product={product} onChange={setPurchaseMode} accent={c.accent} />

            <div className="flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: THEME.secondary }}>Quantity</span>
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

            <Link to="/torchbearers-rewards" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] transition-opacity hover:opacity-70" style={{ color: THEME.secondary }}>
              <Gift size={13} style={{ color: c.accent }} /> Earn Republic Rewards on this purchase
            </Link>

            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
              {TRUST.map((t) => (
                <div key={t.title} className="flex flex-col items-center gap-1.5 pt-4 text-center">
                  <t.icon size={22} style={{ color: c.accent }} strokeWidth={1.75} />
                  <p className="font-heading text-xs font-bold" style={{ color: THEME.text }}>{t.title}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: THEME.secondary }}>{t.body}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <ShareButtons title={`${product.name} | Torch Republic`} url={product.path} />
              <Link to="/shipping-policy" className="font-mono text-xs uppercase tracking-[0.1em] transition-opacity hover:opacity-70" style={{ color: c.accent }}>
                Shipping &amp; returns
              </Link>
            </div>
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

      <PoweredByNature accent={c.accent} format={product.format} />

      {/* Tabs */}
      <section className="mx-auto max-w-[1100px] px-6 py-10 md:px-10" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <div className="flex gap-6 overflow-x-auto" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          {TABS.map((t) => {
            const active = tab === t;
            return (
              <button key={t} onClick={() => setTab(t)} className="whitespace-nowrap pb-3 font-mono text-xs uppercase tracking-[0.1em] transition-all" style={{ color: active ? c.deep : THEME.secondary, borderBottom: `2px solid ${active ? c.accent : 'transparent'}`, background: 'none', cursor: 'pointer' }}>
                {t}
              </button>
            );
          })}
        </div>
        <div className="py-6 font-heading text-sm" style={{ color: THEME.secondary, lineHeight: 1.8 }}>
          {tab === "What's in Your Cup" && (
            <div className="flex flex-col gap-5">
              <p>{INGREDIENTS[product.category]}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { label: product.format === 'Whole Bean' ? 'Weight' : 'Servings', value: product.format === 'Whole Bean' ? product.weight : product.category === 'bundle' ? `${product.servings} total across two bags (27 per bag)` : `${product.servings} per pouch` },
                  { label: 'Serving size', value: product.format === 'Whole Bean' ? '2 tbsp ground' : '1 scoop' },
                  { label: 'Caffeine', value: `${product.caffeineLabel} caffeine` },
                  { label: 'Format', value: product.format === 'Whole Bean' ? 'Whole bean' : 'Instant, no machine needed' },
                  ...(product.mushrooms ? [{ label: 'Functional ingredients', value: product.mushrooms }] : []),
                  { label: 'Preparation', value: product.format === 'Whole Bean' ? 'Grind and brew' : 'Hot or iced' },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.08em] flex-shrink-0" style={{ color: THEME.secondary, minWidth: '120px' }}>
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
          {tab === 'How to Prepare' && (
            <div className="flex flex-col gap-3">
              <p>{prepFor(product)}</p>
              <p className="font-heading text-sm" style={{ color: THEME.secondary }}>
                See the full brewing guide with step-by-step instructions below.
              </p>
            </div>
          )}
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

      {product.format !== 'Whole Bean' && (
        <BrewingGuide accent={c.accent} deep={c.deep} productName={product.name} />
      )}

      {product.format !== 'Whole Bean' && (
        <RitualMomentStrip
          image={RITUAL_MOMENT[product.category]?.src || COFFEE_FLAKES}
          alt={RITUAL_MOMENT[product.category]?.alt || 'Instant coffee flakes stirred into a hot cup'}
          accent={c.accent}
          eyebrow="The Ritual"
          title="Ready in about ten seconds."
          subtitle="One scoop, hot water, a quick stir. No machine, no pods, nothing to clean up."
        />
      )}

      {product.format === 'Whole Bean' && (
        <section className="mx-auto max-w-[1100px] px-6 py-10 md:px-10">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: c.deep }}>A Seasonal Departure</p>
            <h2 className="mt-3 font-serif font-semibold" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: THEME.text }}>This one is not instant.</h2>
            <p className="mx-auto mt-4 max-w-xl font-heading" style={{ color: THEME.secondary, lineHeight: 1.7 }}>
              Everything else we make is a scoop and hot water. This Halloween drop is a different kind of morning: whole beans, pumpkin spice, and whatever brewer you already own. One batch, one season.
            </p>
          </div>
        </section>
      )}

      {/* Quiz callout */}
      <section className="px-6 py-14 md:px-10" style={{ background: THEME.cream, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
        <div className="mx-auto max-w-[800px] text-center">
          <p className="font-serif font-semibold" style={{ fontSize: '1.35rem', color: THEME.text }}>Not sure which ritual fits your morning?</p>
          <p className="font-heading text-sm mt-2" style={{ color: THEME.secondary }}>Take the 60-second quiz and find your match.</p>
          <Link to="/quiz" className="btn btn-ghost mt-5" style={{ flexShrink: 0, color: c.deep, borderColor: `${c.accent}50` }}>
            Take the Quiz
          </Link>
        </div>
      </section>

      {/* Related — only the other two core rituals */}
      <section className="px-6 py-14 md:px-10" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: c.deep }}>Try another ritual</p>
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
            <p className="font-mono text-xs" style={{ color: c.deep }}>${(unitPrice * qty).toFixed(2)}{isSubscription ? ' · Subscribe & Save' : ''}</p>
          </div>
          <div className="flex items-center" style={{ border: `1px solid ${THEME.border}`, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Decrease quantity"><Minus size={13} /></button>
            <span className="w-9 text-center font-mono text-sm" style={{ color: THEME.text }}>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} style={{ width: 38, height: 42, color: THEME.text, background: 'none', border: 'none' }} aria-label="Increase quantity"><Plus size={13} /></button>
          </div>
          <button aria-label={justAdded ? 'Added to cart' : `Add ${product.name} to cart`} onClick={() => handleAdd('product_pdp_sticky')} className="btn" style={{ background: c.accent, borderColor: c.accent, color: '#FFFFFF', flexShrink: 0, padding: '0.6rem 1.1rem' }}>
            {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}