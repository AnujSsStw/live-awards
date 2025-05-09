import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {
  categories,
  countries,
  hasAgency,
  reviews,
  streamer,
  streamTimes,
  user,
} from "@/server/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

//TODO: make it same as frontend
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
      10,
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
        tiktokUsername,
        headerImageUrl:
          headerImage ??
          "https://4u651ly4qn.ufs.sh/f/MU2Krr5SfEZto13jGM7YTNEbzmUg7a9XyVK8F32ncjW1eSvf",
        bio,
        country,
        followers: followerCount,
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
          tiktokUsername,
          headerImageUrl: headerImage,
          bio,
          country,
          followers: followerCount,
          streamTimes: streamTimes,
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
      .select({
        id: streamer.id,
        userId: streamer.userId,
        name: streamer.name,
        email: streamer.email,
        category: streamer.category,
        hasAgency: streamer.hasAgency,
        tiktokUsername: streamer.tiktokUsername,
        headerImageUrl: streamer.headerImageUrl,
        bio: streamer.bio,
        country: streamer.country,
        followers: streamer.followers,
        streamTimes: streamer.streamTimes,
        isVerified: streamer.isVerified,
        userName: user.name,
        userImage: user.image,
        reviewCount: sql<number>`count(${reviews.id})`,
        rank: sql<number>`CASE 
            WHEN count(${reviews.id}) = 0 THEN null 
            ELSE DENSE_RANK() OVER (ORDER BY count(${reviews.id}) DESC)
          END`,
      })
      .from(streamer)
      .leftJoin(user, eq(streamer.userId, user.id))
      .leftJoin(reviews, eq(reviews.streamerId, streamer.id))
      .groupBy(
        streamer.id,
        streamer.userId,
        streamer.name,
        streamer.email,
        streamer.category,
        streamer.hasAgency,
        streamer.tiktokUsername,
        streamer.headerImageUrl,
        streamer.bio,
        streamer.country,
        streamer.followers,
        streamer.streamTimes,
        streamer.isVerified,
        user.name,
        user.image,
      );
    return result;
  }),
  getStreamerOfCategory: publicProcedure
    .input(z.enum(categories))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select({
          id: streamer.id,
          userId: streamer.userId,
          name: streamer.name,
          email: streamer.email,
          category: streamer.category,
          hasAgency: streamer.hasAgency,
          tiktokUsername: streamer.tiktokUsername,
          headerImageUrl: streamer.headerImageUrl,
          bio: streamer.bio,
          country: streamer.country,
          followers: streamer.followers,
          streamTimes: streamer.streamTimes,
          isVerified: streamer.isVerified,
          userName: user.name,
          userImage: user.image,
          reviewCount: sql<number>`count(${reviews.id})`,
          rank: sql<number>`CASE 
            WHEN count(${reviews.id}) = 0 THEN null 
            ELSE DENSE_RANK() OVER (ORDER BY count(${reviews.id}) DESC)
          END`,
        })
        .from(streamer)
        .where(eq(streamer.category, input))
        .leftJoin(user, eq(streamer.userId, user.id))
        .leftJoin(reviews, eq(reviews.streamerId, streamer.id))
        .groupBy(
          streamer.id,
          streamer.userId,
          streamer.name,
          streamer.email,
          streamer.category,
          streamer.hasAgency,
          streamer.tiktokUsername,
          streamer.headerImageUrl,
          streamer.bio,
          streamer.country,
          streamer.followers,
          streamer.streamTimes,
          streamer.isVerified,
          user.name,
          user.image,
        );
      return result;
    }),
  getStreamerByName: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(streamer)
        .where(eq(streamer.name, input));
      return result;
    }),

  getStreamerByUserName: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(streamer)
        .where(eq(streamer.tiktokUsername, input))
        .leftJoin(user, eq(streamer.userId, user.id))
        .leftJoin(reviews, eq(reviews.streamerId, streamer.id));
      return result;
    }),

  getUserReviews: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const result = await ctx.db
        .select()
        .from(reviews)
        .where(and(eq(reviews.userId, user.id), eq(reviews.streamerId, input)));
      return result;
    }),

  getReviews: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(reviews)
        .where(eq(reviews.streamerId, input))
        .leftJoin(user, eq(reviews.userId, user.id))
        .orderBy(desc(reviews.updatedAt));
      return result;
    }),

  createReviewOrUpdate: protectedProcedure
    .input(
      z.object({
        streamerId: z.number(),
        streamQuality: z.number(),
        communityEngagement: z.number(),
        creativity: z.number(),
        charisma: z.number(),
        consistency: z.number(),
        professionalism: z.number(),
        entertainment: z.number(),
        review: z.string(),
        isRated: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const existingReview = await ctx.db
        .select()
        .from(reviews)
        .where(
          and(
            eq(reviews.userId, user.id),
            eq(reviews.streamerId, input.streamerId),
          ),
        );
      if (existingReview.length > 0 && existingReview[0]) {
        await ctx.db
          .update(reviews)
          .set({
            streamQuality: input.streamQuality,
            communityEngagement: input.communityEngagement,
            creativity: input.creativity,
            charisma: input.charisma,
            consistency: input.consistency,
            professionalism: input.professionalism,
            entertainment: input.entertainment,
            textReview: input.review,
            isRated: input.isRated,
          })
          .where(eq(reviews.id, existingReview[0].id));
      } else {
        await ctx.db.insert(reviews).values({
          userId: user.id,
          entertainment: input.entertainment,
          textReview: input.review,
          streamerId: input.streamerId,
          streamQuality: input.streamQuality,
          communityEngagement: input.communityEngagement,
          creativity: input.creativity,
          charisma: input.charisma,
          consistency: input.consistency,
          professionalism: input.professionalism,
        });
      }
    }),
});
