import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

import HeroSection from '../components/home/HomeSections/HeroSection';
import BestSellersSection from '../components/home/HomeSections/BestSellersSection';
import WhyMushroomCoffee from '../components/home/HomeSections/WhyMushroomCoffee';
import IngredientsSection from '../components/home/HomeSections/IngredientsSection';
import BrandStorySection from '../components/home/HomeSections/BrandStorySection';
import ReviewsSection from '../components/home/HomeSections/ReviewsSection';
import HomeFAQSection from '../components/home/HomeSections/HomeFAQSection';
import FinalCTASection from '../components/home/HomeSections/FinalCTASection';
import ReviewPopup from '../components/mushroom/ReviewPopup';

const RG = '#E6B7AD';

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
        Shop Mushroom Coffee
      </Link>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Torch Republic Coffee Company | Premium Instant Mushroom Coffee',
    description: "Premium instant mushroom coffee blends crafted for clarity, focus, and resilience. Lion's Mane + Chaga. No brewer needed. Free shipping on orders $75+.",
    url: '/',
    type: 'website',
    product: {
      name: 'Torch Republic Mushroom Coffee',
      description: "Functional mushroom coffee blends with Lion's Mane and Chaga for focus, clarity, and daily ritual",
      price: '24.99',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png',
    },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      <ReviewPopup />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Best Sellers */}
      <BestSellersSection />

      {/* 3. Why Mushroom Coffee? */}
      <WhyMushroomCoffee />

      {/* 4. Ingredients */}
      <IngredientsSection />

      {/* 5. Brand Story — Meet Torch Republic */}
      <BrandStorySection />

      {/* 6. What Customers Are Saying */}
      <ReviewsSection />

      {/* 7. Questions, Answered */}
      <HomeFAQSection />

      {/* 8. Final CTA */}
      <FinalCTASection />

      <StickyMobileCTA />
    </div>
  );
}