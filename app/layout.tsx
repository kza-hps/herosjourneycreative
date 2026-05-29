import type { Metadata } from "next";
import { Anton, Spectral, Space_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

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
  title: "Hero's Journey Creative | Writing, Workshops, Story Worlds",
  description: "A creative studio for writing, workshops, legacy story services, and human-centred AI experiments based in Aotearoa New Zealand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${spectral.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-grow flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
