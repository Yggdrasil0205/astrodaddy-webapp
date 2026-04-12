import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/ui/button';
import { useAuth } from '../context/AuthContext';
import {
  Video,
  BookOpen,
  Users,
  Sparkles,
  LogOut,
  Lock,
  ChevronRight,
  ChevronDown,
  Play,
  FileText,
  Leaf,
  Dumbbell,
  MessageSquare,
  MessageCircle,
  Check,
} from 'lucide-react';

const memberships = [
  {
    id: 'membership-free',
    name: 'Free Mitgliedschaft',
    price: 'Kostenlos',
    description: 'Kostenlos und unverbindlich',
    features: [
      '4-teilige Webinarreihe Longevity',
      'Monatlicher Newsletter',
      'Austausch mit Gleichgesinnten',
      'Gratis Longevity Inhalte',
    ],
    comingSoon: false,
    highlighted: false,
  },
  {
    id: 'membership-monthly',
    name: 'Monatliche Mitgliedschaft',
    price: '8,99 €',
    priceNote: 'pro Monat',
    description: 'Monatlich kündbar',
    features: [
      'Monatliche Live-Beratung mit Markus',
      'Vollständige Webinarreihe',
      'Exklusive Longevity-Inhalte',
      'Online-Workshops',
      'Community-Austausch',
    ],
    comingSoon: true,
    highlighted: false,
  },
  {
    id: 'membership-yearly',
    name: 'Jährliche Mitgliedschaft',
    price: '89 €',
    priceNote: 'Nur 7,42 € / Monat',
    description: 'Einmal zahlen, ein Jahr profitieren',
    features: [
      'Alles aus Monatlich',
      '1:1 Call mit Markus',
      'Priorität bei Live-Calls',
      '2 Monate gratis',
    ],
    comingSoon: true,
    highlighted: true,
  },
];

const contentGroups = [
  {
    label: 'Wissen',
    sections: [
      {
        icon: Video,
        title: '4-teilige Longevity-Webinarreihe',
        description: 'Bonusjahre, Inflammaging, Kraft & Bewegung, Mentale Bestform',
        available: true,
        link: '/webinar',
        linkLabel: 'Zum Webinar',
      },
      {
        icon: Play,
        title: 'Longevity Videos',
        description: 'Videoguides und Experteninterviews rund um gesundes Altern.',
        available: false,
      },
      {
        icon: FileText,
        title: 'Artikel & PDFs',
        description: 'Fachartikel, Zusammenfassungen und Downloadmaterialien.',
        available: false,
      },
    ],
  },
  {
    label: 'Themen',
    sections: [
      {
        icon: Leaf,
        title: 'Ernährung',
        description: 'Longevity-Ernährung, Rezepte, Nährstoffwissen und praktische Tipps.',
        available: false,
      },
      {
        icon: Dumbbell,
        title: 'Bewegung & Kraft',
        description: 'Trainingspläne, Übungsvideos und Tipps für mehr Vitalität im Alltag.',
        available: false,
      },
    ],
  },
  {
    label: 'Community',
    sections: [
      {
        icon: MessageSquare,
        title: 'Community Forum',
        description: 'Austausch mit Gleichgesinnten, Fragen stellen und voneinander lernen.',
        available: false,
      },
      {
        icon: MessageCircle,
        title: 'WhatsApp Gruppe',
        description: 'Direkt vernetzt mit der HappyAger Community und Markus.',
        available: false,
      },
      {
        icon: Users,
        title: 'Live-Calls mit Markus',
        description: 'Monatliche Live-Beratung in kleinen Gruppen – persönlich und direkt.',
        available: false,
      },
    ],
  },
];

export default function MemberDashboard() {
  const { user, logout } = useAuth();
  const [showMemberships, setShowMemberships] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displayName = user?.user_metadata?.full_name
    ?? user?.email?.split('@')[0]
    ?? 'Mitglied';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#8268AB]/20 to-transparent blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 -left-40 w-[32rem] h-[32rem] rounded-full bg-gradient-to-br from-[#1b2a23]/20 to-transparent blur-3xl"
        />
      </div>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#8268AB]/20 to-[#BFADD5]/20 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-[#8268AB]" />
              <span className="text-sm font-medium text-[#8268AB]">Mitgliederbereich</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Willkommen,{' '}
              <span className="bg-gradient-to-r from-[#1b2a23] via-[#8268AB] to-[#F9C4B5] bg-clip-text text-transparent">
                {displayName}
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Hier findest du alle deine Inhalte und Vorteile als HappyAger-Mitglied.
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <GlassCard className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8268AB] to-[#1b2a23] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-[#1b2a23]">{displayName}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#8268AB]/15 mt-1">
                    <span className="text-xs text-[#8268AB] font-medium">Free Mitgliedschaft</span>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/30 hover:bg-white/50 text-muted-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Abmelden
              </Button>
            </GlassCard>
          </motion.div>

          {/* Content Groups */}
          <div className="space-y-8">
            {contentGroups.map((group) => (
              <div key={group.label}>
                <h2 className="text-lg font-bold text-[#1b2a23] mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-[#8268AB] inline-block" />
                  {group.label}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
                      >
                        <GlassCard className={`rounded-2xl p-5 h-full flex flex-col ${!section.available ? 'opacity-60' : ''}`}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-[#8268AB]/15 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-[#8268AB]" />
                            </div>
                            {!section.available && (
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1b2a23]/10">
                                <Lock className="w-3 h-3 text-[#1b2a23]" />
                                <span className="text-xs font-medium text-[#1b2a23]">Coming Soon</span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-bold text-[#1b2a23] text-sm mb-1">{section.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed flex-grow">{section.description}</p>
                          {section.available && section.link && (
                            <Link to={section.link} className="mt-3">
                              <Button size="sm" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white w-full text-xs">
                                {section.linkLabel}
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          )}
                        </GlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade Akkordeon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <GlassCard className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#1b2a23]/5 to-[#8268AB]/5">
              <button
                onClick={() => setShowMemberships(v => !v)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div>
                  <p className="font-bold text-[#1b2a23]">Mehr Inhalte freischalten</p>
                  <p className="text-sm text-muted-foreground">
                    Mitgliedschaftsübersicht ansehen
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#8268AB] transition-transform duration-300 flex-shrink-0 ${showMemberships ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {showMemberships && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 grid sm:grid-cols-3 gap-4">
                      {memberships.map((m) => (
                        <div
                          key={m.id}
                          className={`rounded-xl p-4 flex flex-col ${
                            m.highlighted
                              ? 'bg-[#8268AB]/15 ring-2 ring-[#8268AB]'
                              : 'bg-white/30'
                          }`}
                        >
                          {m.highlighted && (
                            <span className="text-xs font-semibold text-[#8268AB] mb-2">⭐ Beliebteste Wahl</span>
                          )}
                          <p className="font-bold text-[#1b2a23] text-sm mb-1">{m.name}</p>
                          <p className="text-lg font-bold text-[#8268AB]">{m.price}</p>
                          {m.priceNote && <p className="text-xs text-muted-foreground mb-2">{m.priceNote}</p>}
                          <ul className="space-y-1 mt-2 flex-grow">
                            {m.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-[#8268AB] flex-shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          {m.comingSoon ? (
                            <span className="mt-3 text-center text-xs font-medium text-muted-foreground bg-white/40 rounded-lg py-1.5">
                              Coming Soon
                            </span>
                          ) : (
                            <Link to="/login?tab=register" className="mt-3">
                              <Button size="sm" className="w-full bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white text-xs">
                                Kostenlos starten
                              </Button>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
