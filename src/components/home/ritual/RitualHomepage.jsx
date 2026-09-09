import React from 'react';
import RitualHero from './RitualHero';
import ChooseYourRitual from './ChooseYourRitual';
import RitualWhy from './RitualWhy';
import NatureRitualBanner from './NatureRitualBanner';
import RitualTrustStrip from './RitualTrustStrip';
import RitualComparison from './RitualComparison';
import RitualMomentStrip from './RitualMomentStrip';
import RitualSubscriptionTeaser from './RitualSubscriptionTeaser';
import RitualFinalCTA from './RitualFinalCTA';
import RitualQuizCallout from './RitualQuizCallout';
import RitualConvenienceComparison from './RitualConvenienceComparison';
import RitualReviewHighlights from './RitualReviewHighlights';
import RitualFounderTrust from './RitualFounderTrust';

// Homepage conversion flow:
// 1. Hero  2. Three core products  3. Why Torch Republic  4. Lifestyle proof
// 5. Trust / social proof  6. Product comparison  7. How to prepare
// 8. Subscription benefits  9. Final purchase CTA
//
// PoweredByNature and RitualRewardsTeaser were removed to eliminate repeated
// "no machine / just add water" messaging (now consolidated in RitualMomentStrip)
// and to keep the page focused on the purchase path.
export default function RitualHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: '#FBF8F1' }}>
      <RitualHero />
      <ChooseYourRitual />
      <RitualQuizCallout />
      <RitualWhy />
      <NatureRitualBanner />
      <RitualTrustStrip />
      <RitualConvenienceComparison />
      <RitualComparison />
      <RitualMomentStrip
        image="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/634eeca77_generated_image.png"
        alt="Instant coffee flakes stirred into a hot cup of coffee"
        eyebrow="The Ritual"
        title="Just add hot water."
        subtitle="Scoop. Stir. Sip. A cafe-quality cup in seconds - no machine, no pods, no compromise."
      />
      <RitualReviewHighlights />
      <RitualSubscriptionTeaser />
      <RitualFounderTrust />
      <RitualFinalCTA />
    </main>
  );
}