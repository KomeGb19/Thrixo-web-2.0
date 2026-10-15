// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://www.thrixoagency.com.ng";

// Add every public page here (e.g. "/work", "/services", "/about").
const routes = ["", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}