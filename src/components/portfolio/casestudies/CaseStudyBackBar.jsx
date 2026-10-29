import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { P, FONT_SANS } from '../portfolioTheme';

// Sticky bar pinned under the portfolio nav, so the way back to the project
// list is always reachable no matter how far down the case study you are.
export default function CaseStudyBackBar({ href, label = 'Back to Projects' }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 'calc(62px + env(safe-area-inset-top))',
        zIndex: 45,
        background: 'rgba(10,10,12,0.90)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${P.rule}`,
      }}
    >
      <div className="mx-auto max-w-[900px] px-5 sm:px-6 md:px-10">
        <Link
          to={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            minHeight: 48,
            fontFamily: FONT_SANS,
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.02em',
            color: P.secondary,
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {label}
        </Link>
      </div>
    </div>
  );
}