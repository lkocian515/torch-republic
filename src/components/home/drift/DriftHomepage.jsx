import React from 'react';
import DriftShopPaths from './DriftShopPaths';
import DriftProductDiscovery from './DriftProductDiscovery';
import FeaturedSeasonalDuo from './FeaturedSeasonalDuo';
import DriftComparison from './DriftComparison';
import RitualReviewHighlights from '../ritual/RitualReviewHighlights';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import EditionHero from '../../specialeditions/EditionHero';
import DriftSeasonalEditions from './DriftSeasonalEditions';
import DriftUpcomingReleases from './DriftUpcomingReleases';
import DriftDuos from './DriftDuos';
import DriftTorchbearerClub from './DriftTorchbearerClub';
import { D } from './driftTheme';

// One journey down the page:
// 1. The seasonal release on sale — the page's first fact
// 2. The two ways to shop — instant Originals or brewed Seasonal Reserve
// 3. Available now — the everyday lineup, then the seasonal coffees on sale
// 4. The duo — both bags, one order
// 5. Torchbearer Club — the monthly seasonal coffee, waitlist only
// 6. What is coming next — announced releases, nothing orderable
// 7. Proof, differences, preparation, the founder — no repeated pitch
//    (the email signup and footer close every page)
export default function DriftHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: D.paper, overflowX: 'clip' }}>
      <EditionHero />
      <DriftShopPaths />
      <DriftProductDiscovery />
      <FeaturedSeasonalDuo />
      <DriftSeasonalEditions />
      <DriftDuos />
      <DriftTorchbearerClub />
      <DriftUpcomingReleases />
      <RitualReviewHighlights />
      <DriftComparison />
      <DriftRitual />
      <DriftFounderStory />
    </main>
  );
}