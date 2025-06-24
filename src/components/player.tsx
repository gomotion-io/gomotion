"use client";

import { useWebContainer } from "@/hooks/webcontainer/useWebContainer";
import { isDevMode } from "@/lib/utils";
import { motion } from "framer-motion";

export const Player = () => {
  const { iframe, initProgress } = useWebContainer(isDevMode);

  return (
    <div className="w-full flex-1 relative">
      <iframe ref={iframe} className="w-full h-full" />

      {initProgress && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div className="w-52 h-2 border rounded overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              animate={{ width: `${initProgress * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};
