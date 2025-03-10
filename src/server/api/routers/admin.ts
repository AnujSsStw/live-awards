import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { contact, sponsor } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const adminRouter = createTRPCRouter({});
