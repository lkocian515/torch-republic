import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Core sections — in conversion-optimized order
import MushroomHero from '../components/mushroom/HeroSection';
import HomeTrustStrip from '../components/mushroom/HomeTrustStrip';
import ScienceCredibilityBar from '../components/mushroom/ScienceCredibilityBar';
import ChooseYourRitual from '../components/mushroom/ChooseYourRitual';
import WhyPeopleChoose from '../components/mushroom/WhyPeopleChoose';
import HomeReviewCarousel from '../components/mushroom/HomeReviewCarousel';
import BundleSection from '../components/mushroom/BundleSection';
import WhatsInsideEveryCup from '../components/mushroom/WhatsInsideEveryCup';
import FeaturedCollection from '../components/mushroom/FeaturedCollection';
import SubscribeAndSave from '../components/mushroom/SubscribeAndSave';
import FirstCupGuarantee from '../components/mushroom/FirstCupGuarantee';
import RepublicReserveSection from '../components/reserve/RepublicReserveSection';
import FAQSection from '../components/mushroom/FAQSection';
import FinalCTA from '../components/mushroom/FinalCTA';
import ReviewPopup from '../components/mushroom/ReviewPopup';

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
    title: 'Premium Instant Mushroom Coffee for Focus, Energy & Daily Ritual',
    description: "Torch Republic creates premium instant mushroom coffee blends with Lion's Mane + Chaga for focus, clarity, energy, balance, and daily wellness. No coffee maker needed. 27 servings per tube.",
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

      {/* 2b. Science & Credibility pillars */}
      <ScienceCredibilityBar />

      {/* 3. Find Your Blend — the core USP, front and center */}
      <ChooseYourRitual />

      {/* 4. Why People Choose Torch Republic — consolidated benefits */}
      <WhyPeopleChoose />

      {/* 5. Social Proof — reviews */}
      <HomeReviewCarousel />

      {/* 6. Bundle Offer — primary conversion */}
      <BundleSection />

      {/* 7. Ingredient Transparency — what's in the cup */}
      <WhatsInsideEveryCup />

      {/* 8. Featured Products — shop the collection */}
      <FeaturedCollection />

      {/* 9. Subscribe & Save — retention offer */}
      <SubscribeAndSave />

      {/* 10. Risk Reversal — First Cup Guarantee */}
      <FirstCupGuarantee />

      {/* 11. Republic Reserve — premium secondary line */}
      <RepublicReserveSection />

      {/* 12. FAQ — handle objections */}
      <FAQSection />

      {/* 13. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}