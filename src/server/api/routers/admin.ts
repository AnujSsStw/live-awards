import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { contact, sponsor, streamer } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { user as User } from "@/server/db/schema";

export const adminRouter = createTRPCRouter({
  isAdmin: publicProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    if (!session?.session.userId) {
      return false;
    }
    const user = await db.query.user.findFirst({
      where: eq(User.id, session.session.userId),
    });
    return user?.role === "admin";
  }),

  getContactRequests: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(contact);
  }),
  deleteContactRequest: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(contact).where(eq(contact.id, input));
    }),
  getSponsorRequests: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(sponsor);
  }),
  deleteSponsorRequest: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(sponsor).where(eq(sponsor.id, input));
    }),
  getStreamers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(streamer);
  }),
  deleteStreamer: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.delete(streamer).where(eq(streamer.id, input));
    }),
});
