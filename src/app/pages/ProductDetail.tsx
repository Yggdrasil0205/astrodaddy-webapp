import React from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, Check, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [addedToCart, setAddedToCart] = React.useState(false);
  
  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Link to="/shop">
            <Button>Zurück zum Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
      </div>

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="rounded-3xl overflow-hidden p-4 sticky top-32">
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.badge && (
                  <div className="inline-flex px-4 py-2 rounded-full bg-[#F9C4B5] text-white text-sm font-medium">
                    {product.badge}
                  </div>
                )}
              </GlassCard>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm">
                <span className="text-sm text-[#8268AB] font-medium">{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">{product.name}</span>
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#1b2a23]">
                  {product.priceFormatted}
                </span>
                <span className="text-muted-foreground">inkl. MwSt.</span>
              </div>

              {/* Quantity & Add to Cart */}
              <GlassCard className="rounded-2xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Menge
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg bg-white/40 hover:bg-white/60 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-white/40 hover:bg-white/60 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      className="flex-1 bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white"
                    >
                      {addedToCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Hinzugefügt!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          In den Warenkorb
                        </>
                      )}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-12"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </GlassCard>

              {/* Share */}
              <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Teilen</span>
              </button>

              {/* Details */}
              <GlassCard className="rounded-2xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">Produktdetails</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.details}
                </p>
              </GlassCard>

              {/* Ingredients */}
              {product.ingredients && (
                <GlassCard className="rounded-2xl p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Inhaltsstoffe</h2>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#1b2a23] flex-shrink-0 mt-0.5" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* Benefits */}
              {product.benefits && (
                <GlassCard className="rounded-2xl p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Vorteile</h2>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#8268AB] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* Usage */}
              {product.usage && (
                <GlassCard className="rounded-2xl p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Anwendung</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.usage}
                  </p>
                </GlassCard>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}