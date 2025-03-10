import { StreamerCard } from "@/components/StreamerCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const getCategoryName = (slug: string) => {
  const categoryMap: Record<string, string> = {
    "real-life": "Real-Life",
    gaming: "Gaming",
    musik: "Music",
    entertainment: "Entertainment",
    sport: "Sport",
    business: "Business",
    comedy: "Comedy",
    newcomer: "Newcomer",
  };
  return categoryMap[slug];
};

export default async function TikTokLiveStreamer({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = getCategoryName(category);
  if (!categoryName) {
    redirect("/tiktok-live-streamer");
  }

  const streamers = await api.streamer.getStreamerOfCategory(
    categoryName as any,
  );

  const getCategoryDisplayName = (categorySlug: string) => {
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
    return displayNames[categorySlug] ?? categorySlug;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold">
            {category && category !== "tiktok-live-streamer"
              ? `${getCategoryDisplayName(category)} Live Streamer`
              : "TikTok Live Streamer"}
          </h1>
          <p className="max-w-2xl text-center text-muted-foreground">
            {category && category !== "tiktok-live-streamer"
              ? `Willkommen bei den ${getCategoryDisplayName(category)} Live Streamern! Hier findest du alle Teilnehmer, schau dir ihre ${getCategoryDisplayName(category)} Shows an und gib deine Stimme ab!`
              : "Willkommen bei den TikTok Live Streamern! Hier findest du alle Teilnehmer, schau dir ihre Shows an und gib deine Stimme ab!"}
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
          className="mb-8"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {streamers.map((streamer) => (
            <StreamerCard key={streamer.id} streamer={streamer} />
          ))}
        </div>
      </div>
    </div>
  );
}
