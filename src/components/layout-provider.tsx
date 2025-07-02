"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { FC, ReactNode } from "react";

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
