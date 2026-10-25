import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Shield, Brain, Heart, Zap, CheckCircle, Leaf } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';

const ADAPTOGENS = [
  {
    name: 'Reishi (Ganoderma lucidum)',
    nickname: 'The Calming Adaptogen',
    color: '#C98F86',
    effects: ['HPA axis modulation (stress response)', 'Improved sleep quality and duration', 'Immune system regulation', 'Anti-anxiety effects via GABA modulation'],
    evidence: 'Strongest evidence for sleep quality improvement. 2019 study in SLEEP Medicine showed significant reduction in fatigue and depression after 8 weeks.',
  },
  {
    name: 'Cordyceps (C. militaris)',
    nickname: 'The Energy Adaptogen',
    color: '#C4A35A',
    effects: ['Increased cellular ATP production', 'Improved VO2 max and endurance', 'Reduced exercise-induced fatigue', 'Mitochondrial support'],
    evidence: '2017 meta-analysis (Journal of Dietary Supplements) confirmed significant improvements in aerobic performance across 5 clinical trials.',
  },
  {
    name: "Lion's Mane (Hericium erinaceus)",
    nickname: 'The Cognitive Adaptogen',
    color: RG,
    effects: ['NGF (Nerve Growth Factor) stimulation', 'Neuroplasticity and memory support', 'Cognitive decline prevention', 'Anti-inflammatory neuroprotection'],
    evidence: '2023 RCT showed improved attention and cognitive processing after single dose in healthy young adults (PMID: 38004235).',
  },
  {
    name: 'Chaga (Inonotus obliquus)',
    nickname: 'The Immune Adaptogen',
    color: '#8B7355',
    effects: ['Highest ORAC antioxidant score recorded', 'Immunomodulation via beta-glucans', 'Anti-inflammatory (TNF-α reduction)', 'Cellular protection from oxidative stress'],
    evidence: 'Multiple in vitro and animal studies confirm immunomodulatory effects. Beta-glucan research spans 30+ years with strong mechanistic evidence.',
  },
  {
    name: 'Ashwagandha (Withania somnifera)',
    nickname: 'The Stress Adaptogen',
    color: '#8B9E5A',
    effects: ['Cortisol reduction (up to 30% in trials)', 'HPA axis normalization', 'Improved testosterone and thyroid function', 'Anxiety reduction comparable to medication in some studies'],
    evidence: '2012 double-blind RCT (IJAYP) showed 27.9% cortisol reduction vs placebo. Most clinically studied adaptogen available.',
  },
];

const FAQ = [
  { question: 'What are adaptogens?', answer: 'Adaptogens are a class of herbs, mushrooms, and plant compounds that help the body resist physical and psychological stress,  specifically by modulating the HPA axis (hypothalamic-pituitary-adrenal axis), your body\'s central stress response system. The term was coined in 1947 by Soviet pharmacologist Nikolai Lazarev and has been refined by decades of research since.' },
  { question: 'Do adaptogens actually work?', answer: 'The evidence varies by specific adaptogen. Ashwagandha has the strongest clinical evidence base,  multiple RCTs show significant cortisol reduction and anxiety improvement. Reishi has strong evidence for sleep quality. Cordyceps has consistent evidence for athletic performance. Lion\'s Mane has robust evidence for cognitive function. The key is specificity,  "adaptogens" as a category is vague, but individual compounds have real, measurable effects.' },
  { question: 'Can I take adaptogens in coffee?', answer: "Yes,  and functional mushroom coffee is one of the most convenient delivery formats available. Adaptogenic mushrooms (Reishi, Chaga, Lion's Mane, Cordyceps) are heat-stable and well-suited to hot beverage formats. Quality mushroom coffees use dual-extract concentrates that preserve the active compounds." },
  { question: 'How long do adaptogens take to work?', answer: 'Most adaptogens have two timelines: acute effects (single dose) and cumulative effects (2–8 weeks). Ashwagandha reduces cortisol acutely with a single dose but shows stronger effects after 4–8 weeks of consistent use. Lion\'s Mane cognitive benefits are primarily cumulative,  most research shows the strongest effects after 4–16 weeks.' },
  { question: 'Are adaptogens safe?', answer: "The most widely studied adaptogens,  Ashwagandha, Reishi, Lion's Mane, Chaga, Cordyceps,  have strong safety profiles from both traditional use (centuries) and modern research. The main contraindications are mushroom allergies, blood-thinning medications (consult your doctor), and thyroid conditions for some herbs. Always consult your physician before adding any new supplement." },
];

