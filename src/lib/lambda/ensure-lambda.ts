import { AwsRegion, getFunctions } from "@remotion/lambda/client";
import { DISK, RAM, REGION, TIMEOUT } from "./config";
import { deployFunction } from "@remotion/lambda";

export const ensureLambdaFunction = async (): Promise<string> => {
  /* ----------------- Look for an already-deployed, compatible function ----------------- */
  const functions = await getFunctions({
    region: REGION as AwsRegion,
    compatibleOnly: true,
  });

  const match = functions.find(
    (fn) =>
      fn.memorySizeInMb === RAM &&
      fn.timeoutInSeconds === TIMEOUT &&
      fn.diskSizeInMb === DISK,
  );

  if (match) {
    return match.functionName;
  }

  /* ----------------- None found – deploy a new one (≈ 40-60 s the very first time) ----------------- */
  const { functionName } = await deployFunction({
    region: REGION as AwsRegion,
    memorySizeInMb: RAM,
    timeoutInSeconds: TIMEOUT,
    diskSizeInMb: DISK,
    createCloudWatchLogGroup: true,
  });

  return functionName;
};
