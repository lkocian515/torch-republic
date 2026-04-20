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
        ── OPTIMIZED CONVERSION FLOW (5-10 second decision path) ──
        01 · Best Sellers (Founders Series) — choose a coffee
        02 · Featured Product Spotlight — upsell opportunity
        03 · Torch Box — subscription option
        04 · Reviews → Final CTA — social proof + close
        ────────────────────────────────────────────────────
        Removed: Liberty Icons, Commanders, Women of the Republic (collections)
        Apparel, GuaranteeBar (low conversion sections)
      */}

      {/* STEP 1 — Choose Your Blend */}
      <BestSellersStrip />

      {/* STEP 2 — Premium Product Highlight */}
      <FeaturedProductSpotlight />

      {/* STEP 3 — Start with Subscription */}
      <TorchBoxSection />

      {/* STEP 4 — Trust + Convert */}
      <HomeReviewStrip />
      <FinalCTA />
      <ExitIntentPopup />
    </div>
  );
}