/**
 * SEO Landing Page: Ceremonial Matcha
 * Route: /ingredients/ceremonial-matcha
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Leaf, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';
const DIM = 'rgba(240,232,220,0.58)';
const GREEN = '#264A35';

const SCIENCE_POINTS = [
  { heading: "What Makes Matcha 'Ceremonial Grade'?", body: "Ceremonial grade matcha is produced from the youngest tea leaves (typically first harvest, or 'first flush'), shade-grown for 3–4 weeks before harvest to increase L-theanine and chlorophyll content. The leaves are stone-ground to a fine powder rather than rolled for steeping. The result is a vibrant green, smooth-tasting matcha with 5x more L-theanine than steeped green tea — and it's the only grade suitable for drinking straight without sweetener." },
  { heading: "L-Theanine in Matcha", body: "L-theanine is an amino acid naturally found in tea plants. Ceremonial matcha also contains naturally occurring caffeine, and the combination may feel different from traditional coffee for some drinkers." },
  { heading: "Chlorophyll, Antioxidants, and EGCG", body: "The shade-growing process that boosts L-theanine also dramatically increases chlorophyll production — hence the vivid green color of quality ceremonial matcha. Beyond aesthetics, shade-grown matcha contains high concentrations of catechins, particularly EGCG (epigallocatechin gallate), one of the most-studied antioxidant compounds in tea research. EGCG has been associated with metabolic support, anti-inflammatory activity, and cardiovascular health in population studies." },
  { heading: "Instant Format: Real Ceremonial Quality?", body: "Traditional matcha is whisked with a bamboo chasen and requires a specific water temperature. Torch Republic's instant matcha is made from real ceremonial-grade stone-ground matcha in a soluble format — not a tea extract or flavoring. The trade-off: texture is slightly different from hand-whisked, and some aroma compounds are reduced in the soluble process. The benefit: 30-second preparation, zero equipment, same ceremonial-grade leaf." },
  { heading: "Caffeine Profile vs. Coffee", body: "Ceremonial matcha contains approximately 30–50mg of caffeine per serving, compared to 60–100mg in drip coffee or 60–80mg in Torch Republic's instant coffee blends. The lower caffeine, combined with L-theanine's buffering effect, makes matcha an ideal option for people who are caffeine-sensitive, pregnant (in moderation), or who want a lighter morning option alongside or instead of coffee." },
];

const PAA = [
  { q: "What is ceremonial grade matcha?", a: "Ceremonial grade is the highest quality of matcha, made from young first-harvest tea leaves shade-grown for 3–4 weeks to maximize L-theanine and chlorophyll. It's stone-ground to a fine powder and is meant to be drunk straight with water — it's smooth enough to not require sweetener or milk. Culinary grade matcha is lower quality and meant for baking or blending with strong flavors." },
  { q: "Does matcha have less caffeine than coffee?", a: "Yes. Ceremonial matcha contains approximately 30–50mg of naturally occurring caffeine per serving, versus 60–100mg in brewed coffee. It also contains L-theanine, which is traditionally associated with mindful tea rituals." },
  { q: "What is L-theanine in matcha?", a: "L-theanine is an amino acid found almost exclusively in tea plants. It is traditionally associated with mindful tea rituals (relaxed alertness) and modulates caffeine's stimulant effect, reducing jitters while preserving focus. Ceremonial matcha contains 5x more L-theanine than regular steeped green tea, making it one of the richest dietary sources of this compound." },
  { q: "What does ceremonial matcha taste like?", a: "Authentic ceremonial grade matcha has a rich, umami flavor — slightly sweet, with grassy and vegetal notes, and very little bitterness if prepared correctly. Lower water temperature (around 70–75°C) prevents bitterness. Culinary grade matcha tastes more bitter and grassy, which is why it's typically used with other flavors." },
  { q: "Is instant matcha as good as traditional whisked matcha?", a: "It depends what you value. Traditional whisked ceremonial matcha has more aroma complexity and better foam texture. Instant matcha from ceremonial-grade leaves (like Torch Republic's) delivers the same L-theanine content, EGCG antioxidants, and flavor profile in 30 seconds without equipment. For daily habit convenience, instant ceremonial matcha is a very close second." },
];

const PRODUCTS = [
  { name: "The Monk Matcha", slug: "the-monk-matcha-blend", tagline: "Pure ceremonial matcha — calm, focused clarity" },
  { name: "The Alchemist Matcha", slug: "the-alchemist-matcha-blend", tagline: "Ceremonial matcha with elevated ritual profile" },
  { name: "The Alchemist Matcha", slug: "the-alchemist-matcha-blend", tagline: "Complex ceremonial matcha — earthy and full-bodied" },
];

export default function CeremonialMatchaPage() {
  useSEO({
    title: "Ceremonial Matcha: What It Is, Benefits & Best Instant Blends | Torch Republic",
    description: "Ceremonial grade matcha delivers L-theanine for calm focus, powerful antioxidants (EGCG), and 30–50mg of caffeine without jitters. Learn the science and shop Torch Republic's instant ceremonial matcha.",
    url: '/ingredients/ceremonial-matcha',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      section: 'Ingredients',
      keywords: ['ceremonial matcha', 'ceremonial grade matcha', 'instant ceremonial matcha', 'matcha L-theanine', 'matcha vs coffee'],
    },
    faq: PAA.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Ceremonial Matcha', url: '/ingredients/ceremonial-matcha' },
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
          <span style={{ color: 'rgba(230,183,173,0.7)' }}>Ceremonial Matcha</span>
        </nav>
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1" style={{ background: 'rgba(108,189,90,0.08)', border: '1px solid rgba(108,189,90,0.2)' }}>
            <Leaf size={12} style={{ color: GREEN }} />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: GREEN }}>Calm Focus & Antioxidants</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Ceremonial Matcha:<br /><span style={{ color: RG }}>Calm Energy Without Jitters</span>
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
            Ceremonial grade matcha is the highest quality of green tea powder — shade-grown, stone-ground, and rich in L-theanine for focused calm. Here's what separates it from lesser grades and why it's worth drinking daily.
          </p>
          <Link to="/shop/matcha" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90" style={{ background: RG, color: '#080808' }}>
            Shop Ceremonial Matcha <ArrowRight size={11} />
          </Link>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(230,183,173,0.4)' }}>The Science</p>
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
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Torch Republic Matcha Blends</p>
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
          <Link to="/why-matcha" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: `1px solid ${RG}30`, color: RG }}>Why Matcha?</Link>
          <Link to="/quiz" className="font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-80" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>Find My Blend →</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F7F2E9' }}>People Also Ask About Ceremonial Matcha</h2>
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
            { label: 'Why Matcha?', href: '/why-matcha' },
            { label: 'Matcha Benefits Guide', href: '/journal/matcha-benefits' },
            { label: 'History of Matcha', href: '/journal/history-of-matcha' },
            { label: 'Ceremonial vs Culinary', href: '/journal/ceremonial-matcha-vs-culinary' },
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