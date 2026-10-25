import React from 'react';
import DriftProductDiscovery from './DriftProductDiscovery';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import EditionHero from '../../specialeditions/EditionHero';
import DriftUpcomingReleases from './DriftUpcomingReleases';
import { D } from './driftTheme';

// Clean editorial homepage flow:
// 1. Special-edition hero — campaign-driven, evergreen fallback when no campaign is live
// 2. Upcoming releases — announced seasonal roasts in the lineup card style, purchasing disabled
// 3. Signature products — Classic + Mushroom with price, servings, Add to Cart
// 4. Authentic customer proof — early customer feedback
// 5. Product differences — Classic vs Mushroom comparison
// 6. Preparation — Scoop. Stir. Sip.
// 7. Founder story — why Torch Republic exists
// 8. Final shopping CTA — active subscription plans + one-time shopping
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <EditionHero />
      <DriftUpcomingReleases />
      <DriftProductDiscovery />
      <DriftReviews />
      <DriftComparison />
      <DriftRitual />
      <DriftFounderStory />
      <DriftSubscription />
    </main>
  );
}