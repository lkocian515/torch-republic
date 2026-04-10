import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Franklin Blend',
  subline: 'Awaken. Innovate.',
  code: 'TR-003',
  seriesNum: 'Founders #03',
  rarity: "FOUNDER'S EDITION",
  roast: 'Light Roast',
  notes: 'Caramel · Lemon · Sweet',
  price: '$18.99',
  shopifyHandle: 'franklin-blend',
  accent: '#D4C97A',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/b1d86420-df99-4a9b-85cc-69ff17a156b3.png?v=1775823429',
  hook: [
    'Bright, energetic, and sharp.',
    'Built for curiosity, momentum, and constant forward motion.',
  ],
  founderStory: [
    "Benjamin Franklin didn't follow paths — he created them.",
    'Inventor. Writer. Diplomat. Builder.',
    'Franklin Blend reflects that same energy — lively, complex, and always moving.',
  ],
  theMoment: [
    "He didn't scroll.",
    'He studied.',
    'He debated.',
    'He built.',
    'Coffeehouses were his battlefield. Ideas were his weapon.',
  ],
  tastingNotes: ['Caramel', 'Citrus', 'Sweet finish', 'Bright profile'],
  roastProfile: ['Light Roast', 'Light body', 'Higher acidity'],
  brewGuide: ['Pour Over: best clarity', 'Drip: smooth and bright', 'French Press: fuller body'],
  whoFor: ['Innovators', 'Builders', 'Entrepreneurs', 'Curious minds'],
  histFacts: [
    'Franklin held political meetings and debates in coffeehouses.',
    'He had his personal mail delivered to his favorite London coffeehouse.',
    'He sold coffee beans himself — one of America\'s earliest coffee entrepreneurs.',
    'He never boarded a ship without his personal coffee supply.',
  ],
  quote: { text: 'Well done is better than well said.', author: 'Benjamin Franklin' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Dark Roast · TR-001' },
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'Medium Roast · TR-002' },
  ],
};

export default function FranklinBlend() {
  return <FounderProductPage data={DATA} />;
}