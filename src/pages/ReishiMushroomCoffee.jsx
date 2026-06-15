/**
 * Reishi Mushroom Coffee — SEO Educational Landing Page
 * Route: /reishi-mushroom-coffee
 * Target keywords: reishi mushroom coffee, reishi coffee benefits, reishi adaptogen
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Moon, Shield, CheckCircle, ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.58)';

const FACTS = [
  "Reishi (Ganoderma lucidum) is known as Lingzhi in Chinese — meaning 'divine mushroom' or 'mushroom of immortality'",
  "Contains over 400 bioactive compounds including triterpenoids, beta-glucans, and polysaccharides",
  "The only mushroom traditionally consumed primarily for its adaptogenic and calming properties, not stimulation",
  "Used continuously in Chinese and Japanese medicine for over 2,000 years — one of the most historically documented adaptogens",
  "Torch Republic blends featuring Reishi are formulated for evening rituals and stress recovery",
  "Ganoderic acids (Reishi's unique triterpenoids) are studied for their modulating effects on cortisol and stress pathways",
];

const BENEFITS = [
  {
    icon: Moon,
    title: "Cortisol & Stress Regulation",
    body: "Reishi's ganoderic acids have been shown in multiple studies to interact with the HPA (hypothalamic-pituitary-adrenal) axis — the body's central stress regulation system. Regular Reishi consumption may help blunt exaggerated cortisol spikes, supporting a calmer physiological response to daily stressors without sedation.",
  },
  {
    icon: Shield,
    title: "Sleep Quality Support",
    body: "Several human studies have documented improved sleep quality, reduced sleep latency, and increased total sleep time with consistent Reishi supplementation. Reishi appears to increase non-REM sleep time and may modulate adenosine pathways, the same mechanism that accumulates 'sleep pressure' throughout the day.",
  },
  {
    icon: Moon,
    title: "Immune Homeostasis",
    body: "Like Chaga, Reishi's beta-glucans modulate immune function — but Reishi's mechanism is more strongly associated with regulatory T-cell activity, helping the immune system distinguish appropriate from inappropriate immune responses. This is the basis for Reishi's long-standing use as a longevity tonic.",
  },
];

const FAQS = [
  { q: "What is Reishi mushroom coffee?", a: "Reishi mushroom coffee is premium instant coffee blended with Reishi (Ganoderma lucidum) extract. Unlike stimulant mushrooms like Cordyceps, Reishi is an adaptogen primarily known for its calming, anti-stress, and sleep-supporting properties. It pairs with coffee to smooth out the stimulant edge and support recovery." },
  { q: "Does Reishi mushroom coffee help with sleep?", a: "Reishi is one of the most studied mushrooms for sleep support. Human trials have shown improvements in sleep quality and sleep latency with consistent daily use over 4–8 weeks. Reishi is not a sedative — it doesn't induce sleep acutely. Rather, it helps regulate the stress and cortisol cycles that commonly disrupt sleep." },
  { q: "Is Reishi coffee calming?", a: "Yes — Reishi is distinctly more calming than most functional mushrooms. Its triterpenoids interact with the body's stress regulatory system, blunting cortisol responses and supporting parasympathetic (rest-and-digest) tone. In coffee, this can reduce coffee-induced anxiety and support a more grounded energy experience." },
  { q: "Can I drink Reishi coffee in the morning?", a: "Yes. Reishi's calming effect is subtle and doesn't cause drowsiness at typical doses. Morning Reishi coffee still delivers the caffeine from the coffee base — Reishi adds a stress-buffering layer without eliminating alertness. Many users prefer Reishi blends in the evening as part of a wind-down ritual." },
  { q: "How long does Reishi take to work?", a: "Adaptogens like Reishi are cumulative. Most users report noticeable improvements in stress resilience, sleep quality, and overall calm within 2–4 weeks of daily use. Single-serving effects are subtle compared to the long-term systemic benefits." },
];

export default function ReishiMushroomCoffee() {
  useSEO({
    title: "Reishi Mushroom Coffee | Calm, Sleep & Stress Support | Torch Republic",
    description: "Reishi mushroom coffee for calm energy, stress regulation, and better sleep. Learn the science of Reishi adaptogens and shop Torch Republic's evening ritual blends.",
    url: '/reishi-mushroom-coffee',
    type: 'website',
    faq: FAQS.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Reishi Mushroom Coffee', url: '/reishi-mushroom-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/ingredients" className="hover:opacity-70">Ingredients</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.6)' }}>Reishi Coffee</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="text-center px-6 md:px-10 pt-14 pb-12" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[0.48em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Torch Republic · Reishi Coffee
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Reishi Mushroom Coffee<br />
          <span style={{ color: RG }}>for Calm, Recovery & Sleep</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading mb-8"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
          Reishi is the "mushroom of immortality" — revered for 2,000 years for its calming, adaptogenic, and sleep-supporting properties. In Torch Republic's evening blends, Reishi transforms your coffee ritual into a genuine recovery ritual without removing the coffee experience.
        </motion.p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/shop/instant-mushroom-coffee"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404', textDecoration: 'none' }}>
            Shop Reishi Blends
          </Link>
          <Link to="/products/mooncap-restore-instant-mushroom-coffee"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG, textDecoration: 'none' }}>
            MoonCap Restore →
          </Link>
        </div>
      </section>

      {/* What Is Reishi */}
      <section className="px-6 md:px-10 pb-16" style={{ maxWidth: '940px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>What Is Reishi?</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
              The Mushroom of Immortality
            </h2>
            <p className="font-heading mb-4" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              Reishi (Ganoderma lucidum) is a glossy, fan-shaped mushroom that grows on decaying hardwood trees throughout Asia. Unlike Lion's Mane (cognitive) or Cordyceps (physical energy), Reishi is the quintessential calming adaptogen — consumed for over two millennia specifically for its ability to reduce stress, support immunity, and promote longevity.
            </p>
            <p className="font-heading" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              Its unique triterpenoids (ganoderic acids) are not found in any other mushroom and are the compounds most associated with its distinctive calming effects. These compounds require alcohol extraction to capture — which is why Torch Republic uses dual-extraction (hot water for beta-glucans + alcohol for triterpenoids) to ensure the full compound profile in every serving.
            </p>
          </div>
          <div>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Key Facts</p>
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

      {/* Benefits */}
      <section className="px-6 md:px-10 py-14" style={{ background: 'rgba(230,183,173,0.03)', borderTop: '1px solid rgba(230,183,173,0.07)', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          <h2 className="font-serif font-bold mb-10 text-center" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5EFE6' }}>
            Why Reishi in Your Coffee Ritual
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div key={b.title}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: '#100F0D', border: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.18)' }}>
                    <b.icon size={15} style={{ color: RG }} />
                  </div>
                  <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: '#F5EFE6', lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.8 }}>{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 md:px-10 py-12" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Reading</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Lion's Mane Coffee", path: '/lions-mane-coffee' },
            { label: 'Chaga Mushroom Coffee', path: '/chaga-mushroom-coffee' },
            { label: 'Mushroom Coffee Benefits', path: '/mushroom-coffee-benefits' },
            { label: 'MoonCap Restore Blend', path: '/products/mooncap-restore-instant-mushroom-coffee' },
            { label: 'All Ingredients', path: '/ingredients' },
          ].map(l => (
            <Link key={l.path} to={l.path}
              className="font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2.5 transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.18)', color: 'rgba(230,183,173,0.55)' }}>
              {l.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — People Also Ask */}
      <section className="px-6 md:px-10 pb-20" style={{ maxWidth: '740px', margin: '0 auto' }}>
        <h2 className="font-serif font-bold mb-8 text-center" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
          People Also Ask
        </h2>
        {FAQS.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: '1px solid rgba(230,183,173,0.08)', paddingBottom: '20px', marginBottom: '20px' }}>
            <h3 className="font-serif font-bold mb-2.5" style={{ fontSize: '0.97rem', color: '#F5EFE6' }}>{q}</h3>
            <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.8 }}>{a}</p>
          </div>
        ))}
        <div className="text-center mt-8">
          <Link to="/shop/instant-mushroom-coffee"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3.5 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404' }}>
            Try Reishi Coffee — 30-Day Guarantee <ArrowRight size={13} />
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