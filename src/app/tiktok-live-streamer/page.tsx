import { StreamerCard } from "@/components/StreamerCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { api } from "@/trpc/server";
export default async function TikTokLiveStreamer() {
  const streamers = await api.streamer.getAllStreamer();
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold">TikTok Live Streamer</h1>
          <p className="max-w-2xl text-center text-muted-foreground">
            Willkommen bei den TikTok Live Streamern! Hier findest du alle
            Teilnehmer, schau dir ihre Shows an und gib deine Stimme ab!
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
