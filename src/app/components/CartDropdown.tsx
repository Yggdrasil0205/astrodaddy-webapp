import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { GlassCard } from './GlassCard';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
      >
        <ShoppingCart className="w-5 h-5 text-foreground" />
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#1b2a23] flex items-center justify-center text-xs font-bold text-white border-2 border-white"
          >
            {totalItems}
          </motion.div>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 z-50"
          >
            <GlassCard className="rounded-2xl p-4 shadow-2xl max-h-[80vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
                <h3 className="text-lg font-bold">Warenkorb</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground">Dein Warenkorb ist leer</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 p-3 rounded-xl bg-white/30 backdrop-blur-sm"
                      >
                        {/* Product Image */}
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-left"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
                          <p className="text-sm font-bold text-[#1b2a23] mb-2">
                            {item.priceFormatted}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-white/40 hover:bg-white/60 flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white/40 hover:bg-white/60 flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-white/20 rounded-lg transition-colors self-start"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Total & Checkout */}
                  <div className="pt-4 border-t border-white/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Gesamt:</span>
                      <span className="text-xl font-bold text-[#1b2a23]">
                        {totalPrice.toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                    <Link to="/checkout" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white">
                        Zur Kasse
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}