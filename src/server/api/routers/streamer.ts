import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  hasAgency,
  streamTimes,
  categories,
  countries,
  streamer,
  user,
} from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const RegisterformSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  tiktokUsername: z.string(),
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

export const streamerRouter = createTRPCRouter({
  register: protectedProcedure
    .input(RegisterformSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        tiktokUsername,
        followerCount,
        streamTimes,
        hasAgency,
        category,
        headerImage,
        bio,
        country,
        email,
      } = input;
      const userData = ctx.session.user;
      await ctx.db.insert(streamer).values({
        userId: userData.id,
        name,
        email,
        category,
        hasAgency: hasAgency,
        tiktokUrl: `https://www.tiktok.com/@${tiktokUsername}`,
        headerImageUrl: headerImage,
        bio,
        country,
        followers: followerCount,
        votes: "0",
        streamTimes: streamTimes,
        isVerified: false,
      });

      await ctx.db
        .update(user)
        .set({
          role: "streamer",
        })
        .where(eq(user.id, userData.id));
    }),

  update: protectedProcedure
    .input(RegisterformSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        name,
        tiktokUsername,
        followerCount,
        streamTimes,
        hasAgency,
        category,
        headerImage,
        bio,
        country,
        email,
      } = input;
      const user = ctx.session.user;

      await ctx.db
        .update(streamer)
        .set({
          name,
          email,
          category,
          hasAgency: hasAgency,
          tiktokUrl: `https://www.tiktok.com/@${tiktokUsername}`,
          headerImageUrl: headerImage,
          bio,
          country,
          followers: followerCount,
          streamTimes: streamTimes,
          updatedAt: sql`(unixepoch())`,
        })
        .where(eq(streamer.userId, user.id));
    }),

  getStreamer: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const result = await ctx.db
      .select()
      .from(streamer)
      .where(eq(streamer.userId, user.id))
      .limit(1);

    return result;
  }),
  getAllStreamer: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(streamer)
      .leftJoin(user, eq(streamer.userId, user.id));

    return result;
  }),
  getStreamerOfCategory: publicProcedure
    .input(z.enum(categories))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(streamer)
        .where(eq(streamer.category, input));
      return result;
    }),
});
