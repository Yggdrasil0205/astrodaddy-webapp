import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useParams, Link, useNavigate } from 'react-router';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, CheckCircle, ArrowLeft, ShoppingCart, Clock, ChevronRight } from 'lucide-react';

export default function AngebotDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === Number(id));

  if (!product) return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center pt-24">
      <GlassCard className="rounded-xl p-12 text-center">
        <p className="text-[#F0E6C8] mb-4">Angebot nicht gefunden</p>
        <Link to="/angebote"><Button variant="gold">Zurück</Button></Link>
      </GlassCard>
    </div>
  );

  const bookNow = () => { addToCart(product); navigate('/checkout'); };

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        <Link to="/angebote">
          <Button variant="ghost" className="mb-8 text-[#F0E6C8]/50 hover:text-[#F0E6C8]">
            <ArrowLeft className="w-4 h-4" /> Zurück zum Shop
          </Button>
        </Link>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl object-cover aspect-square opacity-90"
            />
            {product.previewImages && product.previewImages.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {product.previewImages.map((src, i) => (
                  <img key={i} src={src} alt={`${product.name} Vorschau ${i + 1}`}
                    className="w-full rounded-xl object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                ))}
              </div>
            )}
          </motion.div>

          {/* Info card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard className="rounded-2xl p-7 h-full border-white/8 flex flex-col">

              {/* Badges */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {product.badge && (
                  <span className="px-2 py-0.5 rounded text-xs border border-[#C9A84C]/40 text-[#C9A84C]">{product.badge}</span>
                )}
                <span className="px-2 py-0.5 rounded text-xs border border-[#7B5FD4]/30 text-[#7B5FD4]/80">{product.category}</span>
                {product.bestseller && (
                  <span className="px-2 py-0.5 rounded text-xs border border-[#C9A84C]/30 text-[#C9A84C]/80">Bestseller</span>
                )}
              </div>

              <h1 className="text-2xl text-[#F0E6C8] mb-3" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>{product.name}</h1>
              <p className="text-[#F0E6C8]/60 text-sm mb-5 leading-relaxed flex-1">{product.description}</p>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-[#C9A84C]">{product.priceFormatted}</span>
                {product.originalPriceFormatted && (
                  <span className="text-lg text-[#F0E6C8]/30 line-through mb-1">{product.originalPriceFormatted}</span>
                )}
              </div>

              {/* Delivery time */}
              {product.deliveryTime && (
                <div className="flex items-center gap-2 text-xs text-[#F0E6C8]/40 mb-5">
                  <Clock className="w-3.5 h-3.5 text-[#7B5FD4]/60" />
                  Lieferung: {product.deliveryTime}
                </div>
              )}

              <Button variant="gold" size="lg" className="w-full mb-4" onClick={bookNow}>
                <ShoppingCart className="w-4 h-4" /> Jetzt buchen
              </Button>

              <div className="flex items-center gap-2 text-xs text-[#F0E6C8]/30">
                <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                5/5 Sterne · 100% Zufriedenheitsrate
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Details + benefits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          <GlassCard className="rounded-2xl p-7 border-white/8">
            <h2 className="text-lg text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Details</h2>
            <p className="text-[#F0E6C8]/60 text-sm leading-relaxed">{product.details}</p>
          </GlassCard>

          {product.benefits && (
            <GlassCard className="rounded-2xl p-7 border-white/8">
              <h2 className="text-lg text-[#F0E6C8] mb-4" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>Was dich erwartet</h2>
              <ul className="space-y-2.5">
                {product.benefits.map(b => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#7B5FD4] mt-0.5 shrink-0" />
                    <span className="text-[#F0E6C8]/70">{b}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}
        </motion.div>

        {/* Process steps */}
        {product.process && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <GlassCard className="rounded-2xl p-7 border-white/8 mb-6">
              <h2 className="text-lg text-[#F0E6C8] mb-5" style={{ fontFamily: '"rl-limo-1", "rl-limo-2", sans-serif', fontWeight: 400 }}>So funktioniert es</h2>
              <ol className="flex flex-col sm:flex-row gap-4">
                {product.process.map((step, i) => (
                  <li key={i} className="flex-1 flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#7B5FD4]/20 border border-[#7B5FD4]/30 flex items-center justify-center text-xs font-bold text-[#7B5FD4] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[#F0E6C8]/65 text-sm leading-relaxed">{step}</span>
                    {i < product.process!.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-[#F0E6C8]/20 shrink-0 mt-1 hidden sm:block" />
                    )}
                  </li>
                ))}
              </ol>
            </GlassCard>
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-[#F0E6C8]/25 text-xs">
          Die Analyse ersetzt keine medizinische, psychologische oder psychotherapeutische Behandlung und dient ausschließlich der persönlichen und spirituellen Entwicklung.
        </p>

      </div>
    </div>
  );
}
