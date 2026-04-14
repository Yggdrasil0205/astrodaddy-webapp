import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ArrowLeft, Check, ExternalLink, Tag, ChevronRight, Copy, CheckCheck, X } from 'lucide-react';
import { getProductById } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProductById(Number(id));

  const [activeImage, setActiveImage] = useState(product?.image ?? '');
  const [activeVariant, setActiveVariant] = useState<string | null>(
    product?.variants?.length ? product.variants[0].name : null
  );
  const [showExitModal, setShowExitModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(product?.discountCode ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.variants?.length) {
        setActiveVariant(product.variants[0].name);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Link to="/shop"><Button>Zurück zum Shop</Button></Link>
        </div>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images ?? [])];
  const hasValidAffiliateUrl = product.affiliateUrl && product.affiliateUrl !== '#';

  const handleVariantSelect = (variantName: string) => {
    setActiveVariant(variantName);
    const variant = product.variants?.find(v => v.name === variantName);
    if (variant) setActiveImage(variant.image);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
      </div>

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* ── Left: Images ── */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Main image */}
              <GlassCard className="rounded-3xl overflow-hidden p-4 sticky top-32">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/30">
                  <ImageWithFallback
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {product.badge && (
                  <div className="mt-3 inline-flex px-4 py-2 rounded-full bg-[#F9C4B5] text-white text-sm font-medium">
                    {product.badge}
                  </div>
                )}
              </GlassCard>

              {/* Thumbnail strip */}
              {allImages.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white/40 ${
                        activeImage === img
                          ? 'border-[#8268AB] scale-105'
                          : 'border-white/30 hover:border-[#8268AB]/50'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Right: Info ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm">
                <span className="text-sm text-[#8268AB] font-medium">{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                  {product.name}
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-[#1b2a23]">{product.priceFormatted}</span>
                <span className="text-muted-foreground">inkl. MwSt.</span>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <GlassCard className="rounded-2xl p-5">
                  <p className="text-sm font-semibold text-[#1b2a23] mb-3">
                    {product.variantNote ? 'Geschmack / Variante' : 'Variante wählen'}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.variants.map(variant => (
                      <button
                        key={variant.name}
                        onClick={() => handleVariantSelect(variant.name)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                          activeVariant === variant.name
                            ? 'bg-[#1b2a23] text-white border-[#1b2a23]'
                            : 'bg-white/50 text-[#1b2a23] border-white/30 hover:border-[#8268AB]/50'
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                  </div>
                  {product.variantNote && (
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      {product.variantNote}
                    </p>
                  )}
                </GlassCard>
              )}

              {/* Discount Code */}
              {product.discountInfo && (
                <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-orange-500 border border-orange-400">
                  <Tag className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base font-bold text-white">Neukundenrabatt Code: {product.discountCode}</p>
                    <p className="text-base text-white/90">{product.discountInfo}</p>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3">
                {hasValidAffiliateUrl ? (
                  <Button
                    size="lg"
                    onClick={() => setShowExitModal(true)}
                    className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white font-semibold py-4"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Hier kaufen
                    <ChevronRight className="w-5 h-5 ml-auto" />
                  </Button>
                ) : (
                  <Button size="lg" disabled className="w-full text-muted-foreground">
                    Link folgt in Kürze
                  </Button>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  Du wirst zur Herstellerseite cellagon.de weitergeleitet.
                </p>
              </div>

              {/* Details */}
              <GlassCard className="rounded-2xl p-6 space-y-3">
                <h2 className="text-xl font-bold">Produktdetails</h2>
                <p className="text-muted-foreground leading-relaxed">{product.details}</p>
              </GlassCard>

              {/* Benefits */}
              {product.benefits && (
                <GlassCard className="rounded-2xl p-6 space-y-3">
                  <h2 className="text-xl font-bold">Vorteile</h2>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#8268AB] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* Usage */}
              {product.usage && (
                <GlassCard className="rounded-2xl p-6 space-y-3">
                  <h2 className="text-xl font-bold">Anwendung</h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">{product.usage}</p>
                </GlassCard>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Exit Interstitial Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={() => setShowExitModal(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md"
            >
              <GlassCard className="rounded-3xl p-8 text-center">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>

                <div className="w-14 h-14 rounded-2xl bg-[#1b2a23]/10 flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-7 h-7 text-[#1b2a23]" />
                </div>

                <h3 className="text-xl font-bold text-[#1b2a23] mb-2">
                  Du verlässt HappyAger
                </h3>
                <p className="text-[#1b2a23] text-sm mb-6 leading-relaxed">
                  Wir leiten dich jetzt zu <strong>cellagon.de</strong> weiter.<br />
                  Vergiss nicht, deinen Rabattcode einzugeben!
                </p>

                {/* Code Box */}
                {product.discountCode && (
                  <div className="flex items-center gap-3 bg-orange-500 rounded-xl px-5 py-4 mb-6">
                    <div className="flex-1 text-left">
                      <p className="text-xs text-white/80 font-medium">Dein Rabattcode</p>
                      <p className="text-2xl font-bold text-white tracking-widest">{product.discountCode}</p>
                      <p className="text-xs text-white/80 mt-0.5">10 € ab 100 € Bestellwert</p>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-3 py-2"
                    >
                      {copied
                        ? <CheckCheck className="w-5 h-5 text-white" />
                        : <Copy className="w-5 h-5 text-white" />
                      }
                      <span className="text-xs text-white font-medium">{copied ? 'Kopiert!' : 'Kopieren'}</span>
                    </button>
                  </div>
                )}

                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="w-full bg-[#1b2a23] hover:bg-[#1b2a23]/90 text-white"
                    onClick={() => setShowExitModal(false)}
                  >
                    Weiter zu cellagon.de
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>

                <button
                  onClick={() => setShowExitModal(false)}
                  className="mt-4 text-sm text-muted-foreground hover:text-[#1b2a23] transition-colors"
                >
                  Zurück zur Seite
                </button>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
