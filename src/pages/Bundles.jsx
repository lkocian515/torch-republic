import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, GripVertical, Plus, Zap, Package, Tag } from 'lucide-react';

const DISCOUNT_TIERS = [
  { count: 2, label: 'Duo Bundle', discount: 0.10, badge: '10% OFF' },
  { count: 3, label: 'Trio Bundle', discount: 0.15, badge: '15% OFF' },
  { count: 4, label: 'Quad Bundle', discount: 0.20, badge: '20% OFF' },
  { count: 5, label: 'Founders Pack', discount: 0.25, badge: '25% OFF' },
];

const PRESET_BUNDLES = [
  {
    id: 'morning-ritual',
    name: 'Morning Ritual',
    description: 'Start the day like a Founder',
    handles: ['washington-blend', 'jefferson-blend', 'founders-ceramic-mug'],
    badge: '🔥 Most Popular',
  },
  {
    id: 'patriot-kit',
    name: 'Patriot Kit',
    description: 'Gear up for freedom',
    handles: ['faith-over-fear-tee', 'liberty-flame-hat', 'roosevelt-blend'],
    badge: '🦅 Staff Pick',
  },
  {
    id: 'founders-5pack',
    name: "Founder's 5-Pack",
    description: 'All five signature blends — 25% off',
    handles: ['washington-blend', 'jefferson-blend', 'franklin-blend', 'lincoln-blend', 'roosevelt-blend'],
    badge: '✦ Best Value',
  },
];

function DiscountBadge({ count }) {
  const tier = [...DISCOUNT_TIERS].reverse().find(t => count >= t.count);
  const next = DISCOUNT_TIERS.find(t => count < t.count);
  if (!tier && !next) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {tier && (
        <span className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 font-bold"
          style={{ background: 'linear-gradient(90deg,#b38b4d,#e8d08a)', color: '#000' }}>
          {tier.badge} — {tier.label}
        </span>
      )}
      {next && (
        <span className="font-mono text-xs tracking-wider" style={{ color: 'rgba(196,163,90,0.5)' }}>
          Add {next.count - count} more → unlock {Math.round(next.discount * 100)}% off
        </span>
      )}
    </div>
  );
}

