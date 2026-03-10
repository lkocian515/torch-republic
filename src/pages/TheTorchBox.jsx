import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Star, Shield, Gift, ChevronRight, Check } from 'lucide-react';
import NewsletterSection from '../components/home/NewsletterSection';

const PERKS = [
  {
    icon: Package,
    title: 'Curated Monthly Box',
    description: 'Hand-picked patriotic apparel, accessories, and exclusive items delivered to your door each month.',
  },
  {
    icon: Star,
    title: 'Members-Only Exclusives',
    description: 'Access to limited-edition products, early drops, and items you won\'t find anywhere else.',
  },
  {
    icon: Shield,
    title: 'Faith · Freedom · Truth',
    description: 'Every item in The Torch Box reflects our core values and the convictions you live by.',
  },
  {
    icon: Gift,
    title: 'Always More Than You Pay',
    description: 'Each box is curated to deliver value that far exceeds the subscription price.',
  },
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
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Box image - full width at very top */}
      <section className="w-full pt-24">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/d7b6f1c99_Untitleddesign_20260310_044300_0000.png"
          alt="The Torch Box"
          className="w-full"
        />
      </section>

      {/* Hero */}
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
              className="w-64 md:w-80"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-6 text-base md:text-lg max-w-xs mx-auto leading-snug"
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
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-sm"
                style={{ border: '1px solid #C8A44D44', backgroundColor: '#C8A44D11' }}
              >
                <Check className="w-5 h-5" style={{ color: '#C8A44D' }} />
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
                  className="flex-1 px-4 py-3 text-sm font-mono bg-transparent rounded-sm focus:outline-none"
                  style={{
                    border: '1px solid #D6B56544',
                    color: '#E8DFAF',
                    backgroundColor: '#FFFFFF08',
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 font-mono font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-200 whitespace-nowrap"
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



      {/* Perks */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-mono text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#C8A44D' }}>
              Why Subscribe
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight" style={{ color: '#E8DFAF' }}>
              Built for the Bold
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-sm"
                  style={{ border: '1px solid #D6B56520', backgroundColor: '#FFFFFF04' }}
                >
                  <Icon className="w-6 h-6 mb-4" style={{ color: '#C8A44D' }} />
                  <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-2" style={{ color: '#E8DFAF' }}>
                    {perk.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#E8DFAF66' }}>
                    {perk.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="p-10 md:p-16 rounded-sm"
            style={{ border: '1px solid #D6B56530', backgroundColor: '#C8A44D08' }}
          >
            <div className="text-center mb-10">
              <p className="font-mono text-xs tracking-[0.4em] uppercase mb-3" style={{ color: '#C8A44D' }}>
                What's Inside
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight" style={{ color: '#E8DFAF' }}>
                Every Box Includes
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_TO_EXPECT.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: '#C8A44D' }} />
                  <span className="font-heading text-sm" style={{ color: '#E8DFAF' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}