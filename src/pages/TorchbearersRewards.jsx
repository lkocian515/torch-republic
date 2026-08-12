import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Gift, Star, Users, Crown, Zap, ShoppingBag, MessageCircle, Camera, Calendar, TrendingUp, Award, ChevronRight, Sparkles } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const RG = '#E6B7AD';
const GOLD = '#C4A35A';
const MOSS = '#566047';
const BG = '#F8F5EF';
const CREAM = '#FBF8F1';
const TEXT = '#3F3027';
const BODY = '#6A5A4A';
const CLAY = '#B86543';

const WAYS_TO_EARN = [
  { icon: ShoppingBag, label: 'Make a Purchase', points: '1 point per $1', desc: 'Earn on every order' },
  { icon: Zap, label: 'Create Account', points: '50 points', desc: 'Join the community' },
  { icon: Star, label: 'Leave a Review', points: '25 points', desc: 'Share your experience' },
  { icon: Camera, label: 'Photo Review', points: '50 points', desc: 'Show your ritual' },
  { icon: Users, label: 'Refer Friends', points: '100 points', desc: 'Share the flame' },
  { icon: Calendar, label: 'Birthday Reward', points: 'Special gift', desc: 'Celebrate with us' },
  { icon: TrendingUp, label: 'Subscribe', points: '2x points', desc: 'Lock in rewards' },
  { icon: MessageCircle, label: 'Follow Social', points: '25 points', desc: 'Stay connected' },
];

const TIERS = [
  {
    name: 'EMBER',
    level: 1,
    color: '#C98F86',
    bg: '#FFFFFF',
    border: 'rgba(201,143,134,0.45)',
    benefits: [
      'Earn points on every purchase',
      'Birthday reward',
      'Early access to promotions',
      'Exclusive member content',
    ],
    icon: Flame,
  },
  {
    name: 'BEACON',
    level: 2,
    color: '#B86543',
    bg: '#FFFFFF',
    border: 'rgba(230,183,173,0.5)',
    benefits: [
      '1.25x points multiplier',
      'Exclusive member offers',
      'Early product launches',
      'Priority customer support',
      'Free shipping on orders $50+',
    ],
    icon: Sparkles,
  },
  {
    name: 'FLAMEKEEPER',
    level: 3,
    color: '#B89535',
    bg: '#FFFFFF',
    border: 'rgba(184,149,53,0.5)',
    benefits: [
      '1.5x points multiplier',
      'Exclusive VIP launches',
      'Private promotions',
      'Quarterly VIP gifts',
      'Founder updates & previews',
      'First access to new products',
      'Free shipping on all orders',
    ],
    icon: Crown,
  },
];

