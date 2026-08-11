import React from 'react';
import { Link } from 'react-router-dom';
import EditorialButton from './EditorialButton';
import { colors, routes } from './theme';
import { HERO_IMAGE } from '@/lib/mushroomProducts';

export default function HeroSection() {
  return (
    <section className="overflow-hidden px-5 pt-12 pb-10 md:px-10 md:pt-20 md:pb-16" style={{ background: colors.cream }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <div className="max-w-[540px]">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.26em] md:text-sm" style={{ color: colors.gold }}>
            Coffee · Matcha · Functional Mushroom Blends
          </p>
          <h1 className="mt-5 font-serif text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]" style={{ color: colors.forest }}>
            A better cup begins with better ingredients.
          </h1>
          <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-8" style={{ color: colors.secondary }}>
            Light-roast instant coffee, functional mushroom blends, and ceremonial matcha — thoughtfully made for intentional daily rituals.
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
        <div className="relative">
          <div className="overflow-hidden rounded-lg" style={{ background: colors.parchment, border: `1px solid ${colors.border}` }}>
            <img
              src={HERO_IMAGE}
              alt="Torch Republic instant coffee, mushroom coffee, and ceremonial matcha arranged in a warm botanical setting"
              width={1024}
              height={1024}
              sizes="(min-width: 1024px) 58vw, 100vw"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}