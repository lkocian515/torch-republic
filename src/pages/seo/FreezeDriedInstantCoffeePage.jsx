/**
 * SEO Landing Page: Freeze-Dried Instant Coffee
 * Route: /ingredients/freeze-dried-instant-coffee
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Coffee, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';
const DIM = 'rgba(240,232,220,0.58)';

const SCIENCE_POINTS = [
  { heading: "How Freeze-Drying Preserves Coffee", body: "Freeze-drying (lyophilization) is the premium method of producing instant coffee. Brewed coffee is first frozen to approximately -40°C, then placed in a vacuum chamber where the ice converts directly to vapor (sublimation) without passing through a liquid phase. This gentle process preserves volatile aromatic compounds and flavor precursors that are destroyed by spray-drying (the cheaper alternative). The result: a powder that, when dissolved, more closely resembles freshly brewed coffee than any other instant format." },
  { heading: "Freeze-Dried vs. Spray-Dried: The Quality Gap", body: "Spray-dried instant coffee (the most common type) forces hot liquid through a nozzle into hot air, evaporating the water rapidly. High heat denatures aromatic compounds and creates the characteristic 'instant coffee taste' most people associate with poor quality. Freeze-dried instant coffee maintains much lower temperatures throughout processing, preserving a higher percentage of original flavor compounds. In blind taste tests, freeze-dried instant coffee consistently outperforms spray-dried versions and approaches the profile of fresh-brewed specialty coffee." },
  { heading: "100% Arabica: Why Source Matters", body: "Instant coffee quality starts with the green coffee used. Robusta beans (Coffea canephora) are cheaper, higher in caffeine, and more bitter — often used in commodity instant coffee to cut costs. Arabica beans (Coffea arabica) are more expensive, lower in caffeine, sweeter, and produce a more complex flavor profile when brewed and subsequently freeze-dried. Torch Republic uses 100% Arabica in all instant coffee blends — no Robusta filler, no cost-cutting on the base ingredient that makes up the majority of each serving." },
  { heading: "Convenience Without Compromise", body: "The cultural narrative that instant coffee is always inferior to brewed coffee is a legacy of spray-dried Robusta products. Premium freeze-dried Arabica instant coffee has fundamentally different quality characteristics. No coffee machine, grinder, filters, or pods are required — but the flavor experience is significantly closer to specialty coffee than previous generations of instant. For travel, camping, hotel rooms, or any context where equipment is unavailable, premium instant is now a legitimate specialty option." },
  { heading: "Shelf Life and Freshness", body: "One genuine advantage of freeze-dried instant coffee over fresh-ground is shelf stability. Properly stored freeze-dried coffee lasts 12–24 months without meaningful flavor degradation, while fresh-ground coffee loses most of its aroma within 2 weeks of grinding. For subscription customers who want consistent quality without worrying about timing, freeze-dried instant solves the freshness problem that plagues whole-bean and pre-ground subscriptions." },
];

const PAA = [
  { q: "Is freeze-dried instant coffee better than regular instant coffee?", a: "Yes. Freeze-dried instant coffee is the premium tier of instant coffee. The freeze-drying process preserves aromatic compounds that are destroyed by the high heat of spray-drying (the cheaper method used in most commodity instant coffee). In taste tests, freeze-dried instant coffee from quality Arabica beans produces a flavor profile significantly closer to fresh-brewed specialty coffee." },
  { q: "Is instant coffee as good as brewed coffee?", a: "Freeze-dried instant coffee from quality Arabica beans has closed the gap significantly with fresh-brewed coffee. It lacks some aromatics that fresh brewing produces, but for most daily drinkers, premium freeze-dried instant is indistinguishable from brewed in a blind taste test — especially when prepared in milk or used as a coffee base for lattes or iced drinks." },
  { q: "Does instant coffee have the same caffeine as brewed coffee?", a: "Approximately. A serving of Torch Republic instant coffee contains approximately 60–80mg of caffeine, similar to a standard 8oz cup of drip coffee. Caffeine content varies slightly based on serving size and blend, but premium instant coffee provides comparable caffeine to most brewing methods." },
  { q: "What is the best instant coffee?", a: "The best instant coffee is freeze-dried, made from 100% Arabica beans, and produced from specialty-grade green coffee. Torch Republic's classic instant coffee blends (Torchbearer, Ember Reserve, Ember Reserve) use premium freeze-dried Arabica with no Robusta filler, no artificial additives, and transparent ingredient sourcing." },
  { q: "Can instant coffee be used for specialty coffee drinks?", a: "Yes. Premium freeze-dried instant coffee dissolves completely in any liquid and works for lattes, cappuccinos, iced coffee, cold brew-style drinks, and baking. It also works perfectly as the coffee base in mushroom coffee blends — which is exactly what Torch Republic does, adding functional mushroom extracts to a premium instant coffee base." },
];

const PRODUCTS = [
  { name: "Torchbearer", slug: "torchbearer-instant-coffee", tagline: "Bold, classic instant Arabica — the flagship blend" },
  { name: "Ember Reserve", slug: "ember-reserve", tagline: "Medium roast, smooth and balanced for daily ritual" },
  { name: "Ember Reserve", slug: "ember-reserve", tagline: "Dark roast, rich and full-bodied" },
];

export default function FreezeDriedInstantCoffeePage() {
  useSEO({
    title: "Freeze-Dried Instant Coffee: Why It's Better & Best Arabica Blends | Torch Republic",
    description: "Freeze-dried instant coffee preserves the flavor compounds spray-drying destroys. Learn how the process works, why Arabica sourcing matters, and shop Torch Republic's premium instant coffee blends.",
    url: '/ingredients/freeze-dried-instant-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      section: 'Ingredients',
      keywords: ['freeze-dried instant coffee', 'best instant coffee', 'premium instant coffee', 'arabica instant coffee', 'instant coffee vs brewed coffee'],
    },
    faq: PAA.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Freeze-Dried Instant Coffee', url: '/ingredients/freeze-dried-instant-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh', color: '#F7F2E9' }}>
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/ingredients" className="hover:opacity-70">Ingredients</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.7)' }}>Freeze-Dried Instant Coffee</span>
        </nav>
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.18)' }}>
            <Coffee size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: RG }}>Premium Instant Coffee</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Freeze-Dried Instant Coffee:<br /><span style={{ color: RG }}>Why the Process Matters</span>
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
            Not all instant coffee is created equal. Freeze-drying — the method Torch Republic uses — preserves the flavor compounds that cheap spray-drying destroys. Here's exactly how it works and what to look for.
          </p>
          <Link to="/shop/instant-coffee" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90" style={{ background: RG, color: '#080808' }}>
            Shop Instant Coffee <ArrowRight size={11} />
          </Link>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(230,183,173,0.4)' }}>The Process</p>
        <div className="space-y-10">
          {SCIENCE_POINTS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#F7F2E9' }}>{s.heading}</h2>
              <p className="font-heading" style={{ fontSize: '0.93rem', color: DIM, fontWeight: 300, lineHeight: 1.9 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Torch Republic Classic Coffee</p>
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
          <Link to="/shop/instant-mushroom-coffee" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: `1px solid ${RG}30`, color: RG }}>Add Mushrooms Too →</Link>
          <Link to="/build-your-ritual" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>Build a Bundle</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F7F2E9' }}>People Also Ask About Instant Coffee</h2>
        <div className="space-y-6">
          {PAA.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="pb-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
              <h3 className="font-heading font-semibold mb-3" style={{ fontSize: '0.95rem', color: '#F7F2E9' }}>{item.q}</h3>
              <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.85 }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.35)' }}>Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Best Instant Coffee Guide', href: '/journal/best-instant-coffee' },
            { label: 'What Makes Premium Instant Different', href: '/journal/what-makes-premium-instant-coffee-different' },
            { label: 'Mushroom Coffee Benefits', href: '/mushroom-coffee-benefits' },
            { label: "Lion's Mane Coffee", href: '/lions-mane-coffee' },
            { label: 'All Ingredients', href: '/ingredients' },
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