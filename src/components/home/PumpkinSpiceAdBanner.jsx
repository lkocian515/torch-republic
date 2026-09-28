import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Reusable seasonal promotional banner — full-width image with a CTA bar below.
// Accepts props so it can be reused for future special drops.
// Default values target the Pumpkin Spice Halloween drop.
const DEFAULT_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4e4905fcf_file_000000004e3081f6b4d099525b2b5713.png';

const THEME = {
  bg: '#2A1A12',        // dark espresso brown — matches image background
  bgAccent: '#3D2817',  // gradient lift
  cream: '#F7EEDD',     // label cream
  terracotta: '#D6743A', // pumpkin orange CTA
  terracottaHover: '#B8602C',
};

export default function PumpkinSpiceAdBanner({
  image = DEFAULT_IMAGE,
  link = '/products/pumpkin-spice-whole-bean-coffee',
  ctaText = 'Shop the Drop',
  alt = 'Torch Republic Pumpkin Spice Whole Bean Coffee — Halloween Special Edition',
  ariaLabel = 'Shop Pumpkin Spice Whole Bean Coffee',
}) {
  return (
    <section className="w-full" aria-label={ariaLabel}>
      {/* Full-width clickable image */}
      <Link to={link} className="block w-full" aria-label={ariaLabel}>
        <img
          src={image}
          alt={alt}
          className="block w-full"
          style={{ maxHeight: '70vh', objectFit: 'cover', objectPosition: 'center' }}
          loading="lazy"
        />
      </Link>

      {/* CTA bar — styled to transition seamlessly from the image's dark base */}
      <div
        className="flex w-full justify-center"
        style={{
          background: `linear-gradient(180deg, ${THEME.bg} 0%, ${THEME.bgAccent} 100%)`,
          padding: '1.5rem 1.25rem',
        }}
      >
        <Link
          to={link}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-all"
          style={{
            background: THEME.terracotta,
            color: THEME.cream,
            border: `1px solid ${THEME.cream}55`,
            borderRadius: '999px',
            padding: '0.875rem 2.25rem',
            letterSpacing: '0.16em',
          }}
        >
          {ctaText}
          <ArrowRight size={14} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}