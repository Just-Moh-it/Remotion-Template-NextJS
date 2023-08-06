import { WebpackOverrideFn } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";
export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {
  return enableTailwind({
    ...currentConfiguration,
    resolve: {
      ...currentConfiguration.resolve,
      alias: {
        ...(currentConfiguration.resolve?.alias ?? {}),
        "@": process.cwd(),
      },
    },
  });
};
