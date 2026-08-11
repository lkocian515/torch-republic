import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Link } from 'react-router-dom';
import { Plus, Minus, ChevronDown, ChevronUp, Check, RefreshCw, Calendar, Wallet, Repeat } from 'lucide-react';
import { MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from '../lib/mushroomProducts';
import useNoIndex from '@/hooks/useNoIndex';
import { getSubscriptionCheckoutUrl, SHOPIFY_CART_URL } from '@/lib/shopifyCheckout';
import DiscountReminders from '../components/discounts/DiscountReminders';

const THEME = {
  page: '#F7F1E7',
  cream: '#FBF8F1',
  card: '#FFFDF8',
  text: '#292622',
  secondary: '#5F574F',
  border: '#E4D8C9',
  clay: '#B7653E',
  moss: '#566047',
};

const TUBE_OPTIONS = [1, 2, 3, 4, 5, 6];

const SUB_FAQ = [
  { q: 'Can I change my delivery date?', a: 'Yes — you can move it earlier or later anytime in your account before the shipment processes. Full flexibility, no phone calls needed.' },
  { q: 'Can I skip a shipment?', a: 'Yes. Just skip a month instead of canceling. Your subscription stays active and resumes the following cycle.' },
  { q: 'Can I swap blends between deliveries?', a: 'Yes. You can update your blend selections before each shipment. Mix and match mushroom coffee, classic coffee, or matcha however you like.' },
  { q: 'Do I get loyalty points with subscriptions?', a: 'Yes — subscription orders earn Torchbearers Rewards points just like one-time purchases. It\'s the best way to stack savings and rewards.' },
  { q: 'How do I cancel?', a: 'You can pause or cancel anytime directly from your account in a few clicks. No calls, no forms, no hassle.' },
  { q: 'How many tubes can I subscribe to monthly?', a: 'Choose between 1 and 6 tubes per delivery. You can adjust the quantity anytime from your account.' },
];

const STEPS = [
  { num: '1', title: 'Pick your blends', body: 'Choose your favorite coffee, mushroom blend, or matcha. Mix and match up to 6 tubes per monthly delivery.' },
  { num: '2', title: 'Set monthly delivery', body: 'Your selection ships every month on your schedule. Adjust the delivery date, skip a month, or swap blends anytime from your account.' },
  { num: '3', title: 'Save 20% on every order', body: 'The 20% discount applies to every subscription order — not just the first. Pause or cancel in a few clicks, no calls required.' },
];

const PERKS = [
  { icon: Wallet, label: '20% off every order' },
  { icon: Calendar, label: 'Delivered monthly' },
  { icon: RefreshCw, label: 'Swap blends anytime' },
  { icon: Repeat, label: 'Pause, skip, or cancel anytime' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${THEME.border}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-left py-5 gap-4"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={open}
      >
        <span className="font-serif font-bold" style={{ fontSize: '1rem', color: THEME.text }}>{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: THEME.clay }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: THEME.secondary }} />}
      </button>
      {open && (
        <p className="font-heading pb-5" style={{ color: THEME.secondary, lineHeight: 1.8, fontSize: '0.95rem' }}>{a}</p>
      )}
    </div>
  );
}

