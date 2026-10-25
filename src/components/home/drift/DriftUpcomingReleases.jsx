import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionPath, COMING_SOON_COPY } from '@/lib/specialEditions';
import EditionStatusChip from '../../specialeditions/EditionStatusChip';
import { SERIF, SANS, MONO } from './driftTheme';

// Same dark palette as the special-edition hero above, so the two sections read
// as one continuous dark band at the top of the homepage.
const T = {
  bg: '#1A0F0A',
  cream: '#F7EEDD',
  body: '#E6D8CA',
  terracotta: '#D6743A',
};

/**
 * Upcoming seasonal releases as dark hero banners, sitting directly under the
 * special-edition hero.
 *
 * These are announced but not produced, so nothing here is purchasable: no
 * price, no grind selector, no cart action. Only the confirmed product name,
 * flavor descriptor and planned release month are shown.
 */
export default function DriftUpcomingReleases() {
  const { upcoming, loading } = useSpecialEditions();

  if (loading || upcoming.length === 0) return null;

  return (
    <section style={{ background: T.bg }} aria-label="Upcoming seasonal releases">
      <div className="mx-auto max-w-[1200px] px-6 pt-14 pb-16 md:px-10 md:pt-20 md:pb-24">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: T.terracotta,
              margin: '0 0 1rem',
            }}
          >
            Seasonal Announcement
          </p>
          <h2
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: T.cream,
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
              color: T.body,
              margin: '1rem auto 0',
              maxWidth: '52ch',
            }}
          >
            Two limited seasonal roasts are in the works. Here is what is confirmed so far.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {upcoming.map((edition) => {
            const photo = edition.lifestyle_image || edition.image_url;

            return (
              <article
                key={edition.id}
                className="relative overflow-hidden"
                style={{
                  borderRadius: 14,
                  border: '1px solid rgba(214,116,58,0.22)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                }}
              >
                {photo && (
                  <img
                    src={photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                {/* Dark wash keeps the banner's own text readable over any photo. */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(26,15,10,0.30) 0%, rgba(26,15,10,0.55) 42%, rgba(26,15,10,0.94) 100%)',
                  }}
                />

                <div
                  className="relative flex flex-col justify-end"
                  style={{ minHeight: 'clamp(400px, 52vw, 560px)', padding: 'clamp(1.25rem, 3vw, 2.25rem)' }}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <EditionStatusChip state="pending" label="Coming Soon" />
                    {edition.badge && (
                      <span
                        style={{
                          fontFamily: MONO,
                          fontSize: '10px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          color: T.terracotta,
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
                      fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)',
                      lineHeight: 1.05,
                      color: T.cream,
                      margin: 0,
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
                        color: T.terracotta,
                        margin: '0.5rem 0 0',
                      }}
                    >
                      {edition.short_description}
                    </p>
                  )}

                  {edition.release_month && (
                    <p
                      style={{
                        fontFamily: MONO,
                        fontSize: '0.6875rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(230,216,202,0.8)',
                        margin: '0.75rem 0 0',
                      }}
                    >
                      Planned release · {edition.release_month}
                    </p>
                  )}

                  <p
                    style={{
                      fontFamily: SANS,
                      fontSize: '0.8125rem',
                      lineHeight: 1.6,
                      color: 'rgba(230,216,202,0.72)',
                      margin: '0.75rem 0 0',
                      maxWidth: '42ch',
                    }}
                  >
                    {COMING_SOON_COPY}
                  </p>

                  <Link
                    to={editionPath(edition)}
                    className="group mt-5 inline-flex items-center justify-center gap-2 self-start"
                    style={{
                      background: 'rgba(247,238,221,0.10)',
                      color: T.cream,
                      border: '1px solid rgba(247,238,221,0.35)',
                      minHeight: 48,
                      padding: '0 1.75rem',
                      borderRadius: 999,
                      fontFamily: SANS,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Preview product
                    <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}