"use client";

import { CallToAction } from "@/components/call-to-action";
import Copy from "@/components/landing-page/intro/copy";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoItem } from "./video-item";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Showcase = () => {
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".showcase-item");

    items.forEach((item, i) => {
      gsap.set(item, { y: 40 * (i + 0.5), opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 105%",
            end: "top 50%",
            scrub: true,
          },
        })
        .to(item, {
          y: 0,
          opacity: 1,
          ease: "power3.Out",
        });
    });
  }, []);

  return (
    <div className="flex flex-col pb-16 sm:pb-20 px-5 sm:px-10 bg-black">
      <div className="w-full flex gap-5 text-stone-100 pt-16 mb-14">
        <div className="flex-[2] lg:flex-[2]">
          <Copy animateOnScroll={true}>
            <h3 className="font-medium text-4xl leading-snug mb-2">
              Start creating your own{" "}
              <span className="text-stone-400">stories</span>
            </h3>
          </Copy>

          <Copy animateOnScroll={true}>
            <h3 className="text-balance leading-relaxed ">
              Below, explore a dynamic showcase of real clips our users
              generated — each crafted to maximize watch time and social
              shares—each crafted to maximize watch time and social shares.
            </h3>
          </Copy>
        </div>
        <div className="hidden lg:flex flex-[4]"></div>
      </div>

      <div className="w-full">
        <div className="">
          <div className="w-full">
            <div className="flex w-full flex-col gap-4 my-4 lg:flex-row">
              <VideoItem
                videoUrl="https://vimeo.com/437808118"
                index="01"
                workName="Azure Serenity Echoes"
              />
              <VideoItem
                videoUrl="https://vimeo.com/871750630"
                index="02"
                workName="Solar Reverie"
              />
              <VideoItem
                videoUrl="https://vimeo.com/477068055"
                index="03"
                workName="Crimson Symphony Memoirs"
              />
            </div>
            <div className="flex w-full flex-col gap-4 my-4 lg:flex-row">
              <VideoItem
                videoUrl="https://vimeo.com/487114118"
                index="04"
                workName="Neon Galactic Chronicles"
              />
              <VideoItem
                videoUrl="https://vimeo.com/366780994"
                index="05"
                workName="Velvet Dreamscape"
              />
              <VideoItem
                videoUrl="https://vimeo.com/659334960"
                index="06"
                workName="Lunar Symphony"
              />
            </div>
            <div className="flex w-full flex-col gap-4 my-4 lg:flex-row">
              <VideoItem
                videoUrl="https://vimeo.com/533729157"
                index="07"
                workName="Oceanic Memoirs Echoes"
              />
              <VideoItem
                videoUrl="https://vimeo.com/500832353"
                index="08"
                workName="Twilight Dreamscape Saga"
              />
              <VideoItem
                videoUrl="https://vimeo.com/510814675"
                index="09"
                workName="Galactic Odyssey"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-5">
        <div className="flex-[2] lg:flex-[4]"></div>
        <div className="lg:flex flex-[3] md:flex-[1] flex-col gap-5 justify-end">
          <Copy animateOnScroll={true}>
            <div className=" leading-snug uppercase text-stone-400  mb-5 lg:mb-2">
              You&apos;re one prompt away from the next viral video.
            </div>
          </Copy>
          <div className="mb-5">
            <Copy animateOnScroll>
              <CallToAction />
            </Copy>
          </div>
        </div>
      </div>
    </div>
  );
};
