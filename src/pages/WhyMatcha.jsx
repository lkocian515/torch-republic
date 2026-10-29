import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Zap, Brain, Heart } from 'lucide-react';

const RG = '#E6B7AD';

const BENEFITS = [
  {
    icon: Leaf,
    title: '100% Pure Matcha',
    description: 'Made from whole green tea leaves, ceremonial matcha contains the full spectrum of nutrients, antioxidants, and beneficial compounds found in the tea plant.',
  },
  {
    icon: Zap,
    title: 'Calm Energy',
    description: 'Matcha provides sustained energy through a unique combination of caffeine and L-theanine, promoting alertness without the jitters or crash of coffee.',
  },
  {
    icon: Brain,
    title: 'Enhanced Focus',
    description: 'Matcha contains naturally occurring caffeine and L-theanine, traditionally associated with mindful tea rituals.',
  },
  {
    icon: Heart,
    title: 'Rich in Antioxidants',
    description: 'Matcha is exceptionally high in catechins, particularly EGCG, powerful antioxidants that support overall health and wellness.',
  },
];

const GRADES = [
  {
    grade: 'Ceremonial Grade',
    description: 'The highest quality matcha, made from the youngest tea leaves. Vibrant green color, smooth umami flavor, perfect for traditional preparation.',
    use: 'Traditional whisking, drinking plain',
    color: '#6CBD5A',
  },
  {
    grade: 'Culinary Grade',
    description: 'Made from more mature leaves, slightly more astringent. Ideal for cooking, baking, and lattes where other flavors are present.',
    use: 'Lattes, smoothies, baking, recipes',
    color: '#8BC45A',
  },
];

export default function WhyMatcha() {
  useSEO({
    title: 'Why Ceremonial Matcha? | Benefits of Premium Matcha Green Tea',
    description: 'Discover the benefits of ceremonial grade matcha. Calm energy, enhanced focus, rich antioxidants, and traditional Japanese wellness in every cup.',
    url: '/why-matcha',
    type: 'article',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F5EF' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.22)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: '#E6B7AD' }}>
            Traditional Wellness
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#3F3027', letterSpacing: '-0.02em' }}>
            Why Ceremonial Matcha?
          </h1>
          <p className="font-heading text-lg max-w-2xl mx-auto"
            style={{ color: '#6A5A4A', fontWeight: 300, lineHeight: 1.9 }}>
            Experience 800 years of Japanese tea tradition. Pure, vibrant, and crafted for mindful daily rituals.
          </p>
        </motion.div>
      </section>

      {/* What Is Matcha */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#FBF8F1', borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#3F3027' }}>
              What Is Ceremonial Matcha?
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: '#6A5A4A', fontWeight: 300 }}>
              Ceremonial matcha is the highest grade of matcha green tea, made from the youngest, most tender tea leaves. Unlike regular green tea where you steep leaves and discard them, matcha involves consuming the entire leaf in powdered form—meaning you get 100% of the nutrients, antioxidants, and beneficial compounds.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: '#6A5A4A', fontWeight: 300 }}>
              The tea plants are shade-grown for 3-4 weeks before harvest, which boosts chlorophyll production (giving matcha its vibrant green color) and increases L-theanine content. The leaves are then stone-ground into an ultra-fine powder, preserving the delicate flavors and nutrients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#E6B7AD' }}>
              The Benefits
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#3F3027' }}>
              Why Choose Ceremonial Matcha?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.28)' }}>
                <benefit.icon className="w-8 h-8 mb-4" style={{ color: RG }} />
                <h3 className="font-serif font-bold text-[#3F3027] mb-2 text-lg">{benefit.title}</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: '#6A5A4A', fontWeight: 300 }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Matcha Grades */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#FBF8F1', borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <div className="max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#3F3027' }}>
              Understanding Matcha Grades
            </h2>
            <p className="font-heading text-base mt-4" style={{ color: '#6A5A4A', fontWeight: 300 }}>
              Not all matcha is created equal. Here's the difference:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GRADES.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: '#FFFFFF', border: `1px solid ${item.color}66` }}>
                <h3 className="font-serif font-bold text-[#3F3027] mb-3 text-xl">{item.grade}</h3>
                <p className="font-heading text-sm leading-relaxed mb-4" style={{ color: '#6A5A4A', fontWeight: 300 }}>
                  {item.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-1"
                    style={{ background: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}>
                    Best for: {item.use}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Matcha vs Coffee */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#E6B7AD' }}>
              Comparison
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#3F3027' }}>
              Matcha vs Coffee
            </h2>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(230,183,173,0.2)' }}>
                  <th className="py-4 px-4 text-left font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: '#E6B7AD' }}>Feature</th>
                  <th className="py-4 px-4 text-center font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: '#6CBD5A' }}>Matcha</th>
                  <th className="py-4 px-4 text-center font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: '#6A5A4A' }}>Coffee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Energy Type', matcha: 'Calm, sustained', coffee: 'Quick spike, crash' },
                  { feature: 'Caffeine (per serving)', matcha: '~35mg', coffee: '~95mg' },
                  { feature: 'L-Theanine', matcha: 'High', coffee: 'None' },
                  { feature: 'Antioxidants', matcha: 'Very High (137x EGCG)', coffee: 'Moderate' },
                  { feature: 'Acidity', matcha: 'Low (pH 7-8)', coffee: 'High (pH 5)' },
                  { feature: 'Teeth Staining', matcha: 'Minimal', coffee: 'Significant' },
                  { feature: 'Preparation', matcha: 'Whisk or stir', coffee: 'Brewer required' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(230,183,173,0.22)' }}>
                    <td className="py-4 px-4 font-heading text-sm" style={{ color: '#3F3027' }}>{row.feature}</td>
                    <td className="py-4 px-4 text-center font-heading text-sm" style={{ color: '#6CBD5A' }}>{row.matcha}</td>
                    <td className="py-4 px-4 text-center font-heading text-sm" style={{ color: '#6A5A4A' }}>{row.coffee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How to Prepare */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#FBF8F1', borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#3F3027' }}>
              How to Prepare Matcha
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: '#6A5A4A', fontWeight: 300 }}>
              Torch Republic matcha is instant—no traditional whisk required. Simply add to hot water, stir, and enjoy. For a traditional experience, use a bamboo whisk (chasen) to create a frothy, smooth consistency.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { step: '01', title: 'Sift Matcha', desc: '1/2 tsp (1g) into bowl or mug' },
                { step: '02', title: 'Add Water', desc: '2 oz hot water (175°F / 80°C)' },
                { step: '03', title: 'Whisk or Stir', desc: 'Until smooth and frothy' },
              ].map((item) => (
                <div key={item.step} className="p-6 text-center" style={{ background: '#FFFFFF', border: '1px solid rgba(230,183,173,0.28)' }}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>{item.step}</p>
                  <h3 className="font-serif font-bold text-[#3F3027] mb-2">{item.title}</h3>
                  <p className="font-heading text-xs" style={{ color: '#6A5A4A' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: '#E6B7AD' }}>
            Start Your Ritual
          </p>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#3F3027', lineHeight: 1.2 }}>
            Experience Ceremonial Matcha
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: '#6A5A4A', fontWeight: 300, lineHeight: 1.8 }}>
            Discover the calm energy and focused clarity of premium ceremonial matcha. Shop our collection and elevate your daily ritual.
          </p>
          <Link
            to="/shop/matcha"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: '#B86543',
              color: '#FBF8F1',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Shop Matcha →
          </Link>
        </motion.div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.22)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: '#A89A8A', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}