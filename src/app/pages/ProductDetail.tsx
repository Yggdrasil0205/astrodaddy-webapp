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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <GlassCard className="rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Angebot nicht gefunden</h2>
          <Link to="/angebote"><Button className="bg-[#7B5FD4] text-white">Zurück zu Angeboten</Button></Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link to="/angebote">
          <Button variant="ghost" className="mb-6 text-[#7B5FD4] hover:bg-[#7B5FD4]/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> Zurück
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src={product.image} alt={product.name} className="w-full rounded-2xl object-cover h-80" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard className="rounded-2xl p-8 h-full">
              {product.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold mb-4">{product.badge}</span>
              )}
              <span className="inline-block px-3 py-1 rounded-full bg-[#7B5FD4]/10 text-[#7B5FD4] text-xs font-semibold mb-4 ml-2">{product.category}</span>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <div className="text-4xl font-bold text-[#7B5FD4] mb-6">{product.priceFormatted}</div>

              <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full bg-[#7B5FD4] hover:bg-[#7B5FD4]/90 text-white rounded-2xl mb-4">
                  Jetzt buchen <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-[#C9A84C] text-[#C9A84C]" />
                <span>5/5 Sterne · 100% Zufriedenheitsrate</span>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-10">
          <GlassCard className="rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <p className="text-foreground mb-6">{product.details}</p>
            {product.benefits && (
              <>
                <h3 className="text-lg font-semibold mb-4">Was dich erwartet</h3>
                <ul className="space-y-3">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#7B5FD4] mt-0.5 shrink-0" />
                      <span>{b}</span>
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
