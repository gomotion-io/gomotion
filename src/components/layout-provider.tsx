"use client";

import { initMixpanel } from "@/lib/mixpanelClient";
import { ReactLenis } from "lenis/react";
import { FC, ReactNode, useEffect } from "react";
import { Toaster } from "sonner";

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const scrollSettings = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    smooth: true,
  };

  useEffect(() => {
    initMixpanel();
  }, []);

  return (
    <>
      <ReactLenis root options={scrollSettings}>
        {children}
      </ReactLenis>
      <Toaster />
    </>
  );
};
