import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  name: 'Lady Liberty Blend',
  subtitle: 'The Symbol of Freedom, Reimagined',
  shopify_handle: 'lady-liberty-blend',
  format: 'WHOLE BEAN BOX',
  price: 20.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/29.png?v=1776037980',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/IMG_20260405_041048.jpg?v=1776038585',
  color: '#B38B4D',
  icon: '🗽',
  roastProfile: 'Golden Medium Roast',
  roastLevel: 'Medium',
  body: 'Smooth · Balanced',
  description: 'Lady Liberty stands as a beacon to the world—and this blend carries that same steady strength. Smooth, approachable, and timeless, this golden medium roast delivers a balanced cup with notes of roasted nuts, honey, and milk chocolate.',
  everydayMessage: 'This is the everyday freedom cup—the one you come back to.',
  tastingNotes: [
    'Roasted Nuts',
    'Honey',
    'Milk Chocolate'
  ],
  bestFor: 'Daily drinkers, smooth finish lovers',
  brewingTips: 'Pour Over, Drip, Cold Brew',
  sizes: ['Whole Bean', 'Ground'],
  tagline: '🔥 Part of the Liberty Icons Series',
  taglineLabel: 'Liberty Icons',
  relatedProducts: [
    { name: "Eagle's Flight Blend", handle: 'eagles-flight-blend' },
    { name: "Uncle Sam's Bold Brew", handle: 'uncle-sams-bold-brew' },
    { name: 'Liberty Torch Blend', handle: 'liberty-torch-blend' }
  ],
  madeInUSA: true
};

export default function LadyLibertyBlend() {
  return <FounderProductPage DATA={DATA} />;
}