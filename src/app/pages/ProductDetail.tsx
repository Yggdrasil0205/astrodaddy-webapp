import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useParams, Link } from 'react-router';
import { products } from '../data/products';
import { Star, CheckCircle, ArrowLeft, ExternalLink } from 'lucide-react';

export default function AngebotDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return (
    <div className="min-h-screen bg-[#1B1040] flex items-center justify-center pt-24">
      <GlassCard className="rounded-xl p-12 text-center">
        <p className="text-[#F0E6C8] mb-4">Angebot nicht gefunden</p>
        <Link to="/angebote"><Button variant="gold">Zurück</Button></Link>
      </GlassCard>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/angebote">
          <Button variant="ghost" className="mb-8 text-[#F0E6C8]/50 hover:text-[#F0E6C8]">
            <ArrowLeft className="w-4 h-4" /> Zurück
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src={product.image} alt={product.name} className="w-full rounded-xl object-cover h-72 opacity-85" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard className="rounded-xl p-7 h-full border-white/8">
              <div className="flex gap-2 mb-4">
                {product.badge && <span className="px-2 py-0.5 rounded text-xs border border-[#C9A84C]/40 text-[#C9A84C]">{product.badge}</span>}
                <span className="px-2 py-0.5 rounded text-xs border border-[#7B5FD4]/30 text-[#7B5FD4]/80">{product.category}</span>
              </div>
              <h1 className="text-2xl text-[#F0E6C8] mb-3">{product.name}</h1>
              <p className="text-[#F0E6C8]/60 text-sm mb-5 leading-relaxed">{product.description}</p>
              <div className="text-4xl font-bold text-[#C9A84C] mb-6">{product.priceFormatted}</div>

              <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="w-full mb-4">
                  Jetzt buchen <ExternalLink className="w-4 h-4" />
                </Button>
              </a>

              <div className="flex items-center gap-2 text-xs text-[#F0E6C8]/30">
                <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                5/5 Sterne · 100% Zufriedenheitsrate
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <GlassCard className="rounded-xl p-7 border-white/8">
            <h2 className="text-xl text-[#F0E6C8] mb-4">Details</h2>
            <p className="text-[#F0E6C8]/60 text-sm leading-relaxed mb-6">{product.details}</p>
            {product.benefits && (
              <>
                <h3 className="text-base text-[#F0E6C8] mb-4">Was dich erwartet</h3>
                <ul className="space-y-2.5">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#7B5FD4] mt-0.5 shrink-0" />
                      <span className="text-[#F0E6C8]/70">{b}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
