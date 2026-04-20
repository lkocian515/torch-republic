import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Roosevelt Blend — Founders Series Coffee',
  subline: 'Speak softly. Carry a big stick.',
  roast: 'Dark Roast',
  price: '$18.99',
  shopifyHandle: 'roosevelt-blend',
  format: 'WHOLE BEAN BOX',
  accent: '#7AC87A',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/roosevelt_mockup_wilderness.png?v=1775828726',
  founderStory: [
    'Roosevelt moved with confidence — not hesitation.',
    'Action over talk. Strength without apology.',
    'This blend hits bold and finishes clean — no wasted motion.',
  ],
  tastingNotes: ['Dark Chocolate', 'Smoke', 'Spice'],
  histFacts: [
    "Roosevelt reportedly drank nearly a gallon of coffee a day — his son called his cup 'more like a bathtub.'",
  ],
  quote: { text: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
  completePair: [
    { to: '/LincolnBlend', name: 'Lincoln Blend', roast: 'Dark Roast' },
    { to: '/AdamsBlend', name: 'Adams Blend', roast: 'Medium-Dark Roast' },
  ],
};

export default function RooseveltBlend() {
  return <FounderProductPage data={DATA} />;
}