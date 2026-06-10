# Shopify Image Integration - Quick Reference

## 🎯 Golden Rule
**Shopify is the CANONICAL source for ALL product imagery.**
- Never upload product images to Base44
- Never hardcode image URLs in components
- All images auto-update when changed in Shopify

---

## 📦 Fetching Product Images

### Method 1: Fetch All Products with Images
```javascript
import { base44 } from '@/api/base44Client';

const response = await base44.functions.invoke('fetchShopifyProductMedia', {});
const products = response.data.products;

// Each product has:
{
  handle: 'torchbearer',
  featuredImage: {
    url: 'https://cdn.shopify.com/...',
    alt: 'Product alt text'
  },
  images: [
    { url: 'https://cdn.shopify.com/...', alt: '...' },
    // ... more gallery images
  ]
}
```

### Method 2: Use Helper Function
```javascript
import { getProductWithMedia } from '@/lib/mushroomProducts';

const product = await getProductWithMedia('torchbearer');
// Returns product with image and galleryImages from Shopify
```

### Method 3: Use ProductCard (Automatic)
```jsx
import MushroomProductCard from '@/components/mushroom/ProductCard';

// Component automatically fetches Shopify images
<MushroomProductCard product={product} />
```

---

## 🖼️ Image URL Structure

### Featured Image (Primary)
```javascript
product.featuredImage?.url || product.images?.[0]
```

### Gallery Images
```javascript
product.images?.map(img => img.url)
```

### With Cache-Busting (for galleries)
```javascript
const cacheBusted = `${imageUrl}?v=${Date.now()}`;
```

---

## ✅ Best Practices

### DO:
- ✅ Always use `fetchShopifyProductMedia` for product data
- ✅ Use `getProductImage()` helper in components
- ✅ Add cache-busting to gallery images
- ✅ Provide fallback placeholder
- ✅ Use `loading="eager"` for above-fold images
- ✅ Use `loading="lazy"` for below-fold images

### DON'T:
- ❌ Hardcode image URLs in components
- ❌ Store images in Base44 entities
- ❌ Use `media.base44.com` for product images
- ❌ Manually manage image versions
- ❌ Upload images via Base44 dashboard

---

## 🔧 Component Examples

### Product Card (Auto-fetches Shopify images)
```jsx
import MushroomProductCard from '@/components/mushroom/ProductCard';

<MushroomProductCard product={product} index={0} />
```

### Custom Image Display
```jsx
import { getProductImage } from '@/lib/homepageFeaturedProducts';

<img 
  src={getProductImage(product)} 
  alt={product.alt}
  loading="lazy"
  onError={(e) => {
    e.target.src = FALLBACK_PRODUCT_IMAGE;
  }}
/>
```

### Gallery with Cache-Busting
```jsx
{product.galleryImages?.map((img, i) => (
  <img
    key={i}
    src={`${img}?v=${Date.now()}`}
    alt={`${product.name} view ${i + 1}`}
  />
))}
```

---

## 🚀 Updating Product Images

### In Shopify Admin:
1. Go to Products → Select Product
2. Click on Images section
3. Upload/reorder/remove images
4. Click Save

### Result:
- ✅ Website updates automatically (seconds)
- ✅ No Base44 deployment needed
- ✅ All pages reflect changes immediately
- ✅ Gallery, product cards, cart all update

---

## 📁 File Locations

### Backend Functions:
- `functions/fetchShopifyProductMedia.js` - Main image fetch
- `functions/fetchShopifyProducts.js` - Products + images

### Libraries:
- `lib/mushroomProducts.js` - Product catalog + image helpers
- `lib/homepageFeaturedProducts.js` - Featured products helper

### Components:
- `components/mushroom/ProductCard.jsx` - Auto-fetches images
- `pages/BlendDetail.jsx` - Product detail page
- `components/home/StartHereSection.jsx` - Homepage featured

---

## 🐛 Troubleshooting

### Images Not Updating?
1. Clear browser cache (hard refresh: Ctrl+Shift+R)
2. Check Shopify Admin - are images published?
3. Verify product handle matches in `lib/mushroomProducts.js`
4. Check console for API errors

### Missing Images?
```javascript
// Check if Shopify data is fetched
console.log('Product data:', product);
console.log('Shopify images:', product.shopifyData?.images);

// Fallback to placeholder
const image = product.image || FALLBACK_PRODUCT_IMAGE;
```

### Wrong Product Matched?
- Verify `shopifyHandle` in product catalog matches Shopify handle exactly
- Check for hyphens/underscores differences
- Example: `'glowmind-clarity-blend'` not `'glowmind_clarity'`

---

## 📊 API Response Format

```json
{
  "products": [
    {
      "id": "gid://shopify/Product/...",
      "handle": "torchbearer",
      "title": "Torchbearer",
      "featuredImage": {
        "url": "https://cdn.shopify.com/...",
        "alt": "Torchbearer instant coffee",
        "width": 1200,
        "height": 1200
      },
      "images": [
        {
          "url": "https://cdn.shopify.com/...",
          "alt": "Lifestyle image",
          "width": 1200,
          "height": 1200
        }
      ],
      "price": 24.99,
      "availableForSale": true
    }
  ]
}
```

---

## 🎨 Fallback Image

Always provide fallback for error handling:
```javascript
const FALLBACK = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333';
```

---

## 📞 Need Help?

See full documentation: `docs/SHOPIFY_IMAGE_AUDIT_COMPLETE.md