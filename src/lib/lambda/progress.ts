import {
  AwsRegion,
  getRenderProgress,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { DISK, RAM, REGION, TIMEOUT } from "./config";

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 500;

type RenderProgressInput = {
  renderId: string;
  bucketName: string;
};

export type RenderProgressOutput =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

export const renderProgress = async ({
  renderId,
  bucketName,
}: RenderProgressInput): Promise<RenderProgressOutput> => {
  let attempt = 0;
  
  while (true) {
    try {
      const progress = await getRenderProgress({
        bucketName,
        functionName: speculateFunctionName({
          diskSizeInMb: DISK,
          memorySizeInMb: RAM,
          timeoutInSeconds: TIMEOUT,
        }),
        region: REGION as AwsRegion,
        renderId,
      });

      if (progress.fatalErrorEncountered) {
        return {
          type: "error",
          message: progress.errors[0].message,
        };
      }

      if (progress.done) {
        return {
          type: "done",
          url: progress.outputFile as string,
          size: progress.outputSizeInBytes as number,
        };
      }

      return {
        type: "progress",
        progress: Math.max(0.03, progress.overallProgress),
      };
    } catch (err) {
      const message = (err as Error)?.message ?? "";
      const isRateLimitError =
        message.includes("TooManyRequestsException") ||
        message.includes("Rate Exceeded");

      if (isRateLimitError && attempt < MAX_RETRIES) {
        attempt += 1;
        const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw err;
    }
  }
};
