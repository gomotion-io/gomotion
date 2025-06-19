"use client";

import { FC, ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

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
