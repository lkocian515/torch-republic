import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Clock, Leaf, Zap, Brain, Droplet, Award } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';
const MATCHA_GREEN = '#10B981';

const HISTORY_MILESTONES = [
  { year: '7th–10th Century', event: 'Tang Dynasty China — tea leaves steamed and pressed into bricks' },
  { year: '1191', event: 'Japanese monk Eisai returns from China with tea seeds and Zen practice' },
  { year: '16th Century', event: 'Canopy shading begins; tea ceremony (chanoyu) formalized by Sen no Rikyū' },
  { year: 'Today', event: 'Only ~60 families remain in Uji, Kyoto practicing traditional craft' },
];

const GRADE_COMPARISON = [
  { feature: 'Harvest', ceremonial: 'First flush, youngest leaves', culinary: 'Later harvests' },
  { feature: 'Shading', ceremonial: '20–30 days', culinary: 'Shorter or none' },
  { feature: 'Grinding', ceremonial: 'Traditional stone mill (30g/hour)', culinary: 'High-speed ball/jet mill' },
  { feature: 'Color', ceremonial: 'Vivid emerald green', culinary: 'Yellow-green or dull' },
  { feature: 'Flavor', ceremonial: 'Smooth, sweet, umami', culinary: 'More bitter, robust' },
  { feature: 'L-theanine', ceremonial: 'Highest concentration', culinary: 'Lower' },
  { feature: 'Intended use', ceremonial: 'Drinking directly', culinary: 'Lattes, baking, smoothies' },
];

const L_THEANINE_BENEFITS = [
  'Crosses blood-brain barrier, influences neurotransmitter activity directly',
  'Promotes production of GABA, serotonin, and dopamine — neurotransmitters of calm, focus, and wellbeing',
  'Stimulates alpha brain waves — the brain state associated with wakeful relaxation, meditation, flow states, and creative work',
  'Slows and moderates caffeine absorption, extending energy window from 1–1.5 hours to 3–6 hours sustained release',
];

const MATCHA_VS_COFFEE = [
  { feature: 'Caffeine per serving', coffee: '~95 mg', matcha: '~35–90 mg depending on prep' },
  { feature: 'Energy feel', coffee: 'Fast, intense spike', matcha: 'Slow-release, smooth 3–6 hours' },
  { feature: 'Crash risk', coffee: 'Higher', matcha: 'Lower' },
  { feature: 'L-theanine', coffee: 'None', matcha: '15–40 mg per cup' },
  { feature: 'Antioxidants', coffee: 'Chlorogenic acids', matcha: 'EGCG catechins, chlorophyll (15x wild blueberries)' },
  { feature: 'Cortisol impact', coffee: 'Can spike cortisol', matcha: 'Less cortisol response due to L-theanine' },
  { feature: 'Acidity', coffee: 'High', matcha: 'Low-moderate' },
  { feature: 'Focus type', coffee: 'Sharp, fast (can include jitters)', matcha: 'Calm, sustained clarity' },
];

