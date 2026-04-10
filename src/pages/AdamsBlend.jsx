import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Adams',
  subline: 'Principle Over Comfort',
  code: 'TR-004',
  seriesNum: 'Founders #04',
  rarity: 'CORE',
  roast: 'Medium Roast',
  notes: 'Toffee · Dark Chocolate · Citrus',
  price: '$18.99',
  shopifyHandle: 'adams-blend',
  accent: '#B87AC8',
  heroImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80',
  hook: [
    'He switched from tea to coffee on principle.',
    'And he never looked back.',
  ],
  founderStory: [
    "John Adams made a deliberate choice. After the Boston Tea Party, he swore off tea — calling it 'the traitor's drink' — and switched to coffee out of patriotic duty. He never went back. Every cup was a statement. Every morning was a recommitment to the cause.",
    "Adams didn't follow the crowd. He stood for structure when others wanted chaos, for law when others wanted vengeance. He was the Atlas of Independence — the man who carried the revolution on his back when others got the glory.",
  ],
  theMoment: [
    'He could have been comfortable.',
    'He chose the harder thing.',
    'He chose truth.',
    'He chose principle.',
    'He chose coffee.',
  ],
  tastingNotes: ['Toffee', 'Dark Chocolate', 'Citrus Finish'],
  roastProfile: ['Medium Roast', 'Balanced Body', 'Clean Finish', 'Moderate Caffeine'],
  brewGuide: ['Best: French Press or Pour Over', 'Grind: Medium', 'Water: 200°F', 'Ratio: 1:15 coffee to water', 'Bloom: 30 seconds'],
  whoFor: ['Morning conviction', 'Long desk days', 'Anyone who doesn\'t take the easy road', 'Principled thinkers', 'Students of history'],
  histFacts: [
    "Publicly declared he would drink coffee instead of tea as a political statement after the Boston Tea Party.",
    "Wrote in a letter: 'I must be weaned, and the sooner the better' — about switching from tea.",
    "As president, served coffee at White House functions to model patriotic consumption.",
    "Known as 'The Atlas of Independence' — the man who carried the revolution on his back.",
    "Lived to 90 — the longest-lived president until Reagan. Coffee may have helped.",
  ],
  quote: {
    text: 'Liberty cannot be preserved without a general knowledge among the people.',
    author: 'John Adams',
  },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'TR-001 · Dark Roast' },
    { to: '/JeffersonBlend', name: 'Jefferson Blend', roast: 'TR-002 · Medium Roast' },
  ],
};

export default function AdamsBlend() {
  return <FounderProductPage data={DATA} />;
}