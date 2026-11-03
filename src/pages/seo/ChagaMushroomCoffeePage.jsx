/**
 * SEO Landing Page: Chaga Mushroom Coffee
 * Route: /ingredients/chaga-mushroom-coffee
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Shield, ArrowRight } from 'lucide-react';

const RG = '#E6AC45';
const DIM = 'rgba(240,232,220,0.58)';

const SCIENCE_POINTS = [
  { heading: "ORAC Score: The Antioxidant King", body: "Chaga (Inonotus obliquus) holds one of the highest ORAC (Oxygen Radical Absorbance Capacity) scores ever measured in a food source — regularly outranking blueberries, acai, and goji berries by a factor of 10–50x. ORAC measures a substance's ability to neutralize free radicals, which drive oxidative stress and cellular aging." },
  { heading: "Beta-Glucans and Immune Function", body: "Chaga is rich in beta-glucans — complex polysaccharides that interact with immune receptors (particularly Dectin-1) to modulate immune response. This doesn't mean Chaga 'boosts' immunity in the way marketing claims often suggest; instead, it supports immune system regulation — helping it respond appropriately without overactivation." },
  { heading: "Adaptogenic Properties", body: "As an adaptogen, Chaga helps the body maintain homeostasis under stress. Research suggests its triterpenes and polyphenols support healthy cortisol response, making it a useful daily ingredient for anyone managing chronic stress. Unlike stimulant adaptogens (like Rhodiola), Chaga is calming rather than activating." },
  { heading: "Betulinic Acid from Birch Trees", body: "Authentic Chaga grows on birch trees and absorbs betulin and betulinic acid from its host. These compounds are unique to wild-harvested Chaga and are not present in lab-grown versions. Torch Republic sources birch-grown Chaga to preserve this component of the traditional nutritional profile." },
  { heading: "Dual Extraction Matters", body: "Chaga's water-soluble beta-glucans require hot-water extraction; its triterpenes require alcohol extraction. A good Chaga product states which method it uses. Torch Republic dual-extracts the mushrooms in our own blends, Lion's Mane, Cordyceps and Reishi, for exactly the same reason." },
];

const PAA = [
  { q: "What does Chaga mushroom coffee do?", a: "Chaga is one of the most antioxidant-dense foods ever measured, with ORAC scores 10–50x higher than blueberries. In mushroom coffee, it supports immune regulation via beta-glucans, provides adaptogenic stress support through triterpenes and polyphenols, and adds subtle earthy depth to coffee flavor. Most users report improved daily resilience and reduced inflammation markers with consistent daily use." },
  { q: "Does Chaga coffee give you energy?", a: "Not directly — Chaga is not a stimulant. The energy in Chaga coffee comes from its coffee base. Chaga's contribution is adaptogenic: it helps reduce the physiological response to stress and supports healthier cortisol levels, which can improve subjective energy and resilience over time." },
  { q: "How much Chaga should be in mushroom coffee?", a: "Look for at least 250–500mg of dual-extracted Chaga fruiting body per serving, and a label that names the extraction method. Unextracted Chaga powder has very low bioavailability. Chaga is not one of the mushrooms in Torch Republic blends, but we do list every ingredient we use, so you always know exactly what is in a cup." },
  { q: "What does Chaga taste like in coffee?", a: "Very subtle. Chaga has a naturally earthy, slightly vanilla-like flavor that blends seamlessly with coffee. In a well-formulated mushroom coffee, you taste rich coffee with a hint of earthiness — you would not identify Chaga as a separate flavor without knowing it was present." },
  { q: "Is Chaga mushroom coffee good for you?", a: "For most healthy adults, yes. Chaga has a long traditional use history in Siberian and Finnish folk medicine and a clean modern safety record. Its antioxidant and immune-modulating properties are among the best-documented in the functional mushroom category. Note: Chaga contains oxalates, so people with kidney issues should consult a doctor before daily use." },
];

const PRODUCTS = [
  { name: "Instant Mushroom Coffee", slug: "instant-mushroom-coffee", tagline: "Lion's Mane + Cordyceps + Reishi, our functional blend" },
  { name: "Instant Classic Coffee", slug: "instant-classic-coffee", tagline: "100% Arabica, no mushrooms" },
  { name: "Torch Republic Coffee Duo", slug: "torch-republic-coffee-duo", tagline: "Both coffees, one bundle" },
];

export default function ChagaMushroomCoffeePage() {
  useSEO({
    title: "Chaga Mushroom Coffee: Antioxidant Benefits, Science & Best Blends | Torch Republic",
    description: "Chaga mushroom coffee delivers powerful antioxidant support from one of nature's most antioxidant-dense foods. Learn the science, dosage, and shop dual-extracted Chaga blends.",
    url: '/ingredients/chaga-mushroom-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2024-01-15',
      dateModified: '2025-06-01',
      section: 'Ingredients',
      keywords: ['chaga mushroom coffee', 'chaga coffee benefits', 'chaga antioxidant coffee', 'mushroom coffee immune support'],
    },
    faq: PAA.map(f => ({ question: f.q, answer: f.a })),
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Ingredients', url: '/ingredients' },
      { name: 'Chaga Coffee', url: '/ingredients/chaga-mushroom-coffee' },
    ],
  });

  return (
    <div style={{ background: '#100F0D', minHeight: '100vh', color: '#F7F2E9' }}>
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(230,183,173,0.4)' }}>
          <Link to="/" className="hover:opacity-70">Home</Link>
          <span>›</span>
          <Link to="/ingredients" className="hover:opacity-70">Ingredients</Link>
          <span>›</span>
          <span style={{ color: 'rgba(230,183,173,0.7)' }}>Chaga</span>
        </nav>
      </div>

      <section className="max-w-3xl mx-auto px-6 pt-14 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1" style={{ background: 'rgba(230,183,173,0.07)', border: '1px solid rgba(230,183,173,0.18)' }}>
            <Shield size={12} style={{ color: RG }} />
            <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: RG }}>Antioxidant & Immunity</span>
          </div>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.02em' }}>
            Chaga Mushroom Coffee:<br /><span style={{ color: RG }}>The Antioxidant King</span>
          </h1>
          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: DIM, fontWeight: 300, lineHeight: 1.85 }}>
            Chaga (Inonotus obliquus) has one of the highest antioxidant scores ever measured in a food source — 10–50x higher than blueberries. Here's what that actually means for your daily coffee ritual.
          </p>
          <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold py-3.5 px-7 transition-all hover:opacity-90" style={{ background: RG, color: '#080808' }}>
            Shop Mushroom Coffee <ArrowRight size={11} />
          </Link>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(230,183,173,0.4)' }}>The Science</p>
        <div className="space-y-10">
          {SCIENCE_POINTS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: '#F7F2E9' }}>{s.heading}</h2>
              <p className="font-heading" style={{ fontSize: '0.93rem', color: DIM, fontWeight: 300, lineHeight: 1.9 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-10" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.4)' }}>Our Mushroom Coffee</p>
        <div className="space-y-3">
          {PRODUCTS.map(p => (
            <Link key={p.slug} to={`/products/${p.slug}`} className="flex items-center justify-between gap-4 p-5 block transition-all"
              style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${RG}35`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)'}>
              <div>
                <p className="font-serif font-bold text-white mb-1">{p.name}</p>
                <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300 }}>{p.tagline}</p>
              </div>
              <ArrowRight size={14} style={{ color: `${RG}70`, flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', color: '#F7F2E9' }}>People Also Ask About Chaga Coffee</h2>
        <div className="space-y-6">
          {PAA.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="pb-6" style={{ borderBottom: '1px solid rgba(230,183,173,0.07)' }}>
              <h3 className="font-heading font-semibold mb-3" style={{ fontSize: '0.95rem', color: '#F7F2E9' }}>{item.q}</h3>
              <p className="font-heading text-sm" style={{ color: DIM, fontWeight: 300, lineHeight: 1.85 }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-8" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.35)' }}>Continue Learning</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Lion's Mane Coffee", href: '/lions-mane-coffee' },
            { label: 'Mushroom Coffee Benefits', href: '/mushroom-coffee-benefits' },
            { label: 'Chaga: Antioxidant King', href: '/journal/chaga-mushroom-antioxidant-king' },
            { label: 'All Ingredients', href: '/ingredients' },
          ].map(l => (
            <Link key={l.href} to={l.href} className="font-mono text-[8px] tracking-[0.2em] uppercase px-3 py-2 transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(230,183,173,0.12)', color: 'rgba(230,183,173,0.55)' }}>
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="px-6 py-6 text-center">
        <p className="font-mono text-[7px] tracking-[0.12em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.8 }}>
          These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}