export default function AdaptogensGuide() {
  useSEO({
    title: 'Adaptogens: The Complete Science Guide,  What They Are, What Works (2025)',
    description: 'The honest, research-backed guide to adaptogens,  which ones actually work, what the evidence says, and how functional mushroom coffee delivers them in your morning ritual.',
    url: '/journal/adaptogens-guide',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Adaptogens Guide', url: '/journal/adaptogens-guide' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-04-15T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Wellness',
      keywords: ['adaptogens', 'adaptogenic mushrooms', 'reishi benefits', 'ashwagandha', 'cordyceps', 'adaptogens in coffee'],
    },
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Wellness Science · Updated June 2025
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Adaptogens: What They Are, What Works, and What Doesn't
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            The wellness industry has turned "adaptogen" into a marketing buzzword. Here's what the actual research says,  broken down compound by compound.
          </p>
        </motion.div>
      </section>

      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              What an Adaptogen Actually Is
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>In the 1940s, Soviet pharmacologist Nikolai Lazarev was looking for compounds that could help soldiers and workers perform under extreme stress without the side effects of stimulants. He proposed the term "adaptogen" for substances that could increase the body's "non-specific resistance" to stress.</p>
              <p>The modern scientific definition is more precise. A true adaptogen must:</p>
              <ul className="space-y-2 my-6 ml-4">
                {['Reduce stress-induced damage without adding new stress', 'Have a normalizing effect,  raising what\'s too low, lowering what\'s too high', 'Be non-toxic and safe for chronic use', 'Work primarily through the HPA (hypothalamic-pituitary-adrenal) axis'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>This definition excludes many things marketed as adaptogens. But the compounds that do qualify,  Ashwagandha, Reishi, Rhodiola, Eleuthero, and several others,  have increasingly robust evidence bases.</p>
            </div>
          </section>

          {/* The 5 Adaptogens */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              5 Adaptogens With Real Evidence
            </motion.h2>
            <div className="space-y-6">
              {ADAPTOGENS.map((a, i) => (
                <motion.div key={a.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="p-7" style={{ background: '#0E0C0B', border: `1px solid ${a.color}25` }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg">{a.name}</h3>
                      <p className="font-mono text-[8px] tracking-[0.3em] uppercase mt-1" style={{ color: a.color }}>{a.nickname}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(240,235,225,0.3)' }}>Effects</p>
                      <ul className="space-y-2">
                        {a.effects.map((e, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: a.color }} />
                            <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4" style={{ background: `${a.color}08`, border: `1px solid ${a.color}20` }}>
                      <p className="font-mono text-[7px] tracking-[0.25em] uppercase mb-2" style={{ color: `${a.color}80` }}>Clinical Evidence</p>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.75 }}>{a.evidence}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="Adaptogens: The Complete Science Guide,  What They Are, What Works (2025)" url="/journal/adaptogens-guide" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>Adaptogens in Every Cup</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Torch Republic Mushroom Coffee</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Lion's Mane, Cordyceps, Reishi, and adaptogenic mushrooms in every mushroom blend. No pills, no powders to mix separately. One cup covers it all.
            </p>
            <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
              Shop Mushroom Coffee →
            </Link>
          </motion.div>
        </div>
      </article>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before adding any supplement to your routine.
        </p>
      </div>
    </div>
  );
}