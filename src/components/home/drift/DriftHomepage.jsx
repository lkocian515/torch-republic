import React from 'react';
import DriftOfferHero from './DriftOfferHero';
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
// 1. Special-edition campaign — the seasonal banner leads the page
// 2. The offer — what Torch Republic sells, both coffees, both images, both prices
// 3. Signature products — Classic + Mushroom with price, servings, Add to Cart
// 4. Upcoming releases — announced seasonal roasts, purchasing disabled
// 5. Winter Duo — the seasonal pairing, featured once the everyday lineup has been seen
// 6. Customer proof — real submitted feedback only, never invented testimonials
// 7. Product differences — Classic vs Mushroom comparison
// 8. Preparation — Scoop. Stir. Sip.
// 9. Founder story — why Torch Republic exists
// 10. Winter Duo reminder — compact, secondary to the feature above
// 11. Final shopping CTA — active subscription plans + one-time shopping
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <EditionHero />
      <DriftOfferHero />
      <DriftProductDiscovery />
      <DriftUpcomingReleases />
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