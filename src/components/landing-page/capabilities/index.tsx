"use client";

import { CustomPlayer } from "@/components/custom-player";
import Copy from "../intro/copy";

export default function Capabilities() {
  return (
    <div className="relative text-black bg-white py-[10%] px-5 sm:px-32">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-[5%]">
        <div className="relative capability-player w-full h-[60vh] mb-8 lg:mb-0 xl:w-[35%] lg:h-[85vh] lg:sticky lg:top-[8vh] lg:self-start">
          <CustomPlayer
            url="https://legendary.b-cdn.net/website/case.mp4"
            width="100%"
            height="100%"
            playsinline
            style={{ position: "absolute", top: 0, left: 0 }}
            config={{
              file: {
                attributes: {
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        </div>

        <div className="grid grid-cols-1 grid-rows-1 lg:grid-rows-4 gap-2 lg:gap-0 h-full w-full xl:w-[25%] text-[4vw] lg:text-[1vw] items-end">
          <div className="row-span-1 text-xl">
            <Copy animateOnScroll={true}>
              <p className="text-xl leading-relaxed">
                <span className="font-inter">
                  The <span className="font-medium">Problem</span> is lack of
                  Retention,{" "}
                </span>
                <span className="opacity-40">
                  viewers scroll past 90 % of static posts—and half of every
                  video drops off within 5 seconds. Meanwhile, mastering After
                  Effects or Premiere Pro takes months, leaving brands stuck in
                  tutorials instead of creating.
                </span>
              </p>
            </Copy>
          </div>
          <div className="row-span-1 h-full"></div>
          <div className="row-span-1 text-xl">
            {/* */}
            <Copy animateOnScroll={true}>
              <p className="text-xl leading-relaxed">
                <span className="font-inter">
                  The <span className="font-medium">Benefit</span> is effortless
                  creativity at scale,{" "}
                </span>
                <span className="opacity-40">
                  reclaim hundreds of creative hours and remove technical
                  blockers. Teams can iterate on multiple concepts in parallel,
                  launch campaigns in real time, and stay ahead of fast-moving
                  trends.
                </span>
              </p>
            </Copy>
          </div>
          <div className="row-span-1 h-full"></div>
        </div>

        <div className=" grid grid-cols-1 grid-rows-1 gap-2 lg:gap-0 lg:grid-rows-4 h-full w-full xl:w-[25%] text-[4vw] lg:text-[1vw] items-end">
          <div className="row-span-1 h-full"></div>
          <div className="row-span-1 text-xl">
            <Copy animateOnScroll={true}>
              <p className="text-xl leading-relaxed">
                <span className="font-inter">
                  The <span className="font-medium">Solution</span> is
                  Gomotion,{" "}
                </span>
                <span className="opacity-40">
                  instead of wrestling with timelines and keyframes, you simply
                  describe your vision in a prompt — and gomotion model
                  instantly generates a polished animation.
                </span>
              </p>
            </Copy>
          </div>
          <div className="row-span-1 h-full"></div>
          <div className="row-span-1 text-xl">
            {/* */}
            <Copy animateOnScroll={true}>
              <p className="text-xl leading-relaxed">
                <span className="font-inter">
                  The <span className="font-medium">Edge</span> is real-time
                  optimization,{" "}
                </span>
                <span className="opacity-40">
                  harnessing AI-driven insights to A/B test motion variations,
                  refine pacing, and personalize content for each audience
                  segment—turning every view into actionable data and ensuring
                  your animations continually outperform the last.
                </span>
              </p>
            </Copy>
          </div>
        </div>
      </div>
    </div>
  );
}
