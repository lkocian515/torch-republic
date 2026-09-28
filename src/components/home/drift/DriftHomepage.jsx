import React from 'react';
import DriftHero from './DriftHero';
import DriftBenefitStrip from './DriftBenefitStrip';
import DriftProductDiscovery from './DriftProductDiscovery';
import FreeGiftBanner from '../FreeGiftBanner';
import DriftComparison from './DriftComparison';
import DriftBrandStory from './DriftBrandStory';
import DriftRitual from './DriftRitual';
import DriftLifestyleCampaign from './DriftLifestyleCampaign';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import DriftNewsletter from './DriftNewsletter';
import SeasonalFloatingCard from '../SeasonalFloatingCard';
import { D } from './driftTheme';

// Refined editorial homepage flow:
// 1. Hero — cinematic product-led hero with atmospheric warmth
// 2. Trust strip — key value props
// 3. Product discovery — interactive Classic/Mushroom with atmospheric themes
// 4. Comparison — editorial comparison table
// 5. Brand story — photography-led brand section
// 6. Ritual — Scoop. Stir. Start. preparation
// 7. Lifestyle campaign — full-width atmospheric photography
// 8. Subscription — espresso-section DTC treatment
// 9. Reviews — authentic customer social proof
// 10. Founder story — editorial quote
// 11. Newsletter — editorial email signup
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <DriftHero />
      <DriftBenefitStrip />
      <DriftProductDiscovery />
      <FreeGiftBanner />
      <DriftComparison />
      <DriftBrandStory />
      <DriftRitual />
      <DriftLifestyleCampaign />
      <DriftSubscription />
      <DriftReviews />
      <DriftFounderStory />
      <DriftNewsletter />
      <SeasonalFloatingCard />
    </main>
  );
}