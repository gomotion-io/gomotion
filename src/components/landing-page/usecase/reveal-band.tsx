import Copy from "@/components/landing-page/intro/copy";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Educator from "../../../../public/images/educator.png";
import Influencer from "../../../../public/images/influencer.png";
import Sassy from "../../../../public/images/sassy.jpg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const RevealBand = () => {
  useGSAP(() => {
    const rows = gsap.utils.toArray<HTMLElement>(".reveal-row");

    rows.forEach((row) => {
      gsap.fromTo(
        row,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="flex flex-col px-5 sm:px-10 gap-10 text-black mb-6">
      <div className="reveal-row grid grid-cols-1 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 md:pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <Copy animateOnScroll={true}>
            <div className="md:max-w-[16rem]">Influencer Short-Form Series</div>
          </Copy>
        </div>

        <div className="col-span-1 md:col-span-2 mb-5 md:mb-0 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-72 aspect-[12/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Influencer}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="col-span-1 md:col-span-2 h-full flex items-center px-5">
          <Copy animateOnScroll={true}>
            <div className="max-w-sm text-lg text-balance mb-2">
              Batch create daily TikTok with consistent style and on-brand voice
            </div>

            <div className="text-md text-stone-400">
              “My follower count jumped from 8 K to 120 K in four months.” —
              @BeautyTinker, Creator
            </div>
          </Copy>
        </div>
      </div>
      <div className="reveal-row grid grid-cols-1 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 md:pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <Copy animateOnScroll={true}>
            <div className="md:max-w-[16rem]">SaaS Product Walk-through</div>
          </Copy>
        </div>

        <div className="col-span-1 md:col-span-2 mb-5 md:mb-0 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-72 aspect-[12/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Sassy}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="col-span-1 md:col-span-2 h-full flex items-center px-5">
          <Copy animateOnScroll={true}>
            <div className="max-w-sm text-lg text-balance mb-2">
              Ship release videos for every sprint—no motion-designer
              bottleneck.
            </div>

            <div className="text-md text-stone-400">
              “Stakeholders finally &apos;get&apos; our updates without reading
              a doc — @Jenna Lee, PM at Loom
            </div>
          </Copy>
        </div>
      </div>
      <div className="reveal-row grid grid-cols-1 md:grid-cols-6 w-full md:min-h-60 rounded-3xl">
        <div className="col-span-1 md:col-span-2 lg:col-span-1 md:pl-20 min-h-24 md:min-h-auto text-2xl font-medium flex items-center">
          <Copy animateOnScroll={true}>
            <div className="md:max-w-[16rem]">EdTech Micro-Lessons</div>
          </Copy>
        </div>

        <div className="col-span-1 md:col-span-2 mb-5 md:mb-0 flex items-center md:justify-end px-5 md:px-10">
          <span className="relative h-72 aspect-[12/16] overflow-hidden">
            <Image
              style={{ objectFit: "cover" }}
              src={Educator}
              alt="image"
              fill
            />
          </span>
        </div>

        <div className="col-span-1 md:col-span-2 h-full flex items-center px-5">
          <Copy animateOnScroll={true}>
            <div className="max-w-sm text-lg text-balance mb-2">
              Break complex topics into bite-sized, voice-narrated visual
              stories.
            </div>

            <div className="text-md text-stone-400">
              “Students watch the whole lesson instead of skipping ahead.” —
              @Dr. Luis Gomez, Online Instructor
            </div>
          </Copy>
        </div>
      </div>
    </div>
  );
};
