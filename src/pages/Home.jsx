import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Core homepage sections — ritual-based order
import HeroSection from '../components/home/HeroSection';
import ThreeCategories from '../components/home/ThreeCategories';
import StarterBundleSection from '../components/home/StarterBundleSection';
import WhyTorchRepublic from '../components/home/WhyTorchRepublic';
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
        Shop Best Sellers
      </Link>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Torch Republic Coffee Co. | Conscious Instant Coffee, Mushroom Coffee & Matcha',
    description: 'Torch Republic Coffee Co. creates premium instant coffee, mushroom coffee, and matcha blends for clarity, calm energy, and intentional daily rituals. Shop coffee-forward blends made for modern wellness.',
    url: '/',
    type: 'website',
    product: {
      name: 'Torch Republic Coffee Co. — Conscious Instant Coffee, Mushroom Coffee & Matcha',
      description: 'Premium instant coffee, mushroom coffee, and matcha blends crafted for clarity, calm energy, and intentional daily rituals. No pods. No machines. Instant preparation.',
      price: '24.99',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ee5e8f634_LIVEFREESTAYREADY5.png',
    },
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Three Category Cards */}
      <ThreeCategories />

      {/* 3. Starter Bundle */}
      <StarterBundleSection />

      {/* 4. Why Torch Republic */}
      <WhyTorchRepublic />

      {/* 5. Ingredient Transparency */}
      <IngredientClarity />

      {/* 6. Founder Note */}
      <FounderNote />

      {/* 7. Reviews */}
      <ReviewsSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}