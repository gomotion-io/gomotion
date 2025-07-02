"use client";

import React from "react";
import Copy from "@/components/landing-page/intro/copy";
import { RevealBand } from "@/components/landing-page/usecase/reveal-band";

export const Usecase = () => {
  return (
    <div className="bg-white">
      <div className="w-full flex text-black pt-16 mb-14 md:mb-16 px-5 sm:px-10">
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
      <RevealBand />
      <div className="flex mt-20 text-black px-5 sm:px-10">
        <div className="flex-[2] lg:flex-[4]"></div>
        <div className="lg:flex flex-[3] gap-5 opacity-85 justify-end">
          <Copy animateOnScroll={true}>
            <div className="font-medium leading-snug uppercase  justify-end">
              From Tech Reviewers to Travel Vloggers — GoMotion Fits Every
              Creator.
            </div>
          </Copy>
        </div>
      </div>
    </div>
  );
};
