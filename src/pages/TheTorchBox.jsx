import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Check, Truck, Shield, Lock, Star, Coffee, BookOpen, QrCode, CreditCard, RefreshCw } from 'lucide-react';
import TorchbearerCard from '../components/torchbox/TorchbearerCard';
import FirstOrderBonus from '../components/torchbox/FirstOrderBonus';

const AC = '#C9A24A';

const TIERS = [
  {
    id: 'ember',
    name: 'THE EMBER',
    price: 29,
    retailValue: 37,
    boxes: 1,
    tagline: 'Entry into the system.',
    color: '#C87050',
    featured: false,
    freeShipping: false,
    badge: null,
    items: [
      '1 Premium Coffee Box',
      'Collectible blend — exclusive to members',
      'Torchbearer membership card',
      'Educational insert + QR experience',
    ],
    savings: 'Save $8/mo vs buying individually',
    handle: 'torch-box-ember',
  },
  {
    id: 'beacon',
    name: 'THE BEACON',
    price: 49,
    retailValue: 67,
    boxes: 2,
    tagline: 'More coffee. Better value.',
    color: '#C9A24A',
    featured: true,
    freeShipping: false,
    badge: '★ Most Popular',
    items: [
      '2 Premium Coffee Boxes',
      '2 Collectible blends this month',
      'Torchbearer membership card',
      'Educational inserts + QR experiences',
      'Early access to new releases',
    ],
    savings: 'Save $18/mo vs buying individually',
    handle: 'torch-box-beacon',
  },
  {
    id: 'blaze',
    name: 'THE BLAZE',
    price: 69,
    retailValue: 104,
    boxes: 3,
    tagline: 'Full rotation. Free shipping.',
    color: '#E8D08A',
    featured: false,
    freeShipping: true,
    badge: 'Best Value',
    items: [
      '3 Premium Coffee Boxes',
      '3 Collectible blends this month',
      'Torchbearer membership card',
      'Full insert + QR set',
      'Free shipping — every month',
      'First access + archive editions',
    ],
    savings: 'Save $35/mo + free shipping',
    handle: 'torch-box-blaze',
  },
];

const WHATS_INSIDE = [
  {
    icon: Coffee,
    label: 'Premium Coffee Box',
    detail: 'Pods or whole bean. Small-batch roasted, shipped fresh to your door.',
  },
  {
    icon: Flame,
    label: 'Exclusive Collectible Blends',
    detail: 'Subscriber-only roasts never sold to the public. Yours as a member.',
  },
  {
    icon: CreditCard,
    label: 'Torchbearer Membership Card',
    detail: 'Your access card to the full Torch Republic experience.',
  },
  {
    icon: QrCode,
    label: 'Educational Inserts + QR',
    detail: 'Scan to unlock founder stories, history, and member-only content.',
  },
];

