"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<
  ComponentProps<"video">,
  "src" | "autoPlay" | "preload" | "children"
> & {
  src: string;
};

// `src` is the video URL without extension: `${src}.webm` (AV1) and
// `${src}.mp4` (H.264) must both exist. Browsers that can decode AV1 get the
// lighter WebM, the others (e.g. Safari without AV1 hardware) fall back to MP4.
export const VideoSources = ({ src }: { src: string }) => (
  <>
    <source src={`${src}.webm`} type='video/webm; codecs="av01.0.09M.08"' />
    <source src={`${src}.mp4`} type="video/mp4" />
  </>
);

// Muted looping video that only downloads once it gets close to the viewport
// and pauses when it leaves it, so visitors don't fetch every clip on load.
export const LazyVideo = ({ src, ...props }: LazyVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldLoad) return;

    if (isNearViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isNearViewport, shouldLoad]);

  return (
    <video ref={ref} preload="none" playsInline muted loop {...props}>
      {shouldLoad && <VideoSources src={src} />}
    </video>
  );
};
