import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ALL_PRODUCTS } from '@/lib/coreProducts';
import RitualCard from '@/components/products/RitualCard';
import RitualComparison from '@/components/home/ritual/RitualComparison';
import FreeGiftBanner from '@/components/home/FreeGiftBanner';
import ShopSpecialEditions from '@/components/specialeditions/ShopSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { useSearchParams } from 'react-router-dom';
import { getCoffeeFormat } from '@/lib/coffeeFormats';
import { base44 } from '@/api/base44Client';
import { trackViewItemList, buildItem } from '@/lib/analytics';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      await base44.entities.EmailSubscriber.create({ email, source: 'shop_page' });
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-5" style={{ background: '#E3EAD6', border: '1px solid #5E7A3E55', borderRadius: '6px' }}>
        <p className="font-heading text-sm" style={{ color: '#43612A' }}>
          Welcome to the Republic. Check your inbox for your welcome code.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        className="flex-1 px-4 py-3 font-heading text-base focus:outline-none"
        style={{ background: '#FFFFFF', border: '1px solid #E4D8C9', color: '#292622', borderRadius: '6px' }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: '#B7653E', color: '#FBF8F1', borderRadius: '6px' }}
      >
        {status === 'loading' ? 'Joining...' : 'Subscribe'}
      </button>
    </form>
  );
}

export default function MushroomShop() {
  const [searchParams] = useSearchParams();
  const activeFormat = getCoffeeFormat(searchParams.get('format'));
  // The everyday lineup is instant coffee. Ground and whole bean are only sold
  // as limited releases, so those views show the special editions instead.
  const showEveryday = !activeFormat || activeFormat.key === 'instant';

  // Report the lineup as a product-list impression so which products get seen
  // (and which get ignored) is measurable.
  useEffect(() => {
    if (!showEveryday) return;
    const items = ALL_PRODUCTS
      .filter((p) => !p.seasonal)
      .map((p, i) => buildItem({
        id: p.slug || p.id,
        name: p.name,
        category: p.categoryLabel || p.category,
        price: p.price,
        index: i,
      }));
    if (items.length > 0) {
      trackViewItemList(items, { listId: 'shop_lineup', listName: 'Shop Lineup' });
    }
  }, [showEveryday]);

  useSEO({
    title: activeFormat
      ? `${activeFormat.label} Coffee | Torch Republic Coffee Company`
      : 'Shop Instant Coffee | Torch Republic Coffee Company',
    description: activeFormat
      ? `${activeFormat.blurb} Shop Torch Republic ${activeFormat.label.toLowerCase()} coffee.`
      : 'Shop Torch Republic Instant Classic Coffee and Instant Mushroom Coffee — premium, convenient coffee made for simple daily rituals.',
    url: '/shop',
    type: 'website',
    noindex: false,
  });

  return (
    <div style={{ background: '#FBF8F1' }}>
      {/* Hero */}
      <section className="px-5 pb-5 pt-5 text-center md:px-10 md:pt-10 md:pb-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#A97B32' }}>
            Torch Republic Coffee Company
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 font-serif font-semibold"
            style={{ fontSize: 'clamp(2rem,6vw,4rem)', color: '#292622', letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            {activeFormat ? `${activeFormat.label} Coffee` : 'The lineup.'}
          </motion.h1>
          <p className="mx-auto mt-2 max-w-xl font-heading text-sm md:text-base" style={{ color: '#5F574F', lineHeight: 1.7 }}>
            {activeFormat ? activeFormat.blurb : 'Shop instant coffee, the Coffee Duo, and our seasonal whole bean release.'}
          </p>
        </div>
      </section>

      {/* Two products */}
      {showEveryday && (
        <section className="px-6 pb-16 md:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {ALL_PRODUCTS.filter((p) => !p.seasonal).map((p, i) => (
                <RitualCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special editions follow the everyday catalog. */}
      <ShopSpecialEditions format={activeFormat ? activeFormat.key : null} />

      {/* Free gift with purchase */}
      <FreeGiftBanner />

      {/* Comparison - covers the two instant rituals, so it only belongs on the instant view */}
      {showEveryday && <RitualComparison />}

      {/* Newsletter */}
      <section className="px-6 py-16 md:px-10" style={{ borderTop: '1px solid #E4D8C9' }}>
        <div className="mx-auto max-w-[700px] text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#A97B32' }}>
            Stay in the ritual
          </p>
          <h2 className="mb-4 font-serif font-semibold" style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', color: '#292622' }}>
            Get a welcome offer on your first order
          </h2>
          <p className="mb-8 font-heading" style={{ color: '#5F574F' }}>
            Join the list for new releases and member offers.
          </p>
          <NewsletterSignup />
        </div>
      </section>

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid #E4D8C9' }}>
        <p className="mx-auto max-w-xl font-mono text-[11px] tracking-[0.08em]" style={{ color: '#8A8076', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}