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

const P = ({ children, className = '' }) => (
  <p className={`font-heading mb-5 ${className}`}
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

export default function LionsManeMushroomCoffee() {
  useSEO({
    title: "Lion's Mane Mushroom Coffee: Benefits, Research & Brain Health Guide | Torch Republic",
    description: "Lion's Mane mushroom coffee stimulates Nerve Growth Factor (NGF) in the brain — backed by 30 years of clinical research. Learn the science, benefits, and how to start your cognitive coffee ritual.",
    url: '/journal/lions-mane-mushroom-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2026-06-01T08:00:00-05:00',
      dateModified: '2026-06-07T08:00:00-05:00',
      section: 'Ingredients',
      keywords: [
        "lion's mane mushroom coffee", "lion's mane coffee benefits", "mushroom coffee for focus",
        "NGF mushroom coffee", "functional mushroom coffee", "lion's mane brain health",
        "hericium erinaceus coffee", "nootropic coffee", "cognitive mushroom coffee",
        "lion's mane vs regular coffee", "best mushroom coffee", "lion's mane daily ritual",
      ],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'The Journal', url: '/Journal' },
      { name: "Lion's Mane Mushroom Coffee", url: '/journal/lions-mane-mushroom-coffee' },
    ],
    faq: [
      {
        question: "What is Lion's Mane mushroom coffee?",
        answer: "Lion's Mane mushroom coffee combines premium instant coffee with Lion's Mane (Hericium erinaceus) extract. Lion's Mane contains unique bioactive compounds — hericenones and erinacines — that cross the blood-brain barrier and stimulate Nerve Growth Factor (NGF) production in the brain. Torch Republic blends Lion's Mane with Chaga for a complete cognitive and immune support morning ritual.",
      },
      {
        question: "What does Lion's Mane coffee do for your brain?",
        answer: "Lion's Mane stimulates Nerve Growth Factor (NGF) and Brain-Derived Neurotrophic Factor (BDNF) — proteins the brain uses to maintain and repair neurons. Clinical trials show progressive improvements in cognitive scores over 16 weeks, including clearer thinking, sustained focus, improved memory formation, and reduced brain fog.",
      },
      {
        question: "How much caffeine is in Lion's Mane mushroom coffee?",
        answer: "Torch Republic mushroom coffee contains roughly half the caffeine of regular coffee — approximately 40–60 mg per serving versus ~95 mg in standard coffee. This lower caffeine content combined with Lion's Mane and Chaga adaptogens creates a smoother, jitter-free energy experience with fewer crashes.",
      },
      {
        question: "How long does it take for Lion's Mane coffee to work?",
        answer: "Lion's Mane effects are cumulative rather than immediate. The landmark Mori trial found progressive cognitive improvements over 16 weeks of daily supplementation, with effects declining after stopping — consistent with an NGF stimulus mechanism. Most users report noticeable clarity improvements within 2–4 weeks of consistent daily use.",
      },
      {
        question: "Is Lion's Mane mushroom coffee safe to drink every day?",
        answer: "Lion's Mane mushroom coffee is generally considered safe for healthy adults and has been consumed in traditional Asian medicine for over 2,000 years. People with mushroom allergies, those on blood-thinning medications, or individuals with kidney conditions should consult a physician before use.",
      },
    ],
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
                12 min read
              </span>
            </div>

            <h1 className="font-serif font-bold leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#FFFFFF', letterSpacing: '-0.025em' }}>
              Lion's Mane Mushroom Coffee: Benefits, Research, and Why Your Morning Ritual Just Leveled Up
            </h1>

            <p className="font-heading"
              style={{ fontSize: '1.1rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
              What if your morning cup did more than wake you up — what if it actively rebuilt your brain while you drank it?
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
          That's not marketing language. That's the science behind Lion's Mane mushroom coffee, and it's why this category has gone from health-food-store obscurity to a $300-million-per-year phenomenon in less than a decade. At Torch Republic, we built our mushroom coffee line around Lion's Mane for one reason: nothing else in the functional food world touches this compound's relationship with the human brain.
        </P>
        <P>Here's everything you need to know — the history, the science, the benefits, and how to make it part of your daily ritual.</P>

        <Section title="What Is Lion's Mane, Really?">
          <P>
            Lion's Mane (<em>Hericium erinaceus</em>) is a culinary and medicinal mushroom native to North America, Europe, and Asia. It's named for its distinctive appearance — long, cascading white tendrils that resemble a lion's mane. It has been used in traditional Asian medicine for over 2,000 years, valued for brain health, digestive function, and nerve regeneration long before Western science had the tools to understand why.
          </P>
          <P>
            What makes it genuinely unique — not just among mushrooms, but among all foods — is that it contains two classes of bioactive compounds found nowhere else in nature: hericenones (from the fruiting body) and erinacines (from the mycelium). These molecules do something remarkable: they stimulate the production of Nerve Growth Factor (NGF) directly inside the central nervous system.
          </P>
          <P>
            This matters because NGF is the protein your brain depends on to maintain and repair neurons. And NGF declines with age — measurably, progressively — and that decline is associated in research with Alzheimer's disease, Parkinson's disease, and the slow-motion memory fade most people attribute simply to "getting older."
          </P>
          <div className="my-8 p-6"
            style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.18)', borderRadius: '2px' }}>
            <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.15rem' }}>
              Lion's Mane is the only widely consumed food that contains compounds proven to cross the blood-brain barrier and stimulate your brain's own NGF production.
            </p>
          </div>
        </Section>

        <Section title="The Science (The Real Research, Not the Hype)">
          <P>Let's be specific — because this is where mushroom coffee separates into two camps: brands that make vague wellness claims, and the actual science.</P>

          <H3>The Blood-Brain Barrier Discovery (1990s)</H3>
          <P>
            Japanese researchers in the early 1990s isolated erinacines A, B, and C from Lion's Mane mycelium and found that these diterpenoid compounds strongly stimulated NGF synthesis in the astroglial cells surrounding neurons. Subsequent research confirmed that erinacines are lipophilic (fat-soluble) and small enough to cross the blood-brain barrier when consumed orally — meaning that drinking Lion's Mane in your morning coffee genuinely delivers these compounds to your brain tissue.
          </P>

          <H3>Memory Enhancement (University of Queensland, 2023)</H3>
          <P>
            Researchers from The University of Queensland published findings in the Journal of Neurochemistry identifying hericene A as a potent bioactive compound that enhanced memory through ERK1/2 signaling in hippocampal neurons — the precise brain region responsible for forming new memories. This was the first study to document a pro-BDNF (brain-derived neurotrophic factor) signal in Lion's Mane, providing a second neurological pathway beyond NGF.
          </P>

          <div className="my-8 space-y-3">
            <ResearchCard label="2009 Mori Trial — Foundational">
              Participants supplementing with Lion's Mane showed progressive cognitive score improvements over 16 weeks — and those scores declined again after discontinuation, consistent with a stimulus-driven NGF mechanism that reverses when removed.
            </ResearchCard>
            <ResearchCard label="2020 Li et al. — Frontiers in Aging Neuroscience">
              A double-blind, placebo-controlled study of 49 patients with mild Alzheimer's disease over 49 weeks. The Lion's Mane group showed significantly lower cognitive deterioration AND measurably higher plasma NGF levels — direct human evidence that Lion's Mane raises NGF in living human blood.
            </ResearchCard>
            <ResearchCard label="2023 RCT — Healthy Young Adults">
              A randomized controlled trial found that a single dose of Lion's Mane improved performance on the Stroop test (processing speed and selective attention) compared to placebo, with a 28-day trend toward reduced subjective stress.
            </ResearchCard>
            <ResearchCard label="2025 Systematic Review (26 Studies)">
              A systematic review covering 26 human and preclinical studies confirmed neuroprotective effects of Hericium erinaceus, identifying NGF stimulation alongside antioxidant, anti-inflammatory, and anti-tumor mechanisms.
            </ResearchCard>
          </div>
        </Section>

        <Section title="What Does Lion's Mane Coffee Actually Feel Like?">
          <P>The cognitive effects of Lion's Mane are subtle on day one and cumulative over weeks — unlike caffeine, which is acutely noticeable. Most consistent users report:</P>
          <Bullet items={[
            'Clearer, less foggy mornings — the sense that thoughts assemble more easily',
            'Sustained focus without the spike — because Lion\'s Mane coffee has roughly half the caffeine of regular coffee (~40–60 mg vs. ~95 mg), the energy experience is steadier',
            'Reduced mid-morning jitters — mushroom coffee\'s lower caffeine and higher adaptogen content significantly reduces cortisol-driven overstimulation',
            'Improved mood baseline — consistent with Lion\'s Mane\'s effect on serotonin and BDNF pathways',
          ]} />
          <P>
            The effects build. The Mori trial found progressive improvement over 16 weeks, with a washout when supplementation stopped. This isn't a one-cup miracle — it's a ritual.
          </P>
        </Section>

        <Section title="Why Lion's Mane + Chaga Is the Right Combination">
          <P>Torch Republic pairs Lion's Mane with Chaga for a precise reason: they work on entirely different biological systems and create a genuinely complementary stack.</P>
          <Bullet items={[
            'Lion\'s Mane operates on the neurological system — NGF, BDNF, cognitive repair, and nerve regeneration',
            'Chaga operates on the immune and cellular system — it holds the highest ORAC antioxidant value ever recorded for any natural food substance',
          ]} />
          <P>A 2004 study showed Chaga extract produced a 40%+ reduction in DNA fragmentation from oxidative stress in human cells.</P>
          <div className="my-6 p-5"
            style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '2px' }}>
            <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1rem' }}>Together: one mushroom rebuilds the brain; the other defends the body.</p>
            <p className="font-heading text-sm font-light" style={{ color: 'rgba(240,235,225,0.55)' }}>One cup. One ritual. Both working simultaneously every morning.</p>
          </div>
        </Section>

        <Section title="How to Make It (The Torch Republic Way)">
          <P>Our mushroom coffee blends are designed for zero friction. No coffee maker. No grinder. No equipment ritual.</P>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {[
              { step: '01', label: 'Scoop', desc: 'One scoop into your cup' },
              { step: '02', label: 'Pour', desc: '8–10 oz hot water or cold over ice' },
              { step: '03', label: 'Stir', desc: '10 seconds. Begin.' },
            ].map(s => (
              <div key={s.step} className="p-5 text-center"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)' }}>
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.4)' }}>{s.step}</p>
                <p className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.05rem' }}>{s.label}</p>
                <p className="font-heading text-xs font-light" style={{ color: 'rgba(240,235,225,0.45)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Who Should Drink Mushroom Coffee?">
          <P>Lion's Mane mushroom coffee is particularly well-suited for:</P>
          <Bullet items={[
            'Anyone who wants to reduce caffeine intake without sacrificing the morning ritual',
            'People experiencing mid-morning crashes or afternoon brain fog after regular coffee',
            'Those interested in long-term cognitive health — especially anyone with a family history of memory decline',
            'Anyone who finds regular coffee causes anxiety, jitters, or digestive discomfort',
            'Entrepreneurs, creatives, and deep-focus workers who need sustained concentration, not a 45-minute spike',
          ]} />
          <P style={{ fontSize: '0.88rem', color: 'rgba(240,235,225,0.35)' }}>
            Note: People with known mushroom allergies, those on blood-thinning medications, and those with kidney disease should consult a physician before adding any mushroom supplement to their routine.
          </P>
        </Section>

        <Section title="The Bottom Line">
          <P>
            Lion's Mane isn't a trend. It's the only food known to actively stimulate your brain's own nerve repair mechanisms while you drink your morning coffee. The science spans three decades, multiple clinical trials, and a peer-reviewed mechanism that's understood to the molecular level.
          </P>
          <P>
            Whether you're protecting what you have, sharpening what's already sharp, or building a morning ritual with actual purpose behind it — this is where you start.
          </P>
        </Section>

        {/* Product CTA */}
        <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Explore the collection
          </p>
          <p className="font-serif font-bold text-white mb-6" style={{ fontSize: '1.4rem' }}>
            Find Your Blend
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/blends/glowmind-clarity"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              GlowMind Clarity
            </Link>
            <Link to="/blends/mooncap-restore"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              Mooncap Restore
            </Link>
            <Link to="/blends/dreamcap"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              DreamCap
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