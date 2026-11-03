/**
 * Journal Article: Coffee Pods, Plastic Waste, and Microplastics
 * Route: /journal/coffee-pods-plastic-waste-microplastics
 *
 * A balanced, evidence-based editorial on coffee-pod waste, real-world
 * recyclability, and the current state of microplastics research. Reviews
 * government publications, peer-reviewed research, systematic reviews, and
 * life-cycle assessments. Does NOT make health claims or describe laboratory
 * findings as proof of human health outcomes.
 *
 * Author: Lisa Marie Kocian,  Founder, Torch Republic Coffee Company
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import ArticleShareBar from '@/components/social/ArticleShareBar';

const RG = '#E6AC45';
const GOLD = '#E6AC45';

// Published 2026-06-23 (actual publication date,  not backdated)
const PUB_DATE = '2026-06-23T09:00:00Z';
const MOD_DATE = PUB_DATE;
const AUTHOR_NAME = 'Lisa Marie Kocian';
const AUTHOR_ROLE = 'Founder, Torch Republic Coffee Company';
const SLUG = 'coffee-pods-plastic-waste-microplastics';
const CANONICAL = `/journal/${SLUG}`;
const FEATURED_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/510f7c988_generated_image.png';

const META = {
  seoTitle: 'Coffee Pods, Plastic Waste & Microplastics: The Evidence',
  metaDescription:
    'Are coffee pods bad for the environment, and can hot plastic release microplastics? Explore what recycling, life-cycle, and health research actually shows.',
  excerpt:
    'Coffee pods offer undeniable convenience, but their waste, recyclability, and contact with hot liquids raise reasonable questions. Here is what current research can, and cannot, tell us.',
};

// ── References (official / peer-reviewed sources only) ──────────────────────
const REFERENCES = [
  {
    n: 1,
    label: 'U.S. Securities and Exchange Commission',
    title: 'SEC Charges Keurig with Making Inaccurate Statements Regarding Recyclability of K-Cup Beverage Pod',
    context: 'Government enforcement action (2024)',
    url: 'https://www.sec.gov/news/press-release/2024-186',
  },
  {
    n: 2,
    label: 'Kooduvalli K. et al.',
    title: 'Life Cycle Assessment of Compostable Coffee Pods: A US University Based Case Study',
    context: 'Life-cycle assessment · Scientific Reports (2020)',
    url: 'https://www.nature.com/articles/s41598-020-72688-1',
  },
  {
    n: 3,
    label: 'Humbert S. et al.',
    title: 'Life Cycle Assessment of Spray Dried Soluble Coffee and Comparison with Alternatives',
    context: 'Life-cycle assessment · Journal of Cleaner Production (2009)',
    url: 'https://doi.org/10.1016/j.jclepro.2008.04.005',
  },
  {
    n: 4,
    label: 'Al-Mansoori M., Harrad S., Abdallah M.A.E.',
    title: 'Synthetic Microplastics in Hot and Cold Beverages from the UK Market',
    context: 'Observational research · Science of the Total Environment (2025)',
    url: 'https://doi.org/10.1016/j.scitotenv.2025.179212',
  },
  {
    n: 5,
    label: 'Wang H.P. et al.',
    title: 'Pouring Hot Water Through Drip Bags Releases Thousands of Microplastics into Coffee',
    context: 'Laboratory study · Food Chemistry (2023)',
    url: 'https://doi.org/10.1016/j.foodchem.2023.135728',
  },
  {
    n: 6,
    label: 'Chartres N. et al.',
    title: 'Effects of Microplastic Exposure on Human Digestive, Reproductive, and Respiratory Health',
    context: 'Systematic review · Environmental Science & Technology (2024)',
    url: 'https://doi.org/10.1021/acs.est.4c03028',
  },
  {
    n: 7,
    label: 'U.S. Food and Drug Administration',
    title: 'Microplastics and Nanoplastics in Foods',
    context: 'Government guidance',
    url: 'https://www.fda.gov/food/process-contamination-food-and-animal-feed/microplastics-and-nanoplastics-foods',
  },
];

// ── Inline citation,  clickable, links to #references ──────────────────────
function Cite({ n }) {
  return (
    <a
      href={`#ref-${n}`}
      className="citation"
      style={{
        color: GOLD,
        fontSize: '0.7em',
        verticalAlign: 'super',
        textDecoration: 'none',
        marginLeft: '2px',
        fontWeight: 600,
      }}
      aria-label={`Reference ${n}`}
    >
      [{n}]
    </a>
  );
}

// ── Continue Reading articles ───────────────────────────────────────────────
const CONTINUE_READING = [
  {
    title: 'Coffee Pods vs. Instant Coffee: Which Is Better?',
    slug: 'coffee-pods-vs-instant-coffee',
    category: 'Coffee Comparisons',
    excerpt: 'A practical side-by-side comparison of cost, convenience, waste, and flavor.',
    readTime: '8 min',
    path: '/knowledge/coffee-pods-vs-instant-coffee',
  },
  {
    title: 'Instant Coffee vs. K-Cups: Cost, Waste, and Quality',
    slug: 'instant-coffee-vs-k-cups',
    category: 'Comparison',
    excerpt: 'Direct purchase comparison of premium instant coffee and K-Cup pods.',
    readTime: '6 min',
    path: '/compare/instant-coffee-vs-k-cups',
  },
  {
    title: 'What Makes Premium Instant Coffee Different?',
    slug: 'what-makes-premium-instant-coffee-different',
    category: 'Instant Coffee',
    excerpt: 'Why premium freeze-dried coffee is not the commodity instant you grew up with.',
    readTime: '6 min',
    path: '/journal/what-makes-premium-instant-coffee-different',
  },
  {
    title: 'Coffee Without a Coffee Maker: The Complete Guide',
    slug: 'best-coffee-without-coffee-maker',
    category: 'Brewing Alternatives',
    excerpt: 'Every way to make great coffee without a machine,  including instant, pour-over, and more.',
    readTime: '8 min',
    path: '/knowledge/best-coffee-without-coffee-maker',
  },
];

export default function CoffeePodsPlasticWasteMicroplastics() {
  useSEO({
    title: META.seoTitle,
    description: META.metaDescription,
    image: FEATURED_IMAGE,
    url: CANONICAL,
    type: 'article',
    article: {
      author: AUTHOR_NAME,
      datePublished: PUB_DATE,
      dateModified: MOD_DATE,
      section: 'Sustainability & Coffee Science',
      keywords: [
        'Coffee Pods',
        'Microplastics',
        'Sustainability',
        'Coffee Education',
        'Pod-Free Coffee',
        'Instant Coffee',
      ],
    },
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Journal', url: '/journal' },
      { name: 'Sustainability & Coffee Science', url: '/journal' },
      { name: META.seoTitle, url: CANONICAL },
    ],
  });

  return (
    <article style={{ background: '#080808', color: '#F7F2E9', minHeight: '100vh' }}>
      <div className="max-w-[780px] mx-auto px-6 py-12 md:py-16">
        {/* Back Link */}
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase mb-8 transition-all hover:opacity-80"
          style={{ color: RG }}
        >
          <ArrowLeft size={14} /> Back to Journal
        </Link>

        {/* Category Badge */}
        <div className="mb-6">
          <span
            className="px-4 py-2 rounded-sm font-mono text-[9px] tracking-[0.3em] uppercase font-bold"
            style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, color: GOLD }}
          >
            Sustainability &amp; Coffee Science
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-serif font-bold mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            color: '#F7F2E9',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          Coffee Pods, Plastic Waste, and Microplastics: What the Research Actually Says
        </h1>

        {/* Excerpt */}
        <p
          className="font-heading text-lg mb-8"
          style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.8 }}
        >
          {META.excerpt}
        </p>

        {/* Meta Row */}
        <div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8"
          style={{ borderBottom: '1px solid rgba(230,183,173,0.15)' }}
        >
          <div className="flex items-center gap-2" style={{ color: `${RG}80` }}>
            <User size={14} />
            <Link
              to="/about/torch-republic-team"
              className="font-mono text-[9px] tracking-[0.25em] uppercase hover:opacity-80"
              style={{ color: `${RG}90` }}
            >
              {AUTHOR_NAME}
            </Link>
          </div>
          <div className="flex items-center gap-2" style={{ color: `${RG}80` }}>
            <span className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${RG}50` }}>
              {AUTHOR_ROLE}
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ color: `${RG}80` }}>
            <Calendar size={14} />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase">
              {new Date(PUB_DATE).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2" style={{ color: `${RG}60` }}>
            <Clock size={14} />
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase">14 min read</span>
          </div>
        </div>

        {/* Share Bar,  Top (after meta row) */}
        <div className="mt-8">
          <ArticleShareBar
            title={META.seoTitle}
            url={CANONICAL}
            excerpt={META.excerpt}
            image={FEATURED_IMAGE}
            slug={SLUG}
            location="top"
          />
        </div>

        {/* Featured Image */}
        <figure className="mt-10 mb-12 overflow-hidden rounded-sm">
          <img
            src={FEATURED_IMAGE}
            alt="Used single-use coffee pods beside a reusable mug and instant coffee, illustrating questions about coffee waste and convenience."
            width={1200}
            height={630}
            className="w-full h-auto"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption
            className="font-mono text-[8px] tracking-[0.2em] uppercase mt-3"
            style={{ color: 'rgba(240,235,225,0.35)' }}
          >
            Illustrative editorial photo,  used pods beside a reusable mug and a scoop of instant coffee.
          </figcaption>
        </figure>

        {/* ── Body ── */}
        <div
          className="article-body"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 300,
            lineHeight: 1.85,
            fontSize: '1.05rem',
            color: 'rgba(240,235,225,0.85)',
          }}
        >
          <p style={{ marginBottom: '1.5rem' }}>
            Coffee pods changed the way millions of people make coffee. They are fast, consistent, and convenient.
            Drop in a capsule, press a button, and your coffee is ready within seconds.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            But that convenience comes with questions that are becoming harder to ignore:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>What happens to the pod after one use?</li>
            <li style={{ marginBottom: '0.5rem' }}>Are coffee pods really recycled?</li>
            <li style={{ marginBottom: '0.5rem' }}>Does brewing hot water through plastic release microscopic particles?</li>
            <li style={{ marginBottom: '0.5rem' }}>
              Is there a simpler way to keep the convenience without using one capsule for every cup?
            </li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            The answers are more complicated than the most alarming social-media posts suggest. Coffee pods are not
            single-handedly destroying the planet, and current research has not established that drinking pod coffee
            causes disease. However, the evidence does reveal real concerns about unnecessary packaging, limited
            real-world recyclability, and human exposure to microplastics from food, beverages, packaging, and plastic
            equipment.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>Here is what the research actually says.</p>

          {/* Section 1 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            One Cup Can Mean One More Piece of Waste
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>Most conventional coffee capsules combine several materials:</p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>A plastic or aluminum body</li>
            <li style={{ marginBottom: '0.5rem' }}>A foil or plastic lid</li>
            <li style={{ marginBottom: '0.5rem' }}>A filter</li>
            <li style={{ marginBottom: '0.5rem' }}>Adhesives or sealants</li>
            <li style={{ marginBottom: '0.5rem' }}>Wet coffee grounds</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            That combination helps preserve freshness, but it also makes the used capsule more difficult to process than
            an ordinary plastic container or aluminum can.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            A person drinking one pod-based coffee every morning uses approximately 365 capsules each year. At two cups
            per day, that becomes roughly 730 individual capsules. Each one must be manufactured, filled, packaged,
            transported, collected, sorted, and either recycled, composted, burned, or sent to a landfill.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The coffee grounds themselves are biodegradable. The capsule surrounding them often is not.
          </p>

          {/* Section 2 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            “Recyclable” Does Not Always Mean It Gets Recycled
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            A package can technically be made from recyclable material without being accepted by the recycling program
            where you live. Coffee capsules create several practical problems:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>They are small enough to fall through some sorting equipment.</li>
            <li style={{ marginBottom: '0.5rem' }}>They frequently contain wet coffee grounds.</li>
            <li style={{ marginBottom: '0.5rem' }}>Their lids and bodies may need to be separated.</li>
            <li style={{ marginBottom: '0.5rem' }}>Some combine multiple materials.</li>
            <li style={{ marginBottom: '0.5rem' }}>Local recycling facilities may not accept them at all.</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            In 2024, the U.S. Securities and Exchange Commission charged Keurig Dr Pepper with making inaccurate
            statements concerning the recyclability of K-Cup pods in earlier annual reports. According to the SEC, the
            company had not disclosed that two major U.S. recycling companies had raised significant concerns about the
            commercial feasibility of curbside K-Cup recycling and did not intend to accept the pods at that time.
            <Cite n={1} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            This does not mean every pod is impossible to recycle. Aluminum capsule collection programs, manufacturer
            take-back programs, and certain municipal systems may successfully recover some capsules. It does mean
            consumers should not assume that placing a used pod in a recycling bin guarantees that it becomes a new
            product.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Real recyclability depends on the capsule material, how it is prepared for disposal, the local waste system,
            and whether a specialized collection program is available.
          </p>

          {/* Section 3 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Are Compostable Pods the Answer?
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Compostable capsules may reduce reliance on conventional plastic, but the word “compostable” also requires
            context. Some products are certified for industrial composting rather than backyard composting. Industrial
            composting facilities use controlled temperatures, moisture levels, aeration, and processing times that may
            not exist in a home compost pile.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            A life-cycle assessment conducted at the University of Tennessee found that certified compostable pods could
            fully break down under the conditions of a local industrial composting facility. The authors nevertheless
            emphasized the importance of having an appropriate collection and composting system in place.
            <Cite n={2} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            A compostable pod placed in ordinary trash may still go to a landfill. A biodegradable label does not
            automatically create the infrastructure needed to collect and process it.
          </p>

          {/* Section 4,  first internal educational link in the first third */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            The Environmental Picture Is More Complicated Than Packaging Alone
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            The capsule is the most visible form of pod waste, but it is not the only environmental impact associated with
            coffee. A complete life-cycle assessment may include:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Growing and harvesting the coffee</li>
            <li style={{ marginBottom: '0.5rem' }}>Fertilizer, irrigation, and land use</li>
            <li style={{ marginBottom: '0.5rem' }}>Processing and roasting</li>
            <li style={{ marginBottom: '0.5rem' }}>Drying or concentrating the coffee</li>
            <li style={{ marginBottom: '0.5rem' }}>Packaging</li>
            <li style={{ marginBottom: '0.5rem' }}>International transportation</li>
            <li style={{ marginBottom: '0.5rem' }}>Brewing energy</li>
            <li style={{ marginBottom: '0.5rem' }}>The amount of coffee used per cup</li>
            <li style={{ marginBottom: '0.5rem' }}>Product waste</li>
            <li style={{ marginBottom: '0.5rem' }}>Packaging disposal</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            Research comparing coffee formats has reached different conclusions depending on the assumptions used.
            Capsule machines can sometimes use less coffee and heat only the amount of water needed for one serving.
            That portion control can reduce wasted brewed coffee and, in some scenarios, offset part of the capsule’s
            packaging footprint.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Instant coffee can also perform favorably because it requires a relatively small amount of coffee per serving
            and does not require a brewing machine. However, producing soluble coffee requires industrial extraction
            and drying, which also consumes energy.
            <Cite n={3} /> You can read more about how the format differs in our guide to{' '}
            <Link to="/journal/what-makes-premium-instant-coffee-different" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>premium instant coffee</Link>{' '}
            and our overview of <Link to="/ingredients/freeze-dried-instant-coffee" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>freeze-dried instant coffee</Link>.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The honest conclusion is not that one preparation method is always environmentally perfect. It is that
            individual behavior matters. Making more drip coffee than you drink wastes water, energy, and coffee.
            Leaving a machine powered on increases energy use. Throwing every capsule into the trash increases packaging
            waste. Preparing only the amount you intend to drink can reduce unnecessary impact, regardless of the
            format.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Still, eliminating a single-use capsule from every serving is one direct and measurable way to reduce the
            number of items entering the waste stream.
          </p>

          {/* Section 5 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            What Are Microplastics?
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Microplastics are very small plastic particles, commonly described as particles measuring less than five
            millimeters. Nanoplastics are smaller still, often defined as being below one micrometer. They can originate
            as intentionally manufactured particles or form when larger plastic materials break down through heat,
            friction, sunlight, weathering, and age.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Researchers have detected microplastics in air, water, soil, foods, beverages, human blood, stool, and
            tissues. Exposure does not come from one product alone. Possible sources include:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Drinking water</li>
            <li style={{ marginBottom: '0.5rem' }}>Food packaging</li>
            <li style={{ marginBottom: '0.5rem' }}>Indoor dust</li>
            <li style={{ marginBottom: '0.5rem' }}>Synthetic clothing</li>
            <li style={{ marginBottom: '0.5rem' }}>Tire wear</li>
            <li style={{ marginBottom: '0.5rem' }}>Disposable beverage cups</li>
            <li style={{ marginBottom: '0.5rem' }}>Food-processing equipment</li>
            <li style={{ marginBottom: '0.5rem' }}>Plastic bottles and caps</li>
            <li style={{ marginBottom: '0.5rem' }}>Heating or wearing down plastic materials</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            That makes it difficult to determine precisely how much exposure comes from any single cup of coffee.
          </p>

          {/* Section 6 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Have Microplastics Been Found in Coffee?
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Yes. Recent research has detected synthetic microplastics in hot and cold coffee samples. A 2025
            peer-reviewed study examined 155 beverage samples from the United Kingdom. The samples included coffee from
            disposable cups, coffee sachets prepared in glass, and capsule coffee prepared using three different
            domestic machines.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Researchers detected microplastics in every beverage category studied. Hot coffee averaged 43 microplastic
            particles per liter, although the amount varied substantially among preparation and packaging types. The
            study found higher average concentrations in hot beverages than comparable cold beverages and concluded that
            heat and plastic packaging could contribute to particle release.
            <Cite n={4} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The researchers also observed differences between domestic coffee machines. The oldest machine tested, 
            eight years old and equipped with a plastic water tank,  produced more detected particles per cup than two
            newer machines. This suggests that the potential source is not limited to the capsule. Plastic-lined cups,
            water tanks, tubing, seals, packaging, the water itself, and environmental contamination can all contribute.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Other laboratory research has found that hot water can release particles from disposable plastic cups and
            plastic-containing coffee drip bags.
            <Cite n={5} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            These findings make reducing unnecessary contact between hot liquids and disposable plastic a reasonable
            precaution. They do not prove that every plastic pod releases the same number of particles, that all
            detected particles originated from a capsule, or that an occasional pod-brewed coffee will cause illness.
          </p>

          {/* Section 7 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            What Do We Know About the Health Effects?
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>This is where accuracy matters most.</p>
          <p style={{ marginBottom: '1.5rem' }}>
            Microplastics have been found inside the human body, and laboratory and animal studies have raised concerns
            about inflammation, oxidative stress, digestive effects, respiratory effects, and reproductive health. A
            2024 systematic review concluded that microplastic exposure should be considered “suspected” of harming
            digestive, reproductive, and respiratory health. However, the authors also identified important limitations in
            the available evidence, including inconsistent exposure measurements and a shortage of strong long-term human
            studies.
            <Cite n={6} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The U.S. Food and Drug Administration currently states that scientific evidence does not demonstrate that the
            levels of microplastics and nanoplastics detected in foods pose a confirmed human-health risk. The FDA also
            notes that researchers still lack standardized methods for detecting and measuring these particles. Different
            studies may count different particle sizes or use different laboratory techniques, making direct comparisons
            difficult.
            <Cite n={7} />
          </p>
          <p style={{ marginBottom: '1.5rem' }}>In other words:</p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Microplastic exposure is real.</li>
            <li style={{ marginBottom: '0.5rem' }}>Reducing avoidable plastic exposure is reasonable.</li>
            <li style={{ marginBottom: '0.5rem' }}>Potential health effects deserve continued research.</li>
            <li style={{ marginBottom: '0.5rem' }}>The dose and risk from drinking coffee made with pods have not been conclusively established.</li>
            <li style={{ marginBottom: '0.5rem' }}>Claims that pods are “poisoning” everyone or directly causing specific diseases are not supported by current evidence.</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            Concern is justified. Certainty is not. If you are weighing practical differences between formats, our{' '}
            <Link to="/knowledge/coffee-pods-vs-instant-coffee" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>coffee pods vs. instant coffee comparison</Link>{' '}
            and our{' '}
            <Link to="/compare/instant-coffee-vs-k-cups" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>instant coffee vs. K-Cups comparison</Link>{' '}
            break down cost, convenience, and equipment without the hype.
          </p>

          {/* Section 8 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Not Every Coffee Capsule Is the Same
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Coffee capsules may be made from polypropylene, aluminum, compostable polymers, paper-based materials, or
            combinations of these. An aluminum capsule is not itself a source of plastic particles in the same way that a
            polypropylene capsule may be. However, aluminum capsules can still contain coatings, seals, lids, filters,
            or other components, and they still require raw materials, manufacturing, and an effective recovery system.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Likewise, a capsule labeled plant-based or compostable is not automatically plastic-free or suitable for home
            composting. The most responsible approach is to look beyond the front label:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>What is the capsule made from?</li>
            <li style={{ marginBottom: '0.5rem' }}>Is it accepted locally?</li>
            <li style={{ marginBottom: '0.5rem' }}>Must it be emptied and separated?</li>
            <li style={{ marginBottom: '0.5rem' }}>Does it require a mail-back program?</li>
            <li style={{ marginBottom: '0.5rem' }}>Is it certified for home or industrial composting?</li>
            <li style={{ marginBottom: '0.5rem' }}>Will the consumer realistically follow those steps every day?</li>
          </ul>

          {/* Section 9,  gentle product CTA around the middle/end */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            A Simpler Way to Keep the Convenience
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            The appeal of pods has never been difficult to understand. People want coffee that is fast, consistent, and
            easy to prepare. But a pod is not the only way to achieve that.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Premium instant coffee dissolves directly in hot water. It requires no capsule, no pod machine, and no
            collection program for each individual serving. If you have ever wondered whether you even{' '}
            <Link to="/knowledge/best-coffee-without-coffee-maker" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>need a coffee maker at all</Link>, instant coffee is
            the most direct answer.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>The preparation is simple:</p>
          <ol style={{ marginBottom: '1.5rem', listStyle: 'decimal', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Scoop the recommended serving into a mug.</li>
            <li style={{ marginBottom: '0.5rem' }}>Add hot water.</li>
            <li style={{ marginBottom: '0.5rem' }}>Stir until dissolved.</li>
            <li style={{ marginBottom: '0.5rem' }}>Adjust the strength, milk, or sweetness to your preference.</li>
          </ol>
          <p style={{ marginBottom: '1.5rem' }}>
            Preparing instant coffee in a reusable ceramic, glass, or stainless-steel cup does not eliminate every
            environmental impact associated with coffee. The coffee still has to be grown, processed, packaged, and
            transported. It does eliminate the need to manufacture and discard one separate pod for every cup.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            That is not zero waste. It is less single-use waste. And meaningful changes are often built from simple
            choices repeated every day. If that quieter-morning approach appeals to you, our{' '}
            <Link to="/shop/instant-coffee" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>classic instant coffee collection</Link>{' '}
            and our <Link to="/shop/instant-mushroom-coffee" style={{ color: RG, textDecoration: 'underline', textDecorationColor: `${RG}50` }}>mushroom coffee collection</Link>{' '}
            keep the speed of a pod routine without a single capsule per cup.
          </p>

          {/* Section 10 */}
          <h2 style={{ fontSize: '1.55rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            The Bottom Line
          </h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Coffee pods provide genuine convenience, but the waste does not disappear when the coffee is finished.
            Real-world recycling can be difficult. Compostable alternatives depend on access to suitable facilities.
            Emerging research shows that hot beverages can contain microplastics and that plastic packaging and aging
            equipment may contribute to exposure.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            At the same time, scientists have not established that the levels currently detected in coffee cause specific
            diseases. Responsible education means acknowledging the concern without presenting uncertainty as proof.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            The goal does not have to be fear. It can simply be a better ritual:
          </p>
          <ul style={{ marginBottom: '1.5rem', listStyle: 'disc', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Use only the water you need.</li>
            <li style={{ marginBottom: '0.5rem' }}>Prepare only the coffee you will drink.</li>
            <li style={{ marginBottom: '0.5rem' }}>Choose reusable cups.</li>
            <li style={{ marginBottom: '0.5rem' }}>Reduce unnecessary hot-liquid contact with disposable plastic.</li>
            <li style={{ marginBottom: '0.5rem' }}>Avoid one single-use capsule per cup when a simpler option works for you.</li>
          </ul>
          <p style={{ marginBottom: '1.5rem' }}>
            Convenience should make life easier. It does not have to create another piece of waste every morning.
          </p>

          {/* Science Note */}
          <div
            style={{
              marginTop: '2.5rem',
              marginBottom: '1.5rem',
              padding: '1.5rem',
              background: `${GOLD}08`,
              border: `1px solid ${GOLD}25`,
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <p
              className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2"
              style={{ color: GOLD }}
            >
              Science Note
            </p>
            <p style={{ color: 'rgba(240,235,225,0.75)', fontWeight: 300, lineHeight: 1.75, fontSize: '0.95rem' }}>
              This article is intended for general education and does not provide medical advice. Microplastic research
              is developing rapidly, and conclusions may change as researchers improve testing methods and gather
              stronger long-term human evidence.
            </p>
          </div>

          {/* Educational disclaimer */}
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(230,183,173,0.12)',
            }}
          >
            <p
              className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1"
              style={{ color: 'rgba(230,183,173,0.5)' }}
            >
              Educational Content Disclaimer
            </p>
            <p style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.85rem' }}>
              This article is editorial coffee and sustainability education. Torch Republic does not provide medical
              advice, and none of the statements here are intended to diagnose, treat, cure, or prevent any disease.
              References are provided so you can read the primary sources yourself.
            </p>
          </div>

          {/* Sources and methodology note */}
          <p
            className="font-mono text-[7px] tracking-[0.2em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.4)' }}
          >
            Sources and methodology
          </p>
          <p style={{ marginBottom: '2rem', fontSize: '0.9rem', color: 'rgba(240,235,225,0.6)', lineHeight: 1.75 }}>
            This article prioritizes government publications, peer-reviewed research, systematic reviews, and life-cycle
            assessments. Laboratory studies are labeled as such and are not described as proof of human health
            outcomes. Each numbered reference links to the official source, journal page, DOI, or peer-reviewed
            publication.
          </p>

          {/* References */}
          <h2
            id="references"
            style={{ fontSize: '1.4rem', color: '#F7F2E9', marginTop: '2.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, scrollMarginTop: '2rem' }}
          >
            References
          </h2>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, counterReset: 'ref' }}>
            {REFERENCES.map((ref) => (
              <li
                key={ref.n}
                id={`ref-${ref.n}`}
                style={{
                  marginBottom: '1.25rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid rgba(230,183,173,0.08)',
                  scrollMarginTop: '2rem',
                }}
              >
                <p
                  className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1"
                  style={{ color: GOLD }}
                >
                  [{ref.n}] {ref.context}
                </p>
                <p style={{ color: 'rgba(240,235,225,0.85)', fontWeight: 500, marginBottom: '0.25rem' }}>
                  {ref.label}. <span style={{ fontWeight: 400, color: 'rgba(240,235,225,0.75)', fontStyle: 'italic' }}>{ref.title}</span>
                </p>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.15em] uppercase hover:opacity-80"
                  style={{ color: RG }}
                >
                  <ExternalLink size={11} /> Open source
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Share Bar,  Bottom (after references) */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(230,183,173,0.1)' }}>
          <ArticleShareBar
            title={META.seoTitle}
            url={CANONICAL}
            excerpt={META.excerpt}
            image={FEATURED_IMAGE}
            slug={SLUG}
            location="bottom"
          />
        </div>
      </div>

      {/* Conversion Section,  after conclusion and references */}
      <section
        className="px-6 py-16 text-center"
        style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.1)' }}
      >
        <div className="max-w-2xl mx-auto">
          <p
            className="font-mono text-[10px] tracking-[0.5em] uppercase mb-4"
            style={{ color: 'rgba(230,183,173,0.5)' }}
          >
            A Simpler Daily Ritual
          </p>
          <h2
            className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', color: '#F7F2E9', letterSpacing: '-0.02em' }}
          >
            Ready to Leave the Pods Behind?
          </h2>
          <p
            className="font-heading mb-8"
            style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.85, fontSize: '1rem' }}
          >
            Premium instant coffee and mushroom coffee give you the speed and convenience of a pod-based routine, without
            requiring one single-use capsule for every cup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/switch-from-pods"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold py-4 px-10 transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808' }}
            >
              Explore Pod-Free Coffee
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold py-4 px-10 transition-all hover:opacity-80"
              style={{ border: `1px solid ${RG}40`, color: RG }}
            >
              Find Your Ritual
            </Link>
          </div>
        </div>
      </section>

      {/* Continue Reading */}
      <section className="px-6 py-14" style={{ background: '#080808', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={16} style={{ color: RG }} />
            <p
              className="font-mono text-[10px] tracking-[0.4em] uppercase"
              style={{ color: RG }}
            >
              Continue Reading
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTINUE_READING.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={article.path}
                  className="block h-full p-5 transition-all group"
                  style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${RG}40`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(230,183,173,0.1)')}
                >
                  <p
                    className="font-mono text-[7px] tracking-[0.25em] uppercase mb-1"
                    style={{ color: `${RG}80` }}
                  >
                    {article.category}
                  </p>
                  <h3
                    className="font-serif font-bold mb-2"
                    style={{ fontSize: '0.95rem', color: '#F7F2E9', lineHeight: 1.3 }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="font-heading mb-3"
                    style={{ fontSize: '0.8rem', color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.55 }}
                  >
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[7px] tracking-[0.15em] uppercase"
                      style={{ color: 'rgba(240,235,225,0.35)' }}
                    >
                      {article.readTime}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-mono text-[7px] tracking-[0.2em] uppercase"
                        style={{ color: `${RG}70` }}
                      >
                        Read
                      </span>
                      <ArrowRight
                        size={10}
                        style={{ color: `${RG}70` }}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}