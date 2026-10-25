import React from 'react';
import OrbitalField from '../OrbitalField';
import ScreenshotSlot from '../ScreenshotSlot';
import { TORCH_PRODUCT_IMAGE, LUKES_LIGHT_IMAGE } from '../portfolioTheme';

// One presentation frame for both projects, so the two sites read as a matched
// pair: same panel, same proportion, same caption treatment. Both images are
// real assets from the brand they represent.
const SHOTS = {
  torch: {
    src: TORCH_PRODUCT_IMAGE,
    alt: 'Torch Republic Coffee Company: two resealable pouches, Instant Classic Coffee and Instant Coffee with Mushrooms, standing on a marble kitchen counter beside two mugs, a bowl of roasted beans, and fresh mushrooms.',
    caption: 'torchrepublic.com',
    objectPosition: 'center',
  },
  lukes: {
    src: LUKES_LIGHT_IMAGE,
    alt: "Luke's Light artwork: an illustrated lighthouse with its beam lit, standing on a dark shoreline.",
    caption: 'lukeslight.org',
    objectPosition: 'center',
  },
};

export default function ProjectVisual({ variant }) {
  const shot = SHOTS[variant] || SHOTS.torch;

  return (
    <div className="pv-stage">
      <OrbitalField className="pv-stage-arc" opacity={0.5} />
      <div className="pv-shot">
        <ScreenshotSlot
          src={shot.src}
          alt={shot.alt}
          caption={shot.caption}
          aspectRatio="4 / 5"
          objectPosition={shot.objectPosition}
        />
      </div>
    </div>
  );
}