import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Check, Truck, Coffee, BookOpen, Zap, Star, Lock, Gift, Shield } from 'lucide-react';

const TIERS = [
  {
    name: 'Patriot',
    tagline: 'Start the fire.',
    price: '$29',
    per: '/mo',
    savings: 'Save ~$8/mo vs one-time',
    color: '#C87050',
    items: [
      '1 Founders Series Blend (12 oz)',
      'Monthly Collectible Insert',
      'Torchbearer Member Badge',
    ],
    featured: false,
    freeShipping: false,
    handle: 'torch-box-ember',
  },
  {
    name: 'Founder',
    tagline: 'Lead the way.',
    price: '$54',
    per: '/mo',
    savings: 'Save ~$18/mo vs one-time',
    color: '#C9A24A',
    items: [
      '2 Founders Series Blends (12 oz each)',
      'Exclusive Collectible + Historical Insert',
      'Apparel or Accessory Drop',
      'Early Access to New Releases',
    ],
    featured: true,
    freeShipping: false,
    handle: 'torch-box-beacon',
  },
  {
    name: 'Legacy',
    tagline: 'Carry the flame for all.',
    price: '$89',
    per: '/mo',
    savings: 'Save ~$35/mo vs one-time',
    color: '#E8D08A',
    items: [
      'Full 3-Blend Rotation (12 oz each)',
      'Premium Collectible Object',
      'Apparel Drop + Accessory',
      'First Access + Archive Editions',
      'Torch Republic Inner Circle',
    ],
    featured: false,
    bestValue: true,
    freeShipping: true,
    handle: 'torch-box-blaze',
  },
];

const MEMBER_BENEFITS = [
  { icon: Lock, label: 'Exclusive Subscriber Blends', detail: 'Roasts never sold to the public. Yours only as a member.' },
  { icon: Zap, label: 'Early Access to New Releases', detail: 'Get new collections before anyone else. First in, always.' },
  { icon: Gift, label: 'Monthly Collector Experience', detail: 'Numbered inserts, artifacts, and pieces of American history — every box.' },
  { icon: Shield, label: 'Member-Only Rewards', detail: 'Priority access, archive editions, and Inner Circle benefits.' },
];

const WHATS_INSIDE = [
  {
    icon: Coffee,
    label: 'Premium Small-Batch Coffee',
    detail: 'Founders Series roasts crafted in small batches and shipped fresh. Built for daily discipline — every cup carries a legacy.',
  },
  {
    icon: BookOpen,
    label: 'Story-Driven Collector Insert',
    detail: 'A new historical figure or theme every month. Numbered prints, artifacts, and pieces of American history — never repeated.',
  },
  {
    icon: Zap,
    label: 'Subscriber-Only Drops',
    detail: 'Limited runs reserved for Torch Box members. Early access to new releases, archive editions, and blends never sold to the public.',
  },
];

const FOUNDERS = [
  { name: 'Washington', handle: 'washington-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
  { name: 'Jefferson', handle: 'jefferson-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841' },
  { name: 'Franklin', handle: 'franklin-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/franklin-blend-hero.jpg' },
  { name: 'Adams', handle: 'adams-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_c3c4e4b9-9cf6-4b74-b937-8ca5be6da89f.jpg' },
  { name: 'Lincoln', handle: 'lincoln-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_55eaf3da-19a5-40c5-9a5c-47c88cf40a44.jpg' },
  { name: 'Roosevelt', handle: 'roosevelt-blend', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-11_a1b79234-5f92-443e-bdba-7c3dc9046b14.jpg' },
];

const REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', text: 'The most heritage-forward coffee I\'ve ever had. Torch Box pays for itself.', rating: 5 },
  { name: 'Sarah K.', location: 'Charleston, SC', text: 'Every morning feels like a ritual of purpose. I don\'t start my day without it.', rating: 5 },
  { name: 'Rachel B.', location: 'Knoxville, TN', text: 'The Torch Box is the best subscription I\'ve ever signed up for. Premium all the way.', rating: 5 },
];

function TorchDivider() {
  return (
    <div className="flex items-center gap-4 max-w-[1200px] mx-auto px-6 md:px-12 my-2">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.25))' }} />
      <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.4)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.25), transparent)' }} />
    </div>
  );
}

