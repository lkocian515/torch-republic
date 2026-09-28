import React from 'react';
import DriftHero from './DriftHero';
import DriftBenefitStrip from './DriftBenefitStrip';
import DriftProductDiscovery from './DriftProductDiscovery';
import FreeGiftBanner from '../FreeGiftBanner';
import DriftComparison from './DriftComparison';
import DriftBrandStory from './DriftBrandStory';
import DriftRitual from './DriftRitual';
import DriftFeaturedProduct from './DriftFeaturedProduct';
import DriftLifestyleCampaign from './DriftLifestyleCampaign';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import DriftNewsletter from './DriftNewsletter';
import SeasonalFloatingCard from '../SeasonalFloatingCard';
import { D } from './driftTheme';

// Refined editorial homepage flow (13 sections):
// 1. Announcement bar — in header (seasonal offer, free shipping threshold)
// 2. Header — transparent over hero, solid on scroll
// 3. Hero — cinematic product-led hero with atmospheric warmth
// 4. Trust strip — key value props
// 5. Product discovery — interactive Classic/Mushroom with atmospheric themes
// 6. Free gift banner — promotional offer
// 7. Comparison — editorial comparison table
// 8. Brand story — "Build the day before the day builds you"
// 9. Ritual — Scoop. Stir. Start. preparation
// 10. Featured product — Mushroom Coffee spotlight with qty + expandable details
// 11. Lifestyle campaign — full-width atmospheric photography
// 12. Subscription — espresso-section DTC treatment
// 13. Reviews — authentic customer social proof
// 14. Founder story — editorial quote
// 15. Newsletter — "Keep the fire going" editorial email signup
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
      <DriftFeaturedProduct />
      <DriftLifestyleCampaign />
      <DriftSubscription />
      <DriftReviews />
      <DriftFounderStory />
      <DriftNewsletter />
      <SeasonalFloatingCard />
    </main>
  );
}