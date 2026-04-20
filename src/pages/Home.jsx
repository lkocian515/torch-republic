import React from 'react';
import HeroSection from '../components/home/v2/HeroSection';
import HeroTrustBar from '../components/home/v2/HeroTrustBar';
import BestSellersStrip from '../components/home/v2/BestSellersStrip';
import FeaturedProductSpotlight from '../components/home/v2/FeaturedProductSpotlight';
import TorchBoxSection from '../components/home/v2/TorchBoxSection';
import LibertyIconsStrip from '../components/home/v2/LibertyIconsStrip';
import CommandersStrip from '../components/home/v2/CommandersStrip';
import WomenOfTheRepublicStrip from '../components/home/v2/WomenOfTheRepublicStrip';
import HomeReviewStrip from '../components/home/v2/HomeReviewStrip';
import GuaranteeBar from '../components/home/v2/GuaranteeBar';
import ApparelSection from '../components/home/v2/ApparelSection';
import FinalCTA from '../components/home/v2/FinalCTA';
import ExitIntentPopup from '../components/home/ExitIntentPopup';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
      {/* 1. Hero */}
      <HeroSection />
      <HeroTrustBar />

      {/*
        ── SCROLL FLOW: Product → Collection → Subscription ──
        01 · Best Sellers (Founders Series) — immediate product engagement
        02 · Featured Product Spotlight — pods upsell
        03 · Torch Box — subscription conversion
        04 · Liberty Icons → Commanders → Women of the Republic — deeper collections
        05 · Reviews → Guarantee → Apparel → Final CTA
        ──────────────────────────────────────────────────────
      */}

      {/* STEP 1 — Best-selling coffee FIRST */}
      <BestSellersStrip />

      {/* STEP 2 — Featured product upsell */}
      <FeaturedProductSpotlight />

      {/* STEP 3 — Subscription conversion */}
      <TorchBoxSection />

      {/* STEP 4 — Explore more collections */}
      <LibertyIconsStrip />
      <CommandersStrip />
      <WomenOfTheRepublicStrip />

      {/* STEP 5 — Social proof + close */}
      <HomeReviewStrip />
      <GuaranteeBar />
      <ApparelSection />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}