"use client";

import { gsap } from "gsap";
import CustomEase from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, CustomEase);

if (ScrollTrigger.isTouch) {
  ScrollTrigger.normalizeScroll(true);
}

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#ffffff"
        options={{ showSpinner: true }}
        shallowRouting
      />
    </>
  );
};
