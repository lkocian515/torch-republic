/**
 * Freeze Dried Instant Coffee — SEO Educational Landing Page
 * Route: /freeze-dried-instant-coffee
 * Target keywords: freeze dried instant coffee, freeze dried coffee benefits, best freeze dried coffee, premium instant coffee
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';
const DIM = 'rgba(240,232,220,0.58)';

const FACTS = [
  "Freeze-drying preserves 97–99% of the flavor compounds that would be lost in spray-drying (the cheaper method)",
  "The freeze-drying process: brew coffee → freeze to −40°C → reduce pressure so ice vaporizes without melting → result: shelf-stable powder with full aroma intact",
  "Premium freeze-dried coffee from single-origin Arabica is virtually indistinguishable from fresh-brewed in double-blind taste tests",
  "Instant coffee represents approximately 50% of all coffee consumed worldwide — premium instant is the fastest-growing segment",
  "No machine, no pods, no cleanup — one scoop dissolves fully in 30 seconds in hot water or cold milk",
  "Torch Republic uses 100% Arabica freeze-dried coffee as the base for all 12 blends",
];

const COMPARE = [
  { method: 'Freeze-Dried', flavour: '★★★★★', convenience: '★★★★★', cost: '$$', notes: 'Full aroma, highest quality instant' },
  { method: 'Spray-Dried', flavour: '★★★', convenience: '★★★★★', cost: '$', notes: 'Heat degrades flavor compounds' },
  { method: 'Drip / Pour-Over', flavour: '★★★★★', convenience: '★★', cost: '$$', notes: 'Requires grinder, equipment, cleanup' },
  { method: 'Pod / K-Cup', flavour: '★★★', convenience: '★★★★', cost: '$$$', notes: 'Machine required, ~$1.50+/cup, plastic waste' },
  { method: 'Espresso Machine', flavour: '★★★★★', convenience: '★★', cost: '$$$$', notes: '$200–$2000 machine, daily maintenance' },
];

const FAQS = [
  { q: "What is freeze-dried instant coffee?", a: "Freeze-dried instant coffee is made by brewing coffee, freezing it to approximately −40°C, then placing it in a vacuum chamber where the ice sublimates (converts directly from solid to vapor) without melting. This process preserves the aromatic oils and flavor compounds that heat-based spray-drying destroys. The result is a soluble powder that reconstitutes to taste much closer to fresh-brewed coffee." },
  { q: "Is freeze-dried coffee better than regular instant coffee?", a: "Yes, significantly. The freeze-drying process preserves 97–99% of the flavor compounds lost in spray-drying (the most common cheaper method). Premium freeze-dried coffee from 100% Arabica beans produces a cup that is hard to distinguish from fresh-brewed in blind taste tests. Spray-dried coffee (the most common type in grocery store jars) uses heat that degrades flavor, resulting in the flat, sometimes bitter taste people associate with 'bad instant coffee.'" },
  { q: "Does freeze-dried instant coffee taste like real coffee?", a: "High-quality freeze-dried coffee from 100% Arabica beans tastes very close to freshly brewed coffee. The key variables are bean quality (Arabica vs. Robusta), roast profile, and manufacturing quality. Torch Republic uses premium Arabica freeze-dried coffee — the same quality standard used by specialty coffee brands for single-origin instant products." },
  { q: "How do you make freeze-dried instant coffee?", a: "Add one serving (approximately 2g) to 8–12 oz of hot water (about 180–200°F — not boiling). Stir until fully dissolved, about 10 seconds. For iced coffee, dissolve in a small amount of hot water first, then pour over ice and cold water or milk. No machine, grinder, filter, or cleanup required." },
  { q: "Is premium instant coffee worth it?", a: "For daily ritual drinkers, yes. Premium freeze-dried Arabica instant coffee (like Torch Republic, approximately $0.85/serving) compares favorably to drip coffee in quality while being dramatically more convenient. It eliminates machine costs ($200–$2000), pod waste ($1.50+/cup for pods), and cleanup time. For people who value both quality and simplicity, premium instant is the rational daily choice." },
];

export default function FreezeDriedInstantCoffee() {
  useSEO({
    title: "Freeze Dried Instant Coffee: What It Is, Why It's Better, How to Choose",
    description: "What is freeze-dried instant coffee and why is it better than spray-dried? Learn the process, compare methods, and discover Torch Republic's premium freeze-dried Arabica blends.",
    url: '/freeze-dried-instant-coffee',
    type: 'website',
    faq: FAQS.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop Instant Coffee', url: '/shop/instant-coffee' },
      { name: 'Freeze Dried Instant Coffee', url: '/freeze-dried-instant-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/shop/instant-coffee" className="hover:opacity-70">Instant Coffee</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.6)' }}>Freeze Dried Coffee</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="text-center px-6 md:px-10 pt-14 pb-12" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[0.48em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Torch Republic · The Coffee
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F7F2E9', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Freeze-Dried Instant Coffee<br />
          <span style={{ color: RG }}>Why It Changes Everything</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading mb-8"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
          Not all instant coffee is created equal. Freeze-drying — the method used by premium specialty coffee brands — preserves 97–99% of fresh-brew flavor while spray-drying (the cheaper alternative) destroys it. Here's what that means for your cup.
        </motion.p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/shop/instant-coffee"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404', textDecoration: 'none' }}>
            Shop Premium Instant Coffee
          </Link>
          <Link to="/journal/what-makes-premium-instant-coffee-different"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG, textDecoration: 'none' }}>
            The Science →
          </Link>
        </div>
      </section>

      {/* Key Facts */}
      <section className="px-6 md:px-10 pb-14" style={{ maxWidth: '940px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>The Process</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F7F2E9', lineHeight: 1.2 }}>
              How Freeze-Drying Works
            </h2>
            <p className="font-heading mb-4" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              Freeze-drying (lyophilization) is the same technology used to preserve pharmaceuticals and astronaut food. Brewed coffee is first frozen to −40°C, then placed in a vacuum chamber. Under low pressure, the ice converts directly from solid to vapor (sublimation) — never passing through the liquid phase that would cause aromatic compounds to be lost.
            </p>
            <p className="font-heading" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              The result: flavor compounds, aromatic oils, and antioxidants that would normally evaporate during spray-drying (which uses heat) are locked inside porous ice crystals that become shelf-stable granules. When you add hot water, these granules dissolve and release what is effectively a full fresh-brewed coffee experience in 30 seconds.
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Why It Matters</p>
            <ul className="space-y-3">
              {FACTS.map(fact => (
                <li key={fact} className="flex items-start gap-3">
                  <CheckCircle size={13} style={{ color: RG, flexShrink: 0, marginTop: '3px' }} />
                  <span className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.65 }}>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 md:px-10 py-12" style={{ background: 'rgba(230,183,173,0.03)', borderTop: '1px solid rgba(230,183,173,0.07)', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F7F2E9' }}>
            Coffee Methods Compared
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.2)' }}>
                  {['Method', 'Flavor', 'Convenience', 'Cost/Cup', 'Notes'].map(h => (
                    <th key={h} className="py-3 pr-4 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={r.method} style={{ borderBottom: '1px solid rgba(230,183,173,0.06)', background: i === 0 ? 'rgba(230,183,173,0.04)' : 'transparent' }}>
                    <td className="py-3.5 pr-4 font-heading text-sm font-medium" style={{ color: i === 0 ? '#F7F2E9' : DIM }}>{r.method}</td>
                    <td className="py-3.5 pr-4 font-mono text-[10px]" style={{ color: DIM }}>{r.flavour}</td>
                    <td className="py-3.5 pr-4 font-mono text-[10px]" style={{ color: DIM }}>{r.convenience}</td>
                    <td className="py-3.5 pr-4 font-heading text-sm" style={{ color: DIM }}>{r.cost}</td>
                    <td className="py-3.5 font-heading text-xs" style={{ color: 'rgba(240,232,220,0.4)', fontWeight: 300 }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 md:px-10 py-12" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Reading</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Best Instant Coffee Guide', path: '/journal/best-instant-coffee' },
            { label: 'Why Premium Instant Is Different', path: '/journal/what-makes-premium-instant-coffee-different' },
            { label: 'Instant vs. K-Cups', path: '/compare/instant-coffee-vs-pods-comparison' },
            { label: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
            { label: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
          ].map(l => (
            <Link key={l.path} to={l.path}
              className="font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.18)', color: 'rgba(230,183,173,0.55)' }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 pb-20" style={{ maxWidth: '740px', margin: '0 auto' }}>
        <h2 className="font-serif font-bold mb-8 text-center" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F7F2E9' }}>
          People Also Ask
        </h2>
        {FAQS.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: '1px solid rgba(230,183,173,0.08)', paddingBottom: '20px', marginBottom: '20px' }}>
            <h3 className="font-serif font-bold mb-2.5" style={{ fontSize: '0.97rem', color: '#F7F2E9' }}>{q}</h3>
            <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.8 }}>{a}</p>
          </div>
        ))}
        <div className="text-center mt-8">
          <Link to="/shop/instant-coffee"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3.5 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404' }}>
            Shop Premium Instant Coffee <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.18)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}