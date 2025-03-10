import { CategoryShowcase } from "@/components/CategoryShowcase";
import { HomeHero } from "@/components/home-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sponsors } from "@/constants";
import { categories } from "@/server/db/schema";
import { api } from "@/trpc/server";

// Helper function for text truncation
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default async function Home() {
  const streamers = await api.streamer.getAllStreamer();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center pt-16">
        <div
          className="absolute inset-0 bg-cover bg-[center_25%] bg-no-repeat"
          style={{ backgroundImage: "url(/header.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />

        <div className="container relative z-10 mx-auto px-4">
          <HomeHero />
        </div>
      </section>

      {/* How it works section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">
            🔥 Wie funktioniert&apos;s?
          </h2>
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
              Streamer können sich kostenlos anmelden, ihre Kategorie wählen und
              sich den Zuschauern vorstellen. Durch ein öffentliches Voting und
              eine Jury-Bewertung werden die interessantesten Streamer jeder
              Kategorie ermittelt. Am Ende des Jahres werden die Gewinner mit
              dem Digital Popcorn Live Stream Award 2025 ausgezeichnet,
              inklusive 500 € Preisgeld, ein professionelles Mikrofon samt
              Mikro-Arm, ein Sounddeck, Kopfhörer und jede Menge Ruhm! 🏆💰
            </p>

            <h2 className="mb-8 text-3xl font-bold">📊 Abstimmung</h2>
            <p className="text-lg text-muted-foreground">
              Die Abstimmung erfolgt zu 50% durch die Community und zu 50% durch
              eine ausgewählte Jury. Die Jury wird in den kommenden Wochen
              bekannt gegeben.
            </p>

            <h2 className="mb-8 text-3xl font-bold">
              🎉 Verleihung im Dezember: Das große Finale!
            </h2>
            <p className="text-lg text-muted-foreground">
              Die Spannung steigt: Im Dezember findet die festliche
              Preisverleihung des Digital Popcorn Live Stream Awards 2025 statt!
              Seid live dabei, wenn die coolsten TikTok Live Streamer des Jahres
              gekürt werden. Jeder hat hier eine Chance! Der/die Gewinner/in
              jeder Kategorie erhält nicht nur den begehrten Award, sondern auch
              einen exklusiven Platz in der Streaming-Community. Wer wird das
              Streaming-Jahr 2025 dominieren und sich den Live Stream Award
              sichern? Schaltet ein und feiert mit uns das große Finale der
              Streaming-Saison! ✨📺
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold">Streaming Kategorien</h2>
          <div className="space-y-8">
            {categories.map((category) => (
              <CategoryShowcase
                key={category}
                category={category}
                streamers={streamers.filter(
                  (streamer) => streamer.category === category,
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-3xl font-bold">Award Sponsoren</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {sponsors.map((sponsor) => {
              const Icon = sponsor.icon;
              return (
                <Card
                  key={sponsor.name}
                  className="group relative overflow-hidden"
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 flex items-center gap-4">
                      <Icon className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-semibold">{sponsor.name}</h3>
                    </div>
                    <p className="mb-6 line-clamp-2 h-12 text-muted-foreground">
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
                        className="w-full bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        Zum Sponsor
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
