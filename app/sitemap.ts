import type { MetadataRoute } from "next";
import { getPublishedChapters } from "@/lib/journal";
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
  ...SHOWCASE_ITEMS.filter((item) => !item.hidden).map((item) => `/showcase/${item.slug}`),
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const journalRoutes = [
    ...getPublishedChapters().map((chapter) => `/journal/ho-and-the-baby-eater/${chapter.slug}`),
    "/journal/ho-and-the-baby-eater/glossary",
  ];

  return [...routes, ...journalRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "yearly",
    priority: route === "" ? 1 : 0.7,
  }));
}
