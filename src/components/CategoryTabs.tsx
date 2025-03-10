"use client";

import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryTabsProps {
  categories: string[];
  className?: string;
  baseUrl?: string;
}

export function CategoryTabs({
  categories,
  className,
  baseUrl = "/tiktok-live-streamer",
}: CategoryTabsProps) {
  const pathname = usePathname();
  const currentCategory = pathname.split("/").pop() ?? "all";

  // Map for display names of categories
  const getCategoryDisplayName = (slug: string) => {
    const displayNames: Record<string, string> = {
      "real-life": "Real-Life",
      gaming: "Gaming",
      musik: "Musik",
      entertainment: "Entertainment",
      sport: "Sport",
      business: "Business",
      comedy: "Comedy",
      newcomer: "Newcomer",
    };
    return displayNames[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <div className={cn("relative border-b", className)}>
      <ScrollArea className="w-full pb-2.5">
        <div className="flex w-max min-w-full justify-start gap-1 p-1 md:justify-center">
          <Link
            href={`${baseUrl}`}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
              currentCategory === "all"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-muted",
            )}
          >
            Alle
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`${baseUrl}/${category}`}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                currentCategory === category
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted",
              )}
            >
              {getCategoryDisplayName(category)}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
}
