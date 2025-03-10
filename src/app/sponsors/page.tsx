import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, Mic2, MonitorPlay, ArrowRight } from "lucide-react";
import Link from "next/link";
import { sponsors } from "@/constants";

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function Sponsors() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Trophy Image Card */}
        <div className="mb-12 flex flex-col items-center">
          <h2 className="mb-6 text-2xl font-bold text-primary">
            Digital Popcorn Live Stream Award 2025
          </h2>
          <Card className="card-hover w-[400px] overflow-hidden">
            <CardContent className="p-6">
              <img
                src="/digital-popcorn-trophy.jpg"
                alt="Digital Popcorn Trophy"
                className="h-auto w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            </CardContent>
          </Card>
        </div>

        <h1 className="mb-12 text-4xl font-bold">Preise & Sponsoren</h1>

        {/* Prizes Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">
            🏆 Preise pro Kategorie
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="card-hover">
              <CardHeader className="text-xl font-bold text-primary">
                Digital Popcorn Trophäe
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-lg">Exklusive Award Trophäe</p>
                <p className="text-muted-foreground">
                  Symbol für herausragende Streaming-Leistungen
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-xl font-bold text-primary">
                Hauptpreis
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-3xl font-bold">500 €</p>
                <p className="text-muted-foreground">
                  Preisgeld für den Gewinner
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-xl font-bold text-primary">
                Mikrofon
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-lg">Premium Mikrofon</p>
                <p className="text-muted-foreground">Von RØDE</p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-xl font-bold text-primary">
                Stream Deck
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-lg">Professionelles Stream Deck</p>
                <p className="text-muted-foreground">Von Elgato</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="py-12">
          <h2 className="mb-6 text-2xl font-semibold">🤝 Unsere Sponsoren</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {sponsors.map((sponsor) => {
              const Icon = sponsor.icon;
              return (
                <Card
                  key={sponsor.name}
                  className="card-hover group relative overflow-hidden"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">{sponsor.name}</h3>
                    </div>
                    <p className="mb-6 text-muted-foreground">
                      {truncateText(sponsor.description, 50)}
                    </p>
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant="secondary"
                        className="button-hover w-full bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        Zum Sponsor
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Become a Sponsor Section */}
        <section className="py-12">
          <Card className="relative overflow-hidden border-2 border-primary">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Werden Sie Sponsor</h2>
                  <p className="max-w-xl text-muted-foreground">
                    Präsentieren Sie Ihre Marke bei der ersten TikTok Live
                    Streamer Award Show im DACH-Raum. Nur 9 Sponsoren-Plätze für
                    2025 verfügbar!
                  </p>
                </div>
                <Link href="/sponsor-werden">
                  <Button size="lg" className="gap-2">
                    Jetzt Sponsor werden
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
