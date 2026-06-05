import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';
import { useNoIndex } from '@/hooks/useNoIndex';

const DATA = {
  name: "Rosie's Grind",
  subtitle: 'Channel American Grit and Resilience',
  shopify_handle: 'rosies-grind',
  format: 'WHOLE BEAN BOX',
  price: 20.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/28.png?v=1776038440',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/vhjvhjm.png?v=1776038440',
  color: '#A8893A',
  icon: '💪',
  roastProfile: 'Bold Medium Dark Roast',
  roastLevel: 'Medium Dark',
  body: 'Full-bodied · Satisfying',
  description: 'Channel the unstoppable strength of Rosie the Riveter with Rosie\'s Grind — a bold medium dark roast built for those who roll up their sleeves and get it done. Rich notes of praline and roasted peanuts deliver a satisfying, full-bodied cup with just the right edge.',
  everydayMessage: 'Whether you\'re fueling a long workday or powering through your next big project, this blend brings determination in every sip.',
  tastingNotes: [
    'Praline',
    'Roasted Peanuts',
    'Smooth Finish'
  ],
  bestFor: 'Hard workers, project powerers',
  brewingTips: 'Drip, French Press, Espresso',
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

export default function RosiesGrind() {
  useNoIndex();
  return <FounderProductPage DATA={DATA} />;
}