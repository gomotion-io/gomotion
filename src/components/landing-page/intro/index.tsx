"use client";

import Copy from "@/components/landing-page/intro/copy";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const Scene = dynamic(
  () =>
    import("@/components/landing-page/intro/scene").then((mod) => mod.Scene),
  { ssr: false },
);

export default function Intro() {
  return (
    <>
      <section className="relative w-screen overflow-hidden text-stone-100 h-[100svh]">
        <Scene />

        <div className="absolute w-full left-1/2 bottom-0 sm:bottom-1/7 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center justify-center">
            <Copy animateOnScroll={false} delay={0.9}>
              <h3 className="text-white font-medium sm:max-w-xl px-5 leading-relaxed text-center text-xl mb-2">
                Create stories that stick
              </h3>
            </Copy>
            <Copy animateOnScroll={false} delay={0.9}>
              <h3 className="text-stone-400 sm:max-w-lg px-5 leading-relaxed text-center text-xl mb-7">
                The frontier AI model for motion-design-driven storytelling
                unleash scroll-stopping videos from a single prompt.
              </h3>
            </Copy>
            <Button
              className="intro-button w-52 cursor-pointer h-12 hover:bg-opacity-50 hover:scale-105 transition-all duration-300"
              size="lg"
              variant="outline"
            >
              Try for free <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="absolute w-full flex bottom-[4svh]" style={{ left: 0 }}>
          <div className="lg:flex w-full gap-5 text-stone-400 justify-center px-5 sm:px-10">
            <Copy animateOnScroll={false} delay={1.5}>
              <div className="font-medium leading-snug uppercase ">
                +50K subscribers{" "}
              </div>
            </Copy>
            <Copy animateOnScroll={false} delay={1.7}>
              <div className="font-medium leading-snug uppercase">
                +10k videos generated
              </div>
            </Copy>
          </div>
        </div>
      </section>
    </>
  );
}
