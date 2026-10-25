import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Brain, Shield, Zap, Heart, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';

const BENEFITS = [
  {
    icon: Brain,
    title: 'Sharper Focus & Mental Clarity',
    body: "Lion's Mane mushroom stimulates Nerve Growth Factor (NGF),  the protein your brain uses to maintain and repair neurons. Daily use builds toward clearer thinking, less fog, and more sustained attention without the caffeine spike-and-crash cycle.",
  },
  {
    icon: Shield,
    title: 'Powerful Antioxidant Defense',
    body: "Chaga holds the highest ORAC antioxidant score ever recorded in a natural food,  higher than blueberries, acai, and green tea combined. Every cup delivers a concentrated dose of antioxidants your immune system and cells can use immediately.",
  },
  {
    icon: Heart,
    title: 'Adaptogenic Stress Support',
    body: "Reishi and Cordyceps act as adaptogens,  compounds that help your body regulate cortisol and the HPA (stress) axis. Regular consumption is associated with lower subjective stress, better sleep quality, and more stable mood.",
  },
  {
    icon: Zap,
    title: 'Sustained Energy Without Jitters',
    body: 'Mushroom coffee typically contains 40–60 mg of caffeine versus 95 mg in a standard cup. The lower caffeine, combined with adaptogenic buffering, creates a cleaner energy curve,  no spike, no crash, no 2pm wall.',
  },
  {
    icon: Clock,
    title: 'Long-Term Cognitive Protection',
    body: 'Research shows Lion\'s Mane benefits are cumulative,  they build over weeks and months of consistent use. The 2009 Mori trial showed progressive improvement over 16 weeks, with washout upon discontinuation. This is a ritual, not a one-time boost.',
  },
];

const FAQ = [
  {
    question: 'What does mushroom coffee actually taste like?',
    answer: "Mushroom coffee tastes like coffee,  specifically, a slightly earthier, smoother version of your regular brew. The mushroom extracts are neutral in flavor and complement rather than compete with the coffee base. Most people describe it as 'a better cup of coffee,' not 'coffee with mushrooms.'",
  },
  {
    question: 'Is mushroom coffee safe to drink every day?',
    answer: 'Yes. The mushrooms used in quality blends,  Lion\'s Mane, Chaga, Reishi, Cordyceps,  have centuries of safe use in traditional medicine and a strong safety profile in modern research. People with mushroom allergies, those on blood-thinning medications, or those with kidney disease should consult a physician first.',
  },
  {
    question: 'How long does it take to feel the benefits of mushroom coffee?',
    answer: 'The adaptogenic and antioxidant effects begin immediately. The cognitive benefits of Lion\'s Mane, however, are cumulative,  most people notice a difference at around 2–4 weeks of consistent daily use. The 2009 Mori trial showed progressive improvement over 16 weeks.',
  },
  {
    question: 'Does mushroom coffee have caffeine?',
    answer: 'Yes,  mushroom coffee is still coffee and contains caffeine. Most quality blends contain 40–60 mg per serving, compared to 95 mg in a standard cup. The lower caffeine level, combined with adaptogenic compounds, creates a smoother energy experience.',
  },
  {
    question: 'Can mushroom coffee help with anxiety?',
    answer: 'Many people who experience anxiety from regular coffee find mushroom coffee gentler. The lower caffeine, combined with the adaptogenic effects of Reishi and Lion\'s Mane on the stress response, reduces the overstimulation that triggers anxiety in sensitive individuals. This is not a medical claim,  if you have diagnosed anxiety, consult your physician.',
  },
  {
    question: 'What is the best mushroom coffee brand?',
    answer: "Look for brands that clearly disclose the mushroom extract used (fruiting body vs. mycelium), the extraction method, and the concentration. Torch Republic uses dual-extract fruiting body for all mushroom ingredients, with transparent third-party testing.",
  },
];

