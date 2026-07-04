import type { Metadata } from "next";

const siteName = "Hero's Journey Creative";
const defaultOgImage = {
  url: "/brand/NEW_HJC_LOGO.png",
  width: 1200,
  height: 630,
  alt: siteName,
};

type PageMetadataOptions = {
  title: string;
  description?: string;
  canonical: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
};

export function createPageMetadata({
  title,
  description,
  canonical,
  openGraphTitle = title,
  openGraphDescription = description,
}: PageMetadataOptions): Metadata {
  return {
    title,
    ...(description && { description }),
    alternates: { canonical },
    openGraph: {
      title: openGraphTitle,
      ...(openGraphDescription && { description: openGraphDescription }),
      url: canonical,
      siteName,
      locale: "en_NZ",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      ...(openGraphDescription && { description: openGraphDescription }),
      images: [defaultOgImage.url],
    },
  };
}
