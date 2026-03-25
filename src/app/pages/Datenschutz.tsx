import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Datenschutz() {
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
              Datenschutzerklärung
            </h1>

            <div className="space-y-8 text-[#1b2a23]/90">
              {/* Einleitung */}
              <section>
                <p className="mb-4">
                  Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer personenbezogenen Daten ist 
                  uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
                </p>
                <p>
                  Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </section>

              {/* 1. Verantwortliche Stelle */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  1. Verantwortliche Stelle
                </h2>
                <p className="mb-2">
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                </p>
                <p className="mb-2">
                  <strong>[VOLLSTÄNDIGER NAME / FIRMENNAME]</strong><br />
                  [STRAßE UND HAUSNUMMER]<br />
                  [PLZ] [ORT]<br />
                  [LAND]
                </p>
                <p>
                  Telefon: [TELEFONNUMMER]<br />
                  E-Mail: [E-MAIL-ADRESSE]
                </p>
              </section>

              {/* 2. Datenschutzbeauftragter */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  2. Datenschutzbeauftragter
                </h2>
                <p>
                  <em>[Falls vorhanden:]</em><br />
                  [NAME DES DATENSCHUTZBEAUFTRAGTEN]<br />
                  [KONTAKTDATEN]<br />
                  E-Mail: [DATENSCHUTZ-E-MAIL]
                </p>
              </section>

              {/* 3. Allgemeine Hinweise */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  3. Allgemeine Hinweise zur Datenverarbeitung
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">3.1 Umfang der Verarbeitung personenbezogener Daten</h3>
                <p className="mb-4">
                  Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung 
                  einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung 
                  personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in 
                  solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht 
                  möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">3.2 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person 
                  einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage.
                </p>
                <p className="mb-4">
                  Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages erforderlich ist, 
                  dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage.
                </p>
                <p className="mb-4">
                  Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung 
                  erforderlich ist, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage.
                </p>
                <p className="mb-4">
                  Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten 
                  erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das 
                  erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">3.3 Datenlöschung und Speicherdauer</h3>
                <p>
                  Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der 
                  Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen 
                  oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften 
                  vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten 
                  Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren 
                  Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.
                </p>
              </section>

              {/* 4. Bereitstellung der Website */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  4. Bereitstellung der Website und Erstellung von Logfiles
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">4.1 Hosting</h3>
                <p className="mb-4">
                  Unsere Website wird gehostet bei:<br />
                  <strong>do.de (Dominik Ebert e.K. - Domain-Offensive)</strong><br />
                  Neue Weilheimer Str. 14<br />
                  73230 Kirchheim unter Teck, Deutschland<br />
                  Datenschutzerklärung: <a href="https://www.do.de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">do.de/datenschutz</a>
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">4.2 Beschreibung und Umfang der Datenverarbeitung</h3>
                <p className="mb-4">
                  Bei jedem Aufruf unserer Website erfasst unser System automatisiert Daten und Informationen vom 
                  Computersystem des aufrufenden Rechners. Folgende Daten werden hierbei erhoben:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Informationen über den Browsertyp und die verwendete Version</li>
                  <li>Das Betriebssystem des Nutzers</li>
                  <li>Den Internet-Service-Provider des Nutzers</li>
                  <li>Die IP-Adresse des Nutzers</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Websites, von denen das System des Nutzers auf unsere Website gelangt</li>
                  <li>Websites, die vom System des Nutzers über unsere Website aufgerufen werden</li>
                </ul>
                <p className="mb-4">
                  Die Daten werden ebenfalls in den Logfiles unseres Systems gespeichert. Eine Speicherung dieser Daten 
                  zusammen mit anderen personenbezogenen Daten des Nutzers findet nicht statt.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">4.3 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Rechtsgrundlage für die vorübergehende Speicherung der Daten und der Logfiles ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">4.4 Zweck der Datenverarbeitung</h3>
                <p className="mb-4">
                  Die vorübergehende Speicherung der IP-Adresse durch das System ist notwendig, um eine Auslieferung der 
                  Website an den Rechner des Nutzers zu ermöglichen. Hierfür muss die IP-Adresse des Nutzers für die Dauer 
                  der Sitzung gespeichert bleiben. Die Speicherung in Logfiles erfolgt, um die Funktionsfähigkeit der 
                  Website sicherzustellen. Zudem dienen uns die Daten zur Optimierung der Website und zur Sicherstellung 
                  der Sicherheit unserer informationstechnischen Systeme.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">4.5 Dauer der Speicherung</h3>
                <p className="mb-4">
                  Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich 
                  sind. Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige 
                  Sitzung beendet ist. Im Falle der Speicherung der Daten in Logfiles ist dies nach spätestens sieben Tagen 
                  der Fall.
                </p>
              </section>

              {/* 5. Cookies */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  5. Verwendung von Cookies
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">5.1 Beschreibung und Umfang</h3>
                <p className="mb-4">
                  Unsere Website verwendet Cookies. Bei Cookies handelt es sich um Textdateien, die im Internetbrowser 
                  bzw. vom Internetbrowser auf dem Computersystem des Nutzers gespeichert werden. Ruft ein Nutzer eine 
                  Website auf, so kann ein Cookie auf dem Betriebssystem des Nutzers gespeichert werden. Dieser Cookie 
                  enthält eine charakteristische Zeichenfolge, die eine eindeutige Identifizierung des Browsers beim 
                  erneuten Aufrufen der Website ermöglicht.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">5.2 Cookie-Kategorien</h3>
                <p className="mb-4">Wir setzen folgende Cookie-Kategorien ein:</p>
                
                <h4 className="font-bold mb-2 text-[#1b2a23]">Notwendige Cookies</h4>
                <p className="mb-4">
                  Diese Cookies sind für den Betrieb der Website zwingend erforderlich. Sie ermöglichen grundlegende 
                  Funktionen wie Seitennavigation, Warenkorb und Zugriff auf geschützte Bereiche. Die Website kann ohne 
                  diese Cookies nicht ordnungsgemäß funktionieren.
                </p>

                <h4 className="font-bold mb-2 text-[#1b2a23]">Funktionale Cookies</h4>
                <p className="mb-4">
                  Diese Cookies ermöglichen erweiterte Funktionalitäten und eine Personalisierung. Sie können von uns 
                  oder von Drittanbietern gesetzt werden, deren Dienste wir auf unseren Seiten verwenden.
                </p>

                <h4 className="font-bold mb-2 text-[#1b2a23]">Analyse-Cookies</h4>
                <p className="mb-4">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem Informationen 
                  anonym gesammelt und gemeldet werden. Mit diesen Informationen können wir die Website optimieren.
                </p>

                <h4 className="font-bold mb-2 text-[#1b2a23]">Marketing-Cookies</h4>
                <p className="mb-4">
                  Diese Cookies werden verwendet, um Besuchern auf Webseiten zu folgen. Die Absicht ist, Anzeigen zu zeigen, 
                  die relevant und ansprechend für den einzelnen Benutzer sind und daher wertvoller für Publisher und 
                  werbetreibende Drittparteien sind.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">5.3 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter Verwendung notwendiger Cookies 
                  ist Art. 6 Abs. 1 lit. f DSGVO. Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten unter 
                  Verwendung von Cookies zu Analysezwecken ist bei Vorliegen einer diesbezüglichen Einwilligung des Nutzers 
                  Art. 6 Abs. 1 lit. a DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">5.4 Widerspruchs- und Beseitigungsmöglichkeit</h3>
                <p>
                  Sie können Ihre Cookie-Einstellungen jederzeit über den Button im Footer unserer Website ändern. 
                  Die meisten Browser sind so eingestellt, dass sie Cookies automatisch akzeptieren. Sie können das 
                  Speichern von Cookies jedoch deaktivieren oder Ihren Browser so einstellen, dass er Sie benachrichtigt, 
                  sobald Cookies gesendet werden.
                </p>
              </section>

              {/* 6. Kontaktformular und E-Mail */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  6. Kontaktformular und E-Mail-Kontakt
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">6.1 Beschreibung und Umfang</h3>
                <p className="mb-4">
                  Auf unserer Website ist ein Kontaktformular vorhanden, welches für die elektronische Kontaktaufnahme 
                  genutzt werden kann. Nimmt ein Nutzer diese Möglichkeit wahr, so werden die in der Eingabemaske 
                  eingegeben Daten an uns übermittelt und gespeichert. Diese Daten sind:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Betreff und Nachricht</li>
                  <li>Zeitpunkt der Absendung</li>
                </ul>
                <p className="mb-4">
                  Alternativ ist eine Kontaktaufnahme über die bereitgestellte E-Mail-Adresse möglich. In diesem Fall 
                  werden die mit der E-Mail übermittelten personenbezogenen Daten des Nutzers gespeichert.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">6.2 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung des Nutzers 
                  Art. 6 Abs. 1 lit. a DSGVO. Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer 
                  Übersendung einer E-Mail übermittelt werden, ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">6.3 Zweck der Datenverarbeitung</h3>
                <p className="mb-4">
                  Die Verarbeitung der personenbezogenen Daten aus der Eingabemaske dient uns allein zur Bearbeitung 
                  der Kontaktaufnahme.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">6.4 Dauer der Speicherung</h3>
                <p>
                  Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr 
                  erforderlich sind. Für die personenbezogenen Daten aus der Eingabemaske des Kontaktformulars und 
                  diejenigen, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die jeweilige Konversation 
                  mit dem Nutzer beendet ist.
                </p>
              </section>

              {/* 7. Shop und Bestellabwicklung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  7. Shop und Bestellabwicklung
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">7.1 Verarbeitung von Bestelldaten</h3>
                <p className="mb-4">
                  Zur Abwicklung von Bestellungen in unserem Online-Shop erheben und verarbeiten wir folgende Daten:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Name und Anschrift</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer (optional)</li>
                  <li>Zahlungsinformationen</li>
                  <li>Bestellhistorie</li>
                  <li>Lieferadresse (falls abweichend)</li>
                </ul>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">7.2 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung bzw. 
                  zur Durchführung vorvertraglicher Maßnahmen.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">7.3 Zahlungsdienstleister</h3>
                <p className="mb-4">
                  Wir setzen zur Zahlungsabwicklung folgende Dienstleister ein:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>
                    <strong>PayPal</strong><br />
                    PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg<br />
                    Datenschutzerklärung: <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">paypal.com/privacy</a>
                  </li>
                  <li>
                    <strong>Klarna</strong><br />
                    Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Schweden<br />
                    Datenschutzerklärung: <a href="https://www.klarna.com/de/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">klarna.com/datenschutz</a>
                  </li>
                  <li>
                    <strong>Sofortüberweisung</strong><br />
                    Klarna Bank AB (publ), Sveavägen 46, 111 34 Stockholm, Schweden<br />
                    Datenschutzerklärung: <a href="https://www.klarna.com/sofort/datenschutz/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">klarna.com/sofort/datenschutz</a>
                  </li>
                  <li>
                    <strong>Apple Pay</strong><br />
                    Apple Distribution International Ltd., Hollyhill Industrial Estate, Hollyhill, Cork, Irland<br />
                    Datenschutzerklärung: <a href="https://www.apple.com/legal/privacy/de-ww/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">apple.com/privacy</a>
                  </li>
                  <li>
                    <strong>Vorkasse / Überweisung</strong><br />
                    Zahlung per Banküberweisung - keine Weitergabe an Dritte
                  </li>
                  <li>
                    <strong>Kauf auf Rechnung</strong><br />
                    Rechnungszahlung - keine Weitergabe an Dritte (außer bei Zahlungsverzug ggf. an Inkassodienstleister)
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">7.4 Speicherdauer</h3>
                <p>
                  Die Daten werden für die Dauer der Vertragsabwicklung und darüber hinaus gemäß gesetzlicher 
                  Aufbewahrungsfristen (in der Regel 10 Jahre nach HGB und AO) gespeichert.
                </p>
              </section>

              {/* 8. Newsletter */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  8. Newsletter
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">8.1 Beschreibung und Umfang</h3>
                <p className="mb-4">
                  Auf unserer Website besteht die Möglichkeit, einen Newsletter zu abonnieren. Dabei werden bei der 
                  Anmeldung die folgenden Daten an uns übermittelt:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>E-Mail-Adresse</li>
                  <li>Name (optional)</li>
                  <li>Zeitpunkt der Anmeldung</li>
                  <li>IP-Adresse zum Zeitpunkt der Anmeldung</li>
                </ul>
                <p className="mb-4">
                  Für die Anmeldung verwenden wir das sog. Double-Opt-In-Verfahren. Nach Ihrer Anmeldung erhalten Sie 
                  eine E-Mail, in der Sie um Bestätigung bitten, dass Sie den Versand des Newsletters wünschen.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">8.2 Newsletter-Dienstleister</h3>
                <p className="mb-4">
                  Der Versand der Newsletter erfolgt mittels:<br />
                  <strong>Mailchimp</strong><br />
                  The Rocket Science Group LLC<br />
                  675 Ponce de Leon Ave NE, Suite 5000<br />
                  Atlanta, GA 30308, USA<br />
                  Datenschutzerklärung: <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">mailchimp.com/legal/privacy</a>
                </p>
                <p className="mb-4">
                  Mailchimp ist ein Dienst, mit dem der Newsletterversand organisiert und analysiert werden kann. 
                  Die von Ihnen zum Zwecke des Newsletterbezugs eingegebenen Daten werden auf den Servern von 
                  Mailchimp in den USA gespeichert. Mailchimp verfügt über eine Zertifizierung nach dem 
                  EU-US-Data Privacy Framework.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">8.3 Rechtsgrundlage</h3>
                <p className="mb-4">
                  Rechtsgrundlage für die Verarbeitung der Daten nach Anmeldung zum Newsletter durch den Nutzer ist 
                  bei Vorliegen einer Einwilligung des Nutzers Art. 6 Abs. 1 lit. a DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">8.4 Widerruf</h3>
                <p>
                  Sie können den Newsletter jederzeit abbestellen. Einen Abmeldelink finden Sie in jedem Newsletter. 
                  Alternativ können Sie Ihren Abmeldewunsch auch per E-Mail an [E-MAIL-ADRESSE] senden.
                </p>
              </section>

              {/* 9. Webanalyse Tools */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  9. Webanalyse-Tools
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">9.1 Google Analytics</h3>
                <p className="mb-4">
                  Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Ireland Limited 
                  ("Google"), Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p className="mb-4">
                  Google Analytics verwendet Cookies. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website 
                  werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="mb-4">
                  Wir haben die IP-Anonymisierung aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von 
                  Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den 
                  Europäischen Wirtschaftsraum zuvor gekürzt.
                </p>
                <p className="mb-4">
                  Die Rechtsgrundlage für den Einsatz von Google Analytics ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
                </p>
                <p className="mb-4">
                  Datenschutzerklärung: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">policies.google.com/privacy</a>
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">9.2 Hotjar</h3>
                <p className="mb-4">
                  Diese Website nutzt Hotjar, einen Webanalysedienst der Hotjar Ltd. („Hotjar"), 
                  Level 2, St Julians Business Centre, 3, Elia Zammit Street, St Julians STJ 1000, Malta, Europa.
                </p>
                <p className="mb-4">
                  Hotjar ermöglicht es uns, das Nutzerverhalten (z.B. Mausklicks, Mausbewegungen, Scrollhöhe etc.) 
                  auf unserer Website zu messen und auszuwerten. Die Informationen, die von dem Cookie über Ihre 
                  Benutzung dieser Website erzeugt werden, werden an einen Server von Hotjar in Irland übertragen 
                  und dort gespeichert.
                </p>
                <p className="mb-4">
                  Die Rechtsgrundlage für den Einsatz von Hotjar ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
                </p>
                <p className="mb-4">
                  Datenschutzerklärung: <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">hotjar.com/privacy</a>
                </p>
              </section>

              {/* 10. Social Media */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  10. Social Media Plugins und Tools
                </h2>
                <p className="mb-4">
                  <em>[Falls Social Media Plugins verwendet werden:]</em><br />
                  Wir setzen auf unserer Website Plugins folgender Social Media Dienste ein:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-1">
                  <li>Facebook (Meta Platforms Ireland Limited)</li>
                  <li>Instagram (Meta Platforms Ireland Limited)</li>
                  <li>LinkedIn (LinkedIn Ireland Unlimited Company)</li>
                  <li>TikTok (TikTok Technology Limited)</li>
                  <li>[WEITERE SOZIALE NETZWERKE]</li>
                </ul>
                <p>
                  Die Plugins sind mit dem jeweiligen Logo gekennzeichnet. Wenn Sie eine Seite unseres Webauftritts 
                  aufrufen, die ein solches Plugin enthält, baut Ihr Browser eine direkte Verbindung zu den Servern 
                  des jeweiligen Anbieters auf.
                </p>
              </section>

              {/* 11. Marketing Tools */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  11. Marketing-Tools
                </h2>
                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">11.1 Facebook Pixel</h3>
                <p className="mb-4">
                  <em>[Falls verwendet:]</em><br />
                  Wir nutzen das Facebook Pixel von Facebook. Dadurch können wir die Nutzer unserer Website gezielt 
                  mit Werbung ansprechen. Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gem. Art. 6 
                  Abs. 1 lit. a DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">11.2 Google Ads</h3>
                <p className="mb-4">
                  <em>[Falls verwendet:]</em><br />
                  Wir nutzen Google Ads zur Schaltung von Werbeanzeigen. Die Verarbeitung erfolgt auf Grundlage Ihrer 
                  Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">11.3 Weitere Marketing-Tools</h3>
                <p>
                  <em>[Falls weitere Tools verwendet werden:]</em><br />
                  [LinkedIn Insight Tag, TikTok Pixel, etc.]
                </p>
              </section>

              {/* 12. Rechte der betroffenen Person */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  12. Rechte der betroffenen Person
                </h2>
                <p className="mb-4">
                  Werden personenbezogene Daten von Ihnen verarbeitet, sind Sie Betroffener i.S.d. DSGVO und es stehen 
                  Ihnen folgende Rechte gegenüber dem Verantwortlichen zu:
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.1 Auskunftsrecht (Art. 15 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob Sie betreffende personenbezogene 
                  Daten verarbeitet werden. Liegt eine solche Verarbeitung vor, können Sie von uns Auskunft über diese 
                  Daten verlangen.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.2 Recht auf Berichtigung (Art. 16 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, von uns unverzüglich die Berichtigung Sie betreffender unrichtiger personenbezogener 
                  Daten zu verlangen. Unter Berücksichtigung der Zwecke der Verarbeitung haben Sie das Recht, die 
                  Vervollständigung unvollständiger personenbezogener Daten zu verlangen.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.3 Recht auf Löschung (Art. 17 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, von uns zu verlangen, dass Sie betreffende personenbezogene Daten unverzüglich 
                  gelöscht werden, sofern einer der gesetzlich vorgesehenen Gründe zutrifft.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.4 Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, von uns die Einschränkung der Verarbeitung zu verlangen, wenn eine der 
                  gesetzlichen Voraussetzungen gegeben ist.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.5 Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, die Sie betreffenden personenbezogenen Daten, die Sie uns bereitgestellt haben, 
                  in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.6 Widerspruchsrecht (Art. 21 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen 
                  die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder 
                  f DSGVO erfolgt, Widerspruch einzulegen.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.7 Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO)</h3>
                <p className="mb-4">
                  Sie haben das Recht, Ihre datenschutzrechtliche Einwilligungserklärung jederzeit zu widerrufen. Durch 
                  den Widerruf der Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf 
                  erfolgten Verarbeitung nicht berührt.
                </p>

                <h3 className="text-xl font-bold mb-2 text-[#1b2a23]">12.8 Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO)</h3>
                <p>
                  Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs steht Ihnen 
                  das Recht auf Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres 
                  Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, zu, wenn Sie der 
                  Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
                </p>
                <p className="mt-4">
                  Die für uns zuständige Datenschutzaufsichtsbehörde ist:<br />
                  <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong><br />
                  Promenade 18<br />
                  91522 Ansbach, Deutschland<br />
                  Telefon: +49 (0) 981 180093-0<br />
                  E-Mail: poststelle@lda.bayern.de<br />
                  Website: <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer" className="text-[#8268AB] hover:underline">www.lda.bayern.de</a>
                </p>
              </section>

              {/* 13. Aktualität und Änderung */}
              <section>
                <h2 className="text-2xl font-bold mb-4 text-[#1b2a23]" style={{ fontFamily: 'henriette, serif' }}>
                  13. Aktualität und Änderung dieser Datenschutzerklärung
                </h2>
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand {new Date().toLocaleDateString('de-DE', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}. Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter 
                  gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung 
                  zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter diesem Link 
                  von Ihnen abgerufen und ausgedruckt werden.
                </p>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}