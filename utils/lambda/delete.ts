import { getFunctions, deleteFunction, deleteSite } from "@remotion/lambda";
import { getSites } from "@remotion/lambda/client";
import dotenv from "dotenv";
import { remotionConfig } from "../..//config/remotion";
dotenv.config();

const execute = async () => {
  console.log(`Found account. Deleting...`);

  for (const region of remotionConfig.regions) {
    console.log(`Deleting from region ${region}`);

    // Now
    const functions = await getFunctions({
      region,
      compatibleOnly: false,
    });
    for (const fn of functions) {
      const { functionName } = fn;
      await deleteFunction({
        region,
        functionName: fn.functionName,
      });
      console.log(`Deleted function "${functionName}" from ${region}`);
    }

    const { sites } = await getSites({
      region,
    });

    for (const site of sites) {
      if (!site.id.includes(remotionConfig.siteId)) continue;

      await deleteSite({
        bucketName: site.bucketName,
        siteName: site.id,
        region,
      });
      console.log(`Site ${site.id} deleted.`);
    }
  }
};

execute()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
