"use server";
import { remotionConfig } from "@/config/remotion";
import { DisplayableRenderProgressOrFinality } from "@/types/remotion";
import { sample } from "@/utils/sample";
import {
  AwsRegion,
  getFunctions,
  getRenderProgress,
  renderMediaOnLambda,
} from "@remotion/lambda/client";

export const createRender = async ({
  compId,
  inputProps,
}: {
  compId: string;
  inputProps?: Record<string, unknown>;
}) => {
  // 👇🏼 Change this to get the closest region based on the user's region for optimal UX.
  const region = sample(remotionConfig.regions);

  const functions = await getFunctions({
    region,
    compatibleOnly: true,
  });

  if (!functions || functions.length === 0)
    throw new Error(
      "No compatible functions found. If you are the developer, please ensure the deploy scripts have been run successfully."
    );

  const functionName = functions[0].functionName;

  const { bucketName, renderId } = await renderMediaOnLambda({
    inputProps: inputProps ?? {},
    region,
    composition: compId,
    functionName,
    serveUrl: remotionConfig.siteId,
    codec: "h264",
  });

  return {
    functionName,
    bucketName,
    renderId,
    region,
  };
};

export const getProgress = async ({
  functionName,
  bucketName,
  renderId,
  region,
}: {
  functionName: string;
  bucketName: string;
  renderId: string;
  region: AwsRegion;
}): Promise<DisplayableRenderProgressOrFinality> => {
  const nativeProgress = await getRenderProgress({
    functionName,
    bucketName,
    renderId,
    region,
  });

  if (nativeProgress.fatalErrorEncountered) {
    return {
      type: "error",
    };
  } else if (nativeProgress.done && nativeProgress.outputFile) {
    return {
      type: "success",
      url: nativeProgress.outputFile,
    };
  }

  return {
    type: "progress",
    percent: Math.round(nativeProgress.overallProgress * 100),
  };
};
