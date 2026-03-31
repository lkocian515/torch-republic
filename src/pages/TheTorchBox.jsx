import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Star, Shield, Gift, ChevronRight, Check, Flame } from 'lucide-react';

const PLANS = [
  {
    tier: 'Ember',
    price: 29,
    tagline: 'Start the fire.',
    bullets: [
      '1 exclusive apparel item',
      '2–3 patriotic accessories',
      'Members-only discount code',
      'Monthly theme reveal',
    ],
  },
  {
    tier: 'Beacon',
    price: 49,
    tagline: 'Carry it further.',
    best: true,
    bullets: [
      'Everything in Ember',
      '2 exclusive apparel items',
      'Bonus collectible or gear item',
      'Early access to new drops',
      'Priority shipping',
    ],
  },
  {
    tier: 'Blaze',
    price: 69,
    tagline: 'Lead the charge.',
    bullets: [
      'Everything in Beacon',
      'Premium limited-edition item',
      'Surprise bonus item every box',
      'Blaze member badge & recognition',
      'Free shipping always',
    ],
  },
];

const BENEFITS = [
  { icon: Package, title: 'Curated Monthly Box',        body: 'Hand-picked patriotic apparel, accessories, and exclusive items delivered to your door each month.' },
  { icon: Star,    title: 'Members-Only Exclusives',    body: "Access to limited-edition products, early drops, and items you won't find anywhere else." },
  { icon: Shield,  title: 'Faith · Freedom · Truth',    body: 'Every item in The Torch Box reflects our core values and the convictions you live by.' },
  { icon: Gift,    title: 'Always More Than You Pay',   body: 'Each box is curated to deliver value that far exceeds the subscription price.' },
];

const WHAT_TO_EXPECT = [
  'Premium faith-based apparel',
  'Patriotic accessories & gear',
  'Exclusive Torch Republic merchandise',
  'Seasonal limited-edition items',
  'Members-only discount codes',
  'Surprise bonus items',
];

