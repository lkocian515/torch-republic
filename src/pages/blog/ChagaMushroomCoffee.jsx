import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6B7AD';

const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="font-serif font-bold mb-5"
      style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)', color: '#FFFFFF', letterSpacing: '-0.01em' }}>
      {title}
    </h2>
    {children}
  </section>
);

const P = ({ children }) => (
  <p className="font-heading mb-5"
    style={{ fontSize: '1.02rem', color: 'rgba(240,235,225,0.72)', lineHeight: 1.9, fontWeight: 300 }}>
    {children}
  </p>
);

const H3 = ({ children }) => (
  <h3 className="font-serif font-bold mb-3 mt-7"
    style={{ fontSize: '1.15rem', color: '#F5EFE6' }}>
    {children}
  </h3>
);

const Bullet = ({ items }) => (
  <ul className="mb-5 space-y-2" style={{ paddingLeft: '1.25rem' }}>
    {items.map((item, i) => (
      <li key={i} className="font-heading text-sm"
        style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85, fontWeight: 300, listStyleType: 'none', paddingLeft: '1rem', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 0, color: RG }}>–</span>
        {item}
      </li>
    ))}
  </ul>
);

const ResearchCard = ({ label, children }) => (
  <div className="mb-4 p-5"
    style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.12)', borderRadius: '2px' }}>
    <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>{label}</p>
    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
      {children}
    </p>
  </div>
);

const OracRow = ({ item, value, width }) => (
  <div className="flex items-center gap-4 py-3" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
    <div className="w-36 font-heading text-sm font-light" style={{ color: 'rgba(240,235,225,0.55)', flexShrink: 0 }}>{item}</div>
    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
      <div className="h-full rounded-full transition-all" style={{ width, background: RG, opacity: 0.7 }} />
    </div>
    <div className="font-mono text-[10px] tracking-wider w-28 text-right" style={{ color: RG, flexShrink: 0 }}>{value}</div>
  </div>
);

