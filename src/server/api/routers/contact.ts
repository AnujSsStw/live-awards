import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { contact, sponsor } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const contactRouter = createTRPCRouter({
  createContactRequest: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(contact).values({
        name: input.name,
        email: input.email,
        message: input.message,
      });
    }),

  createSponsorRequest: publicProcedure
    .input(
      z.object({
        contactName: z.string().min(1),
        companyName: z.string().min(1),
        email: z.string().email(),
        website: z.string().optional(),
        comments: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sponsor).values({
        contactName: input.contactName,
        companyName: input.companyName,
        email: input.email,
        website: input.website,
        comments: input.comments,
      });
    }),

  getSponsorRequests: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(sponsor);
  }),

  getContactRequests: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(contact);
  }),

  getSponsorRequestById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(sponsor)
        .where(eq(sponsor.id, input.id));
    }),

  getContactRequestById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(contact)
        .where(eq(contact.id, input.id));
    }),
});
