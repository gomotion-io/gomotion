"use client";

import React from "react";
import Copy from "@/components/landing-page/intro/copy";
import { RevealBand } from "@/components/landing-page/usecase/reveal-band";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Usecase = () => {
  return (
    <div className="bg-white">
      <div className="w-full flex text-black pt-16 mb-14 md:mb-16 px-5 sm:px-10">
        <div className="flex-[2] lg:flex-[2]">
          <Copy animateOnScroll={true}>
            <h3 className="font-medium text-4xl leading-snug mb-2">
              Real-World Use Cases & Rave{" "}
              <span className="text-stone-400">Reviews</span>
            </h3>
          </Copy>

          <Copy animateOnScroll={true}>
            <h3 className="text-balance leading-relaxed ">
              Discover how leading creators and brands are transforming concepts
              into high-impact videos with Gomotion engine. Below, explore four
              real-world use cases—complete with genuine testimonials—that prove
              GoMotion doesn’t just save time, it drives engagement.
            </h3>
          </Copy>
        </div>
        <div className="hidden lg:flex flex-[4]"></div>
      </div>
      <RevealBand />
      <div className="flex mt-20 text-black px-5 sm:px-10 ">
        <div className="flex-[2] lg:flex-[4]"></div>
        <div className="lg:flex flex-col flex-[3] md:flex-[1] gap-5 justify-end">
          <Copy animateOnScroll={true}>
            <div className="leading-snug uppercase justify-end text-stone-400 mb-5 lg:mb-2">
              From Tech Reviewers to Travel Vloggers — GoMotion Fits Every
              Creator.
            </div>
          </Copy>
          <Link href="/register">
            <Button className="mb-16 bg-black" variant="secondary" size="lg">
              Start for free <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
