"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import type { ReactPlayerProps } from "react-player";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export interface CustomPlayerProps extends ReactPlayerProps {
  url: string;
  className?: string;
  /**
   * Optional poster image that will be displayed when the video is not playing.
   * This is useful for displaying a thumbnail (e.g. on the landing page intro video).
   */
  poster?: string;
}

export const CustomPlayer: React.FC<CustomPlayerProps> = ({
  url,
  className,
  poster,
  width = "100%",
  height = "100%",
  ...rest
}) => {
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const togglePlay = () => {
    setPlaying((prev) => !prev);
  };

  return (
    <div
      className={`relative cursor-pointer select-none h-full w-full transition-all duration-300 transform group-hover:scale-105 ${className ?? ""}`}
      onClick={togglePlay}
      style={{ opacity: isReady ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <ReactPlayer
        url={url}
        playing={playing}
        controls={false}
        width={width}
        height={height}
        onReady={() => setIsReady(true)}
        {...rest}
      />

      {!playing && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Poster image */}
          {poster && (
            <Image
              src={poster}
              alt="video-poster"
              fill
              className="object-contain"
              priority
            />
          )}

          {/* Play button overlay */}
          <div className="rounded-4xl h-16 w-32 bg-black/15 backdrop-blur-md p-1 hover:scale-120 transition duration-500 z-10">
            <div className="rounded-4xl h-full w-full flex items-center justify-center bg-white/10 text-white ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 4v16l13 -8z"></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
