import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { REWARD_TIERS, EARNING_RULES, WELCOME_BONUS_POINTS } from '@/lib/loyalty';

const CLAY = '#9B4E2F';
const BG = '#F7F2E9';
const CARD = '#FFFCF7';
const TEXT = '#32190F';
const BODY = '#5E4639';
const BORDER = '#B89A6D';

export default function TorchbearersRewards() {
  useSEO({
    title: 'Republic Rewards | Torch Republic',
    description:
      'Republic Rewards: earn 1 point per $1 spent, 50 points for a review and 100 points for a referral. Redeem points for 10% to 25% off. Points expire after 12 months of inactivity.',
    url: '/torchbearers-rewards',
  });

  return (
    <div className="min-h-screen" style={{ background: BG }}>
      {/* Hero */}
      <section className="px-6 pt-20 pb-14 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5"
              style={{ background: `${CLAY}12`, border: `1px solid ${CLAY}30`, borderRadius: '999px' }}>
              <Sparkles className="h-3.5 w-3.5" style={{ color: CLAY }} />
              <span className="font-mono text-[10px] tracking-[0.28em] uppercase" style={{ color: CLAY }}>
                Republic Rewards
              </span>
            </div>

            <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: TEXT, lineHeight: 1.12 }}>
              Carry the Flame. Earn Republic Rewards.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-heading" style={{ fontSize: '1.05rem', color: BODY, lineHeight: 1.85 }}>
              A free rewards program for the people who show up every morning. Earn points on
              purchases, reviews and referrals, then turn them into real discounts on your next order.
            </p>

            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/loyalty"
                className="inline-flex w-full items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-90 sm:w-auto"
                style={{ background: CLAY, color: BG, border: '1px solid transparent', padding: '14px 32px', borderRadius: '999px' }}
              >
                View your rewards
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex w-full items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80 sm:w-auto"
                style={{ border: `1px solid ${CLAY}`, color: CLAY, padding: '14px 32px', borderRadius: '999px' }}
              >
                Start shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How you earn */}
      <section className="px-6 py-14" style={{ background: '#F6F0E6', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: TEXT }}>
            How you earn points
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-heading" style={{ fontSize: '0.95rem', color: BODY, lineHeight: 1.8 }}>
            Every member starts with a {WELCOME_BONUS_POINTS}-point welcome bonus the first time they
            open their rewards.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {EARNING_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={rule.action}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center justify-between gap-4 p-5"
                  style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '4px' }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" style={{ color: CLAY }} />
                    <span className="font-heading" style={{ fontSize: '0.95rem', color: TEXT }}>{rule.action}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: CLAY }}>
                    {rule.points}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: TEXT }}>
            Reward tiers
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center font-heading" style={{ fontSize: '0.95rem', color: BODY, lineHeight: 1.8 }}>
            Your points balance determines your tier and the discount you can redeem. Redemption is
            always your choice — points stay on your account until you use them.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REWARD_TIERS.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 text-center"
                style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '4px' }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: CLAY }}>
                  {tier.label}
                </p>
                <p className="mt-3 font-serif font-bold" style={{ fontSize: '1.6rem', color: TEXT }}>
                  {tier.discount} off
                </p>
                <p className="mt-1 font-heading" style={{ fontSize: '0.9rem', color: BODY }}>
                  {tier.value}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: BODY }}>
                  {tier.points.toLocaleString()} points
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + terms */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl p-8" style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: '4px' }}>
          <h2 className="font-serif font-bold" style={{ fontSize: '1.4rem', color: TEXT }}>
            How it works
          </h2>
          <ul className="mt-5 space-y-3">
            {[
              'Create a free account, then open your rewards to claim your welcome bonus.',
              'Points are awarded per qualifying purchase, plus reviews, referrals and your birthday bonus.',
              'Redeem your points for a single-use discount code at checkout.',
              'Discount codes cannot be combined with other offers.',
              'Points expire after 12 months of account inactivity.',
            ].map((line) => (
              <li key={line} className="flex gap-3 font-heading" style={{ fontSize: '0.95rem', color: BODY, lineHeight: 1.75 }}>
                <Check className="mt-1 h-4 w-4 flex-shrink-0" style={{ color: CLAY }} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-90"
              style={{ background: CLAY, color: BG, padding: '14px 32px', borderRadius: '999px' }}
            >
              Create an account
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              style={{ border: `1px solid ${CLAY}`, color: CLAY, padding: '14px 32px', borderRadius: '999px' }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}