import { Config } from "@remotion/cli/config";
import { webpackOverride } from "@/remotion/webpackOverride";

Config.overrideWebpackConfig(webpackOverride);
