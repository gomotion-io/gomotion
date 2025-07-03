"use client";

import { CustomPlayer } from "@/components/custom-player";
import Copy from "@/components/landing-page/intro/copy";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import localFont from "next/font/local";
import { cx } from "class-variance-authority";

const neueMontreal = localFont({
  src: "../../../../public/fonts/PPNeueMontreal-Bold.otf",
});

export default function Intro() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <section className="relative flex flex-col items-center justify-center w-full lg:w-1/2 overflow-hidden text-stone-100 h-[100svh]">
        <div className="flex flex-col justify-center lg:items-start items-center">
          <Copy animateOnScroll={false} delay={0.9}>
            <h3
              className={cx(
                "text-white -ml-2 font-medium lg:max-w-xl text-center sm:text-start leading-relaxed text-6xl md:text-7xl mb-2",
                neueMontreal.className,
              )}
            >
              GOMOTION
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.9}>
            <h3 className="text-white font-medium sm:max-w-xl text-center sm:text-start leading-relaxed text-xl mb-2">
              Create stories that stick
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.9}>
            <h3 className="text-stone-400 text-center lg:text-start px-5 lg:px-0 max-w-full lg:max-w-lg text-balance leading-relaxed text-xl mb-7">
              The frontier AI model for motion-design driven storytelling,
              unleash scroll-stopping videos from a single prompt.
            </h3>
          </Copy>
          <Link href="/register">
            <Button
              className="intro-button w-52 cursor-pointer h-12 hover:bg-opacity-50 hover:scale-105 transition-all duration-300"
              size="lg"
              variant="outline"
            >
              Get started <ArrowRight />
            </Button>
          </Link>
        </div>

        {/*<div className="lg:flex w-full gap-5 text-stone-400 pl-40 px-5 sm:px-10">*/}
        {/*  <Copy animateOnScroll={false} delay={1.5}>*/}
        {/*    <div className="font-medium leading-snug uppercase ">*/}
        {/*      +50K subscribers{" "}*/}
        {/*    </div>*/}
        {/*  </Copy>*/}
        {/*  <Copy animateOnScroll={false} delay={1.7}>*/}
        {/*    <div className="font-medium leading-snug uppercase">*/}
        {/*      +10k videos generated*/}
        {/*    </div>*/}
        {/*  </Copy>*/}
        {/*</div>*/}
      </section>

      <section className="relative flex items-center justify-center w-full lg:w-1/2 h-[60vh] lg:h-[100svh] overflow-hidden">
        <div className="relative capability-player w-full h-full">
          <CustomPlayer
            url="https://legendary.b-cdn.net/website/works.mp4"
            width="100%"
            height="100%"
            playsinline
            style={{ position: "absolute", top: 0, left: 0 }}
            config={{
              file: {
                attributes: {
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}
