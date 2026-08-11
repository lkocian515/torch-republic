import React from 'react';
import { Link } from 'react-router-dom';
import EditorialButton from './EditorialButton';
import { colors, routes } from './theme';

const HERO_BACKGROUND =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2138aa867_09a83df1-8ff9-4ad2-bc00-daf0ed284d91.png';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden md:flex md:items-center md:min-h-[560px] lg:min-h-[640px] xl:min-h-[700px]"
      style={{ background: colors.cream }}
    >
      {/* Desktop / tablet background image — products clustered right, blank wall left */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0"
        style={{
          backgroundImage: `url("${HERO_BACKGROUND}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Single text block — reflows from stacked (mobile) to left-positioned (desktop) */}
      <div
        className="relative z-10 w-full pt-12 pb-12 px-6 md:max-w-[540px] md:w-[42%] md:py-0 md:pr-6"
        style={{ paddingLeft: 'clamp(24px, 8vw, 120px)' }}
      >
        <p
          className="font-heading text-xs font-semibold uppercase tracking-[0.26em] md:text-sm"
          style={{ color: colors.gold }}
        >
          Coffee for the way you live
        </p>
        <h1
          className="mt-5 font-serif text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[clamp(2.4rem,3.4vw,3.8rem)]"
          style={{ color: colors.forest }}
        >
          A better ritual starts here.
        </h1>
        <p
          className="mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-8"
          style={{ color: colors.secondary }}
        >
          Thoughtfully crafted coffee, mushroom blends, and ceremonial matcha for your everyday rhythm.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <EditorialButton to={routes.shop}>Shop Coffee</EditorialButton>
          <Link
            to={routes.ritual}
            className="inline-flex min-h-[48px] items-center font-heading text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: colors.forest, borderRadius: '4px' }}
          >
            Find Your Ritual
          </Link>
        </div>
      </div>

      {/* Mobile product image — full-width, no crop, below the text */}
      <img
        src={HERO_BACKGROUND}
        alt="Torch Republic coffee, matcha, and mushroom coffee tins"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="block w-full md:hidden"
        style={{ height: 'auto', display: 'block', paddingBottom: '32px', objectFit: 'contain' }}
      />
    </section>
  );
}