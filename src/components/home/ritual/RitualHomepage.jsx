import React from 'react';
import RitualHero from './RitualHero';
import ChooseYourRitual from './ChooseYourRitual';
import RitualWhy from './RitualWhy';
import RitualComparison from './RitualComparison';
import RitualMomentStrip from './RitualMomentStrip';
import RitualSubscriptionTeaser from './RitualSubscriptionTeaser';
import RitualFinalCTA from './RitualFinalCTA';
import RitualReviewHighlights from './RitualReviewHighlights';
import RitualBrandBreak from './RitualBrandBreak';
import RitualFounderTrust from './RitualFounderTrust';

// Homepage conversion flow:
// 1. Hero — what is this, who is it for, why is it different, what to click
// 2. Two-product choice — the core offer
// 3. Why Torch Republic — differentiation
// 4. Product comparison — clear side-by-side
// 5. How to prepare — preparation demonstration
// 6. Verified customer proof
// 7. Subscription explanation
// 8. Brand/founder story
// 9. Final CTA
//
// Removed sections to eliminate repetition:
// - RitualQuizCallout (CTA competes with purchase flow)
// - NatureRitualBanner (redundant with RitualMomentStrip)
// - RitualTrustStrip (redundant with RitualWhy)
// - RitualConvenienceComparison (redundant with RitualComparison)
export default function RitualHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: '#F7F2E9' }}>
      <RitualHero />
      <ChooseYourRitual />
      <RitualWhy />
      <RitualComparison />
      <RitualMomentStrip
        image="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0acc337b2_generated_image.png"
        alt="Instant coffee stirred into a cup of hot water"
        eyebrow="The Ritual"
        title="Just add hot water."
        subtitle="Scoop. Stir. Sip. A cafe-quality cup in seconds — no machine, no pods, no compromise."
      />
      <RitualReviewHighlights />
      <RitualBrandBreak />
      <RitualSubscriptionTeaser />
      <RitualFounderTrust />
      <RitualFinalCTA />
    </main>
  );
}