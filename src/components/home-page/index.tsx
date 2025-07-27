"use client";

import MotionFooter from "@/components/home-page/motion-footer";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import { PromptInput } from "@/components/prompt-input";
import { BackgroundGradient } from "@/components/background-gradient";

export const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP scroll-triggered animations
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto border-x border-dashed pt-5 px-5 lg:px-12"
    >
      {/* hero */}
      <section className="reveal gap-10 sm:gap-2 flex flex-col md:flex-row pt-40 pb-32">
        <div className="gap-10 flex flex-col">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl max-w-3xl font-neue-montreal font-bold">
            The AI Motion Designer
          </h1>
          <p className="text-2xl max-w-xl font-light text-muted-foreground">
            AI-powered motion graphics generation for creators and marketers.
          </p>
        </div>
        <div className="pt-40  w-full md:w-10/12 rounded-3xl">
          <BackgroundGradient>
            <PromptInput
              className="min-h-[130px] bg-neutral-50"
              isLandingPage
            />
          </BackgroundGradient>
        </div>
      </section>

      {/* bento */}
      <section className="reveal">
        <div className="flex flex-col gap-5 pt-24">
          <div className="flex items-center">
            <div className="text-fuchsia-900 bg-fuchsia-100  px-5 h-10 rounded-full flex items-center justify-center">
              Transform Words Into Motion
            </div>
          </div>
          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[1.2em]">
            Animate text from a simple prompt.
          </h2>
          <h3 className="text-2xl font-neue-montreal font-medium max-w-xl leading-[1.2em]">
            Skip the keyframes—just describe how you want your text to move.
            GoMotion instantly animates titles, captions, and logos with
            cinematic flair. Perfect for product demo and creators who want
            professional results without the hassle.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 md:grid-rows-2 auto-rows-fr gap-4 my-10 md:my-20">
          <div className="rounded-3xl overflow-hidden bg-neutral-100 col-auto row-auto md:col-span-2 md:row-span-2 h-40 sm:h-48 md:h-60 p-2">
            <video
              src="https://legendary.b-cdn.net/site/showcase-video/astra.mov"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover pointer-events-none rounded-lg"
            />
          </div>
          <div className="rounded-3xl overflow-hidden bg-neutral-100 col-auto row-auto md:col-span-2 md:row-span-2 h-40 sm:h-48 md:h-60 p-2">
            <video
              src="https://legendary.b-cdn.net/site/text_stomp.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover pointer-events-none rounded-lg"
            />
          </div>
          <div className="rounded-3xl overflow-hidden bg-neutral-100 col-auto row-auto md:col-span-2 md:row-span-2 h-40 sm:h-48 md:h-60 p-2">
            <video
              src="https://legendary.b-cdn.net/site/showcase-video/fireship_intro.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover pointer-events-none rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* carousel */}
      <section className="reveal bg-neutral-100 py-16 md:py-24 flex flex-col md:flex-row gap-10 md:gap-0 rounded-3xl">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          1
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-5 px-4 md:px-0 mt-5">
          <div className="flex items-center">
            <div className="text-emerald-900 bg-emerald-100 px-5 h-10 rounded-full flex items-center justify-center">
              Master Shape Dynamics
            </div>
          </div>
          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[1.2em] sm:pr-5">
            Move shapes in complex animations.
          </h2>
          <h3 className="text-2xl font-neue-montreal font-medium max-w-xl leading-[1.2em] sm:pr-5">
            Create advanced shape animations in seconds. From geometric morphs
            to fluid motion, GoMotion handles the complexity so you can focus on
            creativity. Great for explainers, data viz, and artistic visuals
          </h3>
        </div>
      </section>

      {/* list */}
      <section className="reveal">
        <div className="flex flex-col gap-5 pt-24">
          <div className="flex items-center">
            <div className="text-amber-900 bg-amber-100  px-5 h-10 rounded-full flex items-center justify-center">
              Complete Visual Storytelling
            </div>
          </div>
          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[1.2em]">
            Create end-to-end animations with voice-over
          </h2>
          <h3 className="text-2xl font-neue-montreal font-medium max-w-xl leading-[1.2em]">
            Turn your script into full animated stories with synced voice-overs.
            Ideal for educators, founders, and creatives who need polished
            content fast—without the manual editing.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 md:grid-rows-4 auto-rows-fr gap-4 h-[32rem] sm:h-[40rem] my-10 md:my-20">
          <div className="col-span-2 md:col-span-4 row-span-1 md:row-span-2 rounded-3xl p-2 bg-neutral-100">
            <video
              src="https://legendary.b-cdn.net/site/showcase-video/eclipse.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover pointer-events-none rounded-lg"
            />
          </div>
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-4 md:col-start-5 rounded-3xl p-2 bg-neutral-100">
            2
          </div>
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-2 md:row-start-3 rounded-3xl p-2 bg-neutral-100">
            3
          </div>
          <div className="col-span-2 row-span-1 md:col-span-2 md:row-span-2 md:col-start-3 md:row-start-3 rounded-3xl p-2 bg-neutral-100">
            <video
              src="https://legendary.b-cdn.net/site/showcase-video/cryptic.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover pointer-events-none rounded-lg"
            />
          </div>
        </div>
      </section>

      <section className="reveal flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left pt-10 pb-32">
        <div className="flex flex-col gap-10">
          <div className="text-2xl flex flex-col gap-3">
            <p>We are young</p>
            <p>We are passionates</p>
            <p>We are storytellers</p>
            <p>We are innovators turning big ideas into motion</p>
            <p>We are redefining how stories move</p>
          </div>

          <Link href="/sign-in">
            <button className="text-emerald-900 hover:bg-emerald-200 transition-colors px-10 duration-300 bg-emerald-100 font-medium text-lg w-full sm:w-60 lg:w-80 h-14 sm:h-16 rounded-full">
              Request access
            </button>
          </Link>
        </div>
      </section>

      <MotionFooter />
    </div>
  );
};
