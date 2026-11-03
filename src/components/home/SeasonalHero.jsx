import React from 'react';
import { Link } from 'react-router-dom';

const HERO_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffcb222c2_file_00000000c5b881f69c2374ca2aa54ab3.png';

export default function SeasonalHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#1A0F0A' }} aria-label="Pumpkin Spice coffee pouch — Halloween Special Edition">
      <Link to="/products/pumpkin-spice-whole-bean-coffee" aria-label="Shop the Pumpkin Spice drop" className="block w-full">
        <img
          src={HERO_IMAGE}
          alt="Pumpkin Spice coffee pouch, Halloween Special Edition from Torch Republic Coffee Company. Tap to shop the drop."
          className="block w-full cursor-pointer"
          fetchPriority="high"
        />
      </Link>

      {/* Live text keeps the seasonal offer readable at every screen size. */}
      <div className="text-center" style={{ background: '#1A0F0A', padding: '1.25rem 1.5rem 1.75rem' }}>
        <h1 className="font-serif font-bold" style={{ color: '#F7F2E9', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', lineHeight: 1.2 }}>
          Pumpkin Spice, for a cozier morning.
        </h1>
        <p className="mt-3 font-heading" style={{ color: '#E6D8CA', fontSize: '1rem', lineHeight: 1.6 }}>
          Limited seasonal release · Ground or whole bean · 12 oz · $24.99
        </p>
        <Link to="/products/pumpkin-spice-whole-bean-coffee" className="inline-flex items-center justify-center mt-5 px-7 py-3 rounded-md font-heading font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ background: '#F7F2E9', color: '#3D2418', minHeight: 48 }}>
          Shop Pumpkin Spice →
        </Link>
      </div>

      {/* Smooth transition from dark seasonal hero into the light editorial hero */}
      <div aria-hidden="true" style={{ height: '3rem', background: 'linear-gradient(180deg, #1A0F0A 0%, #3D2A1E 35%, #8A7460 70%, #D8CCBC 90%, #F1ECE5 100%)' }} />
    </section>
  );
}