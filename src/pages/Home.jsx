import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import HeroTrustBar from '../components/home/v2/HeroTrustBar';
import WashingtonPodsSpotlight from '../components/home/v2/WashingtonPodsSpotlight';
import HomeTrustStrip from '../components/home/v2/HomeTrustStrip';
import FirstTimeGuidance from '../components/home/v2/FirstTimeGuidance';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import FeaturedProductSpotlight from '../components/home/v2/FeaturedProductSpotlight';
import TorchBoxSection from '../components/home/v2/TorchBoxSection';
import CollectionCardsSection from '../components/home/v2/CollectionCardsSection';
import HomeReviewStrip from '../components/home/v2/HomeReviewStrip';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero */}
      <HeroSection />
      <HeroTrustBar />

      {/* FIRST PRODUCT — Washington Blend Pods */}
      <WashingtonPodsSpotlight />

      {/* Trust Indicators */}
      <HomeTrustStrip />

      {/* First-Time Customer Guidance */}
      <FirstTimeGuidance />

      {/*
        ── OPTIMIZED CONVERSION FLOW (5-10 second decision path) ──
        01 · Best Sellers (Founders Series) — choose a coffee (badges for guidance)
        02 · Featured Product Spotlight — recommended starting product
        03 · Torch Box — subscription option
        04 · Reviews → Final CTA — social proof + close
        ────────────────────────────────────────────────────
        Removed: Liberty Icons, Commanders, Women of the Republic (collections)
        Apparel, GuaranteeBar (low conversion sections)
      */}

      {/* STEP 1 — Choose Your Blend (with guidance badges) */}
      <BestSellersStrip />

      {/* STEP 2 — Premium Product Highlight */}
      <FeaturedProductSpotlight />

      {/* STEP 3 — Start with Subscription */}
      <TorchBoxSection />

      {/* STEP 4 — Extended Collection Cards */}
      <CollectionCardsSection />

      {/* STEP 5 — Trust + Convert */}
      <HomeReviewStrip />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}