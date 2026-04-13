import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  name: "Eagle's Flight Blend",
  subtitle: 'Soar Higher with Bold Strength',
  shopify_handle: 'eagles-flight-blend',
  price: 20.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/31.png?v=1776038383',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/hjvhjv.png?v=1776038383',
  color: '#8B6D47',
  icon: '🦅',
  roastProfile: 'Strong Dark Roast',
  roastLevel: 'Dark',
  body: 'Intense · Robust',
  description: 'Soar higher with Eagle\'s Flight Blend — a strong dark roast that embodies the bold, fearless spirit of the American bald eagle. Intense and robust with notes of praline and roasted peanuts, this full-bodied coffee delivers power and focus in every cup.',
  everydayMessage: 'Perfect for early risers, adventurers, and anyone who lives life at full altitude.',
  tastingNotes: [
    'Praline',
    'Roasted Peanuts',
    'Dark Chocolate'
  ],
  bestFor: 'Bold flavor lovers, early risers',
  brewingTips: 'Drip, French Press, Espresso',
  sizes: ['Ground', 'Whole Bean'],
  tagline: '🔥 Part of the Liberty Icons Series',
  taglineLabel: 'Liberty Icons',
  relatedProducts: [
    { name: 'Lady Liberty Blend', handle: 'lady-liberty-blend' },
    { name: "Uncle Sam's Bold Brew", handle: 'uncle-sams-bold-brew' },
    { name: 'Liberty Torch Blend', handle: 'liberty-torch-blend' }
  ],
  madeInUSA: true
};

export default function EaglesFlightBlend() {
  return <FounderProductPage DATA={DATA} />;
}