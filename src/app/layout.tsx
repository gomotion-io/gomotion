import { AuthProvider } from "@/components/auth-provider";
import { LayoutProvider } from "@/components/layout-provider";
import { Header } from "@/components/ssr/header";
import { foundersGroteskBold } from "@/fonts";
import { getEnvUrl } from "@/lib/utils";
import { getProfile } from "@/supabase/server-functions/profile";
import { getUser } from "@/supabase/server-functions/users";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
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
    images: ["/images/logos/logo_light.png"],
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
        className={`${roboto.variable} ${foundersGroteskBold.variable} antialiased relative`}
      >
        <div>
          <Header />
          <AuthProvider initialUser={user} initialProfile={profile}>
            <LayoutProvider>{children}</LayoutProvider>
          </AuthProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
