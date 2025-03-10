"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl"
    >
      <h1 className="mb-6 bg-gradient-to-r from-primary via-primary/50 to-primary bg-clip-text text-4xl font-bold text-transparent [-webkit-background-clip:text] md:text-6xl">
        Digital Popcorn
        <br />
        Live Stream Awards 2025
      </h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Die Bühne für die coolsten TikTok Live-Streamerin und Streamer! 🎬✨
      </p>
      <p className="mb-6 text-lg text-muted-foreground">
        Willkommen zum Digital Popcorn Live Stream Awards 2025, der ersten
        Auszeichnung für die kreativsten, unterhaltsamsten und talentiertesten
        TikTok Live-Streamer aus Deutschland, Österreich und der Schweiz! 🌍🎭
      </p>
      <div className="mb-10 flex gap-4">
        <Link href="/register">
          <Button size="lg" className="gap-2">
            Jetzt Anmelden
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
