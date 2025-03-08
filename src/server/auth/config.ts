import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import TikTok from "next-auth/providers/tiktok";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";
import { env } from "@/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    TikTok({
      clientId: env.AUTH_TIKTOK_ID,
      clientSecret: env.AUTH_TIKTOK_SECRET,
      authorization: {
        params: {
          scope: "user.info.profile",
        },
      },
      token: {
        url: "https://open.tiktokapis.com/v2/oauth/token/",
        async request({ params, provider }) {
          const res = await fetch(
            "https://open.tiktokapis.com/v2/oauth/token",
            {
              method: "POST",
              headers: {
                "Cache-Control": "no-cache",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                client_key: provider.clientId!,
                client_secret: provider.clientSecret!,
                code: params.code!,
                grant_type: "authorization_code",
                redirect_uri: provider.callbackUrl!,
              }),
            },
          ).then((res) => res.json());

          console.log("hrere", res);

          const tokens: TokenSet = {
            access_token: res.access_token || "",
            expires_at: res.expires_in,
            refresh_token: res.refresh_token,
            scope: res.scope,
            id_token: res.open_id,
            token_type: res.token_type,
            session_state: res.open_id,
          };
          return {
            tokens,
          };
        },
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
