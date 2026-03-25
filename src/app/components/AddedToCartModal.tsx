import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Check, X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';

interface AddedToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export function AddedToCartModal({ isOpen, onClose, productName }: AddedToCartModalProps) {
  const navigate = useNavigate();

  const handleGoToCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="pointer-events-auto w-full max-w-md"
            >
              <GlassCard className="rounded-3xl p-8 relative">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1b2a23] to-[#8268AB] flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center mb-2">
                  In den Warenkorb gelegt!
                </h2>

                {/* Product Name */}
                <p className="text-center text-muted-foreground mb-8">
                  <span className="font-medium text-foreground">{productName}</span> wurde erfolgreich hinzugefügt.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    onClick={handleGoToCheckout}
                    className="w-full bg-[#8268AB] hover:bg-[#8268AB]/90 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Zur Kasse
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={onClose}
                    className="w-full"
                  >
                    Schließen
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}