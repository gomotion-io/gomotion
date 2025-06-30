import { Gallery } from "@/components/landing-page/gallery";
import type { Metadata } from "next";
import Intro from "@/components/landing-page/intro";

export const metadata: Metadata = {
  title: "Gomotion",
  description:
    "Shaping the future of motion-graphics: generate AI-powered animated videos from a single prompt with Gomotion.",
};

export default function Home() {
  return (
    <div>
      <Intro />
      <Gallery />
    </div>
  );
}
