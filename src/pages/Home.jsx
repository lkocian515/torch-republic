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
      {/* 1. Hero */}
      <MushroomHero />
      {/* 2. Trust signals */}
      <MushroomTrustBar />
      {/* 3. Start Your Ritual — bundle / best-seller offer */}
      <BundleSection />
      {/* 4. Find Your Ritual — blend selector */}
      <ChooseYourBlend />
      {/* 5. Featured product grid */}
      <FeaturedCollection />
      {/* 6. Why mushroom coffee */}
      <MushroomScience />
      {/* 7. Why instant / brand pillars */}
      <WhyInstant />
      {/* 8. How to use */}
      <HowToUse />
      {/* 9. What's Inside the Tube — ingredient transparency */}
      <WhatInsideTube />
      {/* 10. Why Torch Republic / trust commitments */}
      <QualityMission />
      {/* 11. Founder story */}
      <FounderSection />
      {/* 12. Email capture */}
      <EmailCapture />
      {/* 13. FAQ */}
      <FAQSection />
      <StickyMobileCTA />
    </div>
  );
}