function ProductPill({ product, index, onRemove }) {
  return (
    <Draggable draggableId={`bundle-${product.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex items-center gap-3 p-3 mb-2 group transition-all"
          style={{
            background: snapshot.isDragging ? 'rgba(179,139,77,0.15)' : 'rgba(255,255,255,0.04)',
            border: snapshot.isDragging ? '1px solid rgba(179,139,77,0.5)' : '1px solid rgba(255,255,255,0.07)',
            borderRadius: 2,
            ...provided.draggableProps.style,
          }}
        >
          <div {...provided.dragHandleProps} className="flex-shrink-0 cursor-grab active:cursor-grabbing"
            style={{ color: 'rgba(179,139,77,0.4)' }}>
            <GripVertical className="w-4 h-4" />
          </div>
          <img src={product.image_url} alt={product.title}
            className="w-10 h-10 object-cover flex-shrink-0" style={{ borderRadius: 2 }} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-heading text-sm font-bold truncate">{product.title}</p>
            <p className="font-mono text-xs" style={{ color: 'rgba(179,139,77,0.7)' }}>${product.price.toFixed(2)}</p>
          </div>
          <button onClick={() => onRemove(product.id)}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: 'rgba(255,80,80,0.6)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </Draggable>
  );
}

function ProductCard({ product, onAdd, inBundle }) {
  return (
    <Draggable draggableId={`shelf-${product.id}`} index={0} isDragDisabled={inBundle}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative group cursor-grab active:cursor-grabbing"
          style={{
            opacity: inBundle ? 0.4 : 1,
            transform: snapshot.isDragging ? 'rotate(2deg) scale(1.04)' : 'none',
            transition: 'opacity 0.2s',
          }}
        >
          <div className="relative overflow-hidden aspect-square"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={product.image_url} alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
              {!inBundle && (
                <button onClick={() => onAdd(product)}
                  className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold transition-all"
                  style={{ background: '#b38b4d', color: '#000' }}>
                  <Plus className="w-3 h-3" /> Add
                </button>
              )}
            </div>
            {inBundle && (
              <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center"
                style={{ background: '#b38b4d', borderRadius: '50%' }}>
                <span className="text-black text-xs font-black">✓</span>
              </div>
            )}
          </div>
          <div className="pt-2 pb-1 px-1">
            <p className="text-white font-heading text-xs font-bold truncate">{product.title}</p>
            <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(179,139,77,0.7)' }}>${product.price.toFixed(2)}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default function Bundles() {
  const [bundleItems, setBundleItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: products = [] } = useQuery({
    queryKey: ['bundle-products'],
    queryFn: () => base44.entities.Product.filter({ in_stock: true }, '-best_seller_rank', 50),
    initialData: [],
  });

  const currentCollections = ['founders-series', 'liberty-icons', 'commanders-series', 'women-of-the-republic'];
  const validCategories = ['coffee', 't-shirts', 'hoodies-sweatshirts', 'tanks', 'hats'];

  const categories = [
    { key: 'all', label: 'All' },
    { key: 'coffee', label: '☕ Coffee' },
    { key: 'apparel', label: '👕 Apparel' },
  ];

  const shelfProducts = products.filter(p => {
    const isValidCollection = currentCollections.includes(p.collection) || p.category === 'coffee';
    const isValidCategory = validCategories.includes(p.category);
    if (!isValidCollection || !isValidCategory || !p.image_url) return false;
    
    if (activeCategory === 'all') return true;
    if (activeCategory === 'coffee') return p.category === 'coffee';
    if (activeCategory === 'apparel') return ['t-shirts', 'hoodies-sweatshirts', 'tanks', 'hats'].includes(p.category);
    return false;
  });

  const bundleIds = new Set(bundleItems.map(p => p.id));

  const addToBundle = (product) => {
    if (bundleIds.has(product.id) || bundleItems.length >= 6) return;
    setBundleItems(prev => [...prev, product]);
  };

  const removeFromBundle = (id) => {
    setBundleItems(prev => prev.filter(p => p.id !== id));
  };

  const loadPreset = (preset) => {
    const items = preset.handles
      .map(h => products.find(p => p.shopify_handle === h))
      .filter(Boolean)
      .slice(0, 6);
    setBundleItems(items);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Drag from shelf to bundle zone
    if (source.droppableId === 'shelf' && destination.droppableId === 'bundle') {
      const productId = draggableId.replace('shelf-', '');
      const product = products.find(p => p.id === productId);
      if (product && !bundleIds.has(product.id) && bundleItems.length < 6) {
        const newItems = [...bundleItems];
        newItems.splice(destination.index, 0, product);
        setBundleItems(newItems);
      }
      return;
    }

    // Reorder within bundle
    if (source.droppableId === 'bundle' && destination.droppableId === 'bundle') {
      const newItems = Array.from(bundleItems);
      const [moved] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, moved);
      setBundleItems(newItems);
      return;
    }

    // Drag from bundle back to shelf (remove)
    if (source.droppableId === 'bundle' && destination.droppableId === 'shelf') {
      const productId = draggableId.replace('bundle-', '');
      setBundleItems(prev => prev.filter(p => p.id !== productId));
    }
  };

  const subtotal = bundleItems.reduce((sum, p) => sum + p.price, 0);
  const tier = [...DISCOUNT_TIERS].reverse().find(t => bundleItems.length >= t.count);
  const discount = tier ? subtotal * tier.discount : 0;
  const total = subtotal - discount;

  const handleCheckout = async () => {
    if (bundleItems.length === 0) return;
    // Use first item's handle for now, or navigate to Shopify cart
    window.open(`https://libertees-for-all.myshopify.com/cart`, '_blank');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen" style={{ backgroundColor: '#000' }}>
        {/* Header */}
        <div className="pt-12 pb-6 px-6 text-center">
          <p className="font-mono text-xs tracking-[0.5em] uppercase mb-2" style={{ color: 'rgba(179,139,77,0.6)' }}>
            Build Your Bundle
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight text-white">
            Bundle Builder
          </h1>
          <p className="font-mono text-sm mt-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Drag products into your bundle — mix coffee, apparel & accessories. Save up to 25%.
          </p>
        </div>

        {/* Preset bundles */}
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(179,139,77,0.45)' }}>
              ✦ Quick-start with a preset
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_BUNDLES.map(preset => (
                <button key={preset.id} onClick={() => loadPreset(preset)}
                  className="text-left p-4 transition-all group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(179,139,77,0.15)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(179,139,77,0.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(179,139,77,0.15)'}>
                  <span className="font-mono text-xs" style={{ color: 'rgba(179,139,77,0.6)' }}>{preset.badge}</span>
                  <h3 className="text-white font-heading font-bold text-sm uppercase mt-1">{preset.name}</h3>
                  <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{preset.description}</p>
                  <span className="font-mono text-xs mt-2 inline-block group-hover:text-yellow-400 transition-colors"
                    style={{ color: 'rgba(179,139,77,0.5)' }}>Load preset →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="px-6 pb-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

            {/* Product Shelf */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-heading font-black uppercase text-lg tracking-tight">Product Shelf</h2>
                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Drag → bundle zone</span>
              </div>

              {/* Category tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {categories.map(cat => (
                  <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                    className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 transition-all"
                    style={{
                      background: activeCategory === cat.key ? '#b38b4d' : 'rgba(255,255,255,0.05)',
                      color: activeCategory === cat.key ? '#000' : 'rgba(255,255,255,0.5)',
                      border: '1px solid',
                      borderColor: activeCategory === cat.key ? '#b38b4d' : 'rgba(255,255,255,0.08)',
                    }}>
                    {cat.label}
                  </button>
                ))}
              </div>

              <Droppable droppableId="shelf" isDropDisabled={false} direction="horizontal"
                renderClone={(provided, snapshot, rubric) => {
                  const p = shelfProducts[rubric.source.index];
                  return (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                      style={{ width: 100, opacity: 0.95, ...provided.draggableProps.style }}>
                      {p && <img src={p.image_url} className="w-24 h-24 object-cover" style={{ borderRadius: 2 }} />}
                    </div>
                  );
                }}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {shelfProducts.map((product, index) => (
                      <Draggable key={product.id} draggableId={`shelf-${product.id}`} index={index}>
                        {(draggableProvided, snapshot) => (
                          <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            className="relative group cursor-grab active:cursor-grabbing"
                            style={{
                              opacity: bundleIds.has(product.id) ? 0.35 : 1,
                              transform: snapshot.isDragging ? 'rotate(2deg) scale(1.05)' : 'none',
                              ...draggableProvided.draggableProps.style,
                            }}>
                            <div className="relative overflow-hidden aspect-square"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                              <img src={product.image_url} alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                                {!bundleIds.has(product.id) && (
                                  <button onClick={() => addToBundle(product)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-widest font-bold"
                                    style={{ background: '#b38b4d', color: '#000' }}>
                                    <Plus className="w-3 h-3" /> Add
                                  </button>
                                )}
                              </div>
                              {bundleIds.has(product.id) && (
                                <div className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center"
                                  style={{ background: '#b38b4d', borderRadius: '50%' }}>
                                  <span className="text-black text-[10px] font-black">✓</span>
                                </div>
                              )}
                            </div>
                            <div className="pt-2 pb-1 px-0.5">
                              <p className="text-white font-heading text-xs font-bold truncate">{product.title}</p>
                              <p className="font-mono text-xs mt-0.5" style={{ color: 'rgba(179,139,77,0.7)' }}>${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* Bundle Zone */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-heading font-black uppercase text-lg tracking-tight flex items-center gap-2">
                    <Package className="w-4 h-4" style={{ color: '#b38b4d' }} />
                    Your Bundle
                    {bundleItems.length > 0 && (
                      <span className="font-mono text-xs px-2 py-0.5 font-bold"
                        style={{ background: '#b38b4d', color: '#000' }}>
                        {bundleItems.length}
                      </span>
                    )}
                  </h2>
                  {bundleItems.length > 0 && (
                    <button onClick={() => setBundleItems([])}
                      className="font-mono text-xs uppercase tracking-wider transition-colors"
                      style={{ color: 'rgba(255,100,100,0.5)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,100,100,0.9)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,100,100,0.5)'}>
                      Clear all
                    </button>
                  )}
                </div>

                {bundleItems.length > 0 && (
                  <div className="mb-4">
                    <DiscountBadge count={bundleItems.length} />
                  </div>
                )}

                <Droppable droppableId="bundle">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                      className="min-h-48 p-3 transition-all"
                      style={{
                        background: snapshot.isDraggingOver
                          ? 'rgba(179,139,77,0.08)'
                          : bundleItems.length === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.02)',
                        border: snapshot.isDraggingOver
                          ? '1px dashed rgba(179,139,77,0.5)'
                          : '1px dashed rgba(255,255,255,0.1)',
                        borderRadius: 2,
                      }}>
                      {bundleItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 gap-3">
                          <div className="w-12 h-12 flex items-center justify-center"
                            style={{ border: '1px dashed rgba(179,139,77,0.25)', borderRadius: '50%' }}>
                            <ShoppingBag className="w-5 h-5" style={{ color: 'rgba(179,139,77,0.3)' }} />
                          </div>
                          <p className="font-mono text-xs text-center" style={{ color: 'rgba(255,255,255,0.22)' }}>
                            Drag products here<br />or click "Add" to build your bundle
                          </p>
                        </div>
                      ) : (
                        bundleItems.map((product, index) => (
                          <ProductPill key={product.id} product={product} index={index} onRemove={removeFromBundle} />
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>

                {/* Pricing summary */}
                <AnimatePresence>
                  {bundleItems.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-4 p-4"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>Subtotal</span>
                        <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-mono" style={{ color: 'rgba(179,139,77,0.7)' }}>
                            Bundle Discount ({Math.round((discount / subtotal) * 100)}%)
                          </span>
                          <span className="font-mono" style={{ color: '#b38b4d' }}>−${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t mt-3 pt-3 flex justify-between" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                        <span className="font-heading font-black text-white uppercase text-sm">Total</span>
                        <div className="text-right">
                          {discount > 0 && (
                            <span className="font-mono text-xs line-through mr-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                              ${subtotal.toFixed(2)}
                            </span>
                          )}
                          <span className="font-heading font-black text-xl" style={{ color: discount > 0 ? '#b38b4d' : '#fff' }}>
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <button onClick={handleCheckout}
                        className="w-full mt-4 py-3.5 font-mono text-xs uppercase tracking-[0.3em] font-black flex items-center justify-center gap-2 transition-all btn-glow"
                        style={{ background: 'linear-gradient(90deg,#b38b4d,#e8d08a)', color: '#000' }}>
                        <Zap className="w-3.5 h-3.5" />
                        Checkout Bundle
                      </button>
                      <p className="font-mono text-xs text-center mt-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        🔒 Secure checkout · 30-day guarantee
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Add more nudge */}
                {bundleItems.length > 0 && bundleItems.length < 5 && (
                  <div className="mt-3 p-3" style={{ background: 'rgba(179,139,77,0.05)', border: '1px solid rgba(179,139,77,0.1)' }}>
                    {(() => {
                      const next = DISCOUNT_TIERS.find(t => bundleItems.length < t.count);
                      return next ? (
                        <p className="font-mono text-xs" style={{ color: 'rgba(179,139,77,0.6)' }}>
                          <Tag className="w-3 h-3 inline mr-1" />
                          Add {next.count - bundleItems.length} more item{next.count - bundleItems.length > 1 ? 's' : ''} to unlock {Math.round(next.discount * 100)}% off
                        </p>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}