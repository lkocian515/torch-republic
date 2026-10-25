import React from 'react';
import { TORCH_LOGO } from '../portfolioTheme';

/**
 * The Torch Republic coffee bag, built from the real brand mark and real type
 * rather than a generated photo — so the label never shows invented or
 * unreadable lettering.
 */
export default function CoffeeBag() {
  return (
    <div className="bag" aria-hidden="true">
      <div className="bag-body">
        <span className="bag-seal" />
        <div className="bag-label">
          <img className="bag-logo" src={TORCH_LOGO} alt="" />
          <p className="bag-name">Torch Republic</p>
          <p className="bag-sub">Coffee Company</p>
        </div>
      </div>
    </div>
  );
}