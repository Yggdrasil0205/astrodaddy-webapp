import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function Widerruf() {
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
            <h1 lang="de" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-[#F0E6C8] break-words hyphens-auto" style={serif}>
              Widerrufsbelehrung
            </h1>

            <div className="space-y-8 text-[#F0E6C8]/80 leading-relaxed">
              <p className="text-sm text-[#F0E6C8]/60">
                Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend
                weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können.
              </p>

              {/* Widerrufsrecht */}
              <section>
                <h2 className={h2} style={serif}>Widerrufsrecht</h2>
                <p className="mb-3">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die
                  Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                </p>
                <p className="mb-3">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                </p>
                <p className="mb-3 pl-4">
                  Robert Wagner<br />
                  Westliche Ringstraße 25<br />
                  91781 Weißenburg i. Bay.<br />
                  E-Mail: info@astroversity.academy
                </p>
                <p className="mb-3">
                  mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über
                  Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das untenstehende
                  Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
                </p>
                <p>
                  Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
                  Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                </p>
              </section>

              {/* Folgen des Widerrufs */}
              <section>
                <h2 className={h2} style={serif}>Folgen des Widerrufs</h2>
                <p className="mb-3">
                  Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
                  unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung
                  über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir
                  dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit
                  Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
                  Rückzahlung Entgelte berechnet.
                </p>
                <p>
                  Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie
                  uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von
                  der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten
                  Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
                </p>
              </section>

              {/* Vorzeitiges Erlöschen */}
              <section>
                <h2 className={h2} style={serif}>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
                <p className="mb-3">
                  Ihr Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen vorzeitig, wenn wir
                  die Dienstleistung vollständig erbracht haben und mit der Ausführung der Dienstleistung erst begonnen
                  haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben und gleichzeitig Ihre Kenntnis davon
                  bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung durch uns verlieren.
                </p>
                <p>
                  Bei einem Vertrag über die Lieferung von nicht auf einem körperlichen Datenträger befindlichen
                  digitalen Inhalten (z. B. herunterladbare Readings oder Workbooks) erlischt Ihr Widerrufsrecht auch
                  dann, wenn wir mit der Ausführung des Vertrags begonnen haben, nachdem Sie ausdrücklich zugestimmt
                  haben, dass wir mit der Ausführung vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon
                  bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrags Ihr
                  Widerrufsrecht verlieren.
                </p>
              </section>

              {/* Muster-Widerrufsformular */}
              <section>
                <h2 className={h2} style={serif}>Muster-Widerrufsformular</h2>
                <p className="mb-4 text-sm text-[#F0E6C8]/60">
                  (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es
                  zurück.)
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-[#F0E6C8]/80 space-y-2">
                  <p>
                    An Robert Wagner, Westliche Ringstraße 25, 91781 Weißenburg i. Bay.,
                    E-Mail: info@astroversity.academy:
                  </p>
                  <p>
                    Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der
                    folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*):
                  </p>
                  <p className="break-all">_______________________________________________</p>
                  <p>Bestellt am (*)/erhalten am (*): _____________________</p>
                  <p>Name des/der Verbraucher(s): _____________________</p>
                  <p>Anschrift des/der Verbraucher(s): _____________________</p>
                  <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): _____________________</p>
                  <p>Datum: _____________________</p>
                  <p className="text-sm text-[#F0E6C8]/50">(*) Unzutreffendes streichen.</p>
                </div>
              </section>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
