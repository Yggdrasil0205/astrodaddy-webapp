import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { Star, ArrowRight, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { products } from '../data/products';

export default function Angebote() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Angebote' },
    { id: 'Beratung', name: 'Beratungen' },
    { id: 'Ausbildung', name: 'Ausbildung' },
    { id: 'Tarot', name: 'Tarot' },
  ];

  const filtered = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 90, 180] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#7B5FD4]/20 to-transparent blur-3xl" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#C9A84C]/15 to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#7B5FD4]/20 to-[#C9A84C]/20 backdrop-blur-sm mb-4">
            <Star className="w-4 h-4 mr-2 text-[#C9A84C]" />
            <span className="text-sm text-[#7B5FD4] font-medium">Angebote von Robert Wagner</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#1B1040] via-[#7B5FD4] to-[#C9A84C] bg-clip-text text-transparent">
              Unsere Angebote
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">Beratungen, Ausbildung & Tarot – finde das Richtige für deine Reise.</p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <GlassCard className="rounded-2xl p-4">
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-5 h-5 text-muted-foreground" />
              {categories.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all text-sm ${
                    selectedCategory === cat.id
                      ? 'bg-[#7B5FD4] text-white shadow-lg'
                      : 'bg-white/50 text-foreground hover:bg-white/80'
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="rounded-2xl overflow-hidden h-full hover:shadow-xl transition-shadow flex flex-col">
                <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    {p.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold">{p.badge}</span>
                    )}
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-[#7B5FD4]/10 text-[#7B5FD4]">{p.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">{p.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{p.shortDescription}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-[#7B5FD4]">{p.priceFormatted}</span>
                    <Link to={`/angebote/${p.id}`}>
                      <Button size="sm" className="bg-[#7B5FD4] hover:bg-[#7B5FD4]/90 text-white rounded-xl">
                        Details <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
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
