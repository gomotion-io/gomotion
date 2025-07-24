"use client";

import { MastraOutput } from "@/_type";
import React, { FC } from "react";
import { Player } from "@remotion/player";
import { useComponent } from "@/lib/use-component";

type RemotionPlayerProps = {
  composition: MastraOutput;
  watermark: boolean;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({ composition }) => {
  const data = composition.result;
  const { component } = useComponent(data.component);

  console.log(composition);

  if (!component) {
    return <div className="w-full flex-1" />;
  }

  return (
    <div className="w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={component}
        durationInFrames={Math.round(data.meta.durationInFrames)}
        compositionHeight={data.meta.height}
        compositionWidth={data.meta.width}
        fps={data.meta.fps}
        style={{ width: "100%", height: "100%" }}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
      />
    </div>
  );
};
