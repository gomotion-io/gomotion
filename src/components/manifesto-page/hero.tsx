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

      <div className="z-50 w-full flex justify-between items-start flex-col block-layout pb-14">
        <div className="sm:w-[55%] mb-8">
          <ShuffleText
            as="h3"
            text="We are building what after"
            className="relative font-bold text-3xl sm:text-5xl uppercase"
          />
          <ShuffleText
            as="h3"
            text="effect should have been"
            className="relative font-bold text-3xl sm:text-5xl uppercase"
          />
        </div>
        <div className="w-[45%] mb-8 ">
          <p className="text-muted-foreground">
           
            Gomotion was born from our frustration with how hard 
            it is to bring ideas to life through animation on YouTube. 
            Traditional tools like After Effects take months to master, 
            and every video can swallow days—sometimes weeks—of production time.



            We want to make it possible to craft motion animations in minutes
            and give everyone the power to express ideas—no technical barriers, just creativity.
          </p>

        </div>
      </div>
     
    </section>
  );
};
