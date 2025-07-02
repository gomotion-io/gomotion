"use client";
import Capabilities from "@/components/landing-page/capabilities";
import Footer from "@/components/landing-page/footer";
import Intro from "@/components/landing-page/intro";
import { Showcase } from "@/components/landing-page/showcase";
import { useLandingPageAnimation } from "@/components/landing-page/use-animation";
import { Usecase } from "@/components/landing-page/usecase";

export default function LandingPage() {
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
