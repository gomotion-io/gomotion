"use client";

import { Header } from "@/components/header";
import { Gallery } from "@/components/landing-page/gallery";
import { foundersGroteskBold } from "@/fonts";

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
      <div className="max-w-2xl mb-32 font-medium">
        Gomotion is a research led motion animation video generation platform
        with the goal to finetune a coding LLM to generate motion animation
        video boosted with an Agentic workflow from single prompt. Using coding
        as video frameworks we should be able to slash hours or days of
        after-effect animations to seconds and a prompt. Giving the power to
        anyone to express their idea via animated video.
      </div>
      <Gallery />
    </div>
  );
}
