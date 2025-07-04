"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, useRef } from "react";

interface CopyProps {
  children: ReactNode;
  animateOnScroll?: boolean;

  delay?: number;
}

export default function Copy({
  children,
  animateOnScroll = false,
  delay = 0,
}: CopyProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Register plugins once. gsap ignores duplicate registrations.
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  useGSAP(
    () => {
      if (!wrapperRef.current) return;

      const baseConfig = {
        opacity: 0,
        y: 40,
        ease: "power3.out" as const,
        duration: 1,
      };

      if (animateOnScroll) {
        gsap.from(wrapperRef.current, {
          ...baseConfig,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
            end: "top 60%",
            toggleActions: "play none none reset",
          },
        });
      } else {
        gsap.from(wrapperRef.current, {
          ...baseConfig,
          delay,
        });
      }
    },
    { dependencies: [animateOnScroll, delay] },
  );

  return <div ref={wrapperRef}>{children}</div>;
}
