"use client";

import { MastraOutput } from "@/_type";
import { bundleCode } from "@/lib/bundle-code";
import { Player } from "@remotion/player";
import { ComponentType, FC, useEffect, useState } from "react";

type RemotionPlayerProps = {
  composition: MastraOutput;
  watermark: boolean;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({ composition }) => {
  const [dynamicMain, setDynamicMain] = useState<ComponentType>();

  console.log(composition.result);

  useEffect(() => {
    (async () => {
      try {
        const component = await bundleCode({
          files: composition.result.files,
        });
        setDynamicMain(() => component);
      } catch (error) {
        console.error("Error bundling code", error);
      }
    })();
  }, [composition]);

  return (
    <div className="w-full flex-1">
      {dynamicMain && (
        <Player
          controls
          alwaysShowControls
          component={dynamicMain}
          durationInFrames={Math.round(
            composition.result.meta.durationInFrames
          )}
          compositionHeight={composition.result.meta.height}
          compositionWidth={composition.result.meta.width}
          fps={composition.result.meta.fps}
          style={{ width: "100%", height: "100%" }}
          browserMediaControlsBehavior={{ mode: "register-media-session" }}
          spaceKeyToPlayOrPause
          acknowledgeRemotionLicense
        />
      )}
    </div>
  );
};
