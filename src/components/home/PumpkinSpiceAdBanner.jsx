import React from 'react';
import { Link } from 'react-router-dom';

// Full-width clickable promotional banner for the Pumpkin Spice seasonal drop.
// The image is a complete product-in-scene shot — no overlay text needed.
const AD_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4e4905fcf_file_000000004e3081f6b4d099525b2b5713.png';

export default function PumpkinSpiceAdBanner() {
  return (
    <section className="w-full" aria-label="Pumpkin Spice Whole Bean Coffee — Halloween Special Edition">
      <Link to="/products/pumpkin-spice-whole-bean-coffee" className="block w-full" aria-label="Shop Pumpkin Spice Whole Bean Coffee">
        <img
          src={AD_IMAGE}
          alt="Torch Republic Pumpkin Spice Whole Bean Coffee — Halloween Special Edition"
          className="block w-full"
          style={{ maxHeight: '70vh', objectFit: 'cover', objectPosition: 'center' }}
          loading="lazy"
        />
      </Link>
    </section>
  );
}