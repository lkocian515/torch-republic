import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, ShieldCheck, Truck, Package, Star } from 'lucide-react';

const BUNDLES = [
  {
    id: 'lady-liberty',
    name: 'Lady Liberty Bundle',
    tagline: 'Freedom never tasted so smooth.',
    price: 34.99,
    originalPrice: 44.99,
    accent: '#B38B4D',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
    coffeeHandle: '/LadyLibertyBlend',
    coffeeName: 'Lady Liberty Blend',
    coffeeNotes: 'Roasted Nuts · Honey · Milk Chocolate',
    roast: 'Golden Medium Roast',
    bobbleheadName: 'Statue of Liberty Bobblehead',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/statue-of-liberty-bobblehead-2687882.jpg?v=1771884543',
    historical: 'The Statue of Liberty has stood as America\'s beacon of freedom since 1886 — a gift from France and a promise to the world. This blend honors her enduring light with every smooth, golden sip.',
    shopifyHandle: 'lady-liberty-bundle',
  },
  {
    id: 'uncle-sam',
    name: 'Uncle Sam Bundle',
    tagline: 'Uncle Sam wants YOU to drink bold.',
    price: 34.99,
    originalPrice: 44.99,
    accent: '#9B7B4D',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
    coffeeHandle: '/UncleSamsBoldBrew',
    coffeeName: "Uncle Sam's Bold Brew",
    coffeeNotes: 'Bittersweet Chocolate · Smoke · Deep Roast',
    roast: 'Extra Bold Dark Roast',
    bobbleheadName: 'Uncle Sam Bobblehead',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/uncle-sam-bobblehead-9372592.jpg?v=1771884549',
    historical: 'Uncle Sam — the iconic symbol of American strength and resolve — has rallied the nation through its greatest challenges. This bold, unapologetic dark roast is built for the same no-nonsense spirit.',
    shopifyHandle: 'uncle-sam-bundle',
  },
  {
    id: 'rosies-grind',
    name: "Rosie's Grind Bundle",
    tagline: 'We can do it — one cup at a time.',
    price: 34.99,
    originalPrice: 44.99,
    accent: '#A8893A',
    coffeeImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
    coffeeHandle: '/RosiesGrind',
    coffeeName: "Rosie's Grind",
    coffeeNotes: 'Praline · Roasted Peanuts · Smooth Finish',
    roast: 'Bold Medium Dark Roast',
    bobbleheadName: 'Rosie the Riveter Bobblehead',
    bobbleheadImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/rosie-the-riveter-bobblehead-9779749.jpg?v=1771884520',
    historical: 'Rosie the Riveter became a symbol of American women\'s strength and resilience during WWII — proving that determination has no limits. Channel that unstoppable grit in every full-bodied cup.',
    shopifyHandle: 'rosies-grind-bundle',
  },
];

