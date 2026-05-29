import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hero’s Journey Creative | Writing, Workshops, Story Worlds",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-hjc-warm-white text-hjc-black">
        <SiteHeader />
        <main className="flex-grow flex flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
