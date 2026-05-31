import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MushroomHero from '../components/mushroom/HeroSection';
import MushroomTrustBar from '../components/mushroom/TrustBar';
import FeaturedCollection from '../components/mushroom/FeaturedCollection';
import WhyInstant from '../components/mushroom/WhyInstant';
import BundleSection from '../components/mushroom/BundleSection';
import HowToUse from '../components/mushroom/HowToUse';
import QualityMission from '../components/mushroom/QualityMission';
import EmailCapture from '../components/mushroom/EmailCapture';
import FAQSection from '../components/mushroom/FAQSection';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const RG = '#E6B7AD';

// Sticky mobile CTA — visible only on mobile, hidden after user enters shop section
function StickyMobileCTA() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!pastHero) return null;

  return (
    <div
      className="md:hidden fixed bottom-16 left-0 right-0 z-30 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        to="/shop"
        className="pointer-events-auto font-mono uppercase tracking-[0.28em] text-center transition-all hover:opacity-90"
        style={{
          background: RG,
          color: '#050505',
          fontSize: '0.65rem',
          fontWeight: 700,
          padding: '13px 32px',
          borderRadius: '999px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.7)',
        }}
      >
        Shop Instant Mushroom Coffee
      </Link>
    </div>
  );
}

function FixedMobileHeader() {
  const { totalItems, setDrawerOpen } = useCart();

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{ height: '52px', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(230,183,173,0.1)' }}>
      <Link to="/">
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7acbb9e85_ChatGPTImageMay31202606_49_02AM.png"
          alt="Torch Republic"
          style={{ height: '36px', width: 'auto' }}
        />
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/shop"
          className="font-mono uppercase tracking-[0.22em] text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: '#E6B7AD', color: '#050505' }}>
          Shop
        </Link>
        <button onClick={() => setDrawerOpen(true)}
          style={{ color: 'rgba(255,255,255,0.55)', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <ShoppingBag className="w-[18px] h-[18px]" />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: 6, right: 4, background: '#E6B7AD', color: '#080808', fontSize: '8px', fontWeight: 900, width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080808' }}>
      <FixedMobileHeader />
      <MushroomHero />
      <MushroomTrustBar />
      <FeaturedCollection />
      <WhyInstant />
      <BundleSection />
      <HowToUse />
      <QualityMission />
      <EmailCapture />
      <FAQSection />
      <StickyMobileCTA />
    </div>
  );
}