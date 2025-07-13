"use client";

import { ShuffleText } from "@/components/shuffle-text";

export const Hero = () => {
  return (
    <section className="relative h-[100svh] w-[100vw] overflow-hidden flex items-end">
      <div className="absolute bg-gradient-to-t from-background to-transparent w-full h-full z-10"></div>
      <div className="absolute bg-gradient-to-t from-background/70 to-transparent w-full h-full z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full z-1">
        <video
          src="https://legendary.b-cdn.net/website/0711.mp4"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="z-50 w-full flex justify-between items-end block-layout pb-14">
        <div className="sm:w-[55%]">
          <ShuffleText
            as="h3"
            text="The AI Motion"
            className="relative font-bold text-5xl sm:text-7xl uppercase"
          />
          <ShuffleText
            as="h3"
            text="Designer"
            className="relative font-bold text-5xl sm:text-7xl uppercase"
          />
        </div>
      </div>
    </section>
  );
};
