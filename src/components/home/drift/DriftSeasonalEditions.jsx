import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { defaultOption, optionState, editionPath, formatMoney } from '@/lib/specialEditions';
import { D, TYPE } from './driftTheme';

/**
 * The special editions that are on sale right now, listed as product cards on
 * the homepage. The seasonal banner at the top of the page promotes these
 * coffees, so the same coffees have to be visible — and clickable — further
 * down the page instead of only existing behind the banner's button.
 */
export default function DriftSeasonalEditions() {
  const { editions, loading } = useSpecialEditions();

  if (loading || editions.length === 0) return null;

  return (
    <section style={{ background: D.paper }} aria-labelledby="seasonal-editions-heading">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 1rem' }}>
            Seasonal editions
          </p>
          <h2 id="seasonal-editions-heading" style={{ ...TYPE.heading, color: D.ink, margin: 0 }}>
            Here for a limited time
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {editions.map((edition, i) => {
            const option = defaultOption(edition);
            const state = optionState(option);
            const image = option?.image_url || edition.image_url;
            const path = editionPath(edition);

            return (
              <article
                key={edition.id}
                className="flex h-full flex-col"
                style={{ minWidth: 0 }}
              >
                <Link to={path} aria-label={`View ${edition.name}`} style={{ textDecoration: 'none' }}>
                  <div
                    className="tr-product-card flex items-center justify-center mb-6"
                    style={{
                      padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${D.accentSoft}40 0%, ${D.cream} 70%)`,
                      border: D.borderHairline,
                      boxShadow: D.shadowSoft,
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={`Torch Republic ${edition.name} seasonal coffee pouch`}
                        loading="lazy"
                        style={{
                          width: 'clamp(220px, 72%, 380px)',
                          aspectRatio: '3 / 4',
                          height: 'auto',
                          objectFit: 'contain',
                          display: 'block',
                          filter: 'drop-shadow(0 8px 20px rgba(36,26,22,0.12))',
                        }}
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center text-center"
                        style={{ minHeight: 220, color: D.secondary, ...TYPE.body }}
                      >
                        {edition.name}
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex flex-1 flex-col min-w-0">
                  <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 0.75rem' }}>
                    {edition.badge || `0${i + 1} / Seasonal Edition`}
                  </p>

                  <h3 style={{ ...TYPE.title, color: D.ink, margin: '0 0 0.5rem' }}>{edition.name}</h3>

                  {edition.short_description && (
                    <p style={{ ...TYPE.body, color: D.secondary, margin: '0 0 1rem', maxWidth: '42ch' }}>
                      {edition.short_description}
                    </p>
                  )}

                  <div className="flex items-baseline gap-3 mb-4">
                    <span style={{ ...TYPE.title, color: D.ink }}>
                      {state.purchasable ? formatMoney(state.price, state.currency) : 'Price at checkout'}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={path}
                      className="inline-flex items-center justify-center gap-2"
                      style={{
                        minHeight: 48,
                        padding: '0 1.75rem',
                        borderRadius: '6px',
                        background: D.espresso,
                        color: D.cream,
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                      }}
                    >
                      Shop {edition.name}
                      <ArrowRight size={14} strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}