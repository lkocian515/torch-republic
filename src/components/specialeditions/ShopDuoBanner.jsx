import React from 'react';

// Supplied Autumn Coffee Duo artwork, displayed whole at its native 16:9 ratio.
const ART = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0dcd57ad2_01-15443.png';

export default function ShopDuoBanner() {
  return (
    <section className="w-full px-4 py-5 sm:px-6 md:py-8" style={{ background: '#F7F2E9' }} aria-label="Autumn Coffee Duo">
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
      </div>
    </section>
  );
}
