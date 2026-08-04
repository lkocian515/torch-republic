/**
 * Ceremonial Matcha Guide — SEO Educational Landing Page
 * Route: /ceremonial-matcha
 * Target keywords: ceremonial matcha, ceremonial grade matcha, instant ceremonial matcha, buy ceremonial matcha
 */
import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const RG = '#E6B7AD';
const EMERALD = '#10B981';
const DIM = 'rgba(240,232,220,0.58)';

const FACTS = [
  "Ceremonial grade matcha is made from the youngest tea leaves, shade-grown for 3–4 weeks before harvest",
  "Contains 5x more L-Theanine than regular green tea — the amino acid responsible for calm, focused energy",
  "EGCG (epigallocatechin gallate) in matcha is one of the most studied antioxidant compounds in plant medicine",
  "Traditional Japanese tea ceremonies have used ceremonial matcha for over 800 years",
  "Ceremonial matcha provides caffeine (~30–50mg per serving) paired with L-Theanine for a smoother energy experience than coffee",
  "Torch Republic sources ceremonial-grade matcha for all three matcha blends — no culinary-grade fillers",
];

const GRADES = [
  { grade: "Ceremonial Grade", desc: "Young, shade-grown leaves. Bright green, sweet, umami-rich. Meant to be consumed straight with hot water.", suitable: "Drinking straight" },
  { grade: "Premium Grade", desc: "Slightly older leaves. Good flavor, slightly more bitter. Used in lattes and mixed drinks.", suitable: "Lattes & drinks" },
  { grade: "Culinary Grade", desc: "Older leaves, more bitter, duller color. Designed for baking and smoothies where flavor is masked.", suitable: "Baking & cooking" },
];

const FAQS = [
  { q: "What is ceremonial grade matcha?", a: "Ceremonial grade matcha is the highest quality category of matcha, made from the youngest, shade-grown tea leaves of the first spring harvest. It's characterized by a bright vibrant green color, smooth umami flavor with natural sweetness, and higher L-Theanine content than lower-grade matchas. It's designed to be consumed with just hot water — no milk or sweetener required to taste good." },
  { q: "What is the difference between ceremonial and culinary matcha?", a: "Ceremonial matcha is made from younger leaves and processed more carefully, resulting in a sweeter, smoother flavor and brighter color. Culinary matcha uses older, lower leaves and is more bitter and duller in color — it's designed to be blended with strong flavors in baking or smoothies. Using culinary matcha as a drinking tea produces a bitter, unpleasant experience. Always use ceremonial grade for drinking." },
  { q: "Does ceremonial matcha have caffeine?", a: "Yes. Ceremonial matcha contains approximately 30–50mg of naturally occurring caffeine per serving. Its L-theanine content is traditionally associated with mindful tea rituals, and individual experiences can vary." },
  { q: "What does L-Theanine do in matcha?", a: "L-Theanine is an amino acid naturally found in tea. It is traditionally associated with mindful tea rituals and has been studied alongside caffeine, but individual experiences can vary." },
  { q: "Is instant ceremonial matcha as good as traditional matcha?", a: "High-quality instant ceremonial matcha preserves the L-Theanine and antioxidant profile of traditionally whisked matcha. The difference is in ritual — traditional matcha requires careful whisking technique and specific water temperature. Instant ceremonial matcha (like Torch Republic's blends) delivers the same active compounds in 30 seconds without equipment. If you value the ceremonial aspect, traditional preparation is irreplaceable. For a daily functional habit, instant ceremonial matcha is nutritionally equivalent." },
];

