"use client";

import { useWebContainer } from "@/hooks/useWebContainer";
import { Term } from "@/components/term";
import { isDevMode } from "@/lib/utils";

export const Player = () => {
  const { iframe, xterm } = useWebContainer();

  return (
    <>
      <div className="w-full flex-1">
        <iframe ref={iframe} className="w-full h-full border" />
      </div>

      {isDevMode && <Term xterm={xterm} />}
    </>
  );
};
