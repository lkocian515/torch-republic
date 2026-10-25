import React from 'react';
import { TORCH_LOGO, LUKES_LIGHT_IMAGE } from '../portfolioTheme';

/**
 * A scaled-down, real site preview rendered in the DOM — real text, real brand
 * mark, real photography. No invented slogans, product names, prices or claims:
 * only the site's own name, navigation words and generic action labels.
 */
export default function SitePreview({ variant }) {
  if (variant === 'torch') {
    return (
      <div className="pv pv-torch" aria-hidden="true">
        <div className="pv-bar">
          <img className="pv-logo" src={TORCH_LOGO} alt="" />
          <div className="pv-links">
            <span className="pv-link">Shop</span>
            <span className="pv-link">Coffee</span>
            <span className="pv-link">Journal</span>
          </div>
        </div>
        <div className="pv-body">
          <div className="pv-hero">
            <p className="pv-title">Torch Republic Coffee Company</p>
            <span className="pv-cta">Shop coffee</span>
          </div>
          <div className="pv-tiles">
            <span className="pv-tile" />
            <span className="pv-tile" />
            <span className="pv-tile" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pv pv-lukes" aria-hidden="true">
      <div className="pv-bar">
        <span className="pv-mark">Luke&rsquo;s Light</span>
        <div className="pv-links">
          <span className="pv-link">Resources</span>
          <span className="pv-link">Guidance</span>
          <span className="pv-link">Contact</span>
        </div>
      </div>
      <div className="pv-body">
        <div className="pv-photo">
          <img src={LUKES_LIGHT_IMAGE} alt="" />
          <span className="pv-photo-shade" />
          <div className="pv-photo-copy">
            <span className="pv-cta">Explore resources</span>
          </div>
        </div>
        <div className="pv-tiles">
          <span className="pv-tile" />
          <span className="pv-tile" />
          <span className="pv-tile" />
        </div>
      </div>
    </div>
  );
}