import { useDriftMotion, isMobile } from './useDriftMotion';

/**
 * Shared reveal for the homepage product grids: the product image settles from
 * a slight scale, and on desktop the card's info children stagger in.
 *
 * Commerce content is never gated behind a scroll trigger on mobile — it is
 * always visible there, with the animation as desktop-only enhancement.
 */
export default function useProductCardMotion() {
  return useDriftMotion((gsap, ScrollTrigger) => {
    const mobileLayout = isMobile();

    gsap.utils.toArray('.pd-card').forEach((card) => {
      const img = card.querySelector('.pd-img');
      const info = card.querySelector('.pd-info');

      // fromTo for fail-safety — if ScrollTrigger misses, the image settles at
      // its final (visible) state rather than staying hidden.
      if (img) {
        gsap.fromTo(img,
          { scale: 1.06 },
          { scale: 1, duration: 1.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        );
      }

      if (!mobileLayout && info && info.children.length) {
        gsap.from(info.children, {
          opacity: 0, y: 18, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: info, start: 'top 78%' },
        });
      }
    });
  });
}