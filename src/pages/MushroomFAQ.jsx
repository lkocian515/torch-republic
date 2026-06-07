import React from 'react';
import { motion } from 'framer-motion';
import FAQSection from '../components/mushroom/FAQSection';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';

export default function MushroomFAQ() {
  useSEO({
    title: 'FAQ | Torch Republic Coffee Company | Instant Coffee, Mushroom Coffee & Matcha',
    description: 'Answers about Torch Republic instant coffee, mushroom coffee, and matcha. Learn about taste, caffeine, preparation, ingredients, shipping, and choosing your blend.',
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Torch Republic Coffee Company?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Torch Republic is a premium instant coffee brand specializing in functional mushroom coffee and ceremonial matcha blends. Our products are crafted for clarity, focus, energy, and intentional daily ritual."
        }
      },
      {
        "@type": "Question",
        "name": "Do your products contain caffeine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our coffee and mushroom coffee blends contain approximately 100mg of caffeine per serving. Our matcha blends contain natural caffeine from green tea leaves. We offer both caffeinated and caffeine-free options."
        }
      },
      {
        "@type": "Question",
        "name": "How do I prepare your instant coffee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply add one scoop (2g) to 8-12 oz of hot water, milk, or your preferred creamer. Stir until fully dissolved. For iced coffee, dissolve in hot water first, then pour over ice."
        }
      },
      {
        "@type": "Question",
        "name": "What are the benefits of mushroom coffee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our mushroom coffee combines premium Arabica coffee with functional mushrooms like Lion's Mane and Chaga. Lion's Mane supports focus and cognitive function, while Chaga provides antioxidants and immune support."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer subscriptions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our subscription program saves you 20% on every order with free shipping. You can pause, skip, or cancel anytime online with no commitments."
        }
      }
    ]
  };
  return (
    <div style={{ backgroundColor: '#111111', color: '#F0EBE1', minHeight: '100vh' }}>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      <section className="px-6 py-24 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            FAQ
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h1>
          <p className="font-heading max-w-lg mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Everything you need to know about Torch Republic instant coffee, mushroom coffee, and matcha.
          </p>
        </motion.div>
      </section>
      <FAQSection />
      <section className="px-6 py-16 text-center">
        <Link to="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: '#E6B7AD', color: '#080808', padding: '14px 32px' }}>
          Shop the Blends →
        </Link>
      </section>
    </div>
  );
}