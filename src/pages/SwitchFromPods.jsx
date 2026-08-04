import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import MobileSelectDrawer from '@/components/forms/MobileSelectDrawer';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import NoIndex from '@/components/seo/NoIndex';
import {
  PRICES,
  SUBSCRIPTION_PRICES,
  SUBSCRIPTION_DISCOUNT,
  formatPrice,
} from '@/lib/pricingConfig';
import {
  FREE_SHIPPING_THRESHOLD_DISPLAY,
  GUARANTEE_DAYS,
  SUBSCRIBE_SAVE_PERCENT,
  WELCOME_DISCOUNT_CODE,
  WELCOME_DISCOUNT_PERCENT,
} from '@/lib/siteConfig';

const RG = '#E6B7AD';

// ── Per-serving math derived from live pricing ────────────────────────────
const SUNCAP_SERVINGS = 27;
const SUNCAP_PRICE = PRICES['mushroom-coffee']; // $22.99
const SUNCAP_SUB_PRICE = SUBSCRIPTION_PRICES['mushroom-coffee'];
const SUNCAP_PER_SERVING = (SUNCAP_PRICE / SUNCAP_SERVINGS).toFixed(2);
const SUNCAP_SUB_PER_SERVING = (SUNCAP_SUB_PRICE / SUNCAP_SERVINGS).toFixed(2);

// ── Product pathways ──────────────────────────────────────────────────────
const PATHWAYS = [
  {
    slug: 'torchbearer',
    name: 'Classic Instant Coffee',
    tagline: 'Coffee-forward and familiar',
    detail: 'Bold, smooth premium instant coffee — no machine, no pods.',
    price: PRICES['classic-coffee'],
    subPrice: SUBSCRIPTION_PRICES['classic-coffee'],
    servings: 27,
    category: 'classic-coffee',
    accent: '#D6B27A',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2be7102cc_15.png',
    path: '/shop/instant-coffee',
    cta: 'Shop Instant Coffee',
  },
  {
    slug: 'suncap-rise',
    name: 'Mushroom Coffee',
    tagline: 'Coffee with functional mushroom ingredients',
    detail: "Coffee + Lion's Mane + Chaga. Coffee-forward taste with functional ingredients.",
    price: PRICES['mushroom-coffee'],
    subPrice: SUBSCRIPTION_PRICES['mushroom-coffee'],
    servings: 27,
    category: 'mushroom-coffee',
    accent: '#10B981',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
    path: '/products/suncap-rise',
    cta: 'Shop Mushroom Coffee',
    featured: true,
  },
  {
    slug: 'the-monk-matcha-blend',
    name: 'Ceremonial Matcha',
    tagline: 'Smooth, focused alternative ritual',
    detail: 'Ceremonial-grade matcha for calm, jitter-free focus energy. No coffee, no crash.',
    price: PRICES['matcha'],
    subPrice: SUBSCRIPTION_PRICES['matcha'],
    servings: 25,
    category: 'matcha',
    accent: '#6EE7B7',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ed4b0c26d_18.png',
    path: '/shop/matcha',
    cta: 'Shop Matcha',
  },
];

// ── How-it-works steps ────────────────────────────────────────────────────
const STEPS = [
  { num: '01', label: 'Scoop', body: 'One scoop into your mug.' },
  { num: '02', label: 'Add Hot Water', body: 'Pour 8–10 oz of hot water.' },
  { num: '03', label: 'Stir', body: 'Stir for 5 seconds.' },
  { num: '04', label: 'Enjoy', body: 'Your ritual is ready.' },
];

