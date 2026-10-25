import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { WINTER_DUO, winterDuoEditions } from '@/lib/winterDuo';
import { D, TYPE } from './driftTheme';

/**
 * Compact Winter Duo reminder near the bottom of the homepage.
 *
 * Deliberately secondary to the main feature: one small uncropped thumbnail
 * beside the copy, no repeat of the full section, and no purchase control.
 */
export default function DriftWinterDuoTeaser() {
  const { editions, upcoming, loading } = useSpecialEditions();

  if (loading) return null;

  const duo = winterDuoEditions(editions, upcoming);
  if (duo.length === 0) return null;

  return (
    <section style={{ background: D.paper }} aria-labelledby="winter-duo-teaser-heading">
      <div className="mx-auto max-w-[1100px] px-6 pb-16 md:pb-20">
        <div
          className="flex flex-col gap-5 rounded-lg p-5 sm:flex-row sm:items-center sm:gap-7 md:p-6"
          style={{ background: D.surface, border: `1px solid ${D.rule}`, boxShadow: D.shadowSoft }}
        >
          <div
            className="w-full flex-shrink-0 overflow-hidden rounded-md sm:w-[220px]"
            style={{ aspectRatio: WINTER_DUO.imageRatio, background: D.cream }}
          >
            <img
              src={WINTER_DUO.image}
              alt={WINTER_DUO.imageAlt}
              className="block h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="min-w-0">
            <h2
              id="winter-duo-teaser-heading"
              style={{ ...TYPE.title, fontSize: 'clamp(1.35rem, 2.6vw, 1.75rem)', color: D.ink, margin: 0 }}
            >
              {WINTER_DUO.teaserHeading}
            </h2>
            <p style={{ ...TYPE.body, color: D.secondary, margin: '0.6rem 0 0' }}>
              {WINTER_DUO.teaserText}
            </p>
            <Link
              to={WINTER_DUO.path}
              className="group mt-4 inline-flex items-center gap-2 font-heading font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B75B32]"
              style={{ color: D.terracottaDeep, minHeight: 44 }}
            >
              {WINTER_DUO.teaserLinkLabel}
              <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}