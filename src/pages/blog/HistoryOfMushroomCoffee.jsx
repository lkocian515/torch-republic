import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Brain, Shield, Zap, Moon } from 'lucide-react';
import RecommendedRitualBlock from '../../components/content/RecommendedRitualBlock';

const RG = '#E6B7AD';

export default function HistoryOfMushroomCoffee() {
  useSEO({
    title: 'The History of Mushroom Coffee: Ancient Origins to Modern Wellness',
    description: 'Discover the fascinating history of mushroom coffee, from ancient medicinal mushroom traditions and Finnish wartime coffee substitutes to today\'s functional wellness movement.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
    url: '/journal/history-of-mushroom-coffee',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2026-06-12T08:00:00Z',
      section: 'Coffee History',
      keywords: ['mushroom coffee history', 'functional mushrooms', 'Chaga coffee', 'Lion\'s Mane', 'medicinal mushrooms', 'wellness beverages'],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'History of Mushroom Coffee', url: '/journal/history-of-mushroom-coffee' },
    ],
  });

  const BENEFITS = [
    { icon: Brain, title: "Lion's Mane", body: 'Focus and cognitive support' },
    { icon: Shield, title: 'Chaga', body: 'Antioxidant content' },
    { icon: Moon, title: 'Reishi', body: 'Balance and relaxation' },
    { icon: Zap, title: 'Cordyceps', body: 'Natural energy support' },
  ];

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Journal · Coffee History
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            The History of Mushroom Coffee:<br />From Ancient Traditions to Modern Rituals
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Mushroom coffee may seem like a recent wellness trend, but its roots stretch back centuries. Long before functional beverages became popular, cultures around the world were using medicinal mushrooms to support energy, resilience, and well-being.
          </p>
          <p className="font-mono text-[8px] tracking-[0.2em] mt-8" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Published June 12, 2026 · Torch Republic
          </p>
        </motion.div>
      </section>

      {/* Article */}
      <article className="px-6 md:px-10 py-16">
        <div className="max-w-[800px] mx-auto space-y-16">

          {/* Introduction */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-heading space-y-5" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
              <p>
                Today, mushroom coffee combines the familiar comfort of coffee with the benefits of functional mushrooms, creating a daily ritual that feels both modern and deeply connected to history.
              </p>
            </motion.div>
          </section>

          {/* Ancient Origins */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Ancient Origins: The Power of Functional Mushrooms
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  For thousands of years, mushrooms have held an important place in traditional wellness practices throughout Asia and Eastern Europe. Species such as Reishi, Chaga, Cordyceps, and Lion's Mane were valued not as culinary ingredients, but as powerful natural resources believed to support vitality, mental clarity, and longevity.
                </p>
                <p>
                  Traditional healers often prepared mushrooms as teas, broths, and extracts. While they didn't have mushroom coffee as we know it today, they recognized that certain fungi offered unique properties that could complement daily life and support overall wellness.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Finland Wartime */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Finland and the Wartime Coffee Shortage
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  One of the most fascinating chapters in mushroom coffee history occurred during World War II.
                </p>
                <p>
                  Finland is one of the world's most coffee-loving nations. During wartime shortages, however, access to coffee beans became limited. To stretch supplies and create alternatives, many Finns turned to locally available ingredients, including Chaga mushrooms harvested from birch trees. Chaga was brewed as a coffee substitute when traditional coffee was unavailable.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: RG }}>
                    What began as a practical solution during difficult times eventually helped inspire modern mushroom coffee decades later.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Rise of Functional Coffee */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Rise of Functional Coffee
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  As interest in natural wellness expanded during the 21st century, researchers, entrepreneurs, and consumers began revisiting traditional ingredients that had been used for generations.
                </p>
                <p>
                  Functional mushrooms quickly gained attention for their unique bioactive compounds and their potential role in supporting focus, stress management, and overall wellness. Rather than replacing coffee entirely, innovators began blending mushroom extracts with coffee, creating a beverage that offered the familiar taste of coffee alongside functional ingredients.
                </p>
                <p>
                  This approach transformed mushroom coffee from a wartime substitute into an entirely new category of functional beverages.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Why Popular */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Why Mushroom Coffee Became Popular
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Modern consumers are increasingly looking for products that fit into a balanced wellness routine. Mushroom coffee appealed to many people because it offered a familiar daily ritual while introducing functional ingredients.
                </p>
                
                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                  {BENEFITS.map((b, i) => (
                    <motion.div
                      key={b.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-5"
                      style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <b.icon size={14} style={{ color: RG }} />
                        </div>
                        <h3 className="font-serif font-bold" style={{ fontSize: '0.95rem', color: '#F5EFE6' }}>{b.title}</h3>
                      </div>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>{b.body}</p>
                    </motion.div>
                  ))}
                </div>

                <p>
                  While research continues to evolve, many people appreciate mushroom coffee as a convenient way to incorporate functional mushrooms into their daily routines. Experts generally recommend viewing mushroom coffee as a wellness beverage rather than a medical treatment.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Modern Era */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                Mushroom Coffee Today
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  What was once a traditional remedy and later a wartime necessity has become a global wellness movement.
                </p>
                <p>
                  From specialty cafés to premium wellness brands, mushroom coffee continues to grow in popularity as consumers seek alternatives that align with mindful living, daily rituals, and intentional health choices. Recent reports show increasing demand for mushroom-infused beverages across both the United States and Europe.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: RG }}>
                    Today's mushroom coffee is no longer about replacing coffee. It's about enhancing the experience.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Torch Republic Perspective */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFFFF' }}>
                The Torch Republic Perspective
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  At Torch Republic, we believe great rituals combine tradition with purpose.
                </p>
                <p>
                  Our mushroom coffee blends are inspired by centuries of mushroom use, modern wellness innovation, and the simple idea that what you drink every day should support the life you're building.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: RG }}>
                    The history of mushroom coffee reminds us that some of the best ideas aren't new at all. They're timeless practices rediscovered by a new generation.
                  </p>
                  <p className="font-serif font-bold text-lg" style={{ color: RG }}>
                    And sometimes, the future begins by looking back.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Recommended Ritual */}
          <RecommendedRitualBlock
            productName="GlowMind Clarity Blend"
            productSlug="glowmind-clarity-blend"
            tagline="Centuries of mushroom wisdom, in an instant cup. Lion's Mane + Chaga — ready in 30 seconds. Subscribe and save 20%."
          />

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(230,183,173,0.06)', border: '1px solid rgba(230,183,173,0.15)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
              Begin Your Ritual
            </p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFFFF' }}>
              Explore Torch Republic Mushroom Coffee
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Premium instant mushroom coffee blends inspired by ancient wisdom and crafted for modern life.
            </p>
            <Link to="/mushroom-coffee" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: RG, color: '#080808' }}>
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