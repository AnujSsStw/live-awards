import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  //   baseURL: "http://localhost:3000", // the base url of your auth server
  // baseURL: "https://presumably-crisp-sponge.ngrok-free.app",
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
