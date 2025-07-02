"use client";

import Copy from "@/components/landing-page/intro/copy";
import { VideoItem } from "./video-item";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export const Showcase = () => {
  return (
    <div className="flex flex-col mb-24 px-5 sm:px-10 bg-black">
      <div className="w-full flex gap-5 text-stone-100 pt-16 mb-14">
        <div className="flex-[2] lg:flex-[2]">
          <Copy animateOnScroll={true}>
            <h3 className="font-medium text-4xl leading-snug mb-2">
              Some examples made by the{" "}
              <span className="text-stone-400">community</span>
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
          <div className="flex flex-col lg:flex-row gap-4 py-5 w-full">
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="01"
              workName="Azure Serenity Echoes"
            />
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="02"
              workName="Solar Reverie"
            />
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="03"
              workName="Crimson Symphony Memoirs"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 py-5 w-full">
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="04"
              workName="Neon Galactic Chronicles"
            />
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="05"
              workName="Velvet Dreamscape"
            />
            <VideoItem
              videoUrl="https://legendary.b-cdn.net/website/sample.mp4"
              index="06"
              workName="Lunar Symphony"
            />
          </div>
        </div>
      </div>

      <div className="flex mt-5">
        <div className="flex-[2] lg:flex-[4]"></div>
        <div className="lg:flex flex-[3] md:flex-[1] flex-col gap-5 justify-end">
          <Copy animateOnScroll={true}>
            <div className=" leading-snug uppercase text-stone-400  mb-5 lg:mb-2">
              You’re one prompt away from the next viral video.
            </div>
          </Copy>
          <div className="mb-5">
            <Link href="/register">
              <Button size="lg">
                Start for free <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
