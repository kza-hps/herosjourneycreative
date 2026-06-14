import type { MetadataRoute } from "next";
import { SHOWCASE_ITEMS } from "@/lib/site-content";

const baseUrl = "https://herosjourneycreative.co.nz";

const routes = [
  "",
  "/about",
  "/workshops",
  "/legacy-writing",
  "/personal-myth-authoring",
  "/journal",
  "/showcase",
  ...SHOWCASE_ITEMS.map((item) => `/showcase/${item.slug}`),
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }));
}
