import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Zap, Shield, Microscope } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';
import RecommendedRitualBlock from '../../components/content/RecommendedRitualBlock';

const RG = '#E6B7AD';
const LIONSMANE_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6163f307e_msn-slide-image-2025-10-31T164055834.jpg';

const ARTICLE_CONTENT = {
  introduction: `Lion's Mane mushroom (Hericium erinaceus) stands out in the fungal kingdom. Its distinctive appearance, cascading white spines resembling a lion's mane, hints at something extraordinary. For centuries, this mushroom has been valued in traditional Asian medicine for supporting digestive health, cognitive function, and overall vitality. Today, modern science is uncovering the mechanisms behind these traditional uses.

Over 100 peer-reviewed studies now document Lion's Mane effects on the brain and nervous system. Research suggests this mushroom may support cognitive function, nerve regeneration, mood, and immune health through unique bioactive compounds.`,

  sections: [
    {
      title: "The Unique Chemistry of Lion's Mane",
      content: `What makes Lion's Mane so special? The answer lies in its extraordinary chemical composition. This mushroom contains two groups of potent bioactive compounds: hericenones and erinacines.

**Hericenones** are aromatic compounds found in the fruiting body (the visible mushroom). **Erinacines** are cyathane diterpenoids concentrated in the mycelium (the root-like structure). Both groups have demonstrated remarkable abilities to cross the blood-brain barrier, a protective shield that keeps most substances out of the brain.

Once inside the brain, these compounds stimulate the production of Nerve Growth Factor (NGF), a protein essential for the growth, maintenance, and survival of neurons. Think of NGF as fertilizer for your brain cells, it helps them grow stronger, form new connections, and repair damage.

But that's not all. Lion's Mane also contains:
- **Beta-glucans**: Polysaccharides that modulate immune function
- **Antioxidants**: Compounds that combat oxidative stress and inflammation
- **Amino acids**: Building blocks for neurotransmitters and proteins
- **Minerals**: Including zinc, iron, and selenium for overall brain health`
    },
    {
      title: "Nerve Growth Factor: The Brain's Fertilizer",
      content: `To understand why Lion's Mane has captured scientists' attention, we need to understand Nerve Growth Factor (NGF).

Discovered in the 1950s by Nobel Prize-winning neurobiologist Rita Levi-Montalcini, NGF is a protein that plays a crucial role in the development and maintenance of the nervous system. It's particularly important for cholinergic neurons, the brain cells responsible for learning, memory, and cognitive flexibility.

Here's the problem: NGF levels naturally decline with age. This decline is associated with age-related cognitive impairment and neurodegenerative conditions. Low NGF levels have been observed in patients with Alzheimer's disease, Parkinson's disease, and other neurological disorders.

This is where Lion's Mane becomes fascinating. Multiple studies have shown that compounds in Lion's Mane can:

1. **Stimulate NGF synthesis**: Erinacines and hericenones trigger brain cells to produce more NGF
2. **Enhance neurite outgrowth**: NGF promotes the growth of neurites, tiny projections that allow neurons to communicate
3. **Protect existing neurons**: NGF helps prevent neuron death and maintains healthy brain function

In laboratory studies, Lion's Mane extract increased NGF production by up to 230%. In animal studies, mice given Lion's Mane showed improved memory, faster nerve regeneration after injury, and better performance on cognitive tasks.`
    },
    {
      title: "Clinical Evidence: What Human Studies Show",
      content: `While laboratory and animal studies are promising, human clinical trials provide the most compelling evidence. Here's what the research shows:

**Cognitive Function in Older Adults (2009)**
A landmark double-blind, placebo-controlled study published in Phytotherapy Research examined 30 Japanese men and women aged 50-80 with mild cognitive impairment. Participants took 3 grams of Lion's Mane powder daily for 16 weeks.

Results: The Lion's Mane group showed significant improvements in cognitive function tests compared to placebo. Benefits began appearing at week 8 and continued throughout the study. When participants stopped taking Lion's Mane, scores gradually declined, suggesting ongoing supplementation may be necessary for sustained benefits.

**Memory and Concentration (2020)**
A study of healthy adults found that 4 weeks of Lion's Mane supplementation improved visual-spatial memory, short-term memory, and concentration. Participants also reported better focus during complex tasks.

**Mood and Mental Well-being (2010)**
Research involving 30 menopausal women found that Lion's Mane reduced symptoms of anxiety and depression while improving sleep quality. Participants took Lion's Mane cookies daily for 4 weeks, showing improvements in multiple psychological measures.

**Nerve Regeneration (2013)**
A clinical trial examined Lion's Mane's effects on peripheral nerve recovery. Patients with peripheral nerve injury who took Lion's Mane showed faster recovery times and better functional outcomes compared to controls.

**Important Note**: While these studies are encouraging, larger trials are needed to confirm optimal dosages, long-term effects, and benefits for specific conditions.`
    },
    {
      title: "How Lion's Mane Supports Brain Health",
      content: `Lion's Mane appears to support brain health through multiple mechanisms:

**1. Neurogenesis**
Emerging research suggests Lion's Mane may promote neurogenesis, the birth of new brain cells. This occurs primarily in the hippocampus, the brain's memory and learning center. Enhanced neurogenesis is associated with better memory formation and cognitive resilience.

**2. Myelin Repair**
Myelin is the protective sheath surrounding nerve fibers, essential for rapid signal transmission. Lion's Mane has been shown to accelerate myelin repair after injury, potentially improving nerve conduction speed and cognitive processing.

**3. Reduced Inflammation**
Chronic brain inflammation contributes to cognitive decline and neurodegenerative diseases. Lion's Mane contains powerful anti-inflammatory compounds that may protect brain tissue from inflammatory damage.

**4. Antioxidant Protection**
Oxidative stress damages brain cells and accelerates aging. Lion's Mane's antioxidant compounds neutralize free radicals, reducing oxidative damage and supporting long-term brain health.

**5. Gut-Brain Axis Support**
Emerging research highlights the gut-brain connection. Lion's Mane has been shown to support gut health by protecting the gastric mucosa and promoting beneficial gut bacteria. A healthy gut microbiome positively influences brain function through the gut-brain axis.`
    },
    {
      title: "Traditional Uses Meet Modern Science",
      content: `Lion's Mane has been used in Traditional Chinese Medicine (TCM) and Japanese Kampo medicine for over 2,000 years. Ancient practitioners prescribed it for:

- Strengthening the spleen and improving digestion
- Nourishing the gut and reducing inflammation
- Enhancing mental clarity and focus
- Supporting overall vitality and longevity

Modern science is now validating these traditional uses. Research confirms Lion's Mane's gastroprotective effects, showing it can help prevent and heal gastric ulcers. Studies also support its cognitive-enhancing and neuroprotective properties.

This convergence of ancient wisdom and modern research makes Lion's Mane one of the most compelling functional mushrooms available today.`
    },
    {
      title: "Incorporating Lion's Mane Into Your Routine",
      content: `Based on clinical studies, effective dosages typically range from 500-3,000 mg of Lion's Mane extract daily. Here are some practical tips:

**Timing**: Many people prefer taking Lion's Mane in the morning or early afternoon to support focus and cognitive performance throughout the day. Some also use it in the evening for its potential neuroregenerative benefits during sleep.

**Consistency**: Benefits accumulate over time. Most studies show noticeable improvements after 4-8 weeks of consistent use. Think of Lion's Mane as a long-term investment in brain health.

**Quality Matters**: Look for products that specify:
- Fruiting body extract (not just mycelium)
- Standardized beta-glucan content
- Third-party testing for purity and potency
- Organic certification when possible

**Forms**: Lion's Mane is available as capsules, powders, tinctures, and functional beverages. Choose the form that fits your lifestyle best.

**Synergy**: Lion's Mane pairs well with other cognitive-supportive nutrients like omega-3 fatty acids, B vitamins, and other adaptogens.`
    },
    {
      title: "The Bottom Line",
      content: `Lion's Mane mushroom represents a remarkable convergence of traditional medicine and modern neuroscience. With over 100 studies documenting its effects on brain health, nerve regeneration, cognitive function, and overall wellness, it's earned its place as one of the most researched functional mushrooms.

While more large-scale human trials are needed, the existing evidence is compelling. Lion's Mane appears to support brain health through multiple pathways: stimulating NGF production, promoting neurogenesis, reducing inflammation, providing antioxidant protection, and supporting the gut-brain axis.

Whether you're looking to enhance cognitive performance, support long-term brain health, or simply optimize your daily mental clarity, Lion's Mane offers a natural, well-tolerated option backed by both ancient wisdom and cutting-edge science.

At Torch Republic, we've incorporated Lion's Mane into our GlowMind blend because we believe in the power of evidence-based functional ingredients. Our morning ritual isn't just about caffeine, it's about nurturing your brain, supporting your focus, and setting yourself up for a day of clarity and purpose.`
    }
  ]
};

