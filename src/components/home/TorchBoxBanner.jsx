import React from 'react';
import SubscribeToggle from '@/components/products/SubscribeToggle';

// Compatibility for older page layouts: use current coffee plans.
export default function TorchBoxBanner() {
  return <section className="max-w-5xl mx-auto px-6 py-8"><SubscribeToggle /></section>;
}
