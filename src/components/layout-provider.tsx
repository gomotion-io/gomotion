"use client";

import { FC, ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactLenis } from "lenis/react";
import { Orientation } from "lenis";

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
