"use client";

import Copy from "@/components/landing-page/intro/copy";

import { CallToAction } from "@/components/call-to-action";
import { CustomPlayer } from "@/components/custom-player";
import { useGSAP } from "@gsap/react";
import { cx } from "class-variance-authority";
import { gsap } from "gsap";
import localFont from "next/font/local";
import Image from "next/image";
import { useRef } from "react";

const neueMontreal = localFont({
  src: "../../../../public/fonts/PPNeueMontreal-Bold.otf",
});

export default function Intro() {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  // Register plugin once – gsap ignores duplicate calls.
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (!videoWrapperRef.current) return;

    gsap.from(videoWrapperRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 40,
      duration: 1,
      delay: 1.2, // starts after the first heading animation finishes
      ease: "power4.out",
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <section className="relative flex flex-col items-center pt-[1rem] sm:pt-[2rem] w-full lg:w-1/2 overflow-hidden text-stone-100  lg:h-[100svh]">
        <div className=" pb-10 flex flex-col justify-center lg:items-start items-center mt-20 sm:mt-28">
          <Copy animateOnScroll={false} delay={0.5}>
            <h3
              className={cx(
                "text-white -ml-2 font-medium lg:max-w-xl text-center sm:text-start leading-relaxed text-6xl md:text-7xl mb-2",
                neueMontreal.className
              )}
            >
              GOMOTION
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.6}>
            <h3 className="text-white font-medium sm:max-w-xl text-center sm:text-start leading-relaxed text-xl mb-2">
              No After Effects. Just Prompts
            </h3>
          </Copy>
          <Copy animateOnScroll={false} delay={0.7}>
            <h3 className="text-stone-400 text-center lg:text-start px-5 lg:px-0 max-w-full lg:max-w-md text-balance leading-relaxed text-xl ">
              Create stories that stick — effortlessly. <br /> First frontier AI
              model for motion-driven storytelling
            </h3>
          </Copy>

          <Copy animateOnScroll={false} delay={0.8}>
            <div className="flex -ml-5">
              <div className="relative w-[5rem] h-[5rem] flex items-center justify-center">
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

              <Image
                src="/images/arrow-right.svg"
                alt="x"
                width={80}
                height={80}
                unoptimized
              />

              <div className="relative w-[5rem] h-[5rem] flex items-center justify-center">
                <Image
                  src="/images/gomotion.svg"
                  alt="gomotion"
                  width={30}
                  height={30}
                  unoptimized
                />
              </div>
            </div>
          </Copy>

          <Copy animateOnScroll={false} delay={0.9}>
            <div className="text-stone-400 italic hero-icon mb-5">
              &#34;Next Gen Motion Design. Without the Old Tools.&#34;
            </div>
          </Copy>

          <Copy animateOnScroll={false} delay={1}>
            <CallToAction />
          </Copy>
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center w-full lg:w-1/2 h-[100svh] overflow-hidden">
        <div
          ref={videoWrapperRef}
          className="h-[90vh] w-full flex items-center justify-center"
        >
          <CustomPlayer
            url="https://legendary.b-cdn.net/website/intro.mp4"
            poster="https://legendary.b-cdn.net/website/intro-poster.webp"
            width="100%"
            height="100%"
            playsinline
          />
        </div>
      </section>
    </div>
  );
}
