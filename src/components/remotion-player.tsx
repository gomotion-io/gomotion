import { Player } from "@remotion/player";
import { ComponentType, FC } from "react";

const DEFAULT_COMP_WIDTH = 1920;
const DEFAULT_COMP_HEIGHT = 1080;
const DEFAULT_FPS = 60;
const DEFAULT_DURATION_IN_FRAMES = 300; // 10 seconds at 30 FPS

type RemotionPlayerProps = {
  composition: ComponentType | null;
  inputProps?: Record<string, unknown>;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({
  inputProps,
  composition,
}) => {
  if (!composition) {
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
        durationInFrames={Math.floor(DEFAULT_DURATION_IN_FRAMES) + 1}
        outFrame={Math.max(1, Math.floor(DEFAULT_DURATION_IN_FRAMES) - 1)}
        compositionHeight={DEFAULT_COMP_HEIGHT}
        compositionWidth={DEFAULT_COMP_WIDTH}
        fps={DEFAULT_FPS}
        style={{ width: "100%", height: "100%" }}
        inputProps={inputProps}
        browserMediaControlsBehavior={{ mode: "register-media-session" }}
        spaceKeyToPlayOrPause={false}
        loop
      />
    </div>
  );
};
