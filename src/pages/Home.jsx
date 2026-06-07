import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Premium brand sections — in ritual-based order
import ProductHero from '../components/home/ProductHero';
import CollectionsShowcase from '../components/home/CollectionsShowcase';
import MushroomCoffeeShowcase from '../components/home/MushroomCoffeeShowcase';
import MorningRitualGuide from '../components/home/MorningRitualGuide';
import PremiumBrandHero from '../components/home/PremiumBrandHero';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import ShopByRitual from '../components/home/ShopByRitual';
import CategoryOverview from '../components/home/CategoryOverview';
import FounderNote from '../components/home/FounderNote';
import HowItWorks from '../components/mushroom/HowItWorks';
import WhyPeopleChoose from '../components/mushroom/WhyPeopleChoose';
import HomeReviewCarousel from '../components/mushroom/HomeReviewCarousel';
import BundleSection from '../components/mushroom/BundleSection';
import BlendComparisonTable from '../components/mushroom/BlendComparisonTable';
import IngredientTransparency from '../components/mushroom/IngredientTransparency';
import FirstCupGuarantee from '../components/mushroom/FirstCupGuarantee';
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
        Shop the Rituals
      </Link>
    </div>
  );
}

export default function Home() {
  useSEO({
    title: 'Torch Republic Coffee Company | Premium Instant Coffee, Mushroom Coffee & Matcha',
    description: 'Discover Torch Republic Coffee Company — premium instant coffee, mushroom coffee, and matcha blends crafted for clarity, resilience, focus, restoration, and intentional daily ritual.',
    url: '/',
    type: 'website',
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      <ReviewPopup />

      {/* 1. Product Hero */}
      <ProductHero />

      {/* 2. Collections Showcase */}
      <CollectionsShowcase />

      {/* 3. Mushroom Coffee Showcase */}
      <MushroomCoffeeShowcase />

      {/* 4. Morning Ritual Guide */}
      <MorningRitualGuide />

      {/* 5. Premium Brand Hero */}
      <PremiumBrandHero />

      {/* 6. Brand Philosophy */}
      <BrandPhilosophy />

      {/* 7. Shop by Ritual */}
      <ShopByRitual />

      {/* 8. Category Overview */}
      <CategoryOverview />

      {/* 9. Featured Products */}
      <div id="featured" />

      {/* 10. Why Torch Republic */}
      <WhyPeopleChoose />

      {/* 11. Reviews */}
      <HomeReviewCarousel />

      {/* 12. Bundles */}
      <BundleSection />

      {/* 13. Comparison */}
      <BlendComparisonTable />

      {/* 14. How It Works */}
      <HowItWorks />

      {/* 15. Ingredient Transparency */}
      <IngredientTransparency />

      {/* 16. Founder Note */}
      <FounderNote />

      {/* 17. Guarantee */}
      <FirstCupGuarantee />

      {/* 18. FAQ */}
      <FAQSection />

      {/* 19. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}