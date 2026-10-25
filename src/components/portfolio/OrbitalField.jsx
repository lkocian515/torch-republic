import React, { useId } from 'react';
import { P } from './portfolioTheme';

/**
 * Decorative orbital linework — thin arcs and small glowing nodes suggesting
 * evaluation, systems and iteration. Purely presentational: it carries no
 * information, so it is hidden from assistive technology.
 */
export default function OrbitalField({ className = '', opacity = 1 }) {
  const raw = useId();
  const uid = raw.replace(/[^a-zA-Z0-9]/g, '');
  const glowId = `po-glow-${uid}`;

  return (
    <svg
      className={`po-orbital ${className}`}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
      style={{ opacity }}
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.accent} stopOpacity="0.42" />
          <stop offset="70%" stopColor={P.accent} stopOpacity="0.08" />
          <stop offset="100%" stopColor={P.accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="240" fill={`url(#${glowId})`} />

      <g className="po-orbital-arcs">
        <g fill="none" stroke={P.accent} strokeWidth="1">
          <ellipse cx="300" cy="300" rx="262" ry="120" transform="rotate(-24 300 300)" opacity="0.55" />
          <ellipse cx="300" cy="300" rx="214" ry="96" transform="rotate(27 300 300)" opacity="0.4" />
          <circle cx="300" cy="300" r="158" opacity="0.26" />
        </g>

        <g>
          <circle cx="512" cy="214" r="8" fill={P.accent} opacity="0.18" />
          <circle cx="512" cy="214" r="3.5" fill={P.accentInk} />
          <circle cx="116" cy="402" r="6" fill={P.accent} opacity="0.18" />
          <circle cx="116" cy="402" r="2.5" fill={P.accentInk} />
          <circle cx="356" cy="124" r="5" fill={P.accent} opacity="0.18" />
          <circle cx="356" cy="124" r="2" fill={P.accentInk} />
        </g>
      </g>
    </svg>
  );
}