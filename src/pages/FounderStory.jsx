/**
 * Founder Story Page
 * Route: /founder-story
 * A concise, first-person note on why Torch Republic exists.
 * The founder's name appears once, as an understated signature at the bottom.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, Quote } from 'lucide-react';

const RG = '#B86543';

const SECTIONS = [
  {
    id: 'habit',
    heading: 'The Habit I Stopped Questioning',
    body: `I used a pod machine for about three years. Two boxes of pods a week, one cup after another, and every empty pod went straight into the trash. I never did the math until I finally did.

What bothered me wasn't really the money. It was noticing how automatic the whole thing had become. Wake up. Press the button. Drink. I wasn't making a cup of coffee so much as going through the motions of one.

It's an easy habit to keep, because it asks nothing of you. That's exactly what makes it hard to notice.`,
  },
  {
    id: 'looking-for',
    heading: 'What I Was Actually Looking For',
    body: `What I wanted was simple: a cup I could make in about a minute that still felt worth slowing down for. No machine to clean, no pods to buy, no ritual built around equipment I'd have to maintain.

The more I thought about it, the clearer the idea became. The part of a morning coffee that matters isn't the machinery. It's the two quiet minutes you give it — a warm cup in your hands, and the decision to start the day on purpose instead of on autopilot.

That's the reason Torch Republic exists. Not to add another step to your morning, but to make the step you already take a better one.`,
  },
  {
    id: 'format',
    heading: 'Why Instant',
    body: `Instant coffee made the most sense, and it still does. Add water, stir, done — hot or iced, at home or in a hotel room, with no pods and nothing to descale or replace.

It also had to taste like coffee. Not like a supplement, not like health food, not like a compromise. A really good cup that happens to be easy. If a convenience product doesn't taste good, you stop using it, and then it isn't convenient at all.`,
  },
  {
    id: 'collection',
    heading: 'Two Products, Chosen Carefully',
    body: `Rather than build a crowded catalog, we started with two: a classic instant coffee and an instant mushroom coffee. One is for the person who wants a straightforward cup. The other is for someone curious about functional mushrooms in the coffee they already drink. Both deserve to be made well on their own terms.

We keep the descriptions on the product pages specific and the ingredient information in one place, so you can see what's in the cup without sorting through vague language. We don't make health claims about our coffee, and we don't describe it as anything more than what it is: a good cup, made simple.`,
  },
  {
    id: 'simpler',
    heading: 'A Simpler Way to Start the Day',
    body: `The torch in our name is about awareness — a small, steady light rather than a spotlight. The Republic is the everyday part: ordinary mornings, repeated quietly, made a little more deliberate.

That's what I hope the coffee does for you. Not a transformation. Just a better couple of minutes at the start of your day, and a cup you actually look forward to.`,
  },
];

export default function FounderStory() {
  useSEO({
    title: 'The Story Behind Torch Republic | A Note from the Founder',
    description: 'Why Torch Republic exists: a simple, intentional instant coffee ritual without pods or machines, told by the founder.',
    url: '/founder-story',
    type: 'article',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Our Story', url: '/founder-story' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#FBF8F1', color: '#293626' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-16 pb-16" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-5" style={{ color: 'rgba(230,183,173,0.5)' }}>
              Founder Story
            </p>
            <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#293626', lineHeight: 1.1 }}>
              Why I Walked Away<br />From Coffee Pods
            </h1>
            <p className="font-heading" style={{ fontSize: '1.1rem', color: '#5F5145', lineHeight: 1.9, fontWeight: 300, maxWidth: '600px', margin: '0 auto' }}>
              On convenience, waste, and why a better morning cup doesn't need a machine.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-8 h-px" style={{ background: `${RG}40` }} />
              <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
                Torch Republic · Corpus Christi, TX
              </p>
              <div className="w-8 h-px" style={{ background: `${RG}40` }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#F7F1E7' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-start gap-5">
            <Quote size={28} style={{ color: `${RG}40`, flexShrink: 0, marginTop: 4 }} />
            <p className="font-serif italic" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', color: '#5F5145', lineHeight: 1.65 }}>
              I was going through twenty pods a week, and every one of them went in the trash. When I finally did the math, the habit had already stopped serving me.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Sections */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-3xl mx-auto space-y-16">
          {SECTIONS.map((section, i) => (
            <motion.section key={section.id}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: `${RG}50` }}>0{i + 1}</span>
                <div className="h-px flex-1" style={{ background: `${RG}15` }} />
              </div>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', color: '#293626', lineHeight: 1.2 }}>
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.body.split('\n\n').map((para, pi) => (
                  <p key={pi} className="font-heading" style={{ fontSize: '0.975rem', color: '#5F5145', lineHeight: 1.95, fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </article>

      {/* Divider */}
      <div className="px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${RG}30, transparent)` }} />
        </div>
      </div>

      {/* CTA Section */}
      <section className="px-6 md:px-10 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
              Start the Ritual
            </p>
            <h2 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#293626', lineHeight: 1.2 }}>
              No machine. No pods. No compromise.
            </h2>
            <p className="font-heading mb-10" style={{ fontSize: '0.95rem', color: '#5F5145', lineHeight: 1.85, fontWeight: 300 }}>
              Torch Republic is premium instant coffee and functional mushroom coffee. Add hot or cold water. That's it. Free shipping $45+.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90"
                style={{ background: RG, color: '#FBF8F1' }}>
                Shop the Collection <ArrowRight size={13} />
              </Link>
              <Link to="/quiz"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase py-4 px-8 transition-all hover:opacity-80"
                style={{ border: `1px solid ${RG}50`, color: RG }}>
                Find My Blend →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Reading */}
      <section className="px-6 md:px-10" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-3xl mx-auto pt-14">
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: '1.3rem', color: '#293626' }}>Continue Reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Our Ingredients', path: '/ingredients' },
              { title: 'Instant Coffee vs. K-Cups', path: '/compare/instant-coffee-vs-k-cups' },
              { title: 'How It Works', path: '/how-it-works' },
              { title: 'Shop Coffee', path: '/shop' },
            ].map((link, i) => (
              <Link key={i} to={link.path}
                className="p-4 flex items-center justify-between transition-all"
                style={{ background: '#FFFFFF', border: '1px solid #E4D8C9' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E4D8C9'}>
                <span className="font-heading text-sm" style={{ color: '#293626' }}>{link.title}</span>
                <ArrowRight size={13} style={{ color: `${RG}60` }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Signature */}
      <section className="px-6 md:px-10 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic" style={{ fontSize: 'clamp(1.45rem, 4vw, 1.9rem)', color: '#293626', lineHeight: 1.4, letterSpacing: '0.02em' }}>
            Lisa Marie Kocian
          </p>
          <p className="font-mono text-[8px] tracking-[0.3em] uppercase mt-2" style={{ color: '#5F5145' }}>
            Founder
          </p>
        </div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: '#5F5145', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. Torch Republic products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}