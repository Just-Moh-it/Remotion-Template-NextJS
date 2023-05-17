import { Config } from "remotion";
import { webpackOverride } from "./remotion/webpackOverride";

Config.overrideWebpackConfig(webpackOverride);