const TORCH_MATCHA = [
  {
    name: 'The Monk',
    tagline: 'Focus. Calm. Presence.',
    description: 'Deep, grounding, present. For the person who wants to begin the day in stillness — the meditative focus of the original Zen tea ceremony, modernized.',
    mood: 'Meditative focus',
  },
  {
    name: 'The Ascendant',
    tagline: 'Rise Into Alignment.',
    description: 'Rising, clarifying, disciplined. For the ambitious morning — when you\'re building something and need the mental clarity to see the next step.',
    mood: 'Energy + clarity',
  },
  {
    name: 'The Alchemist',
    tagline: 'Create with Intention.',
    description: 'Balanced, transformative, creative. For the person who sits at the intersection of art and intellect — where the best ideas live.',
    mood: 'Balance + creativity',
  },
];

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
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            800 Years of Tradition
          </p>
          <h1 className="font-serif font-bold mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Instant Ceremonial Matcha: What It Is, Why It Matters, and How to Find Your Ritual
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg"
            style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            In 12th-century Japan, matcha was the beverage of Zen monks and samurai nobility. Today, it's the fastest-growing beverage segment in the U.S. — projected to nearly triple in market size by 2033.
          </p>
        </motion.div>
      </section>

      {/* History Timeline */}
      <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HISTORY_MILESTONES.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3 block" style={{ color: MATCHA_GREEN }}>
                  {milestone.year}
                </span>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
                  {milestone.event}
                </p>
              </motion.div>
            ))}
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
              At Torch Republic, our matcha line — The Monk, The Ascendant, The Alchemist — is built on ceremonial-grade matcha combined with adaptogens for a modern ritual that honors 800 years of tradition. Here's everything you need to know about what makes ceremonial matcha different, what the science actually says about its benefits, and how to make it work for your daily life.
            </p>
          </motion.div>

          {/* History Section */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              The History: 800 Years of Intentional Drinking
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Matcha's story begins not in Japan, but in Tang Dynasty China (7th–10th century), where tea leaves were steamed and pressed into bricks for trade, then ground into powder for preparation. The pivotal historical moment came in 1191, when Japanese Buddhist monk Eisai returned from years of study in China, carrying both tea seeds and the Zen practice of consuming powdered green tea as a tool for meditation and mental clarity.
              </p>
              <p>
                Eisai planted his seeds on temple grounds in Kyoto — and Japanese tea culture was born. Within a century, matcha had become more than a beverage. It was a philosophical practice. The tea ceremony (<em style={{ color: MATCHA_GREEN }}>chanoyu</em>), formalized in the 16th century by master Sen no Rikyū, transformed the act of making tea into a meditation on harmony (<em style={{ color: MATCHA_GREEN }}>wa</em>), respect (<em style={{ color: MATCHA_GREEN }}>kei</em>), purity (<em style={{ color: MATCHA_GREEN }}>sei</em>), and tranquility (<em style={{ color: MATCHA_GREEN }}>jaku</em>).
              </p>
              <p>
                The deliberate, precise movements of the tea ceremony were designed to force the mind into presence. Every step of matcha preparation — the careful scooping, the precise pouring, the rhythmic whisking — was engineered as a mindfulness practice. This is not historical trivia. It's the origin of why matcha still feels different from coffee, and why the Torch Republic matcha line carries names like The Monk and The Alchemist: these are archetypes of the same intentional practice, modernized for 2026.
              </p>
              <p>
                Due to the labor-intensive cultivation and the high regard in which matcha was held, it was originally reserved exclusively for nobility and the Buddhist clergy — a luxury product accessible only to those with power or devotion. Today, only approximately 60 families remain in Uji, Kyoto — the world's most revered matcha region — continuing this centuries-old tradition.
              </p>
            </div>
          </section>

          {/* What Makes Ceremonial Different */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              What Makes Ceremonial Grade Different
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                The term "ceremonial grade" refers to the highest quality tier of matcha — made from the youngest, most tender leaves of the spring's first harvest (<em style={{ color: MATCHA_GREEN }}>ichibancha</em>), using a cultivation method that no other tea undergoes.
              </p>

              <div className="my-8 space-y-6">
                {CEREMONIAL_STEPS.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase flex-shrink-0 pt-1"
                      style={{ color: MATCHA_GREEN }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: MATCHA_GREEN }}>
                        {step.title}
                      </h3>
                      <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p>
                Ceremonial grade matcha is ground on traditional granite stone mills at a rate of 30–40 grams per hour. This glacial pace is deliberate: high-speed milling generates heat that degrades the volatile flavor compounds and oxidizes the chlorophyll, producing a duller, more bitter product. Stone grinding creates the ultra-fine particle size that allows ceremonial matcha to dissolve smoothly and deliver its full nutritional payload in every sip.
              </p>
            </div>
          </section>

          {/* Grade Comparison Table */}
          <section className="mb-16">
            <motion.h3
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Ceremonial vs. Culinary Grade at a Glance
            </motion.h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid ${MATCHA_GREEN}40` }}>
                    <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: MATCHA_GREEN }}>Feature</th>
                    <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: MATCHA_GREEN }}>Ceremonial Grade</th>
                    <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: MATCHA_GREEN }}>Culinary Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADE_COMPARISON.map((row, i) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.5)' }}>{row.feature}</td>
                      <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.7)' }}>{row.ceremonial}</td>
                      <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.4)' }}>{row.culinary}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* L-Theanine Section */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              The L-Theanine Effect: Calm Focus Without the Crash
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                L-theanine is the compound that makes matcha physiologically unlike any other caffeinated beverage. It's a non-protein amino acid found almost exclusively in shade-grown green tea — and ceremonial matcha, due to its extended shading, contains the highest concentration of L-theanine in any natural food.
              </p>

              <div className="my-8 p-6 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: `1px solid ${MATCHA_GREEN}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85 }}>
                  <strong style={{ color: MATCHA_GREEN }}>One gram of matcha contains 6–20 mg of L-theanine; a standard 1.5–2 gram serving delivers 15–40 mg per cup.</strong> Ceremonial grade consistently reaches the higher end of this range.
                </p>
              </div>

              <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mt-8 mb-4" style={{ color: MATCHA_GREEN }}>
                What L-theanine actually does in the brain
              </h3>
              <ul className="space-y-3 my-6">
                {L_THEANINE_BENEFITS.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span style={{ color: MATCHA_GREEN }}>•</span>
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <p>
                When L-theanine is combined with caffeine — as it naturally is in matcha — the two compounds create what researchers call a synergistic cognitive effect: better attention, faster reaction time, and improved accuracy compared to either compound alone. The L-theanine doesn't eliminate caffeine's alerting effect; it modulates it, removing the anxiety spike while preserving and extending the focus.
              </p>
              <p>
                The result: matcha provides energy that lasts 3–6 hours with a stable release curve, compared to coffee's 1–1.5-hour peak and subsequent crash. Research from Verywell Health describes matcha's energy as "stable and enduring" while coffee's is "quick and intense" — with matcha showing lower cortisol response and crash risk.
              </p>
            </div>
          </section>

          {/* Antioxidant Profile */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              The Antioxidant Argument
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Matcha's antioxidant profile is genuinely exceptional. ORAC testing shows one gram of ceremonial matcha contains 1,384 ORAC units — approximately 15 times the antioxidants in one gram of wild blueberries.
              </p>
              <p>
                Unlike steeped green tea, where you brew and discard the leaf (absorbing only water-soluble nutrients), matcha powder is consumed whole — meaning every cup delivers the full spectrum of the leaf's compounds: water-soluble and fat-soluble nutrients, antioxidants, amino acids, vitamins, and minerals.
              </p>
              <p>
                The primary antioxidant class is catechins, particularly EGCG (epigallocatechin gallate) — one of the most studied antioxidant compounds in nutritional science, with documented effects on inflammation, cardiovascular health, metabolic function, and potentially cancer cell apoptosis.
              </p>
              <p>
                A 2022 critical review published in PMC on the therapeutic potential of matcha concluded it has documented benefits including "enhancing effect on cognitive function, cardio-metabolic health, and anti-tumorogenesis".
              </p>
            </div>
          </section>

          {/* Matcha vs Coffee */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Matcha vs. Coffee: The Honest Comparison
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Matcha is not a replacement for coffee. It's a different experience for a different intention. The right choice depends on what you're asking your morning beverage to do:
              </p>

              <div className="my-8 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${MATCHA_GREEN}40` }}>
                      <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: MATCHA_GREEN }}>Feature</th>
                      <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: '#C98F86' }}>Coffee</th>
                      <th className="text-left py-3 px-4 font-mono text-[7px] tracking-[0.3em] uppercase" style={{ color: MATCHA_GREEN }}>Matcha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATCHA_VS_COFFEE.map((row, i) => (
                      <motion.tr
                        key={row.feature}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.5)' }}>{row.feature}</td>
                        <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.6)' }}>{row.coffee}</td>
                        <td className="py-3 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.7)' }}>{row.matcha}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 rounded-lg" style={{ background: 'rgba(201,143,134,0.06)', border: '1px solid rgba(201,143,134,0.3)' }}>
                  <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: '#C98F86' }}>
                    Choose Coffee When
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
                    You need immediate, high-intensity alertness — before a demanding physical workout, an early morning meeting, or an intense deadline sprint.
                  </p>
                </div>
                <div className="p-6 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: `1px solid ${MATCHA_GREEN}30` }}>
                  <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: MATCHA_GREEN }}>
                    Choose Matcha When
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
                    You need sustained, calm focus over a 4–6 hour window — for creative work, deep writing, study sessions, meditation, or any state where anxiety or jitter would be counterproductive.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Instant Matcha */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-2xl md:text-3xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Instant Matcha: Does It Work?
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                One legitimate question: does instant matcha preserve the benefits of traditional ceremonial preparation?
              </p>
              <p>
                The answer depends on the source material and processing. Torch Republic's instant matcha starts with ceremonial-grade tencha leaves, processed to a fine powder and packaged in airtight conditions to prevent oxidation. The L-theanine, EGCG catechins, and chlorophyll are inherent in the leaf structure — they don't require whisking to become bioavailable. You dissolve them in water exactly as you would with a traditional preparation; the delivery mechanism is different, not the nutritional payload.
              </p>
              <p>
                The practical advantage of instant format: no whisk, no bowl, no equipment. One scoop, 8–10 oz of water, 10 seconds of stirring. A 3–6 hour calm focus window, ready in the time it takes to walk from the kitchen to your desk.
              </p>
            </div>
          </section>

          {/* Torch Republic Matcha */}
          <section className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif font-bold text-3xl md:text-4xl mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Finding Your Torch Republic Matcha Ritual
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>
                Each of the three Torch Republic matcha blends is calibrated for a specific daily intention:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                {TORCH_MATCHA.map((blend, i) => (
                  <motion.div
                    key={blend.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-lg text-center"
                    style={{ background: 'rgba(16,185,129,0.04)', border: `1px solid ${MATCHA_GREEN}20` }}
                  >
                    <h3 className="font-serif font-bold text-xl mb-2" style={{ color: '#FFFFFF' }}>
                      {blend.name}
                    </h3>
                    <p className="font-mono text-[7px] tracking-[0.3em] uppercase mb-4" style={{ color: MATCHA_GREEN }}>
                      {blend.tagline}
                    </p>
                    <p style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7, fontSize: '0.9rem' }}>{blend.description}</p>
                    <p className="font-mono text-[7px] tracking-[0.25em] uppercase mt-4" style={{ color: 'rgba(240,235,225,0.4)' }}>
                      {blend.mood}
                    </p>
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-lg" style={{ color: MATCHA_GREEN }}>
                The ritual is yours. The history, the science, the flavor — all of it ready in seconds.
              </p>
            </div>
          </section>

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="Instant Ceremonial Matcha: History, Benefits, L-Theanine Science & Daily Ritual" url="/journal/instant-ceremonial-matcha" />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-12 px-6 rounded-lg"
            style={{ background: `rgba(16,185,129,0.06)`, border: `1px solid ${MATCHA_GREEN}30` }}
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(16,185,129,0.6)' }}>
              Explore the Collection
            </p>
            <h3 className="font-serif font-bold text-2xl mb-6" style={{ color: '#FFFFFF' }}>
              Torch Republic Matcha
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Ceremonial grade, instantly prepared, purposefully blended.
            </p>
            <Link to="/matcha"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: MATCHA_GREEN, color: '#080808' }}>
              Shop Matcha →
            </Link>
          </motion.div>
        </div>
      </article>

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}

