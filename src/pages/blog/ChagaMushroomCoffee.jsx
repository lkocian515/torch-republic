import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Shield, Zap, Droplet, TrendingUp, AlertCircle } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';

const ORAC_COMPARISON = [
  { name: 'Wild Blueberries', value: 9600, unit: 'ORAC units per 100g' },
  { name: 'Dark Chocolate', value: 20000, unit: 'ORAC units per 100g' },
  { name: 'Chaga Mushroom', value: 146700, unit: 'ORAC units per 100g', highlight: true },
];

const BIOACTIVE_COMPOUNDS = [
  {
    name: 'Beta-glucans & Polysaccharides',
    function: 'Stimulate and regulate immune function; primary immunomodulatory compounds',
  },
  {
    name: 'Melanin',
    function: 'Pigment giving Chaga its dark exterior; powerful antioxidant that protects DNA from oxidative damage',
  },
  {
    name: 'Betulinic Acid',
    function: 'Derived from birch tree host; demonstrated anti-tumor activity in preclinical studies',
  },
  {
    name: 'Inotodiol',
    function: 'Triterpenoid with anti-tumor activity against cervical cancer cells in vitro',
  },
  {
    name: 'Ergosterol',
    function: 'Shown to inhibit colorectal cancer via downregulation of beta-catenin pathway',
  },
  {
    name: 'Phenolic Acids',
    function: 'Gallic, protocatechuic, p-hydroxybenzoic,  antioxidant and anti-inflammatory',
  },
];

const RESEARCH_FINDINGS = [
  {
    category: 'Antitumor Activity',
    finding: 'Inhibitory and pro-apoptotic effects demonstrated against colon, lung, liver, and cervical cancer cells in vitro. Aqueous Chaga extract induced selective apoptosis in tumor cells without impacting healthy cells.',
  },
  {
    category: 'Immune Modulation',
    finding: 'Regulates Th1/Th2 cytokine balance and stimulates antigen-specific antibody production,  two fundamental immune mechanisms.',
  },
  {
    category: 'Anti-Inflammation',
    finding: 'Suppression of TNF-alpha, iNOS, and IL-1beta in animal models of colitis. These are the same inflammatory markers elevated in many chronic diseases.',
  },
  {
    category: 'Anti-Fatigue',
    finding: 'Polysaccharides increased exercise endurance and glycogen content in liver and muscle tissue, while decreasing lactic acid and urea nitrogen,  markers of physical fatigue.',
  },
  {
    category: 'Cognitive Support',
    finding: 'Methanolic Chaga extract improved learning and memory via decreased malondialdehyde and nitrite levels, decreased acetylcholinesterase activity, and restored glutathione.',
  },
];

const WHAT_CHANGES = [
  {
    icon: Shield,
    title: 'Antioxidant Reinforcement',
    text: 'From the world\'s most potent natural antioxidant source,  fighting free radical damage at cellular level with every cup',
  },
  {
    icon: Zap,
    title: 'Immune Activation',
    text: 'Beta-glucans signal immune cells without overstimulating,  supporting resilience without inducing inflammation',
  },
  {
    icon: Droplet,
    title: 'Systemic Anti-Inflammatory',
    text: 'Compounds working systemically, potentially reducing chronic low-grade inflammation underlying fatigue and brain fog',
  },
  {
    icon: TrendingUp,
    title: 'Prebiotic Fiber',
    text: 'Mushroom polysaccharides feed beneficial bacteria,  supporting gut-brain axis, one of neuroscience\'s most active research areas',
  },
];

