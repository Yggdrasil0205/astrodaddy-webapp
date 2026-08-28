import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { GlassCard } from './GlassCard';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { products } from '../data/products';
import { CosmicWheel } from './CosmicWheel';

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, addToCart, spinReward, applySpin } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Contextual cross-sell — a complementary product not already in the cart.
  const recommended = useMemo(() => {
    const inCart = new Set(items.map(i => i.id));
    const pool = products.filter(p => !inCart.has(p.id) && !p.skoolMembership && !p.hidden);
    const hasBeratung = items.some(i => products.find(p => p.id === i.id)?.category === 'Beratung');
    return pool.find(p => (hasBeratung ? p.category === 'Analyse' : p.category === 'Beratung')) ?? pool[0] ?? null;
  }, [items]);

  const cartLines = items.map(i => ({ id: i.id, quantity: i.quantity }));
  const bonusPct = spinReward?.type === 'pct' && totalItems >= 2 ? (spinReward.value ?? 0) : 0;
  const finalTotal = bonusPct ? totalPrice * (1 - bonusPct / 100) : totalPrice;

  // Pulse the cart icon while a cosmic bonus is still up for grabs.
  const reduceMotion = useReducedMotion();
  const bonusPending = totalItems >= 1 && !spinReward;

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
      <div className="relative">
        {bonusPending && !reduceMotion && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute -inset-1.5 rounded-xl bg-[#C9A84C] blur-md"
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.85, 1.12, 0.85] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-1.5 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-foreground" />
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold border border-white ${bonusPending ? 'bg-[#C9A84C] text-[#1B1040]' : 'bg-[#1b2a23] text-white'}`}
            >
              {totalItems}
            </motion.div>
          )}
        </button>
      </div>

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
            <div className="rounded-2xl p-4 shadow-2xl max-h-[80vh] flex flex-col bg-[#120d2e] border border-white/10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h3 className="text-lg font-bold text-[#F0E6C8]">Warenkorb</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-[#F0E6C8]/60 hover:text-[#F0E6C8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-8">
                  <ShoppingCart className="w-16 h-16 text-[#F0E6C8]/20 mb-4" />
                  <p className="text-[#F0E6C8]/50">Dein Warenkorb ist leer</p>
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
                        className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/8"
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
                          <h4 className="font-medium text-sm mb-1 truncate text-[#F0E6C8]">{item.name}</h4>
                          <p className="text-sm font-bold text-[#C9A84C] mb-2">
                            {item.priceFormatted}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-[#F0E6C8]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-8 text-center text-[#F0E6C8]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-[#F0E6C8]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors self-start"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Kosmisches Rad — reward strip */}
                  {totalItems >= 2 ? (
                    spinReward ? (
                      <div className="mb-3 rounded-xl px-3.5 py-3 border border-[#7B5FD4]/40 bg-[#7B5FD4]/12 text-sm text-[#F0E6C8] flex items-center gap-2">
                        <span className="text-[#C9A84C]">✦</span>
                        {spinReward.type === 'call'
                          ? <span><b className="text-[#C9A84C]">20-Min-Call mit Robert</b> gewonnen — Terminlink kommt per Mail.</span>
                          : <span><b className="text-[#C9A84C]">{spinReward.value}% Bonus</b> gesichert — wird an der Kasse angewendet.</span>}
                      </div>
                    ) : (
                      <button
                        onClick={() => setWheelOpen(true)}
                        className="w-full mb-3 rounded-xl px-3.5 py-3 border border-[#C9A84C]/45 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/16 transition-colors text-left flex items-center gap-3"
                      >
                        <span className="text-lg">✦</span>
                        <span className="flex-1 text-sm text-[#F0E6C8]"><b className="text-[#C9A84C]">Bonus freigeschaltet!</b> Dreh am kosmischen Rad.</span>
                        <span className="text-xs font-bold text-[#1B1040] rounded-lg px-3 py-1.5" style={{ background: 'linear-gradient(180deg,#E7CE86,#C9A84C)' }}>Drehen</span>
                      </button>
                    )
                  ) : (
                    recommended && (
                      <div className="mb-3 rounded-xl p-3 border border-dashed border-[#C9A84C]/35 bg-[#C9A84C]/[0.06]">
                        <div className="flex items-center gap-2 text-xs text-[#F0E6C8]/80 mb-2">
                          <span className="text-[#C9A84C]">✦</span> Noch <b className="text-[#C9A84C]">1 Angebot</b> bis zu deinem kosmischen Bonus.
                        </div>
                        <button
                          onClick={() => addToCart(recommended)}
                          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 bg-white/[0.04] border border-white/10 hover:border-[#C9A84C]/45 hover:bg-[#C9A84C]/[0.08] transition-colors text-left"
                        >
                          <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-[#0a0812]">
                            <ImageWithFallback src={recommended.image} alt={recommended.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#F0E6C8] truncate">{recommended.name}</div>
                            <div className="text-[11px] text-[#F0E6C8]/45">Dazu passend</div>
                          </div>
                          <span className="text-xs font-bold text-[#C9A84C] whitespace-nowrap">+ {recommended.priceFormatted}</span>
                        </button>
                      </div>
                    )
                  )}

                  {/* Total & Checkout */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    {bonusPct > 0 && (
                      <div className="flex items-center justify-between text-sm text-[#C9A84C]">
                        <span>Kosmischer Bonus −{bonusPct} %</span>
                        <span>−{(totalPrice * bonusPct / 100).toFixed(2).replace('.', ',')}€</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#F0E6C8]/70">Gesamt:</span>
                      <span className="text-xl font-bold text-[#C9A84C]">
                        {bonusPct > 0 && <span className="text-[#F0E6C8]/40 line-through text-sm font-normal mr-2">{totalPrice.toFixed(2).replace('.', ',')}€</span>}
                        {finalTotal.toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                    <Link to="/checkout" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-[#C9A84C] hover:bg-[#C9A84C]/90 text-[#1B1040] font-semibold">
                        Zur Kasse
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kosmisches Rad overlay */}
      {wheelOpen && (
        <CosmicWheel
          items={cartLines}
          onWin={applySpin}
          onClose={() => setWheelOpen(false)}
        />
      )}
    </div>
  );
}