import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { X } from 'lucide-react';

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
  'hoodies': 'Hoodies',
  'hats': 'Hats & Caps',
  'candles': 'Candles',
  'magnets': 'Car Magnets',
  'stickers': 'Stickers',
  'jewelry': 'Jewelry',
  'mugs-tumblers': 'Mugs & Tumblers',
  'flags': 'Flags',
  'accessories': 'Accessories',
  'home-decor': 'Home Decor',
  'bobbleheads': 'Bobbleheads',
  'limited-edition': 'Limited Edition',
  'coffee': 'Coffee',
  'tea': 'Tea',
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function FilterBottomSheet({ open, onOpenChange, collection, category, sortBy, onCollectionChange, onCategoryChange, onSortChange }) {
  const handleClose = () => onOpenChange(false);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-background border-border">
        <DrawerHeader className="border-b border-border flex items-center justify-between px-4 py-3">
          <DrawerTitle className="font-heading font-black uppercase text-sm">Filter & Sort</DrawerTitle>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors select-none"
          >
            <X className="w-5 h-5" />
          </button>
        </DrawerHeader>

        <div className="px-4 py-6 space-y-6">
          {/* Collections */}
          <div>
            <p className="text-foreground font-mono text-xs tracking-wider uppercase mb-3">Collection</p>
            <div className="space-y-2">
              {Object.entries(COLLECTIONS_MAP).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    onCollectionChange(key);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors font-mono text-sm ${
                    collection === key
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-foreground font-mono text-xs tracking-wider uppercase mb-3">Category</p>
            <div className="space-y-2">
              {Object.entries(CATEGORIES_MAP).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    onCategoryChange(key);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors font-mono text-sm ${
                    category === key
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-foreground font-mono text-xs tracking-wider uppercase mb-3">Sort By</p>
            <div className="space-y-2">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    handleClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors font-mono text-sm ${
                    sortBy === option.value
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}