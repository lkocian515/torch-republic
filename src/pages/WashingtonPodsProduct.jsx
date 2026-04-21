import React from 'react';
import PodsProductPage from '../components/products/PodsProductPage';

const DATA = {
  title: 'Washington Blend Pods',
  code: 'TR-POD-001',
  accent: '#C9A24A',
  price: '$16.99',
  shopifyHandle: 'washington-blend-coffee-pods',
  heroImage: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6bef9712-230c-45c1-911d-f0780d1fafc8.png?v=1776641348',
  images: [
    'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6bef9712-230c-45c1-911d-f0780d1fafc8.png?v=1776641348',
  ],
  hook: 'Strength without noise. Leadership without compromise.',
  heroDescription: 'Washington didn\'t chase comfort — he built discipline. This blend reflects that same standard: bold, steady, and built to endure. Premium dark roast in precision-sealed Keurig-compatible pods.',
  flavorNotes: {
    roast: 'Dark Roast',
    body: 'Full, rich, structured',
    finish: 'Smooth with smoky depth',
    notes: ['Cocoa', 'Smoke', 'Bold Spice'],
  },
  founderStory: 'Through brutal winters and impossible odds, one thing remained constant — discipline. Washington Blend is built the same way: bold, unwavering, and built to endure.',
};

export default function WashingtonPodsProduct() {
  return <PodsProductPage data={DATA} />;
}