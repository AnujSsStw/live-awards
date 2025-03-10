import { StreamerCard } from "@/components/StreamerCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { api } from "@/trpc/server";
import { getCategoryName } from "@/app/tiktok-live-streamer/[category]/page";
import { redirect } from "next/navigation";

export default async function Rankings({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = getCategoryName(category);
  if (!categoryName) {
    redirect("/tiktok-live-streamer-rangliste");
  }
  const streamers = await api.streamer.getStreamerOfCategory(
    categoryName as any,
  );

  const sortedStreamers = [...streamers].sort((a, b) => b.rank - a.rank);

  const getCategoryDisplayName = (slug: string) => {
    const displayNames: Record<string, string> = {
      "real-life": "Real-Life",
      gaming: "Gaming",
      musik: "Musik",
      entertainment: "Entertainment",
      sport: "Sport",
      business: "Business",
      comedy: "Comedy",
      newcomer: "Newcomer",
    };
    return displayNames[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold">
            {category && category !== "tiktok-live-streamer-rangliste"
              ? `Top ${getCategoryDisplayName(category)}`
              : "TikTok Live Streamer Rangliste"}
          </h1>
          <p className="max-w-2xl text-center text-muted-foreground">
            {category && category !== "tiktok-live-streamer-rangliste"
              ? `Hier findest du alle Teilnehmer in der aktuellen Rangliste, schau dir ihre ${getCategoryDisplayName(category)} Shows an und gib deine Stimme ab! Du kannst alle 24 Stunden eine Stimme vergeben und somit deinen Lieblings ${getCategoryDisplayName(category)} Streamer unterstützen`
              : "Hier findest du alle Teilnehmer in der aktuellen Rangliste, schau dir ihre Shows an und gib deine Stimme ab! Du kannst alle 24 Stunden eine Stimme vergeben und somit deinen Lieblings-Streamer unterstützen"}
          </p>
        </div>

        <CategoryTabs
          categories={[
            "real-life",
            "gaming",
            "musik",
            "entertainment",
            "sport",
            "business",
            "comedy",
            "newcomer",
          ]}
          baseUrl="/tiktok-live-streamer-rangliste"
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedStreamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      </div>
    </div>
  );
}
