"use client";

import { MastraOutput } from "@/_type";
import React, { FC } from "react";

type RemotionPlayerProps = {
  composition: MastraOutput;
  watermark: boolean;
};

export const RemotionPlayer: FC<RemotionPlayerProps> = ({ composition }) => {
  // const { durationInFrames, width, height, fps } = composition.meta;

  // const [lazyComp, setLazyComp] = useState<React.ComponentType | null>(null);
  //
  // useEffect(() => {
  //   // Make React and Remotion available globally for the dynamic component
  //   window.React = React;
  //   window.ReactDOM = ReactDOM;
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (window as any).Remotion = R;
  // }, []);
  //
  // useEffect(() => {
  //   (async () => {
  //     const jsBlob = new Blob([composition.component], {
  //       type: "text/javascript",
  //     });
  //     const blobUrl = URL.createObjectURL(jsBlob);
  //     const imported = await import(/* webpackIgnore: true */ blobUrl);
  //     URL.revokeObjectURL(blobUrl);
  //     setLazyComp(() => imported.default);
  //   })();
  // }, [composition.component]);
  //
  // if (!lazyComp) {
  //   return <div>...loading</div>;
  // }

  return (
    <div className="w-full flex-1">
      {/*<Player*/}
      {/*  controls*/}
      {/*  alwaysShowControls*/}
      {/*  component={lazyComp}*/}
      {/*  durationInFrames={Math.round(durationInFrames)}*/}
      {/*  compositionHeight={height}*/}
      {/*  compositionWidth={width}*/}
      {/*  fps={fps}*/}
      {/*  style={{ width: "100%", height: "100%" }}*/}
      {/*  browserMediaControlsBehavior={{ mode: "register-media-session" }}*/}
      {/*  spaceKeyToPlayOrPause*/}
      {/*/>*/}
    </div>
  );
};
