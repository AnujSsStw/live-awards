import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Navigation } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "./providers";

export const metadata: Metadata = {
  title: "Digital Popcorn Live Stream Award 2025",
  description: "Die besten TikTok Livestreamer der Welt",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "Digital Popcorn Live Stream Award 2025",
    description: "Die besten TikTok Livestreamer der Welt",
    url: "https://livestreamawards.digital-popcorn.de", // Update with your actual domain
    siteName: "Digital Popcorn Live Stream Award",
    images: [
      {
        url: "/og-image.jpg", // Create this image and place it in the public folder
        width: 1200,
        height: 630,
        alt: "Digital Popcorn Live Stream Award 2025",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Popcorn Live Stream Award 2025",
    description: "Die besten TikTok Livestreamer der Welt",
    images: ["/digital-popcorn-trophy.jpg"], // Same image as OG
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
