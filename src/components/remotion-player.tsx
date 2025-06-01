import { Player } from "@remotion/player";
import { ComponentType, FC } from "react";
import { CompositionMetadata } from "@/_type";

type RemotionPlayerProps = {
  composition: ComponentType | null;
  metadata: CompositionMetadata | null;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({
  composition,
  metadata,
}) => {
  if (!composition || !metadata) {
    return (
      <div className="w-full flex-1 flex items-center justify-center">
        <p className="text-neutral-500 font-medium">No composition loaded</p>
      </div>
    );
  }

  return (
    <div className=" w-full flex-1">
      <Player
        controls
        alwaysShowControls
        component={composition}
        durationInFrames={Math.floor(metadata.duration_in_frames) + 1}
        outFrame={Math.max(1, Math.floor(metadata.duration_in_frames) - 1)}
        compositionHeight={metadata.comp_height}
        compositionWidth={metadata.comp_with}
        fps={metadata.fps}
        style={{ width: "100%", height: "100%" }}
        inputProps={{}}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause={false}
        loop
      />
    </div>
  );
};
