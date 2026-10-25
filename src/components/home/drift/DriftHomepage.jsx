import React from 'react';
import DriftProductDiscovery from './DriftProductDiscovery';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import RitualReviewHighlights from '../ritual/RitualReviewHighlights';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import EditionHero from '../../specialeditions/EditionHero';
import DriftUpcomingReleases from './DriftUpcomingReleases';
import DriftWinterDuo from './DriftWinterDuo';
import DriftWinterDuoTeaser from './DriftWinterDuoTeaser';
import { D } from './driftTheme';

// Clean editorial homepage flow:
// 1. Special-edition campaign — the seasonal banner leads the page
// 2. Signature products — Classic + Mushroom with price, servings, Add to Cart
// 3. Upcoming releases — announced seasonal roasts, purchasing disabled
// 4. Winter Duo — the seasonal pairing, featured below the everyday lineup
// 5. Customer proof — real submitted feedback only, never invented testimonials
// 6. Product differences — Classic vs Mushroom comparison
// 7. Preparation — Scoop. Stir. Sip.
// 8. Founder story — why Torch Republic exists
// 9. Winter Duo reminder — compact, secondary to the feature above
// 10. Final shopping CTA — active subscription plans + one-time shopping
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <EditionHero />
      <DriftProductDiscovery />
      <DriftUpcomingReleases />
      <DriftWinterDuo />
      <RitualReviewHighlights />
      <DriftComparison />
      <DriftRitual />
      <DriftFounderStory />
      <DriftWinterDuoTeaser />
      <DriftSubscription />
    </main>
  );
}