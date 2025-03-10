import { ImageResponse } from "next/og";
import { db } from "@/server/db";
import { streamer, user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

// Route segment config
export const runtime = "edge";
export const revalidate = 3600; // Revalidate at most every hour

// Image metadata
export const alt = "Digital Popcorn Live Stream Award - Streamer Profile";
export const size = {
  width: 1200,
  height: 630,
};

// Define the user type based on schema
type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
};

// Define the streamer with user relation type
type StreamerWithUser = {
  id: number;
  userId: string;
  name: string | null;
  email: string;
  category: string;
  tiktokUrl: string | null;
  headerImageUrl: string | null;
  bio: string | null;
  country: string;
  followers: string;
  streamTimes: string;
  hasAgency: string;
  isVerified: boolean;
  user: User;
};

// Image generation
export default async function Image({
  params,
}: {
  params: { streamer: string };
}) {
  try {
    // Get streamer data from the database
    const streamerData = (await db.query.streamer.findFirst({
      where: eq(streamer.tiktokUrl, params.streamer),
      with: {
        user: true,
      },
    })) as StreamerWithUser | null;

    if (!streamerData) {
      // Fallback image if streamer not found
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 40,
              background: "linear-gradient(to bottom, #000000, #111827)",
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              color: "white",
            }}
          >
            <div
              style={{ fontSize: 60, fontWeight: "bold", marginBottom: "20px" }}
            >
              Digital Popcorn
            </div>
            <div style={{ fontSize: 40, marginBottom: "40px" }}>
              Live Stream Award 2025
            </div>
          </div>
        ),
        { ...size },
      );
    }

    const userImage = streamerData.user?.image ?? "";
    const headerImage = streamerData.headerImageUrl ?? "";
    const streamerName = streamerData.user?.name ?? "Streamer";
    const tiktokUsername =
      streamerData.tiktokUrl?.replace("https://www.tiktok.com/@", "") ?? "";
    const category = streamerData.category ?? "";

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            background: "linear-gradient(to bottom, #000000, #111827)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            color: "white",
            position: "relative",
          }}
        >
          {/* Header image or gradient background */}
          {headerImage ? (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                display: "flex",
                backgroundImage: `url(${headerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.6,
              }}
            />
          ) : null}

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2), #111827)",
              zIndex: 1,
            }}
          />

          {/* Content container */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: "40px",
            }}
          >
            {/* Logo and title */}
            <div style={{ fontSize: 28, marginBottom: "10px" }}>
              Digital Popcorn Live Stream Award 2025
            </div>

            {/* Profile image */}
            {userImage && (
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  border: "4px solid white",
                  backgroundImage: `url(${userImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  marginBottom: "20px",
                }}
              />
            )}

            {/* Streamer name */}
            <div
              style={{
                fontSize: 60,
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "center",
              }}
            >
              {streamerName}
            </div>

            {/* TikTok username */}
            <div style={{ fontSize: 30, marginBottom: "20px", opacity: 0.9 }}>
              @{tiktokUsername}
            </div>

            {/* Category badge */}
            <div
              style={{
                fontSize: 24,
                backgroundColor: "#2563EB",
                padding: "8px 20px",
                borderRadius: "20px",
              }}
            >
              {category}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              zIndex: 2,
              fontSize: 20,
              opacity: 0.8,
            }}
          >
            livestreamawards.digital-popcorn.de
          </div>
        </div>
      ),
      { ...size },
    );
  } catch (e) {
    // Fallback image in case of error
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            background: "linear-gradient(to bottom, #000000, #111827)",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            color: "white",
          }}
        >
          <div
            style={{ fontSize: 60, fontWeight: "bold", marginBottom: "20px" }}
          >
            Digital Popcorn
          </div>
          <div style={{ fontSize: 40, marginBottom: "40px" }}>
            Live Stream Award 2025
          </div>
        </div>
      ),
      { ...size },
    );
  }
}
