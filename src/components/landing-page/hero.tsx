"use client";

import { PromptInput } from "@/components/prompt-input";
import { ShuffleText } from "@/components/shuffle-text";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { BackgroundGradient } from "@/components/background-gradient";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      // Fade-in subtitle text
      gsap.from(".subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
      });

      // Fade-in prompt container shortly after
      gsap.from(".prompt-container", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-[100vw] overflow-hidden flex justify-center items-center"
    >
      <div className="absolute bg-gradient-to-t from-background to-transparent w-full h-full z-10"></div>
      <div className="absolute bg-gradient-to-t from-background/70 to-transparent w-full h-full z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full z-1">
        <video
          src="https://videos.pexels.com/video-files/5636815/5636815-uhd_2560_1440_30fps.mp4"
          autoPlay
          loop
          muted
          controls={false}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="z-50 w-full gap-14 flex flex-col justify-center items-center text-center block-layout pb-14">
        <div className="flex gap-10 flex-col justify-center items-center">
          <div>
            <ShuffleText
              as="h3"
              text="The AI Motion"
              className="relative font-bold text-5xl leading-relaxed sm:text-7xl uppercase"
            />
            <ShuffleText
              as="h3"
              text="Designer"
              className="relative font-bold text-5xl sm:text-7xl uppercase"
            />
          </div>

          <div className="subtitle text-center max-w-2xl text-lg text-muted-foreground">
            Change your idea to a full animation with text, shapes and voice
            over. Just write the prompt and see the magic happen
          </div>

          <div className="prompt-container w-full md:w-[45rem] lg:w-[50rem] ">
            <BackgroundGradient>
              <PromptInput
                placeholder="Describe your animation..."
                className="min-h-[130px] text-white placeholder:text-[15px] bg-black"
                isLandingPage
              />
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </section>
  );
};
