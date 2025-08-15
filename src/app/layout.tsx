import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer";
import { LayoutProvider } from "@/components/layout-provider";
import { HeaderWrapper } from "@/components/ssr/header-wrapper";
import { getEnvUrl } from "@/lib/utils";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/neue-montreal/ppneuemontreal-semibolditalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-neue-montreal", // Define a CSS variable
  display: "swap",
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
      "Create scroll-stopping, motion-designed videos from a single prompt. GoMotion is a cutting-edge AI model that generates voiceovers, music, and storytelling structures to drive engagement on YouTube, TikTok, Instagram, and more.",
    url: getEnvUrl(),
    siteName: "Gomotion",
    images: [
      {
        url: "/images/gomotion.png",
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
    title: "Gomotion – Frontier model for stories that stick",
    description:
      "Gomotion transforms simple text prompts into stunning motion-graphic videos in seconds. Create, customise and scale high-quality animations without After-Effects or complex tooling.",
    images: ["/images/gomotion.png"],
  },
  alternates: {
    canonical: getEnvUrl(),
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getUser();
  const profile = user ? await getProfile(user.id) : null;

  return (
    <html lang="en">
      <body
        className={`${neueMontreal.variable} font-sans font-medium antialiased relative bg-neutral-50`}
      >
        <HeaderWrapper />
        <AuthProvider initialUser={user} initialProfile={profile}>
          <LayoutProvider>{children}</LayoutProvider>
        </AuthProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
