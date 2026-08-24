import React from 'react';
import RitualHero from './RitualHero';
import ChooseYourRitual from './ChooseYourRitual';
import RitualWhy from './RitualWhy';
import RitualComparison from './RitualComparison';
import RitualSubscriptionTeaser from './RitualSubscriptionTeaser';
import RitualRewardsTeaser from './RitualRewardsTeaser';

export default function RitualHomepage() {
  return (
    <main id="main-content" className="perf-home-main" style={{ background: '#FBF8F1' }}>
      <RitualHero />
      <ChooseYourRitual />
      <RitualWhy />
      <RitualComparison />
      <RitualSubscriptionTeaser />
      <RitualRewardsTeaser />
    </main>
  );
}