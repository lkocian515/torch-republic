import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { CheckCircle, X, Star } from 'lucide-react';

const RG = '#E6B7AD';

const COMPARISON = [
  {
    brand: 'Torch Republic',
    type: 'Functional Instant Coffee',
    caffeine: '40–60 mg',
    mushrooms: 'Yes (Lion\'s Mane + Cordyceps + Reishi)',
    process: 'Freeze-dried + dual-extract',
    taste: '⭐⭐⭐⭐⭐',
    clean: true,
    highlight: true,
  },
  {
    brand: 'Starbucks VIA',
    type: 'Standard Instant',
    caffeine: '135 mg',
    mushrooms: 'No',
    process: 'Spray-dried',
    taste: '⭐⭐⭐',
    clean: false,
    highlight: false,
  },
  {
    brand: 'Nescafé Gold',
    type: 'Standard Instant',
    caffeine: '60–80 mg',
    mushrooms: 'No',
    process: 'Freeze-dried',
    taste: '⭐⭐⭐',
    clean: false,
    highlight: false,
  },
  {
    brand: 'Four Sigmatic',
    type: 'Mushroom Instant',
    caffeine: '50 mg',
    mushrooms: 'Yes (varies)',
    process: 'Spray-dried',
    taste: '⭐⭐⭐½',
    clean: true,
    highlight: false,
  },
  {
    brand: 'Mount Hagen',
    type: 'Organic Instant',
    caffeine: '75–100 mg',
    mushrooms: 'No',
    process: 'Freeze-dried',
    taste: '⭐⭐⭐⭐',
    clean: true,
    highlight: false,
  },
];

const FAQ = [
  {
    question: 'What is the best instant coffee for taste?',
    answer: "Freeze-dried instant coffee consistently outperforms spray-dried in taste because the freeze-drying process preserves more of the coffee's original volatile flavor compounds. Look for Arabica-based freeze-dried options. Torch Republic uses a premium freeze-dried base with a smooth, bold flavor profile.",
  },
  {
    question: 'Is instant coffee as good as brewed coffee?',
    answer: 'High-quality instant coffee today is remarkably close to brewed coffee,  especially freeze-dried varieties made from specialty-grade Arabica beans. The gap that existed 20 years ago has largely closed. For daily ritual purposes, the best instant coffees are indistinguishable from good drip coffee to most palates.',
  },
  {
    question: 'What is the healthiest instant coffee?',
    answer: "The healthiest instant coffees are those with no additives, made from quality Arabica beans, and ideally enhanced with functional ingredients like mushroom extracts. Mushroom instant coffees add meaningful nutritional value beyond caffeine,  particularly Lion's Mane for cognitive health and Chaga for antioxidants.",
  },
  {
    question: 'How much caffeine does instant coffee have?',
    answer: 'Standard instant coffee contains between 60–120 mg of caffeine per serving, depending on the brand and serving size. Mushroom instant coffees typically contain 40–60 mg,  deliberately lower to reduce jitters and allow the adaptogenic compounds to work without overstimulation.',
  },
  {
    question: 'Is instant coffee bad for you?',
    answer: "Plain instant coffee carries the same general health profile as brewed coffee,  moderate consumption (2–4 cups/day) is associated with positive outcomes in multiple large studies. The primary concern with low-quality instant is the use of Robusta beans (which have higher acrylamide) and spray-drying (which reduces antioxidant content). Choose Arabica-based, freeze-dried products for the best nutritional profile.",
  },
];

