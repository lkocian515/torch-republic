/**
 * SEO Landing Page: Reishi Mushroom Coffee
 * Route: /ingredients/reishi-mushroom-coffee
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Moon, ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.58)';

const SCIENCE_POINTS = [
  { heading: "The 'Mushroom of Immortality'", body: "Reishi (Ganoderma lucidum) has been used in Chinese, Japanese, and Korean medicine for over 2,000 years, earning titles like 'Ling Zhi' (spiritual mushroom) in Traditional Chinese Medicine. Its modern reputation rests primarily on triterpenes (ganoderic acids) and polysaccharides that support immune modulation and stress response." },
  { heading: "Cortisol Modulation and Calm Focus", body: "Reishi's ganoderic acids interact with the HPA (hypothalamic-pituitary-adrenal) axis — the stress-response system that governs cortisol production. Research suggests regular Reishi supplementation helps blunt exaggerated cortisol spikes, producing a calming, grounding effect without sedation. This is why Reishi appears in Torch Republic's evening and recovery blends rather than morning focus formulas." },
  { heading: "Sleep Quality Research", body: "A 2012 trial in mice showed increased total sleep time and slow-wave (deep) sleep with Reishi extract. Human studies are smaller but consistent: users report easier sleep onset and improved perceived sleep quality. The mechanism is thought to involve Reishi's interaction with adenosine receptors — the same pathway as caffeine, but in the opposite direction." },
  { heading: "Immune Modulation (Not Just Stimulation)", body: "Reishi contains 1,3 and 1,6 beta-glucans that interact with immune cell receptors. The research characterizes Reishi's immune action as 'bidirectional modulation' — it can both support sluggish immune function and calm overactive immune responses. This makes it potentially useful across different contexts, though the evidence for immune claims is stronger in some areas than others." },
  { heading: "Best in Evening Blends", body: "Because Reishi's primary effects are calming rather than activating, it works best in evening or recovery contexts. Torch Republic's MoonCap Restore evening blend features Reishi prominently. For morning focus, our GlowMind Clarity and SunCap Rise blends emphasize Lion's Mane, Cordyceps and Reishi instead." },
];

const PAA = [
  { q: "Does Reishi mushroom coffee help with sleep?", a: "Yes — Reishi is one of the few functional mushrooms with direct sleep research. Studies show increased total sleep time and improved deep sleep with consistent Reishi use. The mechanism involves interaction with adenosine receptors. For best results, drink a Reishi-containing blend (like MoonCap Restore) in the evening, 1–2 hours before bed." },
  { q: "Is Reishi mushroom coffee caffeinated?", a: "Reishi itself contains no caffeine. Reishi mushroom coffee products that contain a coffee base (like Torch Republic's MoonCap Restore) do contain caffeine from the coffee. For a completely caffeine-free evening drink, consider taking Reishi extract separately or choosing a caffeine-free Reishi product." },
  { q: "What does Reishi mushroom coffee taste like?", a: "Reishi has a natural bitterness due to its triterpene content. In a well-formulated mushroom coffee, this bitterness is masked by the coffee roast. Torch Republic's Reishi blends use medium-dark roast Arabica, which complements Reishi's earthy, slightly bitter notes for a full-bodied, grounding cup." },
  { q: "Is Reishi safe to take daily?", a: "For most healthy adults, yes — Reishi has a long traditional use history and a clean modern safety record. Note: some studies report mild digestive upset in the first few days of use as the body adjusts. Consult your doctor if you take blood thinners, immunosuppressants, or are pregnant." },
  { q: "How long does Reishi take to work?", a: "Reishi is adaptogenic — its effects build gradually over weeks of consistent use rather than delivering acute effects like caffeine. Most users report improved sleep quality after 1–2 weeks of nightly use, with stress resilience benefits noticed after 4–6 weeks of daily consumption." },
];

const PRODUCTS = [
  { name: "MoonCap Restore", slug: "mooncap-restore-instant-mushroom-coffee", tagline: "Reishi — evening recovery & restoration" },
];

export default function ReishiMushroomCoffeePage() {
  useSEO({
    title: "Reishi Mushroom Coffee: Sleep, Calm & Recovery Benefits | Torch Republic",
    description: "Reishi mushroom coffee supports sleep quality, cortisol modulation, and immune health. Learn the science behind this 2,000-year-old adaptogen and shop Torch Republic's evening blends.",
    url: '/ingredients/reishi-mushroom-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      section: 'Ingredients',
      keywords: ['reishi mushroom coffee', 'reishi coffee benefits', 'mushroom coffee sleep', 'reishi adaptogen', 'evening mushroom coffee'],
    },
    faq: PAA.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Reishi Coffee', url: '/ingredients/reishi-mushroom-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh', color: '#F5EFE6' }}>
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/ingredients" className="hover:opacity-70">Ingredients</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.7)' }}>Reishi</span>
        </nav>
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.18)' }}>
            <Moon size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: RG }}>Calm, Sleep & Recovery</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Reishi Mushroom Coffee:<br /><span style={{ color: RG }}>Calm, Recovery & Rest</span>
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
            Reishi (Ganoderma lucidum) has been called the mushroom of immortality for 2,000 years. Modern science is validating its traditional uses for sleep, stress, and immune modulation. Here's what you need to know.
          </p>
          <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90" style={{ background: RG, color: '#080808' }}>
            Shop Reishi Blends <ArrowRight size={11} />
          </Link>
        </motion.div>
      </section>

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

      <section className="max-w-3xl mx-auto px-6 py-10" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Reishi Evening Blends</p>
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
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F5EFE6' }}>People Also Ask About Reishi Coffee</h2>
        <div className="space-y-6">
          {PAA.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="pb-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
              <h3 className="font-heading font-semibold mb-3" style={{ fontSize: '0.95rem', color: '#F5EFE6' }}>{item.q}</h3>
              <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.85 }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.35)' }}>Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Lion's Mane Coffee", href: '/lions-mane-coffee' },
            { label: 'Mushroom Coffee Benefits', href: '/mushroom-coffee-benefits' },
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