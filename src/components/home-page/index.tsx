"use client";

import { PromptInput } from "@/components/prompt-input";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { VideoDialog } from "../video-dialog";

export const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".img-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { width: 0, opacity: 0 },
          {
            width: "auto",
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-[85rem] mx-auto pt-5 px-5 lg:px-12"
    >
      {/* hero */}
      <section className="reveal gap-10 sm:gap-2 flex flex-col items-center pt-36 pb-32">
        <div className="gap-10 flex flex-col items-center">
          <h1 className="text-center text-5xl sm:text-6xl lg:text-8xl max-w-3xl font-neue-montreal font-bold">
            The AI Motion Designer
          </h1>
          <p className="text-2xl max-w-xl text-center text-muted-foreground leading-relaxed">
            AI-powered{" "}
            <span className="align-middle rounded aspect-video w-[3rem] h-[4rem]  mb-2 inline-block overflow-hidden img-reveal">
              <Image
                width={100}
                height={100}
                alt="gomotion"
                className="object-cover w-full h-full align-middle"
                src="/images/register.jpg"
              />
            </span>{" "}
            motion graphics generation for creators and marketers.
          </p>
        </div>
        <div className="pt-10 w-full md:w-8/12 rounded-3xl">
          <div className="relative">
            <div className="absolute inset-0 rounded-[28px] bg-indigo-500 -z-50 opacity-60 group-hover:opacity-100 blur-2xl transition duration-500 will-change-transform"></div>
            <PromptInput
              className="min-h-[130px]  bg-neutral-50/90 z-1 border-[4px] border-indigo-500"
              landingButton={
                <Link href="/register">
                  <Button
                    variant="ghost"
                    className="rounded-full bg-indigo-200 font-medium text-indigo-900 hover:bg-indigo-300"
                  >
                    <ArrowUpIcon className="w-5 h-5" />
                  </Button>
                </Link>
              }
            />
          </div>
        </div>
      </section>

      {/* bento */}
      <section className="reveal">
        <div className="flex flex-col gap-5 pt-24">
          <div className="flex items-center">
            <div className="text-fuchsia-900 bg-fuchsia-100 px-5 h-10 rounded-full flex items-center justify-center">
              Transform Words Into Motion
            </div>
          </div>
          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[3.5rem]">
            Animate text from a simple prompt.
          </h2>
          <h3 className="text-xl leading-relaxed font-medium max-w-xl text-muted-foreground">
            Skip the keyframes—just describe how you want your text to move.
            GoMotion instantly animates titles, captions, and logos with
            cinematic flair. Perfect for product demo and creators who want
            professional results without the hassle.
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-4 py-24">
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/astra.mov"
            title="Astra Animation"
            description="A cinematic 3D particle explosion revealing the logo for ASTRA"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/astra.mov"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/text_stomp.mp4"
            title="Text Stomp"
            description="A vibrant, highly dynamic kinetic typography of 'gomotion the new after effect'"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/text_stomp.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/fireship_intro.mp4"
            title="Fireship Intro"
            description="A fireship-style intro to the brand Fireship, featuring a futuristic voiceover saying '100 second of code"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/fireship_intro.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/random-text.mp4"
            title="Gomotion typing"
            description="Create an apple ads random text animation"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/random-text.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/text-path.mp4"
            title="Text Path"
            description="Create a circular text path animation with a text 'Gomotion your motion designer'"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/text-path.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
        </div>
      </section>

      <section className="reveal bg-neutral-100 py-16 md:py-32 flex flex-col md:flex-row gap-10 md:gap-16 px-5 md:px-10 rounded-3xl">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <VideoDialog
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/gomotion-prompt.mp4"
              title="Gomotion typing"
              description="Create video about the capabilities of Gomotion, it should have prompt typing part"
              className="h-[18rem]"
            >
              <video
                src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/gomotion-prompt.mp4"
                preload="metadata"
                playsInline
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </VideoDialog>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-5 px-4 md:px-0">
          <div className="flex items-center">
            <div className="text-emerald-900 bg-emerald-100 px-5 h-10 rounded-full flex items-center justify-center">
              Complete Visual Storytelling
            </div>
          </div>

          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[3.5rem] sm:pr-5">
            Create end-to-end animations with voice-over
          </h2>

          <h3 className="text-xl leading-relaxed font-medium max-w-xl sm:pr-5 text-muted-foreground">
            Turn your script into full animated stories with synced voice-overs.
            Ideal for educators, founders, and creatives who need polished
            content fast—without the manual editing.
          </h3>
        </div>
      </section>

      {/* list */}
      <section className="reveal">
        <div className="flex flex-col gap-5 pt-24">
          <div className="flex items-center">
            <div className="text-amber-900 bg-amber-100  px-5 h-10 rounded-full flex items-center justify-center">
              Master Shape Dynamics
            </div>
          </div>

          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[3.5rem]">
            Move shapes in complex animations
          </h2>
          <h3 className="text-xl leading-relaxed font-medium max-w-xl text-muted-foreground">
            Create advanced shape animations in seconds. From geometric morphs
            to fluid motion, GoMotion handles the complexity so you can focus on
            creativity. Great for explainers, data viz, and artistic visuals
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4 py-24">
          <VideoDialog
            src="https://legendary.b-cdn.net/site/showcase-video/eclipse.mp4"
            title="Eclipse"
            description="The word 'Eclipse' in a retro-futuristic style with letter glitching effects."
          >
            <video
              src="https://legendary.b-cdn.net/site/showcase-video/eclipse.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/kynetic-button.mov"
            title="Kynetic Button"
            description="Create a kynetic button animation"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/kynetic-button.mov"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://legendary.b-cdn.net/site/morph.mp4"
            title="Morph"
            description="Create morphing rainbow explainer animation."
          >
            <video
              src="https://legendary.b-cdn.net/site/morph.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
          <VideoDialog
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/cryptic.mp4"
            title="Cryptic"
            description="Create futuristic animation with a text 'Cryptic'"
          >
            <video
              src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/cryptic.mp4"
              preload="metadata"
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </VideoDialog>
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
              Get started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};
