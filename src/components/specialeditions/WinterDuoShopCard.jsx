import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionState } from '@/lib/specialEditions';
import { WINTER_DUO, winterDuoEditions } from '@/lib/winterDuo';

/**
 * Winter Duo feature card inside Shop All, placed directly beneath the everyday
 * instant lineup.
 *
 * Follows the shop page's own type and colour system, and carries no price and
 * no purchase control while the releases are in preparation.
 */
export default function WinterDuoShopCard() {
  const { editions, upcoming, loading } = useSpecialEditions();

  if (loading) return null;

  const duo = winterDuoEditions(editions, upcoming);
  if (duo.length === 0) return null;

  return (
    <section className="px-6 pb-16 md:px-10" aria-labelledby="winter-duo-shop-heading">
      <div className="mx-auto max-w-[1240px]">
        <article className="overflow-hidden" style={{ background: '#FFFFFF', border: '1px solid #E4D8C9', borderRadius: 8 }}>
          <img
            src={WINTER_DUO.image}
            alt={WINTER_DUO.imageAlt}
            width="1536"
            height="864"
            className="block h-auto w-full"
            style={{ objectFit: 'contain' }}
            loading="lazy"
            decoding="async"
          />

          <div className="px-6 py-8 text-center md:px-10 md:py-10">
            <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#A97B32' }}>
              {WINTER_DUO.eyebrow}
            </p>
            <h2
              id="winter-duo-shop-heading"
              className="mt-2 font-serif font-semibold"
              style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', color: '#292622' }}
            >
              {WINTER_DUO.name}
            </h2>
            <p
              className="mt-3 font-mono"
              style={{ fontSize: '12px', letterSpacing: '0.06em', fontWeight: 600, color: '#B7653E' }}
            >
              {WINTER_DUO.flavorLine}
            </p>
            <p className="mx-auto mt-3 max-w-xl font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.7 }}>
              {WINTER_DUO.supporting}
            </p>

            {/* Each coffee reports its own availability, so one release landing
                early never makes the pair look orderable. */}
            <ul className="mt-5 flex flex-wrap justify-center gap-2" style={{ listStyle: 'none', padding: 0 }}>
              {duo.map((edition) => (
                <li
                  key={edition.id}
                  className="inline-flex items-center gap-2 px-3 py-1"
                  style={{ border: '1px solid #E4D8C9', borderRadius: 999 }}
                >
                  <span className="font-heading text-sm font-semibold" style={{ color: '#292622' }}>
                    {edition.name}
                  </span>
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: '10px', letterSpacing: '0.14em', color: '#A97B32' }}
                  >
                    {editionState(edition).label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex justify-center">
              <Link
                to={WINTER_DUO.path}
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B7653E]"
                style={{
                  border: '1px solid #B7653E',
                  color: '#B7653E',
                  minHeight: 48,
                  padding: '0.875rem 2rem',
                  borderRadius: 999,
                }}
              >
                {WINTER_DUO.ctaLabel}
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}