import type { AwsRegion } from "@remotion/lambda/client";

export const remotionConfig = {
  fps: 30,
  fallbackHeight: 1080,
  fallbackWidth: 1920,
  regions: ["us-east-1"] satisfies AwsRegion[],
  siteId: "main-site",
  memorySizeInMb: 1024 * 2,
  timeoutInSeconds: 60 * 5,
  progressPollingMinWaitTimeInMs: 5 * 1000,
};

export const playerSizes = new Map([
  ["3:2", { width: 1920, height: 1280 }],
  ["4:3", { width: 1920, height: 1440 }],
  ["16:9", { width: 1920, height: 1080 }],
  ["9:16", { width: 1080, height: 1920 }],
]) satisfies Map<string, { width: number; height: number }>;
