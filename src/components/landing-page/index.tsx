"use client";

import { Hero } from "@/components/landing-page/hero";
import { Intro } from "@/components/landing-page/intro";
import { CaseStudies } from "@/components/landing-page/case-studies";
import { Showcase } from "@/components/landing-page/showcase";
import { Footer } from "@/components/landing-page/footer";
import { Further } from "@/components/landing-page/further";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Intro />
      <CaseStudies />
      <Showcase />
      <Further />
      <Footer />
    </div>
  );
}
