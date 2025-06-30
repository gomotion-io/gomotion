import dynamic from "next/dynamic";
import React from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

type WorkItemProps = {
  videoId: number;
  index: string;
  workName: string;
};

export const VideoItem: React.FC<WorkItemProps> = ({
  videoId,
  index,
  workName,
}) => {
  return (
    <div className="work showcase-item">
      <div className="work-open"></div>
      <div className="work-video">
        <div className="work-video-wrapper">
          <ReactPlayer
            url={`https://vimeo.com/${videoId}`}
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
      <div className="work-info">
        <div className="work-index">
          <p>{index}</p>
        </div>
        <div className="work-name uppercase font-semibold">
          <p>{workName}</p>
        </div>
      </div>
    </div>
  );
};
