import React from 'react';
import FounderProductPage from '../components/founders/FounderProductPage';

const DATA = {
  name: 'Liberty Torch Blend',
  subtitle: 'Light the Way with Eternal Freedom',
  shopify_handle: 'liberty-torch-blend',
  price: 20.00,
  image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/30_fda88503-e869-47ed-8acc-33230f6246c9.png?v=1776038701',
  image_2: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/bvbvhm.png?v=1776038701',
  color: '#C4A35A',
  icon: '🔥',
  roastProfile: 'Bright Medium Roast',
  roastLevel: 'Medium',
  body: 'Lively · Uplifting',
  description: 'Light the way with Liberty Torch Blend — a bright medium roast that burns with the eternal flame of liberty. Vibrant notes of sundried citrus and golden honey create a lively, uplifting cup with a clean finish.',
  everydayMessage: 'Ideal for those who want energy and clarity without the heaviness.',
  tastingNotes: [
    'Sundried Citrus',
    'Golden Honey',
    'Clean Finish'
  ],
  bestFor: 'Morning drinkers, citrus lovers',
  brewingTips: 'Pour Over, Drip, Cold Brew',
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

export default function LibertyTorchBlend() {
  return <FounderProductPage DATA={DATA} />;
}