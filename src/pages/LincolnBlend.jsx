import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Lincoln Blend',
  subline: 'Slow steps. Strong mind. No retreat.',
  code: 'TR-005',
  seriesNum: 'Founders #05',
  rarity: 'CORE',
  roast: 'Medium-Dark Roast',
  notes: 'Dark Chocolate · Almond · Toffee',
  price: '$18.99',
  shopifyHandle: 'lincoln-blend',
  accent: '#C87070',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/lifestyle_lincoln_1.png?v=1775827869',
  hook: [
    'Built for those who carry weight without complaint.',
    'A medium-dark roast designed for quiet strength, long endurance, and unshakeable resolve.',
  ],
  founderStory: [
    'Abraham Lincoln carried weight most men would collapse under.',
    'Self-taught. Relentless. Forged by failure and shaped by conviction.',
    'Lincoln Blend reflects that same grit — complex, steady, and built for those who refuse to retreat.',
  ],
  theMoment: [
    'He didn\'t ask for comfort.',
    'He asked for time.',
    'Step by step, he moved forward — even when the nation was at war with itself.',
    'This is the coffee built for that kind of resolve.',
  ],
  tastingNotes: ['Dark Chocolate', 'Almond', 'Toffee', 'Smooth, lingering finish'],
  roastProfile: ['Medium-Dark Roast', 'Full body', 'Low-moderate acidity'],
  brewGuide: ['Drip: 1–2 tbsp per 6oz water', 'French Press: coarse grind, 4 min steep', 'Pour Over: medium grind, slow pour'],
  whoFor: ['Those who endure', 'Leaders under pressure', 'People who think before they act', 'Anyone who does the hard thing quietly'],
  histFacts: [
    'Lincoln rose from frontier poverty to the presidency through sheer determination and self-education.',
    'He was known to work through the night, sustained by simple meals and strong coffee.',
    'Lincoln presided over the nation\'s bloodiest conflict while holding the union together through sheer will.',
  ],
  quote: { text: 'Give me six hours to chop down a tree and I will spend the first four sharpening the axe.', author: 'Abraham Lincoln' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Dark Roast · TR-001' },
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'Medium Roast · TR-002' },
  ],
};

export default function LincolnBlend() {
  return <FounderProductPage data={DATA} />;
}