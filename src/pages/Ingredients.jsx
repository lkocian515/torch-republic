import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Leaf, Zap, Brain, Shield, Coffee } from 'lucide-react';

const RG = '#E6B7AD';

const INGREDIENTS = [
  {
    name: "Lion's Mane Mushroom",
    scientific: 'Hericium erinaceus',
    icon: Brain,
    benefits: ['Cognitive support', 'Focus & clarity', 'Nerve growth factor', 'Brain health'],
    description: "Lion's Mane is a functional mushroom renowned for its cognitive-enhancing properties. Traditionally used in Eastern medicine, modern research suggests it may support nerve growth factor (NGF) production, which is essential for brain cell health and function.",
    uses: ['Daily focus rituals', 'Mental clarity support', 'Cognitive wellness', 'Morning routines'],
  },
  {
    name: 'Chaga Mushroom',
    scientific: 'Inonotus obliquus',
    icon: Shield,
    benefits: ['Antioxidant support', 'Immune function', 'Anti-inflammatory', 'Overall wellness'],
    description: 'Chaga is a powerful adaptogenic mushroom that grows on birch trees in cold climates. It is one of the richest natural sources of antioxidants, particularly superoxide dismutase (SOD), which helps protect cells from oxidative stress.',
    uses: ['Daily wellness support', 'Immune health', 'Antioxidant intake', 'Stress management'],
  },
  {
    name: 'Premium Arabica Coffee',
    scientific: 'Coffea arabica',
    icon: Coffee,
    benefits: ['Clean energy', 'Rich flavor', 'Antioxidants', 'Morning ritual'],
    description: 'Our classic coffee blends use 100% premium Arabica beans, known for their smooth, refined flavor profile and lower acidity compared to Robusta. Freeze-dried to preserve aroma and taste.',
    uses: ['Morning energy', 'Afternoon pick-me-up', 'Coffee lovers', 'Traditional coffee ritual'],
  },
  {
    name: 'Ceremonial Matcha',
    scientific: 'Camellia sinensis',
    icon: Leaf,
    benefits: ['Calm energy', 'L-theanine', 'Antioxidants', 'Meditation support'],
    description: 'Our ceremonial grade matcha is made from shade-grown Japanese tea leaves, stone-ground into a fine powder. Rich in L-theanine, which promotes calm alertness and sustained focus without jitters.',
    uses: ['Morning meditation', 'Afternoon focus', 'Evening wind-down', 'Mindful rituals'],
  },
];

const COMPARISON = [
  { feature: 'Instant Preparation', torch: '✓ All Products', competitor1: '✓ Some', competitor2: '✗ Ground Only' },
  { feature: 'Mushroom Options', torch: '✓ 6 Blends', competitor1: '✓ 2-3', competitor2: '✗ None' },
  { feature: 'Matcha Options', torch: '✓ 3 Blends', competitor1: '✗ None', competitor2: '✓ 1' },
  { feature: 'Classic Coffee', torch: '✓ 3 Blends', competitor1: '✗ None', competitor2: '✓ Many' },
  { feature: 'Servings Per Container', torch: '25-27', competitor1: '15-20', competitor2: 'Varies' },
  { feature: 'Price Per Serving', torch: '$0.93', competitor1: '$1.50+', competitor2: '$0.50-1.00' },
  { feature: 'No Machine Needed', torch: '✓ Yes', competitor1: '✗ No', competitor2: '✗ No' },
  { feature: 'Travel-Friendly', torch: '✓ Yes', competitor1: '✗ No', competitor2: '✗ No' },
];

