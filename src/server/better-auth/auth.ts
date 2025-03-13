import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { user, session, account, verification } from "@/server/db/schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  socialProviders: {
    tiktok: {
      clientSecret: "hOkamvHlw7pgt6Rtt4zwIw9qzJ3FybKL",
      clientId: "7478112235963172869",
      clientKey: "sbawj3tabqgqa9w67j",
      scope: ["user.info.profile"],
    },
  },
  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data, request) {
      // TODO:Send an email to the user with a link to reset their password
    },
  },
});
