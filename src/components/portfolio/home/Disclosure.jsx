import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';

/**
 * Accessible expand-and-collapse panel. Built on native <details>, so it works
 * with keyboard and assistive technology without extra scripting.
 */
export default function Disclosure({ title, meta, count, defaultOpen = false, children }) {
  return (
    <details className="pf-disc" open={defaultOpen}>
      <summary>
        <span style={{ minWidth: 0 }}>
          <span
            style={{
              display: 'block',
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.95rem',
              color: P.ink,
            }}
          >
            {title}
          </span>
          {meta && (
            <span
              style={{
                display: 'block',
                marginTop: '0.25rem',
                fontFamily: FONT_MONO,
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: P.muted,
              }}
            >
              {meta}
            </span>
          )}
        </span>
        {count != null && (
          <span
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              fontWeight: 600,
              color: P.accentInk,
              whiteSpace: 'nowrap',
            }}
          >
            {count}
          </span>
        )}
      </summary>
      <div className="pf-disc-body">{children}</div>
    </details>
  );
}