import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionPath, COMING_SOON_COPY } from '@/lib/specialEditions';
import EditionStatusChip from '../../specialeditions/EditionStatusChip';
import { D, SERIF, SANS, MONO } from './driftTheme';

/**
 * Upcoming seasonal releases, featured between the special-edition hero and the
 * everyday coffee.
 *
 * These are announced but not produced, so nothing here is purchasable: no
 * price, no grind selector, no cart action. Only the confirmed product name,
 * flavor descriptor and planned release month are shown.
 */
export default function DriftUpcomingReleases() {
  const { upcoming, loading } = useSpecialEditions();

  if (loading || upcoming.length === 0) return null;

  return (
    <section style={{ background: D.paper }} aria-label="Upcoming seasonal releases">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p
            style={{
              fontFamily: MONO,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: D.terracotta,
              margin: '0 0 1rem',
            }}
          >
            In Preparation
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: D.ink,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            Coming later this season.
          </h2>
          <p
            style={{
              fontFamily: SANS,
              fontSize: '1rem',
              lineHeight: 1.7,
              color: D.secondary,
              margin: '1rem auto 0',
              maxWidth: '52ch',
            }}
          >
            Two limited seasonal roasts are in the works. Here is what is confirmed so far.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {upcoming.map((edition) => (
            <article key={edition.id} className="flex flex-col" style={{ minWidth: 0 }}>
              <Link
                to={editionPath(edition)}
                aria-label={`Preview ${edition.name}`}
                className="block"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="mb-6 flex items-center justify-center"
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: D.cream,
                    minWidth: 0,
                    border: D.borderHairline,
                    boxShadow: D.shadowSoft,
                  }}
                >
                  <img
                    src={edition.image_url}
                    alt={`Torch Republic ${edition.name} seasonal coffee pouch`}
                    loading="lazy"
                    style={{
                      width: 'clamp(180px, 62%, 300px)',
                      aspectRatio: '1 / 1',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'drop-shadow(0 8px 20px rgba(36,26,22,0.12))',
                    }}
                  />
                </div>
              </Link>

              <div style={{ minWidth: 0 }}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <EditionStatusChip state="pending" label="Coming Soon" />
                  {edition.badge && (
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        color: D.terracotta,
                      }}
                    >
                      {edition.badge}
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                    color: D.ink,
                    margin: '0 0 0.5rem',
                  }}
                >
                  {edition.name}
                </h3>

                {edition.short_description && (
                  <p
                    style={{
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: D.terracotta,
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {edition.short_description}
                  </p>
                )}

                {edition.release_month && (
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: D.secondary,
                      margin: '0 0 1rem',
                    }}
                  >
                    Planned release · {edition.release_month}
                  </p>
                )}

                <p
                  style={{
                    fontFamily: SANS,
                    fontSize: '0.875rem',
                    lineHeight: 1.65,
                    color: D.secondary,
                    margin: '0 0 1.25rem',
                    maxWidth: '42ch',
                  }}
                >
                  {COMING_SOON_COPY}
                </p>

                <Link
                  to={editionPath(edition)}
                  className="group inline-flex items-center gap-2"
                  style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none' }}
                >
                  Preview product
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}