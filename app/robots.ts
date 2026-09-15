import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/showcase", "/showcase/", "/services/free-website-preview"],
    },
    sitemap: "https://www.herosjourneycreative.co.nz/sitemap.xml",
  };
}
