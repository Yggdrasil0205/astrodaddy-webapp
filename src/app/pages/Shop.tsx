import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Filter, Search, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';
import { products } from '../data/products';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alle Lebensmittel' },
    { id: 'Mikronährstoffkonzentrat', name: 'Mikronährstoffkonzentrate' },
    { id: 'Omega-3-Öle', name: 'Omega-3-Öle' },
    { id: 'Veganes Proteinpulver', name: 'Veganes Proteinpulver' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#8B7B9E]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-4">
            <Star className="w-4 h-4 mr-2 text-[#8268AB]" />
            <span className="text-sm text-[#8268AB] font-medium">Empfehlungen</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
              Der HappyAger empfiehlt
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Sorgfältig ausgewählte Premium-Lebensmittel für deine Longevity-Reise
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard className="rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Produkte suchen..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1b2a23]"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#1b2a23] cursor-pointer"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard hover className="rounded-3xl overflow-hidden h-full flex flex-col group">
                {/* Product Image */}
                <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden block">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full ${product.imageFit === 'contain' ? 'object-contain' : 'object-cover group-hover:scale-110'} transition-transform duration-500`}
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge 
                        className="text-white border-0 bg-[#F9C4B5]"
                      >
                        {product.badge}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold mb-2 hover:text-[#1b2a23] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {product.description}
                  </p>
                  
                  {/* Price + CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#1b2a23]">
                      {product.priceFormatted}
                    </span>
                    <div className="flex gap-2">
                      <Link to={`/product/${product.id}`}>
                        <Button size="sm" variant="outline" className="text-[#1b2a23] hover:bg-[#1b2a23]/10">
                          Details
                        </Button>
                      </Link>
                      {product.affiliateUrl && product.affiliateUrl !== '#' && (
                        <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Hier kaufen
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <GlassCard className="rounded-3xl p-12 max-w-md mx-auto">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Keine Produkte gefunden</h3>
              <p className="text-muted-foreground">
                Versuche eine andere Kategorie oder Suchbegriff
              </p>
            </GlassCard>
          </motion.div>
        )}

      </div>
    </div>
  );
}