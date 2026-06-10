import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Homepage sections
import HeroSection from '../components/home/HeroSection';
import HomeTrustRow from '../components/home/HomeTrustRow';
import StartHereSection from '../components/home/StartHereSection';
import BundleSection from '../components/home/BundleSection';
import ShopByCategory from '../components/home/ShopByCategory';
import BlendComparisonSection from '../components/home/BlendComparisonSection';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
import TrustSection from '../components/home/TrustSection';
import ComparisonTable from '../components/home/ComparisonTable';
import IngredientClarity from '../components/home/IngredientClarity';
import FounderNote from '../components/home/FounderNote';
import ReviewsSection from '../components/home/ReviewsSection';
import TorchbearersRewardsSection from '../components/home/TorchbearersRewardsSection';
import FAQSection from '../components/mushroom/FAQSection';
import FinalCTA from '../components/mushroom/FinalCTA';
import GEOOptimizationSection from '../components/home/GEOOptimizationSection';

// Schema components
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';

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
    title: 'Torch Republic | Premium Instant Coffee & Mushroom Coffee',
    description: 'Premium instant coffee, mushroom coffee, and ceremonial matcha crafted for focus, clarity, and daily rituals. No machine required.',
    url: '/',
    type: 'website',
    faq: [
      { question: 'What is mushroom coffee?', answer: 'Mushroom coffee combines premium instant coffee with functional mushrooms like Lion\'s Mane and Chaga. Torch Republic blends create an easy daily ritual for focus, clarity, and intention without compromising coffee taste.' },
      { question: 'What is Lion\'s Mane coffee?', answer: 'Lion\'s Mane coffee is mushroom coffee featuring Lion\'s Mane mushroom, known for supporting cognitive function, focus, and mental clarity. Torch Republic blends Lion\'s Mane with premium instant coffee for a functional morning ritual.' },
      { question: 'Does mushroom coffee taste like mushrooms?', answer: 'No, mushroom coffee tastes like coffee. Torch Republic blends are coffee-forward with smooth, rich flavor. The mushrooms add subtle earthiness but don\'t overpower the coffee taste.' },
      { question: 'What is ceremonial matcha?', answer: 'Ceremonial matcha is the highest grade of matcha green tea, made from finely ground whole tea leaves. It has a smooth, umami-rich flavor and is traditionally whisked with hot water for a meditative ritual.' },
      { question: 'What makes Torch Republic different?', answer: 'Torch Republic combines premium instant coffee with functional mushrooms in a convenient, no-machine format. Our blends are designed for intentional daily rituals with coffee-forward taste and wellness-focused ingredients.' },
      { question: 'Who should drink mushroom coffee?', answer: 'Mushroom coffee is ideal for anyone seeking focus, clarity, and sustained energy without jitters. It\'s perfect for professionals, students, entrepreneurs, and wellness-conscious individuals who want a functional coffee alternative.' },
      { question: 'What are functional mushrooms?', answer: 'Functional mushrooms are adaptogenic mushrooms like Lion\'s Mane, Chaga, and Cordyceps that support cognitive function, immunity, energy, and overall wellness when consumed regularly.' },
      { question: 'What is instant coffee made from?', answer: 'Instant coffee is made from brewed coffee that has been freeze-dried or spray-dried into soluble granules. Torch Republic uses premium freeze-dried instant coffee to preserve flavor and aroma.' },
      { question: 'How much caffeine is in Torch Republic coffee?', answer: 'Each serving of Torch Republic instant coffee contains approximately 60-80mg of caffeine, similar to a standard cup of coffee. Mushroom blends may have slightly less due to mushroom content.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <OrganizationSchema />

      {/* 1. Hero */}
      <HeroSection />

      {/* 1b. Trust Row */}
      <HomeTrustRow />

      {/* 2. Best Sellers — Start Here */}
      <StartHereSection />

      {/* 3. Build Your Ritual Bundle — primary conversion section */}
      <BundleSection />

      {/* 3. Shop by Category */}
      <ShopByCategory />

      {/* 4. Compare the Blends */}
      <BlendComparisonSection />

      {/* 5. Why Torch Republic */}
      <WhyTorchRepublic />

      {/* 5b. Trust Section */}
      <TrustSection />

      {/* 5c. GEO Optimization — AI-readable content */}
      <GEOOptimizationSection />

      {/* 6. How Torch Republic Compares */}
      <ComparisonTable />

      {/* 6. Ingredient Transparency */}
      <IngredientClarity />

      {/* 7. Founder Note */}
      <FounderNote />

      {/* 8. Reviews */}
      <ReviewsSection />

      {/* Torchbearers Rewards */}
      <TorchbearersRewardsSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}