import React from 'react';
import EditorialButton from './EditorialButton';
import { colors, routes } from './theme';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/423d68cdd_hhbiiui.png';
const texture = `url("data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D9CDBA' stroke-width='1' opacity='0.32'%3E%3Cpath d='M18 116c22-24 32-54 28-91'/%3E%3Cpath d='M102 130c-10-28-7-56 9-84'/%3E%3Cpath d='M46 55c-13-4-22-12-27-24'/%3E%3Cpath d='M108 86c12-8 19-19 21-32'/%3E%3C/g%3E%3Cg fill='%23A97B32' opacity='0.16'%3E%3Ccircle cx='24' cy='36' r='2'/%3E%3Ccircle cx='116' cy='56' r='2'/%3E%3Ccircle cx='58' cy='104' r='1.6'/%3E%3C/g%3E%3C/svg%3E")`;

export default function EditorialHero() {
  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-10 md:px-10 lg:pt-0 lg:pb-0" style={{ background: colors.cream, backgroundImage: texture, backgroundSize: '280px 280px' }}>
      <svg aria-hidden="true" className="pointer-events-none absolute -left-12 top-10 h-52 w-52 opacity-30 md:h-72 md:w-72" viewBox="0 0 160 160" fill="none">
        <path d="M84 150C69 110 70 66 92 16" stroke={colors.sage} strokeWidth="2" />
        <path d="M78 92C48 87 27 73 14 48" stroke={colors.sage} strokeWidth="2" />
        <path d="M88 70C118 63 137 48 148 24" stroke={colors.sage} strokeWidth="2" />
      </svg>
      <svg aria-hidden="true" className="pointer-events-none absolute -right-14 bottom-8 h-52 w-52 opacity-25 md:h-80 md:w-80" viewBox="0 0 180 180" fill="none">
        <path d="M58 168C78 126 82 78 68 18" stroke={colors.gold} strokeWidth="2" />
        <path d="M72 110C105 101 132 80 158 48" stroke={colors.gold} strokeWidth="2" />
        <path d="M62 78C38 72 22 58 12 36" stroke={colors.gold} strokeWidth="2" />
      </svg>
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:min-h-[680px] lg:grid-cols-[0.4fr_0.6fr] lg:gap-4">
        <div className="z-10 max-w-[520px] lg:py-20">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.28em] md:text-sm" style={{ color: colors.gold }}>COFFEE · MATCHA · FUNCTIONAL MUSHROOM BLENDS</p>
          <h1 className="mt-5 font-serif text-[clamp(3rem,6vw,5.9rem)] font-semibold leading-[0.95] tracking-[-0.05em]" style={{ color: colors.forest }}>A Better Cup Begins With Better Ingredients.</h1>
          <p className="mt-6 text-[clamp(1.05rem,1.4vw,1.2rem)] leading-8" style={{ color: colors.secondary }}>Light-roast instant coffee, functional mushroom blends, and ceremonial matcha thoughtfully created for clearer, more intentional daily rituals.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><EditorialButton to={routes.shop}>EXPLORE THE COLLECTION</EditorialButton><EditorialButton to={routes.ritual} variant="secondary">FIND YOUR RITUAL</EditorialButton></div>
        </div>
        <div className="relative z-0 -mx-3 md:-mx-8 lg:-mr-10 lg:min-h-[680px]">
          <div className="aspect-square overflow-hidden md:hidden">
            <img
              src={HERO_IMAGE}
              alt="Torch Republic coffee, matcha, and functional mushroom blends arranged in a warm botanical setting"
              width="1024"
              height="512"
              sizes="100vw"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-auto max-w-none object-contain object-left-bottom"
            />
          </div>
          <img
            src={HERO_IMAGE}
            alt="Torch Republic coffee, matcha, and functional mushroom blends arranged in a warm botanical setting"
            width="1024"
            height="512"
            sizes="(min-width: 1024px) 60vw, 100vw"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="mx-auto hidden h-auto w-full object-contain object-bottom md:block lg:absolute lg:bottom-0 lg:right-0 lg:w-[106%]"
          />
        </div>
        <div className="z-10 grid gap-3 text-sm sm:grid-cols-3 lg:col-start-1 lg:mt-[-110px]" style={{ color: colors.moss }}>{['Small-Batch Crafted', 'Thoughtfully Sourced', 'Botanical Ingredients'].map(item => <span key={item} className="border-l pl-3" style={{ borderColor: colors.gold }}>{item}</span>)}</div>
      </div>
    </section>
  );
}