export default function TheTorchBox() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-24 px-6 flex flex-col items-center" style={{ minHeight: '90vh' }}>
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,162,74,0.07) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0B0B0B, transparent)' }} />

        {/* Box image — glowing on dark */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl mx-auto mb-8"
        >
          {/* Gold bloom behind the box */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 55%, rgba(201,162,74,0.18) 0%, transparent 70%)', filter: 'blur(24px)' }}
          />
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/d7b6f1c99_Untitleddesign_20260310_044300_0000.png"
            alt="The Torch Box"
            className="relative w-full"
            style={{ filter: 'drop-shadow(0 0 40px rgba(201,162,74,0.25)) drop-shadow(0 20px 60px rgba(0,0,0,0.8))' }}
          />
        </motion.div>

        {/* Logo wordmark */}
        <motion.img
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/0f7488514_THETORCHBOX_20260310_040137_0000.png"
          alt="The Torch Box"
          className="relative z-10 w-48 md:w-60 mb-5"
        />

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="relative z-10 text-center mb-3"
        >
          <p className="font-serif font-bold text-white mb-2" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
            Built for Torchbearers.
          </p>
          <p className="font-heading font-light text-sm md:text-base max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(232,223,175,0.55)' }}>
            A monthly subscription box for those who stand for something. Curated with faith, freedom, and truth — delivered to your door.
          </p>
        </motion.div>

        {/* Coming soon badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative z-10 flex items-center gap-3 mb-8"
        >
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.5))' }} />
          <span className="font-mono text-xs tracking-[0.45em] uppercase" style={{ color: 'rgba(201,162,74,0.7)' }}>
            Coming Soon
          </span>
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.5), transparent)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="relative z-10 font-mono text-xs tracking-wider mb-6"
          style={{ color: 'rgba(201,162,74,0.6)' }}
        >
          Sign up below to be notified when it drops.
        </motion.p>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="relative z-10 w-full max-w-md"
        >
          {submitted ? (
            <div className="flex items-center justify-center gap-3 px-6 py-4" style={{ border: '1px solid rgba(201,162,74,0.3)', backgroundColor: 'rgba(201,162,74,0.06)' }}>
              <Check className="w-4 h-4" style={{ color: '#C8A44D' }} />
              <p className="font-mono text-sm tracking-wider" style={{ color: '#E8DFAF' }}>
                You're on the list. We'll notify you at launch!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3.5 text-sm font-mono bg-transparent focus:outline-none"
                style={{ border: '1px solid rgba(214,181,101,0.25)', color: '#E8DFAF', backgroundColor: 'rgba(255,255,255,0.04)' }}
              />
              <button
                type="submit"
                className="px-7 py-3.5 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-200 whitespace-nowrap"
                style={{ backgroundColor: '#C8A44D', color: '#000' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E4C46A'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C8A44D'}
              >
                Notify Me
              </button>
            </form>
          )}
          <p className="mt-3 text-xs font-mono text-center" style={{ color: 'rgba(232,223,175,0.25)' }}>
            Be first to know when The Torch Box launches. No spam, ever.
          </p>
        </motion.div>
      </section>

      {/* ── PLANS ── */}
      <section className="px-6 pb-28" style={{ backgroundColor: '#0B0B0B' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4))' }} />
              <span className="font-mono text-[11px] tracking-[0.5em] uppercase" style={{ color: 'rgba(201,162,74,0.7)' }}>Membership Tiers</span>
              <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.4), transparent)' }} />
            </div>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Choose Your Level
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative flex flex-col p-8"
                style={{
                  backgroundColor: plan.best ? 'rgba(201,162,74,0.05)' : 'rgba(255,255,255,0.02)',
                  border: plan.best ? '1px solid rgba(201,162,74,0.5)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {plan.best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase px-4 py-1" style={{ backgroundColor: '#C9A24A', color: '#0B0B0B', fontWeight: 700 }}>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 flex-shrink-0" style={{ color: plan.best ? '#C9A24A' : 'rgba(201,162,74,0.45)' }} />
                  <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: plan.best ? '#C9A24A' : 'rgba(201,162,74,0.5)' }}>
                    {plan.tier}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-mono font-bold text-white" style={{ fontSize: '2.6rem' }}>${plan.price}</span>
                  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>/mo</span>
                </div>

                <p className="font-heading font-light text-sm mb-7" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {plan.tagline}
                </p>

                {/* Divider */}
                <div className="h-px mb-7" style={{ backgroundColor: plan.best ? 'rgba(201,162,74,0.2)' : 'rgba(255,255,255,0.06)' }} />

                {/* Bullets */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: plan.best ? '#C9A24A' : 'rgba(201,162,74,0.5)' }} />
                      <span className="font-heading font-light text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="w-full py-4 font-mono text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300"
                  style={plan.best
                    ? { backgroundColor: '#C9A24A', color: '#0B0B0B' }
                    : { border: '1px solid rgba(201,162,74,0.3)', color: 'rgba(201,162,74,0.7)', backgroundColor: 'transparent' }
                  }
                  onMouseEnter={e => { if (!plan.best) e.currentTarget.style.borderColor = 'rgba(201,162,74,0.7)'; }}
                  onMouseLeave={e => { if (!plan.best) e.currentTarget.style.borderColor = 'rgba(201,162,74,0.3)'; }}
                >
                  Join {plan.tier}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.06)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.7)' }}>Why Subscribe</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>Built for the Bold</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7"
                  style={{ border: '1px solid rgba(201,162,74,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <Icon className="w-5 h-5 mb-5" style={{ color: '#C9A24A' }} />
                  <h3 className="font-heading font-semibold text-sm uppercase tracking-wide mb-3 text-white">{b.title}</h3>
                  <p className="font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>{b.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0B0B0B' }}>
        <div className="max-w-4xl mx-auto">
          <div className="p-12 md:p-16" style={{ border: '1px solid rgba(201,162,74,0.12)', backgroundColor: 'rgba(201,162,74,0.02)' }}>
            <div className="text-center mb-10">
              <p className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.7)' }}>What's Inside</p>
              <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>Every Box Includes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_TO_EXPECT.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C9A24A' }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING STATEMENT ── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.06)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-5 mb-8">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.4))' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C9A24A' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.4), transparent)' }} />
          </div>
          <p className="font-serif font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
            "Don't just wear the message.<br />
            <span style={{ color: '#C9A24A', fontStyle: 'italic' }}>Live it."</span>
          </p>
          <p className="font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            The Torch Box is built for those who carry conviction into every room they walk into.<br />
            Launching soon. Reserve your spot.
          </p>
        </div>
      </section>
    </div>
  );
}