const FOUNDERS = [
  { name: 'Washington', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757' },
  { name: 'Jefferson', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841' },
  { name: 'Franklin', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/franklin-blend-hero.jpg' },
  { name: 'Adams', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-9_c3c4e4b9-9cf6-4b74-b937-8ca5be6da89f.jpg' },
  { name: 'Lincoln', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_55eaf3da-19a5-40c5-9a5c-47c88cf40a44.jpg' },
  { name: 'Roosevelt', img: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-11_a1b79234-5f92-443e-bdba-7c3dc9046b14.jpg' },
];

const REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', text: 'The most heritage-forward coffee I\'ve ever had. Torch Box pays for itself.', rating: 5 },
  { name: 'Sarah K.', location: 'Charleston, SC', text: 'Every morning feels like a ritual of purpose. I don\'t start my day without it.', rating: 5 },
  { name: 'Rachel B.', location: 'Knoxville, TN', text: 'The Torch Box is the best subscription I\'ve ever signed up for. Premium all the way.', rating: 5 },
];

const TRUST = [
  { icon: RefreshCw, label: 'Cancel Anytime', sub: 'No contracts. No hassle.' },
  { icon: Lock, label: 'Secure Checkout', sub: 'SSL encrypted · Safe payment' },
  { icon: Flame, label: 'Fresh Roasted Guarantee', sub: 'Every box roasted to order' },
  { icon: Shield, label: 'Quality Guaranteed', sub: 'Love it or we make it right' },
];

function FomoBanner() {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-6 py-3 px-6"
      style={{ background: 'rgba(201,162,74,0.05)', borderBottom: '1px solid rgba(201,162,74,0.12)' }}>
      <div className="flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#ef4444' }} />
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>Limited monthly spots available</span>
      </div>
      <div className="w-px h-3 hidden md:block" style={{ background: 'rgba(201,162,74,0.2)' }} />
      <div className="flex items-center gap-2">
        <Flame className="w-3 h-3 flex-shrink-0" style={{ color: AC }} />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Members get exclusive blends never sold publicly</span>
      </div>
      <div className="w-px h-3 hidden md:block" style={{ background: 'rgba(201,162,74,0.2)' }} />
      <div className="flex items-center gap-2">
        <Star className="w-3 h-3 flex-shrink-0 fill-current" style={{ color: AC }} />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>200+ Torchbearers already subscribed</span>
      </div>
    </motion.div>
  );
}

function ValueComparisonTable() {
  const rows = [
    { label: '1 Coffee Box', retail: '$37', member: '$29', save: 'Save $8' },
    { label: '2 Coffee Boxes', retail: '$74', member: '$49', save: 'Save $25' },
    { label: '3 Coffee Boxes', retail: '$111', member: '$69', save: 'Save $42 + free ship' },
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="max-w-[680px] mx-auto mt-12"
      style={{ border: '1px solid rgba(201,162,74,0.2)', background: '#0C0C0C' }}>
      <div className="px-5 py-3 grid grid-cols-4 gap-2" style={{ borderBottom: '1px solid rgba(201,162,74,0.1)', background: 'rgba(201,162,74,0.04)' }}>
        {['Item', 'Retail Price', 'Torch Box', 'You Save'].map((h, i) => (
          <span key={h} className={`font-mono text-[9px] tracking-[0.3em] uppercase ${i === 2 ? '' : i === 3 ? '' : ''}`}
            style={{ color: i === 2 ? AC : i === 3 ? '#4ade80' : 'rgba(255,255,255,0.3)', textAlign: i > 0 ? 'center' : 'left' }}>{h}</span>
        ))}
      </div>
      {rows.map((row, i) => (
        <div key={row.label} className="px-5 py-4 grid grid-cols-4 gap-2 items-center"
          style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
          <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{row.label}</span>
          <span className="font-mono text-sm text-center line-through" style={{ color: 'rgba(255,255,255,0.22)' }}>{row.retail}</span>
          <span className="font-mono font-black text-sm text-center" style={{ color: AC }}>{row.member}</span>
          <span className="font-mono text-[10px] font-bold text-center" style={{ color: '#4ade80' }}>{row.save}</span>
        </div>
      ))}
      <div className="px-5 py-3 text-center" style={{ background: 'rgba(201,162,74,0.04)', borderTop: '1px solid rgba(201,162,74,0.1)' }}>
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
          Plus exclusive member-only blends never available at retail
        </span>
      </div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 max-w-[1200px] mx-auto px-6 md:px-12 my-2">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.2))' }} />
      <Flame className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.35)' }} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.2), transparent)' }} />
    </div>
  );
}

function StartBoxCTA({ size = 'md', href = '#tiers', label = 'Claim Your Box Today' }) {
  const pad = size === 'lg' ? '20px 52px' : '16px 36px';
  const text = size === 'lg' ? '13px' : '11px';
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center gap-2 font-mono font-black uppercase tracking-[0.28em] transition-all hover:opacity-90 btn-glow"
      style={{ background: AC, color: '#0B0B0B', padding: pad, fontSize: text, boxShadow: '0 4px 32px rgba(201,162,74,0.28)' }}
    >
      <Flame className="w-3.5 h-3.5" /> {label}
    </a>
  );
}

