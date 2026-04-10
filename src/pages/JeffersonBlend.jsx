import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  title: 'Jefferson Blend',
  subline: 'Thoughtful. Refined. Visionary.',
  code: 'TR-002',
  seriesNum: 'Founders #02',
  rarity: "FOUNDER'S EDITION",
  roast: 'Medium Roast',
  notes: 'Dark Chocolate · Toasted Almond · Toffee',
  price: '$18.99',
  shopifyHandle: 'jefferson-blend',
  accent: '#9BB8CC',
  heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
  hook: [
    'Balanced, smooth, and layered.',
    'Built for thinkers, creators, and those who see beyond the moment.',
  ],
  founderStory: [
    'Thomas Jefferson was a builder of ideas.',
    'A writer, architect, philosopher, and relentless student of the world.',
    'Jefferson Blend reflects that balance — refined, complex, and quietly powerful.',
  ],
  theMoment: [
    "He didn't chase noise.",
    'He pursued truth.',
    'Line by line, thought by thought, he helped shape a nation.',
    'This is coffee for that kind of mind.',
  ],
  tastingNotes: ['Dark Chocolate', 'Toasted Almond', 'Toffee', 'Smooth finish'],
  roastProfile: ['Medium Roast', 'Balanced body', 'Moderate acidity'],
  brewGuide: ['Drip: clean and balanced', 'Pour Over: brings out complexity', 'French Press: deeper body'],
  whoFor: ['Thinkers', 'Builders', 'Creators', 'Those who value clarity and depth'],
  histFacts: [
    'Jefferson called coffee "the favorite drink of the civilized world."',
    'He stocked large quantities of beans at Monticello for personal use.',
    'Coffeehouses were central to intellectual exchange in his era.',
  ],
  quote: { text: 'I like the dreams of the future better than the history of the past.', author: 'Thomas Jefferson' },
  completePair: [
    { to: '/WashingtonBlend', name: 'Washington Blend', roast: 'Dark Roast · TR-001' },
    { to: '/FranklinBlend', name: 'Franklin Blend', roast: 'Light Roast · TR-003' },
  ],
};

export default function JeffersonBlend() {
  return <FounderProductPage data={DATA} />;
}