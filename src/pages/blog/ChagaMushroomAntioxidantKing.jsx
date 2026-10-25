import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Heart, Clock, Droplet, Leaf, Moon } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6B7AD';
const CHAGA_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/36e4293d0_Chaga1.png';

export default function ChagaMushroomAntioxidantKing() {
  useSEO({
    title: 'Chaga Mushroom: The Antioxidant King Behind Evening Restoration',
    description: 'Discover Chaga mushroom, nature\'s most potent antioxidant. Learn about its immune-supporting properties, traditional uses, and role in evening wellness rituals.',
    image: CHAGA_IMAGE,
    url: '/journal/chaga-mushroom-antioxidant-king',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2026-06-12T08:00:00Z',
      section: 'Mushroom Science',
      keywords: ['chaga mushroom', 'antioxidants', 'immune support', 'evening ritual', 'functional mushrooms', 'wellness', 'restoration', 'mushroom benefits'],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Chaga Mushroom: The Antioxidant King', url: '/journal/chaga-mushroom-antioxidant-king' },
    ],
  });

  const BENEFITS = [
    { icon: Shield, title: 'Immune Support', body: 'Beta-glucans and polysaccharides support healthy immune function', color: '#E67F8A' },
    { icon: Heart, title: 'Antioxidant Power', body: 'Highest ORAC value of any superfood, combats oxidative stress', color: '#C98F86' },
    { icon: Moon, title: 'Evening Restoration', body: 'Supports calm, relaxation, and the body\'s natural recovery processes', color: '#6B7FD7' },
    { icon: Droplet, title: 'Adaptogenic Balance', body: 'Helps the body adapt to stress and maintain homeostasis', color: '#6CBD5A' },
  ];

  const COMPOUNDS = [
    { name: 'Superoxide Dismutase (SOD)', benefit: 'Powerful antioxidant enzyme' },
    { name: 'Beta-Glucans', benefit: 'Immune-modulating polysaccharides' },
    { name: 'Triterpenes', benefit: 'Anti-inflammatory compounds' },
    { name: 'Melanin', benefit: 'Dark pigment with antioxidant properties' },
    { name: 'Polyphenols', benefit: 'Plant compounds that fight free radicals' },
  ];

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Journal · Mushroom Science
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Chaga Mushroom:<br />The Antioxidant King Behind Evening Restoration
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Growing wild on birch trees in cold climates, Chaga mushroom has been revered for centuries as a symbol of longevity and vitality. Modern science now confirms what traditional healers knew: Chaga is nature's most potent antioxidant.
          </p>
          <p className="font-mono text-[8px] tracking-[0.2em] mt-8" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Published June 12, 2026 · Torch Republic
          </p>
        </motion.div>
      </section>

      {/* Hero Image */}
      <section className="px-0 py-0">
        <div className="w-full" style={{ height: 'clamp(300px, 50vh, 500px)', overflow: 'hidden', position: 'relative', background: '#1a1512' }}>
          <img
            src={CHAGA_IMAGE}
            alt="Chaga mushroom growing on birch tree trunk in forest"
            className="w-full h-full"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(8,8,8,0.4) 60%, rgba(8,8,8,0.9) 100%)' }} />
        </div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[800px] mx-auto space-y-16">

          {/* Introduction */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading space-y-5" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              <p>
                In the frozen forests of Siberia, Northern Europe, and North America, a remarkable fungus grows on the bark of birch trees. Dark, charred-looking, and unassuming, Chaga mushroom (Inonotus obliquus) has been treasured for centuries as a symbol of longevity and vitality.
              </p>
              <p>
                Traditional healers across cold climates recognized Chaga's extraordinary properties long before modern science could explain them. Today, research confirms what ancestral wisdom taught: Chaga is one of nature's most powerful antioxidants.
              </p>
              <div className="my-8 p-6" style={{ background: 'rgba(201,143,134,0.06)', border: '1px solid rgba(201,143,134,0.15)', borderRadius: '4px' }}>
                <p className="font-serif font-bold text-lg mb-2" style={{ color: '#C98F86' }}>
                  Chaga has the highest ORAC (Oxygen Radical Absorbance Capacity) value of any known superfood.
                </p>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                  This measurement of antioxidant capacity places Chaga above blueberries, goji berries, and even other medicinal mushrooms.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Key Benefits */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Key Benefits of Chaga
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5"
                    style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${b.color}15`, border: `1px solid ${b.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <b.icon size={14} style={{ color: b.color }} />
                      </div>
                      <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{b.title}</h3>
                    </div>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>{b.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Antioxidant Power */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Antioxidant King
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Antioxidants are compounds that neutralize free radicals, unstable molecules that damage cells and contribute to aging and disease.
                </p>
                <p>
                  Chaga's exceptional antioxidant capacity comes from its dense concentration of superoxide dismutase (SOD), melanin, polyphenols, and triterpenes. These compounds work synergistically to protect cells from oxidative stress.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,127,138,0.06)', border: '1px solid rgba(230,127,138,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: '#E67F8A' }}>
                    Chaga's ORAC value exceeds 146,000 units per 100 grams, far surpassing most fruits, vegetables, and supplements.
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    This extraordinary antioxidant density makes Chaga a powerful ally for cellular health and longevity.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Bioactive Compounds */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Bioactive Compounds
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Chaga contains a unique profile of bioactive compounds responsible for its health-supporting properties:
                </p>
                
                {/* Compounds List */}
                <div className="my-8 space-y-3">
                  {COMPOUNDS.map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4"
                      style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{c.name}</h3>
                      </div>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{c.benefit}</p>
                    </motion.div>
                  ))}
                </div>

                <p>
                  These compounds work together, creating effects greater than any single compound alone, a phenomenon known as the "entourage effect."
                </p>
              </div>
            </motion.div>
          </section>

          {/* Evening Restoration */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Evening Restoration Ritual
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  While many functional mushrooms support energy and focus, Chaga excels as an evening companion.
                </p>
                <p>
                  Its adaptogenic properties help the body transition from the stress of the day into a state of rest and recovery. Chaga supports the body's natural repair processes that occur during sleep.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(107,127,215,0.06)', border: '1px solid rgba(107,127,215,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: '#6B7FD7' }}>
                    Incorporating Chaga into your evening ritual signals to your body that it's time to restore, recover, and prepare for renewal.
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    Many find that Chaga promotes a sense of calm without drowsiness, ideal for winding down while maintaining mental clarity.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Traditional Uses */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Traditional Wisdom
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Chaga has a rich history in traditional medicine across cold climates:
                </p>
                <div className="my-8 space-y-4">
                  {[
                    { culture: 'Siberian Folk Medicine', use: 'Used for longevity, digestive health, and overall vitality' },
                    { culture: 'Traditional Chinese Medicine', use: 'Valued for balancing qi and supporting immune function' },
                    { culture: 'Scandinavian Healers', use: 'Brewed as tea for strength and resilience in harsh climates' },
                    { culture: 'Indigenous North Americans', use: 'Applied topically and consumed for healing properties' },
                  ].map((item, i) => (
                    <div key={item.culture} className="p-4" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}>
                      <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{item.culture}</h3>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{item.use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* How to Use */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                How to Incorporate Chaga
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Chaga can be enjoyed in several forms, each offering unique benefits:
                </p>
                <div className="my-8 space-y-3">
                  {[
                    { title: 'Powdered Extract', body: 'Concentrated form with standardized bioactive compounds. Easy to add to evening beverages, smoothies, or recipes.' },
                    { title: 'Chaga Tea', body: 'Traditional preparation by simmering chunks or powder. Creates a rich, earthy brew with deep color.' },
                    { title: 'Capsules', body: 'Convenient dosing with precise amounts of extract for consistent daily use.' },
                    { title: 'Tinctures', body: 'Liquid extracts for rapid absorption and flexible dosing options.' },
                  ].map((item, i) => (
                    <div key={item.title} className="p-4" style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}>
                      <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.05rem', color: '#F5EFE6' }}>{item.title}</h3>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)' }}>{item.body}</p>
                    </div>
                  ))}
                </div>
                <p>
                  For evening restoration, consistency matters. Daily use allows Chaga's compounds to accumulate and support your body's natural rhythms.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Torch Republic */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Torch Republic Approach
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  At Torch Republic, we blend Chaga with premium instant coffee and other functional mushrooms to create rituals for every part of your day.
                </p>
                <p>
                  Our MoonCap Restore blend features Chaga alongside Lion's Mane, creating an evening ritual that supports relaxation, restoration, and the body's natural recovery processes.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg" style={{ color: RG }}>
                    We believe in honoring ancient wisdom while embracing modern convenience, creating rituals that support both body and mind.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="Chaga Mushroom: The Antioxidant King Behind Evening Restoration" url="/journal/chaga-mushroom-antioxidant-king" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(201,143,134,0.06)', border: '1px solid rgba(201,143,134,0.15)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(201,143,134,0.6)' }}>
              Experience Evening Restoration
            </p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>
              Try Torch Republic MoonCap Restore
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Premium mushroom coffee infused with Chaga and Lion's Mane for calm evenings and restorative rituals.
            </p>
            <Link to="/shop/instant-mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: '#C98F86', color: '#080808' }}>
              Shop Mushroom Coffee →
            </Link>
          </motion.div>

        </div>
      </article>

      {/* FDA Disclaimer */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}