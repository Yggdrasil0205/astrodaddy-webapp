import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { X, Shield, Cookie, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useCookies } from '../context/CookieContext';

export function CookieBanner() {
  const { showBanner, acceptAll, acceptSelected, rejectAll } = useCookies();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
    marketing: true
  });

  if (!showBanner) return null;

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const cookieCategories = [
    {
      key: 'necessary' as const,
      icon: Shield,
      title: 'Notwendige Cookies',
      description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
      examples: 'Session-Management, Warenkorb, Login-Status, Cookie-Einstellungen',
      required: true
    },
    {
      key: 'functional' as const,
      icon: CheckCircle2,
      title: 'Funktionale Cookies',
      description: 'Diese Cookies ermöglichen erweiterte Funktionalität und Personalisierung.',
      examples: 'Community-Funktionen, Shop-Präferenzen, Newsletter-Einstellungen, Font-Optimierung',
      required: false
    },
    {
      key: 'analytics' as const,
      icon: Cookie,
      title: 'Analyse & Performance',
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
      examples: 'Google Analytics, Matomo, Hotjar, Seitenaufrufe, Verweildauer, Nutzerverhalten',
      required: false
    },
    {
      key: 'marketing' as const,
      icon: Cookie,
      title: 'Marketing & Werbung',
      description: 'Diese Cookies werden verwendet, um relevante Werbung anzuzeigen und Kampagnen zu messen.',
      examples: 'Facebook Pixel, Google Ads, LinkedIn Insight Tag, TikTok Pixel, Remarketing, E-Mail-Marketing-Tools',
      required: false
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div className="relative rounded-3xl bg-white backdrop-blur-2xl border border-white/40 shadow-2xl p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7B5FD4] to-[#3D2A8A] flex items-center justify-center flex-shrink-0">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 text-[#1B1040]" style={{ fontFamily: 'henriette, serif' }}>
                  Cookie-Einstellungen
                </h2>
                <p className="text-[#1B1040]">
                  Wir respektieren deine Privatsphäre und möchten transparent sein
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-6">
            <p className="text-[#1B1040] leading-relaxed mb-4">
              Diese Website verwendet Cookies, um dir die bestmögliche Erfahrung zu bieten. 
              Einige Cookies sind notwendig für den Betrieb der Website, während andere uns helfen, 
              die Website zu verbessern und dir personalisierte Inhalte anzuzeigen.
            </p>

            {/* Quick Actions */}
            {!showDetails && (
              <div className="flex flex-wrap gap-3 mb-4">
                <Button
                  onClick={acceptAll}
                  className="bg-[#1B1040]/80 hover:bg-[#1B1040]/90 text-white backdrop-blur-xl"
                >
                  Alle akzeptieren
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  className="backdrop-blur-xl"
                >
                  Nur notwendige
                </Button>
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="backdrop-blur-xl"
                >
                  Einstellungen anpassen
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Detailed Settings */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 mb-6"
                >
                  {cookieCategories.map((category) => {
                    const Icon = category.icon;
                    const isEnabled = preferences[category.key];

                    return (
                      <div
                        key={category.key}
                        className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div 
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isEnabled 
                                  ? 'bg-[#3D2A8A]' 
                                  : 'bg-gray-400'
                              }`}
                            >
                              <Icon className={`w-6 h-6 ${isEnabled ? 'text-[#7B5FD4]' : 'text-gray-700'}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-[#1B1040] text-base">
                                  {category.title}
                                </h3>
                                {category.required && (
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F9C4B5] text-white font-semibold">
                                    Erforderlich
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-[#1B1040] mb-2">
                                {category.description}
                              </p>
                              <p className="text-xs text-[#1B1040] italic">
                                Beispiele: {category.examples}
                              </p>
                            </div>
                          </div>

                          {/* Toggle Switch */}
                          <button
                            onClick={() => handleToggle(category.key)}
                            disabled={category.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B5FD4] focus:ring-offset-2 flex-shrink-0 ${
                              isEnabled
                                ? 'bg-[#7B5FD4]'
                                : 'bg-gray-400'
                            } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                isEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button
                      onClick={() => acceptSelected(preferences)}
                      className="bg-[#1B1040]/80 hover:bg-[#1B1040]/90 text-white backdrop-blur-xl"
                    >
                      Auswahl bestätigen
                    </Button>
                    <Button
                      onClick={acceptAll}
                      variant="outline"
                      className="backdrop-blur-xl"
                    >
                      Alle akzeptieren
                    </Button>
                    <Button
                      onClick={() => setShowDetails(false)}
                      variant="ghost"
                      className="backdrop-blur-xl"
                    >
                      <ChevronUp className="w-4 h-4 mr-2" />
                      Weniger anzeigen
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Links */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs text-[#1B1040]">
              Weitere Informationen findest du in unserer{' '}
              <a href="/datenschutz" className="text-[#7B5FD4] hover:underline font-semibold">
                Datenschutzerklärung
              </a>
              {' '}und den{' '}
              <a href="/impressum" className="text-[#7B5FD4] hover:underline font-semibold">
                Impressum
              </a>
              . Du kannst deine Einstellungen jederzeit ändern.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}