import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { BUNDLE_PRICE_3 } from '@/lib/pricingConfig';

const RG = '#B86543';
const THEME = {
  page: '#F7F1E7',
  cream: '#FBF8F1',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#D9CDBA',
};

const STARTER_BUNDLE_PRICE = BUNDLE_PRICE_3; // single source of truth (pricingConfig)
const STARTER_REGULAR = CORE_PRODUCTS.reduce((s, p) => s + p.price, 0); // 67.97
const STARTER_SAVINGS = STARTER_REGULAR - STARTER_BUNDLE_PRICE; // dynamic

const categoryLabel = (c) =>
  c === 'classic-coffee' ? 'Classic Coffee' : 'Mushroom Coffee';

export default function BuildYourRitual() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(() =>
    Object.fromEntries(CORE_PRODUCTS.map((p) => [p.slug, 0]))
  );

  useSEO({
    title: 'Build Your Ritual | Coffee & Mushroom Coffee Bundle',
    description:
      'Build your own ritual with Instant Classic Coffee and Instant Mushroom Coffee. Bundle both and save.',
    url: '/build-your-ritual',
  });

  const bagCount = useMemo(
    () => Object.values(qty).reduce((s, n) => s + n, 0),
    [qty]
  );
  const regularTotal = useMemo(
    () => CORE_PRODUCTS.reduce((s, p) => s + qty[p.slug] * p.price, 0),
    [qty]
  );
  const isStarterCombo =
    qty['instant-classic-coffee'] === 1 &&
    qty['instant-mushroom-coffee'] === 1;
  const subtotal = isStarterCombo ? STARTER_BUNDLE_PRICE : regularTotal;
  const savings = isStarterCombo ? STARTER_SAVINGS : 0;

  const setQtyFor = (slug, delta) =>
    setQty((prev) => ({ ...prev, [slug]: Math.max(0, (prev[slug] || 0) + delta) }));

  // Start My Ritual — adds exactly the three current products (one each).
  const startStarterRitual = () => {
    CORE_PRODUCTS.forEach((p) => addItem(p, 1));
    navigate('/cart');
  };

  // Add Bundle to Cart — adds the custom selection.
  const addCustomBundle = () => {
    if (bagCount === 0) return;
    CORE_PRODUCTS.forEach((p) => {
      if (qty[p.slug] > 0) addItem(p, qty[p.slug]);
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pb-28 md:pb-16" style={{ background: THEME.page, color: THEME.text }}>
      {/* Heading */}
      <section className="px-6 md:px-10 pt-12 pb-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: RG }}>
            Build Your Ritual
          </p>
          <h1 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: THEME.text }}>
            Build Your Ritual
          </h1>
          <p className="font-heading max-w-xl mx-auto" style={{ fontSize: '0.95rem', color: THEME.secondary, lineHeight: 1.7 }}>
            Choose Instant Classic Coffee and Instant Mushroom Coffee &mdash; together or on their own.
          </p>
        </div>
      </section>

      {/* Featured Starter Ritual Bundle */}
      <section className="px-6 md:px-10 pb-10">
        <div className="max-w-[900px] mx-auto">
          <div className="overflow-hidden" style={{ background: THEME.card, border: `1px solid ${THEME.border}`, boxShadow: '0 12px 40px rgba(53,38,29,0.06)' }}>
            <div className="px-6 py-2" style={{ background: RG }}>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold text-center" style={{ color: THEME.cream }}>
                &#10022; Featured Starter Ritual Bundle
              </p>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: THEME.text }}>
                    The Starter Ritual Bundle
                  </h2>
                  <ul className="space-y-1.5 mb-5">
                    {CORE_PRODUCTS.map((p) => (
                      <li key={p.slug} className="flex items-center gap-2">
                        <span style={{ color: RG }}>&#10022;</span>
                        <span className="font-mono text-[10px] tracking-[0.1em]" style={{ color: THEME.secondary }}>
                          1 {p.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-baseline gap-3 mb-1">
                    <span className="font-serif font-bold" style={{ fontSize: '1.6rem', color: RG }}>
                      ${STARTER_BUNDLE_PRICE.toFixed(2)}
                    </span>
                    <span className="font-mono text-[10px] line-through" style={{ color: '#9A9085' }}>
                      ${STARTER_REGULAR.toFixed(2)}
                    </span>
                    <span
                      className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981', border: '1px solid rgba(16,185,129,0.3)' }}
                    >
                      Save ${STARTER_SAVINGS.toFixed(2)}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] mb-5" style={{ color: '#7A6E64' }}>
                    One of each &middot; 79 servings total &middot; No machine needed
                  </p>
                  <button
                    onClick={startStarterRitual}
                    className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
                    style={{ background: RG, color: THEME.cream }}
                  >
                    Start My Ritual &rarr;
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {CORE_PRODUCTS.map((p) => (
                    <div key={p.slug} className="flex flex-col items-center text-center p-3" style={{ background: THEME.cream, border: `1px solid ${THEME.border}` }}>
                      <div className="w-full" style={{ aspectRatio: '1/1', background: '#F8F5EF' }}>
                        <img src={p.image} alt={p.alt} className="w-full h-full object-contain p-2" loading="lazy" />
                      </div>
                      <p className="font-serif font-bold text-[11px] mt-2 leading-tight" style={{ color: THEME.text }}>
                        {p.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Build Your Own Ritual */}
      <section className="px-6 md:px-10 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-6 text-center">
            <h2 className="font-serif font-bold mb-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: THEME.text }}>
              Build Your Own Ritual
            </h2>
            <p className="font-heading" style={{ color: THEME.secondary, fontSize: '0.9rem' }}>
              Add as many of each as you like. One of each unlocks the Starter Ritual Bundle price.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CORE_PRODUCTS.map((p) => {
                const c = p.ritual;
                return (
                  <div key={p.slug} className="flex flex-col p-4" style={{ background: THEME.card, border: `1px solid ${THEME.border}` }}>
                    <div className="w-full mb-3" style={{ aspectRatio: '1/1', background: '#F8F5EF' }}>
                      <img src={p.image} alt={p.alt} className="w-full h-full object-contain p-3" loading="lazy" />
                    </div>
                    <h3 className="font-serif font-bold text-sm leading-tight" style={{ color: THEME.text }}>{p.name}</h3>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: c.accent }}>
                      {categoryLabel(p.category)}
                    </p>
                    <p className="font-mono text-[8px] tracking-[0.1em] mb-3" style={{ color: THEME.secondary }}>
                      {p.servings} servings
                    </p>
                    <span className="font-serif font-bold mb-3" style={{ fontSize: '1.15rem', color: c.accent }}>
                      ${p.price.toFixed(2)}
                    </span>
                    <div className="flex items-center justify-between mt-auto" style={{ border: `1px solid ${THEME.border}` }}>
                      <button
                        onClick={() => setQtyFor(p.slug, -1)}
                        aria-label={`Decrease ${p.name} quantity`}
                        className="w-10 h-10 flex items-center justify-center transition hover:opacity-70"
                        style={{ color: THEME.secondary }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono text-sm" style={{ color: THEME.text }}>{qty[p.slug]}</span>
                      <button
                        onClick={() => setQtyFor(p.slug, 1)}
                        aria-label={`Increase ${p.name} quantity`}
                        className="w-10 h-10 flex items-center justify-center transition hover:opacity-70"
                        style={{ color: THEME.secondary }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact bundle summary */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 p-5" style={{ background: THEME.card, border: `1px solid ${THEME.border}` }}>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: `${RG}90` }}>
                  Your Bundle
                </p>
                {bagCount === 0 ? (
                  <div className="text-center py-6">
                    <ShoppingBag size={40} style={{ color: `${RG}25`, margin: '0 auto 12px' }} />
                    <p className="font-heading" style={{ color: THEME.secondary, fontSize: '0.9rem' }}>
                      Add a product to begin.
                    </p>
                  </div>
                ) : (
                  <>
                    <ul className="space-y-2 mb-4">
                      {CORE_PRODUCTS.filter((p) => qty[p.slug] > 0).map((p) => (
                        <li key={p.slug} className="flex items-center justify-between">
                          <span className="font-heading text-xs" style={{ color: THEME.text }}>{p.name}</span>
                          <span className="font-mono text-[10px]" style={{ color: THEME.secondary }}>
                            &times;{qty[p.slug]} &middot; ${(qty[p.slug] * p.price).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 mb-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>Bags selected</span>
                        <span className="font-mono text-xs" style={{ color: THEME.text }}>{bagCount}</span>
                      </div>
                      {isStarterCombo && (
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#10B981' }}>Starter Bundle</span>
                          <span className="font-mono text-xs line-through" style={{ color: '#9A9085' }}>${STARTER_REGULAR.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>Subtotal</span>
                        <span className="font-serif font-bold text-lg" style={{ color: RG }}>${subtotal.toFixed(2)}</span>
                      </div>
                      {savings > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: '#10B981' }}>You save</span>
                          <span className="font-mono text-xs font-bold" style={{ color: '#10B981' }}>${savings.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={addCustomBundle}
                      className="w-full font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-90 py-4"
                      style={{ background: RG, color: THEME.cream }}
                    >
                      Add Bundle to Cart &mdash; ${subtotal.toFixed(2)}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}