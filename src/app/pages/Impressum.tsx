import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Impressum() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#5C3D8F] hover:text-[#8B6EC5] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <GlassCard className="rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
              Impressum
            </h1>

            <div className="space-y-8 text-[#1a0d2e]/90">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="mb-2">
                  <strong>Miersbe Wellness GbR</strong><br />
                  Robert Wagner
                </p>
                <p className="mb-2">
                  Fenitzerplatz 4<br />
                  90489 Nürnberg<br />
                  Deutschland
                </p>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  Kontakt
                </h2>
                <p>
                  E-Mail: hallo@happy-ager.net<br />
                  Website: www.happy-ager.net
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  DE235579678
                </p>
              </section>

              {/* Social Media */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  Social Media
                </h2>
                <p>
                  Facebook: @happyagermarkus<br />
                  Instagram: @happy.ager.markus
                </p>
              </section>

              {/* EU-Streitschlichtung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  EU-Streitschlichtung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#5C3D8F] hover:underline ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>.<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              {/* Verbraucherstreitbeilegung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1a0d2e]" style={{ fontFamily: 'henriette, serif' }}>
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
