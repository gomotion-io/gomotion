"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Orientation } from "lenis";
import { ReactLenis } from "lenis/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const scrollSettings = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    orientation: "vertical" as Orientation,
    smoothWheel: true,
    syncTouch: true,
  };

  useGSAP(() => {
    const scene = document.querySelector(".scene");
    const header = document.querySelector(".header");
    // Select all showcase items that should animate on scroll
    const showcaseItems = gsap.utils.toArray<HTMLElement>(".showcase-item");

    if (header) {
      gsap.set(header, { y: -20, opacity: 0 });
      gsap.to(header, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      });
    }

    if (scene) {
      gsap.set(scene, { y: 60, opacity: 0 });
      gsap.to(scene, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power4.out",
      });
    }

    if (showcaseItems.length) {
      showcaseItems.forEach((item) => {
        // Set initial state
        gsap.set(item, { y: 40, opacity: 0 });

        // Animate when the item enters the viewport
        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          onEnter: () => {
            gsap.to(item, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              overwrite: "auto",
            });
          },
        });
      });
    }
  }, []);

  return (
    <ReactLenis root options={scrollSettings}>
      {children}
      <ProgressBar
        height="4px"
        color="#ffffff"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </ReactLenis>
  );
};
