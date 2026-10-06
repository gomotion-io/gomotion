"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<
  ComponentProps<"video">,
  "src" | "autoPlay" | "preload"
> & {
  src: string;
};

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
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      preload="none"
      playsInline
      muted
      loop
      {...props}
    />
  );
};
