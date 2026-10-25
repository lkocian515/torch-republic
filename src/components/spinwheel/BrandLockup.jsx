import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';

/** The supplied Torch Republic logo, shown above the wheel. */
export default function BrandLockup() {
  return (
    <div className="flex justify-center px-6 pt-5 pb-1">
      <LogoArtwork crop="lockup" style={{ width: '100%', maxWidth: 300 }} />
    </div>
  );
}