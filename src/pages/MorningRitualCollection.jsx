/**
 * Morning Ritual Coffee Collection Page
 * Route: /shop/morning-ritual
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Sun } from 'lucide-react';

const RG = '#E6B7AD';

const MORNING_PRODUCTS = [
  {
    name: 'SunCap Rise',
    tagline: 'Morning energy & fresh starts',
    description: "Lion's Mane + Cordyceps + premium Arabica. The sunrise blend — clean energy, morning activation, and vitality to carry you through the first half of your day.",
    path: '/products/suncap-rise-instant-mushroom-coffee',
    accent: '#D4A576',
    mushrooms: ["Lion's Mane", 'Cordyceps'],
    best: 'Physical energy + morning drive',
    icon: '☀️',
  },
  {
    name: 'GlowMind Clarity',
    tagline: 'Deep work & daily focus',
    description: "Lion's Mane + Chaga + premium Arabica. The focus blend — cognitive clarity, sustained attention, and a grounded start to your most important work.",
    path: '/products/glowmind-clarity-instant-mushroom-coffee',
    accent: '#E6B7AD',
    mushrooms: ["Lion's Mane", 'Chaga'],
    best: 'Mental focus + creative work',
    icon: '🧠',
  },
  {
    name: 'Torchbearer',
    tagline: 'Bold mornings & deep work',
    description: "100% Arabica, bold roast. For the purist who wants premium instant coffee without the supplements — just clean, strong, reliable morning coffee.",
    path: '/products/torchbearer-instant-coffee',
    accent: '#C4A35A',
    mushrooms: [],
    best: 'Bold coffee ritual',
    icon: '🔥',
  },
  {
    name: 'Ember Reserve',
    tagline: 'Morning energy & momentum',
    description: "100% Arabica, medium roast. Smooth, approachable, perfectly balanced — the morning coffee that works whether you're hitting the gym, the office, or the road.",
    path: '/products/ember-rise-instant-coffee',
    accent: '#C98F86',
    mushrooms: [],
    best: 'All-purpose morning ritual',
    icon: '🌅',
  },
];

const RITUAL_STEPS = [
  { step: '01', title: 'Heat your water', body: 'Bring water to 85-90°C — just off boiling. Overheating destroys delicate coffee aromatics.' },
  { step: '02', title: 'Measure your blend', body: 'Add one serving to your cup. Take a moment to breathe in the dry aroma — this is part of the ritual.' },
  { step: '03', title: 'Stir with intention', body: 'Pour water and stir for 30 seconds. Watch the powder dissolve. This 30-second pause is where the ritual begins.' },
  { step: '04', title: 'Set your intention', body: 'Before the first sip, decide on one thing you want to accomplish today. The cup in your hands is a signal: this is your time.' },
];

export default function MorningRitualCollection() {
  useSEO({
    title: 'Morning Ritual Coffee | Best Coffee for Morning Focus | Torch Republic',
    description: 'The best instant coffee for morning rituals — mushroom coffee for focus, classic Arabica for bold starts. No machine needed. Premium instant, 27 servings per tube.',
    url: '/shop/morning-ritual',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Morning Ritual', url: '/shop/morning-ritual' }],
    faq: [
      { question: 'What is the best coffee for morning focus?', answer: 'GlowMind Clarity combines premium Arabica instant coffee with Lion\'s Mane and Chaga mushroom extracts — designed specifically for focused morning rituals without jitters.' },
      { question: 'Can I make ritual morning coffee without a machine?', answer: 'Yes. Torch Republic instant coffee dissolves in hot water in under 60 seconds — no machine, no pods, no cleanup required.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)' }}>
            <Sun size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>Morning Ritual Collection</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F5EFE6', lineHeight: 1.1 }}>
            Coffee Built for<br />Morning Rituals
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300 }}>
            The best mornings don't start with a machine. They start with intention — a single cup, made simply, that signals to your brain that it's time to begin. No pods. No cleanup. Just premium instant coffee that meets you where you are.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/build-your-ritual"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Build Your Morning Bundle <ArrowRight size={12} />
            </Link>
            <Link to="/quiz"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase py-3.5 px-7 transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}40`, color: RG }}>
              Find My Blend →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <div className="px-6 py-4" style={{ background: '#0A0908', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {['No machine needed', '27 servings per tube', 'Ships free over $50', '30-day guarantee'].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle size={11} style={{ color: RG }} />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.5)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>The Collection</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>Morning Ritual Blends</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MORNING_PRODUCTS.map((product, i) => (
              <motion.div key={product.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7" style={{ background: '#0F0E0D', border: `1px solid ${product.accent}18` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-2xl mb-2">{product.icon}</p>
                    <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>{product.name}</h3>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: product.accent }}>{product.tagline}</p>
                  </div>
                </div>
                <p className="font-heading text-sm mb-5" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8, fontWeight: 300 }}>
                  {product.description}
                </p>
                {product.mushrooms.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.mushrooms.map((m, j) => (
                      <span key={j} className="font-mono text-[7px] tracking-[0.2em] uppercase px-2 py-1"
                        style={{ background: `${product.accent}10`, border: `1px solid ${product.accent}25`, color: product.accent }}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${product.accent}10` }}>
                  <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>
                    Best for: {product.best}
                  </p>
                  <Link to={product.path}
                    className="font-mono text-[8px] tracking-[0.25em] uppercase font-bold inline-flex items-center gap-1.5 transition-all hover:opacity-80"
                    style={{ color: product.accent }}>
                    Shop <ArrowRight size={10} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual Steps */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>The Method</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>Four Steps to a Better Morning</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RITUAL_STEPS.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}>
                <span className="font-mono font-bold text-xs flex-shrink-0 mt-0.5" style={{ color: 'rgba(230,183,173,0.3)' }}>{step.step}</span>
                <div>
                  <p className="font-serif font-bold mb-2" style={{ color: '#F5EFE6', fontSize: '1rem' }}>{step.title}</p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content: Why Morning Coffee Matters */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>
              Why Your Morning Coffee Ritual Matters More Than You Think
            </h2>
            <div className="space-y-5">
              {[
                "Research on morning routines consistently shows that the structure of your first hour affects productivity, mood, and cognitive performance for hours after. Not because of magic — but because of how the brain handles transition states. A deliberate morning ritual creates a clear psychological boundary between sleep and active work.",
                "Coffee is already a ritual anchor for hundreds of millions of people. The smell, the warmth, the preparation process — these are sensory cues the brain associates with waking up, shifting into focus, and beginning. The problem is that most people have automated this ritual to the point where it has no intentional weight left.",
                "Functional mushroom coffee doesn't change the ritual. It adds cognitive and wellness ingredients to something that was already happening. For people who already drink coffee every morning, Lion's Mane and Chaga are genuinely intelligent additions — not disruptions.",
                "The no-machine format matters here too. When there's no equipment to set up or clean, the ritual is simpler — and simplicity is what allows habits to survive past the first few weeks. Torch Republic was designed specifically to remove every possible friction from a morning coffee ritual while preserving the full quality of the experience.",
              ].map((para, i) => (
                <p key={i} className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.95, fontWeight: 300 }}>
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>Start Today</p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#F5EFE6' }}>
            Your morning ritual, upgraded.
          </h2>
          <p className="font-heading mb-8 text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            Any 3 blends for $49.99. Free shipping over $50. 30-day satisfaction guarantee.
          </p>
          <Link to="/build-your-ritual"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808' }}>
            Build My Ritual Bundle <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}