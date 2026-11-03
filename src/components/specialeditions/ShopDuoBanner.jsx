import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Supplied Autumn Coffee Duo artwork, displayed whole at its native 16:9 ratio.
const ART = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0dcd57ad2_01-15443.png';

export default function ShopDuoBanner() {
  return (
    <section className="w-full px-4 py-5 sm:px-6 md:py-8" aria-label="Autumn Coffee Duo">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-lg" style={{ background: '#F7F2E9' }}>
        <img
          src={ART}
          alt="Torch Republic Autumn Coffee Duo featuring Harvest Moon Pecan and Cinnamon Hearth."
          width="1536"
          height="864"
          className="block h-auto w-full"
          style={{ objectFit: 'contain' }}
          fetchPriority="high"
          decoding="async"
        />
        <div className="flex justify-center px-4 py-4 sm:py-5">
          <Link
            to="/duos/autumn-coffee-duo"
            className="inline-flex min-h-[48px] w-full max-w-[340px] items-center justify-center gap-2 rounded-md px-6 py-3 font-heading text-base font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: '#B7653E', color: '#FFF7E8', textDecoration: 'none' }}
          >
            View Autumn Duo
            <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
