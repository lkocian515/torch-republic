import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TIERS = [
  {
    id: 'ember',
    name: 'Ember',
    tagline: 'Start the fire.',
    price: '$29',
    per: '/mo',
    color: '#C87050',
    items: [
      '1 Founders Series Blend (12oz)',
      'Monthly Collectible Insert',
      'Torch Republic Member Badge',
    ],
    cta: 'Start with Ember',
    handle: 'torch-box-ember',
    featured: false,
  },
  {
    id: 'beacon',
    name: 'Beacon',
    tagline: 'Lead the way.',
    price: '$54',
    per: '/mo',
    color: '#C9A24A',
    items: [
      '2 Founders Series Blends (12oz each)',
      'Exclusive Collectible + Historical Insert',
      'Apparel or Accessory Drop',
      'Early Access to New Releases',
    ],
    cta: 'Join as Beacon',
    handle: 'torch-box-beacon',
    featured: true,
  },
  {
    id: 'blaze',
    name: 'Blaze',
    tagline: 'Carry the flame for all.',
    price: '$89',
    per: '/mo',
    color: '#E8D08A',
    items: [
      'Full 3-Blend Rotation (12oz each)',
      'Premium Collectible Object',
      'Apparel Drop + Accessory',
      'First Access + Archive Editions',
      'Torch Republic Inner Circle',
    ],
    cta: 'Become Blaze',
    handle: 'torch-box-blaze',
    featured: false,
  },
];

const WHATS_INSIDE = [
  {
    label: 'Premium Coffee',
    detail: 'Small-batch Founders Series roasts — each tied to a historical figure, a mindset, a moment.',
    icon: '◉',
  },
  {
    label: 'Collectible Objects',
    detail: 'Limited-edition artifacts: numbered prints, pins, coins. Each one retires. None are reprinted.',
    icon: '◈',
  },
  {
    label: 'Historical Inserts',
    detail: 'One-page deep dives. The real story behind each founder. Built for those who want more than a cup.',
    icon: '▣',
  },
];

const WHY_JOIN = [
  { label: 'Exclusive', body: 'Box contents never sold individually. Subscriber-only items, every month.' },
  { label: 'Limited', body: 'Each edition has a fixed production run. Once it ships, it retires to the Archive.' },
  { label: 'Identity-Driven', body: "This isn't a subscription — it's a signal. You know what you stand for." },
];

