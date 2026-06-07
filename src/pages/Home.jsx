import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Core sections — in conversion-optimized order
import PremiumHero from '../components/mushroom/PremiumHero';
import HomeTrustStrip from '../components/mushroom/HomeTrustStrip';
import CategoryCards from '../components/mushroom/CategoryCards';
import MeetTheRituals from '../components/mushroom/MeetTheRituals';
import ChooseYourRitual from '../components/mushroom/ChooseYourRitual';
import WhyPeopleChoose from '../components/mushroom/WhyPeopleChoose';
import HomeReviewCarousel from '../components/mushroom/HomeReviewCarousel';
import BundleSection from '../components/mushroom/BundleSection';
import BlendComparisonTable from '../components/mushroom/BlendComparisonTable';
import HowItWorksSection from '../components/mushroom/HowItWorks';
import FirstCupGuarantee from '../components/mushroom/FirstCupGuarantee';
import FAQSection from '../components/mushroom/FAQSection';
import FinalCTA from '../components/mushroom/FinalCTA';
import ReviewPopup from '../components/mushroom/ReviewPopup';
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
    title: 'Torch Republic Coffee Company | Instant Coffee, Mushroom Coffee & Matcha Rituals',
    description: "Premium instant coffee, mushroom coffee, and matcha rituals for clarity, calm, and clean energy. Ready in seconds — no machine needed.",
    url: '/',
    type: 'website',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      <ReviewPopup />

      {/* 1. Hero */}
      <PremiumHero />

      {/* 2. Trust Strip */}
      <HomeTrustStrip />

      {/* 3. Category Cards */}
      <div id="choose-your-ritual" />
      <CategoryCards />

      {/* 4. Best Sellers / Meet the Rituals */}
      <MeetTheRituals />

      {/* 5. Why Torch Republic */}
      <WhyPeopleChoose />

      {/* 6. Static Reviews */}
      <StaticReviewsSection />

      {/* 7. Review Carousel */}
      <HomeReviewCarousel />

      {/* 8. Bundles */}
      <BundleSection />

      {/* 9. Comparison Table */}
      <BlendComparisonTable />

      {/* 10. How It Works */}
      <HowItWorksSection />

      {/* 11. Guarantee */}
      <FirstCupGuarantee />

      {/* 12. FAQ */}
      <FAQSection />

      {/* 13. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}