export default function CeremonialMatchaGuide() {
  useSEO({
    title: "Ceremonial Matcha: Grades, Benefits & How to Choose | Torch Republic",
    description: "Everything about ceremonial grade matcha — what it is, how it differs from culinary grade, naturally occurring L-theanine, and Torch Republic's instant ceremonial matcha blends.",
    url: '/ceremonial-matcha',
    type: 'website',
    faq: FAQS.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Shop Matcha', url: '/shop/matcha' },
      { name: 'Ceremonial Matcha Guide', url: '/ceremonial-matcha' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div className="px-6 md:px-10 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.35)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/shop/matcha" className="hover:opacity-70">Matcha</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.6)' }}>Ceremonial Matcha Guide</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="text-center px-6 md:px-10 pt-14 pb-12" style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="font-mono text-[9px] tracking-[0.48em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
          Torch Republic · Matcha Guide
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
          className="font-serif font-bold mb-5"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', color: '#F5EFE6', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Ceremonial Matcha<br />
          <span style={{ color: RG }}>The Complete Guide</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.14 }}
          className="font-heading mb-8"
          style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
          Ceremonial matcha is the highest quality grade of matcha — shade-grown, hand-harvested, stone-ground, and naturally rich in L-theanine. Here's everything you need to know before you buy.
        </motion.p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/shop/matcha"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404', textDecoration: 'none' }}>
            Shop Ceremonial Matcha
          </Link>
          <Link to="/why-matcha"
            className="font-mono text-[10px] tracking-[0.24em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-80"
            style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG, textDecoration: 'none' }}>
            Why Matcha? →
          </Link>
        </div>
      </section>

      {/* Grade Comparison Table */}
      <section className="px-6 md:px-10 pb-14" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F5EFE6' }}>
          Matcha Grades Explained
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.2)' }}>
                <th className="py-3 pr-4 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>Grade</th>
                <th className="py-3 px-3 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>Profile</th>
                <th className="py-3 pl-3 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {GRADES.map((g, i) => (
                <tr key={g.grade} style={{ borderBottom: '1px solid rgba(230,183,173,0.06)', background: i === 0 ? 'rgba(230,183,173,0.04)' : 'transparent' }}>
                  <td className="py-4 pr-4 font-heading text-sm font-medium" style={{ color: i === 0 ? '#F5EFE6' : DIM }}>
                    {i === 0 && <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-0.5 align-middle" style={{ background: EMERALD }} />}
                    {g.grade}
                  </td>
                  <td className="py-4 px-3 font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.5 }}>{g.desc}</td>
                  <td className="py-4 pl-3 font-heading text-sm" style={{ color: DIM, fontWeight: 300 }}>{g.suitable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-heading text-sm mt-4" style={{ color: 'rgba(230,183,173,0.55)', fontWeight: 300 }}>
          ↑ All Torch Republic matcha blends use ceremonial grade — the only grade worth drinking straight.
        </p>
      </section>

      {/* Key Facts */}
      <section className="px-6 md:px-10 py-12" style={{ background: 'rgba(230,183,173,0.03)', borderTop: '1px solid rgba(230,183,173,0.07)', borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F5EFE6' }}>
            What Makes Ceremonial Matcha Unique
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FACTS.map((fact, i) => (
              <motion.li key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-4" style={{ background: '#100F0D', border: '1px solid rgba(230,183,173,0.09)' }}>
                <CheckCircle size={13} style={{ color: RG, flexShrink: 0, marginTop: '3px' }} />
                <span className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.65 }}>{fact}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 md:px-10 py-12" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', color: '#F5EFE6' }}>
          Torch Republic Ceremonial Matcha Blends
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { name: 'The Monk Matcha', tagline: 'Pure ceremonial matcha for a simple daily ritual', slug: 'the-monk-matcha-blend' },
            { name: 'The Alchemist Matcha', tagline: 'Ceremonial matcha with elevated ritual intention', slug: 'the-alchemist-matcha-blend' },
            { name: 'The Alchemist Matcha', tagline: 'Complex, layered ceremonial matcha for intentional routines', slug: 'the-alchemist-matcha-blend' },
          ].map(p => (
            <Link key={p.slug} to={`/products/${p.slug}`}
              className="flex items-center justify-between gap-4 p-5 transition-all"
              style={{ background: '#100F0D', border: '1px solid rgba(230,183,173,0.1)', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}>
              <div>
                <p className="font-serif font-bold mb-1" style={{ color: '#F5EFE6', fontSize: '1rem' }}>{p.name}</p>
                <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300 }}>{p.tagline}</p>
              </div>
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: RG }}>View →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="px-6 md:px-10 pb-12" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <p className="font-mono text-[8px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>Related Reading</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'History of Matcha', path: '/journal/history-of-matcha' },
            { label: 'Matcha Benefits Guide', path: '/journal/matcha-benefits' },
            { label: 'Ceremonial vs Culinary Matcha', path: '/journal/ceremonial-matcha-vs-culinary' },
            { label: 'Instant Ceremonial Matcha', path: '/journal/instant-ceremonial-matcha' },
            { label: 'Why Matcha', path: '/why-matcha' },
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
          <Link to="/shop/matcha"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase font-bold py-3.5 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#040404' }}>
            Shop Ceremonial Matcha <ArrowRight size={13} />
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