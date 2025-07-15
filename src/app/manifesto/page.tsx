import LandingPage from "@/components/landing-page";
import ManifestoPage from "@/components/manifesto-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gomotion",
  description:
    "Create scroll-stopping, motion-designed videos from a single prompt. GoMotion is a cutting-edge AI model that generates voiceovers, music, and storytelling structures to drive engagement on YouTube, TikTok, Instagram, and more.",
};

export default function Home() {
  return <ManifestoPage />;
}
