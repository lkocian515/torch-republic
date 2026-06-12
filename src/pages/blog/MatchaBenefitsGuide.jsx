import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Brain, Zap, Shield, Heart, Leaf, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';
const MATCHA_GREEN = '#6CBD5A';

const BENEFITS = [
  { icon: Brain, title: 'L-Theanine + Caffeine Synergy', body: 'Matcha delivers caffeine and L-theanine together — a combination shown in multiple studies to produce calmer, more sustained focus than caffeine alone. L-theanine triggers alpha brain waves, the state associated with relaxed alertness.' },
  { icon: Shield, title: 'EGCG Antioxidant Power', body: 'Matcha contains 137x more EGCG (epigallocatechin gallate) than standard green tea. EGCG is one of the most studied antioxidant compounds in nutrition science, linked to cardiovascular health, metabolic support, and cellular protection.' },
  { icon: Zap, title: 'Clean, Jitter-Free Energy', body: 'The L-theanine in matcha moderates caffeine absorption, smoothing the onset and extending the duration. The result is a calm, focused energy state without the adrenal spike, jitters, or hard crash of coffee.' },
  { icon: Heart, title: 'Metabolism & Fat Oxidation', body: 'Multiple studies show matcha increases thermogenesis (calorie burning) and fat oxidation by 17–43% during moderate exercise. It\'s one of the most evidence-backed metabolic support compounds available.' },
  { icon: Leaf, title: 'Chlorophyll & Detox Support', body: 'Matcha\'s deep green color comes from high chlorophyll content — a result of shade-growing that also increases L-theanine. Chlorophyll supports natural detoxification pathways and alkalinity.' },
];

const FAQ = [
  { question: 'What does ceremonial grade matcha taste like?', answer: 'Ceremonial grade matcha is smooth, subtly sweet, and umami-rich. It should have no bitterness — bitterness in matcha signals culinary grade quality or improper preparation. Quality ceremonial matcha tastes like a refined, earthy green tea with a creamy texture.' },
  { question: 'What is the difference between ceremonial and culinary grade matcha?', answer: "Ceremonial grade is made from the youngest tea leaves, shade-grown and stone-ground, with the highest L-theanine, chlorophyll, and EGCG content. Culinary grade uses older, more mature leaves and is best for baking and smoothies. For drinking — especially instant matcha — always use ceremonial grade." },
  { question: 'How much caffeine is in matcha?', answer: 'A standard serving of ceremonial matcha contains approximately 35–70 mg of caffeine, depending on serving size and quality. Crucially, this caffeine is accompanied by L-theanine, which modulates the caffeine effect into a smoother, longer-lasting energy curve.' },
  { question: 'Is matcha better than coffee for focus?', answer: "It depends on what you need. Matcha provides calmer, more sustained focus without anxiety — ideal for deep work, writing, or detailed tasks. Coffee provides a stronger, faster stimulant effect better suited to high-energy, short-duration tasks. Many people use both strategically: matcha for morning deep work, coffee pre-workout or before high-intensity tasks." },
  { question: 'What is instant ceremonial matcha?', answer: "Instant ceremonial matcha uses the same stone-ground ceremonial grade leaf as traditional matcha but in a pre-dissolved format that mixes instantly with hot or cold water. The highest quality versions preserve the full L-theanine and EGCG profile. Torch Republic's instant matcha uses single-origin Uji ceremonial grade." },
  { question: 'Can you drink matcha every day?', answer: 'Yes. Matcha is safe for daily consumption for most people. Research on daily green tea consumption consistently shows long-term cardiovascular and cognitive benefits. The main caution is for people sensitive to caffeine or those taking certain medications — consult your physician if unsure.' },
];

