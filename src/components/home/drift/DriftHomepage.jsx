import React from 'react';
import DriftHero from './DriftHero';
import DriftBenefitStrip from './DriftBenefitStrip';
import DriftProductDiscovery from './DriftProductDiscovery';
import DriftBrandStory from './DriftBrandStory';
import DriftRitual from './DriftRitual';
import DriftLifestyleCampaign from './DriftLifestyleCampaign';
import DriftComparison from './DriftComparison';
import DriftSubscription from './DriftSubscription';
import DriftReviews from './DriftReviews';
import DriftFounderStory from './DriftFounderStory';
import { D, MONO } from './driftTheme';

// Drift-inspired editorial homepage flow:
// 1. Announcement bar
// 2. Hero — split-screen editorial with product photography
// 3. Benefit strip — key value props
// 4. Product discovery — interactive Classic/Mushroom tabs
// 5. Brand story — photography-led brand section
// 6. Ritual — Scoop. Stir. Sip. preparation
// 7. Lifestyle campaign — full-width atmospheric photography
// 8. Comparison — Classic vs Mushroom editorial columns
// 9. Subscription — espresso-section DTC treatment
// 10. Reviews — authentic customer social proof
// 11. Founder story — editorial quote
export default function DriftHomepage() {
  return (
    <main id="main-content" style={{ background: D.paper }}>
      {/* Announcement bar */}
      <div style={{ background: D.espresso }} className="text-center py-2.5">
        <span style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: D.cream }}>
          Thoughtfully Crafted Instant Coffee &middot; Free Shipping $50+
        </span>
      </div>

      <DriftHero />
      <DriftBenefitStrip />
      <DriftProductDiscovery />
      <DriftBrandStory />
      <DriftRitual />
      <DriftLifestyleCampaign />
      <DriftComparison />
      <DriftSubscription />
      <DriftReviews />
      <DriftFounderStory />
    </main>
  );
}