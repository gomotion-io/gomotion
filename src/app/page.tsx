import { Header } from "@/components/header";
import { Gallery } from "@/components/landing-page/gallery";
import { foundersGroteskBold } from "@/fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Shaping the future of motion-graphics: generate AI-powered animated videos from a single prompt with Gomotion.",
};

export default function Home() {
  return (
    <div>
      <Header />
      <div
        className={`${foundersGroteskBold.className} mt-2 text-6xl sm:text-7xl md:text-8xl font-bold mb-10`}
      >
        Shaping the future of <br />
        <span className="text-stone-500">Motion</span> animation
      </div>
      <div className="max-w-xl mb-32 font-medium leading-loose">
        Gomotion is a research-driven platform for next-generation motion
        animation video generation. Our mission is to transform how animated
        content is created — by fine-tuning a coding-native large language model
        (LLM) and empowering it with an agentic workflow capable of producing
        dynamic animations from a single text prompt.
      </div>
      <Gallery />
    </div>
  );
}
