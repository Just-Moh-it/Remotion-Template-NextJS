import { deploySite, getOrCreateBucket } from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { remotionConfig } from "../..//config/remotion";
import { webpackOverride } from "../..//remotion/webpackOverride";
import { deployFunctionsToRegion } from "./deploy-functions";

dotenv.config();

console.log("Starting deployment");

const execute = async () => {
  for (const region of remotionConfig.regions) {
    console.log(`Deploying to region ${region}`);

    // TODO: Check if functions already exist and only deploy if not
    await deployFunctionsToRegion(region);

    // Deploying site
    const { bucketName } = await getOrCreateBucket({ region });
    const { serveUrl } = await deploySite({
      siteName: remotionConfig.siteId,
      bucketName,
      entryPoint: path.join(process.cwd(), "/remotion/index.ts"),
      region,
      options: {
        webpackOverride,
      },
    });
    console.log(`Deployed site to ${region} under ${serveUrl}`);

    console.log(`Deployed to region ${region}`);
  }
};

execute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
