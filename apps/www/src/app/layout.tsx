import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OmniFlow — Step Into the Digital Age | OmnitechWorks",
    template: "%s | OmniFlow by OmnitechWorks",
  },
  description:
    "We build professional websites and AI-powered solutions for South African businesses. Go from zero to online, then from online to unstoppable.",
  keywords: [
    "South Africa business website",
    "AI business solutions",
    "OmnitechWorks",
    "OmniFlow",
    "small business website",
    "digital transformation South Africa",
  ],
  openGraph: {
    title: "OmniFlow — Step Into the Digital Age",
    description:
      "Professional websites and AI solutions for South African businesses.",
    url: "https://omnitechwork.com",
    siteName: "OmniFlow by OmnitechWorks",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-surface)]">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
