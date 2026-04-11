import { useEffect } from 'react';
import { motion } from 'motion/react';
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
  Star,
} from 'lucide-react';

const contentSections = [
  {
    icon: Video,
    title: '4-teilige Longevity-Webinarreihe',
    description: 'Bonusjahre, Inflammaging, Kraft & Bewegung, Mentale Bestform',
    available: true,
    link: '/webinar',
    linkLabel: 'Zum Webinar',
  },
  {
    icon: BookOpen,
    title: 'Gratis Longevity Inhalte',
    description: 'Artikel, Tipps und Wissen rund um gesundes Altern – exklusiv für Mitglieder.',
    available: false,
  },
  {
    icon: Users,
    title: 'Community & Live-Calls',
    description: 'Monatliche Live-Beratung mit Markus und Austausch mit Gleichgesinnten.',
    available: false,
  },
  {
    icon: Star,
    title: 'Exklusive Workshops',
    description: 'Faszien-Fitness, Yin Yoga, Meditationen, Fit im Büro.',
    available: false,
  },
];

export default function MemberDashboard() {
  const { user, logout } = useAuth();

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

          {/* Content Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {contentSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                >
                  <GlassCard className={`rounded-2xl p-6 h-full flex flex-col ${!section.available ? 'opacity-60' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#8268AB]/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#8268AB]" />
                      </div>
                      {!section.available && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#1b2a23]/10">
                          <Lock className="w-3 h-3 text-[#1b2a23]" />
                          <span className="text-xs font-medium text-[#1b2a23]">Coming Soon</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#1b2a23] mb-2">{section.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{section.description}</p>
                    {section.available && section.link && (
                      <Link to={section.link} className="mt-4">
                        <Button size="sm" className="bg-[#1b2a23]/80 hover:bg-[#1b2a23]/90 text-white w-full">
                          {section.linkLabel}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Upgrade Teaser */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <GlassCard className="rounded-2xl p-6 bg-gradient-to-r from-[#1b2a23]/5 to-[#8268AB]/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#1b2a23] mb-1">Mehr Inhalte freischalten</p>
                  <p className="text-sm text-muted-foreground">
                    Mit einer kostenpflichtigen Mitgliedschaft erhältst du Zugang zu allen Inhalten – bald verfügbar.
                  </p>
                </div>
                <Link to="/community" className="flex-shrink-0">
                  <Button size="sm" className="bg-[#8268AB] hover:bg-[#8268AB]/90 text-white whitespace-nowrap">
                    Mitgliedschaft ansehen
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
