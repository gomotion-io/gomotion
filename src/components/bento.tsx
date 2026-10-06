import { cn } from "@/lib/utils";
import { LazyVideo } from "./lazy-video";
import { VideoDialog } from "./video-dialog";

type TileProps = {
  src: string;
  title: string;
  description: string;
  className?: string;
};

export const Tile: React.FC<TileProps> = ({
  src,
  title,
  description,
  className,
}) => (
  <div className={cn(className, "w-auto")}>
    <VideoDialog src={src} title={title} description={description}>
      <LazyVideo src={src} className="w-full h-full object-cover" />
    </VideoDialog>
  </div>
);

// Base grid class used by all patterns
export const gridBase = "grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-3";
