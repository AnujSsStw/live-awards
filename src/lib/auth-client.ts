import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === 'development'
    ? "https://9d58cdd1-eae8-4b1c-9af1-35aa98b1da4d-00-3or83zyhp6ipa.worf.replit.dev"
    : process.env.NEXT_PUBLIC_BASE_URL,
});
