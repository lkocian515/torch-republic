import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Homepage sections
import HeroSection from '../components/home/HeroSection';
import HomeTrustRow from '../components/home/HomeTrustRow';
import BundleSection from '../components/home/BundleSection';
import ShopByCategory from '../components/home/ShopByCategory';
import BlendComparisonSection from '../components/home/BlendComparisonSection';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
import ComparisonTable from '../components/home/ComparisonTable';
import IngredientClarity from '../components/home/IngredientClarity';
import FounderNote from '../components/home/FounderNote';
import ReviewsSection from '../components/home/ReviewsSection';
import FAQSection from '../components/mushroom/FAQSection';
import FinalCTA from '../components/mushroom/FinalCTA';

const RG = '#E6B7AD';

// Sticky mobile CTA — appears after scrolling past hero
function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!pastHero) return null;

  return (
    <div
      className="md:hidden fixed bottom-16 left-0 right-0 z-30 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        to="/build-your-ritual"
        className="pointer-events-auto font-mono uppercase tracking-[0.3em] text-center transition-all hover:opacity-90"
        style={{
          background: RG,
          color: '#050505',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '13px 32px',
          borderRadius: '999px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
        }}
      >
        Build My Ritual Bundle →
      </Link>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Torch Republic Coffee Company | Premium Instant Coffee, Mushroom Coffee & Matcha',
    description: 'Discover premium instant coffee, functional mushroom coffee, ceremonial matcha, and ritual bundles designed for clarity, focus, and intentional daily energy. No machine needed. Shop coffee-forward blends made for modern wellness.',
    url: '/',
    type: 'website',
    faq: [
      { question: 'What is mushroom coffee?', answer: 'Mushroom coffee combines premium instant coffee with functional mushrooms like Lion\'s Mane and Chaga. Torch Republic blends create an easy daily ritual for focus, clarity, and intention without compromising coffee taste.' },
      { question: 'Does mushroom coffee taste like regular coffee?', answer: 'Yes, it tastes primarily like coffee. Torch Republic blends are coffee-forward with smooth, rich flavor. The mushrooms add subtle earthiness but don\'t overpower the coffee taste.' },
      { question: 'Do I need a coffee machine?', answer: 'No. All Torch Republic products are instant format — just add hot water, stir, and enjoy. No machine, pods, or complicated prep needed.' },
      { question: 'How many servings are in each tube?', answer: 'Mushroom coffee and classic coffee tubes contain 27 servings. Matcha tins contain 25 servings. Each serving is designed for one cup.' },
      { question: 'What makes Torch Republic different?', answer: 'Torch Republic combines premium instant coffee with functional mushrooms in a convenient, no-machine format. Our blends are designed for intentional daily rituals with coffee-forward taste and wellness-focused ingredients.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>

      {/* 1. Hero */}
      <HeroSection />

      {/* 1b. Trust Row */}
      <HomeTrustRow />

      {/* 2. Start With a Ritual Bundle — primary conversion section */}
      <BundleSection />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. Compare the Blends */}
      <BlendComparisonSection />

      {/* 5. Why Torch Republic */}
      <WhyTorchRepublic />

      {/* 5b. How Torch Republic Compares */}
      <ComparisonTable />

      {/* 6. Ingredient Transparency */}
      <IngredientClarity />

      {/* 7. Founder Note */}
      <FounderNote />

      {/* 8. Reviews */}
      <ReviewsSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}