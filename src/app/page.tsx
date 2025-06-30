import { Gallery } from "@/components/landing-page/gallery";
import type { Metadata } from "next";
import Image from "next/image";
import Intro from "@/components/landing-page/intro";

export const metadata: Metadata = {
  title: "Gomotion",
  description:
    "Shaping the future of motion-graphics: generate AI-powered animated videos from a single prompt with Gomotion.",
};

export default function Home() {
  return (
    <div>
      <div className="absolute top-0 -z-50">
        <Image
          width={1920}
          height={1080}
          src="/images/gradient-top.webp"
          alt=""
        />
      </div>
      <Intro />
      <Gallery />
      <div className="h-screen  bg-white"></div>
      <Image
        width={1920}
        height={1080}
        src="/images/gradient-bottom.webp"
        alt=""
      />
    </div>
  );
}
