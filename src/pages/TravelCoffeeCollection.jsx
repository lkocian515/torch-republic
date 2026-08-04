/**
 * Travel Coffee Collection Page
 * Route: /shop/travel-coffee
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { ArrowRight, CheckCircle, Plane } from 'lucide-react';

const RG = '#E6B7AD';

const TRAVEL_SCENARIOS = [
  { icon: '✈️', title: 'Air Travel', tip: 'Security-friendly powder format. No liquids. No pods to forget. One tube fits in a carry-on pocket.' },
  { icon: '🏕️', title: 'Camping & Outdoors', tip: 'Works with any hot water source — camp stove, jetboil, thermos. Zero cleanup. Light weight.' },
  { icon: '🏨', title: 'Hotels', tip: 'Skip the in-room pod machine. Your tube delivers 27 premium cups at $0.85/cup vs. $5+ per hotel cup.' },
  { icon: '🚗', title: 'Road Trips', tip: 'Gas station hot water. Travel mug. Your own ritual anywhere on the road. No coffee shop required.' },
  { icon: '💼', title: 'Office & Work', tip: 'Desk drawer. Kitchen hot water. Better than the office pod machine with zero extra equipment.' },
  { icon: '🎒', title: 'Backpacking', tip: 'Weighs grams. Takes zero space. The only coffee format that makes sense in a backpack.' },
];

const TRAVEL_PRODUCTS = [
  {
    name: 'Ember Reserve',
    tagline: 'All-purpose travel companion',
    description: 'Medium roast 100% Arabica. Smooth, balanced, works in any vessel with any water temperature that\'s "hot enough." The most versatile travel coffee we make.',
    path: '/products/ember-rise-instant-coffee',
    accent: '#C98F86',
  },
  {
    name: 'Torchbearer',
    tagline: 'Bold coffee anywhere',
    description: "Bold roast. When you need a serious cup in a hotel room that only has lukewarm water and bad pods. Torchbearer doesn't need perfect conditions to taste good.",
    path: '/products/torchbearer-instant-coffee',
    accent: '#C4A35A',
  },
  {
    name: 'GlowMind Clarity',
    tagline: 'Focus on the road',
    description: "Lion's Mane + Chaga. For travel days when you need mental sharpness — navigating, presenting, making decisions. Your ritual doesn't have to stop because you're traveling.",
    path: '/products/glowmind-clarity-instant-mushroom-coffee',
    accent: '#E6B7AD',
  },
  {
    name: 'Build Your Ritual Bundle',
    tagline: 'Any 3 for $49.99',
    description: 'Mix and match three different blends — one for mornings, one for travel days, one for evenings. The bundle is how most Torch Republic travelers stock up.',
    path: '/build-your-ritual',
    accent: '#10B981',
  },
];

export default function TravelCoffeeCollection() {
  useSEO({
    title: 'Best Travel Coffee | No-Machine Instant Coffee for Trips | Torch Republic',
    description: 'The best coffee for travel — premium instant coffee that works in hotels, camping, airports, and road trips. No machine, no pods, no cleanup. 27 servings per tube.',
    url: '/shop/travel-coffee',
    type: 'website',
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Shop', url: '/shop' }, { name: 'Travel Coffee', url: '/shop/travel-coffee' }],
    faq: [
      { question: 'What is the best coffee to travel with?', answer: 'Premium instant coffee is the ideal travel coffee — no machine required, TSA-friendly powder format, lightweight, and works with any hot water source. Torch Republic tubes deliver 27 servings at $0.85/cup.' },
      { question: 'Can you take instant coffee through airport security?', answer: 'Yes. Instant coffee powder is a solid/dry material and is not subject to TSA liquid restrictions. A tube of Torch Republic instant coffee can go in your carry-on.' },
    ],
  });

  return (
    <div className="min-h-screen" style={{ background: '#080808' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5" style={{ background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.2)' }}>
            <Plane size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>Travel Coffee Collection</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F5EFE6', lineHeight: 1.1 }}>
            Your Ritual Doesn't<br />Stop When You Travel
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.9, fontWeight: 300 }}>
            Instant powder. No machine. No pods. Works in any hotel room, campsite, car, or airport — with nothing but hot water. TSA-friendly. 27 cups per tube. $0.85 per cup.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/shop"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}>
              Shop All Blends <ArrowRight size={12} />
            </Link>
            <Link to="/build-your-ritual"
              className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase py-3.5 px-7 transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}40`, color: RG }}>
              Build Travel Bundle →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Travel Scenarios */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Wherever You Are</p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>Coffee That Goes Where You Go</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TRAVEL_SCENARIOS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="p-5" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.07)' }}>
                <p className="text-xl mb-3">{s.icon}</p>
                <p className="font-serif font-bold mb-2" style={{ color: '#F5EFE6', fontSize: '0.95rem' }}>{s.title}</p>
                <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.75, fontWeight: 300 }}>{s.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Instant Wins for Travel */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.45)' }}>Why Instant Wins</p>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', color: '#F5EFE6' }}>
                The Math on Travel Coffee
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Hotel coffee (pod machine)', cost: '$4–6/cup', note: 'Mediocre quality. Waste from pods.' },
                  { label: 'Airport coffee shop', cost: '$5–8/cup', note: 'Line. Hurry. Lukewarm by the gate.' },
                  { label: 'Gas station coffee', cost: '$1–3/cup', note: 'Unknown roast date. Often bad.' },
                  { label: 'Torch Republic instant', cost: '$0.85/cup', note: '100% Arabica. Premium. Everywhere.' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(230,183,173,0.07)' }}>
                    <div>
                      <p className="font-heading text-sm" style={{ color: i === 3 ? '#F5EFE6' : 'rgba(240,235,225,0.5)' }}>{r.label}</p>
                      <p className="font-mono text-[7px] tracking-[0.15em] mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{r.note}</p>
                    </div>
                    <span className="font-mono font-bold text-sm" style={{ color: i === 3 ? RG : 'rgba(255,255,255,0.3)' }}>{r.cost}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6" style={{ background: '#0F0E0D', border: `1px solid ${RG}20` }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: RG }}>TSA Compliant</p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.75, fontWeight: 300 }}>
                  Instant coffee powder is a solid — not subject to the 3-1-1 liquids rule. Your tube travels in carry-on with zero restrictions. We designed the tube format specifically for portability.
                </p>
              </div>
              <div className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>Zero Cleanup</p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.75, fontWeight: 300 }}>
                  No grounds. No filter. No machine. Add water to powder in your cup. Stir. Done. Doesn't matter if you're in a tent, a conference room, or a business class seat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#F5EFE6' }}>Best Travel Blends</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {TRAVEL_PRODUCTS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5" style={{ background: '#0F0E0D', border: `1px solid ${p.accent}18` }}>
                <p className="font-serif font-bold mb-1" style={{ color: '#F5EFE6', fontSize: '1rem' }}>{p.name}</p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-3" style={{ color: p.accent }}>{p.tagline}</p>
                <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,235,225,0.55)', lineHeight: 1.75, fontWeight: 300 }}>{p.description}</p>
                <Link to={p.path}
                  className="inline-flex items-center gap-1.5 font-mono text-[7px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-80"
                  style={{ color: p.accent }}>
                  Shop <ArrowRight size={9} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#F5EFE6' }}>
            Pack your ritual.
          </h2>
          <p className="font-heading mb-8 text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.85, fontWeight: 300 }}>
            Any 3 blends for $49.99. Tube fits anywhere. Ships free over $50.
          </p>
          <Link to="/build-your-ritual"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808' }}>
            Build My Travel Bundle <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </div>
  );
}