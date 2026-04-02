import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { HappyAgerLogo } from '../components/HappyAgerLogo';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AddedToCartModal } from '../components/AddedToCartModal';
import {
  Users,
  Calendar,
  Check,
  Video,
  Award,
  BookOpen,
  Sparkles,
  MessageCircle,
  Activity
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Community() {
  const { addToCart } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mitgliedschaften als Produkte
  const membershipProducts = [
    {
      id: 'membership-free',
      name: 'Free Mitgliedschaft',
      price: 0,
      originalPrice: 0,
      description: 'Kostenlos und unverbindlich',
      features: [
        '4-teilige Webinarreihe Longevity',
        'Monatlicher Newsletter mit News aus der Longevity Szene',
        'Austausch mit Gleichgesinnten'
      ],
      badge: 'Kostenlos starten',
      highlighted: false
    },
    {
      id: 'membership-monthly',
      name: 'Monatliche Mitgliedschaft',
      price: 8.99,
      originalPrice: 19.99,
      description: 'Monatlich kündbar',
      features: [
        'Monatliche Live-Beratung in kleinen Gruppen per Webcam',
        'Vollständige vierteilige Longevity-Webinarreihe',
        'Exklusive Longevity-Inhalte zu Ernährung, Mental Health, Krafttraining uvm.',
        'Online-Workshops: Faszien-Fitness, Yin Yoga, Meditationen, Fit im Büro',
        'Community-Austausch mit Gleichgesinnten',
        'Exklusiver Rabatt auf 1:1 Coaching',
        'Persönliche Longevity-Empfehlungen'
      ],
      badge: 'Flexibel starten',
      highlighted: false
    },
    {
      id: 'membership-yearly',
      name: 'Jährliche Mitgliedschaft',
      price: 89,
      originalPrice: 150,
      priceNote: 'Nur 7,42 € pro Monat',
      description: 'Einmal zahlen, ein Jahr profitieren',
      features: [
        'Alles aus Monatlich',
        '1:1 Call mit Markus zum Besprechen deiner persönlichen Longevity-Ziele',
        'Priorität bei Live-Calls und Support',
        '2 Monate gratis gegenüber Monatsmitgliedschaft'
      ],
      badge: 'Beliebteste Wahl',
      highlighted: true
    }
  ];

  const handleAddMembership = (membership: typeof membershipProducts[0]) => {
    addToCart({
      id: membership.id,
      name: membership.name,
      price: membership.price,
      image: '/placeholder-membership.png',
      category: 'Mitgliedschaft',
      description: membership.description,
      rating: 5,
      shortDescription: membership.description
    });
    setAddedProductName(membership.name);
    setShowCartModal(true);
  };

  const benefits = [
    {
      icon: Video,
      title: 'Monatliche Live-Beratung in kleinen Gruppen per Webcam',
      description: 'Kostenlos für alle kostenpflichtigen Mitglieder. Persönliche Ziele besprechen, Fragen stellen, direkt mit Markus ins Gespräch kommen.'
    },
    {
      icon: BookOpen,
      title: 'Zugang zur vollständigen vierteiligen Longevity-Webinarreihe',
      description: 'Bonusjahre, Inflammaging, Kraft & Bewegung, Mentale Bestform'
    },
    {
      icon: Sparkles,
      title: 'Exklusive Longevity-Inhalte',
      description: 'Vertieftes Wissen und Praxistipps zu gesunder Ernährung, Gewichtsmanagement, Mental Health, Krafttraining, Regeneration, Burn-out und Depression'
    },
    {
      icon: Activity,
      title: 'Online-Workshops',
      description: 'Faszien-Fitness, Yin Yoga, Meditationen, Fit im Büro'
    },
    {
      icon: MessageCircle,
      title: 'Community-Austausch',
      description: 'Mit Gleichgesinnten auf demselben Weg'
    },
    {
      icon: Award,
      title: 'Exklusiver Rabatt auf 1:1 Coaching mit Markus',
      description: 'Für alle, die ihre Longevity-Reise individuell begleiten lassen möchten'
    },
    {
      icon: Users,
      title: 'Persönliche Longevity-Empfehlungen',
      description: 'Passend zu deinen Zielen'
    }
  ];

  const pillars = [
    {
      title: 'Inflammaging',
      description: 'Warum Altern eine stille Entzündung ist, und wie du aktiv dagegenwirkst: durch Ernährung, Darmgesundheit, Antioxidantien und einfache Alltagsgewohnheiten.',
      image: 'https://images.unsplash.com/photo-1543362905-bddfadc3d44f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZsYW1tYXRpb24lMjBoZWFsdGh5JTIwZm9vZCUyMGFudGlveGlkYW50c3xlbnwxfHx8fDE3NzMxNDg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Kraft & Bewegung',
      description: 'Warum Krafttraining der wichtigste Longevity-Hebel ist, wie du Muskelmasse aufbaust, Viszeralfett abbaust und dein biologisches Alter senkst – in jedem Alter.',
      image: 'https://images.unsplash.com/photo-1747302653826-42c6cd7295f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlbmd0aCUyMHRyYWluaW5nJTIwb2xkZXIlMjBhZHVsdHxlbnwxfHx8fDE3NzMxNDg2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      title: 'Mentale Bestform',
      description: 'Wie du dein Gehirn trainierst und durch Bewegung, Ernährung, Schlaf und sozialen Kontakten bis ins hohe Alter scharf fit und gesund hältst.',
      image: 'https://images.unsplash.com/photo-1767611102585-baf80e9be291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbWVudGFsJTIwd2VsbG5lc3MlMjB5b2dhfGVufDF8fHx8MTc3MzE0ODY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-[#F9C4B5]/20 to-transparent blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <GlassCard className="rounded-3xl overflow-hidden p-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758274533672-a834bebe2e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB5b2dhJTIwd2VsbG5lc3MlMjBncm91cCUyMGhhcHB5fGVufDF8fHx8MTc3MzE0ODAxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="HappyAger Community"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D5953]/50 to-transparent" />
                </div>
              </GlassCard>
              
              {/* Floating element */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-[#8268AB] to-[#BFADD5] opacity-80 blur-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-6">
                <Users className="w-4 h-4 mr-2 text-[#8268AB]" />
                <span className="text-sm">HappyAger Community</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                  Werde Teil der
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Community</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Hier triffst du Menschen, die dasselbe Ziel haben: länger gesund, aktiv 
                und glücklich leben. Exklusiver Zugang zu Markus' Longevity-Wissen, 
                Live-Sessions und einer Community auf demselben Weg.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1b2a23]">5.000+</div>
                  <div className="text-xs text-muted-foreground">Mitglieder</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#8268AB]">15+</div>
                  <div className="text-xs text-muted-foreground">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F9C4B5]">∞</div>
                  <div className="text-xs text-muted-foreground">Longevity</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white px-8"
                  onClick={() => {
                    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Mitglied werden
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-[#1b2a23] hover:bg-[#1b2a23]/10"
                  onClick={() => {
                    document.getElementById('benefits-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Mehr erfahren
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Pricing Section - NOW FIRST */}
          <section id="pricing-section" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-6"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-4">
                <Calendar className="w-4 h-4 mr-2 text-[#8268AB]" />
                <span className="text-sm text-[#8268AB] font-medium">Community-Start · Eröffnungsangebot</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Weniger als eine<br />gute Pizza. <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">Ein Leben lang<br />gesünder.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Für den Preis von 3 Kaffee im Monat bekommst du Zugang zu fundiertem 
                Longevity-Wissen, monatlicher Live-Beratung mit Markus und einer 
                Community, die denselben Weg geht. Alle drei Angebote zum 
                Community-Startpreis – nur für kurze Zeit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {membershipProducts.map((membership, index) => (
                <motion.div
                  key={membership.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={membership.highlighted ? 'md:-mt-4 md:mb-4' : ''}
                >
                  <GlassCard 
                    className={`rounded-3xl p-8 h-full flex flex-col relative overflow-hidden ${
                      membership.highlighted ? 'ring-2 ring-[#8268AB]' : ''
                    }`}
                  >
                    {membership.highlighted && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5]" />
                    )}
                    
                    <div className="mb-6">
                      <div className="inline-flex px-3 py-1 rounded-full bg-[#8268AB]/20 text-[#8268AB] text-xs font-semibold mb-4">
                        {membership.badge}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{membership.name}</h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        {membership.id === 'membership-free' ? (
                          <span className="text-5xl font-bold text-[#1b2a23]">
                            Kostenlos
                          </span>
                        ) : (
                          <>
                            <span className="text-5xl font-bold text-[#1b2a23]">
                              {membership.price.toFixed(2).replace('.', ',')} €
                            </span>
                            {membership.id === 'membership-monthly' && (
                              <span className="text-muted-foreground">/ Monat</span>
                            )}
                            {membership.id === 'membership-yearly' && (
                              <span className="text-muted-foreground">/ Jahr</span>
                            )}
                          </>
                        )}
                      </div>
                      {membership.priceNote && (
                        <p className="text-sm text-[#8268AB] font-medium mb-2">
                          {membership.priceNote}
                        </p>
                      )}
                      {membership.id !== 'membership-free' && (
                        <p className="text-sm line-through text-muted-foreground mb-2">
                          später {membership.originalPrice.toFixed(2).replace('.', ',')} €
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {membership.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8 flex-grow">
                      {membership.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#1b2a23] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      size="lg"
                      onClick={() => handleAddMembership(membership)}
                      className={`w-full ${
                        membership.highlighted
                          ? 'bg-[#8268AB] hover:bg-[#8268AB]/90 text-white'
                          : 'bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white'
                      }`}
                    >
                      {membership.id === 'membership-free' && 'Kostenlos registrieren'}
                      {membership.id === 'membership-monthly' && 'Monatlich starten'}
                      {membership.id === 'membership-yearly' && 'Jetzt Jahresmitglied werden'}
                    </Button>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8 text-sm text-muted-foreground"
            >
              Alle Preise inkl. MwSt. · Monatsmitgliedschaft jederzeit kündbar · 
              Sichere Zahlung mit SSL-Verschlüsselung
            </motion.div>
          </section>

          {/* Benefits */}
          <section id="benefits-section" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                Was dich <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">erwartet</span>
              </h2>
              <p className="text-muted-foreground text-lg">Mitgliedervorteile</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard className="rounded-2xl p-6 h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#8268AB]/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#8268AB]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Three Pillars Preview */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-4">
                <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
                <span className="text-sm text-[#8268AB] font-medium">Longevity-Wissen</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">
                Die Hauptsäulen <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">der Community</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="rounded-3xl overflow-hidden h-full flex flex-col">
                    {/* Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={pillar.image}
                        alt={pillar.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">{pillar.title}</h3>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-6 flex-grow">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="rounded-3xl p-8 text-center">
              <p className="text-lg font-medium">
                Bereits <span className="text-[#1b2a23] font-bold">2.000+ Menschen</span> auf dem Weg zu gesundem Alter
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Added to Cart Modal */}
      <AddedToCartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        productName={addedProductName}
      />
    </div>
  );
}