function TierCard({ tier, index }) {
  const Icon = tier.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative h-full"
      style={{
        background: tier.bg,
        border: `1px solid ${tier.border}`,
      }}
    >
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color: tier.color }} />
          <h3 className="font-serif font-bold" style={{ fontSize: '1.4rem', color: tier.color }}>
            {tier.name}
          </h3>
        </div>
        
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-6" style={{ color: RG }}>
          {tier.level === 1 ? 'Entry Tier' : tier.level === 2 ? 'Mid Tier' : 'VIP Tier'}
        </p>

        <ul className="space-y-3 flex-1">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: tier.color }} />
              <span className="font-heading text-sm md:text-base" style={{ color: TEXT }}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function EarningCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="flex flex-col items-center text-center p-5"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(230,183,173,0.28)',
      }}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
        style={{ background: 'rgba(230,183,173,0.16)', border: '1px solid rgba(230,183,173,0.4)' }}>
        <Icon className="w-5 h-5" style={{ color: RG }} />
      </div>
      <p className="font-mono text-[9px] tracking-[0.18em] uppercase font-bold mb-1" style={{ color: RG }}>
        {item.points}
      </p>
      <p className="font-heading text-sm font-semibold mb-1" style={{ color: TEXT }}>
        {item.label}
      </p>
      <p className="font-heading text-xs" style={{ color: BODY }}>
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function TorchbearersRewards() {
  useSEO({ title: 'Torchbearers Rewards Program | Earn Points on Every Order | Torch Republic', description: 'Join the Torchbearers Rewards program. Earn points on every purchase, leave reviews, refer friends, and unlock exclusive perks. Free to join.', url: '/torchbearers-rewards' });
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      {/* Hero Section */}
      <section className="relative px-4 md:px-10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(230,183,173,0.3) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(196,163,90,0.2) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Torchbearers Rewards
            </p>
            <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: TEXT, letterSpacing: '-0.02em' }}>
              Carry the Flame.<br />Earn the Rewards.
            </h1>
            <p className="font-heading text-lg md:text-xl max-w-2xl mx-auto mb-8"
              style={{ color: BODY, fontWeight: 300, lineHeight: 1.8 }}>
              Earn rewards every time you build your ritual with Torch Republic.
              Join a community that values intention, quality, and daily practice.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/login"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
                style={{ background: CLAY, color: '#FBF8F1' }}
              >
                View My Rewards
              </Link>
              <Link
                to="/shop"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:border-rose-gold"
                style={{ border: '1px solid #E6B7AD', color: CLAY }}
              >
                Start Earning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ways to Earn */}
      <section className="px-4 md:px-10 py-16 md:py-24 relative" style={{ background: CREAM }}>
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Ways to Earn
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: TEXT }}>
              Every Ritual Earns More
            </h2>
            <p className="font-heading max-w-xl mx-auto" style={{ fontSize: '0.95rem', color: BODY, fontWeight: 300, lineHeight: 1.85 }}>
              From your first purchase to sharing with friends, every interaction builds your rewards.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {WAYS_TO_EARN.map((item, i) => (
              <EarningCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Reward Tiers */}
      <section className="px-4 md:px-10 py-16 md:py-24 relative">
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Reward Tiers
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: TEXT }}>
              Advance Through the Ranks
            </h2>
            <p className="font-heading max-w-xl mx-auto" style={{ fontSize: '0.95rem', color: BODY, fontWeight: 300, lineHeight: 1.85 }}>
              The more you engage with your ritual, the more you unlock.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {TIERS.map((tier, i) => (
              <TierCard key={i} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="px-4 md:px-10 py-16 md:py-24 relative" style={{ background: CREAM }}>
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Referral Program
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: TEXT }}>
              Share the Flame
            </h2>
            <p className="font-heading max-w-2xl mx-auto mb-8"
              style={{ fontSize: '1.05rem', color: BODY, fontWeight: 300, lineHeight: 1.85 }}>
              Invite friends to discover their next ritual and earn rewards together.
              When they make their first purchase, you both receive bonus points.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
              style={{ background: CLAY, color: '#FBF8F1' }}
            >
              Get Your Referral Link
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Subscription Integration */}
      <section className="px-4 md:px-10 py-16 md:py-24 relative">
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase mb-4" style={{ color: RG }}>
              Subscription
            </p>
            <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: TEXT }}>
              Subscribe & Save 20%
            </h2>
            <p className="font-heading max-w-2xl mx-auto mb-8"
              style={{ fontSize: '1.05rem', color: BODY, fontWeight: 300, lineHeight: 1.85 }}>
              Lock in your daily ritual and earn Torchbearer rewards on every recurring order.
              Subscriptions are the fastest path to advancing through tiers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/subscription"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
                style={{ background: CLAY, color: '#FBF8F1' }}
              >
                View Subscription Options
              </Link>
              <Link
                to="/shop"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:border-rose-gold"
                style={{ border: '1px solid #E6B7AD', color: CLAY }}
              >
                Shop Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-10 py-20 md:py-28 relative" style={{ background: CREAM }}>
        <div className="divider-gradient absolute top-0 left-0 right-0" />
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: TEXT }}>
              Ready to Carry the Flame?
            </h2>
            <p className="font-heading text-lg mb-8"
              style={{ color: BODY, fontWeight: 300, lineHeight: 1.8 }}>
              Join thousands of Torchbearers building intentional daily rituals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/login"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:opacity-90"
                style={{ background: CLAY, color: '#FBF8F1' }}
              >
                Sign In to View Rewards
              </Link>
              <Link
                to="/register"
                className="font-mono text-[11px] tracking-[0.25em] uppercase font-bold px-8 py-3.5 transition-all hover:border-rose-gold"
                style={{ border: '1px solid #E6B7AD', color: CLAY }}
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}