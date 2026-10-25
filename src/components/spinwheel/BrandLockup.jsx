import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';

/** The supplied Torch Republic logo, shown above the headline. */
export default function BrandLockup() {
  return (
    <div className="mb-6 flex justify-center">
      <LogoArtwork crop="lockup" style={{ width: '100%', maxWidth: 230 }} />
    </div>
  );
}