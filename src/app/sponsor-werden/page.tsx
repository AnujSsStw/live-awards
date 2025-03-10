"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Gift, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { sponsors } from "@/constants";

// Helper function for text truncation
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const sponsorshipLevels = [
  {
    name: "Sponsoring-Paket",
    price: "2.000€",
    benefits: [
      "Werbung im Newsletter und auf der Award-Website",
      "Werbeeinblendung während der Stimmenabgabe, direkt bei der Teilnahme",
      "Unbegrenzte Klicks und Impressionen",
      "Markierung in allen Social Media Posts zu den Digital Popcorn Live Stream Awards",
      "Präsentation während der Preisverleihung Sichtbarkeit in der Award-Zeremonie",
      "Platz in der Jury möglich, seien Sie Teil des Entscheidungsteams",
      "Rechnungserstellung für eine transparente Abwicklung",
      "Laufzeit: 12 Monate, langanhaltende Präsenz und Wirkung",
    ],
    description:
      "Das ideale Paket für Hersteller von Streaming-Equipment, die ihre Marke gezielt bei einem breiten Publikum präsentieren möchten. Dieses Paket bietet Ihnen eine umfassende Möglichkeit, Ihre Marke zu platzieren und von der Aufmerksamkeit der TikTok Live Streaming Community zu profitieren.",
    icon: Trophy,
  },
  {
    name: "Sachpreis Sponsoring",
    price: "Nach Vereinbarung",
    benefits: [
      "Sachpreise für die Gewinner: Sie stellen hochwertige Preise zur Verfügung, die im Rahmen des Awards an die Gewinner vergeben werden",
      "Markenpräsenz auf der Preisverleihung: Ihr Logo wird während der Vergabe des Sachpreises prominent eingeblendet",
      "Nennung und Anerkennung: Ihr Sponsoring wird in allen relevanten Werbemaßnahmen und Social Media Posts erwähnt",
      "Zusätzliche Möglichkeiten zur Integration: Ihr Produkt kann auf der Website und in weiteren Kommunikationskanälen vorgestellt werden",
      "Flexible Vereinbarung: Wir finden gemeinsam die beste Lösung, die zu Ihrer Marke passt",
    ],
    description:
      "Individuelle Absprachen und maßgeschneiderte Konditionen werden gerne getroffen. Kontaktieren Sie uns für weitere Informationen und zur Abstimmung der Details!",
    icon: Gift,
  },
];

