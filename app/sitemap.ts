import type { MetadataRoute } from "next";

const baseUrl = "https://herosjourneycreative.co.nz";

const routes = [
  "",
  "/about",
  "/workshops",
  "/legacy-writing",
  "/personal-myth-authoring",
  "/journal",
  "/showcase",
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
