import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Core sections — in conversion-optimized order
import MushroomHero from '../components/mushroom/HeroSection';
import HomeTrustStrip from '../components/mushroom/HomeTrustStrip';
import ChooseYourRitual from '../components/mushroom/ChooseYourRitual';
import WhyPeopleChoose from '../components/mushroom/WhyPeopleChoose';
import HomeReviewCarousel from '../components/mushroom/HomeReviewCarousel';
import BundleSection from '../components/mushroom/BundleSection';
import IngredientTransparency from '../components/mushroom/IngredientTransparency';
import SubscribeAndSave from '../components/mushroom/SubscribeAndSave';
import FirstCupGuarantee from '../components/mushroom/FirstCupGuarantee';
import RepublicReserveSection from '../components/reserve/RepublicReserveSection';
import FAQSection from '../components/mushroom/FAQSection';
import FinalCTA from '../components/mushroom/FinalCTA';
import ReviewPopup from '../components/mushroom/ReviewPopup';
import BlendComparisonTable from '../components/mushroom/BlendComparisonTable';
import FounderStorySection from '../components/mushroom/FounderStorySection';
import StaticReviewsSection from '../components/mushroom/StaticReviewsSection';

const RG = '#E6B7AD';

// Sticky mobile CTA — appears after scrolling past hero
function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 300);
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
        to="/shop"
        className="pointer-events-auto font-mono uppercase tracking-[0.28em] text-center transition-all hover:opacity-90"
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
        Shop Instant Mushroom Coffee
      </Link>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Torch Republic | Premium Instant Mushroom Coffee',
    description: "Premium instant mushroom coffee crafted for focus, clarity, calm energy, and daily ritual. Functional coffee blends with Lion's Mane, Chaga, and smooth coffee flavor. No coffee maker needed.",
    url: '/',
    type: 'website',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <ReviewPopup />

      {/* 1. Hero — What is Torch Republic? */}
      <MushroomHero />

      {/* 2. Trust Strip — immediate credibility */}
      <HomeTrustStrip />

      {/* 3. Find Your Blend — the core USP */}
      <ChooseYourRitual />

      {/* 4. Why People Choose Torch Republic — benefits */}
      <WhyPeopleChoose />

      {/* 5. Social Proof — static reviews (always visible) */}
      <StaticReviewsSection />

      {/* 5b. DB-driven review carousel (shows if reviews exist) */}
      <HomeReviewCarousel />

      {/* 6. Bundle Offer — primary conversion */}
      <BundleSection />

      {/* 7. What's Inside Each Blend — comparison table */}
      <BlendComparisonTable />

      {/* 8. Ingredient Transparency — mushroom deep-dive */}
      <IngredientTransparency />

      {/* 9. Subscribe & Save */}
      <SubscribeAndSave />

      {/* 10. Risk Reversal */}
      <FirstCupGuarantee />

      {/* 11. Founder/Brand Story */}
      <FounderStorySection />

      {/* 12. Classic Coffee — secondary line, after mushroom coffee story is established */}
      <RepublicReserveSection />

      {/* 13. FAQ */}
      <FAQSection />

      {/* 14. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}