import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { duoBySlug, duoPath } from '@/lib/duos';
import { D } from './driftTheme';

const AUTUMN_ARTWORK =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b8e1fec7c_01-15443.png';
const autumnDuo = duoBySlug('autumn-coffee-duo');

export default function FeaturedSeasonalDuo() {
  return (
    <section aria-labelledby="featured-seasonal-duo-heading" style={{ background: D.cream }}>
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:py-12 md:px-6 md:py-16">
        <h2 id="featured-seasonal-duo-heading" className="sr-only">
          Featured Seasonal Duo
        </h2>
        <img
          src={AUTUMN_ARTWORK}
          alt="Torch Republic Autumn Coffee Duo featuring Harvest Moon Pecan and Cinnamon Hearth."
          width="1536"
          height="864"
          loading="lazy"
          decoding="async"
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: 1200, objectFit: 'contain' }}
        />
        <div className="mt-5 flex justify-center sm:mt-6">
          <Link
            to={autumnDuo ? duoPath(autumnDuo) : '/duos'}
            className="inline-flex min-h-[52px] w-full max-w-[340px] items-center justify-center gap-2 rounded-md px-6 py-3 font-heading text-base font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ background: D.terracotta, color: '#F7F2E9', textDecoration: 'none' }}
          >
            View Thanksgiving Duo
            <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
