import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen scroll-smooth pt-24">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          Allgemeine Geschäftsbedingungen (AGB)
        </h1>
        <Card>
          <CardContent className="prose dark:prose-invert max-w-none p-6">
            <div className="space-y-6 text-foreground">
              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  1. Geltungsbereich
                </h2>
                <p className="text-foreground">
                  Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung
                  der Website Live-Stream-Awards.de und die Teilnahme am Digital
                  Popcorn Live Stream Award 2025. Mit der Registrierung auf
                  unserer Website akzeptieren Sie diese Bedingungen.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  2. Teilnahmebedingungen
                </h2>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  2.1 Teilnahmevoraussetzungen
                </h3>
                <p className="text-foreground">
                  Die Teilnahme am Digital Popcorn Live Stream Award 2025 ist
                  kostenlos und steht allen TikTok Live-Streamern aus
                  Deutschland, Österreich und der Schweiz offen, die:
                </p>
                <ul className="mt-2 list-disc pl-6 text-foreground">
                  <li>das 18. Lebensjahr vollendet haben,</li>
                  <li>einen aktiven TikTok-Account besitzen,</li>
                  <li>regelmäßig Live-Streams durchführen.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  3. Abstimmen für Live Streamer
                </h2>
                <p className="text-foreground">
                  Die Teilnahme an den Abstimmungen für Live Streamer ist auf
                  eine Stimme pro Nutzer und Abstimmung beschränkt. Jeder Nutzer
                  darf nur einmal abstimmen, unabhängig davon, wie viele
                  TikTok-Accounts er besitzt.
                </p>
                <p className="mt-2 text-foreground">
                  <strong className="text-foreground">
                    Missbrauch der Abstimmung:
                  </strong>{" "}
                  Das Mehrfachabstimmen durch den Einsatz mehrerer TikTok-Konten
                  zur Erhöhung der Stimmenzahl ist untersagt. Wird festgestellt,
                  dass ein Nutzer mehrere Accounts zum Abstimmen verwendet hat,
                  behalten wir uns das Recht vor, den betreffenden Streamer vom
                  Wettbewerb auszuschließen. In diesem Fall kann auch der
                  Nutzer, der den Missbrauch begangen hat, von zukünftigen
                  Abstimmungen ausgeschlossen werden.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  4. Bewertungsprozess
                </h2>
                <p className="text-foreground">
                  Die Bewertung erfolgt durch registrierte Nutzer und eine
                  Fachjury. Die Gesamtbewertung setzt sich aus verschiedenen
                  Kriterien zusammen, die auf unserer Website einsehbar sind.
                  Die finale Entscheidung der Jury ist bindend.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  5. Preise und Gewinnausschüttung
                </h2>
                <p className="text-foreground">
                  Die ausgelobten Preise werden wie auf der Website beschrieben
                  vergeben. Ein Rechtsanspruch auf Gewinnausschüttung besteht
                  nicht. Die Preise sind nicht übertragbar und können nicht in
                  bar ausgezahlt werden.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  6. Rechte und Pflichten
                </h2>
                <p className="text-foreground">
                  Mit der Teilnahme räumen Sie uns das Recht ein, Ihren
                  Nutzernamen, Profilbild und Stream-Ausschnitte im Rahmen der
                  Award-Verleihung und der damit verbundenen
                  Öffentlichkeitsarbeit zu verwenden.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  7. Änderungen und Absagen
                </h2>
                <p className="text-foreground">
                  Wir behalten uns das Recht vor, den Award oder Teile davon zu
                  ändern, zu verschieben oder abzusagen, wenn Umstände dies
                  erforderlich machen. In diesem Fall werden alle Teilnehmer
                  umgehend informiert.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  8. Haftung
                </h2>
                <p className="text-foreground">
                  Wir übernehmen keine Haftung für technische Störungen oder
                  Ausfälle, die die Teilnahme oder Bewertung beeinträchtigen
                  könnten. Die Haftung für Vorsatz und grobe Fahrlässigkeit
                  bleibt unberührt.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  9. Datenschutz
                </h2>
                <p className="text-foreground">
                  Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer
                  Datenschutzerklärung und den geltenden Datenschutzgesetzen.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  10. Schlussbestimmungen
                </h2>
                <p className="text-foreground">
                  Es gilt das Recht der Bundesrepublik Deutschland. Sollten
                  einzelne Bestimmungen dieser AGB unwirksam sein oder werden,
                  bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                </p>
                <p className="mt-4 text-foreground">
                  Mit der Teilnahme am Digital Popcorn Live Stream Award 2025
                  und der Nutzung unserer Website bestätigen Sie, dass Sie diese
                  AGB gelesen und verstanden haben und ihnen zustimmen.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
