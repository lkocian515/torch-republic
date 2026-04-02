import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShieldCheck, Truck, RotateCcw, Flame } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

const ADDONS = [
  { name: 'Sticker Pack', price: 4.99, id: 'addon-sticker', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/products/sticker_pack.jpg?v=1' },
  { name: 'Car Magnet', price: 6.99, id: 'addon-magnet', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/products/car_magnet.jpg?v=1' },
  { name: 'Freedom Decal', price: 5.99, id: 'addon-decal', image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/products/decal.jpg?v=1' }
];

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer({ isOpen, setIsOpen }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Fetch cart from Shopify when drawer opens
  useEffect(() => {
    if (isOpen) {
      fetch('https://torchrepublic.com/cart.js')
        .then(res => res.json())
        .then(data => {
          setCart(data);
        })
        .catch(err => console.error('Cart fetch error:', err));
    }
  }, [isOpen]);

  const subtotal = (cart?.total || 0) / 100; // Shopify returns in cents
  const addonsTotal = selectedAddons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0);
  const total = subtotal + addonsTotal;
  const shippingThreshold = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      alert('Unable to load checkout. Please try again.');
    }
  };

  const toggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:max-w-md bg-background border-l border-border z-50 flex flex-col"
            style={{ backgroundColor: '#0B0B0B' }}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-black uppercase tracking-widest text-lg">
                    Your Torch
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                You're one step from carrying the flame.
              </p>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {!cart || !cart.lines || cart.lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <Flame className="w-12 h-12 text-muted-foreground/30" />
                  <p className="font-mono text-sm text-muted-foreground">Your cart is empty</p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-xs text-primary tracking-widest uppercase hover:underline"
                  >
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                <>
                  {/* Products */}
                  {cart.lines.map((line) => (
                    <div key={line.id} className="flex gap-4 py-4 border-b border-border/50">
                      {/* Image */}
                      {line.imageUrl && (
                        <div className="w-20 h-20 bg-card flex-shrink-0 overflow-hidden">
                          <img src={line.imageUrl} alt={line.productTitle} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-heading font-bold text-sm leading-tight truncate">
                          {line.productTitle}
                        </p>
                        <p className="font-mono text-[10px] text-primary mt-1 tracking-widest">🔥 TORCHBEARER FAVORITE</p>
                        {line.selectedOptions?.filter(o => o.value !== 'Default Title').map(opt => (
                          <p key={opt.name} className="font-mono text-xs text-muted-foreground mt-0.5">
                            {opt.name}: {opt.value}
                          </p>
                        ))}
                        <p className="font-mono text-xs text-primary mt-1">
                          ${line.price.toFixed(2)}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border">
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity - 1)}
                              disabled={isLoading}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 font-mono text-xs">{line.quantity}</span>
                            <button
                              onClick={() => updateQuantity(line.id, line.quantity + 1)}
                              disabled={isLoading}
                              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(line.id)}
                            disabled={isLoading}
                            className="font-mono text-xs text-muted-foreground hover:text-destructive transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <div className="text-right flex-shrink-0">
                        <p className="font-mono text-sm font-bold">
                          ${line.lineTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Free Shipping Bar */}
                  {shippingThreshold > 0 && (
                    <div className="py-4 border-y border-border/50 space-y-2">
                      <p className="font-mono text-xs text-muted-foreground">
                        You're ${shippingThreshold.toFixed(2)} away from FREE shipping
                      </p>
                      <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingPercent}%` }}
                          className="h-full bg-gradient-to-r from-primary to-primary/60"
                        />
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  <div className="py-4 border-b border-border/50 space-y-3">
                    <p className="font-heading font-bold text-sm uppercase tracking-tight">
                      Complete Your Order
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {ADDONS.map(addon => (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`flex flex-col items-center gap-2 p-3 border rounded transition-all ${
                            selectedAddons.includes(addon.id)
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="w-16 h-16 bg-card rounded overflow-hidden">
                            <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                          </div>
                          <p className="font-mono text-[10px] text-foreground text-center leading-tight line-clamp-2">
                            {addon.name}
                          </p>
                          <p className="font-mono text-xs font-bold text-primary">
                            ${addon.price.toFixed(2)}
                          </p>
                          <p className="font-mono text-[9px] text-muted-foreground">
                            {selectedAddons.includes(addon.id) ? 'Added ✓' : 'Add'}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            {cart && cart.lines.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                {/* Trust signals */}
                <div className="grid grid-cols-2 gap-2 py-3 border-b border-border/40">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-mono text-[9px] tracking-wider text-primary">✔ American Made</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-mono text-[9px] tracking-wider text-primary">✔ Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-mono text-[9px] tracking-wider text-primary">✔ 30-Day Guarantee</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="font-mono text-[9px] tracking-wider text-primary">✔ Fast U.S. Shipping</span>
                  </div>
                </div>

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Subtotal</span>
                    <span className="font-mono text-sm font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Add-ons</span>
                      <span className="font-mono text-sm font-bold">${addonsTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-t border-border/50">
                    <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">Total</span>
                    <span className="font-mono text-lg font-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="flex items-center justify-center gap-2 w-full py-4 font-mono text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #C8A44D 0%, #F0D080 50%, #C8A44D 100%)',
                    color: '#000',
                    fontWeight: 900,
                    boxShadow: '0 4px 30px rgba(200,164,77,0.4)',
                  }}
                >
                  Secure Checkout →
                </button>

                {/* Trust message */}
                <p className="text-center font-mono text-[10px] text-muted-foreground">
                  Trusted by Torchbearers nationwide 🇺🇸
                </p>

                {/* Emotional Close */}
                <div className="text-center space-y-2 py-3 border-t border-border/50">
                  <p className="font-heading text-xs font-black uppercase tracking-tight text-foreground">
                    You're not just buying apparel.
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                    You're representing Faith. Freedom. Truth.
                  </p>
                  <p className="font-heading text-sm font-black uppercase tracking-widest text-primary">
                    Carry the Flame. 🔥
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}