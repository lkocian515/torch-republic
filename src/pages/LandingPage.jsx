import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Check, Truck, ShieldCheck, RotateCcw, Star } from 'lucide-react';

const REVIEWS = [
  { name: 'Marcus T.', location: 'Nashville, TN', text: 'Best coffee I\'ve had in years. The Washington Blend is my daily ritual now.', rating: 5 },
  { name: 'Rachel B.', location: 'Knoxville, TN', text: 'The quality is unreal. Premium packaging, premium coffee — worth every penny.', rating: 5 },
  { name: 'James R.', location: 'Austin, TX', text: 'Bold flavors, zero bitterness. Every cup carries meaning.', rating: 5 },
];

const BEST_SELLERS = [
  { name: 'Washington Blend', price: '$19.99', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-7_7567e36f-1c97-4da4-9564-83e59f922553.jpg?v=1775891757', route: '/WashingtonBlend' },
  { name: 'Lincoln Blend', price: '$19.99', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-10_55eaf3da-19a5-40c5-9a5c-47c88cf40a44.jpg?v=1775891841', route: '/LincolnBlend' },
  { name: 'Jefferson Blend', price: '$19.99', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/image-8_3f3a45dd-8d2c-4a04-b3e7-7657eb306db4.jpg?v=1775891841', route: '/JeffersonBlend' },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: 'Satisfaction Guaranteed', sub: '30-day returns' },
  { icon: Truck, label: 'Fast Shipping', sub: 'Ships within 24 hours' },
  { icon: RotateCcw, label: 'Pause Anytime', sub: 'No commitment' },
];

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="w-3 h-3 fill-current" style={{ color: '#C9A24A' }} />
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 50%, rgba(201,162,74,0.08) 0%, transparent 65%)' }} />
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="w-5 h-5" style={{ color: '#C9A24A' }} />
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase" style={{ color: 'rgba(201,162,74,0.6)' }}>
                Premium Small-Batch Coffee
              </span>
            </div>

            <h1 className="font-serif leading-none mb-6"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Carry the<br />
              <span style={{ color: '#C9A24A' }}>Flame</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, maxWidth: '520px', margin: '0 auto 2rem', fontWeight: 300 }}>
              Small-batch coffee built for discipline, focus, and purpose. Every cup carries a story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link to="/Shop"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all"
                style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 30px rgba(201,162,74,0.3)' }}>
                <Flame className="w-4 h-4" /> Shop Coffee
              </Link>
              <Link to="/TheTorchBox"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 font-mono text-sm tracking-[0.2em] uppercase transition-all"
                style={{ border: '1px solid rgba(201,162,74,0.3)', color: 'rgba(240,235,225,0.65)' }}>
                Join Torch Box
              </Link>
            </div>

            <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(201,162,74,0.4)' }}>
              ★ 4.8+ avg rating · 200+ verified buyers
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />
      </section>

      {/* ── SECTION 2: SOCIAL PROOF ── */}
      <section className="py-16 px-6 md:px-12" style={{ background: '#080808', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[9px] tracking-[0.4em] uppercase text-center mb-12"
            style={{ color: 'rgba(201,162,74,0.45)' }}>
            Trusted by Discipline-Driven Buyers
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 flex flex-col gap-4"
                style={{ background: '#0E0E0E', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <Stars n={review.rating} />
                <p style={{ color: 'rgba(240,235,225,0.7)', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', fontWeight: 300 }}>
                  "{review.text}"
                </p>
                <div className="pt-3 flex items-center justify-between" style={{ borderTop: '1px solid rgba(201,162,74,0.07)' }}>
                  <span className="font-mono text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>{review.name}</span>
                  <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{review.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: BEST SELLERS ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.45)' }}>Most Loved</p>
            <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F0EBE1', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Best Sellers
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {BEST_SELLERS.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={product.route} className="group flex flex-col gap-4 h-full">
                  <div className="overflow-hidden flex-1 relative" style={{ aspectRatio: '3/4', background: '#111' }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ opacity: 0.85 }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                    <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] font-black tracking-[0.2em] uppercase"
                      style={{ color: '#C9A24A' }}>
                      {product.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.5)' }}>12 oz</span>
                    <span className="font-mono font-black" style={{ color: '#C9A24A' }}>{product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/CoffeeCollection"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
              style={{ color: 'rgba(201,162,74,0.55)', borderBottom: '1px solid rgba(201,162,74,0.2)', paddingBottom: '3px' }}>
              View Full Collection →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TORCH BOX CTA ── */}
      <section style={{ backgroundColor: '#0F0F0F', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-1 h-12 mx-auto mb-6" style={{ background: 'linear-gradient(to bottom, #C9A24A, transparent)' }} />
            
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.4)' }}>
              Tired of Running Out?
            </p>

            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', color: '#F0EBE1', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Get it delivered<br />
              <span style={{ color: '#C9A24A' }}>every month</span>
            </h2>

            <p style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.85, fontWeight: 300, maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
              Join Torch Box. Save 15% on subscriptions. Never run out of your favorite roast.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {[
                '✓ Save 15% on every order',
                '✓ Free shipping (top tier)',
                '✓ Pause or cancel anytime',
              ].map((item, i) => (
                <span key={i} className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgba(201,162,74,0.55)' }}>
                  {item}
                </span>
              ))}
            </div>

            <Link to="/TheTorchBox"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all"
              style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 30px rgba(201,162,74,0.3)' }}>
              <Flame className="w-4 h-4" /> Explore Torch Box
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: TRUST ── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[9px] tracking-[0.4em] uppercase text-center mb-12"
            style={{ color: 'rgba(201,162,74,0.45)' }}>
            Shop with Confidence
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => {
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-4 p-8"
                  style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.1)' }}
                >
                  <div className="w-10 h-10 flex items-center justify-center"
                    style={{ background: 'rgba(201,162,74,0.08)', border: '1px solid rgba(201,162,74,0.15)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#C9A24A' }} />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: '#C9A24A' }}>{label}</p>
                  <p style={{ color: 'rgba(240,235,225,0.4)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300 }}>{sub}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)' }}>
        <div className="max-w-[720px] mx-auto px-6 md:px-12 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Flame className="w-6 h-6 mx-auto mb-6" style={{ color: 'rgba(201,162,74,0.6)' }} />

            <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Ready to carry the flame?
            </h2>

            <p style={{ color: 'rgba(240,235,225,0.4)', lineHeight: 1.85, fontWeight: 300, maxWidth: '380px', margin: '0 auto 2rem', fontSize: '0.95rem' }}>
              Join hundreds of discipline-driven buyers. Premium coffee. Zero compromise.
            </p>

            <Link to="/Shop"
              className="inline-flex items-center justify-center gap-2 px-12 py-5 font-mono font-black text-sm tracking-[0.25em] uppercase transition-all"
              style={{ background: '#C9A24A', color: '#0B0B0B', boxShadow: '0 4px 30px rgba(201,162,74,0.3)' }}>
              <Flame className="w-4 h-4" /> Start Shopping
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}