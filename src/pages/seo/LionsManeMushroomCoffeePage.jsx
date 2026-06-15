/**
 * SEO Landing Page: Lion's Mane Mushroom Coffee
 * Route: /ingredients/lions-mane-mushroom-coffee  (OR reuse /lions-mane-coffee)
 * Target keywords: "lion's mane mushroom coffee", "lion's mane coffee benefits", "lion's mane instant coffee"
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Brain, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.58)';
const EMERALD = '#10B981';

const SCIENCE_POINTS = [
  { heading: "Nerve Growth Factor (NGF) Support", body: "Lion's Mane contains hericenones (from the fruiting body) and erinacines (from the mycelium). These compounds are the only known dietary sources shown to stimulate NGF synthesis — the protein responsible for maintaining and growing neurons in the brain. NGF declines with age, which is why Lion's Mane research has focused heavily on cognitive aging support." },
  { heading: "Two Published Human Trials", body: "A 2009 double-blind, placebo-controlled trial published in Phytotherapy Research found that participants taking Lion's Mane extract showed significantly improved cognitive test scores vs. placebo. A 2019 follow-up found improvements in mental function after 16 weeks. These are the most-cited trials in the mushroom coffee category." },
  { heading: "Dual Extraction Matters", body: "Most Lion's Mane supplements use hot-water extraction only, which captures beta-glucans but misses the hericenones and erinacines — the compounds most studied for cognition. Torch Republic uses dual extraction (hot water + alcohol) on organic Lion's Mane fruiting bodies, ensuring both water-soluble and alcohol-soluble compounds are present in every serving." },
  { heading: "500mg Per Serving, Transparently Labeled", body: "Many mushroom coffee brands use 'proprietary blends' that hide how little of each mushroom is actually present. Each Torch Republic mushroom coffee blend contains 500mg of organic dual-extracted Lion's Mane per serving — clearly stated on the label, no blends, no guessing." },
  { heading: "Best Taken Consistently", body: "NGF stimulation is a cumulative process. Single-dose effects are subtle; most research and user reports show clearest results after 2–4 weeks of daily use. Lion's Mane is not a stimulant — its mechanism is fundamentally different from caffeine. It works by gradually supporting the brain's own repair and maintenance systems." },
];

const PAA = [
  { q: "Does Lion's Mane coffee actually help with focus?", a: "The evidence is promising. Lion's Mane contains compounds (hericenones, erinacines) that stimulate Nerve Growth Factor (NGF) production. Published human trials show improvement in cognitive test scores with consistent use. Most users notice clearer thinking and reduced mental fatigue within 2–4 weeks of daily use — not after a single cup." },
  { q: "How much Lion's Mane should be in mushroom coffee?", a: "Look for at least 250–500mg of dual-extracted Lion's Mane fruiting body per serving. Torch Republic blends contain 500mg of organic dual-extracted Lion's Mane per serving — with the extraction method clearly stated. Avoid products that use 'mushroom powder' without specifying extraction method, as unextracted powder has very low bioavailability." },
  { q: "Does Lion's Mane coffee taste like mushrooms?", a: "No. In a well-formulated mushroom coffee, the premium Arabica coffee base completely masks any mushroom flavor. Torch Republic blends are designed to taste like rich, slightly earthy coffee — blind taste testers consistently describe it as 'a smooth, full-bodied coffee' without identifying the mushroom component." },
  { q: "What is the best time to drink Lion's Mane coffee?", a: "Morning is optimal. Lion's Mane pairs well with morning caffeine — the coffee provides alertness while the Lion's Mane compounds support sustained cognitive function. Some users also drink it before focused work sessions. Avoid late evening if you're caffeine-sensitive." },
  { q: "Is Lion's Mane coffee safe?", a: "For most healthy adults, yes. Lion's Mane has a long history of traditional use in Asian medicine and a clean safety record in modern research. The primary precaution: consult your doctor if you have mushroom allergies, are pregnant, nursing, or on blood-thinning medications." },
  { q: "What is dual-extracted Lion's Mane?", a: "Dual extraction uses both hot water and alcohol to extract mushroom compounds. Hot water captures beta-glucans (immune support). Alcohol extracts hericenones and erinacines (the NGF-stimulating compounds most studied for cognition). A product using only hot-water extraction misses half the beneficial compounds." },
];

const PRODUCTS = [
  { name: "GlowMind Clarity", slug: "glowmind-clarity-instant-mushroom-coffee", tagline: "Lion's Mane forward — morning focus ritual" },
  { name: "The Oracle", slug: "the-oracle-instant-mushroom-coffee", tagline: "Deep focus blend with Lion's Mane + Cordyceps" },
  { name: "SunCap Rise", slug: "suncap-rise-instant-mushroom-coffee", tagline: "Bright energy with Lion's Mane + Chaga" },
];

export default function LionsManeMushroomCoffeePage() {
  useSEO({
    title: "Lion's Mane Mushroom Coffee: Benefits, Science & Best Blends | Torch Republic",
    description: "Lion's Mane mushroom coffee delivers focus and mental clarity through NGF-stimulating compounds. Learn the science, how much you need, and shop Torch Republic's dual-extracted blends.",
    url: '/lions-mane-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      section: 'Ingredients',
      keywords: ["lion's mane mushroom coffee", "lion's mane coffee benefits", "lion's mane instant coffee", "mushroom coffee focus", "NGF mushroom coffee"],
    },
    faq: PAA.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: "Lion's Mane Coffee", url: '/lions-mane-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh', color: '#F5EFE6' }}>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/ingredients" className="hover:opacity-70">Ingredients</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.7)' }}>Lion's Mane</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.18)' }}>
            <Brain size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: RG }}>Focus & Cognition</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Lion's Mane Mushroom Coffee:<br />
            <span style={{ color: RG }}>The Science of Focus</span>
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
            Lion's Mane (Hericium erinaceus) is the most-studied nootropic mushroom in modern science — and the active ingredient in Torch Republic's focus blends. Here's exactly what it does, how much you need, and why extraction method matters.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90" style={{ background: RG, color: '#080808' }}>
              Shop Lion's Mane Blends <ArrowRight size={11} />
            </Link>
            <Link to="/ingredients/lions-mane" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase py-3.5 px-7 transition-all hover:opacity-80" style={{ border: `1px solid ${RG}45`, color: RG }}>
              Deep Dive Research <BookOpen size={11} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Science Sections */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(230,183,173,0.4)' }}>The Science</p>
        <div className="space-y-10">
          {SCIENCE_POINTS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#F5EFE6' }}>{s.heading}</h2>
              <p className="font-heading" style={{ fontSize: '0.93rem', color: DIM, fontWeight: 300, lineHeight: 1.9 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-3xl mx-auto px-6 py-10" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Torch Republic Lion's Mane Blends</p>
        <div className="space-y-3">
          {PRODUCTS.map(p => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="flex items-center justify-between gap-4 p-5 block transition-all"
              style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}35`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}>
              <div>
                <p className="font-serif font-bold text-white mb-1">{p.name}</p>
                <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300 }}>{p.tagline}</p>
              </div>
              <ArrowRight size={14} style={{ color: `${RG}70`, flexShrink: 0 }} />
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-5">
          <Link to="/build-your-ritual" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: `1px solid ${RG}30`, color: RG }}>Build Your Ritual Bundle</Link>
          <Link to="/quiz" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>Find My Blend →</Link>
        </div>
      </section>

      {/* PAA / FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F5EFE6' }}>
          People Also Ask About Lion's Mane Coffee
        </h2>
        <div className="space-y-6">
          {PAA.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
              className="pb-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
              <h3 className="font-heading font-semibold mb-3" style={{ fontSize: '0.95rem', color: '#F5EFE6' }}>{item.q}</h3>
              <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.85 }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-3xl mx-auto px-6 py-10" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.35)' }}>Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Mushroom Coffee Benefits', href: '/mushroom-coffee-benefits' },
            { label: 'Chaga Mushroom Coffee', href: '/ingredients/chaga-mushroom-coffee' },
            { label: 'Why Mushroom Coffee?', href: '/why-mushroom-coffee' },
            { label: "Science of Lion's Mane", href: '/journal/science-of-lions-mane' },
            { label: 'Compare to Ryze', href: '/compare/ryze-vs-torch-republic' },
          ].map(l => (
            <Link key={l.href} to={l.href} className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.12)', color: 'rgba(230,183,173,0.55)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="px-6 py-6 text-center">
        <p className="font-mono text-[7px] tracking-[0.12em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}