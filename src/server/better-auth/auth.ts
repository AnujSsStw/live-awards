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
      clientSecret: "h2bEhXEWCyFPW8jciZplH4RiSDpMwQte",
      clientId: "7478112235963172869",
      clientKey: "awbpc94n5sxaeguq",
      scope: ["user.info.profile"],
    },
  },
  trustedOrigins: ["https://9d58cdd1-eae8-4b1c-9af1-35aa98b1da4d-00-3or83zyhp6ipa.worf.replit.dev"],
  emailAndPassword: {
    enabled: true,

    async sendResetPassword(data, request) {
      // TODO:Send an email to the user with a link to reset their password
    },
  },
});
