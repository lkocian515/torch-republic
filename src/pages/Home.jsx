import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MushroomHero from '../components/mushroom/HeroSection';
import MushroomTrustBar from '../components/mushroom/TrustBar';
import FeaturedCollection from '../components/mushroom/FeaturedCollection';
import WhyInstant from '../components/mushroom/WhyInstant';
import MushroomScience from '../components/mushroom/MushroomScience';
import BundleSection from '../components/mushroom/BundleSection';
import HowToUse from '../components/mushroom/HowToUse';
import QualityMission from '../components/mushroom/QualityMission';
import EmailCapture from '../components/mushroom/EmailCapture';
import FAQSection from '../components/mushroom/FAQSection';
import ChooseYourBlend from '../components/mushroom/ChooseYourBlend';
import WhatInsideTube from '../components/mushroom/WhatInsideTube';
import FounderSection from '../components/mushroom/FounderSection';
import FinalCTA from '../components/mushroom/FinalCTA';
import ReviewPopup from '../components/mushroom/ReviewPopup';
import DiscountReminders from '../components/discounts/DiscountReminders';
import ProductReviewsCarousel from '../components/mushroom/ProductReviewsCarousel';
import BlendQuiz from '../components/mushroom/BlendQuiz';
import IngredientsSection from '../components/mushroom/IngredientsSection';
import HomeReviewCarousel from '../components/mushroom/HomeReviewCarousel';

const RG = '#E6B7AD';

// Sticky mobile CTA — visible only on mobile, hidden after user enters shop section
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
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* Review Popup Modal */}
      <ReviewPopup />
      
      {/* 1. Hero */}
      <MushroomHero />
      {/* 2. Trust signals */}
      <MushroomTrustBar />
      {/* 3. What's Inside the Tube — ingredient transparency */}
      <WhatInsideTube />
      {/* 4. Start Your Ritual — bundle / best-seller offer */}
      <BundleSection />
      {/* 5. What People Are Saying — social proof (moved up for conversion) */}
      <HomeReviewCarousel />
      {/* 6. Find Your Blend — interactive quiz */}
      <BlendQuiz />
      {/* 7. Find Your Ritual — blend selector */}
      <ChooseYourBlend />
      {/* 7. Featured product grid */}
      <FeaturedCollection />
      {/* 8. Ingredients / functional mushrooms */}
      <IngredientsSection />
      {/* 9. Why mushroom coffee */}
      <MushroomScience />
      {/* 10. Why instant / brand pillars */}
      <WhyInstant />
      {/* 10. How to use */}
      <HowToUse />
      {/* 11. Customer Reviews / social proof */}
      <ProductReviewsCarousel productSlug="mooncap-restore" />
      {/* 12. Why Torch Republic / trust commitments */}
      <QualityMission />
      {/* 13. Founder story */}
      <FounderSection />
      {/* 14. Email capture */}
      <EmailCapture />
      {/* 15. FAQ */}
      <FAQSection />
      {/* 16. Discount reminders */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.07)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase text-center mb-6" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Special Offers
          </p>
          <DiscountReminders cartSubtotal={0} showAll />
        </div>
      </section>
      {/* 17. Final CTA */}
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}