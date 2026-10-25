import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WINTER_DUO, isWinterDuoEdition } from '@/lib/winterDuo';

/**
 * Small cross-link shown on each Winter Duo coffee's own page.
 *
 * Renders nothing for any other edition, so the shared product template is
 * unaffected.
 */
export default function WinterDuoCrossLink({ edition }) {
  if (!isWinterDuoEdition(edition)) return null;

  return (
    <Link
      to={WINTER_DUO.path}
      className="mt-6 flex items-center justify-between gap-3 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ borderTop: '1px solid hsl(var(--border))', borderBottom: '1px solid hsl(var(--border))' }}
    >
      <span className="font-heading text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
        Part of the Winter Duo
      </span>
      <span
        className="inline-flex items-center gap-1 font-mono uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.14em', color: 'hsl(var(--primary))' }}
      >
        {WINTER_DUO.teaserLinkLabel}
        <ArrowRight size={13} strokeWidth={2} />
      </span>
    </Link>
  );
}