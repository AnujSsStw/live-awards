import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/server/db"; // your drizzle instance
import { user, session, account, verification } from "@/server/db/schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
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

    // github: {
    //   clientId: "Ov23li9gICNBVJtlDM8Q",
    //   clientSecret: "37a1fba0c1a9454d24c162f2457ee790afd31741",
    // },
  },
  //   emailAndPassword: {
  //     enabled: true,
  //     requireEmailVerification: true,
  //   },
  //   emailVerification: {
  //     sendVerificationEmail: async ({ user, url, token }, request) => {
  //       await sendEmail(
  //         user.email,
  //         "Verify your email address",
  //         `Click the link to verify your email: ${url}`,
  //       );
  //     },
  //   },
});
