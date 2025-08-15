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
import { Badge } from "../ui/badge";
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
            motion graphics Generation for creators and marketers.
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

      {/* selections grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7 pb-40">
        {motionDesignSelections.map((selection, index) => (
          <VideoDialog
            key={index}
            src={selection.url}
            title={selection.title}
            description={selection.description}
          >
            <div className="flex flex-col gap-4">
              <video
                src={selection.url}
                preload="metadata"
                playsInline
                autoPlay
                muted
                loop
                className="w-full min-h-[12rem] object-cover rounded-sm"
              />
              <div className="flex justify-end">
                {selection.narrative ? (
                  <Badge variant="secondary">Narrative mode</Badge>
                ) : (
                  <Badge variant="secondary">Default mode</Badge>
                )}
              </div>
            </div>
          </VideoDialog>
        ))}
      </section>
    </div>
  );
};

const motionDesignSelections: {
  title: string;
  description: string;
  url: string;
  narrative: boolean;
}[] = [
  {
    title: "Kynetic Button",
    description: `Design a magnetic Call to Action where the button gently follows the cursor within ~80px, lifts with
depth, text parallax, then springs back on mouseleave.`,
    url: "https://legendary.b-cdn.net/site-assets/kynetic-button.mov",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Text Reveal Blur",
    description: `Create a text reveal effect for "Discover the future" where each letter reveals one by one with a blur effect.`,
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: false,
  },
  {
    title: "Motion Design",
    description: "Create stunning motion graphics for your projects.",
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: true,
  },
  {
    title: "Motion Design",
    description: "Create stunning motion graphics for your projects.",
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: true,
  },
  {
    title: "Motion Design",
    description: "Create stunning motion graphics for your projects.",
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: true,
  },
  {
    title: "Motion Design",
    description: "Create stunning motion graphics for your projects.",
    url: "https://legendary.b-cdn.net/site-assets/text-reveal-blur.mp4",
    narrative: true,
  },
];
