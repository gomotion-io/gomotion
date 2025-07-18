import dynamic from "next/dynamic";
import React from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

type WorkItemProps = {
  videoUrl: string;
  prompt: string;
};

export const VideoItem: React.FC<WorkItemProps> = ({ videoUrl, prompt }) => {
  return (
    <div className="relative flex-1 group showcase-item">
      <div className="absolute inset-0 z-20 pointer-events-auto"></div>
      <div className="w-full my-2 h-[250px] overflow-hidden">
        <div className="w-full h-full scale-[1.5] transition-all duration-300 group-hover:blur-md">
          <ReactPlayer
            url={videoUrl}
            controls={false}
            autoPlay={true}
            loop={true}
            playing
            muted
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4 h-16">
        <p className="relative text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-4 group-hover:text-white">
          Prompt:
        </p>
        <p className="relative font-semibold text-xs text-muted-foreground transition-all duration-300 group-hover:translate-x-4 group-hover:text-white">
          {prompt}
        </p>
      </div>
    </div>
  );
};