function BundleCard({ bundle, index }) {
  const { accent } = bundle;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      style={{
        background: '#0C0C0C',
        border: `1px solid ${accent}25`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Bundle image — both products side by side */}
      <div
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${accent}12 0%, #050505 100%)`,
          borderBottom: `1px solid ${accent}18`,
          padding: '32px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          minHeight: '260px',
        }}
      >
        <div style={{ textAlign: 'center', flex: 1 }}>
          <img
            src={bundle.coffeeImage}
            alt={`${bundle.coffeeName} premium coffee from Torch Republic`}
            style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
          />
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${accent}60`, marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Coffee</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <div style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, transparent, ${accent}50, transparent)` }} />
          <span style={{ fontSize: '10px', color: `${accent}50`, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>+</span>
          <div style={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, transparent, ${accent}50, transparent)` }} />
        </div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <img
            src={bundle.bobbleheadImage}
            alt={`${bundle.bobbleheadName} collectible figure from Torch Republic`}
            style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.6))' }}
          />
          <p style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: `${accent}60`, marginTop: '8px', fontFamily: 'var(--font-mono)' }}>Collectible</p>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

        {/* Name + tagline */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: accent, background: `${accent}12`, border: `1px solid ${accent}30`, padding: '3px 10px' }}>
              Bundle · Limited
            </span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 10, height: 10, fill: '#C9A24A', color: '#C9A24A' }} />)}
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F0EBE1', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
            {bundle.name}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(240,235,225,0.45)', fontStyle: 'italic' }}>{bundle.tagline}</p>
        </div>

        {/* What's included */}
        <div style={{ background: '#080808', border: `1px solid ${accent}14`, padding: '16px 18px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: `${accent}60`, marginBottom: '10px' }}>
            What's Included
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Package style={{ width: 13, height: 13, color: accent, flexShrink: 0, marginTop: '1px' }} />
              <div>
                <p style={{ fontSize: '0.83rem', color: '#F0EBE1', fontWeight: 600, lineHeight: 1.3 }}>{bundle.coffeeName}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(240,235,225,0.38)', marginTop: '2px' }}>{bundle.roast} · 12 oz bag</p>
                <p style={{ fontSize: '0.7rem', color: `${accent}70`, marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{bundle.coffeeNotes}</p>
              </div>
            </div>
            <div style={{ height: '1px', background: `${accent}10` }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Package style={{ width: 13, height: 13, color: accent, flexShrink: 0, marginTop: '1px' }} />
              <div>
                <p style={{ fontSize: '0.83rem', color: '#F0EBE1', fontWeight: 600, lineHeight: 1.3 }}>{bundle.bobbleheadName}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(240,235,225,0.38)', marginTop: '2px' }}>Collectible figure · Limited edition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why it matters */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.45em', textTransform: 'uppercase', color: `${accent}60`, marginBottom: '8px' }}>
            Why It Matters
          </p>
          <p style={{ fontSize: '0.82rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.8, fontWeight: 300 }}>
            {bundle.historical}
          </p>
        </div>

        {/* Pricing + CTA */}
        <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: `1px solid ${accent}12` }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 900, color: accent }}>${bundle.price.toFixed(2)}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.22)', textDecoration: 'line-through' }}>${bundle.originalPrice.toFixed(2)}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '2px 8px' }}>
              Save ${(bundle.originalPrice - bundle.price).toFixed(0)}
            </span>
          </div>
          <a
            href={`https://torch-republic.com/products/${bundle.shopifyHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '14px',
              background: accent,
              color: '#080808',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 900,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Get the Bundle →
          </a>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(255,255,255,0.2)', marginTop: '8px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Free shipping · Limited stock
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoffeeBundles() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* Hero */}
      <section style={{ borderBottom: '1px solid rgba(201,162,74,0.12)', padding: 'clamp(60px, 10vh, 100px) 24px 60px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(201,162,74,0.55)', marginBottom: '18px' }}>
              Limited Edition · Torch Republic
            </p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '20px' }}>
              Collectible Coffee Bundles
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 12px' }}>
              Premium American coffee paired with iconic collectible figures. Drink it. Display it. Collect it.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,162,74,0.55)' }}>
              Each bundle saves you $10 vs. buying separately
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <div style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.08)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 5vw, 60px)', flexWrap: 'wrap' }}>
          {[
            { Icon: Flame, label: 'Small Batch Roasted' },
            { Icon: Package, label: 'Coffee + Collectible' },
            { Icon: ShieldCheck, label: 'Quality Guaranteed' },
            { Icon: Truck, label: 'Ships Free' },
          ].map(({ Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon style={{ width: 13, height: 13, color: '#C9A24A' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bundle grid */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {BUNDLES.map((bundle, i) => (
            <BundleCard key={bundle.id} bundle={bundle} index={i} />
          ))}
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,162,74,0.1)', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(201,162,74,0.45)', marginBottom: '12px' }}>
          Want more?
        </p>
        <p style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', marginBottom: '24px' }}>
          Explore the full Liberty Icons coffee series or start a monthly subscription.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/LibertyIcons"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, color: '#080808', background: '#C9A24A', padding: '13px 28px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Liberty Icons Series →
          </Link>
          <Link to="/TheTorchBox"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, color: '#C9A24A', border: '1px solid rgba(201,162,74,0.35)', padding: '13px 28px', textDecoration: 'none', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Torch Box Subscription →
          </Link>
        </div>
      </section>
    </div>
  );
}