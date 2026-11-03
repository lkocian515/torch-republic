import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { duoName, duoPath } from '@/lib/duos';
import DuoPairImage from './DuoPairImage';
import DuoStatusBadge from './DuoStatusBadge';

const FOCUS = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/**
 * One image-led duo card. The paired image, the title and the "View duo"
 * button are three separate links to the same canonical page (no nesting).
 */
export default function DuoCard({ pairing, bags, title, kicker, windowText, status, note }) {
  const to = duoPath(pairing);
  const heading = title || duoName(pairing);
  const names = bags.map((bag) => (bag.qty > 1 ? `${bag.qty} \u00d7 ${bag.name}` : bag.name));
  const canonical = duoName(pairing);

  return (
    <article className="card-torch flex h-full flex-col" style={{ padding: '1rem' }}>
      <Link to={to} className={`block ${FOCUS}`} aria-label={`${heading}: ${names.join(' and ')}. View duo`}>
        {pairing.heroArt ? (
          <img
            src={pairing.heroArt.src}
            alt={pairing.heroArt.alt}
            width="1536"
            height="864"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
            style={{ objectFit: 'contain', borderRadius: 6 }}
          />
        ) : (
          <DuoPairImage bags={bags} scene={pairing.scene || null} />
        )}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow" style={{ margin: 0 }}>{kicker}</p>
        <DuoStatusBadge status={status} />
      </div>

      <h3 className="h3 mt-2" style={{ margin: '0.5rem 0 0' }}>
        <Link to={to} className={FOCUS}>{heading}</Link>
      </h3>
      {heading !== canonical ? (
        <p className="body" style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
          Same pairing as the {canonical}
        </p>
      ) : null}
      <p className="body" style={{ margin: '0.5rem 0 0', fontSize: '0.9375rem' }}>{names.join(' + ')}</p>
      {windowText ? (
        <p className="font-mono" style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}>
          {windowText}
        </p>
      ) : null}
      {note ? (
        <p className="body" style={{ margin: '0.5rem 0 0', fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>{note}</p>
      ) : null}

      <Link
        to={to}
        className={`btn btn-ghost mt-auto ${FOCUS}`}
        style={{ marginTop: '1rem' }}
        aria-label={`View duo: ${heading}`}
      >
        View duo <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}