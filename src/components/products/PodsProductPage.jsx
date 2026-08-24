import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AddToCartButton from '../founders/AddToCartButton';
import { ChevronRight, Flame, Star, Check, Lock, ShieldCheck, Truck, Zap } from 'lucide-react';

const TRUST_ITEMS = [
  { Icon: Flame, label: 'Small Batch Roasted', sub: 'Fresh sealed pods' },
  { Icon: ShieldCheck, label: 'Quality Guaranteed', sub: 'Love it or we make it right' },
  { Icon: Lock, label: 'Secure Checkout', sub: 'SSL encrypted · Safe payment' },
];

export default function PodsProductPage({ data }) {
  const {
    title = 'Washington Blend Pods',
    code = 'TR-001',
    accent = '#C9A24A',
    price = '$16.99',
    shopifyHandle = 'washington-blend-coffee-pods',
    heroImage = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8d91192b7_tcr_coffee_blank_final_latestdd3.jpeg',
    images = [heroImage],
    hook = 'Strength without noise. Leadership without compromise.',
    heroDescription = 'Washington didn\'t chase comfort — he built discipline. This blend reflects that same standard: bold, steady, and built to endure.',
    flavorNotes = { roast: 'Dark Roast', body: 'Full, rich, structured', finish: 'Smooth with smoky depth', notes: ['Cocoa', 'Smoke', 'Bold Spice'] },
    founderStory = 'Through brutal winters and impossible odds, one thing remained constant — discipline. Washington Blend is built the same way.',
  } = data || {};

  const [activeImg, setActiveImg] = useState(0);
  const ac = accent;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808', color: '#F0EBE1' }}>

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 pt-5">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>
            Torch Republic Coffee Company
          </span>
        </div>
        <nav className="flex items-center gap-1.5 flex-wrap font-mono text-[10px]" style={{ letterSpacing: '0.08em' }}>
          <Link to="/" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Home</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <Link to="/Shop" className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.28)' }}>Shop</Link>
          <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }} />
          <span style={{ color: `${ac}70` }}>{title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative w-full mt-6 flex items-center justify-center overflow-hidden"
        style={{ minHeight: 'clamp(280px, 42vh, 480px)', background: '#050505' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 52%, ${ac}14 0%, transparent 70%)`,
        }} />
        <motion.img
          src={heroImage}
          alt={title}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 object-contain"
          style={{ maxHeight: 'clamp(220px, 36vh, 420px)', maxWidth: '72%', filter: 'drop-shadow(0 0 40px rgba(201,162,74,0.18))' }}
        />
        {code && (
          <div className="absolute top-5 left-5 md:left-10 z-20">
            <span className="font-mono text-[10px] font-black tracking-[0.35em] uppercase px-3 py-1.5" style={{ background: ac, color: '#0B0B0B' }}>
              {code}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: 80, background: 'linear-gradient(to top, #080808, transparent)' }} />
      </section>

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-12 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Product Details */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>

            {/* Title Block */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
                  style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}30` }}>
                  Founders Series
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase px-2.5 py-1"
                  style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Keurig Compatible
                </span>
              </div>

              <h1 className="font-serif leading-none mb-2" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                {title}
              </h1>

              <p className="font-mono text-[11px] tracking-[0.35em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                — Coffee Pods Box
              </p>

              {/* Rating */}
              <a href="#reviews" className="flex items-center gap-2 mb-6 w-fit">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" style={{ color: ac }} />)}
                </div>
                <span className="font-mono text-[10px]" style={{ color: ac }}>4.9</span>
                <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.28)' }}>(240+ reviews)</span>
              </a>

              {/* Hook */}
              <p className="font-serif italic mb-6" style={{ fontSize: '1.15rem', color: `${ac}`, fontWeight: 500, lineHeight: 1.7 }}>
                "{hook}"
              </p>
            </div>

            <div className="h-px w-full mb-8" style={{ background: `linear-gradient(90deg, ${ac}30, transparent)` }} />

            {/* Hero Description */}
            <div className="mb-8 p-5" style={{ background: '#0D0D0D', border: `1px solid ${ac}14` }}>
              <p className="font-heading" style={{ fontSize: '0.95rem', color: '#F0EBE1', lineHeight: 1.85, fontWeight: 400 }}>
                {heroDescription}
              </p>
            </div>

            {/* Flavor Profile */}
            <div className="mb-8 p-5" style={{ background: '#0D0D0D', border: `1px solid ${ac}14` }}>
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${ac}55` }}>
                Flavor Profile
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: `${ac}70` }}>Roast</p>
                  <p className="font-serif" style={{ fontSize: '1rem', color: '#F0EBE1' }}>{flavorNotes.roast}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: `${ac}70` }}>Body</p>
                  <p className="font-serif" style={{ fontSize: '1rem', color: '#F0EBE1' }}>{flavorNotes.body}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: `${ac}70` }}>Finish</p>
                  <p className="font-serif" style={{ fontSize: '1rem', color: '#F0EBE1' }}>{flavorNotes.finish}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: `${ac}70` }}>Notes</p>
                  <div className="flex flex-wrap gap-2">
                    {flavorNotes.notes.map(note => (
                      <span key={note} className="font-mono text-[9px] px-2.5 py-1" style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}25` }}>
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Built for Your Routine */}
            <div className="mb-10 p-5" style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.09)' }}>
              <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: `${ac}65` }}>
                Built for Your Routine
              </p>
              <ul className="space-y-2.5">
                {[
                  'Compatible with Keurig-style brewers',
                  'Precision-sealed pods for maximum freshness',
                  'Consistent strength, every single cup',
                  'No measuring. No compromise. Just excellence.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: ac }} />
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.65 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Founder Story */}
            <div className="p-5" style={{ background: `${ac}08`, border: `1px solid ${ac}30` }}>
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold mb-3" style={{ color: ac }}>
                The Founder's Discipline
              </p>
              <p className="font-serif italic" style={{ fontSize: '0.95rem', color: '#F0EBE1', lineHeight: 1.8, fontWeight: 500 }}>
                "{founderStory}"
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Image + Purchase */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="flex flex-col gap-5 lg:sticky lg:top-24"
          >
            {/* Image */}
            <div className="relative" style={{ background: '#050505' }}>
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${ac}10 0%, transparent 70%)`,
              }} />
              <img
                src={images[activeImg]}
                alt={title}
                className="w-full object-contain transition-all duration-500"
                style={{ aspectRatio: '4/5', opacity: 0.9 }}
              />
              {images.length > 1 && (
                <div className="absolute top-3 right-3">
                  <span className="font-mono text-[9px] px-2 py-1" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(0,0,0,0.6)' }}>
                    {activeImg + 1} / {images.length}
                  </span>
                </div>
              )}
            </div>

            {/* Image thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} className="flex-1 overflow-hidden transition-all"
                    style={{ border: i === activeImg ? `1px solid ${ac}` : '1px solid rgba(196,163,90,0.1)', opacity: i === activeImg ? 1 : 0.5 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" style={{ aspectRatio: '1/1' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Purchase Section */}
            <div className="p-6" style={{ background: '#0F0F0F', border: '1px solid rgba(196,163,90,0.15)' }}>
              {/* Popular Choice Badge */}
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase px-2.5 py-1"
                  style={{ background: `${ac}12`, color: ac, border: `1px solid ${ac}30` }}>
                  ★ First Batch Release
                </span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  Limited Availability
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono font-black" style={{ fontSize: '2.2rem', color: ac }}>{price}</span>
                <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5"
                  style={{ background: `${ac}15`, color: ac, border: `1px solid ${ac}25` }}>
                  Premium Pods
                </span>
              </div>

              {/* Value Statement */}
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-6 pb-6" style={{ color: `${ac}60`, borderBottom: `1px solid ${ac}15` }}>
                Premium small-batch coffee. No fillers. No shortcuts.
              </p>

              {/* Trust Bullets */}
              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  { icon: '🇺🇸', text: 'Roasted & Packed in USA' },
                  { icon: '☕', text: 'Keurig-Compatible Pods' },
                  { icon: '🔥', text: 'Small Batch • Fresh Sealed' },
                  { icon: '⚡', text: 'Ships Fast from U.S.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Urgency */}
              <div className="flex items-center gap-2 mb-6 p-3" style={{ background: 'rgba(201,162,74,0.08)', border: `1px solid ${ac}25`, borderRadius: '4px' }}>
                <Zap className="w-4 h-4 flex-shrink-0" style={{ color: ac }} />
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase font-bold" style={{ color: ac }}>
                  ⚠️ First Batch Release — Limited Availability
                </p>
              </div>

              {/* CTA */}
              <AddToCartButton shopifyHandle={shopifyHandle} accent={ac} label="Add to Cart — Premium Pods" />

              {/* Micro-trust */}
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                {[
                  { icon: Lock, label: 'Secure Checkout' },
                  { icon: ShieldCheck, label: 'Quality Guaranteed' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
                    <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Strip */}
            <div className="grid grid-cols-3 gap-2">
              {TRUST_ITEMS.map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 py-4 px-2"
                  style={{ background: '#0C0C0C', border: '1px solid rgba(196,163,90,0.08)' }}>
                  <Icon className="w-4 h-4" style={{ color: ac }} />
                  <p className="font-heading text-[11px] font-semibold leading-tight" style={{ color: '#F0EBE1' }}>
                    {label}
                  </p>
                  <p className="font-mono text-[8px] leading-tight" style={{ color: 'rgba(240,235,225,0.3)' }}>
                    {sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="flex items-center gap-4 my-14">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,163,90,0.25))' }} />
          <Flame className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(196,163,90,0.35)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(196,163,90,0.25), transparent)' }} />
        </div>
      </div>

      {/* Torch Box Upsell */}
      <section style={{ backgroundColor: '#0E0E0E', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-20 text-center">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: `${ac}45` }}>
            Get This Monthly
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#F0EBE1', fontWeight: 800 }}>
            Join Torch Box
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
            Get Washington Blend Pods delivered monthly. Save 15% on every delivery, unlock exclusive releases, and never run out.
          </p>
          <Link to="/TheTorchBox"
            className="inline-flex items-center gap-2 font-mono font-black text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-90"
            style={{ background: ac, color: '#0B0B0B', padding: '13px 28px' }}>
            Become a Torchbearer →
          </Link>
        </div>
      </section>
    </div>
  );
}