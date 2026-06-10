import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Brain, Zap, Shield, Leaf, Coffee } from 'lucide-react';

const RG = '#E6B7AD';

const BENEFITS = [
  {
    icon: Brain,
    title: 'Enhanced Focus & Clarity',
    description: "Lion's Mane mushroom has been traditionally used to support cognitive function, mental clarity, and sharp focus throughout the day.",
  },
  {
    icon: Zap,
    title: 'Sustained Energy',
    description: 'Unlike traditional coffee that can cause jitters and crashes, mushroom coffee provides smooth, sustained energy without the mid-morning slump.',
  },
  {
    icon: Shield,
    title: 'Immune Support',
    description: "Chaga mushroom is rich in antioxidants and has been used for centuries to support overall immune system health and wellness.",
  },
  {
    icon: Leaf,
    title: 'Adaptogenic Benefits',
    description: 'Functional mushrooms are adaptogens, meaning they help your body adapt to stress and maintain balance naturally.',
  },
];

const COMPARISON = [
  { feature: 'Coffee-Forward Taste', torch: true, traditional: true },
  { feature: 'Functional Mushrooms', torch: true, traditional: false },
  { feature: 'Focus Support', torch: true, traditional: false },
  { feature: 'Sustained Energy', torch: true, traditional: false },
  { feature: 'No Jitters', torch: true, traditional: false },
  { feature: 'Immune Support', torch: true, traditional: false },
  { feature: 'Adaptogenic Benefits', torch: true, traditional: false },
  { feature: 'Instant Preparation', torch: true, traditional: false },
];

export default function WhyMushroomCoffee() {
  useSEO({
    title: "Why Mushroom Coffee? | Benefits of Lion's Mane & Chaga Coffee",
    description: "Discover the benefits of mushroom coffee with Lion's Mane and Chaga. Enhanced focus, sustained energy, immune support, and adaptogenic wellness without compromising coffee taste.",
    url: '/why-mushroom-coffee',
    type: 'article',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Functional Wellness
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Why Mushroom Coffee?
          </h1>
          <p className="font-heading text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
            All the benefits of premium coffee, enhanced with functional mushrooms for focus, energy, and overall wellness.
          </p>
        </motion.div>
      </section>

      {/* What Is Mushroom Coffee */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              What Is Mushroom Coffee?
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Mushroom coffee is exactly what it sounds like: premium coffee enhanced with functional mushrooms. But don't worry—it still tastes like coffee. At Torch Republic, we blend high-quality instant coffee with Lion's Mane and Chaga mushrooms to create a functional beverage that supports your daily wellness goals.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              The result? A smooth, rich coffee experience with added benefits for focus, energy, and overall well-being. No mushroom taste, no compromise—just better coffee for your ritual.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              The Benefits
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              Why Choose Mushroom Coffee?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <benefit.icon className="w-8 h-8 mb-4" style={{ color: RG }} />
                <h3 className="font-serif font-bold text-white mb-2 text-lg">{benefit.title}</h3>
                <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300 }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Mushrooms */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Functional Mushrooms Behind the Benefits
              </h2>
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                Torch Republic uses two of the most researched and revered functional mushrooms in traditional wellness practices.
              </p>
            </div>

            {/* Lion's Mane */}
            <div className="p-6" style={{ background: '#111111', border: '1px solid rgba(230,183,173,0.1)' }}>
              <h3 className="font-serif font-bold text-white mb-3 text-xl">Lion's Mane Mushroom</h3>
              <p className="font-heading text-sm leading-relaxed mb-4" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
                Known as the "mind mushroom," Lion's Mane (Hericium erinaceus) has been used in traditional medicine for centuries to support cognitive function and brain health. Modern research suggests it may support nerve growth factor (NGF) production, which is essential for maintaining healthy brain function.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Focus', 'Mental Clarity', 'Cognitive Support', 'Brain Health'].map((tag) => (
                  <span key={tag} className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-1"
                    style={{ background: 'rgba(230,183,173,0.1)', color: RG, border: `1px solid ${RG}30` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Chaga */}
            <div className="p-6" style={{ background: '#111111', border: '1px solid rgba(230,183,173,0.1)' }}>
              <h3 className="font-serif font-bold text-white mb-3 text-xl">Chaga Mushroom</h3>
              <p className="font-heading text-sm leading-relaxed mb-4" style={{ color: 'rgba(247,241,232,0.55)', fontWeight: 300 }}>
                Chaga (Inonotus obliquus) is one of nature's most potent sources of antioxidants. This mushroom grows on birch trees in cold climates and has been traditionally used to support immune function, reduce oxidative stress, and promote overall wellness.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Antioxidants', 'Immune Support', 'Wellness', 'Vitality'].map((tag) => (
                  <span key={tag} className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-1"
                    style={{ background: 'rgba(230,183,173,0.1)', color: RG, border: `1px solid ${RG}30` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[900px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Comparison
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              Mushroom Coffee vs Traditional Coffee
            </h2>
          </motion.div>
          <div style={{ overflowX: 'auto' }}>
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(230,183,173,0.2)' }}>
                  <th className="py-4 px-4 text-left font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>Feature</th>
                  <th className="py-4 px-4 text-center font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: RG }}>Torch Republic</th>
                  <th className="py-4 px-4 text-center font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>Traditional Coffee</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
                    <td className="py-4 px-4 font-heading text-sm" style={{ color: 'rgba(247,241,232,0.7)' }}>{row.feature}</td>
                    <td className="py-4 px-4 text-center">
                      {row.torch ? <CheckCircle className="w-5 h-5 mx-auto" style={{ color: RG }} /> : <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {row.traditional ? <CheckCircle className="w-5 h-5 mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }} /> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              Who Is Mushroom Coffee For?
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Mushroom coffee is perfect for anyone looking to enhance their daily coffee ritual with functional benefits. It's especially beneficial for:
            </p>
            <ul className="space-y-3 mt-4">
              {[
                'Professionals seeking sustained focus without jitters',
                'Students looking for cognitive support during study sessions',
                'Entrepreneurs managing high-stress workloads',
                'Wellness-conscious individuals wanting functional beverages',
                'Coffee lovers open to trying something better',
                'Anyone experiencing afternoon energy crashes',
                'People interested in adaptogenic wellness',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: RG }} />
                  <span className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.65)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* How to Use */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
              How to Use Mushroom Coffee
            </h2>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Torch Republic mushroom coffee is instant—no coffee maker needed. Simply add one scoop to hot water, stir, and enjoy. You can also mix it with milk, creamer, or blend it into smoothies for a functional boost.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                { step: '01', title: 'Add Scoop', desc: 'One scoop to your favorite mug' },
                { step: '02', title: 'Add Water', desc: 'Hot water (or milk) to mug' },
                { step: '03', title: 'Stir & Enjoy', desc: 'Mix well and start your ritual' },
              ].map((item) => (
                <div key={item.step} className="p-6 text-center" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: RG }}>{item.step}</p>
                  <h3 className="font-serif font-bold text-white mb-2">{item.title}</h3>
                  <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.5)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
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
            Try Mushroom Coffee Today
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
            Experience the benefits of functional mushrooms with every cup. Shop our Mushroom Coffee collection and transform your morning ritual.
          </p>
          <Link
            to="/shop/instant-mushroom-coffee"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#080808',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Shop Mushroom Coffee →
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