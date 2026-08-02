import React from 'react';
import { Link } from 'react-router-dom';
import { trackHeroCTAClick } from '@/lib/analytics';
import { TRUST_PILLS, WELCOME_DISCOUNT_CODE, WELCOME_DISCOUNT_PERCENT } from '@/lib/siteConfig';

const ESPRESSO = '#26231F';
const CHARCOAL = '#655E56';
const PARCHMENT = '#F8F5EF';
const IVORY = '#FFFDFC';
const OAT = '#DED8CF';
const GOLD = '#B48A4A';
const SAGE = '#8A9D78';

export default function HeroSection() {
  return (
    <div style={{ background: PARCHMENT, color: ESPRESSO }}>
      <section className="px-5 md:px-10 py-10 md:py-16" style={{ background: `linear-gradient(180deg, ${PARCHMENT} 0%, #F2EDE4 100%)` }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-10 lg:gap-14 items-center">
          <div className="order-1">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: GOLD }}>
              Premium instant coffee, matcha & mushroom blends
            </p>

            <h1
              className="font-serif font-bold mb-5"
              style={{
                fontSize: 'clamp(2.35rem, 5vw, 5.25rem)',
                color: ESPRESSO,
                letterSpacing: '-0.045em',
                lineHeight: 0.95,
                maxWidth: '620px',
              }}
            >
              Seven Rituals. One Higher Standard.
            </h1>

            <p
              className="font-heading mb-7"
              style={{
                fontSize: 'clamp(1rem, 1.7vw, 1.18rem)',
                color: CHARCOAL,
                fontWeight: 400,
                lineHeight: 1.75,
                maxWidth: '520px',
              }}
            >
              Thoughtfully crafted coffee, ceremonial matcha, and functional mushroom blends made for smoother mornings — no pods, no machine, no complicated prep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link
                to="/shop/instant-coffee"
                onClick={() => trackHeroCTAClick('Shop Coffee')}
                className="font-mono text-[11px] tracking-[0.22em] uppercase font-bold transition-all hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full sm:w-auto"
                style={{ background: GOLD, color: '#211A12', padding: '16px 32px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minHeight: '52px', borderRadius: '2px', boxShadow: '0 12px 30px rgba(38,35,31,0.12)' }}
              >
                SHOP COFFEE
              </Link>
              <Link
                to="/shop/matcha"
                onClick={() => trackHeroCTAClick('Explore Matcha')}
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold transition-all hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 w-full sm:w-auto"
                style={{ border: `1px solid ${GOLD}`, color: ESPRESSO, background: 'rgba(255,253,252,0.62)', padding: '16px 28px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', minHeight: '52px', borderRadius: '2px' }}
              >
                EXPLORE MATCHA
              </Link>
            </div>

            <p className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: CHARCOAL }}>
              Use <span style={{ color: ESPRESSO, fontWeight: 800 }}>{WELCOME_DISCOUNT_CODE}</span> for {WELCOME_DISCOUNT_PERCENT}% off your first order
            </p>
          </div>

          <div className="order-2">
            <div
              className="relative overflow-hidden"
              style={{
                background: IVORY,
                border: `1px solid ${OAT}`,
                boxShadow: '0 24px 70px rgba(38,35,31,0.12)',
              }}
            >
              <div className="absolute left-6 top-6 hidden sm:block" style={{ color: SAGE, fontSize: '3.5rem', lineHeight: 1, opacity: 0.18 }}>✦</div>
              <div className="absolute right-8 bottom-8 hidden sm:block" style={{ color: GOLD, fontSize: '4rem', lineHeight: 1, opacity: 0.16 }}>✦</div>
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a1fe91c67_ChatGPTImageJun19202605_49_32AM.png"
                alt="Torch Republic coffee, mushroom coffee, and ceremonial matcha tubes arranged for a premium daily ritual"
                width="1024"
                height="596"
                className="relative z-10"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', mixBlendMode: 'multiply' }}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </section>

      <div
        className="px-5 py-3"
        style={{
          background: '#FBF8F1',
          borderTop: `1px solid ${OAT}`,
          borderBottom: `1px solid ${OAT}`,
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 max-w-[1280px] mx-auto">
          {TRUST_PILLS.map((pill, i) => (
            <React.Fragment key={i}>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap" style={{ color: CHARCOAL }}>
                {pill}
              </span>
              {i < TRUST_PILLS.length - 1 && <span style={{ color: GOLD, fontSize: '0.65rem' }}>✦</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}