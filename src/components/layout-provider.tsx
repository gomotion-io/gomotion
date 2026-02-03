"use client";

import { initMixpanel } from "@/lib/mixpanelClient";
import { FC, ReactNode, useEffect } from "react";
import { Toaster } from "sonner";

export const LayoutProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    initMixpanel();
  }, []);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
