import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Zap, Leaf, Shield, Coffee, Moon } from 'lucide-react';
import RecommendedRitualBlock from '../components/content/RecommendedRitualBlock';

const RG = '#E6B7AD';
const CLAY = '#B86543';
const PAGE = '#F8F5EF';
const CARD = '#FFFFFF';
const TEXT = '#3F3027';
const BODY = '#6A5A4A';
const BORDER = 'rgba(230,183,173,0.28)';

const BENEFITS = [
  { icon: Brain, title: "Lion's Mane in Your Morning Ritual", body: "Lion's Mane (Hericium erinaceus) is a unique functional mushroom that has been researched for its compound profile. It is included in our blends as a ritual ingredient for focused mornings—not as a medical treatment. Statements about this product have not been evaluated by the FDA." },
  { icon: Shield, title: "Chaga as a Daily Addition", body: "Chaga is among the most antioxidant-dense foods measured. It is added to Torch Republic blends as a traditional daily ingredient with a long history of use in Northern wellness practices. Individual experiences vary." },
  { icon: Zap, title: "Cordyceps for Active Mornings", body: "Cordyceps has been used in traditional East Asian practices for centuries and is researched for its compound profile. It is a popular choice for those who prefer an active morning ritual. This product is not intended to diagnose, treat, cure, or prevent any disease." },
  { icon: Moon, title: "Reishi for Calmer Evening Rituals", body: "Reishi is a traditional adaptogenic mushroom with a long history of evening use. It is added to our MoonCap and DreamCap blends as a ritual ingredient for those who prefer a slower, more grounded end to their day. Not a substitute for medical care." },
  { icon: Leaf, title: "Turkey Tail as a Ritual Ingredient", body: "Turkey Tail contains polysaccharides including beta-glucans that are studied for their nutritional profile. It is included in select Torch Republic blends as a traditional wellness ingredient. Individual results vary." },
  { icon: Coffee, title: "Why Pair Mushrooms with Coffee?", body: "Coffee delivers familiar energy while functional mushrooms are a complementary ritual addition. The natural bitterness of quality coffee also masks any earthy mushroom notes, making the blend convenient and coffee-forward in taste." },
];

const FAQS = [
  { q: "Do mushroom coffee blends actually work?", a: "The evidence is promising, not conclusive. Lion's Mane and Cordyceps have the most studied human trial data. Most of our customers report real differences in their focus and energy within 2–3 weeks of daily use. We recommend consistency over single-cup expectations." },
  { q: "Can I taste the mushrooms?", a: "No. Our blends are designed to taste like premium coffee. The mushrooms are fully masked by the roast character. If you didn't know they were in there, you wouldn't guess." },
  { q: "How much mushroom is in each serving?", a: "500mg of organic dual-extracted mushroom blend per serving — clearly labeled. No proprietary blends hiding a trace amount behind a big number." },
  { q: "Is mushroom coffee safe?", a: "For most healthy adults, yes. Functional mushrooms have centuries of use history. We recommend consulting your doctor if you're pregnant, nursing, immunocompromised, or on medication." },
];

export default function MushroomCoffeeBenefits() {
  useSEO({
    title: "Mushroom Coffee Benefits | Lion's Mane & Chaga | Torch Republic Coffee Co.",
    description: "What does mushroom coffee actually do? Learn how Lion's Mane and Chaga support focus, clarity, and calm energy in Torch Republic instant coffee blends. Science explained simply.",
    url: '/mushroom-coffee-benefits',
    faq: FAQS.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Learn', url: '/journal' },
      { name: 'Mushroom Coffee Benefits', url: '/mushroom-coffee-benefits' },
    ],
  });

  return (
    <div style={{ background: PAGE, minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: 'clamp(64px, 8vw, 120px) 24px 48px', textAlign: 'center', maxWidth: '760px', margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.48em', textTransform: 'uppercase', color: RG, marginBottom: '16px' }}
        >
          Torch Republic · The Science
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: TEXT, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px' }}
        >
          Mushroom Coffee Benefits,<br />
          <span style={{ color: CLAY }}>Honestly Explained</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading"
          style={{ fontSize: '1rem', color: BODY, fontWeight: 300, lineHeight: 1.8, marginBottom: '36px' }}
        >
          Functional mushrooms have been used in traditional medicine for thousands of years. Modern research is now catching up. Here's what the science actually says — no hype, no exaggeration.
        </motion.p>
        <Link
          to="/shop"
          style={{
            display: 'inline-block', background: CLAY, color: '#FBF8F1',
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.24em',
            textTransform: 'uppercase', fontWeight: 700, padding: '14px 32px', textDecoration: 'none', borderRadius: '4px',
          }}
        >
          Shop Mushroom Coffee
        </Link>
      </section>

      {/* Benefits */}
      <section style={{ maxWidth: '1060px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{ background: CARD, border: `1px solid ${BORDER}`, padding: 'clamp(24px, 3vw, 36px)', borderRadius: '10px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: 'rgba(230,183,173,0.16)', border: '1px solid rgba(230,183,173,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <b.icon size={15} style={{ color: CLAY }} />
                </div>
                <h2 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: TEXT, margin: 0, lineHeight: 1.3 }}>{b.title}</h2>
              </div>
              <p className="font-heading" style={{ fontSize: '0.87rem', color: BODY, fontWeight: 300, lineHeight: 1.75, margin: 0 }}>{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended Ritual */}
      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px 24px' }}>
        <RecommendedRitualBlock
          productName="Instant Mushroom Coffee"
          productSlug="instant-mushroom-coffee"
          tagline="Lion's Mane + Chaga in every cup. The simplest way to make these functional mushrooms a daily habit — subscribe and save 10%."
        />
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px clamp(64px, 8vw, 96px)' }}>
        <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: TEXT, marginBottom: '32px', textAlign: 'center' }}>
          Common Questions
        </h2>
        {FAQS.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '24px', marginBottom: '24px' }}>
            <h3 className="font-serif font-bold" style={{ fontSize: '1rem', color: TEXT, marginBottom: '10px' }}>{q}</h3>
            <p className="font-heading" style={{ fontSize: '0.87rem', color: BODY, fontWeight: 300, lineHeight: 1.75, margin: 0 }}>{a}</p>
          </div>
        ))}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/shop" style={{ color: CLAY, fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700 }}>
            Try a Blend — 30-Day Guarantee →
          </Link>
        </div>
      </section>
    </div>
  );
}