export default function TheTorchBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── 1. HERO ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(201,162,74,0.04) 0%, transparent 65%)' }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A)' }} />
                <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.5)' }}>
                  Monthly Subscription
                </span>
              </div>

              <h1 className="font-serif leading-none mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                The<br />
                <span style={{ color: '#C9A24A' }}>Torch Box.</span>
              </h1>

              <p className="font-serif mb-6" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'rgba(240,235,225,0.4)', fontStyle: 'italic', fontWeight: 400 }}>
                For Torchbearers.
              </p>

              <p style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, maxWidth: '440px', fontWeight: 300 }}>
                Monthly drops. Premium goods. No noise.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-12">
                <a
                  href="#tiers"
                  className="inline-flex items-center justify-center px-8 py-4 font-mono font-black text-sm tracking-[0.2em] uppercase transition-all hover:opacity-90"
                  style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 30px rgba(201,162,74,0.25)' }}
                >
                  Become a Torchbearer
                </a>
                <a
                  href="#inside"
                  className="inline-flex items-center justify-center px-8 py-4 font-mono text-sm tracking-[0.2em] uppercase transition-all hover:opacity-70"
                  style={{ border: '1px solid rgba(201,162,74,0.25)', color: 'rgba(240,235,225,0.5)' }}
                >
                  See What's Inside
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: box image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.08) 0%, transparent 70%)' }} />
            <img
              src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mockup_hero_dark.png_preview_81d6ce65-2c5f-4b97-9aaf-ad69c22e7212.jpg?v=1775822721"
              alt="The Torch Box"
              className="w-full max-w-[480px] object-cover"
              style={{ opacity: 0.88 }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
      </section>

      {/* ── 2. WHAT'S INSIDE ─────────────────────────────────── */}
      <section id="inside" style={{ borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)', backgroundColor: '#111111' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-14 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
            What's Inside Every Box
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WHATS_INSIDE.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-5 p-8"
                style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.08)' }}
              >
                <span style={{ fontSize: '1.4rem', color: '#C9A24A' }}>{item.icon}</span>
                <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: '#C9A24A' }}>{item.label}</p>
                <p style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.9rem', lineHeight: 1.8, fontWeight: 300 }}>{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. TIERS ──────────────────────────────────────────── */}
      <section id="tiers" className="max-w-[1200px] mx-auto px-6 md:px-12 py-28">
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Choose Your Level
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#F0EBE1', fontWeight: 700 }}>
            Three tiers. One mission.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col"
              style={{
                background: tier.featured ? 'linear-gradient(160deg, #0F0C02 0%, #0B0B0B 100%)' : '#111111',
                border: tier.featured ? `1px solid ${tier.color}55` : '1px solid rgba(201,162,74,0.08)',
                boxShadow: tier.featured ? `0 0 40px ${tier.color}10` : 'none',
              }}
            >
              {/* Top accent line */}
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}99, transparent)` }} />

              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[9px] font-black tracking-[0.35em] uppercase px-4 py-1" style={{ background: tier.color, color: '#0B0B0B' }}>
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col gap-6 flex-1">
                {/* Name */}
                <div>
                  <h3 className="font-serif mb-1" style={{ fontSize: '2rem', color: '#F0EBE1', fontWeight: 700 }}>{tier.name}</h3>
                  <p className="font-mono text-[10px]" style={{ color: `${tier.color}88` }}>{tier.tagline}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="font-mono font-black text-3xl" style={{ color: tier.color }}>{tier.price}</span>
                  <span className="font-mono text-sm" style={{ color: 'rgba(240,235,225,0.25)' }}>{tier.per}</span>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: 'rgba(201,162,74,0.08)' }} />

                {/* Items */}
                <div className="flex flex-col gap-3 flex-1">
                  {tier.items.map(item => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: tier.color }} />
                      <span style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`https://torch-republic.com/products/${tier.handle}`}
                  className="mt-2 py-4 text-center font-mono font-black text-xs tracking-[0.2em] uppercase transition-all hover:opacity-90"
                  style={tier.featured
                    ? { background: tier.color, color: '#0B0B0B' }
                    : { border: `1px solid ${tier.color}40`, color: tier.color }
                  }
                >
                  {tier.cta} →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 4. WHY JOIN ──────────────────────────────────────── */}
      <section style={{ backgroundColor: '#111111', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-14 text-center" style={{ color: 'rgba(201,162,74,0.45)' }}>
            Why Join
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {WHY_JOIN.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: '#C9A24A' }}>{item.label}</span>
                <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.95rem', lineHeight: 1.9, fontWeight: 300 }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FINAL CTA ─────────────────────────────────────── */}
      <section className="max-w-[720px] mx-auto px-6 md:px-12 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-px h-16 mx-auto mb-14" style={{ background: 'linear-gradient(to bottom, transparent, #C9A24A)' }} />

          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.4)' }}>
            The Torch Box
          </p>
          <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: '#F0EBE1', fontWeight: 800, lineHeight: 1.1 }}>
            Become a<br />
            <span style={{ color: '#C9A24A' }}>Torchbearer.</span>
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.35)', lineHeight: 1.9, fontWeight: 300, maxWidth: '420px', margin: '0 auto 3rem', fontSize: '0.95rem' }}>
            Join the subscribers who carry the flame. Monthly. Premium. Yours.
          </p>

          <a
            href="#tiers"
            className="inline-flex items-center justify-center px-12 py-5 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all hover:opacity-90"
            style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 40px rgba(201,162,74,0.3)' }}
          >
            Choose Your Tier →
          </a>

          <div className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.3)' }}>
              Or join the waitlist
            </p>
            {!submitted ? (
              <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 font-mono text-sm bg-transparent outline-none"
                  style={{ border: '1px solid rgba(201,162,74,0.2)', color: '#F0EBE1' }}
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase font-black"
                  style={{ border: '1px solid rgba(201,162,74,0.4)', color: '#C9A24A', background: 'transparent' }}
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <p className="font-mono text-sm" style={{ color: '#C9A24A' }}>You're on the list. We'll be in touch.</p>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}