import React from 'react';
import SEOLandingPage from '@/components/seo/SEOLandingPage';

const DATA = {
  seo: {
    title: 'Best Coffee for Camping: No-Machine Instant Coffee (2025)',
    description: 'The best coffee for camping is instant coffee that needs no machine, no grinder, and no cleanup. Discover freeze-dried coffee and mushroom coffee perfect for the trail.',
    url: '/camping-coffee',
    type: 'article',
    faq: [
      { question: 'What is the best coffee for camping?', answer: 'The best coffee for camping is premium freeze-dried instant coffee. It needs no machine, no grinder, no filters, and no cleanup — just hot water from a camp stove. A tube of 27 servings is compact and lightweight.' },
      { question: 'Can you make coffee while camping without a machine?', answer: 'Yes. Instant coffee dissolves in hot water from a camp stove or kettle. No French press, no pour-over, no percolator needed. Just add hot water, stir, and drink.' },
      { question: 'How much does camping coffee weigh?', answer: 'A tube of instant coffee (27 servings) weighs approximately 100 grams — far lighter than a French press, pour-over kit, or percolator. It\'s the lightest coffee option for backpacking.' },
    ],
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Camping Coffee', url: '/camping-coffee' }],
  },
  breadcrumb: 'Camping Coffee',
  hero: {
    eyebrow: 'Camping Coffee',
    title: 'The Best Coffee for Camping',
    subtitle: 'No machine. No grinder. No percolator. No cleanup. Just hot water from your camp stove and a tube of premium freeze-dried coffee. The lightest, simplest camp coffee you can make.',
  },
  sections: [
    {
      heading: 'Why Instant Coffee Is the Best Camp Coffee',
      paragraphs: [
        'When you\'re camping, every ounce matters. Traditional camp coffee methods — percolators, French presses, pour-over kits — add weight, require cleanup, and often produce inconsistent results at altitude. Instant coffee solves all of this.',
        'A tube of freeze-dried instant coffee weighs about 100 grams and contains 27 servings. That\'s lighter than any brewing device, requires no cleanup, and produces a consistent cup every time — whether you\'re at sea level or 10,000 feet.',
      ],
    },
    {
      heading: 'How to Make Coffee While Camping',
      paragraphs: [
        'The process is simple:',
      ],
      bullets: [
        'Boil water on your camp stove or fire (or use water just off the boil)',
        'Add 1 teaspoon of instant coffee to your cup or mug',
        'Pour 8–10 oz of hot water and stir',
        'Your coffee is ready in under 30 seconds',
        'No filters to pack out, no grounds to clean, no equipment to wash',
      ],
    },
    {
      heading: 'Mushroom Coffee for the Trail',
      paragraphs: [
        'If you want more than just caffeine on the trail, mushroom coffee adds functional mushrooms like Lion\'s Mane and Chaga to your instant coffee. These adaptogenic mushrooms are designed to support focus and balanced energy — useful for long hikes, early morning starts, and high-altitude adventures.',
        'Like the traditional instant coffee, mushroom coffee comes in the same compact tube format — 27 servings, no machine, just hot water.',
      ],
    },
  ],
  features: [
    { title: 'Ultralight', detail: '~100g per tube. Lighter than any brewing device.' },
    { title: 'Zero Cleanup', detail: 'No grounds, no filters, no press to wash. Pack it in, pack it out.' },
    { title: 'Altitude-Proof', detail: 'Consistent results at any elevation. No brewing variables.' },
  ],
  faqs: [
    { question: 'What is the best coffee for camping?', answer: 'The best coffee for camping is premium freeze-dried instant coffee. It needs no machine, no grinder, no filters, and no cleanup — just hot water from a camp stove. A tube of 27 servings is compact and lightweight.' },
    { question: 'Can you make coffee while camping without a machine?', answer: 'Yes. Instant coffee dissolves in hot water from a camp stove or kettle. No French press, no pour-over, no percolator needed. Just add hot water, stir, and drink.' },
    { question: 'How much does camping coffee weigh?', answer: 'A tube of instant coffee (27 servings) weighs approximately 100 grams — far lighter than a French press, pour-over kit, or percolator. It\'s the lightest coffee option for backpacking.' },
    { question: 'Does instant coffee taste good while camping?', answer: 'Premium freeze-dried instant coffee tastes remarkably close to freshly brewed coffee. The freeze-drying process preserves the flavor compounds. At camp, after a cold morning, a hot cup of quality coffee tastes excellent regardless of the method.' },
  ],
  products: [
    { name: 'Shop Instant Coffee', path: '/shop/instant-coffee' },
    { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    { name: 'Shop Travel Coffee', path: '/shop/travel-coffee' },
  ],
  cta: {
    title: 'Better Camp Coffee. Less Pack Weight.',
    subtitle: 'Premium freeze-dried coffee for the trail. No machine, no cleanup, no compromise.',
    buttonText: 'Shop Travel Coffee',
    buttonLink: '/shop/travel-coffee',
  },
};

export default function CampingCoffee() {
  return <SEOLandingPage {...DATA} />;
}