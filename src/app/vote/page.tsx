import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy, Users } from "lucide-react";

export default function Vote() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold">
            Abstimmen für deinen Favoriten
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-3xl">
            <p className="text-muted-foreground">
              Du kannst alle 24 Stunden für deinen Lieblings-TikTok-Streamer
              abstimmen! Unser eigens entwickelter Algorithmus schützt vor
              Betrug, sodass jede Stimme fair gezählt wird. Sollte jemand
              gesperrt werden oder Votings nicht gezählt werden, liegt das an
              einem gerechtfertigten Grund.
            </p>

            <p className="text-muted-foreground">
              Die Userstimmen machen 50% der Gesamtbewertung aus, während die
              andere Hälfte von der Fachjury vergeben wird. Am Ende kann sich
              also noch einiges ändern, daher lohnt es sich, am Ball zu bleiben!
              Die Jury besteht aus bekannten TikTok-Streamern, die später auf
              der Seite &quot;Live Stream Award Jury&quot; vorgestellt werden.
            </p>

            <p className="text-muted-foreground">
              Du darfst den Voting-Link teilen und in deine Bio einbauen.
              Allerdings sind IP-Wechsler und VPNs verboten, da sie keinen
              sinnvollen Zweck erfüllen. Bei Missbrauch droht der Ausschluss.
            </p>

            <p className="text-muted-foreground">
              Wir setzen auf Fairness und Transparenz, damit jeder Streamer die
              Chance bekommt, gerecht bewertet zu werden.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
                className="w-full gap-2 sm:w-auto"
              >
                <Users className="h-5 w-5" />
                Zu den Streamern
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
