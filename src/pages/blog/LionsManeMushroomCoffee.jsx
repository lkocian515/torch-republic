import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Brain, Shield, Zap, Clock, TrendingUp, CheckCircle } from 'lucide-react';

const RG = '#E6B7AD';

const SCIENCE_HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'NGF Stimulation',
    text: 'Only food known to stimulate Nerve Growth Factor production in the central nervous system',
  },
  {
    icon: Shield,
    title: 'Neuroprotection',
    text: '2025 systematic review of 26 studies confirms neuroprotective effects across multiple mechanisms',
  },
  {
    icon: Zap,
    title: 'Cognitive Performance',
    text: '2023 RCT showed improved Stroop test performance after single acute dose in healthy adults',
  },
  {
    icon: Clock,
    title: 'Cumulative Benefits',
    text: 'Human trials show progressive improvement over 16 weeks with washout upon discontinuation',
  },
];

const COMPOUND_CLASSES = [
  {
    name: 'Erinacines',
    source: 'Mycelium (root structure)',
    function: 'Cross blood-brain barrier, stimulate NGF production directly inside CNS',
    property: 'Lipophilic (fat-soluble)',
  },
  {
    name: 'Hericenones',
    source: 'Fruiting body',
    function: 'Protect existing neurons from death induced by oxidative stress and ER stress',
    property: 'Cytoprotective',
  },
];

const HUMAN_TRIALS = [
  {
    year: '2009',
    study: 'Mori Trial (Foundational)',
    finding: 'Progressive cognitive score improvements over 16 weeks — scores declined after discontinuation, consistent with stimulus-driven NGF mechanism',
  },
  {
    year: '2020',
    study: 'Li et al. (Frontiers in Aging Neuroscience)',
    finding: '49 mild Alzheimer\'s patients over 49 weeks. Lion\'s Mane group showed significantly lower cognitive deterioration AND measurably higher plasma NGF levels',
  },
  {
    year: '2023',
    study: 'RCT (PMID: 38004235)',
    finding: 'Healthy young adults showed improved Stroop test performance (processing speed + selective attention) after single acute dose',
  },
  {
    year: '2025',
    study: 'Frontiers in Nutrition Review',
    finding: 'Systematic review of 26 studies confirmed neuroprotective effects: NGF stimulation, antioxidant, anti-inflammatory, anti-tumor mechanisms',
  },
];

const BENEFITS = [
  'Clearer, less foggy mornings — thoughts assemble more easily',
  'Sustained focus without the spike — ~40–60 mg caffeine vs. ~95 mg in regular coffee',
  'Reduced mid-morning jitters — lower caffeine + higher adaptogens significantly reduce cortisol-driven overstimulation',
  'Improved mood baseline — consistent with Lion\'s Mane effect on serotonin and BDNF pathways',
  'Long-term cognitive support — NGF stimulation builds over weeks, not days',
];

