import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Truck, Shield, Check, ShoppingCart, Trash2, Wallet } from 'lucide-react';

type PaymentMethod = 'card' | 'paypal' | 'klarna' | 'sepa' | 'applepay' | 'googlepay';

export default function Checkout() {
  const { items, totalPrice, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    iban: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    
    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="rounded-3xl p-12">
              <h1 className="text-3xl font-bold mb-4">Dein Warenkorb ist leer</h1>
              <p className="text-muted-foreground mb-8">
                Füge Produkte hinzu, um mit dem Checkout fortzufahren.
              </p>
              <Link to="/shop">
                <Button size="lg" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white">
                  Zum Shop
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <GlassCard className="rounded-3xl p-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1b2a23] to-[#8268AB] mx-auto mb-6 flex items-center justify-center"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-4xl font-bold mb-4">Bestellung erfolgreich!</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Vielen Dank für deine Bestellung. Du erhältst in Kürze eine Bestätigungsmail.
              </p>
              <p className="text-sm text-muted-foreground">
                Du wirst in wenigen Sekunden zur Startseite weitergeleitet...
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  const shippingCost = 4.90;
  const total = totalPrice + shippingCost;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
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

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-4">
              <ShoppingCart className="w-4 h-4 mr-2 text-[#8268AB]" />
              <span className="text-sm text-[#8268AB] font-medium">Bestellung abschließen</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Checkout</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Schließe deine Bestellung ab
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <GlassCard className="rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Kontaktinformationen</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          E-Mail Adresse
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                          placeholder="deine@email.de"
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <GlassCard className="rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Truck className="w-6 h-6 text-[#2D5953]" />
                      Versandadresse
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Vorname
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Nachname
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-2 block">
                          Straße und Hausnummer
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Postleitzahl
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          required
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Stadt
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-2 block">
                          Land
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#2D5953]"
                        >
                          <option>Deutschland</option>
                          <option>Österreich</option>
                          <option>Schweiz</option>
                        </select>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Payment Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="rounded-2xl p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Wallet className="w-6 h-6 text-[#8268AB]" />
                      Zahlungsmethode
                    </h2>
                    
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                        <div className="text-sm font-medium">Kreditkarte</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 0 1-.796.68H8.29c-.32 0-.558-.25-.505-.563L9.863 8.467c.055-.366.376-.645.75-.645h4.78c.69 0 1.342.05 1.95.168 1.616.315 2.725 1.216 2.725 2.488z"/>
                        </svg>
                        <div className="text-sm font-medium">PayPal</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('klarna')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'klarna'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 4h4v16H4V4zm6 0h4v6.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5V4h4v6.5c0 3.5-2.5 6-6 6s-6-2.5-6-6V4z"/>
                        </svg>
                        <div className="text-sm font-medium">Klarna</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('sepa')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'sepa'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                        <div className="text-sm font-medium">SEPA</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('applepay')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'applepay'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        <div className="text-sm font-medium">Apple Pay</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('googlepay')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'googlepay'
                            ? 'border-[#8268AB] bg-[#8268AB]/10'
                            : 'border-white/30 bg-white/20 hover:bg-white/30'
                        }`}
                      >
                        <svg className="w-6 h-6 mx-auto mb-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                        </svg>
                        <div className="text-sm font-medium">Google Pay</div>
                      </button>
                    </div>

                    {/* Payment Method Forms */}
                    <motion.div
                      key={paymentMethod}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Karteninhaber
                            </label>
                            <input
                              type="text"
                              name="cardName"
                              required
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8268AB]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Kartennummer
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              required
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8268AB]"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                Ablaufdatum
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                required
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/JJ"
                                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8268AB]"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium mb-2 block">
                                CVV
                              </label>
                              <input
                                type="text"
                                name="cvv"
                                required
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={3}
                                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8268AB]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="text-center py-6">
                          <svg className="w-16 h-16 mx-auto mb-4 text-[#0070ba]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.806.806 0 0 1-.796.68H8.29c-.32 0-.558-.25-.505-.563L9.863 8.467c.055-.366.376-.645.75-.645h4.78c.69 0 1.342.05 1.95.168 1.616.315 2.725 1.216 2.725 2.488z"/>
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Du wirst nach der Bestellung zu PayPal weitergeleitet, um die Zahlung abzuschließen.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'klarna' && (
                        <div className="text-center py-6">
                          <svg className="w-16 h-16 mx-auto mb-4 text-[#ffb3c7]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h4v16H4V4zm6 0h4v6.5c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5V4h4v6.5c0 3.5-2.5 6-6 6s-6-2.5-6-6V4z"/>
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Bezahle in 30 Tagen oder in Raten. Du wirst nach der Bestellung zu Klarna weitergeleitet.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'sepa' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              IBAN
                            </label>
                            <input
                              type="text"
                              name="iban"
                              required
                              value={formData.iban}
                              onChange={handleInputChange}
                              placeholder="DE89 3704 0044 0532 0130 00"
                              className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#8268AB]"
                            />
                          </div>
                          <div className="bg-[#F9C4B5]/10 border border-[#F9C4B5]/30 rounded-xl p-3 text-sm text-muted-foreground">
                            <p>Mit der Bestellung erteilst du ein SEPA-Lastschriftmandat.</p>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'applepay' && (
                        <div className="text-center py-6">
                          <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Bezahle schnell und sicher mit Apple Pay. Du wirst nach der Bestellung weitergeleitet.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'googlepay' && (
                        <div className="text-center py-6">
                          <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                          </svg>
                          <p className="text-sm text-muted-foreground">
                            Bezahle schnell und sicher mit Google Pay. Du wirst nach der Bestellung weitergeleitet.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </GlassCard>
                </motion.div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full bg-[#2D5953]/80 hover:bg-[#2D5953]/90 text-white"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Wird verarbeitet...
                    </span>
                  ) : (
                    <>Jetzt kaufen</>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="sticky top-32"
              >
                <GlassCard className="rounded-2xl p-6">
                  <h2 className="text-2xl font-bold mb-6">Bestellübersicht</h2>
                  
                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover object-left"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Menge: {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-[#2D5953]">
                            {(item.price * item.quantity).toFixed(2).replace('.', ',')}€
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#2D5953]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span>Zwischensumme:</span>
                      <span>{totalPrice.toFixed(2).replace('.', ',')}€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Versand:</span>
                      <span>{shippingCost.toFixed(2).replace('.', ',')}€</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/20">
                      <span>Gesamt:</span>
                      <span className="text-[#2D5953]">
                        {total.toFixed(2).replace('.', ',')}€
                      </span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-5 h-5 text-[#2D5953]" />
                      <span>Sichere Zahlung mit SSL-Verschlüsselung</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}