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
  <ul className="mb-5 space-y-2">
    {items.map((item, i) => (
      <li key={i} className="font-heading text-sm flex gap-3"
        style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
        <span style={{ color: RG, flexShrink: 0 }}>–</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const CompareTable = ({ rows, headers }) => (
  <div className="my-8 overflow-x-auto">
    <table className="w-full font-heading text-sm">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="font-mono text-[9px] tracking-[0.3em] uppercase text-left py-3 px-4"
              style={{ color: 'rgba(230,183,173,0.5)', borderBottom: '1px solid rgba(230,183,173,0.15)' }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="py-3 px-4 text-sm"
                style={{
                  color: j === 0 ? 'rgba(240,235,225,0.8)' : 'rgba(240,235,225,0.5)',
                  borderBottom: '1px solid rgba(230,183,173,0.06)',
                  fontWeight: j === 0 ? 500 : 300,
                }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function InstantCeremonialMatcha() {
  useSEO({
    title: 'Instant Ceremonial Matcha: History, Benefits, L-Theanine Science & Daily Ritual | Torch Republic',
    description: '800 years of tradition. Modern science. Instant preparation. Everything you need to know about ceremonial grade matcha, L-theanine, and the Torch Republic matcha collection.',
    url: '/journal/instant-ceremonial-matcha',
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
                Education
              </span>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
                June 2026
              </span>
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>
                13 min read
              </span>
            </div>

            <h1 className="font-serif font-bold leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#FFFFFF', letterSpacing: '-0.025em' }}>
              Instant Ceremonial Matcha: What It Is, Why It Matters, and How to Find Your Ritual
            </h1>

            <p className="font-heading"
              style={{ fontSize: '1.1rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
              In 12th-century Japan, matcha was the beverage of Zen monks and samurai nobility. Today, it's the fastest-growing beverage segment in the U.S. — and for good reason. Matcha is one of the most nutrient-dense, scientifically validated beverages ever documented.
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
          At Torch Republic, our matcha line — The Monk, The Ascendant, The Alchemist — is built on ceremonial-grade matcha combined with adaptogens for a modern ritual that honors 800 years of tradition. Here's everything you need to know about what makes ceremonial matcha different, what the science actually says, and how to make it work for your daily life.
        </P>

        <Section title="The History: 800 Years of Intentional Drinking">
          <P>
            Matcha's story begins in Tang Dynasty China (7th–10th century), where tea leaves were steamed and pressed into bricks for trade, then ground into powder for preparation. The pivotal historical moment came in 1191, when Japanese Buddhist monk Eisai returned from years of study in China, carrying both tea seeds and the Zen practice of consuming powdered green tea as a tool for meditation and mental clarity.
          </P>
          <P>
            Eisai planted his seeds on temple grounds in Kyoto — and Japanese tea culture was born. Within a century, matcha had become more than a beverage. It was a philosophical practice. The tea ceremony (chanoyu), formalized in the 16th century by master Sen no Rikyū, transformed the act of making tea into a meditation on harmony (wa), respect (kei), purity (sei), and tranquility (jaku).
          </P>
          <P>
            The deliberate, precise movements of the tea ceremony were designed to force the mind into presence. Every step — the careful scooping, the precise pouring, the rhythmic whisking — was engineered as a mindfulness practice. This is why matcha still feels different from coffee, and why the Torch Republic matcha line carries names like The Monk and The Alchemist: these are archetypes of the same intentional practice, modernized for today.
          </P>
          <div className="my-6 p-5"
            style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.12)', borderRadius: '2px' }}>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>Historical note</p>
            <p className="font-heading text-sm font-light" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.85 }}>
              Today, only approximately 60 families remain in Uji, Kyoto — the world's most revered matcha region — continuing this centuries-old tradition.
            </p>
          </div>
        </Section>

        <Section title="What Makes Ceremonial Grade Different">
          <P>The term "ceremonial grade" refers to the highest quality tier of matcha — made from the youngest, most tender leaves of the spring's first harvest (ichibancha), using a cultivation method that no other tea undergoes.</P>

          <H3>1. Shading (20–30 days before harvest)</H3>
          <P>
            Tea plants are covered with bamboo frames and cloth, blocking sunlight for three to four weeks before picking. This forces the plant into a stress response: without light, it produces more chlorophyll (creating the vivid emerald green) and dramatically increases L-theanine — the amino acid responsible for calm focus.
          </P>

          <H3>2. Hand-harvesting the first flush</H3>
          <P>
            Only the youngest, topmost leaves — unfurling tips that represent the most concentrated nutrition in the plant — are selected. Second and third harvest leaves, used for culinary-grade matcha, lack the sweetness and L-theanine richness of this first picking.
          </P>

          <H3>3. Steaming within hours</H3>
          <P>
            Leaves are steamed immediately after harvest to halt oxidation, preserving the green color, nutrient density, and delicate aroma.
          </P>

          <H3>4. Stone grinding (30 grams per hour)</H3>
          <P>
            The dried, de-stemmed tencha leaves are ground on traditional granite stone mills at a rate of 30–40 grams per hour. This glacial pace is deliberate: high-speed milling generates heat that degrades volatile flavor compounds and oxidizes chlorophyll. Stone grinding creates the ultra-fine particle size that allows ceremonial matcha to dissolve smoothly and deliver its full nutritional payload.
          </P>

          <CompareTable
            headers={['Feature', 'Ceremonial Grade', 'Culinary Grade']}
            rows={[
              ['Harvest', 'First flush, youngest leaves', 'Later harvests'],
              ['Shading', '20–30 days', 'Shorter or none'],
              ['Grinding', 'Traditional stone mill', 'High-speed ball/jet mill'],
              ['Color', 'Vivid emerald green', 'Yellow-green or dull'],
              ['Flavor', 'Smooth, sweet, umami', 'More bitter, robust'],
              ['L-theanine', 'Highest concentration', 'Lower'],
              ['Intended use', 'Drinking directly', 'Lattes, baking, smoothies'],
            ]}
          />
        </Section>

        <Section title="L-Theanine: The Magic Compound">
          <P>
            L-theanine is the compound that makes matcha physiologically unlike any other caffeinated beverage. It's a non-protein amino acid found almost exclusively in shade-grown green tea — and ceremonial matcha, due to its extended shading, contains the highest concentration of L-theanine in any natural food.
          </P>

          <P>What L-theanine actually does in the brain:</P>
          <Bullet items={[
            'Crosses the blood-brain barrier and influences neurotransmitter activity directly',
            'Promotes the production of GABA, serotonin, and dopamine — neurotransmitters of calm, focus, and wellbeing',
            'Stimulates alpha brain waves — the brain state associated with wakeful relaxation, meditation, flow states, and creative work',
            'Slows and moderates the absorption of caffeine, extending the energy window from coffee\'s typical 1–1.5 hours to a 3–6 hour sustained release',
          ]} />

          <div className="my-8 p-6"
            style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.18)', borderRadius: '2px' }}>
            <p className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>
              The result: "calm focus" — alertness without the cortisol spike, jitters, or crash characteristic of high-caffeine beverages.
            </p>
            <p className="font-heading text-sm font-light mt-3" style={{ color: 'rgba(240,235,225,0.5)' }}>
              One gram of matcha contains 6–20 mg of L-theanine. A standard 1.5–2g serving delivers 15–40 mg per cup. Ceremonial grade consistently reaches the higher end.
            </p>
          </div>
        </Section>

        <Section title="The Antioxidant Argument">
          <P>
            Matcha's antioxidant profile is genuinely exceptional. ORAC testing shows one gram of ceremonial matcha contains 1,384 ORAC units — approximately <strong style={{ color: '#F5EFE6' }}>15 times the antioxidants in one gram of wild blueberries</strong>.
          </P>
          <P>
            Unlike steeped green tea, where you brew and discard the leaf (absorbing only water-soluble nutrients), matcha powder is consumed whole — meaning every cup delivers the full spectrum of the leaf's compounds: water-soluble and fat-soluble nutrients, antioxidants, amino acids, vitamins, and minerals.
          </P>
          <P>
            The primary antioxidant class is catechins, particularly EGCG (epigallocatechin gallate) — one of the most studied antioxidant compounds in nutritional science, with documented effects on inflammation, cardiovascular health, metabolic function, and potentially cancer cell apoptosis.
          </P>
          <div className="my-6 p-5"
            style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '2px' }}>
            <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>2022 PMC Critical Review</p>
            <p className="font-heading text-sm font-light" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.85 }}>
              A critical review published in PMC on the therapeutic potential of matcha concluded it has documented benefits including "enhancing effect on cognitive function, cardio-metabolic health, and anti-tumorogenesis."
            </p>
          </div>
        </Section>

        <Section title="Matcha vs. Coffee: The Honest Comparison">
          <P>Matcha is not a replacement for coffee. It's a different experience for a different intention.</P>
          <CompareTable
            headers={['Feature', 'Coffee', 'Matcha']}
            rows={[
              ['Caffeine per serving', '~95 mg', '~35–90 mg depending on prep'],
              ['Energy feel', 'Fast, intense spike', 'Slow-release, smooth 3–6 hours'],
              ['Crash risk', 'Higher', 'Lower'],
              ['L-theanine', 'None', '15–40 mg per cup'],
              ['Primary antioxidants', 'Chlorogenic acids', 'EGCG catechins, chlorophyll'],
              ['Cortisol impact', 'Can spike cortisol', 'Less cortisol response'],
              ['Acidity', 'High', 'Low-moderate'],
              ['Focus type', 'Sharp, fast (can include jitters)', 'Calm, sustained clarity'],
            ]}
          />
          <Bullet items={[
            'Choose coffee when: You need immediate, high-intensity alertness before a demanding workout or intense deadline sprint.',
            'Choose matcha when: You need sustained, calm focus over 4–6 hours — for creative work, deep writing, study sessions, or meditation.',
            'Choose Torch Republic Matcha when: You want the calm-focus benefits of ceremonial L-theanine and the adaptogenic support of functional mushrooms.',
          ]} />
        </Section>

        <Section title="Instant Matcha: Does It Work?">
          <P>
            One legitimate question: does instant matcha preserve the benefits of traditional ceremonial preparation? The answer depends on the source material and processing.
          </P>
          <P>
            Torch Republic's instant matcha starts with ceremonial-grade tencha leaves, processed to a fine powder and packaged in airtight conditions to prevent oxidation. The L-theanine, EGCG catechins, and chlorophyll are inherent in the leaf structure — they don't require whisking to become bioavailable. You dissolve them in water exactly as you would with a traditional preparation; the delivery mechanism is different, not the nutritional payload.
          </P>
          <P>
            The practical advantage of instant format: no whisk, no bowl, no equipment. One scoop, 8–10 oz of water, 10 seconds of stirring. A 3–6 hour calm focus window, ready in the time it takes to walk from the kitchen to your desk.
          </P>
        </Section>

        <Section title="Finding Your Torch Republic Matcha Ritual">
          <P>Each of the three Torch Republic matcha blends is calibrated for a specific daily intention:</P>
          <div className="space-y-4 my-6">
            {[
              {
                name: 'The Monk',
                sub: 'Dark Roast Matcha Blend',
                desc: 'Deep, grounding, present. For the person who wants to begin the day in stillness — the meditative focus of the original Zen tea ceremony, modernized.',
                tags: ['Focus', 'Calm', 'Presence'],
                slug: '/blends/the-monk',
              },
              {
                name: 'The Ascendant',
                sub: 'Medium Roast Matcha Blend',
                desc: 'Rising, clarifying, disciplined. For the ambitious morning — when you\'re building something and need the mental clarity to see the next step.',
                tags: ['Energy', 'Clarity', 'Discipline'],
                slug: '/blends/the-ascendant',
              },
              {
                name: 'The Alchemist',
                sub: 'Light Roast Matcha Blend',
                desc: 'Balanced, transformative, creative. For the person who sits at the intersection of art and intellect — where the best ideas live.',
                tags: ['Balance', 'Transform', 'Create'],
                slug: '/blends/the-alchemist',
              },
            ].map(b => (
              <div key={b.name} className="p-6"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '2px' }}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-serif font-bold text-white" style={{ fontSize: '1.1rem' }}>{b.name}</p>
                    <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>{b.sub}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {b.tags.map(t => (
                      <span key={t} className="font-mono text-[8px] tracking-[0.25em] uppercase px-2 py-1"
                        style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.15)', color: 'rgba(230,183,173,0.6)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="font-heading text-sm font-light mb-4" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.8 }}>{b.desc}</p>
                <Link to={b.slug}
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.25em] uppercase transition-opacity hover:opacity-60"
                  style={{ color: RG }}>
                  Explore {b.name} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
          <P>The ritual is yours. The history, the science, the flavor — all of it ready in seconds.</P>
        </Section>

        {/* Product CTA */}
        <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>
            Start your matcha ritual
          </p>
          <p className="font-serif font-bold text-white mb-6" style={{ fontSize: '1.4rem' }}>
            Explore the Torch Republic Matcha Collection
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-6 transition-opacity hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Shop Matcha Collection <ArrowRight className="w-3 h-3" />
            </Link>
            <Link to="/journal"
              className="font-mono text-[10px] tracking-[0.25em] uppercase py-3 px-5 transition-opacity hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: RG }}>
              Read More Guides
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
          <p className="font-mono text-[8px] tracking-[0.15em] leading-relaxed" style={{ color: 'rgba(255,255,255,0.18)' }}>
            * These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Research citations reflect findings in scientific literature; individual results may vary.
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