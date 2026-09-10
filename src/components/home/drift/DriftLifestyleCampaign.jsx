import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS } from './driftTheme';
import { useDriftMotion, isMobile } from './useDriftMotion';

const CAMPAIGN_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bf107e79c_generated_image.png';

export default function DriftLifestyleCampaign() {
  const scope = useDriftMotion((gsap, ScrollTrigger) => {
    // ── Parallax photograph ──
    if (!isMobile()) {
      gsap.fromTo('.parallax-img',
        { yPercent: -8 },
        { yPercent: 8, ease: 'none',
          scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }
    // ── Overlay text reveal ──
    gsap.from('.campaign-text > *', {
      opacity: 0, y: 16, duration: 0.5, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '.parallax-section', start: 'top 60%' },
    });
  });

  return (
    <section ref={scope} className="parallax-section relative w-full overflow-hidden">
      <div className="overflow-hidden" style={{ height: '55vh' }}>
        <img className="parallax-img w-full h-[120%] object-cover" src={CAMPAIGN_IMAGE} alt="Early morning coffee scene with warm sunlight" />
      </div>
      <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(to top, rgba(56,43,36,0.6) 0%, transparent 55%)' }}>
        <div className="campaign-text p-6 md:p-12 lg:p-16 max-w-[560px]">
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', lineHeight: 1.1, color: '#FAF7F1', margin: '0 0 0.75rem', textWrap: 'balance' }}>
            Made for real mornings.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '1rem', lineHeight: 1.6, color: 'rgba(250,247,241,0.85)', margin: '0 0 1.5rem', maxWidth: '38ch' }}>
            From the desk to the trail and everywhere between.
          </p>
          <Link to="/shop" className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: '#FAF7F1', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Shop Coffee <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}