export default function ChagaMushroomCoffee() {
  useSEO({
    title: 'What Is Chaga Mushroom? The World\'s Most Powerful Antioxidant in Your Morning Coffee | Torch Republic',
    description: 'Chaga mushroom holds the highest ORAC antioxidant value ever recorded. Learn the science, history, benefits, and why Torch Republic adds it to every mushroom coffee blend.',
    url: '/journal/chaga-mushroom-coffee',
    type: 'article',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            The King of Mushrooms
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            What Is Chaga Mushroom?
          </h1>
          <p className="font-heading max-w-3xl mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Hidden on birch trees across Siberia and northern Canada, growing for decades in some of the harshest conditions on Earth, Chaga has been called the "King of Mushrooms" by traditional healers for centuries. Modern science is beginning to understand why.
          </p>
        </motion.div>
      </section>

      <article className="max-w-[900px] mx-auto px-6 md:px-10 py-16">
        {/* What Is Chaga */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            What Is Chaga?
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              Chaga (<em>Inonotus obliquus</em>) is a parasitic fungus that grows primarily on birch trees (<em>Betula</em> species) in cold northern climates,  Siberia, Russia, northern Canada, Scandinavia, and Alaska. It presents not as a typical mushroom cap but as a dark, hard, charcoal-black mass on the outside of the birch tree, with a golden-orange interior. It looks less like a mushroom and more like a piece of charred wood,  which is partly how it earned the name "cinder conk".
            </p>
            <p>
              Chaga grows slowly, spending decades absorbing compounds from the birch tree it inhabits. This extended growth cycle is one reason for its extraordinary concentration of bioactive compounds,  it has more time to accumulate them than almost any other fungus.
            </p>
            <p>
              Traditional use spans Siberian shamanic practices, Russian folk medicine (where it was used to treat cancer, stomach disease, and heart conditions), and Northern European herbalism. It was typically consumed as a brewed tea,  boiled or steeped in water,  because raw Chaga is far too bitter to eat directly.
            </p>
          </div>
        </section>

        {/* ORAC Value */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            The ORAC Value: What It Means and Why It Matters
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              ORAC stands for Oxygen Radical Absorbance Capacity,  a measure of how effectively a substance neutralizes free radicals, the unstable molecules that cause cellular damage, inflammation, and accelerated aging. The higher the ORAC value, the more antioxidant power.
            </p>
            <p className="font-bold" style={{ color: RG }}>
              Chaga mushroom holds the highest ORAC value ever recorded for any natural food substance.
            </p>
            <p>That's not a rounding difference. That's an order of magnitude. Chaga's antioxidant power dwarfs every commonly celebrated antioxidant food.</p>

            {/* ORAC Comparison Table */}
            <div className="my-8 p-6 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
              <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-4" style={{ color: RG }}>
                ORAC Comparison (per 100g)
              </h3>
              <div className="space-y-4">
                {ORAC_COMPARISON.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-heading" style={{ color: item.highlight ? RG : 'rgba(240,235,225,0.65)' }}>
                      {item.highlight && <span style={{ color: RG }}>✦ </span>}
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: item.highlight ? RG : 'rgba(240,235,225,0.45)' }}>
                      {item.value.toLocaleString()} {item.unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <p>
              A landmark 2004 study in <em>Biofactors</em> demonstrated this directly: human lymphocytes (immune cells) pretreated with Chaga extract showed over a 40% reduction in DNA fragmentation when exposed to hydrogen peroxide-induced oxidative stress. This is cellular-level evidence of Chaga's protective capacity,  guarding your DNA against the damage that accumulates with every stressor your body experiences.
            </p>
          </div>
        </section>

        {/* Bioactive Compounds */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            Key Bioactive Compounds
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              Chaga's complexity is part of what makes it so remarkable. Its therapeutic effects come from multiple compound classes working simultaneously:
            </p>
            <ul className="space-y-3 my-6">
              {BIOACTIVE_COMPOUNDS.map((compound, i) => (
                <motion.li
                  key={compound.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span style={{ color: RG }}>•</span>
                  <div>
                    <strong style={{ color: RG }}>{compound.name}</strong>,  {compound.function}
                  </div>
                </motion.li>
              ))}
            </ul>
            <p>
              This isn't a simple, single-compound supplement. Chaga is a complex food matrix where dozens of compounds interact to produce effects that no single extract could replicate alone.
            </p>
          </div>
        </section>

        {/* Research Findings */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            What the Research Says
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              Memorial Sloan Kettering Cancer Center,  one of the world's leading cancer research institutions,  maintains a comprehensive review of Chaga in its integrative medicine database. Their documented preclinical evidence includes:
            </p>

            <div className="space-y-4 my-8">
              {RESEARCH_FINDINGS.map((finding, i) => (
                <motion.div
                  key={finding.category}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-lg"
                  style={{ background: 'rgba(230,183,173,0.04)', border: `1px solid ${RG}20` }}
                >
                  <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: RG }}>
                    {finding.category}
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>{finding.finding}</p>
                </motion.div>
              ))}
            </div>

            <p>
              A 2023 peer-reviewed review in PubMed concluded that Chaga is a "super-fungus with countless facets" and called it "a promising natural resource with a wide range of potential applications" across pharmaceuticals, food, and cosmetics.
            </p>
          </div>
        </section>

        {/* What Changes */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            Chaga in Your Morning Coffee: What Changes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            {WHAT_CHANGES.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-lg"
                  style={{ background: 'rgba(230,183,173,0.04)', border: `1px solid ${RG}20` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)' }}>
                      <Icon className="w-4 h-4" style={{ color: RG }} />
                    </div>
                    <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: RG }}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              When you replace your regular morning coffee with a Chaga-infused blend, here's what your body receives that it didn't before: antioxidant reinforcement, immune system activation, anti-inflammatory compounds working systemically, prebiotic fiber for gut health, and reduced caffeine exposure for better cortisol regulation.
            </p>
          </div>
        </section>

        {/* Quality and Safety */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            A Note on Quality and Safety
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              Not all Chaga products are equal, and a few safety considerations deserve honest acknowledgment.
            </p>

            <div className="my-6 space-y-4">
              <div>
                <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: RG }}>
                  Quality
                </h3>
                <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
                  Chaga's bioactive compound concentration varies dramatically based on where and how it was grown, and the extraction method used. Wild-harvested Siberian Chaga from mature birch trees is considered the gold standard. Farmed Chaga, grown on artificial substrates, lacks many of the birch-derived compounds (like betulinic acid) that contribute to Chaga's therapeutic profile.
                </p>
              </div>

              <div className="p-5 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: RG }} />
                  <div>
                    <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: RG }}>
                      Safety
                    </h3>
                    <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
                      Chaga is generally well-tolerated at standard serving sizes. However, it contains oxalates, and rare cases of kidney damage have been reported in individuals consuming very large doses (4–5 teaspoons of concentrated powder daily for months). At the standard serving size in mushroom coffee blends, this is not a documented concern. Individuals with kidney conditions, or those taking blood-thinning medications, should consult a physician before use, as Chaga may have synergistic antiplatelet effects.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                The bottom line on safety: Chaga has been consumed as a dietary tea for centuries in Russia and Scandinavia without widespread adverse events. At reasonable serving sizes, the evidence supports it as safe and beneficial for most healthy adults.
              </p>
            </div>
          </div>
        </section>

        {/* Torch Republic Philosophy */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6"
            style={{ color: '#FFFFFF' }}
          >
            Chaga + Lion's Mane: The Torch Republic Philosophy
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
            <p>
              Every Torch Republic mushroom coffee blend combines Chaga and Lion's Mane for a precise reason: they operate on entirely different systems and create a stack that's more complete than either alone.
            </p>
            <p className="font-bold" style={{ color: RG }}>
              Lion's Mane works on the brain,  NGF synthesis, neuronal protection, cognitive sharpness. Chaga works on the body,  antioxidant defense, immune modulation, cellular protection. One sharpens the instrument. The other protects it.
            </p>
            <p>
              This is what a purposeful blend means.
            </p>
          </div>
        </section>

        {/* Share */}
        <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <ShareButtons title="What Is Chaga Mushroom? The World's Most Powerful Antioxidant in Your Morning Coffee" url="/journal/chaga-mushroom-coffee" />
        </div>

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
            Crafted with Lion's Mane + Chaga, instant format, no equipment needed.
          </p>
          <Link to="/mushroom-coffee"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
            style={{ background: RG, color: '#080808' }}>
            Shop Mushroom Coffee →
          </Link>
        </motion.div>
      </article>

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Individuals with kidney conditions or on blood-thinning medications should consult a physician before use.
        </p>
      </div>
    </div>
  );
}