export default function TheTorchBox() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* Brand Authority Line */}
      <div className="w-full text-center py-3 px-5" style={{ background: 'rgba(201,162,74,0.02)', borderBottom: '1px solid rgba(201,162,74,0.08)' }}>
        <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold" style={{ color: '#C9A24A' }}>Torch Republic Coffee Company · Est. 2024 · Premium Roasted Collector System</p>
      </div>
      <FomoBanner />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 'clamp(600px, 88vh, 960px)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 65% at 60% 50%, rgba(201,162,74,0.07) 0%, transparent 68%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 40% 50% at 20% 80%, rgba(201,162,74,0.03) 0%, transparent 55%)' }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-14 items-center"
          style={{ minHeight: 'clamp(600px, 88vh, 960px)', paddingTop: '6rem', paddingBottom: '6rem' }}>

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85 }}>
            <div className="flex items-center gap-3 mb-7">
              <Flame className="w-4 h-4" style={{ color: AC }} />
              <span className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>
                Torch Republic · Membership
              </span>
            </div>

            <h1 className="font-serif leading-none mb-5"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.8rem)', fontWeight: 800, letterSpacing: '-0.025em', color: '#FFFFFF' }}>
              Become a<br />
              <span style={{ color: AC }}>Torchbearer.</span>
            </h1>

            <div className="h-0.5 w-14 mb-6" style={{ background: `linear-gradient(90deg, ${AC}, transparent)` }} />

            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)', color: 'rgba(240,235,225,0.75)', lineHeight: 1.9, maxWidth: '440px', fontWeight: 300, marginBottom: '0.75rem' }}>
              Premium small-batch coffee. Historical legacy. Monthly collector editions.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(240,235,225,0.55)', lineHeight: 1.85, maxWidth: '400px', fontWeight: 400, marginBottom: '2.5rem' }}>
              More than a subscription. A intentional system built around the patriots and icons who shaped America — delivered to your door every month.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <StartBoxCTA size="md" />
              <a href="#what-you-get"
                className="inline-flex items-center justify-center font-mono text-[11px] tracking-[0.25em] uppercase transition-all hover:opacity-70"
                style={{ border: '1px solid rgba(201,162,74,0.22)', color: 'rgba(240,235,225,0.5)', padding: '16px 28px' }}>
                See What's Inside
              </a>
            </div>

            {/* Mini trust strip */}
            <div className="flex flex-wrap gap-5">
              {['Cancel anytime', 'Fresh roasted guarantee', 'Secure checkout'].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.55)' }} />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.32)' }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, rgba(201,162,74,0.1) 0%, transparent 68%)` }} />
            <img
              src="https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mockup_hero_dark.png_preview_81d6ce65-2c5f-4b97-9aaf-ad69c22e7212.jpg?v=1775822721"
              alt="The Torch Box"
              className="w-full max-w-[460px] object-cover relative z-10"
              style={{ opacity: 0.9 }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
      </section>

      <Divider />

      {/* ── FIRST ORDER BONUS ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <FirstOrderBonus />
      </section>

      <Divider />

      {/* ── NOT JUST COFFEE. A SYSTEM. ── */}
      <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[840px] mx-auto px-6 md:px-12 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(201,162,74,0.5)' }}>
              The Torch Republic System
            </p>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              Not just coffee.<br /><span style={{ color: AC }}>A system.</span>
            </h2>
            <div className="h-px w-14 mx-auto mb-7" style={{ background: `linear-gradient(90deg, transparent, ${AC}, transparent)` }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-10">
              {[
                { n: '01', label: 'Collect the Series', detail: 'Every month brings a new limited blend. Build your collection one box at a time.' },
                { n: '02', label: 'Learn the History', detail: 'Each blend tells a story — the men and women who built this nation, in your cup.' },
                { n: '03', label: 'Build Your Legacy', detail: 'Track your collection, unlock milestones, and complete the full Founders series.' },
              ].map((s, i) => (
                <motion.div key={s.n}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6" style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.1)' }}>
                  <p className="font-mono font-black mb-3" style={{ fontSize: '1.6rem', color: 'rgba(201,162,74,0.2)' }}>{s.n}</p>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: AC }}>{s.label}</p>
                  <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.875rem', lineHeight: 1.8, fontWeight: 300 }}>{s.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── WHAT YOU GET ── */}
      <section id="what-you-get" style={{ backgroundColor: '#0E0E0E', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Every Box Includes</p>
            <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F0EBE1', fontWeight: 700, letterSpacing: '-0.01em' }}>
              What you get with every delivery.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHATS_INSIDE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                  className="flex flex-col gap-4 p-7"
                  style={{ background: '#0B0B0B', border: '1px solid rgba(201,162,74,0.1)' }}>
                  <div className="w-10 h-10 flex items-center justify-center"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.18)' }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: AC }} />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: AC }}>{item.label}</p>
                  <p style={{ color: 'rgba(240,235,225,0.45)', fontSize: '0.875rem', lineHeight: 1.85, fontWeight: 300 }}>{item.detail}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mid-page CTA */}
          <div className="flex flex-col items-center gap-3 mt-14">
            <StartBoxCTA />
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>
              Cancel anytime · No contracts
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── VALUE COMPARISON ── */}
      <section style={{ backgroundColor: '#090909', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>The Math Is Simple</p>
            <h2 className="font-serif mb-2" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Buying individually vs. Torch Box
            </h2>
            <p className="font-heading mb-0" style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
              Members always pay less — plus get exclusive blends you can't buy anywhere else.
            </p>
            <ValueComparisonTable />
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── TIERS ── */}
      <section id="tiers" className="max-w-[1200px] mx-auto px-6 md:px-12 py-28">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Choose Your Level</p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Pick your box. Start today.
          </h2>
          <p className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Pause or cancel anytime · Most members start with Beacon
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <motion.div key={tier.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative flex flex-col"
              style={{
                background: tier.featured ? 'linear-gradient(160deg, #120E02 0%, #0C0C0C 100%)' : '#111',
                border: tier.featured ? `1px solid ${tier.color}55` : '1px solid rgba(201,162,74,0.1)',
                boxShadow: tier.featured ? `0 0 60px ${tier.color}0D` : 'none',
              }}
            >
              {/* Top color bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}AA, transparent)` }} />

              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="font-mono text-[9px] font-black tracking-[0.35em] uppercase px-4 py-1"
                    style={{ background: tier.featured ? tier.color : 'rgba(232,208,138,0.12)', color: tier.featured ? '#0B0B0B' : '#E8D08A', border: tier.featured ? 'none' : '1px solid rgba(232,208,138,0.4)' }}>
                    {tier.badge}
                  </span>
                </div>
              )}

              {tier.freeShipping && (
                <div className="flex items-center gap-1.5 px-6 pt-5">
                  <Truck className="w-2.5 h-2.5" style={{ color: tier.color }} />
                  <span className="font-mono text-[8px] uppercase tracking-wider" style={{ color: tier.color }}>Free Shipping Included</span>
                </div>
              )}

              <div className="p-7 flex flex-col gap-5 flex-1">
                {/* Name + price + retail comparison */}
                <div>
                  <h3 className="font-mono font-black tracking-[0.12em] uppercase mb-2" style={{ fontSize: '1rem', color: tier.color }}>{tier.name}</h3>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-mono font-black" style={{ fontSize: '2.4rem', color: '#FFFFFF' }}>${tier.price}</span>
                    <span className="font-mono text-sm" style={{ color: 'rgba(240,235,225,0.3)' }}>/mo</span>
                    <span className="font-mono text-sm line-through" style={{ color: 'rgba(255,255,255,0.2)' }}>${tier.retailValue}</span>
                  </div>
                  <p className="font-mono text-[9px] font-bold" style={{ color: '#4ade80' }}>{tier.savings}</p>
                </div>

                <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6 }}>{tier.tagline}</p>

                <div className="h-px" style={{ background: 'rgba(201,162,74,0.08)' }} />

                {/* Items */}
                <div className="flex flex-col gap-3 flex-1">
                  {tier.items.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                      <span style={{ color: 'rgba(240,235,225,0.65)', fontSize: '0.875rem', lineHeight: 1.7, fontWeight: 300 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={`https://torch-republic.com/products/${tier.handle}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 py-4 text-center font-mono font-black text-xs tracking-[0.22em] uppercase transition-all hover:opacity-90 block"
                  style={tier.featured
                    ? { background: tier.color, color: '#0B0B0B' }
                    : { border: `1px solid ${tier.color}45`, color: tier.color }
                  }
                >
                  Claim Your Box →
                </a>

                <p className="text-center font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Cancel anytime · No commitment
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip below tiers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          {TRUST.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 p-4" style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.1)' }}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.6)' }} />
              <div>
                <p className="font-heading text-[11px] font-semibold" style={{ color: '#F0EBE1' }}>{label}</p>
                <p className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.28)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── COLLECTOR SYSTEM ── */}
      <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>The Collector System</p>
            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Collect the Founders.<br />
              <span style={{ color: AC }}>Unlock the story.</span>
            </h2>
            <p style={{ color: 'rgba(240,235,225,0.42)', lineHeight: 1.9, fontWeight: 300, maxWidth: '460px', margin: '0 auto', fontSize: '0.95rem' }}>
              Each Torch Box delivers a different blend from the Founders Series. Once a roast retires, it joins the Archive — never roasted again.
            </p>
          </motion.div>

          {/* Founder grid */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
            {FOUNDERS.map((f, i) => (
              <motion.div key={f.name}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="group relative overflow-hidden"
                style={{ aspectRatio: '3/4', background: '#111', border: '1px solid rgba(201,162,74,0.1)' }}>
                <img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.75 }} onError={e => e.currentTarget.style.display = 'none'} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)' }} />
                <p className="absolute bottom-2 left-0 right-0 text-center font-mono text-[9px] font-black tracking-widest uppercase" style={{ color: AC }}>
                  {f.name}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {['Collect all 6 Founders', 'Each blend retires forever', 'New series releasing regularly'].map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full" style={{ background: AC }} />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.38)' }}>{line}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <StartBoxCTA />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── TORCHBEARER CARD ── */}
      <section style={{ backgroundColor: '#080808', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-5">
              <TorchbearerCard />
              <p className="font-mono text-[8px] tracking-[0.35em] uppercase text-center" style={{ color: 'rgba(201,162,74,0.3)' }}>
                Torchbearer Card · Included with every membership
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-7">
              <div>
                <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Membership Card</p>
                <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Your card.<br />
                  <span style={{ color: AC }}>Your legacy.</span>
                </h2>
                <p style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem' }}>
                  Each Torchbearer card includes a unique QR code unlocking exclusive content, founder stories, and member rewards. Your key to the full Torch Republic experience.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { icon: QrCode, label: 'Hall of History', detail: 'Scan to access curated historical content, founder stories, and rare quotes.' },
                  { icon: BookOpen, label: 'Collection Progress', detail: 'Track your Founders Series and unlock achievements as you complete each series.' },
                  { icon: CreditCard, label: 'Member Rewards', detail: 'Exclusive content, trivia, challenges, and future member-only drops.' },
                ].map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-4 p-4"
                    style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.09)' }}>
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(201,162,74,0.07)', border: '1px solid rgba(201,162,74,0.15)' }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: AC }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold mb-1" style={{ color: AC }}>{label}</p>
                      <p style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.82rem', lineHeight: 1.75, fontWeight: 300 }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SOCIAL PROOF ── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>Join the Community</p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700 }}>
            Join other Torchbearers<br />
            <span style={{ color: AC }}>across America.</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: AC }} />)}
            <span className="font-mono text-sm font-bold ml-2" style={{ color: AC }}>4.8</span>
            <span className="font-mono text-[10px] ml-1" style={{ color: 'rgba(255,255,255,0.28)' }}>· 200+ verified subscribers</span>
          </div>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Growing every week — limited spots per month
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((rev, i) => (
            <motion.div key={rev.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 flex flex-col gap-4"
              style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.1)' }}>
              <div className="flex items-center gap-0.5">
                {[...Array(rev.rating)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" style={{ color: AC }} />)}
              </div>
              <p style={{ color: 'rgba(240,235,225,0.72)', fontSize: '0.9rem', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 300 }}>
                "{rev.text}"
              </p>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
                <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.65)' }}>{rev.name}</span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{rev.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-px h-14 mx-auto mb-12" style={{ background: `linear-gradient(to bottom, transparent, ${AC})` }} />

            <Flame className="w-8 h-8 mx-auto mb-6" style={{ color: 'rgba(201,162,74,0.55)' }} />

            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-6" style={{ color: 'rgba(201,162,74,0.4)' }}>
              Step 3: Complete Your Membership
            </p>
            <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#F0EBE1', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              Become a Torchbearer.<br />
              <span style={{ color: AC }}>Carry the Flame.</span>
            </h2>
            <p style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.9, fontWeight: 400, maxWidth: '400px', margin: '0 auto 1rem', fontSize: '0.95rem' }}>
              Premium small-batch coffee. American historical legacy. Built intentionally. Delivered monthly.
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-10" style={{ color: 'rgba(201,162,74,0.4)' }}>
              Cancel anytime · No commitment required
            </p>

            <StartBoxCTA size="lg" label="Claim Your Box Today" />

            {/* Final trust row */}
            <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(201,162,74,0.55)' }} />
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.32)' }}>{label}</span>
                </div>
              ))}
            </div>
            
            {/* Customer Journey Navigation */}
            <div className="mt-10 pt-8 text-center" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>Your Journey with Torch Republic</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[9px]">
                <Link to="/" className="transition-colors hover:opacity-70" style={{ color: 'rgba(201,162,74,0.6)' }}>← Home</Link>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                <Link to="/CoffeeCollection" className="transition-colors hover:opacity-70" style={{ color: 'rgba(201,162,74,0.6)' }}>Explore Collection</Link>
                <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                <span style={{ color: '#C9A24A' }} className="font-bold">Join Torch Box</span>
              </div>
            </div>
            
            {/* Brand signature */}
            <div className="mt-6 pt-4 text-center" style={{ borderTop: '1px solid rgba(201,162,74,0.1)' }}>
              <p className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.35)' }}>Torch Republic Coffee Company · Est. 2024</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}