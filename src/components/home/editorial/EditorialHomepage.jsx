import React, { useEffect, useState } from 'react';
import { ALL_PRODUCTS, mergeWithShopifyData } from '@/lib/mushroomProducts';
import { requestedProducts, colors } from './theme';
import EditorialHero from './EditorialHero';
import ShopByRitual from '@/components/home/botanical/ShopByRitual';
import BotanicalFavorites from '@/components/home/botanical/BotanicalFavorites';
import MushroomCoffeeFeature from '@/components/home/botanical/MushroomCoffeeFeature';
import ClassicCoffeeFeature from '@/components/home/botanical/ClassicCoffeeFeature';
import MatchaFeature from '@/components/home/botanical/MatchaFeature';
import NatureMeetsFunction from '@/components/home/botanical/NatureMeetsFunction';
import DailyRitualStory from '@/components/home/botanical/DailyRitualStory';
import CraftStandards from '@/components/home/botanical/CraftStandards';
import CreateRitualSection from '@/components/home/botanical/CreateRitualSection';
import SocialProofSection from '@/components/home/botanical/SocialProofSection';
import RitualsWorthSharing from '@/components/home/botanical/RitualsWorthSharing';
import JournalEducationSection from '@/components/home/botanical/JournalEducationSection';
import EditorialSignup from './EditorialSignup';

function hydrateProduct(source, req) { return { ...source, ...req, sourceName: source.name, displayTitle: req.title, slug: source.slug || source.shopifyHandle || req.id }; }
export default function EditorialHomepage() {
  const [products, setProducts] = useState(() => requestedProducts.map(req => hydrateProduct(ALL_PRODUCTS.find(p => p.id === req.id) || {}, req)));
  useEffect(() => { let active = true; mergeWithShopifyData(ALL_PRODUCTS).then(({ products: live }) => { if (!active) return; setProducts(requestedProducts.map(req => hydrateProduct(live.find(p => p.id === req.id || p.name === req.title) || ALL_PRODUCTS.find(p => p.id === req.id) || {}, req))); }); return () => { active = false; }; }, []);
  return <main id="main-content" style={{ background: colors.page }}><EditorialHero /><ShopByRitual /><MushroomCoffeeFeature /><ClassicCoffeeFeature /><MatchaFeature /><BotanicalFavorites products={products} /><NatureMeetsFunction /><DailyRitualStory /><CraftStandards /><CreateRitualSection /><SocialProofSection /><RitualsWorthSharing /><JournalEducationSection /><EditorialSignup /></main>;
}