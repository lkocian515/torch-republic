import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  name: "Uncle Sam's Bold Brew",
  subtitle: 'Uncle Sam Wants YOU to Wake Up and Taste Freedom',
  shopify_handle: 'uncle-sams-bold-brew',
  format: 'WHOLE BEAN BOX',
  price: 20.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/27.png?v=1776038585',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/nbhjbijk.png?v=1776038585',
  color: '#9B7B4D',
  icon: '🎩',
  roastProfile: 'Extra Bold Dark Roast',
  roastLevel: 'Dark',
  body: 'Heavy · Intense',
  description: 'Uncle Sam\'s Bold Brew is an extra bold dark roast loaded with rich bittersweet chocolate and a touch of smoke — intense, unapologetic, and built for true believers. This heavy-bodied coffee delivers the kind of bold flavor that fuels big ideas and even bigger action.',
  everydayMessage: 'No nonsense, all American. Built for those who take action.',
  tastingNotes: [
    'Rich Bittersweet Chocolate',
    'Smoke',
    'Deep Roast'
  ],
  bestFor: 'Bold espresso lovers, action-takers',
  brewingTips: 'French Press, Espresso, Bold Drip',
  sizes: ['Whole Bean', 'Ground'],
  tagline: '🔥 Part of the Liberty Icons Series',
  taglineLabel: 'Liberty Icons',
  relatedProducts: [
    { name: 'Lady Liberty Blend', handle: 'lady-liberty-blend' },
    { name: "Eagle's Flight Blend", handle: 'eagles-flight-blend' },
    { name: 'Liberty Torch Blend', handle: 'liberty-torch-blend' }
  ],
  madeInUSA: true
};

export default function UncleSamsBoldBrew() {
  return <FounderProductPage DATA={DATA} />;
}