export default function TheTorchBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 50%, rgba(201,162,74,0.06) 0%, transparent 65%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 35% 80%, rgba(201,162,74,0.03) 0%, transparent 50%)' }} />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-4 h-4" style={{ color: '#C9A24A' }} />
                <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>
                  Monthly Subscription
                </span>
              </div>

              <h1 className="font-serif leading-none mb-5" style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
                Carry the<br />
                <span style={{ color: '#C9A24A' }}>Flame Monthly.</span>
              </h1>

              <div className="h-0.5 w-16 mb-6" style={{ background: 'linear-gradient(90deg, #C9A24A, transparent)' }} />

              <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(240,235,225,0.65)', lineHeight: 1.95, maxWidth: '440px', fontWeight: 300 }}>
                Every month is a new chapter.
              </p>

              <p className="mt-3 mb-4" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.4)', lineHeight: 1.85, maxWidth: '420px', fontWeight: 300 }}>
                Premium coffee. A story-driven collector insert. A ritual built for daily discipline — delivered to your door.
              </p>

              <p className="mb-10 font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
                You won't want to miss next month.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#tiers"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4.5 font-mono font-black text-sm tracking-[0.22em] uppercase transition-all hover:opacity-90 btn-glow"
                  style={{ background: '#C9A24A', color: '#0B0B0B', padding: '18px 40px', boxShadow: '0 4px 30px rgba(201,162,74,0.3)' }}>
                  <Flame className="w-4 h-4" /> Join the Torch Box
                </a>
                <a href="#whats-inside"
                  className="inline-flex items-center justify-center px-8 py-4 font-mono text-sm tracking-[0.2em] uppercase transition-all hover:opacity-75"
                  style={{ border: '1px solid rgba(201,162,74,0.25)', color: 'rgba(240,235,225,0.55)', padding: '18px 32px' }}>
                  See What's Inside
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(ellipse at center, rgba(201,162,74,0.1) 0%, transparent 70%)' }} />
            <img
              src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mockup_hero_dark.png_preview_81d6ce65-2c5f-4b97-9aaf-ad69c22e7212.jpg?v=1775822721"
              alt="The Torch Box"
              className="w-full max-w-[480px] object-cover"
              style={{ opacity: 0.9 }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
      </section>

      <TorchDivider />

      {/* ── 1b. BECOME A TORCHBEARER ── */}
      <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Membership</p>
            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em' }}>
              You're not just buying coffee.<br />
              <span style={{ color: '#C9A24A' }}>You're a Torchbearer.</span>
            </h2>
            <p style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.95, fontWeight: 300, maxWidth: '520px', margin: '0 auto 1rem', fontSize: '1rem' }}>
              Built for daily discipline. A morning ritual with meaning — every cup tied to a story, a legacy, a purpose.
            </p>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.45)' }}>
              Carry the Flame.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MEMBER_BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col gap-4 p-7"
                  style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.1)' }}
                >
                  <div className="w-9 h-9 flex items-center justify-center"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.15)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#C9A24A' }} />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#C9A24A' }}>{b.label}</p>
                  <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.85rem', lineHeight: 1.85, fontWeight: 300 }}>{b.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Retention hook strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
            {[
              'Exclusive blends only available to subscribers',
              'Limited subscriber releases',
              'Priority access to new collections',
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: '#C9A24A', flexShrink: 0 }} />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.4)' }}>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TorchDivider />

      {/* ── 2. WHAT YOU GET ── */}
      <section id="whats-inside" style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4 text-center"
            style={{ color: 'rgba(201,162,74,0.5)' }}>
            What's Inside Every Box
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-center mb-14"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#F0EBE1', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Three pillars. One ritual.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHATS_INSIDE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-5 p-8"
                  style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.1)', boxShadow: '0 0 24px rgba(201,162,74,0.03)' }}
                >
                  <div className="w-10 h-10 flex items-center justify-center"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.15)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#C9A24A' }} />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: '#C9A24A' }}>{item.label}</p>
                  <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.9rem', lineHeight: 1.85, fontWeight: 300 }}>{item.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <TorchDivider />

      {/* ── 3. TIERS ── */}
      <section id="tiers" className="max-w-[1200px] mx-auto px-6 md:px-12 py-28">
        <div className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Choose Your Level</p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Three tiers. One mission.
          </h2>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Cancel anytime — but most don't.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col"
              style={{
                background: tier.featured ? 'linear-gradient(160deg, #100D02 0%, #0B0B0B 100%)' : '#111',
                border: tier.featured ? `1px solid ${tier.color}55` : '1px solid rgba(201,162,74,0.1)',
                boxShadow: tier.featured ? `0 0 50px ${tier.color}10` : 'none',
              }}
            >
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}99, transparent)` }} />

              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="font-mono text-[9px] font-black tracking-[0.35em] uppercase px-4 py-1"
                    style={{ background: tier.color, color: '#0B0B0B' }}>Most Popular</span>
                </div>
              )}

              {tier.bestValue && (
                <div className="absolute -top-3 right-4 z-10">
                  <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1"
                    style={{ background: 'rgba(232,208,138,0.15)', color: '#E8D08A', border: '1px solid rgba(232,208,138,0.4)' }}>Best Value</span>
                </div>
              )}

              {tier.freeShipping && (
                <div className="flex items-center gap-1.5 px-4 pt-5 pb-0">
                  <Truck className="w-2.5 h-2.5" style={{ color: tier.color }} />
                  <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: tier.color }}>Free Shipping Included</span>
                </div>
              )}

              <div className="p-8 flex flex-col gap-5 flex-1">
                <div>
                  <h3 className="font-serif mb-1" style={{ fontSize: '2rem', color: '#F0EBE1', fontWeight: 700 }}>{tier.name}</h3>
                  <p className="font-mono text-[10px]" style={{ color: `${tier.color}88` }}>{tier.tagline}</p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-mono font-black text-3xl" style={{ color: tier.color }}>{tier.price}</span>
                    <span className="font-mono text-sm" style={{ color: 'rgba(240,235,225,0.25)' }}>{tier.per}</span>
                  </div>
                  <p className="font-mono text-[9px]" style={{ color: 'rgba(201,162,74,0.5)' }}>{tier.savings}</p>
                </div>
                <div className="h-px" style={{ background: 'rgba(201,162,74,0.08)' }} />
                <div className="flex flex-col gap-3 flex-1">
                  {tier.items.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                      <span style={{ color: 'rgba(240,235,225,0.6)', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://torch-republic.com/products/${tier.handle}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 py-4 text-center font-mono font-black text-xs tracking-[0.2em] uppercase transition-all hover:opacity-90 block"
                  style={tier.featured
                    ? { background: tier.color, color: '#0B0B0B' }
                    : { border: `1px solid ${tier.color}45`, color: tier.color }
                  }
                >
                  Join the Torch Box →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TorchDivider />

      {/* ── 4. COLLECTOR SYSTEM ── */}
      <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Collector System</p>
            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Build your collection faster<br />with Torch Box.
            </h2>
            <p style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.9, fontWeight: 300, maxWidth: '480px', margin: '0 auto 1rem', fontSize: '0.95rem' }}>
              Each Torch Box ships a different Founder. Collect all six. Once a blend retires, it joins the Archive — never roasted again.
            </p>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
              Complete the set.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {FOUNDERS.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative overflow-hidden"
                style={{ aspectRatio: '3/4', background: '#111', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.75 }} onError={e => e.currentTarget.style.display = 'none'} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
                <p className="absolute bottom-2 left-0 right-0 text-center font-mono text-[9px] font-black tracking-widest uppercase" style={{ color: '#C9A24A' }}>
                  {f.name}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/CoffeeCollection"
              className="font-mono text-[10px] tracking-[0.35em] uppercase transition-opacity hover:opacity-55 pb-px"
              style={{ color: 'rgba(201,162,74,0.55)', borderBottom: '1px solid rgba(201,162,74,0.2)' }}>
              View All Blends →
            </Link>
          </div>
        </div>
      </section>

      <TorchDivider />

      {/* ── 5. SOCIAL PROOF ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Torchbearers</p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700 }}>
            Built for those who live free<br />and stay ready.
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#C9A24A' }} />)}
            <span className="font-mono text-sm font-bold ml-2" style={{ color: '#C9A24A' }}>4.8</span>
            <span className="font-mono text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.3)' }}>· 200+ verified subscribers</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((rev, i) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 flex flex-col gap-4"
              style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.1)' }}
            >
              <div className="flex items-center gap-0.5">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" style={{ color: '#C9A24A' }} />)}
              </div>
              <p style={{ color: 'rgba(240,235,225,0.7)', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
                "{rev.text}"
              </p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>{rev.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{rev.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TorchDivider />

      {/* ── 6. FINAL CTA ── */}
      <section className="max-w-[720px] mx-auto px-6 md:px-12 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-px h-16 mx-auto mb-14" style={{ background: 'linear-gradient(to bottom, transparent, #C9A24A)' }} />

          <Flame className="w-8 h-8 mx-auto mb-6" style={{ color: 'rgba(201,162,74,0.6)' }} />

          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.4)' }}>
            The Torch Box
          </p>
          <h2 className="font-serif mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', color: '#F0EBE1', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            Join the Torch Box.<br />
            <span style={{ color: '#C9A24A' }}>Carry the Flame.</span>
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.9, fontWeight: 300, maxWidth: '420px', margin: '0 auto 3rem', fontSize: '0.95rem' }}>
            Monthly. Premium. Yours. Cancel anytime — but most Torchbearers never do.
          </p>

          <a
            href="#tiers"
            className="inline-flex items-center justify-center gap-2 px-12 py-5 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all hover:opacity-90 btn-glow"
            style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 40px rgba(201,162,74,0.35)' }}
          >
            <Flame className="w-4 h-4" /> Join the Torch Box
          </a>

          <div className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.3)' }}>
              Or join the waitlist
            </p>
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 font-mono text-sm bg-transparent outline-none"
                  style={{ border: '1px solid rgba(201,162,74,0.2)', color: '#F0EBE1' }} />
                <button type="submit"
                  className="px-7 py-3.5 font-mono text-xs tracking-[0.2em] uppercase font-black"
                  style={{ border: '1px solid rgba(201,162,74,0.4)', color: '#C9A24A', background: 'transparent' }}>
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