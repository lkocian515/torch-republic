import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  name: 'Old Glory House Blend',
  subtitle: 'The Blend That Built America',
  shopify_handle: 'old-glory-house-blend',
  format: 'WHOLE BEAN BOX',
  price: 18.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/j9ihuio.png?v=1776038315',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/old-glory-2.png?v=1776038800',
  color: '#B38B4D',
  icon: '🇺🇸',
  roastProfile: 'Classic Medium Roast',
  roastLevel: 'Medium',
  body: 'Balanced · Accessible',
  description: 'Old Glory House Blend is a timeless American classic — a versatile medium roast that works beautifully in every brewing method. Notes of caramel, sweet cream, and subtle spice create a welcoming, approachable cup that brings people together.',
  everydayMessage: 'This is the coffee that sparked conversations, fueled revolutions, and built the American spirit.',
  tastingNotes: [
    'Caramel',
    'Sweet Cream',
    'Subtle Spice'
  ],
  bestFor: 'Everyday drinkers, the whole family',
  brewingTips: 'Drip, French Press, Pour Over, Espresso',
  sizes: ['Whole Bean', 'Ground'],
  tagline: '🔥 Part of the Liberty Icons Series',
  taglineLabel: 'Liberty Icons',
  relatedProducts: [
    { name: 'Lady Liberty Blend', handle: 'lady-liberty-blend' },
    { name: "Eagle's Flight Blend", handle: 'eagles-flight-blend' },
    { name: "Uncle Sam's Bold Brew", handle: 'uncle-sams-bold-brew' }
  ],
  madeInUSA: true
};

export default function OldGloryHouseBlend() {
  return <FounderProductPage DATA={DATA} />;
}