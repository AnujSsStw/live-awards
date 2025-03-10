import { Card, CardContent } from "@/components/ui/card";

export default function Imprint() {
  return (
    <div className="min-h-screen scroll-smooth pt-24">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Impressum</h1>
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <div className="space-y-6">
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  Angaben gemäß Digitale-Dienste-Gesetz (DDG)
                </h2>
                <p className="text-foreground">
                  Digital Popcorn
                  <br />
                  Kai Bothstede
                  <br />
                  Dorfstrasse 15
                  <br />
                  21514 Fitzen
                  <br />
                  Deutschland
                </p>
                <p className="text-foreground">
                  <strong className="text-foreground">Email:</strong>{" "}
                  kontakt@live-stream-awards.de
                  <br />
                  <strong className="text-foreground">Tel:</strong> +49 175 802
                  802 8
                </p>
                <p className="text-foreground">
                  <strong className="text-foreground">Steuernummer:</strong>{" "}
                  27/009/15863
                  <br />
                  Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine
                  Umsatzsteuer berechnet.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Inhaltlich Verantwortlicher im Sinne des § 18 MStV:
                </h3>
                <p className="text-foreground">Kai Bothstede</p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Jugendschutzbeauftragter im Sinne des § 7 JMSTV:
                </h3>
                <p className="text-foreground">
                  Oliver Lamp (jsb@live-stream-awards.de)
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Datenschutzbeauftragter:
                </h3>
                <p className="text-foreground">
                  Daniel Ruf (datenschutz@live-stream-awards.de)
                </p>
                <p className="text-foreground">
                  Für Auskünfte und Anregungen zum Thema Datenschutz stehen wir
                  bzw. unser Datenschutzbeauftragter gerne zur Verfügung.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Behörden Anfragen:
                </h3>
                <p className="text-foreground">
                  Anfragen von Strafverfolgungsbehörden sollten uns bitte unter:
                  gov@live-stream-awards.de erreichen.
                  <br />
                  Wir antworten nicht auf E-Mails an diese Adresse, die nicht
                  von Vertretern einer Strafverfolgungsbehörde stammen.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Alternative Streitbeilegung:
                </h3>
                <p className="text-foreground">
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit, die Sie unter{" "}
                  <a
                    href="http://ec.europa.eu/consumers/odr/"
                    className="text-primary hover:underline"
                  >
                    http://ec.europa.eu/consumers/odr/
                  </a>{" "}
                  finden.
                </p>
                <p className="text-foreground">
                  Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle sind wir nicht verpflichtet und
                  nicht bereit.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Haftung für Inhalte
                </h3>
                <p className="text-foreground">
                  Als Diensteanbieter sind wir für eigene Inhalte auf diesen
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind
                  als Diensteanbieter jedoch nicht verpflichtet, übermittelte
                  oder gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p className="text-foreground">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Haftung für Links
                </h3>
                <p className="text-foreground">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
                  zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="text-foreground">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten
                  ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                  nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Urheberrecht
                </h3>
                <p className="text-foreground">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                  diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers. Downloads und Kopien dieser Seite sind nur für den
                  privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-foreground">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                  erstellt wurden, werden die Urheberrechte Dritter beachtet.
                  Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                  Sollten Sie trotzdem auf eine Urheberrechtsverletzung
                  aufmerksam werden, bitten wir um einen entsprechenden Hinweis.
                  Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                  Inhalte umgehend entfernen.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
