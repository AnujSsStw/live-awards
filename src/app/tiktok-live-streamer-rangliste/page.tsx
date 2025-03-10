import { StreamerCard } from "@/components/StreamerCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { api } from "@/trpc/server";

export default async function Rankings() {
  const streamers = await api.streamer.getAllStreamer();

  const sortedStreamers = [...streamers].sort((a, b) => b.rank - a.rank);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-bold">
            TikTok Live Streamer Rangliste
          </h1>
          <p className="max-w-2xl text-center text-muted-foreground">
            Hier findest du alle Teilnehmer in der aktuellen Rangliste, schau
            dir ihre Shows an und gib deine Stimme ab! Du kannst alle 24 Stunden
            eine Stimme vergeben und somit deinen Lieblings-Streamer
            unterstützen
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
