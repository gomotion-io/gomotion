import { CustomPlayer } from "@/components/custom-player";
import React from "react";

type WorkItemProps = {
  videoUrl: string;
  index: string;
  workName: string;
};

export const VideoItem: React.FC<WorkItemProps> = ({
  videoUrl,
  index,
  workName,
}) => {
  return (
    <div className="flex-1 group relative showcase-item">
      <div className="mb-2 h-[250px] overflow-hidden">
        <div className="w-full h-full">
          <CustomPlayer url={videoUrl} width="100%" height="100%" />
        </div>
      </div>

      <div className="flex gap-4">
        <p className="relative left-0 text-xs text-[gray] transition-all duration-300 group-hover:left-4 group-hover:text-white">
          {index}
        </p>
        <p className="relative left-0 uppercase font-semibold text-xs text-[gray] transition-all duration-300 group-hover:left-4 group-hover:text-white">
          {workName}
        </p>
      </div>
    </div>
  );
};
