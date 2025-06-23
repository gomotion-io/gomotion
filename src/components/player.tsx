"use client";

import { Loader } from "@/components/loader";
import {
  useWebContainer,
  WebContainerStatus,
} from "@/hooks/webcontainer/useWebContainer";
import { isDevMode } from "@/lib/utils";
import { useMemo } from "react";

export const Player = () => {
  const { iframe, status } = useWebContainer(isDevMode);

  const statusMessage = useMemo(() => {
    switch (status) {
      case WebContainerStatus.InstallingDeps:
        return (
          <div className="flex items-center">
            <Loader /> Installing dependencies...
          </div>
        );
      case WebContainerStatus.StartingDevServer:
        return (
          <div className="flex items-center">
            <Loader /> Starting dev server...
          </div>
        );
      case WebContainerStatus.UpdatingFiles:
        return (
          <div className="flex items-center">
            <Loader /> Updating files...
          </div>
        );
      case WebContainerStatus.Idle:
      default:
        return null;
    }
  }, [status]);

  return (
    <div className="w-full flex-1 relative">
      <iframe ref={iframe} className="w-full h-full" />

      {statusMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {statusMessage}
        </div>
      )}
    </div>
  );
};
