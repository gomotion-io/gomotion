"use client";

import { Player } from "@remotion/player";
import { GomotionCompiler } from "@/gomotion-compiler";
import { FC, useMemo } from "react";
import { GomotionSpec } from "@/gomotion-compiler/spec";

type RemotionPlayerProps = {
  composition: GomotionSpec;
  watermark: boolean;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({
  composition,
  watermark,
}) => {
  const { width, height, fps } = composition.meta;

  const durationInFrames = useMemo(
    () =>
      (composition.layers
        .map((t) => t.startMs + t.durationMs)
        .reduce((a, b) => Math.max(a, b), 0) /
        1000) *
      fps,
    [composition.layers, fps],
  );

  return (
    <div className="w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={GomotionCompiler}
        durationInFrames={Math.round(durationInFrames)}
        compositionHeight={height}
        compositionWidth={width}
        fps={fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{ spec: composition, watermark }}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause
      />
    </div>
  );
};
