import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { Plus, Minus, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '../lib/mushroomProducts';
import useNoIndex from '@/hooks/useNoIndex';
import { getSubscriptionCheckoutUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import DiscountReminders from '../components/discounts/DiscountReminders';

const RG = '#E6B7AD';

const TUBE_OPTIONS = [1, 2, 3, 4, 5, 6];

const SUB_FAQ = [
  { q: 'Can I change my delivery date?', a: 'Yes — you can move it earlier or later anytime in your account before the shipment processes. Full flexibility, no phone calls needed.' },
  { q: 'Can I skip a shipment?', a: 'Yes. Just skip a month instead of canceling. Your subscription stays active and resumes the following cycle.' },
  { q: 'Can I swap blends between deliveries?', a: 'Yes. You can update your blend selections before each shipment. Mix and match mushroom coffee, classic coffee, or matcha however you like.' },
  { q: 'Do I get loyalty points with subscriptions?', a: 'Yes — subscription orders earn Torchbearers Rewards points just like one-time purchases. It\'s the best way to stack savings and rewards.' },
  { q: 'How do I cancel?', a: 'You can pause or cancel anytime directly from your account in a few clicks. No calls, no forms, no hassle.' },
  { q: 'How many tubes can I subscribe to monthly?', a: 'Choose between 1 and 6 tubes per delivery. You can adjust the quantity anytime from your account.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-left py-5 gap-4"
      >
        <span className="font-heading text-sm font-medium text-white">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: RG }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(230,183,173,0.4)' }} />}
      </button>
      {open && (
        <p className="font-heading text-sm pb-5" style={{ color: 'rgba(247,241,232,0.5)', lineHeight: 1.8, fontWeight: 300 }}>{a}</p>
      )}
    </div>
  );
}

export default function Subscription() {
  const [step, setStep] = useState(1); // 1=tube count, 2=select blends, 3=review
  const [tubeCount, setTubeCount] = useState(null);
  const [blendQty, setBlendQty] = useState({}); // { slug: qty }
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isGeneratingCheckout, setIsGeneratingCheckout] = useState(false);

  useNoIndex();
  useSEO({
    title: 'Subscribe & Save | Torch Republic Coffee Company',
    description: 'Subscribe to your favorite Torch Republic coffee, mushroom coffee, or matcha ritual and save on repeat deliveries. Build your monthly blend selection.',
    url: '/subscription',
  });

  const totalSelected = Object.values(blendQty).reduce((s, v) => s + v, 0);
  const remaining = tubeCount ? tubeCount - totalSelected : 0;
  const canCheckout = tubeCount && totalSelected === tubeCount;

  const adjustBlend = (slug, delta) => {
    setBlendQty(prev => {
      const cur = prev[slug] || 0;
      const next = Math.max(0, cur + delta);
      // Don't exceed tube count
      if (delta > 0 && totalSelected >= tubeCount) return prev;
      return { ...prev, [slug]: next };
    });
  };

  const resetSelections = () => {
    setBlendQty({});
  };

  const ALL_SUB_PRODUCTS = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS];
  const selectedBlends = ALL_SUB_PRODUCTS.filter(p => (blendQty[p.slug] || 0) > 0);
  // Blended average price for display (~$22.99 mushroom, $19.99 classic, $24.99 matcha)
  const AVG_PRICE = 22.99;
  const monthlyPrice = tubeCount ? tubeCount * AVG_PRICE : 0;
  const discountedPrice = monthlyPrice * 0.85; // 15% off
  const savings = monthlyPrice - discountedPrice;

  const handleCheckout = async () => {
    if (!canCheckout) return;
    setIsGeneratingCheckout(true);
    try {
      // For now, use the existing subscription checkout URL
      // The 15% discount will be applied in Shopify via discount code SUBSCRIBE15
      const url = await getSubscriptionCheckoutUrl(blendQty);
      setCheckoutUrl(url);
      // Redirect after a brief delay to show loading state
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    } catch (error) {
      console.error('Checkout failed:', error);
      setIsGeneratingCheckout(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Torch Republic Coffee Co.
          </p>
          <h1 className="font-serif font-bold mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            How Our Subscriptions Work
          </h1>
          <p className="font-heading max-w-lg mx-auto mb-8"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontWeight: 400 }}>
            More focus, less hassle. Save 20% on every bag and never run out of coffee again.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#builder"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Build My Subscription ↓
            </a>
            <Link to="/shop"
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Shop One-Time →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS — 3 columns ── */}
      <section className="px-6 md:px-10 py-14" style={{ background: '#060606' }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'Pick your ritual', body: 'Choose your favorite coffee, mushroom blend, or matcha. Mix and match up to 6 tubes per delivery.' },
              { num: '2', title: 'Set your schedule', body: 'Deliver every 2–8 weeks. Adjust your delivery date, skip a month, or swap blends anytime from your account.' },
              { num: '3', title: 'Enjoy automatic savings', body: 'Save 20% on every subscription order — not just the first. Pause or cancel in a few clicks, no calls required.' },
            ].map(({ num, title, body }) => (
              <div key={num} className="p-6" style={{ background: 'rgba(230,183,173,0.03)', border: '1px solid rgba(230,183,173,0.1)' }}>
                <div className="w-9 h-9 flex items-center justify-center font-serif font-bold mb-4" style={{ background: 'rgba(230,183,173,0.12)', color: RG, fontSize: '1.1rem' }}>{num}</div>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.1rem' }}>{title}</h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION BUILDER ── */}
      <section id="builder" className="px-6 md:px-10 py-16">
        <div className="max-w-[860px] mx-auto">

          {/* Step indicators */}
          <div className="flex items-center gap-3 mb-12 justify-center">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => { if (s < step || (s === 2 && tubeCount) || (s === 3 && canCheckout)) setStep(s); }}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all"
                    style={{
                      background: step === s ? RG : step > s ? 'rgba(230,183,173,0.25)' : 'rgba(255,255,255,0.06)',
                      color: step === s ? '#080808' : step > s ? RG : 'rgba(255,255,255,0.3)',
                      border: step > s ? `1px solid ${RG}40` : 'none',
                    }}>
                    {s}
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase hidden sm:block"
                    style={{ color: step === s ? RG : 'rgba(255,255,255,0.25)' }}>
                    {s === 1 ? 'Tube Count' : s === 2 ? 'Select Blends' : 'Review'}
                  </span>
                </div>
                {s < 3 && <div className="flex-1 h-px max-w-[60px]" style={{ background: step > s ? `${RG}40` : 'rgba(255,255,255,0.06)' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 1: Tube Count ── */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-8">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.45)' }}>Step 1 of 3</p>
                <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Choose How Many Tubes Per Month</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {TUBE_OPTIONS.map(n => (
                  <button
                    key={n}
                    onClick={() => { setTubeCount(n); resetSelections(); setStep(2); }}
                    className="flex flex-col items-center gap-2 py-8 px-4 transition-all"
                    style={{
                      background: tubeCount === n ? `${RG}14` : '#0E0C0B',
                      border: `1px solid ${tubeCount === n ? RG : 'rgba(230,183,173,0.12)'}`,
                    }}
                    onMouseEnter={e => { if (tubeCount !== n) e.currentTarget.style.borderColor = 'rgba(230,183,173,0.3)'; }}
                    onMouseLeave={e => { if (tubeCount !== n) e.currentTarget.style.borderColor = 'rgba(230,183,173,0.12)'; }}
                  >
                    <span className="font-serif font-bold" style={{ fontSize: '2.2rem', color: tubeCount === n ? RG : '#FFFFFF', lineHeight: 1 }}>{n}</span>
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                      {n === 1 ? 'Tube' : 'Tubes'} / Month
                    </span>
                    <span className="font-mono text-[9px]" style={{ color: tubeCount === n ? RG : 'rgba(255,255,255,0.25)' }}>
                     from ${(n * 19.99).toFixed(2)}/mo
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Select Blends ── */}
          {step === 2 && tubeCount && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-2">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.45)' }}>Step 2 of 3</p>
                <h2 className="font-serif font-bold text-white mb-1" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Select Your Blends</h2>
                <p className="font-heading" style={{ color: 'rgba(247,241,232,0.4)', fontWeight: 300, fontSize: '0.9rem' }}>
                  You're building a <span style={{ color: RG }}>{tubeCount}-tube</span> monthly subscription. Select {tubeCount} total tube{tubeCount > 1 ? 's' : ''}.
                </p>
              </div>

              {/* Progress */}
              <div className="flex items-center justify-center gap-3 my-6">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(230,183,173,0.1)', width: '160px' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(totalSelected / tubeCount) * 100}%`, background: totalSelected === tubeCount ? '#6EBD8E' : RG }} />
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: totalSelected === tubeCount ? '#6EBD8E' : RG }}>
                  {totalSelected}/{tubeCount} selected
                </span>
              </div>

              {[
                { label: 'Mushroom Coffee', products: MUSHROOM_PRODUCTS },
                { label: 'Classic Coffee', products: CLASSIC_COFFEE_PRODUCTS },
                { label: 'Ceremonial Matcha', products: MATCHA_PRODUCTS },
              ].map(group => (
                <div key={group.label} className="mb-6">
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.4)' }}>{group.label}</p>
                  <div className="space-y-3">
                    {group.products.map(p => {
                      const qty = blendQty[p.slug] || 0;
                      return (
                        <div key={p.id} className="flex items-center gap-4 p-4 transition-all"
                          style={{ background: qty > 0 ? `${p.accent}0A` : '#0E0C0B', border: `1px solid ${qty > 0 ? p.accent + '30' : 'rgba(230,183,173,0.1)'}` }}>
                          <img src={p.image} alt={p.name} className="w-14 h-14 object-contain flex-shrink-0" style={{ background: '#0C0C0C', padding: '4px' }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                            <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${p.accent}70` }}>{p.roast}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => adjustBlend(p.slug, -1)} disabled={qty === 0}
                              className="w-8 h-8 flex items-center justify-center transition-all"
                              style={{ border: '1px solid rgba(230,183,173,0.2)', color: qty === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(230,183,173,0.7)', cursor: qty === 0 ? 'not-allowed' : 'pointer' }}>
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono font-bold w-6 text-center" style={{ color: qty > 0 ? RG : 'rgba(255,255,255,0.3)', fontSize: '0.95rem' }}>{qty}</span>
                            <button onClick={() => adjustBlend(p.slug, 1)} disabled={totalSelected >= tubeCount}
                              className="w-8 h-8 flex items-center justify-center transition-all"
                              style={{ border: `1px solid ${totalSelected >= tubeCount ? 'rgba(230,183,173,0.1)' : 'rgba(230,183,173,0.3)'}`, color: totalSelected >= tubeCount ? 'rgba(255,255,255,0.15)' : RG, cursor: totalSelected >= tubeCount ? 'not-allowed' : 'pointer' }}>
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={() => setStep(1)}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase py-3.5 px-6 transition-all hover:opacity-70"
                  style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.5)' }}>
                  ← Back
                </button>
                <button
                  onClick={() => canCheckout && setStep(3)}
                  disabled={!canCheckout}
                  className="flex-1 font-mono text-[9px] tracking-[0.35em] uppercase font-bold py-3.5 px-8 transition-all"
                  style={{
                    background: canCheckout ? RG : 'rgba(230,183,173,0.12)',
                    color: canCheckout ? '#080808' : 'rgba(230,183,173,0.3)',
                    cursor: canCheckout ? 'pointer' : 'not-allowed',
                  }}>
                  {canCheckout ? 'Review My Subscription →' : `Select ${remaining} more tube${remaining !== 1 ? 's' : ''} to continue`}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === 3 && canCheckout && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-8">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.45)' }}>Step 3 of 3</p>
                <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>Review Your Monthly Subscription</h2>
              </div>

              <div className="p-6 mb-6" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.18)' }}>
                {/* Discount Badge */}
                {/* All discount reminders */}
                <div className="mb-5">
                  <DiscountReminders cartSubtotal={monthlyPrice} showAll />
                </div>

                <div className="flex items-center justify-between mb-5 pb-5" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
                  <div>
                    <p className="font-serif font-bold text-white text-sm mb-1">Monthly Coffee Subscription</p>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{tubeCount} Tube{tubeCount > 1 ? 's' : ''} · Delivered Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] line-through" style={{ color: 'rgba(230,183,173,0.3)' }}>${monthlyPrice.toFixed(2)}</p>
                    <p className="font-mono font-bold" style={{ color: '#6EBD8E', fontSize: '1.2rem' }}>${discountedPrice.toFixed(2)}</p>
                    <p className="font-mono text-[8px]" style={{ color: 'rgba(230,183,173,0.4)' }}>/month</p>
                  </div>
                </div>

                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Selected Blends</p>
                <div className="space-y-3">
                  {selectedBlends.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.accent }} />
                      <span className="font-heading text-sm flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{p.name}</span>
                      <span className="font-mono text-[9px]" style={{ color: 'rgba(230,183,173,0.6)' }}>×{blendQty[p.slug]}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 flex flex-wrap gap-3 text-[8px] font-mono uppercase tracking-wide" style={{ borderTop: '1px solid rgba(230,183,173,0.07)' }}>
                  <span className="px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', color: 'rgba(230,183,173,0.5)', border: '1px solid rgba(230,183,173,0.12)' }}>Monthly Delivery</span>
                  <span className="px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', color: 'rgba(230,183,173,0.5)', border: '1px solid rgba(230,183,173,0.12)' }}>Free Shipping</span>
                  <span className="px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', color: 'rgba(230,183,173,0.5)', border: '1px solid rgba(230,183,173,0.12)' }}>{tubeCount * 27} Total Servings</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setStep(2)}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase py-3.5 px-6 transition-all hover:opacity-70"
                  style={{ border: '1px solid rgba(230,183,173,0.2)', color: 'rgba(230,183,173,0.5)' }}>
                  ← Edit Selections
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout || isGeneratingCheckout}
                  className="flex-1 font-mono text-[9px] tracking-[0.35em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90 btn-glow text-center"
                  style={{ 
                    background: isGeneratingCheckout ? 'rgba(230,183,173,0.5)' : RG, 
                    color: '#080808', 
                    textDecoration: 'none',
                    cursor: isGeneratingCheckout ? 'not-allowed' : 'pointer',
                    opacity: isGeneratingCheckout ? 0.7 : 1,
                  }}
                >
                  {isGeneratingCheckout ? 'Preparing Your Discount...' : `Proceed to Checkout →`}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.07)' }}>
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>Questions</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>Subscription FAQ</h2>
          </div>
          {SUB_FAQ.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* ── LEGAL ── */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}