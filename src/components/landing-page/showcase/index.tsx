"use client";

import Copy from "@/components/landing-page/intro/copy";
import { VideoItem } from "./video-item";
import React from "react";
import "./style.css";
import { CallToAction } from "@/components/call-to-action";

export const Showcase = () => {
  return (
    <div className="flex flex-col mb-24 px-5 sm:px-10 bg-black">
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
          <div className="works">
            <div className="row">
              <VideoItem
                videoId={437808118}
                index="01"
                workName="Azure Serenity Echoes"
              />
              <VideoItem
                videoId={871750630}
                index="02"
                workName="Solar Reverie"
              />
              <VideoItem
                videoId={477068055}
                index="03"
                workName="Crimson Symphony Memoirs"
              />
            </div>
            <div className="row">
              <VideoItem
                videoId={487114118}
                index="04"
                workName="Neon Galactic Chronicles"
              />
              <VideoItem
                videoId={366780994}
                index="05"
                workName="Velvet Dreamscape"
              />
              <VideoItem
                videoId={659334960}
                index="06"
                workName="Lunar Symphony"
              />
            </div>
            <div className="row">
              <VideoItem
                videoId={533729157}
                index="07"
                workName="Oceanic Memoirs Echoes"
              />
              <VideoItem
                videoId={500832353}
                index="08"
                workName="Twilight Dreamscape Saga"
              />
              <VideoItem
                videoId={510814675}
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
              You’re one prompt away from the next viral video.
            </div>
          </Copy>
          <div className="mb-5">
            <CallToAction />
          </div>
        </div>
      </div>
    </div>
  );
};
