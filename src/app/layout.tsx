import { foundersGroteskBold } from "@/fonts";
import { getEnvUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutProvider } from "@/components/layout-provider";
import { Header } from "@/components/ssr/header";
import { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getEnvUrl()),
  title: {
    default: "Gomotion – AI-Powered Motion Animation Video Generation",
    template: "%s | Gomotion",
  },
  description:
    "Gomotion transforms simple text prompts into stunning motion-graphic videos in seconds. Create, customise and scale high-quality animations without After-Effects or complex tooling.",
  keywords: [
    "Gomotion",
    "AI video generator",
    "motion graphics",
    "animation",
    "video creation",
    "LLM",
    "Remotion",
    "After-Effects alternative",
  ],
  openGraph: {
    title: "Gomotion – AI-Powered Motion Animation Video Generation",
    description:
      "Gomotion transforms simple text prompts into stunning motion-graphic videos in seconds. Create, customise and scale high-quality animations without After-Effects or complex tooling.",
    url: getEnvUrl(),
    siteName: "Gomotion",
    images: [
      {
        url: "/gomotion.png",
        width: 1200,
        height: 630,
        alt: "Gomotion logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gomotion – AI-Powered Motion Animation Video Generation",
    description:
      "Gomotion transforms simple text prompts into stunning motion-graphic videos in seconds. Create, customise and scale high-quality animations without After-Effects or complex tooling.",
    images: ["/gomotion.png"],
  },
  alternates: {
    canonical: getEnvUrl(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${foundersGroteskBold.variable} antialiased relative`}
      >
        <div className="px-5 sm:px-10">
          <Header />
          <LayoutProvider>{children}</LayoutProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
