import React from 'react';
import DriftHero from './DriftHero';
import DriftBenefitStrip from './DriftBenefitStrip';
import DriftProductDiscovery from './DriftProductDiscovery';
import FreeGiftBanner from '../FreeGiftBanner';
import DriftBrandStory from './DriftBrandStory';
import DriftRitual from './DriftRitual';

import DriftLifestyleCampaign from './DriftLifestyleCampaign';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import SeasonalHero from '../SeasonalHero';
import PumpkinSpiceAdBanner from '../PumpkinSpiceAdBanner';
import { D } from './driftTheme';

// Drift-inspired editorial homepage flow:
// 1. Announcement bar
// 2. Hero — split-screen editorial with product photography
// 3. Benefit strip — key value props
// 4. Product discovery — interactive Classic/Mushroom tabs
// 5. Brand story — photography-led brand section
// 6. Ritual — Scoop. Stir. Sip. preparation
// 7. Lifestyle campaign — full-width atmospheric photography
// 8. Comparison — Classic vs Mushroom editorial columns
// 9. Subscription — espresso-section DTC treatment
// 10. Reviews — authentic customer social proof
// 11. Founder story — editorial quote
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <SeasonalHero />
      <DriftHero />
      <DriftBenefitStrip />
      <DriftProductDiscovery />
      <FreeGiftBanner />
      <PumpkinSpiceAdBanner />
      <DriftBrandStory />
      <DriftRitual />
      <DriftLifestyleCampaign />
      <DriftComparison />
      <DriftSubscription />
      <DriftReviews />
      <DriftFounderStory />
    </main>
  );
}