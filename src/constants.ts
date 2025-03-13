import { Trophy } from "lucide-react";

import { MonitorPlay } from "lucide-react";

import { Mic2 } from "lucide-react";
import { z } from "zod";
import {
  categories,
  countries,
  hasAgency,
  streamTimes,
} from "./server/db/schema";

export const sponsors = [
  {
    name: "RØDE",
    icon: Mic2,
    description: "Professionelle Mikrofone für Streamer",
    url: "https://rode.com",
  },
  {
    name: "Elgato",
    icon: MonitorPlay,
    description: "Stream Decks & Capture Cards",
    url: "https://elgato.com",
  },
  {
    name: "Beyerdynamic",
    icon: Trophy,
    description: "Premium Audio Equipment",
    url: "https://beyerdynamic.de",
  },
];

export const RegisterformSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  tiktokUsername: z.string(),
  useLoginUsername: z.boolean().optional(),
  country: z.enum(countries, {
    required_error: "Bitte wähle dein Land aus.",
  }),
  followerCount: z.enum(
    [
      "0-1100",
      "1100-5000",
      "5000-10000",
      "10000-50000",
      "50000-100000",
      "100000+",
    ],
    {
      required_error: "Bitte wähle deine Followeranzahl aus.",
    },
  ),
  streamTimes: z.enum(streamTimes, {
    required_error: "Bitte wähle deine Stream-Zeiten aus.",
  }),
  hasAgency: z.enum(hasAgency, {
    required_error: "Bitte gib an, ob du bei einer Agentur bist.",
  }),
  category: z.enum(categories, {
    required_error: "Bitte wähle deine Streaming-Kategorie aus.",
  }),
  //   profileImage: z.any(),
  headerImage: z.any(),
  bio: z
    .string()
    .min(
      100,
      "Bitte schreibe mindestens 100 Zeichen über dich und deinen Stream.",
    ),
});
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
