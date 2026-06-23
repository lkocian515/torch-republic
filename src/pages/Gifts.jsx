import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, ShieldCheck, Truck, Package } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { buildRitualKits, HERO_GIFT_IMAGE } from '@/lib/giftKits';
import GiftKitCard from '@/components/gifts/GiftKitCard';

const RG = '#E6B7AD';

// FAQ content — kept factual; no gift-wrap/card/scheduled-delivery claims that
// aren't backed by a real configured service.
const GIFT_FAQS = [
  {
    q: 'What ships inside each gift kit?',
    a: 'Each kit contains the individual Torch Republic blends listed on its card. We add exactly those blends to your Shopify cart at checkout — nothing more, nothing less. Any mug, bowl, whisk, gift box, or ribbon shown in the photos is for display only and is not included unless explicitly stated.',
  },
  {
    q: 'Can the recipient swap a blend?',
    a: 'Yes. Because each kit is made of individual blends rather than a sealed bundle, you can adjust the cart before checkout, and recipients can manage individual items through their order. For help with a specific order, reach us at support@torchrepublic.com.',
  },
  {
    q: 'Is gift wrapping or a printed gift card included?',
    a: 'No. Items ship in standard Torch Republic product packaging. Printed personalized gift cards, handwritten notes, custom inserts, and gift wrapping are not offered at this time. Any card, ribbon, mug, or box shown in a photo is styled for presentation only.',
  },
  {
    q: 'Do you offer bulk or corporate gifting?',
    a: 'For orders of 10 or more kits, contact us at support@torchrepublic.com and we will help coordinate quantities, shipping, and current availability.',
  },
];

