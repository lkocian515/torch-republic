/**
 * Chaga Mushroom Coffee — SEO Educational Landing Page
 * Route: /chaga-mushroom-coffee
 * Target keywords: chaga mushroom coffee, chaga coffee benefits, chaga instant coffee
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';
const DIM = 'rgba(240,232,220,0.58)';

const FACTS = [
  "Chaga (Inonotus obliquus) is a fungus that grows primarily on birch trees in cold northern climates",
  "Has one of the highest ORAC (antioxidant capacity) scores ever measured in a natural food source",
  "Contains beta-glucans — immune-modulating polysaccharides studied in multiple human trials",
  "Used for centuries in Siberian and Northern European folk medicine as a daily health tonic",
  "Torch Republic uses dual-extracted Chaga — water extraction for beta-glucans, alcohol extraction for betulinic acid compounds",
  "Best consumed consistently over weeks — most users report improved daily resilience within 2–3 weeks",
];

const BENEFITS = [
  {
    icon: Shield,
    title: "Antioxidant Density",
    body: "Chaga regularly tops antioxidant indexes, outperforming blueberries, acai, and even cacao. Antioxidants neutralize free radicals — unstable molecules that accelerate cellular aging and inflammation. A daily cup of Chaga coffee delivers meaningful antioxidant support without changing how your coffee tastes.",
  },
  {
    icon: Zap,
    title: "Immune Modulation via Beta-Glucans",
    body: "Chaga's beta-glucan polysaccharides interact with immune receptors in a process called immune modulation — helping calibrate immune response rather than simply stimulating it. This is why Chaga is described as an adaptogen: it supports balance, not just activation.",
  },
  {
    icon: Shield,
    title: "Anti-Inflammatory Properties",
    body: "Research has documented Chaga's inhibitory effect on certain inflammatory pathways. Chronic low-level inflammation is implicated in fatigue, cognitive fog, and mood instability. Daily Chaga consumption may help reduce the systemic inflammatory load from modern diet and stress.",
  },
];

const FAQS = [
  { q: "What does Chaga coffee taste like?", a: "Chaga adds a subtle earthy, slightly vanilla-like depth to coffee without dominating the flavor. In Torch Republic's blends, the coffee is the primary taste — Chaga is a background note that makes the cup feel richer and more grounded." },
  { q: "How much Chaga is in each serving?", a: "Each Torch Republic blend contains 500mg of organic dual-extracted Chaga per serving. Dual extraction ensures you get both the water-soluble beta-glucans and the alcohol-soluble bioactive compounds in every cup." },
  { q: "Can I drink Chaga coffee every day?", a: "Yes. Chaga has centuries of daily-use history as a tonic. For healthy adults, daily consumption is how the adaptogenic benefits accumulate. As always, consult a healthcare provider if you have conditions affecting blood clotting, are on blood thinners, or are immunocompromised." },
  { q: "Does Chaga coffee have caffeine?", a: "Yes — the caffeine comes from the Arabica coffee base (~60–80mg per serving), not the Chaga itself. Chaga mushroom extract contains no caffeine. The combination gives you the alertness of coffee with the adaptogenic support of Chaga." },
  { q: "Is Chaga safe?", a: "For most healthy adults, Chaga has a strong safety profile supported by centuries of use. Rare interactions exist with blood thinners (warfarin) and diabetes medications due to Chaga's natural compounds. Consult a physician if you take any of these medications." },
];

export default function ChagaMushroomCoffee() {
  useSEO({
    title: "Chaga Mushroom Coffee | Benefits, Science & Torch Republic Blends",
    description: "Learn what Chaga mushroom coffee does for immunity, antioxidant defense, and daily resilience. Premium instant Chaga coffee blends from Torch Republic — no machine needed.",
    url: '/chaga-mushroom-coffee',
    type: 'website',
    faq: FAQS.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Chaga Mushroom Coffee', url: '/chaga-mushroom-coffee' },
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
          <span style={{ color: 'rgba(230,183,173,0.6)' }}>Chaga Coffee</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="text-center px-6 md:px-10 pt-14 pb-12" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[0.48em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Torch Republic · Chaga Coffee
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Chaga Mushroom Coffee<br />
          <span style={{ color: RG }}>for Immunity & Antioxidant Defense</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading mb-8"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
          Chaga is called the "King of Mushrooms" for its unmatched antioxidant density and immune-supporting beta-glucans. Torch Republic pairs organic dual-extracted Chaga with premium instant Arabica coffee for a daily ritual that protects as much as it energizes.
        </motion.p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/shop/instant-mushroom-coffee"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404', textDecoration: 'none' }}>
            Shop Chaga Blends
          </Link>
          <Link to="/mushroom-coffee-benefits"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG, textDecoration: 'none' }}>
            All Mushroom Benefits
          </Link>
        </div>
      </section>

      {/* What Is Chaga */}
      <section className="px-6 md:px-10 pb-16" style={{ maxWidth: '940px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>What Is Chaga?</p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
              The King of Mushrooms
            </h2>
            <p className="font-heading mb-4" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              Chaga is not a conventional mushroom — it's a sclerotium, a hardened mass of mycelium that grows inside birch trees in Siberia, Canada, and northern Europe. It looks like charred wood from the outside and has a deep amber interior. This unusual form is part of what makes it so nutrient-dense: it concentrates compounds from the birch tree (including betulinic acid) alongside its own potent bioactives.
            </p>
            <p className="font-heading" style={{ fontSize: '0.9rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
              In Siberian folk medicine, Chaga tea (called "chaga chai") has been consumed daily for centuries as a longevity tonic. Modern phytochemical research has validated many of the traditional claims, particularly around antioxidant activity and immune modulation. It remains one of the most studied functional mushrooms in Eastern European pharmacological research.
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
            Why Chaga in Your Daily Coffee
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

      {/* Internal Links — Related */}
      <section className="px-6 md:px-10 py-12" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Reading</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Lion's Mane Coffee", path: '/lions-mane-coffee' },
            { label: 'Mushroom Coffee Benefits', path: '/mushroom-coffee-benefits' },
            { label: "Chaga: The Antioxidant King", path: '/journal/chaga-mushroom-antioxidant-king' },
            { label: 'History of Mushroom Coffee', path: '/journal/history-of-mushroom-coffee' },
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

      {/* FAQ */}
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
            Try Chaga Coffee — 30-Day Guarantee <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.18)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}