export default function ChagaMushroomCoffee() {
  useSEO({
    title: "What Is Chaga Mushroom? The World's Most Powerful Antioxidant in Your Morning Coffee | Torch Republic",
    description: "Chaga mushroom holds the highest ORAC antioxidant value ever recorded. Learn the science, history, benefits, and why Torch Republic adds it to every mushroom coffee blend.",
    url: '/journal/chaga-mushroom-coffee',
    type: 'article',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-[780px] mx-auto px-6 md:px-10 pt-16 pb-14">
          <Link to="/journal"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase mb-10 transition-opacity hover:opacity-60"
            style={{ color: 'rgba(230,183,173,0.5)' }}>
            <ArrowLeft className="w-3 h-3" /> The Journal
          </Link>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[9px] tracking-[0.4em] uppercase px-2.5 py-1"
                style={{ color: RG, border: '1px solid rgba(230,183,173,0.2)', background: 'rgba(230,183,173,0.04)' }}>
                Ingredients
              </span>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
                June 2026
              </span>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
                11 min read
              </span>
            </div>

            <h1 className="font-serif font-bold leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#FFFFFF', letterSpacing: '-0.025em' }}>
              What Is Chaga Mushroom? The World's Most Powerful Antioxidant — In Your Morning Coffee
            </h1>

            <p className="font-heading"
              style={{ fontSize: '1.1rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
              Hidden on birch trees across Siberia and northern Canada, growing for decades in some of the harshest conditions on Earth, Chaga mushroom has been called the "King of Mushrooms" by traditional healers for centuries. Modern science is beginning to understand why.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-[780px] mx-auto px-6 md:px-10 py-16"
      >
        <P>
          At Torch Republic, Chaga is half of the formulation in every mushroom coffee blend we make. Not because it's trendy — it's been used medicinally since the 16th century. Because the antioxidant data, the immune research, and the historical record all point to the same conclusion: this fungus is extraordinary.
        </P>

        <Section title="What Is Chaga?">
          <P>
            Chaga (<em>Inonotus obliquus</em>) is a parasitic fungus that grows primarily on birch trees in cold northern climates — Siberia, Russia, northern Canada, Scandinavia, and Alaska. It presents not as a typical mushroom cap but as a dark, hard, charcoal-black mass on the outside of the birch tree, with a golden-orange interior. It looks less like a mushroom and more like a piece of charred wood — which is partly how it earned the name "cinder conk."
          </P>
          <P>
            Chaga grows slowly, spending decades absorbing compounds from the birch tree it inhabits. This extended growth cycle is one reason for its extraordinary concentration of bioactive compounds — it has more time to accumulate them than almost any other fungus.
          </P>
          <P>
            Traditional use spans Siberian shamanic practices, Russian folk medicine (where it was used to treat cancer, stomach disease, and heart conditions), and Northern European herbalism. It was typically consumed as a brewed tea — because raw Chaga is far too bitter to eat directly.
          </P>
        </Section>

        <Section title="The ORAC Value: What It Means and Why It Matters">
          <P>
            ORAC stands for Oxygen Radical Absorbance Capacity — a measure of how effectively a substance neutralizes free radicals, the unstable molecules that cause cellular damage, inflammation, and accelerated aging. The higher the ORAC value, the more antioxidant power.
          </P>

          <div className="my-8 p-6"
            style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.18)', borderRadius: '2px' }}>
            <p className="font-serif font-bold text-white" style={{ fontSize: '1.15rem' }}>
              Chaga mushroom holds the highest ORAC value ever recorded for any natural food substance.
            </p>
          </div>

          <div className="my-8">
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
              ORAC units per 100g — antioxidant comparison
            </p>
            <OracRow item="Wild Blueberries" value="~9,600 units" width="6.5%" />
            <OracRow item="Dark Chocolate" value="~20,000 units" width="13.6%" />
            <OracRow item="Pomegranate" value="~10,500 units" width="7.2%" />
            <OracRow item="Chaga Mushroom" value="146,700+ units" width="100%" />
          </div>

          <P>
            That's not a rounding difference. That's an order of magnitude. A landmark 2004 study in <em>Biofactors</em> demonstrated this directly: human lymphocytes pretreated with Chaga extract showed over a 40% reduction in DNA fragmentation when exposed to oxidative stress — cellular-level evidence of Chaga's protective capacity.
          </P>
        </Section>

        <Section title="Key Bioactive Compounds">
          <P>Chaga's complexity is part of what makes it remarkable. Its effects come from multiple compound classes working simultaneously:</P>
          <Bullet items={[
            'Beta-glucans and polysaccharides — stimulate and regulate immune function; the primary immunomodulatory compounds',
            'Melanin — the pigment giving Chaga its dark exterior; a powerful antioxidant that protects DNA from oxidative damage',
            'Betulinic acid — derived from the birch tree host; demonstrated anti-tumor activity in preclinical studies',
            'Inotodiol — a triterpenoid with anti-tumor activity against cervical cancer cells in vitro',
            'Ergosterol — shown to inhibit colorectal cancer via downregulation of the beta-catenin pathway',
            'Phenolic acids (gallic, protocatechuic, p-hydroxybenzoic) — antioxidant and anti-inflammatory',
          ]} />
          <P>
            This isn't a simple, single-compound supplement. Chaga is a complex food matrix where dozens of compounds interact to produce effects that no single extract could replicate alone.
          </P>
        </Section>

        <Section title="What the Research Says">
          <P>
            Memorial Sloan Kettering Cancer Center — one of the world's leading cancer research institutions — maintains a comprehensive review of Chaga in its integrative medicine database. Their documented preclinical evidence includes:
          </P>

          <div className="my-8 space-y-3">
            <ResearchCard label="Antitumor Activity">
              Inhibitory and pro-apoptotic effects demonstrated against colon, lung, liver, and cervical cancer cells in vitro. Aqueous Chaga extract induced selective apoptosis in tumor cells without impacting healthy cells.
            </ResearchCard>
            <ResearchCard label="Immune Modulation">
              Chaga regulates Th1/Th2 cytokine balance and stimulates antigen-specific antibody production — two fundamental immune mechanisms.
            </ResearchCard>
            <ResearchCard label="Anti-Inflammation">
              Suppression of TNF-alpha, iNOS, and IL-1beta in animal models of colitis. These are the same inflammatory markers elevated in many chronic diseases.
            </ResearchCard>
            <ResearchCard label="Anti-Fatigue">
              Polysaccharides from Chaga increased exercise endurance and glycogen content in liver and muscle tissue in animal models, while decreasing lactic acid and urea nitrogen — markers of physical fatigue.
            </ResearchCard>
            <ResearchCard label="Cognitive Support">
              A methanolic Chaga extract improved learning and memory via decreased malondialdehyde, decreased acetylcholinesterase activity, and restored glutathione — multiple oxidative stress pathways simultaneously.
            </ResearchCard>
          </div>

          <P>
            A 2023 peer-reviewed review in PubMed concluded that Chaga is a "super-fungus with countless facets" and "a promising natural resource with a wide range of potential applications" across pharmaceuticals, food, and cosmetics.
          </P>
        </Section>

        <Section title="Chaga in Your Morning Coffee: What Changes">
          <P>When you replace your regular morning coffee with a Chaga-infused blend, here's what your body receives that it didn't before:</P>
          <Bullet items={[
            'Antioxidant reinforcement from the world\'s most potent natural antioxidant source — fighting free radical damage at a cellular level with every cup',
            'Immune system activation from beta-glucans that signal your immune cells without overstimulating them',
            'Anti-inflammatory compounds working systemically, potentially reducing the chronic low-grade inflammation that underlies fatigue and brain fog',
            'Prebiotic fiber that supports gut microbiome diversity — mushroom polysaccharides feed beneficial bacteria',
            'Reduced caffeine exposure — roughly half the caffeine of regular coffee, supporting better cortisol regulation across the day',
          ]} />
        </Section>

        <Section title="A Note on Quality and Safety">
          <H3>Quality</H3>
          <P>
            Chaga's bioactive compound concentration varies dramatically based on where and how it was grown. Wild-harvested Siberian Chaga from mature birch trees is considered the gold standard. Farmed Chaga, grown on artificial substrates, lacks many of the birch-derived compounds (like betulinic acid) that contribute to Chaga's therapeutic profile.
          </P>
          <H3>Safety</H3>
          <P>
            Chaga is generally well-tolerated at standard serving sizes. However, it contains oxalates, and rare cases of kidney damage have been reported in individuals consuming very large doses (4–5 teaspoons of concentrated powder daily for months). At the standard serving size in mushroom coffee blends, this is not a documented concern. Individuals with kidney conditions or those taking blood-thinning medications should consult a physician before use.
          </P>
          <P>
            The bottom line: Chaga has been consumed as a dietary tea for centuries in Russia and Scandinavia without widespread adverse events. At reasonable serving sizes, the evidence supports it as safe and beneficial for most healthy adults.
          </P>
        </Section>

        <Section title="Chaga + Lion's Mane: The Torch Republic Philosophy">
          <P>
            Every Torch Republic mushroom coffee blend combines Chaga and Lion's Mane for a precise reason: they operate on entirely different systems and create a stack that's more complete than either alone.
          </P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {[
              { name: "Lion's Mane", role: 'Brain', desc: 'NGF synthesis, neuronal protection, cognitive sharpness. Sharpens the instrument.' },
              { name: 'Chaga', role: 'Body', desc: 'Antioxidant defense, immune modulation, cellular protection. Protects the instrument.' },
            ].map(m => (
              <div key={m.name} className="p-5"
                style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.12)', borderRadius: '2px' }}>
                <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(230,183,173,0.5)' }}>{m.role}</p>
                <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.05rem' }}>{m.name}</p>
                <p className="font-heading text-sm font-light" style={{ color: 'rgba(240,235,225,0.55)' }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <P>This is what a purposeful blend means.</P>
        </Section>

        {/* Product CTA */}
        <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Experience it daily
          </p>
          <p className="font-serif font-bold text-white mb-6" style={{ fontSize: '1.4rem' }}>
            Ready to add Chaga to your ritual?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/blends/mooncap-restore"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              Mooncap Restore
            </Link>
            <Link to="/blends/suncap-rise"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              SunCap Rise
            </Link>
            <Link to="/shop"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Shop All Blends <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <p className="font-mono text-[8px] tracking-[0.15em] leading-relaxed" style={{ color: 'rgba(255,255,255,0.18)' }}>
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Research citations reflect findings in scientific literature; individual results may vary. Consult a physician before use if you are pregnant, nursing, or managing a medical condition.
          </p>
        </div>

        {/* Back */}
        <div className="mt-10">
          <Link to="/journal"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
            style={{ color: 'rgba(230,183,173,0.4)' }}>
            <ArrowLeft className="w-3 h-3" /> Back to Journal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}