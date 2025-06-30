"use client";

import React from "react";
import { VideoItem } from "./video-item";
import "./style.css";
import Copy from "@/components/landing-page/intro/copy";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const Gallery = () => {
  useGSAP(() => {
    const heroLink = document.querySelector(".hero-link");
    const animationDelay = 0.9;

    if (heroLink) {
      gsap.set(heroLink, { y: 30, opacity: 0 });

      gsap.to(heroLink, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: animationDelay,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <div className="work-page mb-44 px-5 sm:px-10 bg-black">
      <div className="w-full flex text-stone-100 pt-16 mb-20">
        <div className="flex-[2] lg:flex-[2]">
          <Copy animateOnScroll={true} delay={0.9}>
            <h3 className="font-medium text-4xl leading-snug">
              Scroll down and let our motion
              <span className="opacity-50 ml-1">design tell your story.</span>
              frame by frame
            </h3>
          </Copy>
        </div>
        <div className="hidden lg:flex flex-[4]"></div>
      </div>

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
        </div>
      </div>
    </div>
  );
};
