import { remotionConfig } from "../../config/remotion";
import {
  AwsRegion,
  LambdaArchitecture,
  deployFunction,
} from "@remotion/lambda";

export const deployFunctionsToRegion = async (region: AwsRegion) => {
  // Deploying functions
  const { functionName } = await deployFunction({
    architecture: remotionConfig.architecture as LambdaArchitecture,
    createCloudWatchLogGroup: true,
    memorySizeInMb: remotionConfig.memorySizeInMb,
    timeoutInSeconds: remotionConfig.timeoutInSeconds,
    region,
  });

  console.log(`Deployed function "${functionName}" to ${region}`);
};
