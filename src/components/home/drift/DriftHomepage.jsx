import React from 'react';
import DriftProductDiscovery from './DriftProductDiscovery';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import SeasonalHero from '../SeasonalHero';
import { D } from './driftTheme';

// Clean editorial homepage flow:
// 1. Seasonal hero — Halloween Pumpkin Spice drop
// 2. Signature products — Classic + Mushroom with price, servings, Add to Cart
// 3. Authentic customer proof — early customer feedback
// 4. Product differences — Classic vs Mushroom comparison
// 5. Preparation — Scoop. Stir. Sip.
// 6. Founder story — why Torch Republic exists
// 7. Final shopping CTA — subscription waitlist + shop link
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <SeasonalHero />
      <DriftProductDiscovery />
      <DriftReviews />
      <DriftComparison />
      <DriftRitual />
      <DriftFounderStory />
      <DriftSubscription />
    </main>
  );
}