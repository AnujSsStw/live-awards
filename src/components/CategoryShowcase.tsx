import { StreamerCard } from "@/components/StreamerCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { type categories } from "@/server/db/schema";
import Link from "next/link";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/react";

type Streamer = RouterOutputs["streamer"]["getAllStreamer"][number];

export async function CategoryShowcase({
  category,
  streamers,
}: {
  category: (typeof categories)[number];
  streamers: Streamer[];
}) {
  // const streamers = await api.streamer.getStreamerOfCategory(category);

  // if (isLoading) {
  //   return <div className="h-[300px] animate-pulse rounded-lg bg-muted" />;
  // }

  // Convert category to URL-friendly format and German names
  const getCategorySlug = (category: string) => {
    const slugMap: Record<string, string> = {
      "Real-Life": "real-life",
      Gaming: "gaming",
      Music: "musik",
      Entertainment: "entertainment",
      Sport: "sport",
      Business: "business",
      Comedy: "comedy",
    };
    return slugMap[category] ?? category.toLowerCase();
  };

  return (
    <div className="py-6">
      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-2xl font-bold">
          {category}{" "}
          <span className="text-muted-foreground">({streamers.length})</span>
        </h2>
        <Link href={`/tiktok-live-streamer/${getCategorySlug(category)}`}>
          <Button
            variant="link"
            size="lg"
            className="gap-2 text-primary hover:text-primary/90"
          >
            Mehr
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex w-full gap-4 pb-4">
          {streamers.slice(0, 6).map((streamer) => (
            <div key={streamer.id} className="w-[300px] flex-none">
              <StreamerCard streamer={streamer} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