export default function Ingredients() {
  useSEO({
    title: "Our Ingredients | Lion's Mane, Chaga & Premium Coffee",
    description: "Learn about Torch Republic's premium ingredients: Lion's Mane mushroom for focus, Chaga for wellness, 100% Arabica coffee, and ceremonial matcha. Transparent sourcing, functional benefits, no hidden additives.",
    url: '/ingredients',
    type: 'website',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Transparency & Quality
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Our Ingredients
          </h1>
          <p className="font-heading"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300, maxWidth: '680px', margin: '0 auto' }}>
            Premium, functional, and transparent. Every Torch Republic product is crafted with carefully sourced ingredients designed to support your daily rituals—no hidden additives, no artificial fillers, no compromises.
          </p>
        </motion.div>
      </section>

      {/* What Are Functional Mushrooms */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-2" style={{ color: RG }}>Education</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              What Are Functional Mushrooms?
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Functional mushrooms, also known as medicinal or adaptogenic mushrooms, are specialized varieties that offer health-supporting compounds beyond basic nutrition. Unlike culinary mushrooms used primarily for cooking, functional mushrooms contain bioactive compounds like beta-glucans, triterpenes, and antioxidants that support various aspects of wellness.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              The two functional mushrooms we use—Lion's Mane and Chaga—have been studied for their potential cognitive, immune, and overall wellness benefits. These mushrooms have been used in traditional Eastern medicine for centuries and are now gaining recognition in modern wellness practices.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              <strong>Important:</strong> Torch Republic mushroom coffee blends are created for daily ritual and general wellness support. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a healthcare professional before making significant changes to your diet or wellness routine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Ingredients Grid */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Premium Ingredients
            </p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              What's Inside Every Cup
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INGREDIENTS.map((ingredient, i) => {
              const Icon = ingredient.icon;
              return (
                <motion.div
                  key={ingredient.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8"
                  style={{
                    background: '#0F0E0D',
                    border: '1px solid rgba(230,183,173,0.08)',
                    borderRadius: '4px',
                  }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3" style={{ background: 'rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                      <Icon className="w-6 h-6" style={{ color: RG }} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white mb-1" style={{ fontSize: '1.4rem' }}>
                        {ingredient.name}
                      </h3>
                      <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                        {ingredient.scientific}
                      </p>
                    </div>
                  </div>

                  <p className="font-heading text-sm leading-relaxed mb-6" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
                    {ingredient.description}
                  </p>

                  <div className="mb-6">
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      Key Benefits
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {ingredient.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" style={{ color: RG }} />
                          <span className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.7)' }}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      Best For
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.uses.map((use) => (
                        <span
                          key={use}
                          className="px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase"
                          style={{
                            background: 'rgba(230,183,173,0.05)',
                            border: '1px solid rgba(230,183,173,0.15)',
                            color: 'rgba(230,183,173,0.6)',
                            borderRadius: '2px',
                          }}
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Comparison
            </p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Why Choose Torch Republic
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(230,183,173,0.2)' }}>
                  <th className="text-left py-4 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>Feature</th>
                  <th className="text-center py-4 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: RG }}>Torch Republic</th>
                  <th className="text-center py-4 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Competitor 1</th>
                  <th className="text-center py-4 px-4 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Competitor 2</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
                    <td className="py-4 px-4 font-heading" style={{ color: 'rgba(240,235,225,0.8)' }}>{row.feature}</td>
                    <td className="py-4 px-4 text-center font-heading" style={{ color: RG }}>{row.torch}</td>
                    <td className="py-4 px-4 text-center font-heading" style={{ color: 'rgba(255,255,255,0.5)' }}>{row.competitor1}</td>
                    <td className="py-4 px-4 text-center font-heading" style={{ color: 'rgba(255,255,255,0.5)' }}>{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* No Hidden Additives */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              No Hidden Additives. Ever.
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We believe in complete transparency. That's why every Torch Republic product contains only what we list—no proprietary blends, no hidden fillers, no artificial ingredients.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                'No artificial flavors',
                'No artificial colors',
                'No preservatives',
                'No fillers or flow agents',
                'No added sugars',
                'No GMO ingredients',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" style={{ color: RG }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sourcing */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              Responsibly Sourced
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Our ingredients are sourced from trusted suppliers who share our commitment to quality and sustainability. Lion's Mane and Chaga mushrooms are cultivated in controlled environments to ensure purity and potency. Our Arabica coffee beans are ethically sourced, and our ceremonial matcha comes from traditional Japanese tea gardens.
            </p>
            <Link
              to="/mission"
              className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{
                background: RG,
                color: '#080808',
                padding: '14px 36px',
                borderRadius: '4px',
                marginTop: '20px',
              }}
            >
              Learn About Our Mission →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Start Your Ritual
          </p>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
            Experience the Difference
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
            Try Torch Republic risk-free with our 30-day satisfaction guarantee. If it's not right for you, we'll make it right.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#080808',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Shop All Products →
          </Link>
        </motion.div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}