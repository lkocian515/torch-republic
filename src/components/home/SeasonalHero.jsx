import React from 'react';
import { Link } from 'react-router-dom';

const HERO_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/eb4f17b1e_file_000000009e688243af2b3098359c61f7.png';

export default function SeasonalHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: '#1A0F0A' }} aria-label="Pumpkin Spice Whole Bean Coffee — Halloween Special Edition">
      <img
        src={HERO_IMAGE}
        alt="Pumpkin Spice Whole Bean Coffee — Halloween Special Edition from Torch Republic Coffee Company"
        className="block w-full"
        style={{ maxHeight: '82vh', objectFit: 'cover', objectPosition: 'center' }}
        fetchPriority="high"
      />
      {/* Transparent clickable overlay positioned over the "SHOP THE DROP" button in the image */}
      <Link
        to="/products/pumpkin-spice-whole-bean-coffee"
        aria-label="Shop the Pumpkin Spice drop"
        className="absolute block"
        style={{
          left: '7%',
          top: '57%',
          width: '28%',
          height: '11%',
          zIndex: 5,
        }}
      />

      {/* Urgency message under the hero */}
      <div className="text-center" style={{ background: '#1A0F0A', padding: '1.25rem 1.5rem 1.75rem' }}>
        <Link to="/products/pumpkin-spice-whole-bean-coffee" style={{ textDecoration: 'none' }}>
          <p className="font-serif italic" style={{ color: '#E6B7AD', fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', lineHeight: 1.5 }}>
            Something wicked is brewing. Pumpkin Spice Limited Seasonal Edition. Order now before it's sold out!
          </p>
        </Link>
      </div>

      {/* Smooth transition from dark seasonal hero into the light editorial hero */}
      <div aria-hidden="true" style={{ height: '3rem', background: 'linear-gradient(180deg, #1A0F0A 0%, #3D2A1E 35%, #8A7460 70%, #D8CCBC 90%, #F1ECE5 100%)' }} />
    </section>
  );
}