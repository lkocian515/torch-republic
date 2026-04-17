import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Roosevelt Blend',
  subline: 'Speak softly. Carry a big stick.',
  code: 'TR-005',
  seriesNum: 'Founders #05',
  rarity: "FOUNDER'S EDITION",
  roast: 'Dark Roast',
  price: '$18.99',
  shopifyHandle: 'roosevelt-blend',
  accent: '#7AC87A',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/roosevelt_mockup_wilderness.png?v=1775828726',
  founderStory: [
    "Roosevelt moved with confidence — not hesitation.",
    "Action over talk. Strength without apology.",
    "This blend hits bold and finishes clean — no wasted motion.",
  ],
  tastingNotes: ['Dark Chocolate', 'Smoke', 'Spice'],
  histFacts: [
    "Roosevelt reportedly drank nearly a gallon of coffee a day — his son said the cup was 'more like a bathtub.'",
  ],
  quote: {
    text: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
  },
  completePair: [
    { to: '/LincolnBlend', name: 'Lincoln Blend', roast: 'Dark Roast · TR-004' },
    { to: '/AdamsBlend', name: 'Adams Blend', roast: 'Medium-Dark Roast · TR-006' },
  ],
};

export default function RooseveltBlend() {
  return <FounderProductPage data={DATA} />;
}