export default function ScienceOfLionsMane() {

  useSEO({
    title: 'The Science of Lion\'s Mane: Research-Backed Benefits for Brain & Body',
    description: 'Explore the scientific research behind Lion\'s Mane mushroom. Learn about cognitive benefits, nerve growth factor (NGF), and clinical studies supporting this powerful functional mushroom.',
    image: LIONSMANE_IMAGE,
    url: '/journal/science-of-lions-mane',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2026-06-12T08:00:00Z',
      section: 'Mushroom Science',
      keywords: ['lion\'s mane mushroom', 'hericium erinaceus', 'NGF', 'nerve growth factor', 'cognitive function', 'mushroom research', 'functional mushrooms', 'brain health'],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'The Science of Lion\'s Mane', url: '/journal/science-of-lions-mane' },
    ],
  });

  const BENEFITS = [
    { icon: Brain, title: 'Cognitive Function', body: 'Supports memory, focus, and mental clarity through enhanced neural connectivity', color: '#6B7FD7' },
    { icon: Zap, title: 'Nerve Growth Factor', body: 'Stimulates production of NGF, essential for neuron growth and maintenance', color: '#E8B86D' },
    { icon: Shield, title: 'Neuroprotection', body: 'Antioxidant compounds protect brain cells from oxidative stress and aging', color: '#6CBD5A' },
    { icon: Microscope, title: 'Clinical Research', body: 'Over 100 peer-reviewed studies document cognitive and neurological benefits', color: '#E67F8A' },
  ];

  const COMPOUNDS = [
    { name: 'Hericenones', source: 'Fruit body', action: 'Stimulate NGF synthesis' },
    { name: 'Erinacines', source: 'Mycelium', action: 'Cross blood-brain barrier' },
    { name: 'Beta-Glucans', source: 'Fruit body & mycelium', action: 'Support immune function' },
    { name: 'Antioxidants', source: 'Fruit body', action: 'Reduce oxidative stress' },
  ];

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Journal · Mushroom Science
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            The Science of Lion's Mane:<br />Research-Backed Benefits for Brain & Body
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Lion's Mane mushroom (Hericium erinaceus) has been used in traditional medicine for centuries. Modern science is now revealing the mechanisms behind its remarkable cognitive and neurological benefits.
          </p>
          <p className="font-mono text-[8px] tracking-[0.2em] mt-8" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Published June 12, 2026 · Torch Republic
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="px-0 py-0">
        <div className="w-full" style={{ height: 'clamp(300px, 50vh, 500px)', overflow: 'hidden', position: 'relative' }}>
          <img
            src={LIONSMANE_IMAGE}
            alt="Lion's Mane mushroom (Hericium erinaceus) growing on tree trunk"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.9) 100%)' }} />
        </div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[800px] mx-auto space-y-16">

          {/* Introduction */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading space-y-5" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              <p>
                Lion's Mane mushroom (Hericium erinaceus) stands out in the fungal kingdom. Its distinctive appearance, cascading white spines resembling a lion's mane, hints at something extraordinary.
              </p>
              <p>
                For centuries, this mushroom has been valued in traditional Asian medicine for supporting digestive health, cognitive function, and overall vitality. Today, modern science is uncovering the mechanisms behind these traditional uses.
              </p>
              <div className="my-8 p-6" style={{ background: 'rgba(107,127,215,0.06)', border: '1px solid rgba(107,127,215,0.15)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg mb-2" style={{ color: '#6B7FD7' }}>
                  Over 100 peer-reviewed studies now document Lion's Mane effects on the brain and nervous system.
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                  Research suggests this mushroom may support cognitive function, nerve regeneration, mood, and immune health through unique bioactive compounds.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Key Benefits */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Key Scientific Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5"
                    style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${b.color}15`, border: `1px solid ${b.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <b.icon size={14} style={{ color: b.color }} />
                      </div>
                      <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{b.title}</h3>
                    </div>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>{b.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* NGF Section */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Nerve Growth Factor (NGF) Stimulation
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  One of Lion's Mane most remarkable properties is its ability to stimulate the production of nerve growth factor (NGF).
                </p>
                <p>
                  NGF is a protein essential for the growth, maintenance, and survival of neurons. It plays a critical role in neuroplasticity, the brain's ability to adapt, learn, and form new neural connections throughout life.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(232,184,109,0.06)', border: '1px solid rgba(232,184,109,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: '#E8B86D' }}>
                    Bioactive compounds in Lion's Mane can cross the blood-brain barrier and directly influence NGF synthesis.
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    This mechanism suggests potential applications for supporting cognitive health, memory formation, and neurological function.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Bioactive Compounds */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Bioactive Compounds
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Lion's Mane contains several unique compounds responsible for its biological effects:
                </p>
                
                {/* Compounds Table */}
                <div className="my-8 space-y-3">
                  {COMPOUNDS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4"
                      style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{c.name}</h3>
                        <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{c.source}</span>
                      </div>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{c.action}</p>
                    </motion.div>
                  ))}
                </div>

                <p>
                  These compounds work synergistically, creating effects greater than any single compound alone.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Cognitive Research */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Cognitive Function Research
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Clinical studies have explored Lion's Mane effects on cognitive performance in various populations.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-3" style={{ color: RG }}>
                    Double-Blind Placebo-Controlled Study (2009)
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    Japanese researchers studied adults aged 50-80 with mild cognitive impairment. Participants consuming Lion's Mane showed significant improvements in cognitive function scores compared to placebo. Benefits disappeared when supplementation stopped, suggesting ongoing use may be necessary for sustained effects.
                  </p>
                </div>
                <p>
                  Additional research has examined Lion's Mane potential for supporting mood, reducing anxiety, and improving sleep quality, factors that indirectly influence cognitive performance.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Neuroprotection */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Neuroprotective Properties
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Beyond cognitive enhancement, Lion's Mane demonstrates neuroprotective potential.
                </p>
                <p>
                  Animal studies suggest the mushroom may help protect against neurodegenerative conditions by reducing inflammation, combating oxidative stress, and supporting neuronal health.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(108,190,90,0.06)', border: '1px solid rgba(108,190,90,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg" style={{ color: '#6CBD5A' }}>
                    Antioxidant compounds in Lion's Mane help neutralize free radicals that contribute to cellular aging and neurological decline.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* How to Use */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                How to Incorporate Lion's Mane
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Lion's Mane can be consumed in several forms, each offering unique benefits:
                </p>
                <div className="my-8 space-y-3">
                  {[
                    { title: 'Powdered Extract', body: 'Concentrated form with standardized bioactive compounds. Easy to add to coffee, smoothies, or recipes.' },
                    { title: 'Fresh Mushroom', body: 'Culinary preparation offers whole-food nutrition and culinary enjoyment.' },
                    { title: 'Capsules', body: 'Convenient dosing with precise amounts of extract.' },
                    { title: 'Tinctures', body: 'Liquid extracts for rapid absorption and flexible dosing.' },
                  ].map((item, i) => (
                    <div key={item.title} className="p-4" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}>
                      <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{item.title}</h3>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{item.body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  For cognitive benefits, consistency matters more than timing. Daily use allows bioactive compounds to accumulate and exert their effects.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Torch Republic */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Torch Republic Approach
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  At Torch Republic, we formulate our Lion's Mane blends with both science and ritual in mind.
                </p>
                <p>
                  Our mushroom coffee combines premium instant coffee with Lion's Mane extract, creating a daily practice that supports focus, clarity, and intentional living.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg" style={{ color: RG }}>
                    We believe in the power of functional mushrooms to transform everyday rituals into moments of purpose and wellness.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Recommended Ritual */}
          <RecommendedRitualBlock
            productName="GlowMind Clarity Blend"
            productSlug="glowmind-clarity-blend"
            tagline="Lion's Mane + Cordyceps + Reishi mushroom coffee,  the same functional ingredients studied in the research above, in an instant cup you'll actually want to drink every morning."
            accentColor="#6B7FD7"
          />

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="The Science of Lion's Mane: Research-Backed Benefits for Brain & Body" url="/journal/science-of-lions-mane" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(107,127,215,0.06)', border: '1px solid rgba(107,127,215,0.15)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(107,127,215,0.6)' }}>
              Experience the Science
            </p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>
              Try Torch Republic Lion's Mane Blends
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Premium mushroom coffee infused with Lion's Mane extract for focused energy and mental clarity.
            </p>
            <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: '#6B7FD7', color: '#080808' }}>
              Shop Mushroom Coffee →
            </Link>
          </motion.div>

        </div>
      </article>

      {/* FDA Disclaimer */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}