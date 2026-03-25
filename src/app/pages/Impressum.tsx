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
            className="inline-flex items-center gap-2 text-[#8268AB] hover:text-[#BFADD5] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>

          <GlassCard className="rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
              Impressum
            </h1>

            <div className="space-y-8 text-[#1b2a23]/90">
              {/* Angaben gemäß § 5 TMG */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Angaben gemäß § 5 TMG
                </h2>
                <p className="mb-2">
                  <strong>[VOLLSTÄNDIGER NAME / FIRMENNAME]</strong><br />
                  [RECHTSFORM, falls vorhanden]
                </p>
                <p className="mb-2">
                  [STRAßE UND HAUSNUMMER]<br />
                  [PLZ] [ORT]<br />
                  [LAND]
                </p>
              </section>

              {/* Vertreten durch */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Vertreten durch
                </h2>
                <p>
                  Markus Miersbe<br />
                  [FUNKTION/POSITION]
                </p>
              </section>

              {/* Kontakt */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Kontakt
                </h2>
                <p>
                  Telefon: [TELEFONNUMMER]<br />
                  E-Mail: [E-MAIL-ADRESSE]<br />
                  Website: [WEBSITE-URL]
                </p>
              </section>

              {/* Registereintrag */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Registereintrag
                </h2>
                <p>
                  <em>[Falls zutreffend:]</em><br />
                  Eintragung im Handelsregister<br />
                  Registergericht: [REGISTERGERICHT]<br />
                  Registernummer: [REGISTERNUMMER]
                </p>
              </section>

              {/* Umsatzsteuer-ID */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  [UST-ID-NUMMER]
                </p>
              </section>

              {/* Wirtschafts-ID */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Wirtschafts-ID
                </h2>
                <p>
                  <em>[Falls zutreffend:]</em><br />
                  Wirtschafts-Identifikationsnummer: [WIRTSCHAFTS-ID]
                </p>
              </section>

              {/* Berufsbezeichnung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Berufsbezeichnung und berufsrechtliche Regelungen
                </h2>
                <p>
                  <em>[Falls zutreffend, z.B. bei reglementierten Berufen:]</em><br />
                  Berufsbezeichnung: [BERUFSBEZEICHNUNG]<br />
                  Zuständige Kammer: [KAMMER]<br />
                  Verliehen in: [LAND]<br />
                  Es gelten folgende berufsrechtliche Regelungen: [REGELUNGEN]
                </p>
              </section>

              {/* Verantwortlich für den Inhalt */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <p>
                  Markus Miersbe<br />
                  [STRAßE UND HAUSNUMMER]<br />
                  [PLZ] [ORT]
                </p>
              </section>

              {/* EU-Streitschlichtung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  EU-Streitschlichtung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline ml-1">
                    https://ec.europa.eu/consumers/odr/
                  </a>.<br />
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>

              {/* Verbraucherstreitbeilegung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Verbraucherstreitbeilegung / Universalschlichtungsstelle
                </h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
                <p className="mt-4">
                  <em>[Oder falls teilgenommen wird:]</em><br />
                  Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. 
                  Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., 
                  Straßburger Straße 8, 77694 Kehl am Rhein 
                  (<a href="https://www.verbraucher-schlichter.de" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">
                    www.verbraucher-schlichter.de
                  </a>).
                </p>
              </section>

              {/* Haftung für Inhalte */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Haftung für Inhalte
                </h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der 
                  Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </section>

              {/* Haftung für Links */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Haftung für Links
                </h2>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mt-4">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                  Links umgehend entfernen.
                </p>
              </section>

              {/* Urheberrecht */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Urheberrecht
                </h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
                  deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
                  außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors 
                  bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen 
                  Gebrauch gestattet.
                </p>
                <p className="mt-4">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                  Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie 
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden 
                  Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </section>

              {/* Bildnachweise */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  Bildnachweise
                </h2>
                <p>
                  Bilder und Grafiken auf dieser Website stammen von:<br />
                  - Eigene Aufnahmen und Grafiken<br />
                  - Unsplash (unsplash.com) - lizenzfrei<br />
                  - [WEITERE BILDQUELLEN]
                </p>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
