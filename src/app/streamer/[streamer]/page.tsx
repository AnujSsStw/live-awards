"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { sponsors } from "@/constants";
import { api } from "@/trpc/react";
import { Clock, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const votingCriteria = [
  "Stream-Qualität",
  "Interaktivität & Community Engagement",
  "Kreativität & Originalität",
  "Unterhaltung & Charisma",
  "Konsistenz & Häufigkeit",
  "Professionalität & Auftreten",
  "Unterhaltungswert & Stimmung",
] as const;

// Helper function for text truncation
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export default function StreamerPage() {
  const pathname = usePathname();
  const streamerName = pathname.split("/").pop();
  const { data: streamerData, isLoading } =
    api.streamer.getStreamerByUserName.useQuery(streamerName ?? "");
  const { data: session } = authClient.useSession();
  const { data: userReviews } = api.streamer.getUserReviews.useQuery(
    streamerData?.[0]?.streamer.id ?? 0,
    {
      enabled: !!session?.user && !!streamerData?.[0]?.streamer.id,
    },
  );
  const utils = api.useUtils();
  const { mutateAsync: createReview } =
    api.streamer.createReviewOrUpdate.useMutation({
      onSuccess: async () => {
        await utils.streamer.getUserReviews.invalidate();
        await utils.streamer.getReviews.invalidate();
      },
    });
  const { data: reviews } = api.streamer.getReviews.useQuery(
    streamerData?.[0]?.streamer.id ?? 0,
    {
      enabled: !!streamerData?.[0]?.streamer.id,
    },
  );
  const streamer = streamerData?.[0];
  const [ratings, setRatings] = useState<
    Record<(typeof votingCriteria)[number], number>
  >({
    "Stream-Qualität": 0,
    "Interaktivität & Community Engagement": 0,
    "Kreativität & Originalität": 0,
    "Unterhaltung & Charisma": 0,
    "Konsistenz & Häufigkeit": 0,
    "Professionalität & Auftreten": 0,
    "Unterhaltungswert & Stimmung": 0,
  });
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (userReviews) {
      const ratings = userReviews[0];
      if (ratings) {
        setRatings({
          "Stream-Qualität": ratings.streamQuality,
          "Interaktivität & Community Engagement": ratings.communityEngagement,
          "Kreativität & Originalität": ratings.creativity,
          "Unterhaltung & Charisma": ratings.charisma,
          "Konsistenz & Häufigkeit": ratings.consistency,
          "Professionalität & Auftreten": ratings.professionalism,
          "Unterhaltungswert & Stimmung": ratings.entertainment,
        });
      }
    }
  }, [userReviews]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!streamer?.user || !streamer.streamer) {
    return (
      <div className="container mx-auto min-h-screen px-4 pt-20">
        Streamer nicht gefunden
      </div>
    );
  }

  const handleReview = async () => {
    try {
      await createReview({
        streamerId: streamer.streamer.id,
        streamQuality: ratings["Stream-Qualität"],
        communityEngagement: ratings["Interaktivität & Community Engagement"],
        creativity: ratings["Kreativität & Originalität"],
        charisma: ratings["Unterhaltung & Charisma"],
        consistency: ratings["Konsistenz & Häufigkeit"],
        professionalism: ratings["Professionalität & Auftreten"],
        entertainment: ratings["Unterhaltungswert & Stimmung"],
        review: reviewText,
        isRated: true,
      });
      toast.success("Bewertung erfolgreich gespeichert");
    } catch (error) {
      toast.error("Fehler beim Speichern der Bewertung");
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="relative">
          <div
            className="h-48 w-full rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: `url(${streamer.streamer.headerImageUrl})`,
            }}
          />
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Streamer Info */}
        <div className="relative z-10 mt-[-64px]">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <Avatar className="h-24 w-24 shrink-0 border-4 border-background">
                  {streamer.user?.image && (
                    <AvatarImage
                      src={streamer.user?.image}
                      alt={streamer.user?.name}
                    />
                  )}
                  <AvatarFallback>{streamer.user?.name[0]}</AvatarFallback>
                </Avatar>
                <div className="w-full min-w-0 space-y-4">
                  <div>
                    <h1 className="mb-2 break-words text-2xl font-bold sm:text-3xl lg:text-4xl">
                      {streamer.streamer?.name}
                    </h1>
                    <h2 className="mb-2 break-words text-sm text-muted-foreground">
                      {streamer.streamer.tiktokUsername}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {streamer.streamer?.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {streamer.streamer?.country}
                      </Badge>
                    </div>
                  </div>
                  <p className="max-w-2xl break-words text-muted-foreground">
                    {truncateText(streamer.streamer?.bio ?? "", 200)}
                  </p>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="break-words">
                        {streamer.streamer?.streamTimes}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 shrink-0" />
                      <span>{streamer.streamer?.followers} Follower</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Share URL Section */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="mb-4 text-lg font-semibold">
              Unterstütze den Stream und teile die Streamer URL von{" "}
              {streamer.streamer.name} zum bewerten
            </h3>
            <div className="flex gap-4">
              <Input
                readOnly
                value={`${window.location.origin}/streamer/${streamerName}`}
                className="bg-muted"
              />
              <Button
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `${window.location.origin}/streamer/${streamerName}`,
                  );
                  toast.success("URL kopiert!");
                }}
              >
                URL Kopieren
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Voting Section */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Stream Bewertung</h2>
            <p className="text-muted-foreground">
              TikTok Login wird bald verfügbar sein. Damit können Sie dann den
              Stream bewerten.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {votingCriteria.map((criterion) => (
                <div key={criterion} className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{criterion}</label>
                    <span className="text-sm text-muted-foreground">
                      {ratings[criterion]} / 10
                    </span>
                  </div>
                  <Slider
                    value={[ratings[criterion]]}
                    min={1}
                    max={10}
                    step={1}
                    disabled={!session?.user} //TODO: also check if user has already voted
                    onValueChange={([value]) =>
                      setRatings((prev) => ({ ...prev, [criterion]: value }))
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleReview}
              disabled={
                !session?.user ||
                // check if user has already voted today
                (userReviews?.[0]?.updatedAt &&
                  userReviews[0].updatedAt >
                    new Date(Date.now() - 1000 * 60 * 60 * 24) &&
                  userReviews[0].isRated)
              }
              className="w-full"
            >
              Mit TikTok anmelden zum Bewerten
            </Button>
          </CardFooter>
        </Card>

        {/* Current Ratings Section */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Aktuelle Bewertungen</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Stream Statistik</h3>
                <div className="space-y-6 rounded-lg bg-muted p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Durchschnittliche Bewertung</span>
                      <span className="font-semibold">
                        {reviews && reviews.length > 0
                          ? (
                              reviews.reduce(
                                (acc, review) =>
                                  acc +
                                  (review.reviews.streamQuality +
                                    review.reviews.communityEngagement +
                                    review.reviews.creativity +
                                    review.reviews.charisma +
                                    review.reviews.consistency +
                                    review.reviews.professionalism +
                                    review.reviews.entertainment) /
                                    7,
                                0,
                              ) / reviews.length
                            ).toFixed(1)
                          : "0"}
                        /10
                      </span>
                    </div>
                    <Progress
                      value={
                        reviews && reviews.length > 0
                          ? (reviews.reduce(
                              (acc, review) =>
                                acc +
                                (review.reviews.streamQuality +
                                  review.reviews.communityEngagement +
                                  review.reviews.creativity +
                                  review.reviews.charisma +
                                  review.reviews.consistency +
                                  review.reviews.professionalism +
                                  review.reviews.entertainment) /
                                  7,
                              0,
                            ) /
                              reviews.length) *
                            10
                          : 0
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Anzahl Bewertungen</span>
                      <span className="font-semibold">
                        {reviews?.length ?? 0}
                      </span>
                    </div>
                    <Progress
                      value={(reviews?.length ?? 0 / 1000) * 100}
                      max={100}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Top Bewertungen</h3>
                <div className="space-y-4 rounded-lg bg-muted p-6">
                  {votingCriteria.map((criterion) => {
                    const criterionKey = {
                      "Stream-Qualität": "streamQuality",
                      "Interaktivität & Community Engagement":
                        "communityEngagement",
                      "Kreativität & Originalität": "creativity",
                      "Unterhaltung & Charisma": "charisma",
                      "Konsistenz & Häufigkeit": "consistency",
                      "Professionalität & Auftreten": "professionalism",
                      "Unterhaltungswert & Stimmung": "entertainment",
                    }[criterion];

                    const average =
                      reviews && reviews.length > 0
                        ? reviews.reduce(
                            (acc, review) =>
                              acc +
                              Number(
                                review.reviews[
                                  criterionKey as keyof typeof review.reviews
                                ],
                              ),
                            0,
                          ) / reviews.length
                        : 0;

                    return (
                      <div key={criterion} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{criterion}</span>
                          <span className="font-semibold">
                            {average.toFixed(1)}/10
                          </span>
                        </div>
                        <Progress value={average * 10} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guestbook Section */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Gästebuch</h2>
            <p className="text-muted-foreground">
              TikTok Login wird bald verfügbar sein. Damit können Sie dann
              Einträge hinterlassen.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews
                ?.filter((review) => review.reviews.textReview !== "")
                .map((entry) => (
                  <div key={entry.reviews.id} className="border-b pb-4">
                    <div className="mb-2 flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={entry.user?.image ?? ""} />
                        <AvatarFallback>{entry.user?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {entry.user?.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {entry.reviews.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="pl-11 text-muted-foreground">
                      {entry.reviews.textReview}
                    </p>
                  </div>
                ))}
            </div>

            <div className="mt-8 rounded-lg bg-muted p-4 text-center">
              {!session?.user ? (
                <>
                  <p className="text-muted-foreground">
                    Melde dich mit deinem TikTok Account an, um einen Eintrag zu
                    hinterlassen
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href={`/login`}>Mit TikTok anmelden</Link>
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <Input
                    placeholder="Schreibe einen Kommentar..."
                    className="w-full"
                    disabled={
                      userReviews?.[0]?.updatedAt &&
                      userReviews[0].updatedAt >
                        new Date(Date.now() - 1000 * 60 * 60 * 24) &&
                      userReviews[0].textReview !== ""
                    }
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                  <Button
                    className="w-full"
                    onClick={handleReview}
                    disabled={
                      !reviewText.trim() ||
                      (userReviews?.[0]?.updatedAt &&
                        userReviews[0].updatedAt >
                          new Date(Date.now() - 1000 * 60 * 60 * 24) &&
                        userReviews[0].textReview !== "")
                    }
                  >
                    Kommentar senden
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sponsors Section */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Award Sponsoren</h2>
          </CardHeader>
          <CardContent>
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
                        <h3 className="text-xl font-semibold">
                          {sponsor.name}
                        </h3>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
