"use client";

import Copy from "@/components/landing-page/intro/copy";

import localFont from "next/font/local";
import { cx } from "class-variance-authority";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
import { CustomPlayer } from "@/components/custom-player";
import { CallToAction } from "@/components/call-to-action";

const neueMontreal = localFont({
  src: "../../../../public/fonts/PPNeueMontreal-Bold.otf",
});

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

export default function Intro() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <section className="relative flex flex-col items-center pt-[1rem] sm:pt-[2rem] w-full lg:w-1/2 overflow-hidden text-stone-100 mb-20 lg:mb-0 lg:h-[100svh]">
        <div className="flex flex-col justify-center lg:items-start items-center mt-20 sm:mt-28">
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
              No After Effects. Just Prompts
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.9}>
            <h3 className="text-stone-400 text-center lg:text-start px-5 lg:px-0 max-w-full lg:max-w-md text-balance leading-relaxed text-xl ">
              Create stories that stick — effortlessly. <br /> First frontier AI
              model for motion-driven storytelling
            </h3>
          </Copy>

          <div className="flex -ml-5">
            <div className="relative w-[5rem] h-[5rem] flex items-center justify-center hero-icon">
              <Image
                src="/images/ae.svg"
                alt="ae"
                width={40}
                height={40}
                unoptimized
              />
              <Image
                src="/images/x.svg"
                alt="x"
                width={70}
                height={70}
                unoptimized
                className="absolute"
              />
            </div>

            <div className="hero-icon">
              <Image
                src="/images/arrow-right.svg"
                alt="x"
                width={80}
                height={80}
                unoptimized
              />
            </div>

            <div className="relative w-[5rem] h-[5rem] flex items-center justify-center hero-icon">
              <Image
                src="/images/gomotion.svg"
                alt="gomotion"
                width={30}
                height={30}
                unoptimized
              />
            </div>
          </div>

          <div className="text-stone-400 italic hero-icon mb-5">
            &#34;Next Gen Motion Design. Without the Old Tools.&#34;
          </div>

          <CallToAction />
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center w-full lg:w-1/2 h-[100svh] overflow-hidden">
        <div className="h-[70vh] w-full sm:pt-20">
          <CustomPlayer
            url="https://legendary.b-cdn.net/website/works.mp4"
            width="100%"
            height="100%"
            playsinline
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>

        <div className="h-[30vh] w-full overflow-hidden flex items-center justify-center">
          <div className="scale-135">
            <ReactPlayer
              url={`https://legendary.b-cdn.net/website/prompting.mp4`}
              controls={false}
              autoPlay={true}
              loop={true}
              playing
              muted
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
