import { Button } from "@/components/ui/button";
import { AlertTriangle, Mail } from "lucide-react";
import Link from "next/link";

export default function ReportAbuse() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Missbrauch melden
            </h1>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-3xl space-y-6 text-muted-foreground">
            <p>
              Wir setzen auf Fairness und Transparenz bei den Digital Popcorn
              Live Stream Awards 2025. Sollte dir auffallen, dass gegen die
              Regeln verstoßen wird, z. B. durch Betrug, Mehrfachabstimmungen
              oder andere unfaire Praktiken, kannst du uns den Vorfall melden.
              Wir nehmen jede Meldung ernst und werden entsprechende Maßnahmen
              ergreifen.
            </p>

            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              So kannst du Missbrauch melden:
            </h2>

            <div className="space-y-6">
              <section>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  1. Meldung über das Kontaktformular:
                </h3>
                <p>
                  Nutze unser{" "}
                  <Link href="/contact">
                    <span className="cursor-pointer text-primary hover:underline">
                      Kontaktformular
                    </span>
                  </Link>{" "}
                  und gib die relevanten Informationen zu dem Vorfall an.
                  Beschreibe den Missbrauch so genau wie möglich, damit wir
                  schnell handeln können.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  2. Angaben zur betroffenen Person:
                </h3>
                <p>
                  Gib den Namen des Streamers oder Accounts an, von dem du
                  glaubst, dass er gegen die Regeln verstößt. Wenn möglich, füge
                  auch Beweise oder Screenshots bei, die deinen Verdacht
                  untermauern.
                </p>
              </section>

              <section>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  3. Anonymität:
                </h3>
                <p>
                  Du kannst uns auch anonym kontaktieren, aber wir empfehlen,
                  uns deine Kontaktdaten mitzuteilen, falls wir Rückfragen haben
                  oder dich über die Bearbeitung informieren müssen.
                </p>
              </section>
            </div>

            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              Was passiert nach einer Meldung?
            </h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                Jede Meldung wird gründlich geprüft. Falls Missbrauch
                festgestellt wird, ergreifen wir entsprechende Maßnahmen, die
                von einer Verwarnung bis zum Ausschluss des Streamers aus dem
                Wettbewerb reichen können.
              </li>
              <li>
                Alle Meldungen werden vertraulich behandelt und nur im Rahmen
                der Überprüfung des Vorfalls verwendet.
              </li>
            </ul>

            <h2 className="mb-4 mt-8 text-2xl font-semibold text-foreground">
              Warum ist das wichtig?
            </h2>
            <p>
              Missbrauch beeinträchtigt den Wettbewerb und verzerrt die
              Ergebnisse. Um sicherzustellen, dass jeder Streamer fair bewertet
              wird und der Digital Popcorn Live Stream Award transparent bleibt,
              ist es wichtig, dass alle Teilnehmer und Zuschauer ihren Beitrag
              leisten, um unfaire Praktiken zu verhindern.
            </p>

            <div className="mt-8 rounded-lg bg-muted/30 p-6">
              <h3 className="mb-4 text-xl font-semibold text-foreground">
                Danke für deine Mithilfe!
              </h3>
              <p>
                Wir schätzen deine Unterstützung, um die Digital Popcorn Live
                Stream Awards zu einem fairen und spannenden Wettbewerb zu
                machen.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  <Mail className="h-5 w-5" />
                  Zum Kontaktformular
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
