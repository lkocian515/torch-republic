import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';

// Above-fold — loaded eagerly
import HeroSection from '../components/home/HeroSection';
import HomeTrustRow from '../components/home/HomeTrustRow';
import StartHereSection from '../components/home/StartHereSection';

// Below-fold — lazy loaded to improve LCP / TTI
const WhatDoYouWant = lazy(() => import('../components/home/WhatDoYouWant'));
const NewToTorchRepublic = lazy(() => import('../components/home/NewToTorchRepublic'));
const BundleSection = lazy(() => import('../components/home/BundleSection'));
const ShopByCategory = lazy(() => import('../components/home/ShopByCategory'));
const BlendComparisonSection = lazy(() => import('../components/home/BlendComparisonSection'));
const WhyTorchRepublic = lazy(() => import('../components/home/WhyTorchRepublic'));
const TrustSection = lazy(() => import('../components/home/TrustSection'));
const WhyTorchRepublicExists = lazy(() => import('../components/home/WhyTorchRepublicExists'));
const PremiumComparisonTable = lazy(() => import('../components/home/PremiumComparisonTable'));
const PNGCoffeeCallout = lazy(() => import('../components/home/PNGCoffeeCallout'));
const IngredientClarity = lazy(() => import('../components/home/IngredientClarity'));
const FounderNote = lazy(() => import('../components/home/FounderNote'));
const ReviewsSection = lazy(() => import('../components/home/ReviewsSection'));
const SubscribeAndSaveSection = lazy(() => import('../components/home/SubscribeAndSaveSection'));
const TorchbearersRewardsSection = lazy(() => import('../components/home/TorchbearersRewardsSection'));
const FAQSection = lazy(() => import('../components/mushroom/FAQSection'));
const FinalCTA = lazy(() => import('../components/mushroom/FinalCTA'));
const GEOOptimizationSection = lazy(() => import('../components/home/GEOOptimizationSection'));
const BuiltForRituals = lazy(() => import('../components/home/BuiltForRituals'));

// Schema components (lightweight, no render output)
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema';
import OrganizationSchema from '../components/seo/OrganizationSchema';
import GEOOptimization from '../components/seo/GEOOptimization';

// Minimal section placeholder to prevent CLS while lazy sections load
const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

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
    title: 'Instant Coffee, Mushroom Coffee & Matcha | Torch Republic',
    description: "Explore premium instant coffee, mushroom coffee, and ceremonial matcha created for convenient, intentional daily rituals—no machine required. Free shipping $50+.",
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
      { question: 'How much caffeine is in Torch Republic coffee?', answer: 'Caffeine content varies by blend. Classic instant coffee servings are comparable to a standard cup of coffee. Check the individual product page for the most current information.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      {/* Schema Markup for SEO */}
      <LocalBusinessSchema />
      <OrganizationSchema />
      <GEOOptimization page="home" />

      {/* 1. Hero */}
      <HeroSection />

      {/* 1b. Trust Row */}
      <HomeTrustRow />

      {/* 2. "What do you want to change?" — customer intent selector */}
      <Suspense fallback={<SectionFallback />}>
        <WhatDoYouWant />
      </Suspense>

      {/* 3. Best Sellers — Start Here */}
      <StartHereSection />

      {/* 4. New to Torch Republic — first-buyer path */}
      <Suspense fallback={<SectionFallback />}>
        <NewToTorchRepublic />
      </Suspense>

      {/* Everything below is lazy-loaded — doesn't block LCP */}
      <Suspense fallback={<SectionFallback />}>
        <BuiltForRituals />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <BundleSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ShopByCategory />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <BlendComparisonSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyTorchRepublic />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TrustSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <GEOOptimizationSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <WhyTorchRepublicExists />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PremiumComparisonTable />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <PNGCoffeeCallout />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <IngredientClarity />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FounderNote />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <ReviewsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <SubscribeAndSaveSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <TorchbearersRewardsSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FinalCTA />
      </Suspense>

      <StickyMobileCTA />
    </div>
  );
}