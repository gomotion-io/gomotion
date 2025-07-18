"use client";

import { ShuffleText } from "@/components/shuffle-text";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoItem } from "./sub/video-item";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type VideoData = { videoUrl: string; prompt: string };

const VIDEO_ITEMS: VideoData[] = [
  {
    videoUrl: "https://legendary.b-cdn.net/site/showcase-video/astra.mov",
    prompt: "A cinematic 3D particle explosion revealing the logo for ASTRA",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/text_stomp.mp4",
    prompt:
      "A vibrant, highly dynamic kinetic typography for 'gomotion the new after effect' ",
  },
  {
    videoUrl:
      "https://legendary.b-cdn.net/site/showcase-video/fireship_intro.mp4",
    prompt:
      "A fireship-style intro to the brand Fireship, featuring a futuristic voiceover saying '100 second of code",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/showcase-video/cryptic.mp4",
    prompt: "Generate a 10‑second cyberpunk logo sting on a black background.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/showcase-video/eclipse.mp4",
    prompt:
      "The word 'Eclipse' in a retro-futuristic style with letter glitching effects.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
];

export const Showcase = () => {
  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".showcase-item");

    items.forEach((item, i) => {
      gsap.set(item, { y: 25 * (i + 0.5), opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 110%",
            end: "top 50%",
            scrub: true,
          },
        })
        .to(item, {
          y: 0,
          opacity: 1,
          ease: "power3.Out",
        });
    });
  }, []);

  const rows: VideoData[][] = [];
  for (let i = 0; i < VIDEO_ITEMS.length; i += 3) {
    rows.push(VIDEO_ITEMS.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col pb-16 sm:pb-20 block-layout ">
      <div className="w-full sm:w-[65%] sm:h-[20rem]">
        <ShuffleText
          as="h3"
          text="Timeless Art Through a New Lens"
          className="relative font-bold text-5xl sm:text-7xl uppercase mb-10"
          triggerOnScroll
        />

        <h3 className="uppercase text-xl tracking-wide mb-5">
          [ Creative Explorations ]
        </h3>
      </div>

      <div className="w-full flex flex-col gap-5">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex w-full flex-col gap-7 my-4 lg:flex-row"
          >
            {row.map((item, index) => (
              <VideoItem
                key={index}
                videoUrl={item.videoUrl}
                prompt={item.prompt}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
