"use client";

import { PromptInput } from "@/components/prompt-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { ArrowUpIcon } from "@heroicons/react/16/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gridBase, Tile } from "../bento";

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
            <span className="align-middle rounded aspect-video w-[6rem] h-[4rem]  mb-2 inline-block overflow-hidden">
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

      <section className="reveal">
        <div className="flex flex-col xl:items-start items-center gap-5 pt-24">
          <div className="flex justify-center xl:justify-start items-center">
            <div className="text-fuchsia-900 bg-fuchsia-100 px-5 h-10 rounded-full flex items-center justify-center">
              Transform Words Into Motion
            </div>
          </div>
          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[3.5rem] text-center xl:text-left">
            Animate text from a simple prompt.
          </h2>
          <h3 className="text-xl leading-relaxed font-medium max-w-xl text-muted-foreground text-center xl:text-left">
            Skip the keyframes—just describe how you want your text to move.
            GoMotion instantly animates titles, captions, and logos with
            cinematic flair. Perfect for product demo and creators who want
            professional results without the hassle.
          </h3>
        </div>
        <div className={cn(gridBase, "py-20")}>
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/astra.mov"
            title="Astra Animation"
            description="A cinematic 3D particle explosion revealing the logo for ASTRA"
          />
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/text_stomp.mp4"
            title="Text Stomp"
            description="A vibrant, highly dynamic kinetic typography of 'gomotion the new after effect'"
          />
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/fireship_intro.mp4"
            title="Fireship Intro"
            description="A fireship-style intro to the brand Fireship, featuring a futuristic voiceover saying '100 second of code"
          />
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/random-text.mp4"
            title="Gomotion typing"
            description="Create an apple ads random text animation"
          />
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/symphony-of-motion.mp4"
            title="Symphony of Motion"
            description="Create a colorful kinetic typography animation with a text 'Symphony of Motion'"
          />
          <Tile
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/nike-short.mp4"
            title="Nike Short"
            description="Create a nike short animation with a text 'Nike Short'"
          />
        </div>
      </section>

      <section className="reveal justify-center bg-neutral-100 py-20 flex flex-col gap-10 md:gap-16 px-5 md:px-14 rounded-3xl mb-24">
        <h2 className="text-6xl text-center font-neue-montreal font-bold leading-[3.5rem]">
          Discover the Narrative Mode
        </h2>
        <div className="w-full xl:h-[45rem] bg-neutral-50 pt-4 rounded-3xl border-emerald-500 border-4 overflow-hidden">
          <video
            src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/jdi-mobile.mp4"
            preload="metadata"
            playsInline
            autoPlay
            muted
            loop
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col-reverse xl:flex-row gap-10 md:gap-16">
          <div className="w-full xl:w-2/3 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <video
                src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/jdi.mp4"
                preload="metadata"
                playsInline
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full xl:w-1/3 flex flex-col items-center xl:items-start gap-5 sm:px-4 md:px-0">
            <h2 className="text-5xl font-neue-montreal text-center xl:text-left font-bold max-w-xl leading-[3.5rem] sm:pr-5">
              Create end-to-end ready to publish ads
            </h2>

            <div className="flex items-center">
              <div className="text-emerald-900 bg-emerald-100 px-5 h-10 rounded-full flex items-center justify-center">
                Master Shape Dynamics
              </div>
            </div>

            <h3 className="text-xl leading-relaxed font-medium max-w-xl sm:pr-5 text-muted-foreground text-center xl:text-left">
              Using the gomotion narrative mode, you can turn your script into
              full animated stories with synced images and videos.You can now
              create an ads or a short video in minutes.
            </h3>
          </div>
        </div>
      </section>

      {/* Design for any screen  */}
      <section className="reveal flex flex-col xl:flex-row items-center justify-between mb-20">
        <div className="flex flex-col gap-5 pt-24 mb-20">
          <div className="flex items-center justify-center xl:justify-start">
            <div className="text-amber-900 bg-amber-100  px-5 h-10 rounded-full flex items-center justify-center">
              Design for any screen
            </div>
          </div>

          <h2 className="text-5xl text-center xl:text-left font-neue-montreal font-bold max-w-xl leading-[3.5rem]">
            Designed for every screen from mobile to desktop.
          </h2>
          <h3 className="text-xl text-center xl:text-left leading-relaxed font-medium max-w-xl text-muted-foreground">
            Your audience is everywhere and your content should be too. Create
            animations for all screen sizes, from smartphones, tablets to
            desktop displays. Whether designing a product teaser for Instagram
            or TikTok your video will look perfectly aligned.
          </h3>
        </div>

        <video
          src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/phone-reveal.mp4"
          preload="metadata"
          playsInline
          autoPlay
          muted
          loop
          className="w-auto h-[35rem] border-4 border-amber-500 rounded-3xl"
        />
      </section>

      {/* Import your brand*/}
      <section className="reveal mb-20 flex flex-col items-center">
        <div className="flex flex-col items-center gap-5 pt-24 mb-20">
          <div className="flex items-center">
            <div className="text-indigo-900 bg-indigo-100 text-center px-5 h-10 rounded-full flex items-center justify-center">
              Animation for your brand
            </div>
          </div>

          <h2 className="text-5xl text-center font-neue-montreal font-bold max-w-xl leading-[3.5rem]">
            Import your brand in one click
          </h2>
          <h3 className="text-xl text-center leading-relaxed font-medium max-w-xl text-muted-foreground">
            Easily import your brand to create videos from a simple image.
            Perfect for social media, product launches, ads, and more.
          </h3>
        </div>

        <video
          src="https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/brand-import.mp4"
          preload="metadata"
          playsInline
          autoPlay
          muted
          loop
          className="w-auto h-[35rem] border-4 border-indigo-500 rounded-3xl"
        />
      </section>

      {/*  Chart and complex animations */}
      <section className="reveal mb-20">
        <div className="flex flex-col xl:items-start items-center gap-5 pt-24 mb-20">
          <div className="flex justify-center xl:justify-start items-center">
            <div className="text-fuchsia-900 bg-fuchsia-100 px-5 h-10 rounded-full flex items-center justify-center">
              Complex animations
            </div>
          </div>

          <h2 className="text-5xl font-neue-montreal font-bold max-w-xl leading-[3.5rem] text-center xl:text-left">
            Create complex animations likes chart and simulation
          </h2>
          <h3 className="text-xl leading-relaxed font-medium max-w-xl text-muted-foreground text-center xl:text-left">
            Create animated charts from any data, ideal for explainers,
            simulations, and impactful presentations.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-3">
          {shapesVideo.map((video, idx) => (
            <Tile
              key={video.title + idx}
              src={video.src}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      </section>

      <section className="reveal flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left pt-10 pb-32">
        <div className="flex flex-col gap-10">
          <div className="text-2xl flex flex-col gap-3 font-semibold">
            <p>We are young</p>
            <p>We are passionates</p>
            <p>We are storytellers</p>
            <p>We are innovators turning big ideas into motion</p>
            <p>We are redefining how stories move</p>
          </div>

          <Link href="/sign-in">
            <button className="text-indigo-900 cursor-pointer flex items-center justify-center gap-2 font-semibold border-2 border-indigo-500 hover:bg-indigo-200 transition-colors px-10 duration-300 bg-indigo-100 text-lg w-full sm:w-60 lg:w-80 h-14 sm:h-16 rounded-xl">
              Try Gomotion for free <span className="text-2xl"> 🤩</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const shapesVideo = [
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/bar-chart-ai-models.mp4",
    title: "Best AI Models",
    description:
      "Create a bar chart representing the best ai models in a white background",
    className: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/chart.mp4",
    title: "Chart",
    description: "Create a dynamic chart inspired from this image",
  },
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/donut.mp4",
    title: "Donut",
    description: "Create a donut chart animation fromt this image",
  },
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/countdown.mov",
    title: "Countdown",
    description: "Create a countdown animation with a text 'Countdown'",
    className: "col-span-12 md:col-span-4 row-span-2",
  },

  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/iphone-message.mp4",
    title: "Iphone Message",
    description: "Create a message animation on an iphone",
  },
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/kynetic-button.mov",
    title: "Kynetic Button",
    description: "Create a kynetic button animation",
  },
  {
    src: "https://uftbovflyenqlyxvpybv.supabase.co/storage/v1/object/public/website-assets/cryptic.mp4",
    title: "Cryptic",
    description: "Create futuristic animation with a text 'Cryptic'",
  },
];
