"use client";

import { ShuffleText } from "@/components/shuffle-text";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoItem } from "./sub/video-item";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type VideoData = { videoUrl: string; index: string; prompt: string };

const VIDEO_ITEMS: VideoData[] = [
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "01",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "02",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "03",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "04",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "05",
    prompt:
      "A bold typographic animation with smooth morphing transitions featuring the brand NOVA, synced with a futuristic voiceover saying 'Design the future now.",
  },
  {
    videoUrl: "https://legendary.b-cdn.net/site/placeholder.mov",
    index: "06",
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
    <div className="flex flex-col pb-16 sm:pb-20 block-layout mb-60">
      <div className="w-full flex gap-5 text-stone-100 pt-16 mb-14">
        <div className="w-full text-center flex items-center justify-center">
          <ShuffleText
            as="h3"
            text="Create your own stories"
            className="font-bold text-5xl sm:text-6xl uppercase mb-10"
            triggerOnScroll
          />

          <h3 className="text-balance leading-relaxed text-muted-foreground">
            Below, explore a dynamic showcase of real clips our users generated
            — each crafted to maximize watch time and social shares—each crafted
            to maximize watch time and social shares.
          </h3>
        </div>
        <div className="hidden lg:flex flex-[4]"></div>
      </div>

      <div className="w-full flex flex-col gap-5">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex w-full flex-col gap-7 my-4 lg:flex-row"
          >
            {row.map((item) => (
              <VideoItem
                key={item.index}
                videoUrl={item.videoUrl}
                index={item.index}
                prompt={item.prompt}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
