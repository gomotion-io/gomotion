"use client";
import Intro from "@/components/landing-page/intro";
import Capabilities from "@/components/landing-page/capabilities";
import Footer from "@/components/landing-page/footer";
import { Showcase } from "@/components/landing-page/showcase";
import { Usecase } from "@/components/landing-page/usecase";
import { useLandingPageAnimation } from "@/components/landing-page/use-animation";

// export const metadata: Metadata = {
//   title: "Gomotion",
//   description:
//     "Create scroll-stopping, motion-designed videos from a single prompt. GoMotion is a cutting-edge AI model that generates voiceovers, music, and storytelling structures to drive engagement on YouTube, TikTok, Instagram, and more.",
// };

export default function Home() {
  useLandingPageAnimation();

  return (
    <div>
      <Intro />
      <Capabilities />
      <Showcase />
      <Usecase />
      <Footer />
    </div>
  );
}