const CEREMONIAL_STEPS = [
  {
    title: 'Shading (20–30 days before harvest)',
    description: 'Tea plants are covered with bamboo frames and cloth, blocking sunlight for three to four weeks before picking. This forces the plant into a stress response: without light, it produces more chlorophyll (creating the vivid emerald green) and dramatically increases L-theanine — the amino acid responsible for calm focus. Caffeine also increases in response to shading, but at a rate modulated by L-theanine.',
  },
  {
    title: 'Hand-harvesting the first flush',
    description: 'Only the youngest, topmost leaves — unfurling tips that represent the most concentrated nutrition in the plant — are selected. Second and third harvest leaves, used for culinary-grade matcha, lack the sweetness and L-theanine richness of this first picking.',
  },
  {
    title: 'Steaming within hours',
    description: 'Leaves are steamed immediately after harvest to halt oxidation, preserving the green color, nutrient density, and delicate aroma.',
  },
  {
    title: 'Stone grinding (30 grams per hour)',
    description: 'The dried, de-stemmed tencha leaves are ground on traditional granite stone mills at a rate of 30–40 grams per hour. This glacial pace is deliberate: high-speed milling generates heat that degrades the volatile flavor compounds and oxidizes the chlorophyll, producing a duller, more bitter product. Stone grinding creates the ultra-fine particle size that allows ceremonial matcha to dissolve smoothly.',
  },
];