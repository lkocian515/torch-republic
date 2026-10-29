/**
 * Founder Story Page
 * Route: /founder-story
 * "Why I Walked Away From Coffee Pods"
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, Quote } from 'lucide-react';

const RG = '#B86543';

const SECTIONS = [
  {
    id: 'pods',
    heading: 'The Pod Problem Nobody Talks About',
    body: `It started with a simple calculation. I was going through two boxes of K-Cups a week — about 20 pods. At roughly $0.70-$1.00 per pod, that was $14-$20 a week, or nearly $80 a month, just for the convenience of not having to deal with a coffee maker. And every single one of those pods — those tiny, non-recyclable plastic cups — went straight into a landfill. Not some of them. All of them.

I'd been using a pod machine for three years without doing that math. When I finally did, I felt genuinely embarrassed. Not performatively — just the quiet embarrassment of realizing I'd been sleepwalking through a habit that wasn't actually serving me.

But here's the thing: I didn't stop using pods right away. Because the ritual had become automatic. Wake up, press a button, get coffee. It was frictionless. And friction-reduction is how most bad habits survive — not because they're secretly good, but because removing them requires energy you don't have at 6am.`
  },
  {
    id: 'travel',
    heading: 'The Hotel Room That Changed Everything',
    body: `In early 2023, I was traveling for work — three cities in four days. Every hotel room had a machine that took pods. And every pod made the same mediocre coffee. Hotel lobby. Airport gate. Conference room.

At some point I thought: I'm drinking the exact same cup of coffee in every single place I go, and none of them are good.

There's something demoralizing about that. Not catastrophically — I'm talking about the small daily disappointment of going through the motions of a ritual that has no substance anymore. I was filling a cup. I wasn't actually doing anything intentional.

I remembered that my grandfather kept a small tin of instant coffee in his kitchen. He made it with a kettle — no machine, no pods. He drank it deliberately. Slowly. In the same chair, at the same time, every morning. The ritual was in the intention, not the equipment.

That's when I started thinking about what I actually wanted from a morning coffee ritual.`
  },
  {
    id: 'mushrooms',
    heading: 'Finding Functional Mushrooms (And Why I Was Skeptical)',
    body: `I want to be honest about this: I was deeply skeptical of mushroom coffee when I first encountered it.

The marketing around functional mushrooms often sounds like pseudoscience dressed up in wellness language. "Unlock your brain's potential." "Activate your focus." I'd seen enough supplement industry hype to distrust anything that promised transformation in a cup.

So I did what I should have done — I read the research.

What I found was more nuanced than either the enthusiastic marketing or the cynical dismissal. There is genuine peer-reviewed research behind certain functional mushroom species, particularly around cognitive support and antioxidant properties. These are not dramatic claims. They are modest, real findings.

None of them are drugs. None of them will replace medical treatment. But as additions to a daily coffee ritual &mdash; for people who already drink coffee? The research was compelling enough that I wanted to try it consistently.

We are still verifying the exact species, extract types, and amounts in our current formula against the physical package label. Until that verification is complete, we are not publishing specific mushroom names or extract claims on our marketing surfaces.`
  },
  {
    id: 'building',
    heading: 'What We Built — and Why We Built It This Way',
    body: `Torch Republic started from a specific frustration: functional mushroom coffee existed, but it was either expensive, poorly formulated, or came in formats that were inconvenient.

We wanted something with the simplicity of instant coffee &mdash; no machine, no cleanup, no pods &mdash; combined with functional mushroom extracts. And we wanted it to taste like coffee. Not like a health supplement. Not like dirt. Like a really good cup of coffee that happened to have functional mushroom extracts in it.

The instant format was non-negotiable. Not because it's easier to manufacture &mdash; it isn't. But because the entire philosophy of a morning ritual is that it should remove friction, not add it. You shouldn't need to grind beans, calibrate a machine, or clean a portafilter to participate in your own morning.

We started with a focused collection: a classic instant coffee and a mushroom coffee. Two products, made well, instead of a broad catalog that dilutes attention. A classic coffee drinker who wants simplicity is not the same as someone exploring functional mushroom coffee &mdash; both deserve a product built specifically for them.`
  },
  {
    id: 'ritual',
    heading: 'Why "Ritual" Is the Right Word',
    body: `I've been asked why we use the word "ritual" so much. It sounds spiritual — or worse, pretentious.

Here's the practical reason: a ritual is a habit with intention attached. You can drink coffee mindlessly (I did, for years) or you can drink coffee as a deliberate signal to yourself that a particular kind of time is beginning.

The research on morning routines consistently shows that the quality of a morning ritual affects productivity, mood, and cognitive performance for hours after. Not because the ritual is magic — but because it creates a psychological boundary between sleep and work, between passive and active states of mind.

Coffee is already a ritual trigger for hundreds of millions of people. The smell, the warmth, the routine of preparation — these are sensory anchors that the brain associates with waking up, getting focused, beginning.

Mushroom coffee doesn't change that. It just adds functional ingredients to a ritual that was already happening. For people who already drink coffee every morning, that's a genuinely intelligent addition — not a disruption.

That's the idea behind Torch Republic. Not a supplement brand. Not just a coffee company. A framework for morning intention — where the simplest possible preparation leads to the most considered start to the day.`
  },
  {
    id: 'plastic',
    heading: 'The Pod Count',
    body: `Here's a number I think about sometimes.

An estimated 56 billion K-Cup pods were used in 2019 alone. If you lined them up, they would circle the Earth more than 10 times. The vast majority are not recyclable in standard municipal systems. Most go directly to landfill.

John Sylvan, who invented the K-Cup, has publicly said he regrets the invention specifically because of the waste.

I'm not writing this to make coffee pod users feel guilty. I used them for three years. Guilt isn't a useful driver of behavior change — but awareness is.

If you drink two cups of coffee a day from a pod machine, switching to premium instant coffee saves approximately $400-600 per year and eliminates roughly 700+ pods from landfill. That's a real number, for one person, per year.

Torch Republic isn't positioned as an environmental brand. We're a coffee and wellness brand. But one of the simplest, most concrete things about our format is this: no pod. No capsule. No machine. You add water to a scoop of freeze-dried coffee powder. That's it.`
  },
];

export default function FounderStory() {
  useSEO({
    title: 'Why I Walked Away From Coffee Pods | Torch Republic Founder Story',
    description: 'The founder story behind Torch Republic — why we walked away from coffee pods and built a focused instant coffee ritual brand. Read the full story.',
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
              On convenience, waste, functional mushrooms, and why a better morning ritual doesn't require a machine.
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
              I was going through 20 pods a week. Every one went to a landfill. When I finally did the math, I felt the quiet embarrassment of realizing I'd been sleepwalking through a habit that wasn't serving me.
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
              Torch Republic is premium instant coffee and functional mushroom coffee. Add hot water. That's it. Free shipping $45+.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/build-your-ritual"
                className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90"
                style={{ background: RG, color: '#FBF8F1' }}>
                Build Your Ritual Bundle <ArrowRight size={13} />
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
      <section className="px-6 md:px-10 pb-16" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
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

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.04)' }}>
        <p className="font-mono text-[7px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: '#5F5145', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. Torch Republic products are not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}