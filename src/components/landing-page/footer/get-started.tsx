import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { CallToAction } from "@/components/call-to-action";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GetStarted = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const members =
      containerRef.current.querySelectorAll<HTMLElement>(".team-member");

    members.forEach((member, i) => {
      gsap.set(member, { y: 40 * (i + 1), opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: member,
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        })
        .to(member, {
          y: 0,
          opacity: 1,
          ease: "power3.Out",
        });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      id="our-team"
      className="flex flex-col gap-10 px-5 sm:px-20 lg:px-40 mt-24 z-50"
    >
      <h3 className="font-neue-montreal text-white -ml-2 font-bold text-start leading-relaxed text-5xl md:text-8xl">
        Try Gomotion today
      </h3>
      <div className="flex justify-start">
        <CallToAction className="h-12 w-44 text-md font-medium" />
      </div>
    </div>
  );
};

export default GetStarted;
