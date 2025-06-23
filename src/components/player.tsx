"use client";

import { useWebContainer } from "@/hooks/useWebContainer";
import { Term } from "@/components/term";
import { FunctionComponent } from "react";

type PlayerProps = {
  debugMode: boolean;
};

export const Player: FunctionComponent<PlayerProps> = ({ debugMode }) => {
  const { iframe, xterm } = useWebContainer();

  return (
    <>
      <div className="w-full flex-1">
        <iframe
          ref={iframe}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "0.5rem",
            background: "white",
          }}
        />
      </div>

      {debugMode && <Term xterm={xterm} />}
    </>
  );
};
