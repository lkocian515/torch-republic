import React from 'react';
import DriftProductDiscovery from './DriftProductDiscovery';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import EditionHero from '../../specialeditions/EditionHero';
import DriftUpcomingReleases from './DriftUpcomingReleases';
import DriftWinterDuo from './DriftWinterDuo';
import DriftWinterDuoTeaser from './DriftWinterDuoTeaser';
import { D } from './driftTheme';

// Clean editorial homepage flow:
// 1. Special-edition hero — campaign-driven, evergreen fallback when no campaign is live
// 2. Upcoming releases — announced seasonal roasts in the lineup card style, purchasing disabled
// 3. Signature products — Classic + Mushroom with price, servings, Add to Cart
// 4. Winter Duo — the seasonal pairing, featured once the everyday lineup has been seen
// 5. Authentic customer proof — early customer feedback
// 6. Product differences — Classic vs Mushroom comparison
// 7. Preparation — Scoop. Stir. Sip.
// 8. Founder story — why Torch Republic exists
// 9. Winter Duo reminder — compact, secondary to the feature above
// 10. Final shopping CTA — active subscription plans + one-time shopping
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <EditionHero />
      <DriftUpcomingReleases />
      <DriftProductDiscovery />
      <DriftWinterDuo />
      <DriftReviews />
      <DriftComparison />
      <DriftRitual />
      <DriftFounderStory />
      <DriftWinterDuoTeaser />
      <DriftSubscription />
    </main>
  );
}