export default function MushroomCoffeeBenefitsGuide() {
  useSEO({
    title: 'Mushroom Coffee Benefits: The Complete Science-Backed Guide (2025)',
    description: 'Everything you need to know about mushroom coffee benefits,  Lion\'s Mane for focus, Chaga for immunity, adaptogens for stress. Science-backed, honest, comprehensive.',
    url: '/journal/mushroom-coffee-benefits',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Mushroom Coffee Benefits', url: '/journal/mushroom-coffee-benefits' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-01-15T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Science',
      keywords: ['mushroom coffee benefits', 'lion\'s mane coffee', 'chaga mushroom', 'functional mushrooms', 'adaptogens', 'cognitive health'],
    },
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Science · Updated June 2025
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Mushroom Coffee Benefits: The Complete Science-Backed Guide
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Your morning cup can do more than wake you up. Here's what the research actually says about functional mushrooms,  and why millions of people have permanently switched.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {['8 min read', 'Science-backed', 'No hype'].map(tag => (
              <span key={tag} className="font-mono text-[8px] tracking-[0.3em] uppercase px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', color: 'rgba(230,183,173,0.6)', border: '1px solid rgba(230,183,173,0.15)' }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#0A0908' }}>
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-10 text-center" style={{ color: 'rgba(230,183,173,0.4)' }}>
            5 Core Benefits
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-7"
                  style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.1)' }}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-full" style={{ background: 'rgba(230,183,173,0.08)' }}>
                    <Icon className="w-5 h-5" style={{ color: RG }} />
                  </div>
                  <h2 className="font-serif font-bold text-lg text-white mb-3">{b.title}</h2>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.8 }}>{b.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          {/* The Science */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              What Makes Mushroom Coffee Different From Regular Coffee?
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Regular coffee delivers caffeine. That's valuable,  we won't pretend otherwise. Caffeine is one of the most well-researched cognitive compounds on the planet, with documented benefits for focus, alertness, and short-term performance.</p>
              <p>But caffeine is a stimulant with a hard ceiling. It works by blocking adenosine receptors,  the brain's "tiredness" signal,  for a few hours, then wears off. The bigger your dose, the more likely you are to experience jitters, anxiety, crashes, and diminishing tolerance over time.</p>
              <p>Mushroom coffee adds a layer that regular coffee simply can't deliver: <strong style={{ color: RG }}>functional compounds that work on completely different biological pathways</strong>. Instead of just blocking tiredness, they actively support the mechanisms behind focus, stress resilience, and long-term brain health.</p>

              <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.85 }}>
                  <strong style={{ color: RG }}>The key difference:</strong> caffeine masks tiredness. Functional mushrooms address the biology behind focus, stress, and cognitive health. One is borrowed energy. The other is built energy.
                </p>
              </div>
            </div>
          </section>

          {/* The Mushrooms */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              The 4 Mushrooms That Actually Matter
            </motion.h2>
            <div className="space-y-5">
              {[
                {
                  name: "Lion's Mane (Hericium erinaceus)",
                  role: 'The Cognitive Engine',
                  detail: "Stimulates NGF production, supporting neuroplasticity and memory. The only food known to cross the blood-brain barrier and directly activate nerve repair mechanisms. 2023 RCT showed improved focus and attention after a single dose in healthy adults.",
                  tag: 'Focus & Brain Health',
                },
                {
                  name: 'Chaga (Inonotus obliquus)',
                  role: 'The Antioxidant Shield',
                  detail: "Holds the highest ORAC score ever recorded. Rich in betulinic acid, melanin, and polysaccharides. Associated with immune modulation, anti-inflammatory effects, and cellular protection from oxidative stress.",
                  tag: 'Immunity & Antioxidants',
                },
                {
                  name: 'Reishi (Ganoderma lucidum)',
                  role: 'The Stress Regulator',
                  detail: "A primary adaptogen used in Traditional Chinese Medicine for 2,000 years. Modulates the HPA axis (your stress response system), associated with improved sleep quality, reduced anxiety, and immune balance.",
                  tag: 'Stress & Sleep',
                },
                {
                  name: 'Cordyceps (C. militaris / C. sinensis)',
                  role: 'The Energy Optimizer',
                  detail: "Improves cellular ATP production (how your cells make energy). Associated with improved endurance, VO2 max, and mitochondrial function. Especially valuable for people who feel physically tired alongside mental fatigue.",
                  tag: 'Energy & Endurance',
                },
              ].map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6"
                  style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.1)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-serif font-bold text-white">{m.name}</h3>
                      <p className="font-mono text-[8px] tracking-[0.3em] uppercase mt-1" style={{ color: RG }}>{m.role}</p>
                    </div>
                    <span className="font-mono text-[7px] tracking-[0.2em] uppercase px-3 py-1" style={{ background: 'rgba(230,183,173,0.08)', color: 'rgba(230,183,173,0.6)', border: '1px solid rgba(230,183,173,0.15)' }}>
                      {m.tag}
                    </span>
                  </div>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{m.detail}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Who It's For */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Who Benefits Most From Mushroom Coffee?
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Mushroom coffee isn't for everyone,  it's for a specific type of person who's outgrown what regular coffee offers. You'll get the most from it if any of these sound like you:</p>
              <ul className="space-y-3 my-6">
                {[
                  'You drink regular coffee and experience anxiety, jitters, or a harsh crash afterward',
                  'You want more sustained focus, not just a 45-minute spike followed by fog',
                  'You\'re interested in long-term brain health and prevention',
                  'You want to reduce overall caffeine intake without losing your morning ritual',
                  'You\'re a high-performer,  entrepreneur, creator, athlete,  who needs clean, reliable energy',
                  'You\'ve tried regular supplements and prefer getting functional compounds through food',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RG }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-5">
              {FAQ.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6"
                  style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)' }}
                >
                  <h3 className="font-serif font-bold text-white mb-3">{item.question}</h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="Mushroom Coffee Benefits: The Complete Science-Backed Guide (2025)" url="/journal/mushroom-coffee-benefits" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>Ready to Try It?</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Torch Republic Mushroom Coffee</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Instant. No equipment. Lion's Mane + Chaga in every blend,  ready in 30 seconds. Your ritual shouldn't require a ceremony to prepare.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
                Shop Mushroom Coffee →
              </Link>
              <Link to="/journal/lions-mane-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8" style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
                Deep Dive: Lion's Mane Science →
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult your physician before adding any supplement to your routine.
        </p>
      </div>
    </div>
  );
}