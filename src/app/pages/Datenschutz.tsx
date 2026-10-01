import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#F0E6C8]" style={serif}>
              Datenschutzerklärung
            </h1>

            <div className="space-y-8 text-[#F0E6C8]/80 leading-relaxed">
              {/* 1 */}
              <section>
                <h2 className={h2} style={serif}>1. Allgemeine Hinweise</h2>
                <p>
                  Der Schutz deiner persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten deine Daten
                  ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO). In dieser Datenschutzerklärung
                  informieren wir dich über die wichtigsten Aspekte der Datenverarbeitung im Rahmen dieser Website
                  (astroversity.academy), unserer Beratungen und Ausbildungen sowie unseres Online-Shops.
                </p>
              </section>

              {/* 2 */}
              <section>
                <h2 className={h2} style={serif}>2. Verantwortliche Stelle</h2>
                <p className="mb-2">Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                <p>
                  Robert Wagner<br />
                  Westliche Ringstraße 25<br />
                  91781 Weißenburg i. Bay.<br />
                  E-Mail: info@astroversity.academy<br />
                  Telefon: 01520 / 2099560
                </p>
              </section>

              {/* 3 */}
              <section>
                <h2 className={h2} style={serif}>3. Welche Daten wir verarbeiten</h2>
                <p className="mb-3">
                  Abhängig davon, wie du unsere Website nutzt, verarbeiten wir folgende personenbezogene Daten:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Vor- und Nachname</li>
                  <li>Geburtsdatum, Geburtsort und Geburtszeit (für astrologische Analysen und Beratungen)</li>
                  <li>Kontaktdaten (E-Mail-Adresse, Telefonnummer)</li>
                  <li>Rechnungsdaten (für Bestellungen und Buchungen)</li>
                  <li>Zahlungsdaten (werden ausschließlich durch unseren Zahlungsdienstleister verarbeitet, siehe Punkt 7)</li>
                  <li>Zugangsdaten deines Kundenkontos (E-Mail-Adresse und verschlüsseltes Passwort)</li>
                  <li>Technische Zugriffsdaten (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs)</li>
                </ul>
              </section>

              {/* 4 */}
              <section>
                <h2 className={h2} style={serif}>4. Zwecke und Rechtsgrundlagen</h2>
                <p className="mb-3">Wir verarbeiten deine Daten zu folgenden Zwecken:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bereitstellung der astrologischen Beratung, Analysen und Ausbildung (Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung)</li>
                  <li>Abwicklung von Bestellungen, Zahlungen und Rechnungsstellung (Art. 6 Abs. 1 lit. b und lit. c DSGVO)</li>
                  <li>Verwaltung deines Kundenkontos und des Mitgliederbereichs (Art. 6 Abs. 1 lit. b DSGVO)</li>
                  <li>Beantwortung deiner Anfragen (Art. 6 Abs. 1 lit. b und lit. f DSGVO)</li>
                  <li>Versand unseres Newsletters, sofern du eingewilligt hast (Art. 6 Abs. 1 lit. a DSGVO)</li>
                  <li>Betrieb, Sicherheit und Optimierung unserer Website (Art. 6 Abs. 1 lit. f DSGVO)</li>
                </ul>
              </section>

              {/* 5 */}
              <section>
                <h2 className={h2} style={serif}>5. Hosting</h2>
                <p>
                  Diese Website wird bei der Vercel Inc. gehostet. Beim Aufruf der Website werden technisch notwendige
                  Zugriffsdaten (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs) verarbeitet, um die Auslieferung der
                  Seite und die Sicherheit des Betriebs zu gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Weitere
                  Informationen:{' '}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={a}>
                    vercel.com/legal/privacy-policy
                  </a>.
                </p>
              </section>

              {/* 6 */}
              <section>
                <h2 className={h2} style={serif}>6. Datenbank und Nutzerkonten</h2>
                <p>
                  Für die Speicherung von Bestell-, Konto- und Anmeldedaten nutzen wir Supabase. Dort werden die zur
                  Vertrags- und Kontoverwaltung erforderlichen Daten gespeichert (Art. 6 Abs. 1 lit. b DSGVO). Weitere
                  Informationen:{' '}
                  <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className={a}>
                    supabase.com/privacy
                  </a>.
                </p>
              </section>

              {/* 7 */}
              <section>
                <h2 className={h2} style={serif}>7. Zahlungsabwicklung</h2>
                <p>
                  Zahlungen werden über den Zahlungsdienstleister Mollie B.V. abgewickelt. Die für die Zahlung
                  erforderlichen Daten (z. B. Name, Rechnungsbetrag, Zahlungsmittel) werden direkt an Mollie übermittelt
                  und dort verarbeitet; vollständige Zahlungsdaten wie Kartendaten erhalten und speichern wir nicht
                  (Art. 6 Abs. 1 lit. b DSGVO). Weitere Informationen:{' '}
                  <a href="https://www.mollie.com/privacy" target="_blank" rel="noopener noreferrer" className={a}>
                    mollie.com/privacy
                  </a>.
                </p>
              </section>

              {/* 8 */}
              <section>
                <h2 className={h2} style={serif}>8. Rechnungsstellung</h2>
                <p>
                  Für die Erstellung und den Versand von Rechnungen nutzen wir lexoffice (Haufe-Lexware GmbH &amp; Co.
                  KG). Dabei werden die rechnungsrelevanten Daten (Name, Anschrift, Leistung, Betrag) verarbeitet und
                  gemäß den gesetzlichen Aufbewahrungspflichten gespeichert (Art. 6 Abs. 1 lit. c DSGVO). Weitere
                  Informationen:{' '}
                  <a href="https://www.lexoffice.de/datenschutz/" target="_blank" rel="noopener noreferrer" className={a}>
                    lexoffice.de/datenschutz
                  </a>.
                </p>
              </section>

              {/* 9 */}
              <section>
                <h2 className={h2} style={serif}>9. E-Mail-Versand</h2>
                <p>
                  Für den Versand von Bestellbestätigungen, Rechnungen und sonstiger E-Mail-Kommunikation nutzen wir die
                  E-Mail-Infrastruktur der IONOS SE. Dabei werden deine E-Mail-Adresse und der Inhalt der Nachricht
                  verarbeitet (Art. 6 Abs. 1 lit. b und lit. f DSGVO). Weitere Informationen:{' '}
                  <a href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" className={a}>
                    ionos.de/terms-gtc/datenschutzerklaerung
                  </a>.
                </p>
              </section>

              {/* 10 */}
              <section>
                <h2 className={h2} style={serif}>10. Mitgliedschaft und Community</h2>
                <p>
                  Für den Zugang zur „Astroversity Academy"-Mitgliedschaft nutzen wir die Plattform Skool. Buchst du
                  eine Mitgliedschaft, übermitteln wir deine E-Mail-Adresse an Skool, um dir eine Einladung zur
                  Community zuzusenden (Art. 6 Abs. 1 lit. b DSGVO). Für die weitere Verarbeitung auf der Plattform ist
                  Skool verantwortlich. Weitere Informationen:{' '}
                  <a href="https://www.skool.com/privacy" target="_blank" rel="noopener noreferrer" className={a}>
                    skool.com/privacy
                  </a>.
                </p>
              </section>

              {/* 11 */}
              <section>
                <h2 className={h2} style={serif}>11. Eingebettete Videos</h2>
                <p>
                  Auf unserer Website binden wir Videos über den Dienst Loom ein. Diese werden erst geladen, wenn du sie
                  aktiv startest. Beim Abspielen können Daten an den Anbieter übertragen werden. Weitere Informationen:{' '}
                  <a href="https://www.loom.com/privacy" target="_blank" rel="noopener noreferrer" className={a}>
                    loom.com/privacy
                  </a>.
                </p>
              </section>

              {/* 12 */}
              <section>
                <h2 className={h2} style={serif}>12. Cookies und Einwilligung</h2>
                <p>
                  Wir verwenden technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind (z. B.
                  zur Speicherung deiner Cookie-Einstellungen und deiner Anmeldung). Optionale Cookies für
                  Funktionalität, Statistik oder Marketing werden ausschließlich gesetzt, wenn du über unseren
                  Cookie-Banner eingewilligt hast (Art. 6 Abs. 1 lit. a DSGVO). Deine Einwilligung kannst du jederzeit
                  mit Wirkung für die Zukunft widerrufen bzw. deine Auswahl über den Cookie-Banner ändern.
                </p>
              </section>

              {/* 13 */}
              <section>
                <h2 className={h2} style={serif}>13. Newsletter</h2>
                <p>
                  Wenn du dich für unseren Newsletter anmeldest, verwenden wir deine E-Mail-Adresse auf Grundlage deiner
                  Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) ausschließlich zum Versand von Informationen zu unseren
                  Angeboten und Inhalten. Du kannst dich jederzeit über den Abmeldelink in jeder Newsletter-E-Mail
                  wieder abmelden.
                </p>
              </section>

              {/* 14 */}
              <section>
                <h2 className={h2} style={serif}>14. Dauer der Datenspeicherung</h2>
                <p>
                  Wir speichern deine personenbezogenen Daten nur so lange, wie es für die jeweiligen Zwecke
                  erforderlich ist oder gesetzliche Aufbewahrungspflichten (insbesondere steuer- und handelsrechtliche
                  Fristen für Rechnungen) dies vorschreiben. Danach werden die Daten gelöscht.
                </p>
              </section>

              {/* 15 */}
              <section>
                <h2 className={h2} style={serif}>15. Deine Rechte</h2>
                <p className="mb-3">Dir stehen gegenüber uns folgende Rechte hinsichtlich deiner personenbezogenen Daten zu:</p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Recht auf Widerspruch (Art. 21 DSGVO) sowie Widerruf erteilter Einwilligungen</li>
                </ul>
                <p>
                  Zur Geltendmachung deiner Rechte wende dich bitte an:{' '}
                  <a href="mailto:info@astroversity.academy" className={a}>info@astroversity.academy</a>. Außerdem steht
                  dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
                </p>
              </section>

              {/* 16 */}
              <section>
                <h2 className={h2} style={serif}>16. Änderungen dieser Datenschutzerklärung</h2>
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder
                  Änderungen unserer Dienste anzupassen. Die jeweils aktuelle Version ist auf dieser Website einsehbar.
                </p>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
