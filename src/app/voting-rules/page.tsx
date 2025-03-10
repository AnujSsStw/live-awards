import { Button } from "@/components/ui/button";
import { Trophy, Users } from "lucide-react";
import Link from "next/link";

export default function VotingRules() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-8 text-3xl font-bold">Regeln für die Teilnahme</h1>

          <div className="prose prose-lg dark:prose-invert max-w-3xl space-y-6 text-muted-foreground">
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                1. Teilnahmevoraussetzungen
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Nur TikTok-Streamer aus Deutschland, Österreich und der
                  Schweiz dürfen teilnehmen.
                </li>
                <li>Du musst mindestens 18 Jahre alt sein.</li>
                <li>
                  Du benötigst einen aktiven TikTok-Account und musst regelmäßig
                  Live-Streams durchführen.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                2. Abstimmungen
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Du darfst alle 24 Stunden für deinen Lieblings-Streamer
                  abstimmen.
                </li>
                <li>
                  Mehrere Abstimmungen von verschiedenen TikTok-Konten durch die
                  gleiche Person sind nicht erlaubt und können zum Ausschluss
                  des Streamers führen.
                </li>
                <li>
                  Die Userstimmen machen 50% der Gesamtbewertung aus, die andere
                  Hälfte wird von einer Fachjury vergeben.
                </li>
                <li>
                  Unsere Plattform verwendet einen eigens entwickelten
                  Algorithmus, der Betrug verhindert und sicherstellt, dass alle
                  Stimmen fair gezählt werden.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                3. Betrugsprävention
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  IP-Wechsler und VPNs sind verboten. Diese sind nicht nur
                  nutzlos, sondern können zum Ausschluss führen, wenn sie zum
                  Betrug eingesetzt werden.
                </li>
                <li>
                  Jede Form von Manipulation, wie etwa die Verwendung von
                  gefälschten Accounts oder Abstimmungen, wird streng bestraft.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                4. Recht auf Änderung und Ausschluss
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Wir behalten uns das Recht vor, Streamer, die gegen die Regeln
                  verstoßen, jederzeit vom Wettbewerb auszuschließen.
                </li>
                <li>
                  Ebenso behalten wir uns vor, den Ablauf des Awards,
                  einschließlich der Abstimmungen und der Vergabe von Preisen,
                  zu ändern, falls dies notwendig wird.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                5. Preise und Gewinnausschüttung
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Die ausgelobten Preise sind nicht übertragbar und können nicht
                  in bar ausgezahlt werden. Ein Rechtsanspruch auf einen Preis
                  besteht nicht.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                6. Haftungsausschluss
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Wir übernehmen keine Haftung für technische Probleme, die
                  während der Teilnahme auftreten können. Bei Problemen mit der
                  Abstimmung oder den Ergebnissen wird der Betreiber der Website
                  den bestmöglichen Support leisten.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                7. Datenschutz
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Deine personenbezogenen Daten werden gemäß unserer
                  Datenschutzerklärung verarbeitet und geschützt.
                </li>
              </ul>
            </section>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/tiktok-live-streamer-rangliste">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  <Trophy className="h-5 w-5" />
                  Zur Rangliste
                </Button>
              </Link>
              <Link href="/tiktok-live-streamer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 text-foreground sm:w-auto"
                >
                  <Users className="h-5 w-5" />
                  Zu den Streamern
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
