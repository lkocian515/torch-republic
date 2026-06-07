import React, { useState, useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// Premium brand sections — in ritual-based order
import ProductHero from '../components/home/ProductHero';
import CollectionsShowcase from '../components/home/CollectionsShowcase';
import MushroomCoffeeShowcase from '../components/home/MushroomCoffeeShowcase';
import MorningRitualGuide from '../components/home/MorningRitualGuide';
import PremiumBrandHero from '../components/home/PremiumBrandHero';
import BrandPhilosophy from '../components/home/BrandPhilosophy';
import ShopByRitual from '../components/home/ShopByRitual';
import CategoryOverview from '../components/home/CategoryOverview';
import FlavorDiscovery from '../components/home/FlavorDiscovery';
import CoffeeOfMonth from '../components/home/CoffeeOfMonth';
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
import CustomerTestimonials from '../components/home/CustomerTestimonials';
import MeetTheMushrooms from '../components/home/MeetTheMushrooms';
import RitualGallery from '../components/home/RitualGallery';

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

  // Calculate top-rated blend from reviews
  const { data: topBlendData } = useQuery({
    queryKey: ['coffee-of-month'],
    queryFn: async () => {
      const reviews = await base44.entities.Review.list();
      const productReviews = {};
      
      reviews.forEach(review => {
        if (review.product_handle && review.rating >= 4) {
          const handle = review.product_handle.replace('-instant-mushroom-coffee', '').replace('-instant-coffee', '').replace('-matcha-blend', '');
          if (!productReviews[handle]) {
            productReviews[handle] = { total: 0, count: 0 };
          }
          productReviews[handle].total += review.rating;
          productReviews[handle].count += 1;
        }
      });

      let topBlend = null;
      let maxAvg = 0;
      let topCount = 0;

      Object.entries(productReviews).forEach(([handle, data]) => {
        const avg = data.total / data.count;
        if (data.count >= 3 && (avg > maxAvg || (avg === maxAvg && data.count > topCount))) {
          maxAvg = avg;
          topBlend = handle;
          topCount = data.count;
        }
      });

      return { topBlend, avgRating: maxAvg, reviewCount: topCount };
    },
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

      {/* 9. Flavor Discovery */}
      <FlavorDiscovery />

      {/* 10. Coffee of the Month */}
      {topBlendData?.topBlend && (
        <CoffeeOfMonth
          topBlend={topBlendData.topBlend}
          avgRating={topBlendData.avgRating}
          reviewCount={topBlendData.reviewCount}
        />
      )}

      {/* 11. Featured Products */}
      <div id="featured" />

      {/* 12. Why Torch Republic */}
      <WhyPeopleChoose />

      {/* 13. Meet the Mushrooms */}
      <MeetTheMushrooms />

      {/* 14. Customer Testimonials */}
      <CustomerTestimonials />

      {/* 15. Reviews */}
      <HomeReviewCarousel />

      {/* 16. Bundles */}
      <BundleSection />

      {/* 17. Comparison */}
      <BlendComparisonTable />

      {/* 18. How It Works */}
      <HowItWorks />

      {/* 19. Ingredient Transparency */}
      <IngredientTransparency />

      {/* 20. Founder Note */}
      <FounderNote />

      {/* 21. Guarantee */}
      <FirstCupGuarantee />

      {/* 22. FAQ */}
      <FAQSection />

      {/* 23. Ritual Gallery */}
      <RitualGallery />

      {/* 24. Final CTA */}
      <FinalCTA />

      <StickyMobileCTA />
    </div>
  );
}