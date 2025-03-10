import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: any | undefined;
};

export const client = globalForDb.client ?? neon(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';

// // Redefining generic fixes a type error. Fix coming soon:
// // https://github.com/drizzle-team/drizzle-orm/issues/1945#event-12152755813
// const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);
// export const db = drizzle(sql);
