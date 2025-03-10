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
import type { RouterOutputs } from "@/trpc/react";
import { motion } from "framer-motion";
import { Clock, Heart, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
type Streamer = RouterOutputs["streamer"]["getStreamerOfCategory"][number];

export function StreamerCard({ streamer }: { streamer: Streamer }) {
  const handleVote = async () => {
    try {
      toast.success(`You voted for ${streamer.name}`);
    } catch (error) {
      toast.error("Failed to submit vote");
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="card-hover flex h-full flex-col">
        <div
          className="h-32 w-full transform rounded-t-lg bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${streamer.headerImageUrl})`,
          }}
        />
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="-mt-12 h-16 w-16 overflow-hidden rounded-full border-4 border-background">
              {streamer.userImage && (
                <AvatarImage
                  src={streamer.userImage}
                  alt={streamer.name ?? ""}
                  className="transform rounded-full transition-transform duration-300 group-hover:scale-110"
                />
              )}
              <AvatarFallback>{streamer.name ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h3 className="link-hover text-lg font-semibold">
                {truncateText(streamer.name ?? "", 20)}
              </h3>
              <div className="flex flex-col gap-2">
                <Badge
                  variant="secondary"
                  className="inline-block w-fit hover:bg-secondary/80"
                >
                  {streamer.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="flex w-fit items-center gap-1 hover:bg-muted"
                >
                  <MapPin className="h-3 w-3" />
                  {streamer.country}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="whitespace-normal break-words text-sm text-muted-foreground">
            {truncateText(streamer.bio ?? "", 150)}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">
              {truncateText(streamer.streamTimes, 30)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 flex-shrink-0" />
            {/* {formatFollowers(Number(streamer.streamer.followers))} Followers */}
            {streamer.followers} Followers
          </div>
          <div className="whitespace-normal break-words text-sm text-muted-foreground">
            TikTok Login wird bald verfügbar sein. Damit können Sie dann den
            Stream bewerten.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <a
              href={streamer.tiktokUrl ?? ""}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-sm text-primary hover:underline"
            >
              Zum Live Stream
            </a>
            <Button
              onClick={handleVote}
              variant="outline"
              size="sm"
              className="button-hover"
            >
              <Heart className="mr-2 h-4 w-4" />
              {streamer.reviewCount} votes
            </Button>
          </div>
          <div className="flex w-full justify-between">
            <a
              href={`/tiktok-live-streamer-rangliste/${getCategorySlug(
                streamer.category,
              )}`}
              className="link-hover text-sm text-primary hover:underline"
            >
              Zuschauer Ranking
            </a>
            <Button variant="outline" size="sm" className="button-hover">
              <Trophy className="mr-2 h-4 w-4" />
              Rank {streamer.rank ?? "N/A"}
            </Button>
          </div>
          <Button className="button-hover w-full" variant="default" asChild>
            <Link href={`/streamer/${streamer.userName}`}>Stream bewerten</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Helper function to get category slug
const getCategorySlug = (category: string) => {
  const slugMap: Record<string, string> = {
    "Real-Life": "real-life",
    Gaming: "gaming",
    Music: "musik",
    Entertainment: "entertainment",
    Sport: "sport",
    Business: "business",
    Comedy: "comedy",
    Newcomer: "newcomer",
  };
  return slugMap[category] ?? category.toLowerCase();
};
