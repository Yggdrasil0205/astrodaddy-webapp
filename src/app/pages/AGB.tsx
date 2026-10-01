import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function AGB() {
  const h2 = 'text-2xl font-bold mb-4 text-[#C9A84C]';
  const serif = { fontFamily: 'henriette, serif' } as const;
  const a = 'text-[#C9A84C] hover:underline';

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
            <h1 lang="de" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#F0E6C8] break-words hyphens-auto" style={serif}>
              Allgemeine Geschäftsbedingungen
            </h1>

            <div className="space-y-8 text-[#F0E6C8]/80 leading-relaxed">
              {/* 1 */}
              <section>
                <h2 className={h2} style={serif}>1. Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen, die über die Website
                  astroversity.academy durch Robert Wagner angeboten werden. Mit der Buchung einer Beratung,
                  Ausbildung, Mitgliedschaft oder eines sonstigen Angebots erklärst du dich mit diesen AGB
                  einverstanden.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className={h2} style={serif}>2. Anbieter</h2>
                <p>
                  Robert Wagner<br />
                  Westliche Ringstraße 25<br />
                  91781 Weißenburg i. Bay.<br />
                  E-Mail: info@astroversity.academy
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className={h2} style={serif}>3. Leistungen und Angebote</h2>
                <p>
                  Alle angebotenen Dienstleistungen – wie astrologische Beratungen, Analysen, Ausbildungen, Kurse und
                  Mitgliedschaften – erfolgen nach bestem Wissen und Gewissen. Sie bieten wertvolle Einblicke und
                  Orientierung, ersetzen jedoch keine psychologische, medizinische, rechtliche oder finanzielle
                  Beratung.
                </p>
              </section>

              {/* 4 */}
              <section>
                <h2 className={h2} style={serif}>4. Vertragsschluss und Buchung</h2>
                <p>
                  Die Buchung erfolgt über die Website oder einen vereinbarten Kommunikationsweg. Mit dem Absenden der
                  Bestellung gibst du ein verbindliches Angebot ab; der Vertrag kommt mit unserer Bestätigung bzw. der
                  Bereitstellung der Leistung zustande.
                </p>
              </section>

              {/* 5 */}
              <section>
                <h2 className={h2} style={serif}>5. Preise und Zahlung</h2>
                <p>
                  Es gelten die zum Zeitpunkt der Bestellung auf der Website angegebenen Preise inklusive der
                  gesetzlichen Umsatzsteuer. Zahlungen sind vor dem Beratungstermin, Ausbildungs- bzw. Leistungsbeginn
                  fällig und werden über unseren Zahlungsdienstleister Mollie abgewickelt. Die Rechnung wird dir per
                  E-Mail zur Verfügung gestellt.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className={h2} style={serif}>6. Widerrufsrecht</h2>
                <p>
                  Verbraucherinnen und Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten – sowie
                  die Fälle, in denen das Widerrufsrecht vorzeitig erlischt – findest du in unserer{' '}
                  <Link to="/widerruf" className={a}>Widerrufsbelehrung</Link>.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className={h2} style={serif}>7. Stornierung und Terminverschiebung</h2>
                <p>
                  Stornierungen von Beratungsterminen sind bis zu 24 Stunden vor dem vereinbarten Termin kostenlos
                  möglich. Bei späteren Absagen oder Nichterscheinen wird der volle Preis berechnet. In besonderen
                  Fällen kann der Starttermin einer Ausbildung nach Absprache verschoben werden. Das gesetzliche
                  Widerrufsrecht (Punkt 6) bleibt hiervon unberührt.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className={h2} style={serif}>8. Haftung</h2>
                <p>
                  Robert Wagner haftet nicht für Entscheidungen oder Handlungen, die aufgrund einer Beratung oder
                  Ausbildung getroffen werden; die Verantwortung hierfür liegt bei den Kundinnen und Kunden. Im Übrigen
                  haften wir unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach den zwingenden gesetzlichen
                  Bestimmungen (insbesondere bei Verletzung von Leben, Körper und Gesundheit). Bei einfacher
                  Fahrlässigkeit haften wir nur bei Verletzung einer wesentlichen Vertragspflicht und begrenzt auf den
                  vertragstypischen, vorhersehbaren Schaden.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className={h2} style={serif}>9. Datenschutz</h2>
                <p>
                  Informationen zur Verarbeitung deiner personenbezogenen Daten findest du in unserer{' '}
                  <Link to="/datenschutz" className={a}>Datenschutzerklärung</Link>.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className={h2} style={serif}>10. Schlussbestimmungen</h2>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts; zwingende
                  Verbraucherschutzvorschriften des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat,
                  bleiben unberührt. Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der
                  übrigen Bestimmungen unberührt.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className={h2} style={serif}>11. Änderungen der AGB</h2>
                <p>
                  Robert Wagner behält sich das Recht vor, diese AGB jederzeit anzupassen. Für bereits geschlossene
                  Verträge gilt die zum Zeitpunkt des Vertragsschlusses gültige Fassung. Die jeweils aktuelle Version
                  ist auf dieser Website einsehbar.
                </p>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
