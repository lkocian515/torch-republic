/**
 * Focus Coffee Collection Page
 * Route: /shop/focus-coffee
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Brain } from 'lucide-react';

const RG = '#E6B7AD';

const FOCUS_PRODUCTS = [
  {
    name: 'GlowMind Clarity',
    tagline: 'Deep work & daily focus',
    description: "Our flagship focus blend. Lion's Mane supports NGF production for cognitive clarity. Chaga adds antioxidant depth. Premium Arabica provides the clean caffeine foundation. Designed for 2-4 hour deep work sessions.",
    path: '/products/glowmind-clarity-instant-mushroom-coffee',
    accent: '#E6B7AD',
    mushrooms: ["Lion's Mane", 'Chaga'],
    best: 'Deep work sessions',
    icon: '🧠',
    popular: true,
  },
  {
    name: 'The Monk Matcha',
    tagline: 'Calm focus & presence',
    description: "Ceremonial grade matcha with naturally occurring L-theanine. Traditionally associated with mindful tea rituals and a balanced daily routine.",
    path: '/products/the-monk-matcha-blend',
    accent: '#10B981',
    mushrooms: ['L-Theanine (natural)', 'EGCG'],
    best: 'Calm creative focus',
    icon: '🍵',
    popular: false,
  },
  {
    name: 'SunCap Rise',
    tagline: 'Morning energy & momentum',
    description: "Lion's Mane + Cordyceps — the cognitive-physical combination. For days when focus needs physical energy behind it. Oxygen utilization support from Cordyceps plus NGF support from Lion's Mane.",
    path: '/products/suncap-rise-instant-mushroom-coffee',
    accent: '#D4A576',
    mushrooms: ["Lion's Mane", 'Cordyceps'],
    best: 'Active focus + energy',
    icon: '⚡',
    popular: false,
  },
  {
    name: 'The Oracle Blend',
    tagline: 'Full mushroom complex',
    description: 'The comprehensive daily blend — full spectrum functional mushroom complex in a premium Arabica base. For practitioners who want maximum functional breadth in a single daily ritual cup.',
    path: '/products/the-oracle-instant-mushroom-coffee',
    accent: '#B88FA8',
    mushrooms: ["Lion's Mane", 'Chaga', 'Cordyceps', 'Reishi'],
    best: 'Full-spectrum daily ritual',
    icon: '🌿',
    popular: false,
  },
];

const RESEARCH_POINTS = [
  {
    compound: "Lion's Mane",
    finding: "Hericenones and erinacines may stimulate Nerve Growth Factor (NGF) production — critical for neuron maintenance and cognitive health.",
    study: "Mori et al. (2009), Saitsu et al. (2019)",
    color: '#E6B7AD',
  },
  {
    compound: 'L-Theanine + Caffeine',
    finding: "The combination found naturally in matcha improves working memory and attention while reducing caffeine-induced anxiety.",
    study: "Multiple RCTs; Owen et al. (2008)",
    color: '#10B981',
  },
  {
    compound: 'Cordyceps',
    finding: "May improve VO2 max and oxygen utilization, supporting sustained physical and cognitive endurance.",
    study: "Chen et al. (2010), Hirsch et al. (2017)",
    color: '#D4A576',
  },
];

export default function FocusCoffeeCollection() {
  useSEO({
    title: 'Best Coffee for Focus | Mushroom Coffee for Concentration | Torch Republic',
    description: "Best coffee for focus and concentration — Lion's Mane mushroom coffee, ceremonial matcha with L-theanine, and premium instant coffee blends designed for deep work and mental clarity.",
    url: '/shop/focus-coffee',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Focus Coffee', url: '/shop/focus-coffee' }],
    faq: [
      { question: 'What is the best coffee for focus and concentration?', answer: "GlowMind Clarity combines premium Arabica instant coffee with Lion's Mane mushroom (for NGF support) and Chaga (for antioxidants) — designed specifically for focused deep work sessions." },
      { question: "Does Lion's Mane mushroom coffee help with focus?", answer: "Lion's Mane contains hericenones and erinacines that may stimulate Nerve Growth Factor production. Multiple human trials show modest cognitive improvements. It works best with consistent daily use." },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)' }}>
            <Brain size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>Focus Coffee Collection</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F5EFE6', lineHeight: 1.1 }}>
            Coffee Designed<br />for Deep Focus
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300 }}>
            Not all coffee supports the same kind of work. Our focus blends combine premium instant coffee with research-backed functional ingredients — Lion's Mane for cognitive support, L-theanine for calm alertness, Cordyceps for sustained energy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/build-your-ritual"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Build Focus Bundle <ArrowRight size={12} />
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
          {['Research-backed ingredients', 'No machine needed', '27 servings per tube', 'Subscribe & save 20%'].map((t, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOCUS_PRODUCTS.map((product, i) => (
              <motion.div key={product.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-7 relative" style={{ background: '#0F0E0D', border: `1px solid ${product.accent}${product.popular ? '40' : '18'}` }}>
                {product.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-[7px] tracking-[0.3em] uppercase px-2 py-1" style={{ background: `${product.accent}18`, color: product.accent, border: `1px solid ${product.accent}35` }}>
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <p className="text-2xl">{product.icon}</p>
                  <div>
                    <h3 className="font-serif font-bold mb-1" style={{ fontSize: '1.25rem', color: '#F5EFE6' }}>{product.name}</h3>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: product.accent }}>{product.tagline}</p>
                  </div>
                </div>
                <p className="font-heading text-sm mb-5" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8, fontWeight: 300 }}>
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {product.mushrooms.map((m, j) => (
                    <span key={j} className="font-mono text-[7px] tracking-[0.2em] uppercase px-2 py-1"
                      style={{ background: `${product.accent}10`, border: `1px solid ${product.accent}25`, color: product.accent }}>
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${product.accent}10` }}>
                  <p className="font-mono text-[8px] tracking-[0.18em] uppercase" style={{ color: 'rgba(240,235,225,0.3)' }}>
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

      {/* Research Section */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>The Science</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>
              What the Research Actually Shows
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RESEARCH_POINTS.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${r.color}20` }}>
                <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-3" style={{ color: r.color }}>{r.compound}</p>
                <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.75, fontWeight: 300 }}>{r.finding}</p>
                <p className="font-mono text-[7px] tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.2)' }}>{r.study}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-[7px] tracking-[0.15em] text-center mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
            These statements have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </section>

      {/* Related Links */}
      <section className="px-6 md:px-10 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.3rem', color: '#F5EFE6' }}>Deeper Reading</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Lion's Mane Guide", path: '/ingredients/lions-mane' },
              { label: 'L-Theanine Guide', path: '/ingredients/l-theanine' },
              { label: 'Coffee & Focus Article', path: '/journal/coffee-and-focus' },
              { label: 'Blend Quiz', path: '/quiz' },
            ].map((l, i) => (
              <Link key={i} to={l.path}
                className="p-3 flex items-center justify-between transition-all"
                style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.08)'}>
                <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.75)' }}>{l.label}</span>
                <ArrowRight size={10} style={{ color: `${RG}50` }} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}