import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Star, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { products } from '../data/products';

export default function Angebote() {
  const [cat, setCat] = useState('all');
  const categories = [
    { id: 'all', name: 'Alle' },
    { id: 'Beratung', name: 'Beratungen' },
    { id: 'Ausbildung', name: 'Ausbildung' },
    { id: 'Tarot', name: 'Tarot' },
  ];
  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 text-[#C9A84C] text-xs tracking-widest uppercase mb-6"
            style={{ fontFamily: 'Cinzel, serif' }}>
            <Star className="w-3 h-3 fill-current" /> Angebote
          </div>
          <h1 className="text-5xl text-[#F0E6C8] mb-3" style={{ fontFamily: 'Cinzel, serif' }}>Unsere Angebote</h1>
          <p className="text-[#F0E6C8]/50">Beratungen, Ausbildung & Tarot – finde das Richtige für deine Reise.</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Filter className="w-4 h-4 text-[#F0E6C8]/30 mt-2" />
          {categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                cat === c.id
                  ? 'bg-[#7B5FD4] text-[#F0E6C8] border-[#7B5FD4]'
                  : 'bg-transparent text-[#F0E6C8]/50 border-white/10 hover:border-white/20 hover:text-[#F0E6C8]/80'
              }`}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="rounded-xl overflow-hidden h-full flex flex-col border-white/8 hover:border-[#7B5FD4]/30 transition-colors">
                <img src={p.image} alt={p.name} className="w-full h-44 object-cover opacity-80" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {p.badge && <span className="px-2 py-0.5 rounded text-xs border border-[#C9A84C]/40 text-[#C9A84C]">{p.badge}</span>}
                    <span className="px-2 py-0.5 rounded text-xs border border-[#7B5FD4]/30 text-[#7B5FD4]/80">{p.category}</span>
                  </div>
                  <h3 className="text-[#F0E6C8] font-semibold mb-2">{p.name}</h3>
                  <p className="text-[#F0E6C8]/50 text-sm mb-4 flex-1">{p.shortDescription}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-[#C9A84C]">{p.priceFormatted}</span>
                    <Link to={`/angebote/${p.id}`}>
                      <Button variant="secondary" size="sm">Details <ArrowRight className="w-3.5 h-3.5" /></Button>
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
