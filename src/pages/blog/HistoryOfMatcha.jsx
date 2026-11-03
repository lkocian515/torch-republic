import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Book, Heart, Clock } from 'lucide-react';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6AC45';

export default function HistoryOfMatcha() {
  useSEO({
    title: 'The History of Matcha: From Ancient China to Modern Wellness Rituals',
    description: 'Discover the fascinating history of matcha, from ancient Chinese Buddhist monasteries and Japanese tea ceremonies to today\'s global wellness movement.',
    url: '/journal/history-of-matcha',
    type: 'article',
    article: {
      author: 'Torch Republic',
      datePublished: '2026-06-12T08:00:00Z',
      section: 'Matcha History',
      keywords: ['matcha history', 'Japanese tea ceremony', 'Uji matcha', 'Zen Buddhism', 'powdered tea', 'ceremonial matcha', 'tea culture'],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'History of Matcha', url: '/journal/history-of-matcha' },
    ],
  });

  const TIMELINE = [
    { icon: Book, era: 'Tang Dynasty (618–907 CE)', title: 'Powdered Tea Begins', body: 'Tea leaves steamed, compressed into bricks, and ground into powder' },
    { icon: Clock, era: 'Song Dynasty (960–1279 CE)', title: 'Whisked Tea Emerges', body: 'Tea whisked into frothy drink; tea competitions flourish' },
    { icon: MapPin, era: '1191', title: 'Matcha Arrives in Japan', body: 'Monk Eisai brings tea seeds and preparation methods from China' },
    { icon: Leaf, era: '16th Century', title: 'Tea Ceremony Refined', body: 'Sen no Rikyū establishes principles of harmony, respect, purity, tranquility' },
  ];

  const UJI_FEATURES = [
    { icon: MapPin, title: 'Ideal Growing Conditions', body: 'Morning mists, rich soil, rolling hills, and moderate climate' },
    { icon: Leaf, title: 'Traditional Shading Methods', body: 'Tea plants shaded weeks before harvest for vibrant green color and smooth flavor' },
    { icon: Heart, title: 'Generations of Expertise', body: 'Centuries of refined harvesting and processing techniques' },
  ];

  return (
    <div style={{ backgroundColor: '#080808', color: '#F7F2E9', minHeight: '100vh' }}>
      
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Journal · Matcha History
          </p>
          <h1 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            The History of Matcha:<br />From Ancient China to Modern Wellness Rituals
          </h1>
          <p className="font-heading max-w-3xl mx-auto text-lg" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Matcha's story didn't begin in modern Japan. Its origins trace back more than a thousand years to ancient China, where Buddhist monks, scholars, and emperors helped transform tea from a medicinal remedy into a revered cultural practice.
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
                Today, matcha is celebrated around the world for its vibrant green color, smooth energy, and impressive nutritional profile. You'll find it in cafés, wellness shops, smoothies, and morning routines everywhere.
              </p>
              <p>
                Through centuries of refinement, matcha evolved into one of the world's most cherished beverages, a symbol of mindfulness, focus, and intentional living.
              </p>
            </motion.div>
          </section>

          {/* Ancient Origins */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                The Ancient Origins of Powdered Tea
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Tea has been consumed for thousands of years, but its earliest purpose was not enjoyment. In ancient China, tea was primarily valued for its medicinal qualities.
                </p>
                <p>
                  Early preparations involved boiling tea leaves to extract their beneficial compounds. The resulting brew was often bitter but was believed to promote health, warmth, and vitality.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold" style={{ fontSize: '1.05rem', color: RG, marginBottom: '8px' }}>
                    Tang Dynasty (618–907 CE)
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    Tea leaves were steamed, compressed into bricks, and transported along major trade routes including the Silk Road. To prepare tea, portions of these bricks were roasted, ground into powder, and boiled with water, marking the beginning of powdered tea culture.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Song Dynasty */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                The Song Dynasty and the Birth of Whisked Tea
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  A major transformation occurred during the Song Dynasty (960–1279 CE).
                </p>
                <p>
                  Tea preparation evolved from boiling to whisking. Tea leaves were carefully harvested, steamed, dried, and ground into a fine powder. Hot water was added, and the mixture was whisked into a frothy drink using bamboo tools.
                </p>
                <p>
                  This preparation method became immensely popular among scholars, nobles, and the imperial court. Tea competitions emerged throughout China, where participants evaluated the quality, texture, and appearance of whisked tea. The ability to create a perfect foam became an admired skill.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(108,190,90,0.06)', border: '1px solid rgba(108,190,90,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg mb-2" style={{ color: '#264A35' }}>
                    Buddhist monks adopted powdered tea as part of their spiritual practice.
                  </p>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.7 }}>
                    The combination of natural caffeine and L-theanine helped promote calm alertness, making tea an ideal companion during long periods of meditation and study. The foundation of modern matcha had been established.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Timeline */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-8" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                Matcha Through the Centuries
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TIMELINE.map((t, i) => (
                  <motion.div
                    key={t.era}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5"
                    style={{ background: '#0E0C0B', border: '1px solid rgba(230,183,173,0.08)', borderRadius: '4px' }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)', border: '1px solid rgba(230,183,173,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <t.icon size={14} style={{ color: RG }} />
                      </div>
                      <span className="font-mono text-[7px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>{t.era}</span>
                    </div>
                    <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.05rem', color: '#F7F2E9' }}>{t.title}</h3>
                    <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>{t.body}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Japan */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                How Matcha Arrived in Japan
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  In 1191, the Japanese Zen monk Eisai returned from China carrying tea seeds and the powdered tea preparation methods he had learned during his travels.
                </p>
                <p>
                  This moment would permanently change Japanese tea culture. Eisai introduced both Zen Buddhism and powdered tea to Japan, where they quickly became intertwined.
                </p>
                <p>
                  Unlike China, which eventually shifted toward loose-leaf tea preparation, Japan continued refining the powdered tea tradition. Over generations, Japanese tea growers, monks, and artisans perfected cultivation techniques, preparation methods, and ceremonial practices that elevated matcha into a cultural art form.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Zen Buddhism */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                Matcha and Zen Buddhism
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Zen monks embraced matcha for practical and spiritual reasons.
                </p>
                <p>
                  Long meditation sessions demanded sustained concentration and mental clarity. Matcha provided steady energy while encouraging a calm, focused state of mind.
                </p>
                <p>
                  For many monks, preparing and drinking tea became a mindfulness practice itself. Every movement, from heating water to whisking the tea, was performed with intention and awareness. These principles would eventually become central to the Japanese tea ceremony.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Tea Ceremony */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                The Rise of the Japanese Tea Ceremony
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  Over centuries, matcha evolved from a monastic beverage into a refined cultural tradition.
                </p>
                <p>
                  By the 16th century, legendary tea master Sen no Rikyū had established many of the principles that still define Japanese tea ceremonies today.
                </p>
                <div className="my-8 grid grid-cols-2 gap-3">
                  {['Harmony', 'Respect', 'Purity', 'Tranquility'].map((principle, i) => (
                    <div key={principle} className="p-4 text-center" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                      <p className="font-serif font-bold" style={{ color: RG, fontSize: '1.1rem' }}>{principle}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Rather than showcasing wealth or status, the tea ceremony encouraged simplicity, presence, and appreciation of the moment. Participants gathered not merely to drink tea but to cultivate mindfulness and connection. The preparation of a single bowl of matcha became a reflection of a deeper philosophy of life.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Uji */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                Why Uji Became the Home of Premium Matcha
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  When discussing exceptional matcha, one region stands above all others: Uji, Japan. Located just south of Kyoto, Uji has been producing some of the world's finest matcha for centuries.
                </p>
                
                {/* Uji Features */}
                <div className="space-y-4 my-8">
                  {UJI_FEATURES.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-5"
                      style={{ background: '#0E0C0B', border: '1px solid rgba(108,190,90,0.12)', borderRadius: '4px' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(108,190,90,0.1)', border: '1px solid rgba(108,190,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <f.icon size={14} style={{ color: '#264A35' }} />
                        </div>
                        <h3 className="font-serif font-bold" style={{ fontSize: '1.05rem', color: '#F7F2E9' }}>{f.title}</h3>
                      </div>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>{f.body}</p>
                    </motion.div>
                  ))}
                </div>

                <p>
                  Today, Uji remains synonymous with premium ceremonial-grade matcha.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Modern Renaissance */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                Matcha's Modern Renaissance
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  For much of its history, matcha remained closely tied to Japanese culture. That changed in recent decades as global interest in wellness, mindfulness, and functional nutrition expanded.
                </p>
                <p>
                  Researchers began highlighting matcha's naturally occurring antioxidants, amino acids, and plant compounds. Consumers discovered its unique ability to provide focused energy without the sharp peaks and crashes often associated with traditional caffeinated beverages.
                </p>
                <p>
                  Matcha quickly moved beyond the tea room. Today it appears in lattes, smoothies, protein shakes, desserts, baking recipes, and wellness beverages.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(108,190,90,0.06)', border: '1px solid rgba(108,190,90,0.15)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg" style={{ color: '#264A35' }}>
                    Yet despite its modern popularity, the essence of matcha remains unchanged. It continues to represent balance, intention, and mindful living.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Torch Republic Perspective */}
          <section>
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#FFFCF7' }}>
                The Torch Republic Perspective
              </h2>
              <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.7)', lineHeight: 1.85, fontSize: '1.05rem' }}>
                <p>
                  At Torch Republic, we view matcha as more than a trend. Its history spans centuries of tradition, craftsmanship, and daily ritual.
                </p>
                <p>
                  From ancient Buddhist monasteries to modern wellness routines, matcha has always been connected to focus, presence, and purposeful living.
                </p>
                <p>
                  Whether you're starting your morning, preparing for deep work, or creating a moment of calm in a busy day, matcha offers an opportunity to slow down and reconnect with what matters.
                </p>
                <div className="my-8 p-6" style={{ background: 'rgba(230,183,173,0.04)', border: '1px solid rgba(230,183,173,0.1)', borderRadius: '4px' }}>
                  <p className="font-serif font-bold text-lg" style={{ color: RG }}>
                    The world may have changed dramatically since the first bowls of powdered tea were whisked centuries ago.
                  </p>
                  <p className="font-serif font-bold text-lg mt-2" style={{ color: RG }}>
                    But the ritual remains timeless.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Share */}
          <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
            <ShareButtons title="The History of Matcha: From Ancient China to Modern Wellness Rituals" url="/journal/history-of-matcha" />
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 px-6" style={{ background: 'rgba(108,190,90,0.06)', border: '1px solid rgba(108,190,90,0.15)' }}>
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(108,190,90,0.6)' }}>
              Begin Your Matcha Ritual
            </p>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: '#FFFCF7' }}>
              Explore Torch Republic Ceremonial Matcha
            </h3>
            <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.7 }}>
              Premium ceremonial-grade matcha blends inspired by centuries of tradition and crafted for modern life.
            </p>
            <Link to="/matcha" className="inline-flex items-center justify-center font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8" style={{ background: '#264A35', color: '#080808' }}>
              Shop Matcha →
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