export default function LionsManeMushroomCoffee() {
  useSEO({
    title: 'Lion\'s Mane Mushroom Coffee: Benefits, Research & Morning Ritual Guide | Torch Republic',
    description: 'Discover the science behind Lion\'s Mane mushroom coffee — how NGF stimulation, Chaga antioxidants, and half the caffeine of regular coffee create the ultimate morning ritual.',
    url: '/journal/lions-mane-mushroom-coffee',
    type: 'article',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            The Science of Mushroom Coffee
          </p>
          <h1 className="font-serif font-bold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Lion's Mane Mushroom Coffee: Benefits, Research, and Why Your Morning Ritual Just Leveled Up
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg"
            style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            What if your morning cup did more than wake you up — what if it actively rebuilt your brain while you drank it? That's not marketing language. That's the science.
          </p>
        </motion.div>
      </section>

      {/* Science Highlights */}
      <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SCIENCE_HIGHLIGHTS.map((highlight, i) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center mb-4"
                    style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)' }}>
                    <Icon className="w-6 h-6" style={{ color: RG }} />
                  </div>
                  <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                    {highlight.title}
                  </h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.7 }}>
                    {highlight.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none mb-16"
          >
            <p className="font-heading text-lg" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              That's not marketing language. That's the science behind Lion's Mane mushroom coffee, and it's why this category has gone from health-food-store obscurity to a $300-million-per-year phenomenon in less than a decade. At Torch Republic, we built our mushroom coffee line around Lion's Mane for one reason: nothing else in the functional food world touches this compound's relationship with the human brain.
            </p>
            <p className="font-heading text-lg" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              Here's everything you need to know — the history, the science, the benefits, and how to make it part of your daily ritual.
            </p>
          </motion.div>

          {/* What Is Lion's Mane */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              What Is Lion's Mane, Really?
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Lion's Mane (<em style={{ color: RG }}>Hericium erinaceus</em>) is a culinary and medicinal mushroom native to North America, Europe, and Asia. It's named for its distinctive appearance — long, cascading white tendrils that resemble a lion's mane. It has been used in traditional Asian medicine for over 2,000 years, valued for brain health, digestive function, and nerve regeneration long before Western science had the tools to understand why.
              </p>
              <p>
                What makes it genuinely unique — not just among mushrooms, but among all foods — is that it contains two classes of bioactive compounds found nowhere else in nature: <strong style={{ color: RG }}>hericenones</strong> (from the fruiting body) and <strong style={{ color: RG }}>erinacines</strong> (from the mycelium). These molecules do something remarkable: they stimulate the production of Nerve Growth Factor (NGF) directly inside the central nervous system.
              </p>
              <p>
                This matters because NGF is the protein your brain depends on to maintain and repair neurons. And NGF declines with age — measurably, progressively — and that decline is associated in research with Alzheimer's disease, Parkinson's disease, and the slow-motion memory fade most people attribute simply to "getting older".
              </p>
              <div className="my-8 p-6 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85 }}>
                  <strong style={{ color: RG }}>Lion's Mane is the only widely consumed food that contains compounds proven to cross the blood-brain barrier and stimulate your brain's own NGF production.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Compound Classes */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Two Complementary Compound Classes
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COMPOUND_CLASSES.map((compound, i) => (
                <motion.div
                  key={compound.name}
                  initial={{ opacity: 0, x: i === 0 ? -12 : 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <h4 className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                    {compound.name}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>Source</span>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{compound.source}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>Function</span>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{compound.function}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(240,235,225,0.35)' }}>Property</span>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{compound.property}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Human Trials */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Human Clinical Evidence
            </motion.h3>
            <div className="space-y-4">
              {HUMAN_TRIALS.map((trial, i) => (
                <motion.div
                  key={trial.year}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1.5 rounded"
                      style={{ background: 'rgba(230,183,173,0.08)', color: RG }}>
                      {trial.year}
                    </span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{trial.study}</span>
                  </div>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.7 }}>
                    {trial.finding}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What It Feels Like */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              What Does Lion's Mane Coffee Actually Feel Like?
            </motion.h3>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                The cognitive effects of Lion's Mane are subtle on day one and cumulative over weeks — unlike caffeine, which is acutely noticeable. Most consistent users report:
              </p>
              <ul className="space-y-3 my-6">
                {BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              <p>
                The effects build. The Mori trial found progressive improvement over 16 weeks, with a washout when supplementation stopped. This isn't a one-cup miracle — it's a ritual.
              </p>
            </div>
          </section>

          {/* Lion's Mane + Chaga */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Why Lion's Mane + Chaga Is the Right Combination
            </motion.h3>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Torch Republic pairs Lion's Mane with Chaga for a precise reason: they work on entirely different biological systems and create a genuinely complementary stack.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                  <h4 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                    Lion's Mane
                  </h4>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>
                    Operates on the <strong>neurological system</strong> — NGF, BDNF, cognitive repair, and nerve regeneration.
                  </p>
                </div>
                <div className="p-6 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                  <h4 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                    Chaga
                  </h4>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>
                    Operates on the <strong>immune and cellular system</strong> — holds the highest ORAC antioxidant value ever recorded, with demonstrated anti-inflammatory, immunomodulatory, and cellular-protective effects.
                  </p>
                </div>
              </div>
              <p className="text-center text-lg" style={{ color: RG }}>
                Together: one mushroom rebuilds the brain; the other defends the body. One cup. One ritual. Both working simultaneously every morning.
              </p>
            </div>
          </section>

          {/* How to Make It */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              How to Make It (The Torch Republic Way)
            </motion.h3>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Our mushroom coffee blends are designed for zero friction. No coffee maker. No grinder. No equipment ritual.
              </p>
              <div className="flex flex-wrap gap-4 my-8 justify-center">
                {['Scoop', 'Pour', 'Stir', 'Begin'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase px-4 py-2 rounded"
                      style={{ background: 'rgba(230,183,173,0.08)', color: RG }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>{step}</span>
                    {i < 3 && <span style={{ color: 'rgba(240,235,225,0.2)' }}>→</span>}
                  </motion.div>
                ))}
              </div>
              <p>
                The flavor profile depends on the blend you choose. Our Dark Roast blends (Mooncap Restore, Midnight Watch) bring forward the bold, chocolatey depth of the Arabica base. Our Medium Roast options (Glowmind Clarity, Torchbearer) run smooth and slightly sweet, with the earthiness of the mushroom extracts complementing rather than competing with the coffee. None of our blends taste like "mushroom" in any culinary sense — the extract is neutral, and what you taste is premium coffee with an added depth.
              </p>
            </div>
          </section>

          {/* Who Should Drink */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Who Should Drink Mushroom Coffee?
            </motion.h3>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Lion's Mane mushroom coffee is particularly well-suited for:</p>
              <ul className="space-y-3 my-6">
                {[
                  'Anyone who wants to reduce caffeine intake without sacrificing the morning ritual',
                  'People experiencing mid-morning crashes or afternoon brain fog after regular coffee',
                  'Those interested in long-term cognitive health — especially anyone with a family history of memory decline',
                  'Anyone who finds regular coffee causes anxiety, jitters, or digestive discomfort',
                  'Entrepreneurs, creatives, and deep-focus workers who need sustained concentration, not a 45-minute spike',
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span style={{ color: RG }}>•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="p-5 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)' }}>
                  <strong style={{ color: RG }}>Note:</strong> People with known mushroom allergies, those on blood-thinning medications, and those with kidney disease should consult a physician before adding any mushroom supplement to their routine.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Line */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              The Bottom Line
            </motion.h3>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Lion's Mane isn't a trend. It's the only food known to actively stimulate your brain's own nerve repair mechanisms while you drink your morning coffee. The science spans three decades, multiple clinical trials, and a peer-reviewed mechanism that's understood to the molecular level.
              </p>
              <p>
                Whether you're protecting what you have, sharpening what's already sharp, or building a morning ritual with actual purpose behind it — this is where you start.
              </p>
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 px-6 rounded-lg"
            style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Explore the Collection
            </p>
            <h3 className="font-serif font-bold text-2xl mb-6" style={{ color: '#FFFFFF' }}>
              Torch Republic Mushroom Coffee
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Each blend is crafted around the Lion's Mane + Chaga combination, in instant format that's ready in seconds — no maker, no fuss, just the ritual.
            </p>
            <Link to="/mushroom-coffee"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Shop Mushroom Coffee →
            </Link>
          </motion.div>
        </div>
      </article>

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Scientific caveat: While the NGF mechanism is well-characterized, researchers note that many studies use whole mushroom preparations or isolated extracts in varying doses, making direct translation to commercial instant coffee formats complex. Larger, longer-duration trials are still needed. Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}