import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Star, Shield, Gift, ChevronRight, Check, Flame } from 'lucide-react';

const PLANS = [
  {
    name: 'Ember',
    price: 29,
    description: 'Start the flame.',
    bullets: [
      '1 exclusive apparel item',
      'Patriotic accessories',
      'Members-only discount code',
      'Monthly themed content',
    ],
    best: false,
  },
  {
    name: 'Beacon',
    price: 49,
    description: 'The most popular tier.',
    bullets: [
      'Everything in Ember',
      '2–3 curated items per box',
      'Early access to new drops',
      'Bonus surprise item',
      'Priority shipping',
    ],
    best: true,
  },
  {
    name: 'Blaze',
    price: 69,
    description: 'For those who carry it furthest.',
    bullets: [
      'Everything in Beacon',
      'Exclusive Blaze-only gear',
      'Limited edition collectibles',
      'VIP member community access',
      'Highest value per box',
    ],
    best: false,
  },
];

const BENEFITS = [
  { icon: Gift,    title: 'Exclusive Gear',    description: 'Items you won\'t find anywhere else — designed for those who live it.' },
  { icon: Star,    title: 'Monthly Themes',    description: 'Each box is built around a conviction. Faith. Freedom. Founders. Truth.' },
  { icon: Shield,  title: 'Premium Quality',   description: 'Every item meets the Torch Republic standard. No filler. No compromise.' },
  { icon: Package, title: 'Always More Value', description: 'Curated to deliver far more than the subscription price.' },
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
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>

      {/* ── HERO ── */}

      {/* Box image - full width at very top */}
      <section className="w-full pt-24">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/d7b6f1c99_Untitleddesign_20260310_044300_0000.png"
          alt="The Torch Box"
          className="w-full"
        />
      </section>

      <section className="relative overflow-hidden pt-4 pb-8 px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #C8A44D, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/0f7488514_THETORCHBOX_20260310_040137_0000.png"
              alt="The Torch Box"
              className="w-52 md:w-64 mt-12"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-3 text-base md:text-lg max-w-xs mx-auto leading-snug"
            style={{ color: '#E8DFAF99' }}
          >
            A monthly subscription box for those who stand for something. Curated with faith, freedom, and truth — delivered to your door.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mt-3 text-sm font-mono tracking-wider whitespace-nowrap"
            style={{ color: '#C8A44D99' }}
          >
            Sign up below to be notified when it drops.
          </motion.p>

          {/* Email signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 max-w-md mx-auto"
          >
            {submitted ? (
              <div
                className="flex items-center justify-center gap-3 px-6 py-4"
                style={{ border: '1px solid rgba(201,162,74,0.3)', backgroundColor: 'rgba(201,162,74,0.06)' }}
              >
                <Check className="w-5 h-5" style={{ color: '#C9A24A' }} />
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
                  className="flex-1 px-4 py-3 text-sm font-mono bg-transparent focus:outline-none"
                  style={{ border: '1px solid rgba(214,181,101,0.25)', color: '#E8DFAF', backgroundColor: 'rgba(255,255,255,0.04)' }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 font-mono font-bold text-sm tracking-widest uppercase transition-all duration-200 whitespace-nowrap"
                  style={{ backgroundColor: '#C8A44D', color: '#000000' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#E4C46A'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#C8A44D'}
                >
                  Notify Me
                </button>
              </form>
            )}
            <p className="mt-3 text-xs font-mono" style={{ color: '#E8DFAF44' }}>
              Be first to know when The Torch Box launches. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-5">
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(201,162,74,0.1)' }} />
          <Flame className="w-4 h-4" style={{ color: 'rgba(201,162,74,0.4)' }} />
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(201,162,74,0.1)' }} />
        </div>
      </div>

      {/* ── PLANS ── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>Choose Your Tier</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Select Your Membership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative flex flex-col"
                style={{
                  backgroundColor: plan.best ? 'rgba(201,162,74,0.05)' : 'rgba(255,255,255,0.02)',
                  border: plan.best ? '1px solid rgba(201,162,74,0.45)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {plan.best && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-1" style={{ backgroundColor: '#C9A24A', color: '#080808', fontWeight: 700 }}>
                      Best Value
                    </span>
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  {/* Tier name */}
                  <div className="mb-6">
                    <p className="font-mono text-[11px] tracking-[0.45em] uppercase mb-2" style={{ color: plan.best ? '#C9A24A' : 'rgba(255,255,255,0.35)' }}>
                      Tier {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '2rem' }}>{plan.name}</h3>
                    <p className="font-heading font-light text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8" style={{ borderBottom: `1px solid ${plan.best ? 'rgba(201,162,74,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
                    <span className="font-mono font-bold text-white" style={{ fontSize: '2.5rem' }}>${plan.price}</span>
                    <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>/month</span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.bullets.map(b => (
                      <li key={b} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: '#C9A24A' }} />
                        <span className="font-heading font-light text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA note */}
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-center" style={{ color: 'rgba(201,162,74,0.4)' }}>
                    Coming Soon
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="px-6 py-20" style={{ borderTop: '1px solid rgba(201,162,74,0.08)', backgroundColor: '#0B0B0B' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>Why Subscribe</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>Built for the Bold</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-7"
                  style={{ border: '1px solid rgba(201,162,74,0.1)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  <Icon className="w-5 h-5 mb-5" style={{ color: '#C9A24A' }} />
                  <h3 className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-white">{b.title}</h3>
                  <p className="font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="px-6 py-20" style={{ backgroundColor: '#080808' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="p-10 md:p-14"
            style={{ border: '1px solid rgba(201,162,74,0.15)', backgroundColor: 'rgba(201,162,74,0.02)' }}
          >
            <div className="text-center mb-10">
              <p className="font-mono text-[11px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.6)' }}>What's Inside</p>
              <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>Every Box Includes</h2>
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
                  <span className="font-heading text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM BRAND STATEMENT ── */}
      <section className="px-6 py-24" style={{ borderTop: '1px solid rgba(201,162,74,0.08)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,74,0.35))' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#C9A24A' }} />
            <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, rgba(201,162,74,0.35), transparent)' }} />
          </div>
          <p className="font-serif font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)' }}>
            "Carry the flame.<br />Every single month."
          </p>
          <p className="font-heading font-light text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
            The Torch Box is coming. Be first in line.
          </p>
        </div>
      </section>

    </div>
  );
}