import Link from "next/link";
import { Trophy } from "lucide-react";
import { categories } from "@/server/db/schema";
// import { useScrollTop } from "@/hooks/use-scroll-top";
// import { useAuth } from "@/hooks/use-auth";

export function Footer() {
  const currentYear = new Date().getFullYear();
  // const scrollTop = useScrollTop();
  // const { user } = useAuth();

  const user = null;

  // Convert category to URL-friendly format and German names
  const getCategorySlug = (category: string) => {
    const slugMap: Record<string, string> = {
      "Real-Life": "real-life",
      Gaming: "gaming",
      Music: "musik",
      Entertainment: "entertainment",
      Sport: "sport",
      Business: "business",
      Comedy: "comedy",
      Newcomer: "newcomer",
    };
    return slugMap[category] ?? category.toLowerCase();
  };

  return (
    <footer className="mt-20 border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex cursor-pointer items-center gap-2">
                <Trophy className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Live Stream Awards</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Die erste Award-Show für TikTok Livestreamer aus der DACH-Region.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold">Kategorien</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/tiktok-live-streamer/${getCategorySlug(category)}`}
                  >
                    <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                      {category === "Music" ? "Musik" : category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Stream Eintragen
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tiktok-live-streamer">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Live Streamer
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tiktok-live-streamer-rangliste">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Rangliste
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sponsors">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Preise & Sponsoren
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sponsor-werden">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Sponsor werden
                  </span>
                </Link>
              </li>
              <li>
                <Link href={user ? "/profile" : "/login"}>
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    {user ? "Einstellungen" : "Login"}
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Voting Section */}
          <div>
            <h3 className="mb-4 font-semibold">Abstimmung</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vote">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Abstimmen
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/voting-rules">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Regeln
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/report-abuse">
                  <span className="cursor-pointer text-sm text-muted-foreground hover:text-primary">
                    Misbrauch melden
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-12 border-t pt-8">
          <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
            <Link href="/contact">
              <span className="cursor-pointer whitespace-nowrap text-sm text-muted-foreground hover:text-primary">
                Kontakt
              </span>
            </Link>
            <Link href="/datenschutz">
              <span className="cursor-pointer whitespace-nowrap text-sm text-muted-foreground hover:text-primary">
                Datenschutz
              </span>
            </Link>
            <Link href="/agb">
              <span className="cursor-pointer whitespace-nowrap text-sm text-muted-foreground hover:text-primary">
                AGB
              </span>
            </Link>
            <Link href="/impressum">
              <span className="cursor-pointer whitespace-nowrap text-sm text-muted-foreground hover:text-primary">
                Impressum
              </span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Live Stream Awards. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