const sponsorFormSchema = z.object({
  contactName: z.string().min(2, "Name ist erforderlich"),
  companyName: z.string().min(2, "Firmenname ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  website: z.string().optional(),
  comments: z.string().optional(),
});

type SponsorFormValues = z.infer<typeof sponsorFormSchema>;

export default function SponsorWerden() {
  const form = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorFormSchema),
  });
  const { mutateAsync: createSponsor } =
    api.contact.createSponsorRequest.useMutation({
      onSuccess: () => {
        toast.success("Sponsorantrag eingegangen");
        form.reset();
      },
    });

  async function onSubmit(data: SponsorFormValues) {
    try {
      await createSponsor(data);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Fehler beim Senden des Sponsorantrags");
    }
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto space-y-8 px-4">
        {/* Trophy Image Card */}
        <div className="mb-12 flex flex-col items-center">
          <h1 className="mb-6 text-2xl font-bold text-primary">
            Digital Popcorn Live Stream Award 2025
          </h1>
          <Card className="card-hover w-[400px] overflow-hidden">
            <CardContent className="p-6">
              <img
                src="/digital-popcorn-trophy.jpg"
                alt="Digital Popcorn Award Trophäe - Die begehrte Auszeichnung für TikTok Livestreamer"
                title="Digital Popcorn Live Stream Award Trophäe"
                className="h-auto w-full transform rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold sm:mb-8 sm:text-4xl">
            Werden Sie Sponsor des Digital Popcorn Live Stream Awards
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Der Digital Popcorn Live Stream Award geht 2025 erstmals an den
            Start und wir haben große Pläne! Mit starken Partnern an unserer
            Seite und einer riesigen, begeisterten TikTok Live
            Streaming-Community aus Deutschland, Österreich und der Schweiz, die
            förmlich auf einen Award wartet, der echten Streamern eine faire
            Chance bietet, ist dies die perfekte Gelegenheit, Teil eines
            bahnbrechenden Events zu werden.
          </p>
          <p className="mt-4 text-base font-semibold text-primary sm:text-lg">
            Maximal 9 Sponsoren werden für 2025 aufgenommen, also sichern Sie
            sich jetzt Ihren Platz!
            <br />
            <span className="text-green-500">
              *Sie erhalten eine Rechnung zum Sponsoring Paket.
            </span>
          </p>
        </div>

        {/* Sponsorship Packages */}
        <div
          className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2"
          role="list"
          aria-label="Sponsoring Pakete"
        >
          {sponsorshipLevels.map((level) => {
            const Icon = level.icon;
            return (
              <Card key={level.name} className="relative overflow-hidden">
                <CardHeader className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Icon
                      className="h-8 w-8 flex-shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {level.name}
                      </h3>
                      <p className="text-lg text-primary sm:text-xl">
                        {level.price}
                      </p>
                    </div>
                  </div>
                  {level.description && (
                    <p className="text-sm text-muted-foreground sm:text-base">
                      {level.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent>
                  <ul
                    className="space-y-3 sm:space-y-4"
                    role="list"
                    aria-label={`Vorteile des ${level.name}`}
                  >
                    {level.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm sm:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Warum Sponsor werden Section */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
                Zielgerichtete Reichweite
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Der Digital Popcorn Live Stream Award erreicht Teilnehmer und
                Zuschauer aus Deutschland, Österreich und der Schweiz und bietet
                Ihnen die perfekte Gelegenheit, Ihre Marke in einem besonders
                engagierten Markt zu präsentieren. Mit dieser Reichweite
                sprechen Sie eine hochinteressierte und aktive Community an, die
                sich für Live-Streaming und Social Media begeistert. Nutzen Sie
                diese Chance, um Ihre Marke gezielt bei einem breiten Publikum
                zu platzieren und von der hohen Aufmerksamkeit der Teilnehmer zu
                profitieren.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
                Exklusive Chance
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                In diesem Jahr sind nur 9 Sponsoren für den Digital Popcorn Live
                Stream Award zugelassen. Diese exklusive Zahl stellt sicher,
                dass Sie sich in einem ausgewählten Kreis bewegen und Ihre Marke
                vor einer spezialisierten Zielgruppe präsentieren können. Diese
                Limitierung macht Ihr Sponsoring besonders wertvoll und
                garantiert, dass Ihre Botschaft die nötige Aufmerksamkeit
                erhält. Profitieren Sie von dieser einzigartigen Möglichkeit,
                Ihre Marke in einem exklusiven Umfeld zu positionieren.
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="pt-6">
              <h3 className="mb-3 text-lg font-semibold sm:mb-4 sm:text-xl">
                Wachsende Community
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Der Digital Popcorn Live Stream Award bietet Ihnen die perfekte
                Gelegenheit, mit einer jungen, aktiven und dynamischen
                Zielgruppe in Kontakt zu treten. Die Community rund um den Award
                wächst stetig und zeichnet sich durch hohe Interaktivität aus.
                Dies ist der ideale Zeitpunkt, um Ihre Marke langfristig zu
                etablieren und von der positiven Dynamik des Events zu
                profitieren. Nutzen Sie die Gelegenheit, sich mit einer
                aufgeschlossenen und trendbewussten Zielgruppe zu verbinden.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Sponsorantrag</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Name des Ansprechpartners *
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Firmenname *
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          E-Mail-Adresse *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            className="text-base"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base">
                          Firmenwebseite
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="comments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Ihre Kommentare & besonderen Wünsche
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px] text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full sm:w-auto">
                  Sponsorantrag einreichen
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Sponsors Section */}
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Award Sponsoren</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {sponsors.map((sponsor) => {
                const Icon = sponsor.icon;
                return (
                  <Card
                    key={sponsor.name}
                    className="group relative overflow-hidden"
                  >
                    <CardContent className="pt-6">
                      <div className="mb-4 flex items-center gap-4">
                        <Icon
                          className="h-8 w-8 flex-shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold sm:text-xl">
                          {sponsor.name}
                        </h3>
                      </div>
                      <p className="mb-6 line-clamp-2 h-12 text-sm text-muted-foreground sm:text-base">
                        {truncateText(sponsor.description, 50)}
                      </p>
                      <a
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                        aria-label={`Mehr über ${sponsor.name} erfahren`}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
