import React from 'react';
import QRStoryTemplate from '../../components/qr/QRStoryTemplate';

const DATA = {
  product_name: "Rosie's Grind",
  collection: 'Liberty Icons · LI-004',
  TR_number: 'LI-004',
  shopify_handle: 'rosies-grind',
  hero_image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
  accent_color: '#A8893A',
  hero_quote: 'We can do it. We always could.',
  hook_text: 'Bold, strong, and built to go. A medium-dark roast honoring American grit, women\'s resilience, and the quiet strength that won a war.',
  symbolism_text: [
    "In 1942, with millions of men shipped overseas, American women stepped into factories and shipyards and foundries — and proved that the nation's industrial backbone didn't require a particular gender to hold it up. They just required willingness.",
    "Rosie the Riveter became the face of that transformation. The flexed arm. The 'We Can Do It' poster. The bandana and the unwavering gaze. Not a symbol of protest — a symbol of competence, resolve, and showing up.",
    "Rosie's Grind honors that legacy. A medium-dark roast for those who show up before the sun, do the work that needs doing, and don't ask for special recognition.",
  ],
  historical_anchor: {
    quote: 'The woman who can create her own job is the woman who will win fame and fortune.',
    attribution: 'Amelia Earhart',
    body: [
      "During World War II, nearly 6 million women entered the American workforce for the first time. They built B-17 bombers and Liberty Ships. They welded and riveted and managed. And when the war ended, the world could never fully pretend they couldn't.",
      "Rosie the Riveter was based on real women — including Naomi Parker Fraley, photographed in 1942 wearing a polka-dot bandana at a lathe in a naval air station.",
      "Their contribution didn't just win a war. It rewrote what was possible. This blend honors every woman who showed up and did the hard thing.",
    ],
  },
  flavor_notes: ['Praline', 'Roasted Peanuts', 'Smooth Finish', 'Medium-Dark Body'],
  roast_level: 'Medium-Dark',
  brew_methods: [
    { name: 'Drip', tip: 'Consistent and strong · The factory-floor cup' },
    { name: 'French Press', tip: 'Full body · Deep praline notes emerge' },
    { name: 'Pour Over', tip: 'Medium grind · Highlights the smooth finish' },
  ],
  blend_meaning: 'Praline and roasted peanuts bring warmth and depth without pretension. This is working coffee — honest, solid, and exactly what it says it is. The smooth finish is earned.',
  takeaway_quote: 'Strength isn\'t announced. It\'s demonstrated.',
  takeaway_text: 'Rosie didn\'t wait for permission. She picked up the tool and got to work. Every cup of this blend is a tribute to that spirit — and an invitation to bring it into your own day.',
  series_blends: [
    { name: "Eagle's Flight Blend", roast: 'Dark Roast · LI-001', route: '/EaglesFlightBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383' },
    { name: 'Old Glory House Blend', roast: 'Medium Roast · LI-003', route: '/OldGloryHouseBlend', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315' },
    { name: "Uncle Sam's Bold Brew", roast: 'Dark Roast · LI-005', route: '/UncleSamsBoldBrew', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585' },
  ],
};

export default function RosiesQR() {
  return <QRStoryTemplate data={DATA} />;
}