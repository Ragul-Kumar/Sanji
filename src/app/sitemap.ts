import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/leaderboard", "/spot", "/privacy", "/terms"].map((p) => ({
    url: `${SITE.url}${p}`,
    changeFrequency: p === "/leaderboard" ? "hourly" : "weekly",
    priority: p === "" ? 1 : 0.6,
  }));
}