export default function BestInstantCoffee() {
  useSEO({
    title: 'Best Instant Coffee of 2025: Honest Reviews & Complete Buyer\'s Guide',
    description: 'The most thorough instant coffee guide online,  taste, caffeine, ingredients, and value compared. Plus why mushroom instant coffee is the category to know.',
    url: '/journal/best-instant-coffee',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Best Instant Coffee 2025', url: '/journal/best-instant-coffee' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-02-10T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Coffee Guide',
      keywords: ['best instant coffee', 'instant coffee review', 'mushroom instant coffee', 'healthiest instant coffee', 'freeze dried coffee'],
    },
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Coffee Guide · Updated June 2025
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Best Instant Coffee of 2025: Honest Reviews & Buyer's Guide
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Instant coffee has come a long way. Here's what to look for, what to avoid, and which products are actually worth your mornings.
          </p>
        </motion.div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              What Makes Instant Coffee Good (or Bad)?
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Not all instant coffee is created equal. The quality gap between a supermarket jar of generic instant and a premium freeze-dried single-origin is enormous,  and it comes down to three factors: bean quality, processing method, and what else is in the can.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
                {[
                  { title: 'Bean Quality', body: 'Arabica beans produce smoother, more nuanced flavor. Robusta is cheaper, higher in caffeine, and harsher. Many budget instants blend heavily toward Robusta. Always check the label.', color: '#C4A35A' },
                  { title: 'Processing Method', body: 'Freeze-drying preserves far more flavor compounds than spray-drying. Look for "freeze-dried" on the label. It costs more but the difference is audible in the flavor.', color: RG },
                  { title: 'Added Ingredients', body: 'Quality instant coffee should be coffee,  or coffee plus clean functional extracts. Avoid products with added sugars, creamers, artificial flavors, or mystery "natural flavors" on the label.', color: '#6CBD5A' },
                ].map((f, i) => (
                  <div key={f.title} className="p-6" style={{ background: '#0E0C0B', border: `1px solid ${f.color}30` }}>
                    <h3 className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: f.color }}>{f.title}</h3>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{f.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              2025 Instant Coffee Comparison
            </motion.h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
                    {['Brand', 'Type', 'Caffeine', 'Mushrooms', 'Process', 'Taste'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.brand} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: row.highlight ? 'rgba(230,183,173,0.04)' : 'transparent' }}>
                      <td className="px-4 py-3.5 font-heading font-semibold" style={{ color: row.highlight ? RG : '#F5EFE6' }}>
                        {row.brand}
                        {row.highlight && <span className="ml-2 font-mono text-[7px] tracking-[0.15em] px-2 py-0.5" style={{ background: `${RG}20`, color: RG, border: `1px solid ${RG}30` }}>Our Pick</span>}
                      </td>
                      <td className="px-4 py-3.5 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.6)' }}>{row.type}</td>
                      <td className="px-4 py-3.5 font-mono text-xs" style={{ color: 'rgba(240,235,225,0.7)' }}>{row.caffeine}</td>
                      <td className="px-4 py-3.5 font-heading text-xs">
                        {row.mushrooms !== 'No' ? <CheckCircle className="w-4 h-4 inline" style={{ color: '#6EBD8E' }} /> : <X className="w-4 h-4 inline" style={{ color: 'rgba(255,255,255,0.2)' }} />}
                        {row.mushrooms !== 'No' && row.mushrooms !== 'Yes (varies)' && <span className="ml-1 text-[10px]" style={{ color: 'rgba(240,235,225,0.5)' }}>{row.mushrooms.replace('Yes ', '')}</span>}
                      </td>
                      <td className="px-4 py-3.5 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.6)' }}>{row.process}</td>
                      <td className="px-4 py-3.5 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.8)' }}>{row.taste}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Why Functional */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Why Mushroom Instant Coffee Is the Category to Know in 2025
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>The instant coffee market has been flat for decades. The same brands, the same formats, the same limitations. Then functional mushroom coffee entered the picture,  and it's the most meaningful category development since single-serve pods.</p>
              <p>The reason isn't marketing. It's because Lion's Mane, Chaga, and adaptogens address something regular instant coffee simply can't: the gap between "woken up" and "cognitively operational." Anyone who's had a cup of good coffee and still felt foggy for an hour afterward knows what that gap feels like.</p>
              <p>Mushroom instant coffee closes that gap,  not with more caffeine, but with compounds that work on neurological and adaptogenic pathways caffeine doesn't touch.</p>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-5">
              {FAQ.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)' }}>
                  <h3 className="font-serif font-bold text-white mb-3">{item.question}</h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>Try The Best</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Torch Republic Instant Coffee</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Freeze-dried Arabica base. Lion's Mane + Cordyceps + Reishi in every mushroom blend. Classic and matcha options available. No equipment. No waiting. Just great coffee.
            </p>
            <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
              Shop All Blends →
            </Link>
          </motion.div>
        </div>
      </article>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}