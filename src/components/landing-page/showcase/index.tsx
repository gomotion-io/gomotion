"use client";

import Copy from "@/components/landing-page/intro/copy";
import { VideoItem } from "./video-item";

export const Showcase = () => {
  return (
    <div className="flex flex-col mb-24 px-5 sm:px-10 bg-black">
      <div className="w-full flex text-stone-100 pt-16 mb-14 md:mb-16">
        <div className="flex-[2] lg:flex-[2]">
          <Copy animateOnScroll={true}>
            <h3 className="font-medium text-4xl leading-snug">
              Scroll down and let our motion{" "}
              <span className="opacity-50 mr-1.5">design tell your story</span>
              frame by frame
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
        <div className="lg:flex flex-[3] gap-5 opacity-85 justify-end">
          <Copy animateOnScroll={true}>
            <div className="font-medium leading-snug uppercase ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut
              dolorem dolorum et incidunt ipsum minus
            </div>
          </Copy>
        </div>
      </div>
    </div>
  );
};