// ── Coffee Cost Calculator ────────────────────────────────────────────────
function CostCalculator() {
  const [cupsPerDay, setCupsPerDay] = useState(2);
  const [currentCostPerCup, setCurrentCostPerCup] = useState(1.00);
  const [selectedProduct, setSelectedProduct] = useState('mushroom-coffee');
  const [isSubscription, setIsSubscription] = useState(false);

  const trPricePerServing = isSubscription
    ? SUBSCRIPTION_PRICES[selectedProduct] / 27
    : PRICES[selectedProduct] / 27;

  const daysPerMonth = 30;
  const currentMonthlyCost = cupsPerDay * currentCostPerCup * daysPerMonth;
  const trMonthlyCost = cupsPerDay * trPricePerServing * daysPerMonth;
  const monthlySavings = currentMonthlyCost - trMonthlyCost;
  const podsAvoided = cupsPerDay * daysPerMonth;
  const isCheaper = monthlySavings > 0;

  return (
    <div
      className="rounded-sm p-6 md:p-8"
      style={{ background: '#111', border: '1px solid rgba(230,183,173,0.15)' }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>
        Cost Calculator
      </p>
      <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.3rem' }}>
        Compare Your Coffee Cost
      </h3>
      <p className="font-heading text-sm mb-6" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 400 }}>
        Estimates depend on your current coffee, serving size, and consumption. Actual savings vary.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Cups per day */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2" style={{ color: RG }}>
            Cups per day
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCupsPerDay(Math.max(1, cupsPerDay - 1))}
              className="w-8 h-8 flex items-center justify-center font-bold text-lg"
              style={{ background: '#1A1A1A', color: RG, border: '1px solid rgba(230,183,173,0.2)' }}
            >−</button>
            <span className="font-mono text-xl font-bold" style={{ color: '#F5EFE6', minWidth: '2ch', textAlign: 'center' }}>{cupsPerDay}</span>
            <button
              onClick={() => setCupsPerDay(Math.min(10, cupsPerDay + 1))}
              className="w-8 h-8 flex items-center justify-center font-bold text-lg"
              style={{ background: '#1A1A1A', color: RG, border: '1px solid rgba(230,183,173,0.2)' }}
            >+</button>
          </div>
        </div>

        {/* Current cost per cup */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2" style={{ color: RG }}>
            Current cost per cup ($)
          </label>
          <input
            type="number"
            min="0.25"
            max="10"
            step="0.25"
            value={currentCostPerCup}
            onChange={e => setCurrentCostPerCup(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 font-mono text-base"
            style={{
              background: '#1A1A1A',
              border: '1px solid rgba(230,183,173,0.2)',
              color: '#F5EFE6',
              outline: 'none',
            }}
          />
        </div>

        {/* Product selection */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2" style={{ color: RG }}>
            Torch Republic product
          </label>
          <MobileSelectDrawer
            value={selectedProduct}
            onChange={setSelectedProduct}
            options={[
              { value: 'classic-coffee', label: `Classic Instant Coffee — ${formatPrice(PRICES['classic-coffee'])}/tube` },
              { value: 'mushroom-coffee', label: `Mushroom Coffee — ${formatPrice(PRICES['mushroom-coffee'])}/tube` },
              { value: 'matcha', label: `Ceremonial Matcha — ${formatPrice(PRICES['matcha'])}/tube` },
            ]}
            title="Choose product"
            className="px-3 py-2 font-mono text-sm"
            style={{
              background: '#1A1A1A',
              border: '1px solid rgba(230,183,173,0.2)',
              color: '#F5EFE6',
              outline: 'none',
            }}
          />
        </div>

        {/* Purchase type */}
        <div>
          <label className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-2" style={{ color: RG }}>
            Purchase type
          </label>
          <div className="flex gap-2">
            {[
              { val: false, label: 'One-Time' },
              { val: true, label: `Subscribe & Save ${SUBSCRIBE_SAVE_PERCENT}%` },
            ].map(opt => (
              <button
                key={String(opt.val)}
                onClick={() => setIsSubscription(opt.val)}
                className="flex-1 py-2 font-mono text-[9px] tracking-[0.1em] uppercase font-bold transition-all"
                style={{
                  background: isSubscription === opt.val ? RG : '#1A1A1A',
                  color: isSubscription === opt.val ? '#080808' : RG,
                  border: `1px solid ${isSubscription === opt.val ? RG : 'rgba(230,183,173,0.2)'}`,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div
        className="p-5 rounded-sm"
        style={{ background: '#0A0807', border: '1px solid rgba(230,183,173,0.1)' }}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,235,225,0.5)' }}>
              Your current est. monthly cost
            </p>
            <p className="font-mono text-2xl font-bold" style={{ color: '#F5EFE6' }}>
              {formatPrice(currentMonthlyCost)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Torch Republic est. monthly cost
            </p>
            <p className="font-mono text-2xl font-bold" style={{ color: RG }}>
              {formatPrice(trMonthlyCost)}
            </p>
          </div>
        </div>

        {isCheaper ? (
          <div className="pt-4" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1" style={{ color: '#10B981' }}>
              Estimated monthly difference
            </p>
            <p className="font-mono text-xl font-bold" style={{ color: '#10B981' }}>
              Save ~{formatPrice(monthlySavings)}/mo
            </p>
            <p className="font-mono text-[9px] mt-1" style={{ color: 'rgba(240,235,225,0.5)' }}>
              ~{podsAvoided} pods avoided per month
            </p>
          </div>
        ) : (
          <div className="pt-4" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase mb-3" style={{ color: RG }}>
              Why switch even when the math is close?
            </p>
            <ul className="space-y-1">
              {[
                'No machine or counter space required',
                'Fewer single-use components — less pod waste',
                'Easy preparation at home, work, or while traveling',
                'Premium ingredients in every cup',
                `Subscription convenience — save ${SUBSCRIBE_SAVE_PERCENT}% with Subscribe & Save`,
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: RG }} />
                  <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 400 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="font-mono text-[8px] mt-4 leading-relaxed" style={{ color: 'rgba(240,235,225,0.35)' }}>
          Estimates are based on {cupsPerDay} cup{cupsPerDay !== 1 ? 's' : ''}/day × 30 days at your entered cost.
          Torch Republic price assumes {isSubscription ? `${SUBSCRIBE_SAVE_PERCENT}% subscription discount applied` : 'one-time purchase'}.
          Actual results vary by serving size and usage.
        </p>
      </div>
    </div>
  );
}

// ── Sticky mobile buy bar ─────────────────────────────────────────────────
function StickyBar({ visible }) {
  const { addItem } = useCart();
  const handleAdd = () => {
    addItem({
      id: 'suncap-rise',
      name: 'SunCap Rise',
      price: SUNCAP_PRICE,
      image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
      category: 'mushroom-coffee',
      shopifyHandle: 'suncap-rise',
    });
  };

  if (!visible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3"
      style={{ background: '#0D0C0B', borderTop: '1px solid rgba(230,183,173,0.2)', paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[9px] tracking-[0.12em] uppercase truncate" style={{ color: RG }}>SunCap Rise · Mushroom Coffee</p>
        <p className="font-mono text-[11px] font-bold" style={{ color: '#F5EFE6' }}>{formatPrice(SUNCAP_PRICE)} one-time · {formatPrice(SUNCAP_SUB_PRICE)} with sub</p>
      </div>
      <button
        onClick={handleAdd}
        className="flex-shrink-0 flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-3"
        style={{ background: RG, color: '#080808' }}
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        Add to Cart
      </button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function SwitchFromPods() {
  const [pastProducts, setPastProducts] = useState(false);
  const { addItem } = useCart();

  useSEO({
    title: 'Ditch the Pods. Keep the Convenience. | Torch Republic',
    description: 'Premium instant coffee and mushroom coffee ready in seconds — without a pod machine or single-use capsules. No machine needed. 27 servings. Subscribe & save 20%.',
    url: '/switch-from-pods',
    type: 'website',
  });

  useEffect(() => {
    const onScroll = () => setPastProducts(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAdd = (product) => {
    addItem({
      id: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      shopifyHandle: product.slug,
    });
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: product.price,
        items: [{ item_id: product.slug, item_name: product.name, price: product.price, quantity: 1 }],
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="px-6 md:px-10 pt-16 pb-12 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: RG }}>
          NO MACHINE. NO PODS. NO COMPLICATED ROUTINE.
        </p>
        <h1
          className="font-serif font-bold mb-5 mx-auto"
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
            color: '#F5EFE6',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            maxWidth: '720px',
          }}
        >
          Ditch the Pods.{' '}
          <span style={{ color: RG }}>Keep the Convenience.</span>
        </h1>
        <p
          className="font-heading mb-8 mx-auto"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'rgba(245,239,230,0.85)',
            fontWeight: 400,
            lineHeight: 1.75,
            maxWidth: '500px',
          }}
        >
          Premium instant coffee and mushroom coffee ready in seconds—without a pod machine or a pile of single-use capsules.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
          <Link
            to="/shop/instant-coffee"
            className="font-mono text-[12px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90 w-full sm:w-auto text-center"
            style={{ background: RG, color: '#080808', padding: '16px 40px', display: 'inline-block', minHeight: '52px', lineHeight: '20px' }}
            onClick={() => window.gtag && window.gtag('event', 'select_content', { content_type: 'cta', item_id: 'switch-pods-hero-instant' })}
          >
            SHOP INSTANT COFFEE
          </Link>
          <Link
            to="/shop/instant-mushroom-coffee"
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-75 w-full sm:w-auto text-center"
            style={{ border: '1px solid rgba(230,183,173,0.35)', color: RG, padding: '16px 32px', display: 'inline-block', minHeight: '52px', lineHeight: '20px' }}
            onClick={() => window.gtag && window.gtag('event', 'select_content', { content_type: 'cta', item_id: 'switch-pods-hero-mushroom' })}
          >
            EXPLORE MUSHROOM COFFEE
          </Link>
        </div>

        {/* Welcome offer */}
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.7)' }}>
          Use <strong style={{ color: RG }}>{WELCOME_DISCOUNT_CODE}</strong> for {WELCOME_DISCOUNT_PERCENT}% off your first order
        </p>
      </section>

      {/* ── QUICK TRUST ──────────────────────────────────── */}
      <div
        className="px-5 py-3"
        style={{ background: '#0D0C0B', borderTop: '1px solid rgba(230,183,173,0.1)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 max-w-[900px] mx-auto">
          {[
            'Ready in seconds',
            '27 servings per container',
            'No coffee machine required',
            'Easy at home, work, or traveling',
            `Subscribe & Save ${SUBSCRIBE_SAVE_PERCENT}%`,
            `Free shipping ${FREE_SHIPPING_THRESHOLD_DISPLAY}`,
            `${GUARANTEE_DAYS}-day guarantee`,
          ].map((item, i, arr) => (
            <React.Fragment key={item}>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase" style={{ color: 'rgba(230,183,173,0.9)' }}>{item}</span>
              {i < arr.length - 1 && <span style={{ color: 'rgba(230,183,173,0.25)', fontSize: '0.55rem' }}>·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0807' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: RG }}>
              As Simple as It Gets
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#F5EFE6' }}>
              Ready in 4 Steps
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center p-5" style={{ background: '#111', border: '1px solid rgba(230,183,173,0.08)' }}>
                <p className="font-mono text-2xl font-bold mb-2" style={{ color: RG }}>{step.num}</p>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase font-bold mb-2" style={{ color: '#F5EFE6' }}>{step.label}</p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 400 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PATHWAYS ───────────────────────────────── */}
      <section id="products" className="px-6 md:px-10 py-16" style={{ background: '#080808' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: RG }}>
              Three Pathways
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#F5EFE6' }}>
              Find Your Ritual
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PATHWAYS.map((p, i) => {
              const perServing = (p.price / p.servings).toFixed(2);
              const subPerServing = (p.subPrice / p.servings).toFixed(2);
              return (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col relative"
                  style={{
                    background: p.featured ? 'rgba(16,185,129,0.04)' : '#141312',
                    border: p.featured ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(230,183,173,0.1)',
                  }}
                >
                  {p.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1" style={{ background: '#10B981', color: '#080808' }}>
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold">Featured — SunCap Rise</p>
                    </div>
                  )}

                  {/* Product image */}
                  <div className="flex items-center justify-center p-6 pb-0" style={{ height: '200px' }}>
                    <img
                      src={p.image}
                      alt={`${p.name} by Torch Republic`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      width="180"
                      height="180"
                      className="object-contain max-h-full"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col gap-3">
                    <div>
                      <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.1rem' }}>{p.name}</h3>
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: p.accent }}>{p.tagline}</p>
                    </div>
                    <p className="font-heading text-sm flex-1" style={{ color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.75 }}>
                      {p.detail}
                    </p>

                    {/* Pricing */}
                    <div className="pt-3" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
                      <p className="font-mono text-lg font-bold" style={{ color: RG }}>{formatPrice(p.price)}</p>
                      <p className="font-mono text-[9px] mb-0.5" style={{ color: 'rgba(230,183,173,0.6)' }}>
                        ${perServing}/serving · {p.servings} servings
                      </p>
                      <p className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.5)' }}>
                        {formatPrice(p.subPrice)}/mo with Subscribe &amp; Save ({SUBSCRIBE_SAVE_PERCENT}% off)
                        · ${subPerServing}/serving
                      </p>
                    </div>

                    {/* Buttons */}
                    <button
                      onClick={() => handleAdd(p)}
                      className="w-full flex items-center justify-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase font-bold py-3 transition-all hover:opacity-85"
                      style={{ background: RG, color: '#080808' }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                    <Link
                      to={p.path}
                      className="text-center font-mono text-[9px] tracking-[0.15em] uppercase transition-all hover:opacity-75"
                      style={{ color: p.accent, textDecoration: 'none' }}
                    >
                      {p.cta} →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SunCap Rise spotlight ─────────────────────────── */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0807' }}>
        <div className="max-w-[900px] mx-auto">
          <div
            className="rounded-sm p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center"
            style={{ background: '#111', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <div className="flex-shrink-0 flex items-center justify-center" style={{ width: '160px', height: '160px' }}>
              <img
                src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988"
                alt="SunCap Rise mushroom coffee by Torch Republic"
                loading="lazy"
                width="160"
                height="160"
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: '#10B981' }}>
                Featured Product
              </p>
              <h2 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>
                SunCap Rise
              </h2>
              <p className="font-heading mb-4" style={{ fontSize: '0.95rem', color: 'rgba(245,239,230,0.85)', fontWeight: 400, lineHeight: 1.75 }}>
                Morning mushroom coffee with Lion's Mane and Chaga. Coffee-forward taste, functional ingredients, ready in seconds.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-5">
                {[
                  `${formatPrice(SUNCAP_PRICE)} one-time — $${SUNCAP_PER_SERVING}/serving`,
                  `${formatPrice(SUNCAP_SUB_PRICE)}/mo with Subscribe & Save — $${SUNCAP_SUB_PER_SERVING}/serving`,
                  '27 servings per tube',
                  "Lion's Mane + Chaga",
                ].map(item => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'rgba(240,235,225,0.8)' }}>{item}</span>
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleAdd(PATHWAYS[1])}
                  className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-3 transition-all hover:opacity-85"
                  style={{ background: RG, color: '#080808' }}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
                <Link
                  to="/products/suncap-rise"
                  className="flex items-center justify-center font-mono text-[10px] tracking-[0.2em] uppercase px-6 py-3 transition-all hover:opacity-75"
                  style={{ border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', textDecoration: 'none' }}
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COST CALCULATOR ──────────────────────────────── */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#080808' }}>
        <div className="max-w-[860px] mx-auto">
          <CostCalculator />
        </div>
      </section>

      {/* ── GUARANTEE & TRUST ────────────────────────────── */}
      <section className="px-6 md:px-10 py-12" style={{ background: '#0A0807', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: `${GUARANTEE_DAYS}-Day Guarantee`, sub: 'Not right? We make it right.' },
            { label: `Free Shipping ${FREE_SHIPPING_THRESHOLD_DISPLAY}`, sub: 'Ships 1–2 business days.' },
            { label: `Subscribe & Save ${SUBSCRIBE_SAVE_PERCENT}%`, sub: 'Cancel anytime.' },
            { label: 'Secure Shopify Checkout', sub: 'Shop Pay accepted.' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: RG }}>{item.label}</p>
              <p className="font-heading text-sm mt-1" style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 400 }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ background: '#080808' }}>
        <div className="max-w-[600px] mx-auto">
          <h2 className="font-serif font-bold text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)' }}>
            Ready to Ditch the Pods?
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: 'rgba(245,239,230,0.8)', fontWeight: 400, lineHeight: 1.8 }}>
            Premium instant coffee, mushroom coffee, and ceremonial matcha — no machine required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-10 py-4 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}
            >
              SHOP ALL PRODUCTS →
            </Link>
            <Link
              to="/build-your-ritual"
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 transition-all hover:opacity-75"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}
            >
              Build a Bundle →
            </Link>
          </div>
        </div>
      </section>

      <StickyBar visible={pastProducts} />
    </div>
  );
}