import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Impressum() {
  const h2 = 'text-2xl font-bold mb-4 text-[#C9A84C]';
  const serif = { fontFamily: 'henriette, serif' } as const;

  return (
    <div className="min-h-screen bg-[#1B1040] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#E7CE86] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <GlassCard className="rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#F0E6C8]" style={serif}>
              Impressum
            </h1>

            <div className="space-y-8 text-[#F0E6C8]/80 leading-relaxed">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className={h2} style={serif}>Angaben gemäß § 5 TMG</h2>
                <p className="mb-2">
                  <strong className="text-[#F0E6C8]">Robert Wagner</strong><br />
                  Influencer, Content-Creator, Coach
                </p>
                <p className="mb-2">
                  Westliche Ringstr. 25<br />
                  91781 Weißenburg<br />
                  Deutschland
                </p>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className={h2} style={serif}>Kontakt</h2>
                <p>
                  Telefon: +49 15202 099560<br />
                  E-Mail: info@astroversity.academy
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section>
                <h2 className={h2} style={serif}>Umsatzsteuer-ID</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  ausstehend<br />
                  Steuernummer: 220 297 29615
                </p>
              </section>

              {/* EU-Streitschlichtung */}
              <section>
                <h2 className={h2} style={serif}>EU-Streitschlichtung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#C9A84C] hover:underline ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>.<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              {/* Verbraucherstreitbeilegung */}
              <section>
                <h2 className={h2} style={serif}>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <p className="text-sm text-[#F0E6C8]/40">Quelle: eRecht24</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
