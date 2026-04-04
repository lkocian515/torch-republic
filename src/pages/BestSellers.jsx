import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import FilterBottomSheet from '../components/filters/FilterBottomSheet';
import PullToRefresh from '../components/mobile/PullToRefresh';
import { Sliders } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const COLLECTIONS_MAP = {
  'all': 'All',
  'best-sellers': 'Best Sellers',
  'founders': 'Founders Series',
  'american-heroes': 'American Heroes',
  'we-the-people': 'We The People',
  'god-family-country': 'God · Family · Country',
};

const HIDDEN_CATEGORIES = new Set(['jewelry','tea','candles','home-decor','bobbleheads','accessories']);

const CATEGORY_TABS = [
  { key: 't-shirts', label: 'T-Shirts' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'hats', label: 'Hats' },
];

export default function BestSellers() {

  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCollection = urlParams.get('collection') || 'all';
  const initialCategory = urlParams.get('category') || 'all';

  const [collection, setCollection] = useState(initialCollection);
  const [category, setCategory] = useState(initialCategory || 't-shirts');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products'] });
  }, [queryClient]);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list('', 250),
    initialData: [],
  });

  const filteredProducts = products.filter(p => {
    if (HIDDEN_CATEGORIES.has(p.category)) return false;
    if (!p.image_url) return false;
    const colMatch = collection === 'all' || p.collection === collection;
    const catMatch = p.category === category;
    return colMatch && catMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // featured/default: best-seller rank first, then featured, then rest
    const aRank = a.best_seller_rank || 9999;
    const bRank = b.best_seller_rank || 9999;
    if (aRank !== bRank) return aRank - bRank;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  const title = collection !== 'all' 
    ? COLLECTIONS_MAP[collection] || 'Products'
    : 'All Products';

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="min-h-screen">
        {/* Header */}
        <div className="pt-12 pb-4 px-6 md:pt-12 md:pb-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
              Torch Republic
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
              {title}
            </h1>
            <p className="text-muted-foreground font-mono text-sm mt-2">
              {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Apparel Tabs */}
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 flex-wrap">
              {CATEGORY_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setCategory(tab.key)}
                  className="px-5 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-all"
                  style={category === tab.key
                    ? { background: 'linear-gradient(135deg, #070F1E, #0B3D35, #0D5244)', color: '#fff', border: '1px solid rgba(212,175,90,0.4)' }
                    : { background: 'transparent', color: 'rgba(212,175,90,0.6)', border: '1px solid rgba(212,175,90,0.2)' }}
                >
                  {tab.label}
                </button>
              ))}
              <div className="flex items-center gap-2 ml-auto">
                <Select value={collection} onValueChange={setCollection}>
                  <SelectTrigger className="w-44 bg-card border-border text-foreground font-mono text-xs">
                    <SelectValue placeholder="Collection" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {Object.entries(COLLECTIONS_MAP).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="font-mono text-xs">{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 bg-card border-border text-foreground font-mono text-xs">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="featured" className="font-mono text-xs">Featured</SelectItem>
                    <SelectItem value="price-low" className="font-mono text-xs">Price ↑</SelectItem>
                    <SelectItem value="price-high" className="font-mono text-xs">Price ↓</SelectItem>
                    <SelectItem value="rating" className="font-mono text-xs">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden px-6 pb-4">
          <button
            onClick={() => setFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded hover:bg-card transition-colors font-mono text-xs tracking-widest uppercase select-none"
          >
            <Sliders className="w-4 h-4" />
            Sort & Filter
          </button>
        </div>

        {/* Product Grid */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto">
            <ProductGrid products={sortedProducts} isLoading={isLoading} />
          </div>
        </div>

        {/* Filter Bottom Sheet */}
        <FilterBottomSheet
          open={filterOpen}
          onOpenChange={setFilterOpen}
          collection={collection}
          category={category}
          sortBy={sortBy}
          onCollectionChange={setCollection}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
        />
      </div>
    </PullToRefresh>
  );
}