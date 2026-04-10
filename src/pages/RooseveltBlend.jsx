import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Roosevelt',
  subline: 'Do the Hard Thing',
  code: 'TR-006',
  seriesNum: 'Founders #06',
  rarity: 'CORE',
  roast: 'Dark Roast',
  notes: 'Cocoa · Toasted Nut · Full Body',
  price: '$18.99',
  shopifyHandle: 'roosevelt-blend',
  accent: '#7AC87A',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/roosevelt_mockup_wilderness.png?v=1775828726',
  hook: [
    'He drank a gallon a day.',
    'He was also the most accomplished man in any room he ever entered.',
  ],
  founderStory: [
    "Theodore Roosevelt reportedly consumed nearly a gallon of coffee a day. He read a book before breakfast, hunted big game, led a cavalry charge, and built the Panama Canal before most men finished their morning routine.",
    "The blend that carries his name is built accordingly — no shortcuts, no apologies. Bold, full-body, relentless. Like its namesake.",
  ],
  theMoment: [
    'He was shot in the chest.',
    'He finished the speech first.',
    '50 minutes. Standing. Bleeding.',
    'Because the work was not done.',
    "It was never done. That's the standard.",
  ],
  tastingNotes: ['Cocoa', 'Toasted Nut', 'Full Body Finish'],
  roastProfile: ['Dark Roast', 'Bold Body', 'Long Finish', 'High Caffeine'],
  brewGuide: ['Best: French Press or Drip', 'Grind: Medium-Coarse', 'Water: 205°F', 'Ratio: 1:14 coffee to water', 'Steep: 4 minutes'],
  whoFor: ['Hard training', 'Long work days', 'People who operate at full output', 'Early risers', 'No-excuses types'],
  histFacts: [
    "Reportedly drank up to a gallon of coffee daily, with heavily sweetened cups.",
    "His son noted that TR's coffee cup was 'more like a bathtub' — he drank it constantly.",
    "The teddy bear was named after him — he refused to shoot a tied bear, calling it unsportsmanlike.",
    "First American to win the Nobel Peace Prize; negotiated end of the Russo-Japanese War.",
    "Charged up San Juan Hill, wrote 35 books, held the Black Belt equivalent in judo and boxing.",
  ],
  quote: {
    text: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
  },
  completePair: [
    { to: '/LincolnBlend', name: 'Lincoln Blend', roast: 'TR-005 · Medium-Dark Roast' },
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'TR-001 · Dark Roast' },
  ],
};

export default function RooseveltBlend() {
  return <FounderProductPage data={DATA} />;
}