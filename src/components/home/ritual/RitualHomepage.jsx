import React from 'react';
import RitualHero from './RitualHero';
import ChooseYourRitual from './ChooseYourRitual';
import RitualWhy from './RitualWhy';
import RitualComparison from './RitualComparison';
import RitualMomentStrip from './RitualMomentStrip';
import PoweredByNature from './PoweredByNature';
import RitualSubscriptionTeaser from './RitualSubscriptionTeaser';
import RitualRewardsTeaser from './RitualRewardsTeaser';

export default function RitualHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: '#FBF8F1' }}>
      <RitualHero />
      <ChooseYourRitual />
      <PoweredByNature />
      <RitualWhy />
      <RitualComparison />
      <RitualMomentStrip
        image="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/634eeca77_generated_image.png"
        alt="Instant coffee flakes stirred into a hot cup of coffee"
        eyebrow="The Ritual"
        title="Just add hot water."
        subtitle="Scoop. Stir. Sip. A café-quality cup in seconds — no machine, no pods, no compromise."
      />
      <RitualSubscriptionTeaser />
      <RitualRewardsTeaser />
    </main>
  );
}