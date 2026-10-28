import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';

/**
 * The supplied Torch Republic logo, shown above the headline.
 * 180–220px on a phone, 220–260px from the two-column layout up.
 */
export default function BrandLockup() {
  return (
    <div className="mb-5 flex justify-center sm:mb-6">
      <LogoArtwork
        crop="lockup"
        style={{ width: 'clamp(180px, 52vw, 260px)', height: 'auto' }}
      />
    </div>
  );
}