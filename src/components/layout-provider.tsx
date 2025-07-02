"use client";

import { FC, ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const scrollSettings = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    smooth: true,
  };

  return (
    <ReactLenis root options={scrollSettings}>
      {children}
    </ReactLenis>
  );
};