export default function Subscription() {
  const [step, setStep] = useState(1);
  const [tubeCount, setTubeCount] = useState(null);
  const [blendQty, setBlendQty] = useState({});
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
      if (delta > 0 && totalSelected >= tubeCount) return prev;
      return { ...prev, [slug]: next };
    });
  };

  const resetSelections = () => { setBlendQty({}); };

  const ALL_SUB_PRODUCTS = [...MUSHROOM_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS, ...MATCHA_PRODUCTS];
  const selectedBlends = ALL_SUB_PRODUCTS.filter(p => (blendQty[p.slug] || 0) > 0);
  const AVG_PRICE = 22.99;
  const monthlyPrice = tubeCount ? tubeCount * AVG_PRICE : 0;
  const discountedPrice = monthlyPrice * 0.80;
  const savings = monthlyPrice - discountedPrice;

  const handleCheckout = async () => {
    if (!canCheckout) return;
    setIsGeneratingCheckout(true);
    try {
      const url = await getSubscriptionCheckoutUrl(blendQty);
      setTimeout(() => { window.location.href = url; }, 500);
    } catch (error) {
      console.error('Checkout failed:', error);
      setIsGeneratingCheckout(false);
    }
  };

  return (
    <div style={{ backgroundColor: THEME.page, color: THEME.text, minHeight: '100vh' }}>

      {/* HERO */}
      <section className="px-6 md:px-10 pt-16 pb-14 text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
          <p className="eyebrow mb-4" style={{ color: THEME.clay }}>Subscribe &amp; Save</p>
          <h1 className="h1 mb-4">Save 20% on every order, delivered monthly.</h1>
          <p className="body-lg mb-8">
            Lock in your ritual and skip the reorder stress. The 20% savings apply to every delivery — not just the first. Pause, skip, or cancel anytime from your account.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a href="#builder" className="btn btn-primary" style={{ minWidth: 260 }}>
              Build My Subscription
            </a>
            <Link to="/shop" className="font-heading text-sm" style={{ color: THEME.secondary, textDecoration: 'none' }}>
              Prefer a one-time order? <span style={{ color: THEME.clay, textDecoration: 'underline' }}>Shop all blends →</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* PERKS STRIP */}
      <section className="px-6 md:px-10 pb-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PERKS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 p-3" style={{ background: THEME.cream, border: `1px solid ${THEME.border}`, borderRadius: 8 }}>
              <Icon size={16} style={{ color: THEME.clay, flexShrink: 0 }} />
              <span className="font-heading text-xs" style={{ color: THEME.secondary, lineHeight: 1.4 }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-10 py-14" style={{ background: THEME.cream, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-2" style={{ color: THEME.clay }}>How it works</p>
            <h2 className="h2">Three simple steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map(({ num, title, body }) => (
              <div key={num} className="card-torch p-6">
                <div className="w-9 h-9 flex items-center justify-center font-serif font-bold mb-4" style={{ background: `${THEME.clay}14`, color: THEME.clay, fontSize: '1.1rem', borderRadius: '50%' }}>{num}</div>
                <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: THEME.text }}>{title}</h3>
                <p className="font-heading text-sm" style={{ color: THEME.secondary, lineHeight: 1.75 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <section id="builder" className="px-6 md:px-10 py-16">
        <div className="max-w-[860px] mx-auto">

          {/* Step indicators */}
          <div className="flex items-center gap-3 mb-12 justify-center">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { if (s < step || (s === 2 && tubeCount) || (s === 3 && canCheckout)) setStep(s); }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all"
                    style={{
                      background: step === s ? THEME.clay : step > s ? `${THEME.clay}22` : THEME.cream,
                      color: step === s ? THEME.cream : step > s ? THEME.clay : THEME.secondary,
                      border: `1px solid ${step > s ? `${THEME.clay}55` : THEME.border}`,
                    }}>
                    {s}
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase hidden sm:block" style={{ color: step === s ? THEME.clay : THEME.secondary }}>
                    {s === 1 ? 'Tube Count' : s === 2 ? 'Select Blends' : 'Review'}
                  </span>
                </div>
                {s < 3 && <div className="flex-1 h-px max-w-[60px]" style={{ background: step > s ? `${THEME.clay}55` : THEME.border }} />}
              </React.Fragment>
            ))}
          </div>

          {/* STEP 1: Tube Count */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-8">
                <p className="eyebrow mb-2" style={{ color: THEME.clay }}>Step 1 of 3</p>
                <h2 className="h2">Choose how many tubes per month</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {TUBE_OPTIONS.map(n => (
                  <button
                    key={n}
                    onClick={() => { setTubeCount(n); resetSelections(); setStep(2); }}
                    className="flex flex-col items-center gap-2 py-8 px-4 transition-all"
                    style={{
                      background: tubeCount === n ? `${THEME.clay}10` : THEME.card,
                      border: `1.5px solid ${tubeCount === n ? THEME.clay : THEME.border}`,
                      borderRadius: 10, cursor: 'pointer',
                    }}
                  >
                    <span className="font-serif font-bold" style={{ fontSize: '2.2rem', color: tubeCount === n ? THEME.clay : THEME.text, lineHeight: 1 }}>{n}</span>
                    <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: THEME.secondary }}>
                      {n === 1 ? 'Tube' : 'Tubes'} / Month
                    </span>
                    <span className="font-mono text-[9px]" style={{ color: tubeCount === n ? THEME.clay : THEME.secondary }}>
                      from ${(n * 19.99 * 0.80).toFixed(2)}/mo after 20% off
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Select Blends */}
          {step === 2 && tubeCount && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-2">
                <p className="eyebrow mb-2" style={{ color: THEME.clay }}>Step 2 of 3</p>
                <h2 className="h2 mb-1">Select your blends</h2>
                <p className="body" style={{ fontSize: '0.95rem' }}>
                  You’re building a <span style={{ color: THEME.clay, fontWeight: 700 }}>{tubeCount}-tube</span> monthly subscription. Select {tubeCount} total tube{tubeCount > 1 ? 's' : ''}.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 my-6">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: THEME.border, width: '160px' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${(totalSelected / tubeCount) * 100}%`, background: totalSelected === tubeCount ? THEME.moss : THEME.clay }} />
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: totalSelected === tubeCount ? THEME.moss : THEME.clay }}>
                  {totalSelected}/{tubeCount} selected
                </span>
              </div>

              {[
                { label: 'Mushroom Coffee', products: MUSHROOM_PRODUCTS },
                { label: 'Classic Coffee', products: CLASSIC_COFFEE_PRODUCTS },
                { label: 'Ceremonial Matcha', products: MATCHA_PRODUCTS },
              ].map(group => (
                <div key={group.label} className="mb-6">
                  <p className="eyebrow mb-3" style={{ color: THEME.secondary }}>{group.label}</p>
                  <div className="space-y-3">
                    {group.products.map(p => {
                      const qty = blendQty[p.slug] || 0;
                      return (
                        <div key={p.id} className="flex items-center gap-4 p-4 transition-all"
                          style={{ background: qty > 0 ? `${p.accent}0A` : THEME.card, border: `1px solid ${qty > 0 ? p.accent + '40' : THEME.border}`, borderRadius: 8 }}>
                          <img src={p.image} alt={p.name} className="w-14 h-14 object-contain flex-shrink-0" style={{ background: '#F8F5EF', padding: '4px', borderRadius: 6 }} />
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-bold text-sm" style={{ color: THEME.text }}>{p.name}</p>
                            <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>{p.roast}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => adjustBlend(p.slug, -1)} disabled={qty === 0}
                              className="w-9 h-9 flex items-center justify-center transition-all" style={{ border: `1px solid ${THEME.border}`, color: qty === 0 ? THEME.border : THEME.text, cursor: qty === 0 ? 'not-allowed' : 'pointer', background: 'none' }} aria-label={`Decrease ${p.name}`}>
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono font-bold w-6 text-center" style={{ color: qty > 0 ? THEME.clay : THEME.secondary, fontSize: '0.95rem' }}>{qty}</span>
                            <button onClick={() => adjustBlend(p.slug, 1)} disabled={totalSelected >= tubeCount}
                              className="w-9 h-9 flex items-center justify-center transition-all" style={{ border: `1px solid ${totalSelected >= tubeCount ? THEME.border : THEME.clay}`, color: totalSelected >= tubeCount ? THEME.border : THEME.clay, cursor: totalSelected >= tubeCount ? 'not-allowed' : 'pointer', background: 'none' }} aria-label={`Increase ${p.name}`}>
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
                <button onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
                <button
                  onClick={() => canCheckout && setStep(3)}
                  disabled={!canCheckout}
                  className="btn btn-primary flex-1"
                  style={canCheckout ? {} : { opacity: 0.45, cursor: 'not-allowed' }}>
                  {canCheckout ? 'Review My Subscription →' : `Select ${remaining} more tube${remaining !== 1 ? 's' : ''} to continue`}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Review */}
          {step === 3 && canCheckout && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="text-center mb-8">
                <p className="eyebrow mb-2" style={{ color: THEME.clay }}>Step 3 of 3</p>
                <h2 className="h2">Review your monthly subscription</h2>
              </div>

              <div className="card-torch p-6 mb-6">
                <div className="mb-5">
                  <DiscountReminders cartSubtotal={monthlyPrice} showAll />
                </div>

                <div className="flex items-center justify-between mb-5 pb-5" style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <div>
                    <p className="font-serif font-bold mb-1" style={{ color: THEME.text, fontSize: '1rem' }}>Monthly Coffee Subscription</p>
                    <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: THEME.secondary }}>{tubeCount} Tube{tubeCount > 1 ? 's' : ''} · Delivered Monthly</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs line-through" style={{ color: THEME.secondary }}>${monthlyPrice.toFixed(2)}</p>
                    <p className="font-mono font-bold" style={{ color: THEME.moss, fontSize: '1.3rem' }}>${discountedPrice.toFixed(2)}</p>
                    <p className="font-mono text-[8px]" style={{ color: THEME.secondary }}>/month</p>
                  </div>
                </div>

                <p className="eyebrow mb-3" style={{ color: THEME.clay }}>Selected blends</p>
                <div className="space-y-3">
                  {selectedBlends.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-9 object-contain flex-shrink-0" style={{ background: '#F8F5EF', borderRadius: 6, padding: 2 }} />
                      <span className="font-heading text-sm flex-1" style={{ color: THEME.text }}>{p.name}</span>
                      <span className="font-mono text-xs" style={{ color: THEME.secondary }}>×{blendQty[p.slug]}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${THEME.border}` }}>
                  <span className="badge-torch">Monthly Delivery</span>
                  <span className="badge-torch">Shipping Calculated at Checkout</span>
                  <span className="badge-torch">{tubeCount * 27} Total Servings</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={() => setStep(2)} className="btn btn-ghost">← Edit Selections</button>
                <button
                  onClick={handleCheckout}
                  disabled={!canCheckout || isGeneratingCheckout}
                  className="btn btn-primary flex-1"
                  style={isGeneratingCheckout ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>
                  {isGeneratingCheckout ? 'Preparing Your Discount...' : 'Proceed to Checkout →'}
                </button>
              </div>
              <p className="font-heading text-xs text-center mt-4" style={{ color: THEME.secondary }}>
                You can pause, skip, or cancel anytime from your account after checkout.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ background: THEME.cream, borderTop: `1px solid ${THEME.border}` }}>
        <div className="max-w-[700px] mx-auto">
          <div className="text-center mb-10">
            <p className="eyebrow mb-2" style={{ color: THEME.clay }}>Questions</p>
            <h2 className="h2">Subscription FAQ</h2>
          </div>
          {SUB_FAQ.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-16 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="h2 mb-4">Ready to make it a ritual?</h2>
          <p className="body-lg mb-8">Build your monthly subscription in under a minute. Save 20% on every order, cancel anytime.</p>
          <a href="#builder" className="btn btn-primary" style={{ minWidth: 260 }}>Build My Subscription</a>
        </div>
      </section>

      {/* LEGAL */}
      <div className="px-6 py-8 text-center" style={{ borderTop: `1px solid ${THEME.border}` }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: THEME.secondary, lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}