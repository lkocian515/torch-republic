import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DriftShopPaths from './DriftShopPaths';
import DriftProductDiscovery from './DriftProductDiscovery';
import FeaturedSeasonalDuo from './FeaturedSeasonalDuo';
import FeaturedWinterDuo from './FeaturedWinterDuo';
import DriftComparison from './DriftComparison';
import RitualReviewHighlights from '../ritual/RitualReviewHighlights';
import DriftFounderStory from './DriftFounderStory';
import DriftRitual from './DriftRitual';
import EditionHero from '../../specialeditions/EditionHero';
import DriftSeasonalEditions from './DriftSeasonalEditions';
import DriftUpcomingReleases from './DriftUpcomingReleases';
import DriftDuos from './DriftDuos';
import DriftTorchbearerClub from './DriftTorchbearerClub';
import { D, TYPE } from './driftTheme';

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
      <section aria-label="Blend Advisor" style={{ background: D.paper }}>
        <div className="mx-auto max-w-[1200px] px-6 pb-8 pt-4 md:px-10 md:pb-10">
          <div className="flex flex-col gap-4 rounded-md border p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
            style={{ background: D.cream, borderColor: D.rule }}>
            <div>
              <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 0.45rem' }}>Find your fit</p>
              <h2 className="font-serif font-semibold" style={{ color: D.ink, fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', margin: 0 }}>
                Not sure which coffee fits your routine?
              </h2>
            </div>
            <Link to="/quiz" className="inline-flex min-h-[48px] items-center justify-center gap-2 px-5 font-heading text-sm font-semibold"
              style={{ borderRadius: 6, background: D.terracotta, color: D.cream, textDecoration: 'none' }}>
              Try the Blend Advisor <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <DriftShopPaths />
      <DriftProductDiscovery />
      <FeaturedSeasonalDuo />
      <FeaturedWinterDuo />
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