export default function MatchaBenefitsGuide() {
  useSEO({
    title: 'Matcha Benefits: The Complete Guide to Ceremonial Grade Matcha (2025)',
    description: 'Everything you need to know about matcha benefits — L-theanine, EGCG, metabolism, focus, and how ceremonial grade instant matcha fits your morning ritual.',
    url: '/journal/matcha-benefits',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Matcha Benefits Guide', url: '/journal/matcha-benefits' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-03-01T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Wellness',
      keywords: ['matcha benefits', 'ceremonial grade matcha', 'matcha vs coffee', 'L-theanine', 'EGCG', 'instant matcha'],
    },
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: `${MATCHA_GREEN}90` }}>
            Wellness Guide · Updated June 2025
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Matcha Benefits: The Complete Ceremonial Grade Guide
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Why hundreds of millions of people have made matcha their daily ritual — and why the science backs them up more than you might expect.
          </p>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0908' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div key={b.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="p-7" style={{ background: '#0E0C0B', border: '1px solid rgba(108,189,90,0.15)' }}>
                  <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-full" style={{ background: 'rgba(108,189,90,0.08)' }}>
                    <Icon className="w-5 h-5" style={{ color: MATCHA_GREEN }} />
                  </div>
                  <h2 className="font-serif font-bold text-lg text-white mb-3">{b.title}</h2>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.8 }}>{b.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Why Matcha Is Different From Every Other Green Tea
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Standard green tea is brewed from loose or bagged leaves — you steep the leaves, absorb some of the compounds, and discard the rest. Matcha changes this entirely: you're consuming the entire leaf, stone-ground into a fine powder.</p>
              <p>This matters because it multiplies the concentration of every active compound. A 2003 study published in the Journal of Chromatography found that matcha contains <strong style={{ color: MATCHA_GREEN }}>137 times more EGCG</strong> than standard green tea. The L-theanine concentration is similarly elevated.</p>
              <p>The shade-growing process amplifies this further. In the 3–4 weeks before harvest, matcha plants are covered — blocking 90% of sunlight. This stresses the plant, triggering a survival response that dramatically increases chlorophyll, L-theanine, and amino acid production. It's the reason ceremonial grade matcha is deep emerald green, not yellowish-green like lower grades.</p>
              <div className="my-8 p-6" style={{ background: 'rgba(108,189,90,0.06)', border: `1px solid ${MATCHA_GREEN}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.85 }}>
                  <strong style={{ color: MATCHA_GREEN }}>Key principle:</strong> You're not drinking tea brewed from a leaf. You're consuming the entire leaf. Every benefit is concentrated, not steeped.
                </p>
              </div>
            </div>
          </section>

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              The L-Theanine + Caffeine Combination: Why It Works
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>The most clinically significant property of matcha is the simultaneous presence of caffeine and L-theanine. Both compounds are well-studied individually — together, they produce an effect that neither creates alone.</p>
              <p>Caffeine alone creates stimulation. L-theanine alone creates relaxation (it's the compound in chamomile tea that makes you feel calm). Together, they produce what researchers describe as "relaxed alertness" — focus without tension, energy without anxiety.</p>
              <p>A 2008 study in Nutritional Neuroscience found that the caffeine-L-theanine combination improved speed and accuracy on attention-switching tasks while reducing susceptibility to distracting information. A 2010 study found the combination superior to caffeine alone on sustained attention, memory, and mood.</p>
              <p>This is why matcha drinkers consistently describe their energy differently than coffee drinkers: <em>"Calm energy." "Focused but not wired." "Like being in flow."</em></p>
            </div>
          </section>

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Matcha vs. Coffee: An Honest Comparison
            </motion.h2>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
                    {['Property', 'Matcha', 'Coffee'].map(h => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Energy onset', 'Gradual (15–30 min)', 'Fast (10–15 min)'],
                    ['Energy duration', '3–5 hours', '1.5–3 hours'],
                    ['Crash risk', 'Low', 'Moderate–High'],
                    ['Anxiety risk', 'Very Low', 'Moderate'],
                    ['Caffeine (per serving)', '35–70 mg', '80–120 mg'],
                    ['L-Theanine', '20–45 mg', 'None'],
                    ['EGCG antioxidants', 'Very High (137x green tea)', 'Low'],
                    ['Flavor complexity', 'Umami, sweet, vegetal', 'Bold, bitter, roasty'],
                    ['Best for', 'Deep focus, calm work, anxiety-prone', 'High intensity, mornings, social energy'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="px-5 py-3.5 font-heading text-xs font-semibold" style={{ color: '#F5EFE6' }}>{row[0]}</td>
                      <td className="px-5 py-3.5 font-heading text-xs" style={{ color: `${MATCHA_GREEN}CC` }}>{row[1]}</td>
                      <td className="px-5 py-3.5 font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)' }}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-5">
              {FAQ.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6" style={{ background: '#0E0C0B', border: '1px solid rgba(108,189,90,0.1)' }}>
                  <h3 className="font-serif font-bold text-white mb-3">{item.question}</h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(108,189,90,0.05)', border: `1px solid ${MATCHA_GREEN}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: `${MATCHA_GREEN}90` }}>Try Ceremonial Grade</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Torch Republic Instant Matcha</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Single-origin ceremonial grade Uji matcha. Stone-ground. Instant. No whisking required — just mix and your ritual begins.
            </p>
            <Link to="/shop/matcha" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: MATCHA_GREEN, color: '#080808' }}>
              Shop Ceremonial Matcha →
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