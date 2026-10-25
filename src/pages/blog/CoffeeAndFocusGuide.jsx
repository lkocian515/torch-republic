import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Brain, Clock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';

const FAQ = [
  { question: 'Does coffee actually help with focus and concentration?', answer: "Yes,  caffeine is one of the most well-researched cognitive enhancers available. It works by blocking adenosine receptors, which reduces the sensation of tiredness and increases dopamine and norepinephrine activity. The result is improved alertness, concentration, and reaction time. The catch: the effect is temporary, tolerance builds quickly, and high doses often impair focus through anxiety and overstimulation." },
  { question: 'How much coffee should I drink for focus?', answer: "Research consistently shows that lower to moderate caffeine doses (40–100 mg, or roughly ½–1 cup) produce better cognitive outcomes than high doses. Beyond about 200 mg, anxiety and jitteriness begin to interfere with the focus benefit. The optimal dose for most people is around 50–75 mg,  which is below the amount in a standard coffee cup." },
  { question: 'Why does coffee sometimes make me more anxious and less focused?', answer: "Caffeine triggers cortisol release,  the same stress hormone your body uses in 'fight or flight' situations. In moderate doses, this creates alertness. In high doses, especially in people with anxiety sensitivity, it creates jitteriness, racing thoughts, and difficulty concentrating. Mushroom coffee addresses this by lowering the base caffeine dose and adding adaptogens that moderate the cortisol response." },
  { question: 'What is the best time to drink coffee for focus?', answer: "Cortisol is naturally highest between 6–9 am for most people,  making that the worst time for caffeine (since you're already alert and you're increasing tolerance). Research suggests waiting until 9:30–11:30 am produces better focus benefits and less afternoon tolerance. If you use instant coffee that takes 30 seconds to prepare, this timing strategy is easy to implement." },
  { question: 'Does mushroom coffee help with focus more than regular coffee?', answer: "For most people, yes,  because it combines caffeine with Lion's Mane, which stimulates Nerve Growth Factor production and improves cognitive function through a completely different pathway. The combination of lower caffeine + NGF stimulation tends to produce cleaner, less anxious focus than high-dose regular coffee." },
];

export default function CoffeeAndFocusGuide() {
  useSEO({
    title: 'Coffee and Focus: The Science of How Caffeine Affects Your Brain (2025)',
    description: 'How caffeine actually improves focus, why it sometimes backfires, the optimal dose for concentration, and how functional mushroom coffee changes the equation.',
    url: '/journal/coffee-and-focus',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Coffee and Focus', url: '/journal/coffee-and-focus' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-03-15T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Science',
      keywords: ['coffee and focus', 'caffeine and concentration', 'best coffee for focus', 'mushroom coffee focus', 'nootropic coffee'],
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
            Coffee and Focus: What Caffeine Actually Does to Your Brain
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            The mechanism is elegant. The side effects are real. The optimal dose is probably lower than what you're drinking. Here's the full picture.
          </p>
        </motion.div>
      </section>

      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              How Caffeine Actually Creates Focus
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Caffeine's primary mechanism is adenosine receptor antagonism. Adenosine is a neurotransmitter that accumulates throughout the day and creates the sensation of tiredness,  it's your brain's "time to sleep" signal. Caffeine has the same molecular shape as adenosine and slots into the same receptors, blocking them without activating them.</p>
              <p>The result: adenosine can't bind. Your brain doesn't register tiredness. Dopamine and norepinephrine,  both associated with alertness, motivation, and executive function,  become more active. You feel awake, focused, and motivated.</p>
              <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.85 }}>
                  <strong style={{ color: RG }}>Important nuance:</strong> caffeine doesn't create energy. It borrows alertness by blocking the signal that would otherwise tell you to rest. The adenosine is still accumulating,  the debt doesn't disappear, it's deferred. This is why the crash happens.
                </p>
              </div>
              <p>This mechanism is elegant and effective for short-term performance. The challenge comes with dose and timing,  both of which most coffee drinkers get wrong.</p>
            </div>
          </section>

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              The Inverted U: Why More Coffee Isn't Better for Focus
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>The relationship between caffeine and cognitive performance follows an inverted-U curve,  a classic Yerkes-Dodson pattern. As dose increases from zero, performance improves. But beyond a threshold, additional caffeine begins to impair performance.</p>
              <p>The reason: caffeine's secondary mechanism is cortisol stimulation. It triggers the HPA axis (your stress response system), raising cortisol and adrenaline. In moderate doses, this creates alertness. In high doses, it creates anxiety, racing thoughts, reduced working memory, and impaired decision-making,  all of which directly undermine focus.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {[
                  { dose: '40–80 mg', effect: 'Sweet Spot', desc: 'Improved alertness, focus, and reaction time. Minimal anxiety. Best for deep work.', color: '#6EBD8E' },
                  { dose: '80–150 mg', effect: 'Mixed Results', desc: 'Strong alertness but noticeable anxiety in sensitive individuals. Tolerance builds quickly.', color: RG },
                  { dose: '200+ mg', effect: 'Diminishing Returns', desc: 'Anxiety often outweighs focus benefits. Jitteriness, reduced working memory, crash risk.', color: '#E06C6C' },
                ].map(d => (
                  <div key={d.dose} className="p-5 text-center" style={{ background: '#0E0C0B', border: `1px solid ${d.color}30` }}>
                    <p className="font-mono font-bold text-lg mb-1" style={{ color: d.color }}>{d.dose}</p>
                    <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: d.color + '80' }}>{d.effect}</p>
                    <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.7 }}>{d.desc}</p>
                  </div>
                ))}
              </div>
              <p>A standard 8 oz coffee contains ~95 mg of caffeine. A large specialty coffee drink can contain 200–400 mg. The sweet spot for focus is well below what most people actually consume.</p>
            </div>
          </section>

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Where Mushroom Coffee Changes the Equation
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Mushroom coffee is specifically engineered around this problem. By reducing base caffeine to 40–60 mg and adding functional compounds,  particularly Lion's Mane for NGF stimulation and adaptogenic mushrooms for cortisol moderation,  it addresses the two main failure modes of regular coffee:</p>
              <ul className="space-y-3 my-6">
                {[
                  { issue: 'Too much caffeine causing anxiety', solution: "Lower base caffeine keeps you in the 'sweet spot' without overshooting into anxiety territory" },
                  { issue: 'Caffeine only blocking tiredness (not creating focus)', solution: "Lion's Mane stimulates Nerve Growth Factor,  directly supporting the neurological architecture of focus, not just masking tiredness" },
                  { issue: 'Adaptogens missing from regular coffee', solution: 'Reishi and Chaga moderate cortisol response, smoothing the adrenal spike that caffeine creates' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)' }}>
                    <div>
                      <p className="font-heading text-sm font-semibold mb-1" style={{ color: '#E06C6C' }}>Problem: {item.issue}</p>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)' }}>
                        <span style={{ color: '#6EBD8E' }}>Solution: </span>{item.solution}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Frequently Asked Questions
            </motion.h2>
            <div className="space-y-5">
              {FAQ.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-6" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)' }}>
                  <h3 className="font-serif font-bold text-white mb-3">{item.question}</h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="Coffee and Focus: The Science of How Caffeine Affects Your Brain (2025)" url="/journal/coffee-and-focus" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>Optimize Your Focus</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Coffee Built for Deep Work</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              40–60 mg caffeine. Lion's Mane for NGF. Adaptogens for the cortisol curve. The sweet spot, in a cup.
            </p>
            <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
              Try Mushroom Coffee →
            </Link>
          </motion.div>
        </div>
      </article>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}