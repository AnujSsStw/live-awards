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
    <footer className="bg-muted/50 mt-20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <div className="flex cursor-pointer items-center gap-2">
                <Trophy className="text-primary h-6 w-6" />
                <span className="text-lg font-bold">Live Stream Awards</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">
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
                    <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
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
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Stream Eintragen
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tiktok-live-streamer">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Live Streamer
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/tiktok-live-streamer-rangliste">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Rangliste
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sponsors">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Preise & Sponsoren
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/sponsor-werden">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Sponsor werden
                  </span>
                </Link>
              </li>
              <li>
                <Link href={user ? "/profile" : "/login"}>
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
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
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Abstimmen
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/voting-rules">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
                    Regeln
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/report-abuse">
                  <span className="text-muted-foreground hover:text-primary cursor-pointer text-sm">
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
              <span className="text-muted-foreground hover:text-primary cursor-pointer whitespace-nowrap text-sm">
                Kontakt
              </span>
            </Link>
            <Link href="/datenschutz">
              <span className="text-muted-foreground hover:text-primary cursor-pointer whitespace-nowrap text-sm">
                Datenschutz
              </span>
            </Link>
            <Link href="/agb">
              <span className="text-muted-foreground hover:text-primary cursor-pointer whitespace-nowrap text-sm">
                AGB
              </span>
            </Link>
            <Link href="/impressum">
              <span className="text-muted-foreground hover:text-primary cursor-pointer whitespace-nowrap text-sm">
                Impressum
              </span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-center text-sm">
            &copy; {currentYear} Live Stream Awards. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
