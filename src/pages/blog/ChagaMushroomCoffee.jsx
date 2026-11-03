import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import ShareButtons from '../../components/social/ShareButtons';

const RG = '#E6AC45';

const SOURCES = [
  {
    label: 'Memorial Sloan Kettering Cancer Center: Chaga Mushroom',
    url: 'https://www.mskcc.org/cancer-care/integrative-medicine/herbs/chaga-mushroom',
  },
  {
    label: 'Cell study: Chaga extract and oxidative DNA damage in isolated lymphocytes (2004)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/15630179/',
  },
  {
    label: 'Case report: Chaga-associated oxalate nephropathy (2012)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23149251/',
  },
  {
    label: 'Case report: Chaga-associated oxalate nephropathy after high intake (2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35451393/',
  },
];

export default function ChagaMushroomCoffee() {
  useSEO({
    title: 'Chaga Mushroom: What Research Actually Shows | Torch Republic',
    description: 'A clear guide to what is known about Chaga, what laboratory studies can and cannot tell us, and the safety considerations reported in the research.',
    url: '/journal/chaga-mushroom-coffee',
    type: 'article',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F7F2E9', minHeight: '100vh' }}>
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            A research-informed overview
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            Chaga Mushroom: What Research Actually Shows
          </h1>
          <p className="font-heading max-w-3xl mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.65)', lineHeight: 1.85, fontWeight: 300 }}>
            Chaga has a long history of traditional use and is the subject of laboratory research. Here is what those sources establish—and where evidence in people is still missing.
          </p>
        </motion.div>
      </section>

      <article className="max-w-[900px] mx-auto px-6 md:px-10 py-16">
        <section className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6" style={{ color: '#FFFCF7' }}>
            What is Chaga?
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.68)', lineHeight: 1.85 }}>
            <p>
              Chaga (<em>Inonotus obliquus</em>) is a fungus that commonly grows on birch trees in cold regions. It has been used traditionally as a brewed tea. Products sold as Chaga can differ in source and preparation, so research on one extract should not be assumed to describe every tea, powder, or supplement.
            </p>
            <p>
              You may see strong claims about antioxidants, immunity, inflammation, energy, or disease prevention. Laboratory findings do not show that drinking Chaga produces those effects in people.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6" style={{ color: '#FFFCF7' }}>
            What the evidence can tell us
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.68)', lineHeight: 1.85 }}>
            <p>
              Some Chaga research is preclinical: it studies cells or animals under controlled conditions. For example, a 2004 experiment exposed isolated human lymphocytes to Chaga extract in a laboratory and then to an oxidant. It was not a trial in people drinking Chaga, and it cannot establish a health benefit from consuming it.
            </p>
            <p>
              Memorial Sloan Kettering Cancer Center notes that Chaga’s safety and effectiveness have not been evaluated in clinical studies. At present, the cited laboratory findings are not proof that Chaga prevents or treats disease, improves immunity, or changes how someone feels.
            </p>
            <p>
              ORAC scores and other test-tube antioxidant measurements also do not establish what happens after a person consumes a food or supplement. They should not be presented as a ranking of real-world health benefits.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6" style={{ color: '#FFFCF7' }}>
            Safety and practical considerations
          </motion.h2>
          <div className="font-heading space-y-4" style={{ color: 'rgba(240,235,225,0.68)', lineHeight: 1.85 }}>
            <p>
              Published case reports describe oxalate-related kidney injury after Chaga use, including reports involving substantial or prolonged intake. Case reports cannot tell us how often this happens or quantify risk from a particular product or serving, but they are a reason to avoid assuming that concentrated or long-term use is harmless.
            </p>
            <p>
              If you have kidney disease, take medication, or are considering a concentrated supplement, ask a qualified healthcare professional whether it is appropriate for you. Do not use Chaga in place of medical care.
            </p>
            <div className="p-5 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
              <p style={{ color: 'rgba(240,235,225,0.78)', lineHeight: 1.85 }}>
                This article is general information, not medical advice. Supplement contents and serving sizes vary; consult the current product label for product-specific information.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-serif font-bold text-2xl md:text-3xl mb-6" style={{ color: '#FFFCF7' }}>
            Sources
          </motion.h2>
          <ul className="space-y-3 font-heading" style={{ color: 'rgba(240,235,225,0.68)', lineHeight: 1.75 }}>
            {SOURCES.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer"
                  className="underline underline-offset-4 hover:opacity-80" style={{ color: RG }}>
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="my-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <ShareButtons title="Chaga Mushroom: What Research Actually Shows" url="/journal/chaga-mushroom-coffee" />
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center py-12 px-6 rounded-lg" style={{ background: 'rgba(230,183,173,0.06)', border: `1px solid ${RG}30` }}>
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Explore the Collection
          </p>
          <h3 className="font-serif font-bold text-2xl mb-6" style={{ color: '#FFFCF7' }}>
            Torch Republic Mushroom Coffee
          </h3>
          <p className="font-heading max-w-xl mx-auto mb-8" style={{ color: 'rgba(240,235,225,0.62)', lineHeight: 1.7 }}>
            See the current product page for its ingredient list and product details.
          </p>
          <Link to="/products/instant-mushroom-coffee"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
            style={{ background: RG, color: '#080808' }}>
            View Product Details →
          </Link>
        </motion.div>
      </article>

      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>
          This article is for informational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}