export default function Gifts() {
  const [livePrices, setLivePrices] = useState({});

  // Pull live Shopify prices so the kit price reflects the active catalog.
  // (Mirrors the pattern used by the shop pages via mergeWithShopifyData.)
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { base44 } = await import('@/api/base44Client');
        const res = await base44.functions.invoke('fetchShopifyProducts', {});
        const products = res?.data?.products || [];
        const map = {};
        products.forEach((p) => {
          if (p && p.handle && p.price) map[p.handle] = Number(p.price);
        });
        if (active) setLivePrices(map);
      } catch (err) {
        // Silent fallback — buildRitualKits uses catalog fallback prices.
        if (active) setLivePrices({});
      }
    })();
    return () => { active = false; };
  }, []);

  const kits = useMemo(() => buildRitualKits(livePrices), [livePrices]);

  useSEO({
    title: 'Coffee, Mushroom Coffee & Matcha Gifts | Torch Republic',
    description:
      'Explore premium instant coffee, mushroom coffee, and ceremonial matcha gifts from Torch Republic. Thoughtful rituals for coffee lovers, wellness routines, and special occasions.',
    url: '/gifts',
    type: 'website',
    image: HERO_GIFT_IMAGE.png,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Gifts', url: '/gifts' },
    ],
    faq: GIFT_FAQS,
  });

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Hero — text + CTA on the left, subtle Complete Ritual image on the right (desktop) */}
      <section
        className="px-6 md:px-10 pt-16 md:pt-20 pb-16"
        style={{
          borderBottom: '1px solid rgba(230,183,173,0.08)',
          background: 'radial-gradient(ellipse at top, rgba(230,183,173,0.07) 0%, transparent 70%)',
        }}
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p
              className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4"
              style={{ color: `${RG}` }}
            >
              Torch Republic Coffee Company
            </p>
            <h1
              className="font-serif font-bold mb-4"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              Gift a Ritual
            </h1>
            <p
              className="font-heading max-w-xl mb-8"
              style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.75 }}
            >
              Thoughtful instant coffee, mushroom coffee, and matcha gifts for the people and moments that matter.
            </p>
            <div className="flex flex-wrap items-center gap-5 mb-8">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} style={{ color: RG }} aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.85)' }}>
                  Real Blends, Verified Cart
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} style={{ color: RG }} aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.85)' }}>
                  Ships From Torch Republic
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Package size={16} style={{ color: RG }} aria-hidden="true" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.85)' }}>
                  Mix &amp; Match Any Kit
                </span>
              </div>
            </div>
            <Link
              to="#ritual-kits"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold rounded-sm"
              style={{ background: RG, color: '#050505', padding: '14px 28px', minHeight: '44px' }}
            >
              Explore Gift Kits <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Hero promo image — shown on all viewports, cropped to keep the
              product showcase centered on mobile (object-position right). */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            aria-hidden="true"
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: '16 / 10', borderRadius: '6px', border: '1px solid rgba(230,183,173,0.15)' }}
            >
              <img
                src={HERO_GIFT_IMAGE.png}
                alt=""
                width={1600}
                height={1000}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 1023px) 100vw, 50vw"
                srcSet={`${HERO_GIFT_IMAGE.png} 1600w`}
                className="w-full h-full object-cover"
                style={{ display: 'block', objectPosition: 'right center' }}
              />
              <div
                className="absolute inset-0 lg:hidden"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.35) 100%)' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ritual Kits Grid */}
      <section id="ritual-kits" className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}` }}>
              Curated Collections
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
              Choose Their Ritual
            </h2>
            <p
              className="font-heading max-w-2xl mx-auto mt-4"
              style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7, fontSize: '1rem' }}
            >
              Four thoughtful starting points for coffee, mushroom coffee, and matcha lovers. Each kit adds real Torch Republic blends to your cart — no subscriptions or selections required.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {kits.map((kit, i) => (
              <GiftKitCard key={kit.id} kit={kit} index={i} />
            ))}
          </div>

          {/* Discreet decorative-items disclaimer beneath the collection. */}
          <p
            className="font-mono text-center mt-8"
            style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.72rem', lineHeight: 1.6, letterSpacing: '0.02em' }}
          >
            Products and accessories shown are styled for presentation. Only items listed in each gift description are included.
          </p>
        </div>
      </section>

      {/* Send It Their Way — verified replacement for the removed "Add Personal Touch / printed gift card" section. */}
      <section
        className="px-6 md:px-10 py-16"
        style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(230,183,173,0.06)' }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}` }}>
              Simple Process
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F5EFE6' }}>
              Send It Their Way
            </h2>
            <p
              className="font-heading max-w-2xl mx-auto"
              style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.8, fontSize: '1.05rem' }}
            >
              Choose a thoughtful coffee or matcha ritual and have it delivered directly to someone special.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="px-6 md:px-10 py-16"
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}` }}>
              Three Steps
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F5EFE6' }}>
              How Gifting Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Their Kit',
                description: 'Pick a curated ritual of real Torch Republic blends — coffee, mushroom coffee, or matcha.',
                icon: ArrowRight,
              },
              {
                step: '02',
                title: 'Add to Cart',
                description: 'Each kit drops its exact blends into your Shopify cart with verified pricing and variant IDs.',
                icon: Package,
              },
              {
                step: '03',
                title: 'Ship It Their Way',
                description: 'Complete checkout on Shopify and enter any shipping address. Standard Torch Republic shipping applies.',
                icon: Truck,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${RG}10`, border: `1px solid ${RG}25` }}
                >
                  <item.icon size={28} style={{ color: RG }} aria-hidden="true" />
                </div>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.7)' }}>
                  Step {item.step}
                </p>
                <h3 className="font-serif font-bold text-lg mb-3" style={{ color: '#F5EFE6' }}>
                  {item.title}
                </h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: `${RG}` }}>
              Questions
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
              Gift FAQ
            </h2>
          </motion.div>

          <div className="space-y-4">
            {GIFT_FAQS.map((faq, i) => (
              <div
                key={i}
                className="p-5"
                style={{ background: 'rgba(255,255,255,0.015)', border: `1px solid ${RG}10`, borderRadius: '2px' }}
              >
                <h3 className="font-heading font-medium mb-2" style={{ color: '#F5EFE6', fontSize: '0.95rem' }}>
                  {faq.q}
                </h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA — recommends the featured Complete Ritual Kit, links to /bundle */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: `${RG}` }}>
            Need Help?
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
            Can't Decide?
          </h2>
          <p className="font-heading mb-6" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300, lineHeight: 1.8 }}>
            The Complete Ritual Kit is our featured recommendation — a curated introduction to multiple Torch Republic rituals for morning, daytime, and evening.
          </p>
          <Link
            to="/bundle"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold rounded-sm"
            style={{ background: RG, color: '#050505', padding: '14px 28px', minHeight: '44px' }}
          >
            Explore the Complete Ritual <ChevronRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}