import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const RG = '#E6B7AD';

const FAQS = [
  {
    question: 'Is this instant coffee or ground coffee?',
    answer: 'This is 100% instant coffee powder. No grinding, no brewing equipment needed. Just add hot water, stir, and sip. The fine powder dissolves completely for a smooth, grit-free experience.',
  },
  {
    question: 'Does it taste like mushrooms?',
    answer: 'Not at all. The functional mushrooms are completely undetectable in taste. What you get is smooth, roasty, coffee-forward flavor with notes of cocoa and a clean finish. The mushrooms provide wellness benefits without affecting the taste.',
  },
  {
    question: 'How much caffeine is in each serving?',
    answer: 'Each serving contains approximately 100mg of caffeine, similar to a standard 8oz cup of regular coffee. This provides balanced, sustained energy without the jitters or crash.',
  },
  {
    question: 'How many servings are in each tube?',
    answer: 'Each 1.9oz (54g) tube contains 27 servings. With daily use, one tube lasts approximately one month. The included scoop makes it easy to measure the perfect 2g serving every time.',
  },
  {
    question: 'Can I drink it at night?',
    answer: 'Yes, though it does contain caffeine. If you\'re sensitive to caffeine in the evenings, we recommend our MoonCap Restore or DreamCap Blend, which are crafted for evening rituals. For daytime blends like GlowMind or SunCap, we suggest enjoying them before 2pm.',
  },
  {
    question: 'Can I subscribe and cancel anytime?',
    answer: 'Absolutely. Our subscription program saves you 20% on every order with complete flexibility. You can pause, skip, or cancel anytime online — no phone calls, no commitments, no hidden fees.',
  },
  {
    question: 'Are the mushrooms extracts or powders?',
    answer: 'We use organic mushroom extract blend (Lion\'s Mane, Cordyceps and Reishi). Extracts are more bioavailable than raw powders, meaning your body can absorb and use the beneficial compounds more effectively. Our dual-extraction process ensures you get the full spectrum of benefits.',
  },
  {
    question: 'Who should consult a doctor before use?',
    answer: 'As with any supplement, pregnant or nursing women, individuals taking medication, or those with known medical conditions should consult a healthcare professional before use. If you have a mushroom allergy, please do not consume this product.',
  },
];

export default function ProductPageFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        padding: 'clamp(48px, 6vw, 80px) 24px',
      }}
    >
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(32px, 5vw, 48px)' }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase"
            style={{ color: 'rgba(230,183,173,0.5)', marginBottom: '12px' }}
          >
            FAQ
          </p>
          <h2
            className="font-serif font-bold"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#F5EFE6',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Common Questions
          </h2>
          <p
            className="font-heading"
            style={{
              fontSize: '0.93rem',
              color: 'rgba(210,195,175,0.65)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about our instant mushroom coffee.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div style={{ marginBottom: '40px' }}>
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                borderBottom: '1px solid rgba(230,183,173,0.08)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left transition-colors"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  className="font-heading"
                  style={{
                    fontSize: '0.95rem',
                    color: openIndex === i ? '#FFFFFF' : 'rgba(247,241,232,0.65)',
                    fontWeight: openIndex === i ? 400 : 300,
                    lineHeight: 1.6,
                    paddingRight: '16px',
                  }}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  style={{
                    color: RG,
                    flexShrink: 0,
                    transition: 'transform 0.3s ease',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-5"
                >
                  <p
                    className="font-heading"
                    style={{
                      fontSize: '0.92rem',
                      color: 'rgba(247,241,232,0.55)',
                      fontWeight: 300,
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* FDA Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="font-mono text-[7px] tracking-[0.15em] uppercase text-center"
          style={{
            color: 'rgba(255,255,255,0.2)',
            lineHeight: 1.8,
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </motion.p>
      </div>
    </section>
  );
}