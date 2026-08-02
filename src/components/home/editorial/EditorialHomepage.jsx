import React, { useEffect, useState } from 'react';
import { ALL_PRODUCTS, mergeWithShopifyData } from '@/lib/mushroomProducts';
import { requestedProducts, colors } from './theme';
import EditorialHero from './EditorialHero';
import CategoryPathways from './CategoryPathways';
import ProductStorySections from './ProductStorySections';
import ComparisonSection from './ComparisonSection';
import BrandStorySection from './BrandStorySection';
import HowItWorksSection from './HowItWorksSection';
import FinalCTASection from './FinalCTASection';
import EditorialSignup from './EditorialSignup';

function hydrateProduct(source, req) { return { ...source, ...req, sourceName: source.name, displayTitle: req.title, slug: source.slug || source.shopifyHandle || req.id }; }
export default function EditorialHomepage() {
  const [products, setProducts] = useState(() => requestedProducts.map(req => hydrateProduct(ALL_PRODUCTS.find(p => p.id === req.id) || {}, req)));
  useEffect(() => { let active = true; mergeWithShopifyData(ALL_PRODUCTS).then(({ products: live }) => { if (!active) return; setProducts(requestedProducts.map(req => hydrateProduct(live.find(p => p.id === req.id || p.name === req.title) || ALL_PRODUCTS.find(p => p.id === req.id) || {}, req))); }); return () => { active = false; }; }, []);
  return <main id="main-content" style={{ background: colors.page }}><EditorialHero products={products} /><CategoryPathways products={products} /><ProductStorySections products={products} /><ComparisonSection /><BrandStorySection /><HowItWorksSection /><FinalCTASection /><EditorialSignup /></main>;
}