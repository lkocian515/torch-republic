import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';

const RITUAL_STEPS = [
  { time: '0:00', step: 'Wake,  No Phone', desc: "Your cortisol peaks within 30-45 minutes of waking (the Cortisol Awakening Response). This is your brain's natural alert signal. Don't override it with social media anxiety,  use it." },
  { time: '0:15', step: 'Hydrate First', desc: "500ml of water before anything else. You've been fasting and dehydrating for 7-9 hours. Cognitive performance is measurably impaired at just 1-2% dehydration." },
  { time: '0:30', step: 'Natural Light', desc: 'Get outside or sit by a window. Morning sunlight triggers serotonin production and sets your circadian rhythm,  directly affecting sleep quality 16 hours later.' },
  { time: '0:45', step: 'Make Your Coffee or Matcha', desc: "Now,  not before. Waiting 45-90 minutes after waking before caffeine means you're working with your cortisol curve, not against it. The result is a longer, more effective caffeine window." },
  { time: '1:00', step: 'Focused Work Block Begins', desc: "Start your most cognitively demanding task while you're in peak alertness. This is your brain's highest-performance window,  protect it from meetings, email, and passive tasks." },
];

const FAQ = [
  { question: 'What is the best morning ritual for productivity?', answer: "Research consistently points to three elements: consistent wake time, morning light exposure, and strategic caffeine timing (45-90 min after waking to avoid cortisol stacking). Adding a focused deep-work block before checking email or social media multiplies the effect of all three." },
  { question: 'When is the best time to drink coffee in the morning?', answer: "The peak of your Cortisol Awakening Response (CAR) is within 30-45 minutes of waking. Consuming caffeine during this window means you're adding stimulation on top of peak cortisol,  which increases anxiety and builds tolerance faster. Waiting until 9:30-10:00 am (for most people) uses caffeine to extend alertness after your natural peak begins to drop." },
  { question: 'Is mushroom coffee good for a morning ritual?', answer: "Yes,  particularly for people who want a ritual that supports focus rather than just stimulation. The combination of lower caffeine (40-60 mg), Lion's Mane for NGF stimulation, and adaptogenic mushrooms for cortisol moderation creates a morning energy profile that sustains focus through late morning and early afternoon as part of a balanced routine." },
  { question: 'How do I start a healthy morning routine?', answer: "Start with one change, not ten. The highest-leverage first change is consistent wake time,  your circadian rhythm is the foundation everything else builds on. Once that's stable, add hydration, then light exposure, then strategic caffeine timing. Don't try to install a complex 10-step routine overnight; it won't stick." },
  { question: 'What should I drink in the morning for energy and focus?', answer: "For most people, water first, then 45-90 minutes later either coffee or matcha. If you experience anxiety, jitters, or crashes from regular coffee, mushroom coffee (40-60 mg caffeine plus Lion's Mane plus adaptogens) tends to produce cleaner energy. If you want a lower-caffeine option, ceremonial matcha is excellent." },
];

export default function MorningRitualGuide() {
  useSEO({
    title: 'The Science-Backed Morning Ritual for Focus and Energy (2025 Guide)',
    description: 'Build a morning ritual that actually works,  cortisol timing, strategic caffeine, light exposure, and why your morning coffee order matters for all-day performance.',
    url: '/journal/morning-ritual-for-focus',
    type: 'article',
    faq: FAQ,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Morning Ritual Guide', url: '/journal/morning-ritual-for-focus' },
    ],
    article: {
      author: 'Torch Republic',
      datePublished: '2025-04-01T08:00:00Z',
      dateModified: '2025-06-01T08:00:00Z',
      section: 'Habits',
      keywords: ['morning ritual', 'morning routine for productivity', 'best morning routine', 'coffee morning ritual', 'focus morning habits'],
    },
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Habits · Updated June 2025
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            The Science-Backed Morning Ritual for Focus and Energy
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Most morning routines are productivity theater. This one is built on chronobiology, neuroscience, and one of the most repeatable patterns in high-performance research.
          </p>
        </motion.div>
      </section>

      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[900px] mx-auto space-y-16">

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Why Your Morning Determines the Rest of Your Day
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Your circadian rhythm governs the timing of nearly every physiological and cognitive process in your body. Cortisol, melatonin, body temperature, working memory, reaction time, emotional regulation,  all follow a predictable 24-hour pattern. The first 90 minutes after waking are where that pattern is set.</p>
              <p>Get those 90 minutes right, and you're working with a biological system designed to make you alert, focused, and effective. Get them wrong,  phone immediately, coffee before cortisol peaks, artificial light instead of sunlight,  and you're fighting that system for the rest of the day.</p>
              <p>The Cortisol Awakening Response (CAR) is one of the most replicated findings in chronobiology. Morning light exposure is the most powerful zeitgeber (time signal) for your circadian clock. Caffeine timing has been studied extensively by sleep researchers including Dr. Matthew Walker and Andrew Huberman's lab at Stanford.</p>
            </div>
          </section>

          {/* The Ritual */}
          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              The 5-Step Morning Protocol
            </motion.h2>
            <div className="space-y-4">
              {RITUAL_STEPS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-5 p-6" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.1)' }}>
                  <div className="flex-shrink-0 w-14 text-center">
                    <p className="font-mono font-bold text-base" style={{ color: RG }}>{s.time}</p>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(230,183,173,0.3)' }}>min</p>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-white text-lg mb-2">{s.step}</h3>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#FFFFFF' }}>
              Why Caffeine Timing Is the Most Underrated Variable
            </motion.h2>
            <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.85 }}>
              <p>Most people drink coffee the moment they wake up. This is the least effective time to consume it,  your cortisol is already peaking. Adding stimulation on top of stimulation doesn't multiply the effect: it accelerates tolerance and worsens the crash.</p>
              <p>Use caffeine to extend alertness after your natural cortisol peak, not to spike it before it peaks. For most people with a 6-7 am wake time, this means waiting until 9:30-10:30 am for coffee. The result is a longer focus window (3-4 hours vs 1.5-2 hours), less tolerance buildup, and a softer afternoon transition.</p>
              <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}40` }}>
                <p className="font-heading text-base" style={{ color: 'rgba(240,235,225,0.8)', lineHeight: 1.85 }}>
                  <strong style={{ color: RG }}>Practical application:</strong> If you use instant coffee or instant matcha, the 30-second preparation time makes it easy to delay your first cup until the optimal window. No machine to run before your eyes are fully open.
                </p>
              </div>
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
            <ShareButtons title="The Science-Backed Morning Ritual for Focus and Energy (2025 Guide)" url="/journal/morning-ritual-for-focus" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>Build Your Ritual</p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>Coffee and Matcha Built for the Morning</h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Instant. No machine. Ready in 30 seconds. Mushroom coffee, classic coffee, ceremonial matcha.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
                Shop All Blends
              </Link>
              <Link to="/quiz" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8" style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
                Find Your Blend
              </Link>
            </div>
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