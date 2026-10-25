import React from 'react';
import OrbitalField from '../OrbitalField';
import SitePreview from './SitePreview';
import CoffeeBag from './CoffeeBag';

const LABELS = {
  torch: 'A laptop showing the Torch Republic Coffee Company storefront, with a Torch Republic coffee bag standing beside it.',
  lukes: "A laptop showing the Luke's Light resource site, with a lighthouse at dusk.",
};

/**
 * Project visual: a laptop presenting a real site preview, on a dark stage with
 * restrained orbital linework. The Torch Republic project adds the coffee bag
 * beside the laptop.
 */
export default function ProjectVisual({ variant }) {
  const isTorch = variant === 'torch';

  return (
    <div className="pv-stage" role="img" aria-label={LABELS[variant]}>
      <OrbitalField className="pv-stage-arc" opacity={0.5} />
      {isTorch && <CoffeeBag />}
      <div className="pv-device">
        <div className="pv-screen">
          <SitePreview variant={variant} />
        </div>
        <div className="pv-notch" />
        <div className="pv-base" />
      </div>
    </div>
  );
}