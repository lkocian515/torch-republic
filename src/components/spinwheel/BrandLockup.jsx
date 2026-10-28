import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';

/**
 * The approved gold-and-ivory lockup, shown above the headline: the best match
 * for the navy sky, gold frame and glass sliver of the popup.
 *
 * 190–220px on a phone, 230–270px from the two-column layout up, so the email
 * field and the primary action stay inside the usable mobile area.
 */
export default function BrandLockup() {
  return (
    <div className="mb-4 flex justify-center sm:mb-6">
      <LogoArtwork
        crop="lockup"
        className="w-[clamp(180px,56vw,220px)] sm:w-[clamp(230px,32vw,268px)]"
      />
    </div>
  );
}