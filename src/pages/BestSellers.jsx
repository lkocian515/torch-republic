import React, { useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import ProductGrid from '../components/products/ProductGrid';
import FilterBottomSheet from '../components/filters/FilterBottomSheet';
import PullToRefresh from '../components/mobile/PullToRefresh';


const COLLECTIONS_MAP = {
  'all': 'All Products',
  'best-sellers': 'Best Sellers',
  'liberty-flame': 'Liberty Flame',
  'patriotic-pride': 'Patriotic Pride',
  'freedom-isnt-free': "Freedom Isn't Free",
  'we-the-people': 'We The People',
  'faith-over-fear': 'Faith Over Fear',
  'christ-is-king': 'Christ Is King',
  'god-family-country': 'God · Family · Country',
  'american-heroes': 'American Heroes',
  'founders': 'Founders',
};

const CATEGORIES_MAP = {
  'all': 'All Categories',
  't-shirts': 'T-Shirts',
  'hats': 'Hats & Caps',
  'candles': 'Candles',
  'magnets': 'Car Magnets',
  'jewelry': 'Jewelry',
  'mugs-tumblers': 'Mugs & Tumblers',
  'flags': 'Flags',
  'accessories': 'Accessories',
  'home-decor': 'Home Decor',
};

export default function BestSellers() {
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCollection = urlParams.get('collection') || 'all';
  const initialCategory = urlParams.get('category') || 'all';

  const [collection, setCollection] = useState(initialCollection);
  const [category, setCategory] = useState(initialCategory);
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
    const colMatch = collection === 'all' || p.collection === collection;
    const catMatch = category === 'all' || p.category === category;
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

        {/* Filters - Desktop */}
        <div className="hidden md:block px-6 pb-8">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
            <Select value={collection} onValueChange={setCollection}>
              <SelectTrigger className="w-48 bg-card border-border text-foreground font-mono text-xs">
                <SelectValue placeholder="Collection" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {Object.entries(COLLECTIONS_MAP).map(([key, label]) => (
                  <SelectItem key={key} value={key} className="font-mono text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44 bg-card border-border text-foreground font-mono text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {Object.entries(CATEGORIES_MAP).map(([key, label]) => (
                  <SelectItem key={key} value={key} className="font-mono text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-card border-border text-foreground font-mono text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="featured" className="font-mono text-xs">Featured</SelectItem>
                <SelectItem value="price-low" className="font-mono text-xs">Price: Low → High</SelectItem>
                <SelectItem value="price-high" className="font-mono text-xs">Price: High → Low</SelectItem>
                <SelectItem value="rating" className="font-mono text-xs">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden px-6 pb-4">
          <button
            onClick={() => setFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-border rounded hover:bg-card transition-colors font-mono text-xs tracking-widest uppercase select-none"
          >
            <Sliders className="w-4 h-4" />
            Filter & Sort
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