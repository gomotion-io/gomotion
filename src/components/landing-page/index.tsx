"use client";

import Capabilities from "@/components/landing-page/capabilities";
import Footer from "@/components/landing-page/footer";
import Intro from "@/components/landing-page/intro";
import { Showcase } from "@/components/landing-page/showcase";
import { Usecase } from "@/components/landing-page/usecase";

export default function LandingPage() {
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
