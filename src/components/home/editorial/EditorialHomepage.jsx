import React, { useEffect, useState } from 'react';
import { ALL_PRODUCTS, mergeWithShopifyData } from '@/lib/mushroomProducts';
import { requestedProducts, colors } from './theme';
import HeroSection from './HeroSection';
import TrustStrip from './TrustStrip';
import RitualCategories from './RitualCategories';
import WhyTorchRepublic from './WhyTorchRepublic';
import FeaturedProducts from './FeaturedProducts';
import EducationSection from './EducationSection';
import SubscriptionSection from './SubscriptionSection';
import FounderMission from './FounderMission';
import HomeFooter from './HomeFooter';

function hydrateProduct(source, req) {
  return { ...source, ...req, sourceName: source.name, displayTitle: req.title, slug: source.slug || source.shopifyHandle || req.id };
}

export default function EditorialHomepage() {
  const [products, setProducts] = useState(() =>
    requestedProducts.map((req) => hydrateProduct(ALL_PRODUCTS.find((p) => p.id === req.id) || {}, req))
  );

  useEffect(() => {
    let active = true;
    mergeWithShopifyData(ALL_PRODUCTS)
      .then(({ products: live }) => {
        if (!active) return;
        setProducts(
          requestedProducts.map((req) =>
            hydrateProduct(live.find((p) => p.id === req.id || p.name === req.title) || ALL_PRODUCTS.find((p) => p.id === req.id) || {}, req)
          )
        );
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  return (
    <main id="main-content" style={{ background: colors.page }}>
      <HeroSection />
      <TrustStrip />
      <RitualCategories />
      <WhyTorchRepublic />
      <FeaturedProducts products={products} />
      <EducationSection />
      <SubscriptionSection />
      <FounderMission />
      <HomeFooter />
    </main>
  );
}