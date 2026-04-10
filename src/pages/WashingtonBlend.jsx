import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Washington Blend',
  subline: 'Bold. Steady. Unyielding.',
  code: 'TR-001',
  seriesNum: 'Founders #01',
  rarity: "FOUNDER'S EDITION",
  roast: 'Dark Roast',
  notes: 'Cocoa · Smoke · Spice',
  price: '$18.99',
  shopifyHandle: 'washington-blend',
  accent: '#C8A44D',
  heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&q=80',
  hook: [
    'Built for those who lead from the front.',
    'A bold, full-bodied roast designed for early mornings, long days, and unwavering focus.',
  ],
  founderStory: [
    "George Washington wasn't just the first president — he was the standard.",
    'Discipline. Restraint. Strength under pressure.',
    'Washington Blend reflects that same energy — grounded, powerful, and built for those who carry responsibility without hesitation.',
  ],
  theMoment: [
    "He didn't hesitate.",
    "He didn't retreat.",
    'He stepped forward when it mattered most.',
    'This is the kind of coffee built for that moment.',
  ],
  tastingNotes: ['Cocoa', 'Smoke', 'Spice', 'Full-bodied finish'],
  roastProfile: ['Dark Roast', 'Heavy body', 'Low acidity'],
  brewGuide: ['Drip: 1–2 tbsp per 6oz water', 'French Press: coarse grind, 4 min steep', 'Pour Over: medium grind, slow bloom'],
  whoFor: ['Leaders', 'Early risers', 'Those who prefer bold, no-nonsense coffee', 'People who carry weight and don\'t complain'],
  histFacts: [
    'Early American coffee culture grew alongside the founding generation.',
    'Coffee became the drink of independence after the Boston Tea Party.',
    'Founding leaders often gathered in coffeehouses to exchange ideas and plan strategy.',
  ],
  quote: { text: 'The price of freedom is eternal vigilance.', author: 'George Washington' },
  completePair: [
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'Medium Roast · TR-002' },
    { to: '/FranklinBlend', name: 'Franklin Blend', roast: 'Light Roast · TR-003' },
  ],
};

export default function WashingtonBlend() {
  return <FounderProductPage data={DATA} />;
}