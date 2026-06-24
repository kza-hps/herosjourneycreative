import type { Metadata } from "next";
import { Anton, Inter, Spectral, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herosjourneycreative.co.nz"),
  title: "Hero's Journey Creative | Writing, Workshops, Story Worlds",
  description: "A creative studio for writing, workshops, legacy story services, and human-centred AI experiments based in Aotearoa New Zealand.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hero's Journey Creative",
    description: "Writing, workshops, legacy story services, and human-centred AI experiments from Aotearoa New Zealand.",
    url: "https://herosjourneycreative.co.nz",
    siteName: "Hero's Journey Creative",
    locale: "en_NZ",
    type: "website",
    images: [
      {
        url: "/brand/NEW_HJC_LOGO.png",
        width: 1200,
        height: 630,
        alt: "Hero's Journey Creative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hero's Journey Creative",
    description: "Writing, workshops, legacy story services, and human-centred AI experiments from Aotearoa New Zealand.",
    images: ["/brand/NEW_HJC_LOGO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${spectral.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
